// Recreates a source image as a grid of colored dots sampled from its pixels
// (same sampling technique as particles.html's "dots" mode), then offers a
// few of that file's per-mode displacement/tint functions plus its
// mouse-repel physics so the background can idle and react to hover.

export const PARTICLE_MODES = ['dots', 'waves', 'flames', 'snow'];

const REPEL_RADIUS = 40;
const REPEL_STRENGTH = 18;
const SPRING = 0.12;
const FRICTION = 0.82;

const imageCache = new Map(); // src -> Promise<HTMLImageElement>
const dotsCache = new Map(); // "src|width|height|spacing" -> dots

function loadImage(src) {
  if (!imageCache.has(src)) {
    imageCache.set(src, new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    }));
  }
  return imageCache.get(src);
}

// Samples the image onto a width x height canvas using cover-fit (anchored
// bottom-center, matching the old `background: ... center bottom / cover`),
// then grabs a color per grid cell. Each dot tracks both its home (sampled)
// position and a mutable current position/velocity for the repel physics.
function sampleDots(img, width, height, spacing) {
  const off = document.createElement('canvas');
  off.width = width;
  off.height = height;
  const offCtx = off.getContext('2d');

  const scale = Math.max(width / img.width, height / img.height);
  const drawW = img.width * scale;
  const drawH = img.height * scale;
  const dx = (width - drawW) / 2;
  const dy = height - drawH;
  offCtx.drawImage(img, dx, dy, drawW, drawH);

  const { data } = offCtx.getImageData(0, 0, width, height);
  const dots = [];
  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
      const a = data[idx + 3];
      if (a < 40) continue;
      const homeX = x + spacing / 2;
      const homeY = y + spacing / 2;
      dots.push({
        homeX, homeY, x: homeX, y: homeY, vx: 0, vy: 0,
        r: data[idx], g: data[idx + 1], b: data[idx + 2],
        luminance: 0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2],
        seed: Math.random() * 1000
      });
    }
  }
  return dots;
}

export async function loadDots(src, width, height, spacing = 5) {
  const key = `${src}|${width}|${height}|${spacing}`;
  if (dotsCache.has(key)) return dotsCache.get(key);
  const img = await loadImage(src);
  const dots = sampleDots(img, width, height, spacing);
  dotsCache.set(key, dots);
  return dots;
}

// Per-mode hook, ported from particles.html's applyMode(): returns the
// target (home-based) position + tinted color a dot should spring toward.
function applyMode(mode, d, t, height) {
  if (mode === 'waves') {
    const wave = Math.sin(t * 1.5 + d.homeX * 0.02 + d.seed) * 8;
    return { targetX: d.homeX, targetY: d.homeY + wave, r: d.r * 0.6, g: Math.min(255, d.g * 0.8 + 30), b: Math.min(255, d.b + 60) };
  }
  if (mode === 'flames') {
    const flicker = Math.sin(t * 6 + d.seed * 10) * 3 + Math.cos(t * 3.7 + d.seed) * 2.5;
    const rise = Math.abs(Math.sin(t * 2 + d.seed * 5)) * 4;
    const heat = 0.5 + 0.5 * Math.sin(t * 4 + d.seed * 7);
    return {
      targetX: d.homeX + flicker,
      targetY: d.homeY - rise,
      r: 255,
      g: Math.max(50, Math.min(200, 70 + d.luminance * 0.4 + heat * 70)),
      b: Math.max(0, 40 * heat - 20)
    };
  }
  if (mode === 'snow') {
    const targetX = d.homeX + Math.sin(t * 0.6 + d.seed) * 8;
    const span = height + 20;
    const targetY = ((d.homeY + t * 30 + d.seed * 50) % span) - 10;
    return { targetX, targetY, r: d.r * 0.8, g: Math.min(255, d.g * 0.85 + 20), b: Math.min(255, d.b + 50) };
  }
  return { targetX: d.homeX, targetY: d.homeY, r: d.r, g: d.g, b: d.b };
}

// Advances each dot's spring/repel physics one frame and draws it. Mutates
// `dots` in place (their x/y/vx/vy persist across calls) -- caller owns the
// animation loop and re-passes the same array each frame.
// options: { hover: boolean, mouse: {x, y} | null }
export function stepAndDrawParticles(ctx, dots, mode, t, width, height, spacing, options = {}) {
  const { hover = false, mouse = null } = options;
  ctx.clearRect(0, 0, width, height);
  const radius = spacing * 0.55;

  for (const d of dots) {
    const { targetX, targetY, r, g, b } = applyMode(mode, d, t, height);

    if (hover && mouse) {
      const dx = d.x - mouse.x;
      const dy = d.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
      if (dist < REPEL_RADIUS) {
        const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_STRENGTH;
        d.vx += (dx / dist) * force;
        d.vy += (dy / dist) * force;
      }
    }

    d.vx += (targetX - d.x) * SPRING;
    d.vy += (targetY - d.y) * SPRING;
    d.vx *= FRICTION;
    d.vy *= FRICTION;
    d.x += d.vx;
    d.y += d.vy;

    ctx.beginPath();
    ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
    ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
