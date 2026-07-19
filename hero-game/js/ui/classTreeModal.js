import { CLASSES, CLASS_CHOICE_LEVEL, CLASS_CHOICES, SECRET_CLASS_IDS } from '../data/classes.js';
import { HIDDEN_TRAITS } from '../data/traits.js';
import { meetsAttributeReqs, getApprenticeshipLevel } from './classPanel.js';
import { attachRichTooltips } from './richTooltip.js';

// Radial ("spider web") layout: Peasant sits at the center, each tier-1
// branch claims an even slice of the circle, and evolution chains radiate
// straight outward along their branch's angle -- tier maps to ring radius,
// so every class in one chain (e.g. the tech branch) sits on the same spoke.
const RING_GAP = 190;
const NODE_W = 138;
const NODE_H = 54;
const MAX_TIER = Math.max(...Object.values(CLASSES).map((c) => c.tier));

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 1.15;

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function parentOf(classId) {
  const def = CLASSES[classId];
  if (classId === 'peasant') return null;
  if (def.evolvesFrom) return def.evolvesFrom;
  return 'peasant'; // every tier-1 class (mainline or secret) branches off Peasant
}

// Which tier-1 branch a class belongs to (itself, for tier-1/0 classes) --
// used to look up that branch's angle slice so the whole chain shares one spoke.
function branchRootOf(classId) {
  let cur = classId;
  while (CLASSES[cur].tier > 1) cur = CLASSES[cur].evolvesFrom;
  return cur;
}

function computeLayout() {
  const positions = { peasant: { radius: 0, angle: 0 } };
  const branches = [...CLASS_CHOICES, ...SECRET_CLASS_IDS];
  const angleStep = (2 * Math.PI) / branches.length;

  for (const classId of Object.keys(CLASSES)) {
    if (classId === 'peasant') continue;
    const def = CLASSES[classId];
    const branchIndex = branches.indexOf(branchRootOf(classId));
    const angle = branchIndex * angleStep - Math.PI / 2; // start pointing up, go clockwise
    positions[classId] = { radius: def.tier * RING_GAP, angle };
  }
  return positions;
}

function isTraitDiscovered(character, traitId) {
  return (character.traits || []).some((t) => t.id === traitId && t.discovered);
}

function hasTrait(character, traitId) {
  return (character.traits || []).some((t) => t.id === traitId);
}

// Status drives the node's color/state -- 'current' (the class you're
// playing now), 'unlocked' (a class you've already passed through on an
// evolution chain), 'ready' (requirements met, pick it whenever), or
// 'locked' (requirements not yet met -- tooltip explains what's missing).
function getNodeStatus(character, classId) {
  if (character.class === classId) return 'current';
  if ((character.flags.unlockedClasses || []).includes(classId)) return 'unlocked';

  const def = CLASSES[classId];
  if (def.tier === 0) return character.level >= 1 ? 'ready' : 'locked';

  if (def.tier === 1) {
    if (character.class !== 'peasant') return 'locked'; // path already committed elsewhere
    const levelOk = character.level >= (def.unlockLevel || CLASS_CHOICE_LEVEL);
    const attrsOk = meetsAttributeReqs(character, def.unlockAttributeReqs);
    const traitOk = !def.requiredTrait || hasTrait(character, def.requiredTrait);
    return (levelOk && attrsOk && traitOk) ? 'ready' : 'locked';
  }

  // Tier 2+: only reachable while currently the prior class in the chain.
  if (character.class !== def.evolvesFrom) return 'locked';
  const evo = CLASSES[def.evolvesFrom].evolution;
  if (!evo) return 'locked';
  if (evo.unlockApprenticeshipLevel != null) {
    return getApprenticeshipLevel(character, evo.branchId) >= evo.unlockApprenticeshipLevel ? 'ready' : 'locked';
  }
  return character.level >= evo.unlockLevel ? 'ready' : 'locked';
}

function requirementLines(character, classId) {
  const def = CLASSES[classId];
  const lines = [];

  if (def.tier === 0) return lines;

  if (def.tier === 1) {
    const minLevel = def.unlockLevel || CLASS_CHOICE_LEVEL;
    lines.push(`Level ${minLevel}+ <span class="tt-req-current">(you: ${character.level})</span>`);
    for (const [attr, min] of Object.entries(def.unlockAttributeReqs || {})) {
      const have = character.attributes[attr] || 0;
      lines.push(`${attr} ${min}+ <span class="tt-req-current">(you: ${Math.floor(have)})</span>`);
    }
    if (def.requiredTrait) {
      const traitDef = HIDDEN_TRAITS[def.requiredTrait];
      const owned = hasTrait(character, def.requiredTrait);
      const seen = isTraitDiscovered(character, def.requiredTrait);
      const traitStatus = owned ? (seen ? '(discovered)' : '(sensed, undiscovered)') : '(not yet found)';
      lines.push(`Hidden trait: ${traitDef ? traitDef.name : def.requiredTrait} <span class="tt-req-current">${traitStatus}</span>`);
    }
    return lines;
  }

  // Tier 2+: requirement lives on the parent's `evolution` field.
  const parentDef = CLASSES[def.evolvesFrom];
  lines.push(`Currently: ${CLASSES[def.evolvesFrom].name} <span class="tt-req-current">${character.class === def.evolvesFrom ? '(yes)' : '(no)'}</span>`);
  const evo = parentDef.evolution;
  if (evo) {
    if (evo.unlockApprenticeshipLevel != null) {
      const current = getApprenticeshipLevel(character, evo.branchId);
      lines.push(`Apprenticeship level ${evo.unlockApprenticeshipLevel}+ <span class="tt-req-current">(you: ${current})</span>`);
    } else {
      lines.push(`Level ${evo.unlockLevel}+ <span class="tt-req-current">(you: ${character.level})</span>`);
    }
  }
  return lines;
}

function nodeTooltip(character, classId) {
  const def = CLASSES[classId];
  const parts = [`<div class="tt-title">${escapeHtml(def.name)}</div>`];
  if (def.flavor) parts.push(`<div class="tt-flavor">${escapeHtml(def.flavor)}</div>`);
  const reqs = requirementLines(character, classId);
  if (reqs.length) {
    parts.push(`<div class="tt-bonuses">${reqs.join('<br>')}</div>`);
  } else {
    parts.push('<div class="tt-bonuses">Starting class -- no requirements.</div>');
  }
  return escapeAttr(parts.join(''));
}

function nodeCenter(pos, cx, cy) {
  return {
    x: cx + pos.radius * Math.cos(pos.angle),
    y: cy + pos.radius * Math.sin(pos.angle)
  };
}

function renderNode(character, classId, positions, cx, cy) {
  const def = CLASSES[classId];
  const center = nodeCenter(positions[classId], cx, cy);
  const status = getNodeStatus(character, classId);
  // Locked names render as a live-scrambling placeholder (see startScrambleLoop)
  // instead of the real text, to read as "still encrypted" -- the actual name
  // and requirements are still available via the hover tooltip either way.
  const nameHtml = status === 'locked'
    ? `<span class="ctn-name ctn-name-scrambled" data-scramble-name="${escapeAttr(def.name)}"></span>`
    : `<span class="ctn-name">${escapeHtml(def.name)}</span>`;

  return `
    <div class="class-tree-node class-tree-node-${status}" data-rich-tooltip="${nodeTooltip(character, classId)}"
      style="left:${center.x - NODE_W / 2}px; top:${center.y - NODE_H / 2}px; width:${NODE_W}px; height:${NODE_H}px;" tabindex="0">
      ${nameHtml}
      <span class="ctn-tier">${def.tier === 0 ? 'Origin' : `Tier ${def.tier}`}</span>
    </div>`;
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&?';

// Keeps every locked node's name flickering through random characters
// (preserving spaces, so word shape stays roughly readable as "encrypted"
// rather than a solid block). One shared interval for all of them rather
// than one per node. Returns a stop function.
function startScrambleLoop(root) {
  const intervalId = setInterval(() => {
    root.querySelectorAll('.ctn-name-scrambled').forEach((el) => {
      const real = el.dataset.scrambleName || '';
      el.textContent = real.split('').map((ch) => (
        ch === ' ' ? ' ' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      )).join('');
    });
  }, 110);
  return () => clearInterval(intervalId);
}

function renderWeb(positions, cx, cy) {
  const maxRadius = MAX_TIER * RING_GAP;
  const width = cx * 2;
  const height = cy * 2;

  // Concentric rings, one per tier, plus radial spokes out to each tier-1
  // branch -- the "web" backdrop the class/edge lines sit on top of.
  const rings = Array.from({ length: MAX_TIER }, (_, i) => {
    const r = (i + 1) * RING_GAP;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" class="class-tree-ring" fill="none" />`;
  }).join('');

  const branches = [...CLASS_CHOICES, ...SECRET_CLASS_IDS];
  const angleStep = (2 * Math.PI) / branches.length;
  const spokes = branches.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = cx + maxRadius * Math.cos(angle);
    const y = cy + maxRadius * Math.sin(angle);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="class-tree-spoke" />`;
  }).join('');

  const edges = Object.keys(CLASSES).map((classId) => {
    const parentId = parentOf(classId);
    if (!parentId) return '';
    const p = nodeCenter(positions[parentId], cx, cy);
    const c = nodeCenter(positions[classId], cx, cy);
    return `<line x1="${p.x}" y1="${p.y}" x2="${c.x}" y2="${c.y}" class="class-tree-edge" />`;
  }).join('');

  return { svg: `<svg class="class-tree-edges" width="${width}" height="${height}">${rings}${spokes}${edges}</svg>`, width, height };
}

// Pan/zoom state lives entirely on the transform of .class-tree-canvas
// inside a fixed-size, overflow-hidden viewport -- no scrollbars. Drag pans,
// wheel zooms toward the cursor, +/- buttons zoom toward the viewport center.
function initPanZoom(viewport, canvas, initialScale, initialX, initialY, signal) {
  let scale = initialScale;
  let panX = initialX;
  let panY = initialY;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;

  function apply() {
    canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  }
  apply();

  function zoomAt(clientX, clientY, factor) {
    const rect = viewport.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, scale * factor));
    const worldX = (mx - panX) / scale;
    const worldY = (my - panY) / scale;
    scale = newScale;
    panX = mx - worldX * scale;
    panY = my - worldY * scale;
    apply();
  }

  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP);
  }, { passive: false, signal });

  viewport.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    viewport.classList.add('class-tree-grabbing');
  }, { signal });
  // Listen on window (not just viewport) so a drag that overshoots the
  // viewport bounds keeps tracking instead of dropping mid-pan -- cleaned
  // up via `signal` when the modal closes, since these outlive one render.
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    panX += e.clientX - lastX;
    panY += e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    apply();
  }, { signal });
  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('class-tree-grabbing');
  }, { signal });

  return {
    zoomIn: () => zoomAt(viewport.getBoundingClientRect().left + viewport.clientWidth / 2, viewport.getBoundingClientRect().top + viewport.clientHeight / 2, ZOOM_STEP),
    zoomOut: () => zoomAt(viewport.getBoundingClientRect().left + viewport.clientWidth / 2, viewport.getBoundingClientRect().top + viewport.clientHeight / 2, 1 / ZOOM_STEP),
    reset: () => { scale = initialScale; panX = initialX; panY = initialY; apply(); }
  };
}

export function showClassTreeModal(character) {
  const root = document.getElementById('classTreeModal');
  if (!root) return;

  const positions = computeLayout();
  const pad = NODE_W / 2 + 24;
  const cx = MAX_TIER * RING_GAP + pad;
  const cy = cx;
  const { svg, width, height } = renderWeb(positions, cx, cy);
  const nodes = Object.keys(CLASSES).map((classId) => renderNode(character, classId, positions, cx, cy)).join('');

  root.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-box class-tree-box">
        <div class="modal-title">Class Tree</div>
        <div class="class-tree-legend">
          <span class="ctl-swatch ctl-current"></span> Current
          <span class="ctl-swatch ctl-unlocked"></span> Unlocked
          <span class="ctl-swatch ctl-ready"></span> Ready
          <span class="ctl-swatch ctl-locked"></span> Locked
          <span class="class-tree-hint">Drag to pan &middot; Scroll to zoom</span>
        </div>
        <div class="class-tree-viewport">
          <div class="class-tree-canvas" style="width:${width}px; height:${height}px;">
            ${svg}
            ${nodes}
          </div>
          <div class="class-tree-zoom-controls">
            <button type="button" data-action="zoom-in" title="Zoom in">+</button>
            <button type="button" data-action="zoom-out" title="Zoom out">&minus;</button>
            <button type="button" data-action="zoom-reset" title="Reset view">&#8635;</button>
          </div>
        </div>
        <button type="button" data-action="close">Close</button>
      </div>
    </div>
  `;
  root.classList.remove('hidden');
  attachRichTooltips(root);
  const stopScramble = startScrambleLoop(root);

  const viewport = root.querySelector('.class-tree-viewport');
  const canvas = root.querySelector('.class-tree-canvas');
  const initialScale = 0.55;
  const initialX = viewport.clientWidth / 2 - cx * initialScale;
  const initialY = viewport.clientHeight / 2 - cy * initialScale;
  const panZoomController = new AbortController();
  const panZoom = initPanZoom(viewport, canvas, initialScale, initialX, initialY, panZoomController.signal);

  root.querySelector('[data-action="zoom-in"]').addEventListener('click', panZoom.zoomIn);
  root.querySelector('[data-action="zoom-out"]').addEventListener('click', panZoom.zoomOut);
  root.querySelector('[data-action="zoom-reset"]').addEventListener('click', panZoom.reset);

  function close() {
    panZoomController.abort();
    stopScramble();
    root.classList.add('hidden');
    root.innerHTML = '';
  }

  root.querySelector('[data-action="close"]').addEventListener('click', close);
  root.querySelector('.modal-backdrop').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) close();
  });
}
