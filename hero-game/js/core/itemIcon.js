import { ITEM_TEMPLATES } from '../data/items.js';
import { getShape, EFFECTS } from '../data/weaponShapes.js';

const cache = new Map();

const RARITY_GLOW = {
  common: 'rgba(180,180,180,0.35)',
  uncommon: 'rgba(90,200,120,0.5)',
  rare: 'rgba(90,150,255,0.6)',
  epic: 'rgba(200,110,255,0.7)'
};

// Renders a small icon-sized canvas for the given item template, cached by
// templateId + size since gear visuals don't change once defined.
export function renderItemIcon(templateId, size = 64) {
  const cacheKey = `${templateId}_${size}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const template = ITEM_TEMPLATES[templateId];
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!template) {
    cache.set(cacheKey, canvas);
    return canvas;
  }

  const shape = getShape(template.slot, template.weaponType);
  const effect = EFFECTS[template.element] || EFFECTS.none;

  ctx.save();
  const glow = RARITY_GLOW[template.rarity] || RARITY_GLOW.common;
  ctx.shadowColor = glow;
  ctx.shadowBlur = size * 0.18;
  if (shape) shape.draw(ctx, size, size);
  ctx.restore();

  if (template.element && template.element !== 'none') {
    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = effect.glow;
    ctx.globalAlpha = 0.28;
    ctx.fillRect(0, 0, size, size);
    ctx.restore();
  }

  cache.set(cacheKey, canvas);
  return canvas;
}

export function renderItemIconDataUrl(templateId, size = 64) {
  return renderItemIcon(templateId, size).toDataURL();
}
