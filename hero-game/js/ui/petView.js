import { ITEM_TEMPLATES } from '../data/items.js';
import { getShape } from '../data/weaponShapes.js';
import { ACTIVITIES } from '../data/activities.js';
import { createPetAIState, tickPetAI, createBall, tickBall, isBallCaught, GROUND_INSET } from '../core/petAI.js';
import { loadDots, stepAndDrawParticles, PARTICLE_MODES } from './petParticleBg.js';

const BG_IMAGE_SRC = '../../assets/images/backgrounds/autumn%20trees.png';
const BG_SPACING_MIN = 3;
const BG_SPACING_MAX = 20;
const BG_SPACING_DEFAULT = 5;
const BG_MODE_LABELS = { dots: 'Static', waves: 'Waves', flames: 'Flicker', snow: 'Snow' };

const REACTIONS = [
  "Not now, I'm busy.", "Hm?", "*nods*", "Feels good.",
  "One day I'll be a legend.", "Watch this.", "...", "Ha!"
];

const ACTIVITY_ANIMATION_CLASS = {
  idle: 'pet-anim-idle',
  training: 'pet-anim-training',
  labor: 'pet-anim-working',
  rest: 'pet-anim-resting',
  combat: 'pet-anim-combat'
};

const AI_ANIMATION_CLASS = {
  sit: 'pet-anim-idle',
  wander: 'pet-anim-working',
  'chase-ball': 'pet-anim-training',
  activity: null // falls back to ACTIVITY_ANIMATION_CLASS
};

const SPRITE_SIZE = 96;
const FOOT_Y_FRACTION = 0.94; // where the drawn legs end within the canvas -- matches drawBody()
const BALL_SIZE = 14;
const CATCH_REACTIONS = ["Got it!", "Ha!", "Mine.", "Easy."];

// Module-level so the pet's position/state (and its rAF loop) survive the
// DOM rebuild that happens every time renderPetView() re-runs.
let petAIState = null;
let petAICharacterId = null;
let ballState = null;
let rafId = null;
let lastFrameAt = null;
let activePetCharacter = null;
let bgDots = null; // sampled once per stage size/spacing, cached inside petParticleBg
let bgMode = 'dots';
let bgSpacing = BG_SPACING_DEFAULT;
let bgHoverEnabled = false;
let bgMousePos = null; // stage-local coords, or null when the pointer is outside/absent
let bgStartedAt = null;

function hueFromSeed(seed) {
  return seed % 360;
}

function drawBody(ctx, size, hue) {
  const cx = size / 2;
  ctx.fillStyle = `hsl(${hue}, 40%, 55%)`;
  // head
  ctx.beginPath();
  ctx.arc(cx, size * 0.22, size * 0.13, 0, Math.PI * 2);
  ctx.fill();
  // torso
  ctx.fillRect(cx - size * 0.14, size * 0.32, size * 0.28, size * 0.32);
  // legs
  ctx.fillRect(cx - size * 0.13, size * 0.64, size * 0.1, size * 0.3);
  ctx.fillRect(cx + size * 0.03, size * 0.64, size * 0.1, size * 0.3);
  // arms
  ctx.fillRect(cx - size * 0.24, size * 0.34, size * 0.08, size * 0.26);
  ctx.fillRect(cx + size * 0.16, size * 0.34, size * 0.08, size * 0.26);
}

function drawGearLayer(ctx, size, template) {
  if (!template) return;
  const shape = getShape(template.slot, template.weaponType);
  if (!shape) return;

  ctx.save();
  const anchors = {
    head: { x: size * 0.5, y: size * 0.22, w: size * 0.22, h: size * 0.22 },
    body: { x: size * 0.5, y: size * 0.48, w: size * 0.3, h: size * 0.34 },
    hands: { x: size * 0.5, y: size * 0.46, w: size * 0.32, h: size * 0.2 },
    legs: { x: size * 0.5, y: size * 0.78, w: size * 0.26, h: size * 0.32 },
    offhand: { x: size * 0.28, y: size * 0.46, w: size * 0.16, h: size * 0.22 },
    accessory: { x: size * 0.5, y: size * 0.3, w: size * 0.12, h: size * 0.12 },
    weapon: { x: size * 0.76, y: size * 0.46, w: size * 0.18, h: size * 0.32 }
  };
  const a = anchors[template.slot] || anchors.body;
  ctx.translate(a.x - a.w / 2, a.y - a.h / 2);
  shape.draw(ctx, a.w, a.h);
  ctx.restore();
}

function renderSprite(character, size = SPRITE_SIZE) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  drawBody(ctx, size, hueFromSeed(character.portraitSeed));

  for (const slot of ['legs', 'body', 'hands', 'head', 'offhand', 'weapon', 'accessory']) {
    const instance = character.equipment[slot];
    if (!instance) continue;
    const template = ITEM_TEMPLATES[instance.templateId];
    drawGearLayer(ctx, size, template);
  }

  return canvas;
}

function currentAnimClass(aiState, activity) {
  const aiClass = AI_ANIMATION_CLASS[aiState.state];
  if (aiClass) return aiClass;
  return ACTIVITY_ANIMATION_CLASS[activity ? activity.category : 'idle'] || 'pet-anim-idle';
}

function applySpriteTransform(spriteEl, aiState) {
  // aiState.(x, y) is the ground point the pet stands on -- anchor the
  // canvas by its feet (near the bottom), not its visual center.
  const x = aiState.x - SPRITE_SIZE / 2;
  const y = aiState.y - SPRITE_SIZE * FOOT_Y_FRACTION;
  spriteEl.style.transform = `translate(${x}px, ${y}px) scaleX(${aiState.facing})`;
}

function applyBallTransform(ballEl, ball) {
  if (!ball) {
    ballEl.classList.add('hidden');
    return;
  }
  ballEl.classList.remove('hidden');
  ballEl.style.transform = `translate(${ball.x - BALL_SIZE / 2}px, ${ball.y - BALL_SIZE / 2}px)`;
}

function showBubble(root, text) {
  const bubble = root.querySelector('#petBubble');
  if (!bubble) return;
  bubble.textContent = text;
  bubble.classList.remove('hidden');
  clearTimeout(root._bubbleTimeout);
  root._bubbleTimeout = setTimeout(() => bubble.classList.add('hidden'), 1800);
}

const LEAF_COUNT = 7;

function renderSceneBackground() {
  return Array.from({ length: LEAF_COUNT }, (_, i) => {
    const left = 6 + (i * (88 / (LEAF_COUNT - 1)));
    const duration = 6 + (i % 4) * 1.5;
    const delay = -(i * 1.7);
    const drift = i % 2 === 0 ? 26 : -22;
    return `<div class="pet-leaf" style="left:${left}%; animation-duration:${duration}s; animation-delay:${delay}s; --leaf-drift:${drift}px;"></div>`;
  }).join('');
}

function stageBounds(stageEl) {
  return { width: stageEl.clientWidth || SPRITE_SIZE, height: stageEl.clientHeight || SPRITE_SIZE };
}

function stepLoop(timestamp) {
  const root = document.getElementById('petView');
  const stageEl = root && root.querySelector('.pet-stage');
  const spriteEl = root && root.querySelector('#petSprite');
  const ballEl = root && root.querySelector('#petBall');
  const bgCanvas = root && root.querySelector('#petBgCanvas');
  if (!root || !stageEl || !spriteEl || !ballEl || !bgCanvas || !activePetCharacter) {
    rafId = null;
    return;
  }

  const dtMs = lastFrameAt === null ? 16 : Math.min(timestamp - lastFrameAt, 100);
  lastFrameAt = timestamp;
  const bounds = stageBounds(stageEl);

  if (bgStartedAt === null) bgStartedAt = timestamp;
  if (bgDots) {
    stepAndDrawParticles(
      bgCanvas.getContext('2d'), bgDots, bgMode,
      (timestamp - bgStartedAt) / 1000, bgCanvas.width, bgCanvas.height, bgSpacing,
      { hover: bgHoverEnabled, mouse: bgMousePos }
    );
  }

  if (ballState) ballState = tickBall(ballState, dtMs, bounds);

  const character = activePetCharacter;
  const activity = character.activity ? ACTIVITIES[character.activity.id] : null;
  petAIState = tickPetAI(
    petAIState,
    dtMs,
    { activityCategory: activity ? activity.category : null, ball: ballState },
    bounds
  );

  if (isBallCaught(petAIState, ballState)) {
    ballState = null;
    showBubble(root, CATCH_REACTIONS[Math.floor(Math.random() * CATCH_REACTIONS.length)]);
  }

  applySpriteTransform(spriteEl, petAIState);
  applyBallTransform(ballEl, ballState);
  const animEl = spriteEl.querySelector('.pet-anim-inner');
  if (animEl) {
    const wantedClass = currentAnimClass(petAIState, activity);
    for (const cls of Object.values(ACTIVITY_ANIMATION_CLASS)) animEl.classList.remove(cls);
    animEl.classList.add(wantedClass);
  }

  rafId = requestAnimationFrame(stepLoop);
}

export function renderPetView(character, handlers) {
  const root = document.getElementById('petView');
  if (!root) return;

  if (petAICharacterId !== character.id) {
    petAIState = null; // (re)initialized below once we know the stage size
    petAICharacterId = character.id;
    ballState = null;
  }
  activePetCharacter = character;

  const activity = character.activity ? ACTIVITIES[character.activity.id] : null;
  const statusText = activity ? activity.name : 'Idle';

  root.innerHTML = `
    <div class="pet-stage" id="petStage">
      <canvas class="pet-bg-canvas" id="petBgCanvas"></canvas>
      ${renderSceneBackground()}
      <div class="pet-ground" id="petGround"></div>
      <div class="pet-sprite" id="petSprite" title="${character.name} - ${statusText}">
        <div class="pet-anim-inner"></div>
      </div>
      <div class="pet-ball hidden" id="petBall"></div>
      <div class="pet-bg-modes" id="petBgModes">
        ${PARTICLE_MODES.map(m => `<button type="button" class="pet-bg-mode-btn${m === bgMode ? ' active' : ''}" data-mode="${m}">${BG_MODE_LABELS[m]}</button>`).join('')}
      </div>
      <div class="pet-bg-controls" id="petBgControls">
        <button type="button" class="pet-bg-mode-btn${bgHoverEnabled ? ' active' : ''}" id="petBgHoverToggle">Hover</button>
        <label class="pet-bg-density">Density
          <input type="range" id="petBgDensity" min="${BG_SPACING_MIN}" max="${BG_SPACING_MAX}" value="${bgSpacing}">
        </label>
      </div>
      <div class="pet-status">${statusText}</div>
      <div class="pet-bubble hidden" id="petBubble"></div>
    </div>
  `;

  const stageEl = root.querySelector('#petStage');
  const spriteEl = root.querySelector('#petSprite');
  const ballEl = root.querySelector('#petBall');
  const groundEl = root.querySelector('#petGround');
  const bgCanvas = root.querySelector('#petBgCanvas');
  const bgModesEl = root.querySelector('#petBgModes');
  const bgControlsEl = root.querySelector('#petBgControls');
  const bgHoverToggleEl = root.querySelector('#petBgHoverToggle');
  const bgDensityEl = root.querySelector('#petBgDensity');
  const animEl = spriteEl.querySelector('.pet-anim-inner');

  groundEl.style.bottom = `${GROUND_INSET}px`;

  const bounds0 = stageBounds(stageEl);
  bgCanvas.width = bounds0.width;
  bgCanvas.height = bounds0.height;

  function reloadBgDots() {
    bgDots = null;
    loadDots(BG_IMAGE_SRC, bgCanvas.width, bgCanvas.height, bgSpacing).then((dots) => {
      bgDots = dots;
    });
  }
  reloadBgDots();

  bgModesEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.pet-bg-mode-btn');
    if (!btn) return;
    bgMode = btn.dataset.mode;
    for (const el of bgModesEl.querySelectorAll('.pet-bg-mode-btn')) el.classList.toggle('active', el === btn);
  });

  bgHoverToggleEl.addEventListener('click', () => {
    bgHoverEnabled = !bgHoverEnabled;
    bgHoverToggleEl.classList.toggle('active', bgHoverEnabled);
    if (!bgHoverEnabled) bgMousePos = null;
  });

  bgDensityEl.addEventListener('input', () => {
    bgSpacing = parseInt(bgDensityEl.value, 10);
    reloadBgDots();
  });

  stageEl.addEventListener('mousemove', (e) => {
    if (!bgHoverEnabled) return;
    const rect = stageEl.getBoundingClientRect();
    bgMousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  });
  stageEl.addEventListener('mouseleave', () => { bgMousePos = null; });

  const sprite = renderSprite(character);
  sprite.classList.add('pet-canvas');
  animEl.appendChild(sprite);

  if (!petAIState) {
    petAIState = createPetAIState(stageBounds(stageEl));
  }
  applySpriteTransform(spriteEl, petAIState);
  applyBallTransform(ballEl, ballState);
  animEl.classList.add(currentAnimClass(petAIState, activity));

  stageEl.addEventListener('click', (e) => {
    if (spriteEl.contains(e.target) || bgModesEl.contains(e.target) || bgControlsEl.contains(e.target)) return;
    const rect = stageEl.getBoundingClientRect();
    const clickPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    ballState = createBall(clickPoint, stageBounds(stageEl));
  });

  spriteEl.addEventListener('click', () => {
    showBubble(root, REACTIONS[Math.floor(Math.random() * REACTIONS.length)]);
    if (handlers && handlers.onPet) handlers.onPet();
  });

  if (rafId === null) {
    lastFrameAt = null;
    rafId = requestAnimationFrame(stepLoop);
  }
}
