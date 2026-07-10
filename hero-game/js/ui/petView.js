import { ITEM_TEMPLATES } from '../data/items.js';
import { getShape } from '../data/weaponShapes.js';
import { ACTIVITIES } from '../data/activities.js';

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

function renderSprite(character, size = 160) {
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

export function renderPetView(character, handlers) {
  const root = document.getElementById('petView');
  if (!root) return;

  const activity = character.activity ? ACTIVITIES[character.activity.id] : null;
  const animClass = ACTIVITY_ANIMATION_CLASS[activity ? activity.category : 'idle'] || 'pet-anim-idle';
  const statusText = activity ? activity.name : 'Idle';

  root.innerHTML = `
    <div class="pet-stage">
      <div class="pet-sprite ${animClass}" id="petSprite" title="${character.name} - ${statusText}"></div>
      <div class="pet-status">${statusText}</div>
      <div class="pet-bubble hidden" id="petBubble"></div>
    </div>
  `;

  const sprite = renderSprite(character);
  sprite.classList.add('pet-canvas');
  root.querySelector('#petSprite').appendChild(sprite);

  root.querySelector('#petSprite').addEventListener('click', () => {
    const bubble = root.querySelector('#petBubble');
    bubble.textContent = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
    bubble.classList.remove('hidden');
    clearTimeout(root._bubbleTimeout);
    root._bubbleTimeout = setTimeout(() => bubble.classList.add('hidden'), 1800);
    if (handlers && handlers.onPet) handlers.onPet();
  });
}
