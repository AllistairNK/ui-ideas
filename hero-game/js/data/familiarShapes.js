// Small canvas silhouettes for familiars, following the same draw(ctx, W, H)
// convention as weaponShapes.js's WEAPONS registry, so familiar chips render
// the same way item icons do (see itemIcon.js).
export const FAMILIAR_SHAPES = {
  bound_wisp: {
    draw(c, W, H) {
      const cx = W / 2, cy = H / 2;
      c.fillStyle = 'rgba(140,180,255,0.35)';
      c.beginPath();
      c.arc(cx, cy, W * 0.42, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = 'rgb(220,235,255)';
      c.beginPath();
      c.arc(cx, cy, W * 0.2, 0, Math.PI * 2);
      c.fill();
    }
  },
  chitin_swarm: {
    draw(c, W, H) {
      c.fillStyle = 'rgb(70,60,40)';
      const dots = [[0.35, 0.4], [0.6, 0.3], [0.5, 0.6], [0.7, 0.55], [0.3, 0.65]];
      for (const [dx, dy] of dots) {
        c.beginPath();
        c.arc(W * dx, H * dy, W * 0.09, 0, Math.PI * 2);
        c.fill();
      }
    }
  },
  clay_golem: {
    draw(c, W, H) {
      c.fillStyle = 'rgb(150,110,70)';
      c.fillRect(W * 0.3, H * 0.3, W * 0.4, H * 0.5);
      c.fillRect(W * 0.36, H * 0.15, W * 0.28, H * 0.22);
      c.fillStyle = 'rgb(90,60,35)';
      c.fillRect(W * 0.42, H * 0.23, W * 0.06, W * 0.06);
      c.fillRect(W * 0.56, H * 0.23, W * 0.06, W * 0.06);
    }
  },
  scrap_drone: {
    draw(c, W, H) {
      const cx = W / 2, cy = H / 2;
      c.fillStyle = 'rgb(150,155,160)';
      c.fillRect(cx - W * 0.2, cy - H * 0.14, W * 0.4, H * 0.28);
      c.strokeStyle = 'rgb(90,95,100)';
      c.lineWidth = Math.max(1, W * 0.04);
      c.beginPath();
      c.moveTo(cx - W * 0.32, cy);
      c.lineTo(cx + W * 0.32, cy);
      c.stroke();
      c.fillStyle = 'rgb(120,200,220)';
      c.beginPath();
      c.arc(cx, cy, W * 0.06, 0, Math.PI * 2);
      c.fill();
    }
  },
  bonded_wolf: {
    draw(c, W, H) {
      // Side-on wolf: body, head, pointed ear, tail.
      c.fillStyle = 'rgb(120,120,128)';
      c.beginPath();
      c.ellipse(W * 0.46, H * 0.56, W * 0.24, H * 0.13, 0, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.ellipse(W * 0.72, H * 0.42, W * 0.12, H * 0.1, -0.3, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.moveTo(W * 0.7, H * 0.33);
      c.lineTo(W * 0.74, H * 0.2);
      c.lineTo(W * 0.79, H * 0.34);
      c.closePath();
      c.fill();
      c.beginPath();
      c.moveTo(W * 0.24, H * 0.52);
      c.quadraticCurveTo(W * 0.1, H * 0.4, W * 0.12, H * 0.3);
      c.lineTo(W * 0.26, H * 0.58);
      c.closePath();
      c.fill();
      c.fillRect(W * 0.3, H * 0.62, W * 0.06, H * 0.2);
      c.fillRect(W * 0.56, H * 0.62, W * 0.06, H * 0.2);
      c.fillStyle = 'rgb(255,210,90)';
      c.beginPath();
      c.arc(W * 0.76, H * 0.4, W * 0.025, 0, Math.PI * 2);
      c.fill();
    }
  },
  tethered_spirit: {
    draw(c, W, H) {
      // Ghost silhouette: domed head, wavy trailing hem, hollow eyes.
      const cx = W / 2;
      c.fillStyle = 'rgba(120,230,210,0.3)';
      c.beginPath();
      c.arc(cx, H * 0.42, W * 0.36, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = 'rgba(200,250,240,0.9)';
      c.beginPath();
      c.moveTo(cx - W * 0.22, H * 0.78);
      c.lineTo(cx - W * 0.22, H * 0.4);
      c.arc(cx, H * 0.4, W * 0.22, Math.PI, 0);
      c.lineTo(cx + W * 0.22, H * 0.78);
      for (let i = 0; i < 3; i++) {
        const x0 = cx + W * 0.22 - i * W * 0.1467;
        c.quadraticCurveTo(x0 - W * 0.073, H * 0.68, x0 - W * 0.1467, H * 0.78);
      }
      c.closePath();
      c.fill();
      c.fillStyle = 'rgb(30,60,70)';
      c.beginPath();
      c.ellipse(cx - W * 0.08, H * 0.42, W * 0.035, H * 0.055, 0, 0, Math.PI * 2);
      c.ellipse(cx + W * 0.08, H * 0.42, W * 0.035, H * 0.055, 0, 0, Math.PI * 2);
      c.fill();
    }
  },
  aether_construct: {
    draw(c, W, H) {
      const cx = W / 2, cy = H / 2;
      c.fillStyle = 'rgb(150,155,160)';
      c.fillRect(cx - W * 0.22, cy - H * 0.16, W * 0.44, H * 0.32);
      c.strokeStyle = 'rgb(90,95,100)';
      c.lineWidth = Math.max(1, W * 0.04);
      c.beginPath();
      c.moveTo(cx - W * 0.34, cy);
      c.lineTo(cx + W * 0.34, cy);
      c.stroke();
      c.fillStyle = 'rgba(150,120,255,0.4)';
      c.beginPath();
      c.arc(cx, cy, W * 0.4, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = 'rgb(190,150,255)';
      c.beginPath();
      c.arc(cx, cy, W * 0.08, 0, Math.PI * 2);
      c.fill();
    }
  }
};

const cache = new Map();

// Renders a small icon-sized canvas for the given familiar id, cached by
// id + size, mirroring itemIcon.js's renderItemIcon caching.
export function renderFamiliarIconCanvas(familiarId, size = 64) {
  const cacheKey = `${familiarId}_${size}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const shape = FAMILIAR_SHAPES[familiarId];
  if (shape) shape.draw(ctx, size, size);

  cache.set(cacheKey, canvas);
  return canvas;
}

export function renderFamiliarIcon(familiarId, size = 64) {
  return renderFamiliarIconCanvas(familiarId, size).toDataURL();
}
