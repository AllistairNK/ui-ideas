// Lifted from ../../../weapons.html: vector silhouettes + elemental palettes,
// reused here to render equipment icons and the pet-view sprite's gear layers.

export const WEAPONS = {
  sword: {
    name: 'Sword',
    draw(c, W, H) {
      const cx = W / 2;
      c.fillStyle = 'rgb(205,208,215)';
      c.beginPath();
      c.moveTo(cx, H * 0.04);
      c.lineTo(cx - W * 0.07, H * 0.58);
      c.lineTo(cx + W * 0.07, H * 0.58);
      c.closePath();
      c.fill();
      c.fillStyle = 'rgb(90,90,100)';
      c.fillRect(cx - W * 0.16, H * 0.58, W * 0.32, H * 0.04);
      c.fillStyle = 'rgb(120,80,50)';
      c.fillRect(cx - W * 0.035, H * 0.62, W * 0.07, H * 0.25);
      c.fillStyle = 'rgb(90,90,100)';
      c.beginPath();
      c.arc(cx, H * 0.9, W * 0.05, 0, Math.PI * 2);
      c.fill();
    }
  },
  axe: {
    name: 'Axe',
    draw(c, W, H) {
      const cx = W / 2;
      c.fillStyle = 'rgb(120,80,50)';
      c.fillRect(cx - W * 0.03, H * 0.16, W * 0.06, H * 0.75);
      c.fillStyle = 'rgb(200,203,210)';
      c.beginPath();
      c.moveTo(cx, H * 0.11);
      c.quadraticCurveTo(cx - W * 0.35, H * 0.08, cx - W * 0.37, H * 0.3);
      c.quadraticCurveTo(cx - W * 0.23, H * 0.42, cx, H * 0.36);
      c.closePath();
      c.fill();
      c.beginPath();
      c.moveTo(cx, H * 0.11);
      c.quadraticCurveTo(cx + W * 0.23, H * 0.08, cx + W * 0.25, H * 0.28);
      c.quadraticCurveTo(cx + W * 0.15, H * 0.36, cx, H * 0.36);
      c.closePath();
      c.fill();
    }
  },
  bow: {
    name: 'Bow',
    draw(c, W, H) {
      const cx = W / 2 - W * 0.08;
      const topY = H * 0.11, botY = H * 0.89, midY = H * 0.5;
      c.strokeStyle = 'rgb(150,100,55)';
      c.lineWidth = Math.max(2, W * 0.04);
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(cx, topY);
      c.quadraticCurveTo(cx + W * 0.54, midY, cx, botY);
      c.stroke();
      c.strokeStyle = 'rgb(55,40,30)';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(cx, topY);
      c.lineTo(cx - W * 0.23, midY);
      c.lineTo(cx, botY);
      c.stroke();
      c.strokeStyle = 'rgb(190,190,198)';
      c.lineWidth = Math.max(1, W * 0.015);
      c.beginPath();
      c.moveTo(cx - W * 0.35, midY);
      c.lineTo(cx + W * 0.46, midY);
      c.stroke();
      c.fillStyle = 'rgb(190,190,200)';
      c.beginPath();
      c.moveTo(cx + W * 0.56, midY);
      c.lineTo(cx + W * 0.46, midY - H * 0.04);
      c.lineTo(cx + W * 0.46, midY + H * 0.04);
      c.closePath();
      c.fill();
    }
  },
  staff: {
    name: 'Staff',
    draw(c, W, H) {
      const cx = W / 2;
      c.fillStyle = 'rgb(120,80,50)';
      c.fillRect(cx - W * 0.027, H * 0.19, W * 0.054, H * 0.8);
      c.fillStyle = 'rgb(150,110,190)';
      c.beginPath();
      c.arc(cx, H * 0.13, W * 0.12, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = 'rgba(230,210,255,0.7)';
      c.beginPath();
      c.arc(cx, H * 0.13, W * 0.06, 0, Math.PI * 2);
      c.fill();
    }
  },
  dagger: {
    name: 'Dagger',
    draw(c, W, H) {
      const cx = W / 2;
      c.fillStyle = 'rgb(210,213,220)';
      c.beginPath();
      c.moveTo(cx, H * 0.25);
      c.lineTo(cx - W * 0.046, H * 0.53);
      c.lineTo(cx + W * 0.046, H * 0.53);
      c.closePath();
      c.fill();
      c.fillStyle = 'rgb(90,90,100)';
      c.fillRect(cx - W * 0.09, H * 0.53, W * 0.18, H * 0.03);
      c.fillStyle = 'rgb(120,80,50)';
      c.fillRect(cx - W * 0.027, H * 0.56, W * 0.054, H * 0.17);
      c.fillStyle = 'rgb(90,90,100)';
      c.beginPath();
      c.arc(cx, H * 0.75, W * 0.038, 0, Math.PI * 2);
      c.fill();
    }
  },
  hammer: {
    name: 'Hammer',
    draw(c, W, H) {
      const cx = W / 2;
      c.fillStyle = 'rgb(120,80,50)';
      c.fillRect(cx - W * 0.03, H * 0.25, W * 0.06, H * 0.72);
      c.fillStyle = 'rgb(140,140,150)';
      c.fillRect(cx - W * 0.27, H * 0.11, W * 0.54, H * 0.17);
      c.fillStyle = 'rgb(100,100,110)';
      c.fillRect(cx - W * 0.27, H * 0.11, W * 0.54, H * 0.04);
    }
  },
  spear: {
    name: 'Spear',
    draw(c, W, H) {
      const cx = W / 2;
      c.fillStyle = 'rgb(120,80,50)';
      c.fillRect(cx - W * 0.023, H * 0.25, W * 0.046, H * 0.83);
      c.fillStyle = 'rgb(90,90,100)';
      c.fillRect(cx - W * 0.06, H * 0.24, W * 0.12, H * 0.03);
      c.fillStyle = 'rgb(210,213,220)';
      c.beginPath();
      c.moveTo(cx, H * 0.04);
      c.lineTo(cx - W * 0.054, H * 0.25);
      c.lineTo(cx + W * 0.054, H * 0.25);
      c.closePath();
      c.fill();
    }
  },
  gauntlet: {
    name: 'Gauntlet',
    draw(c, W, H) {
      const cx = W / 2;
      c.fillStyle = 'rgb(120,80,50)';
      c.fillRect(cx - W * 0.1, H * 0.82, W * 0.2, H * 0.12);
      c.fillStyle = 'rgb(150,153,162)';
      c.fillRect(cx - W * 0.16, H * 0.34, W * 0.32, H * 0.5);
      c.fillStyle = 'rgb(110,113,122)';
      c.fillRect(cx - W * 0.2, H * 0.24, W * 0.4, H * 0.14);
      c.fillStyle = 'rgb(90,90,100)';
      for (let i = -1; i <= 1; i++) {
        c.beginPath();
        c.arc(cx + i * W * 0.13, H * 0.3, W * 0.045, 0, Math.PI * 2);
        c.fill();
      }
    }
  },
  gun: {
    name: 'Gun',
    draw(c, W, H) {
      const cx = W / 2;
      c.fillStyle = 'rgb(90,90,100)';
      c.fillRect(cx - W * 0.32, H * 0.42, W * 0.5, H * 0.14);
      c.fillStyle = 'rgb(60,60,68)';
      c.fillRect(cx + W * 0.16, H * 0.4, W * 0.12, H * 0.18);
      c.strokeStyle = 'rgb(150,200,255)';
      c.lineWidth = Math.max(1, W * 0.02);
      c.beginPath();
      c.moveTo(cx - W * 0.3, H * 0.49);
      c.lineTo(cx - W * 0.05, H * 0.49);
      c.stroke();
      c.fillStyle = 'rgb(120,80,50)';
      c.beginPath();
      c.moveTo(cx - W * 0.18, H * 0.56);
      c.lineTo(cx - W * 0.05, H * 0.56);
      c.lineTo(cx - W * 0.08, H * 0.86);
      c.lineTo(cx - W * 0.2, H * 0.86);
      c.closePath();
      c.fill();
    }
  }
};

// Simple placeholder armor silhouettes -- one per non-weapon equipment slot.
// These are intentionally plain (boxy/rounded blocks) since the visual style
// is still undecided; itemIcon.js and petView.js drive color/rarity on top.
export const ARMOR_SHAPES = {
  head: {
    name: 'Helm',
    draw(c, W, H) {
      c.fillStyle = 'rgb(180,183,190)';
      c.beginPath();
      c.arc(W / 2, H * 0.55, W * 0.38, Math.PI, 0);
      c.fill();
      c.fillRect(W * 0.12, H * 0.5, W * 0.76, H * 0.14);
    }
  },
  body: {
    name: 'Chestplate',
    draw(c, W, H) {
      c.fillStyle = 'rgb(170,173,182)';
      c.beginPath();
      c.moveTo(W * 0.22, H * 0.08);
      c.lineTo(W * 0.78, H * 0.08);
      c.lineTo(W * 0.9, H * 0.9);
      c.lineTo(W * 0.1, H * 0.9);
      c.closePath();
      c.fill();
    }
  },
  hands: {
    name: 'Gauntlets',
    draw(c, W, H) {
      c.fillStyle = 'rgb(160,163,172)';
      c.fillRect(W * 0.2, H * 0.25, W * 0.6, H * 0.55);
      c.beginPath();
      c.arc(W / 2, H * 0.25, W * 0.3, Math.PI, 0);
      c.fill();
    }
  },
  legs: {
    name: 'Greaves',
    draw(c, W, H) {
      c.fillStyle = 'rgb(165,168,177)';
      c.fillRect(W * 0.28, H * 0.08, W * 0.2, H * 0.84);
      c.fillRect(W * 0.52, H * 0.08, W * 0.2, H * 0.84);
    }
  },
  offhand: {
    name: 'Shield',
    draw(c, W, H) {
      c.fillStyle = 'rgb(150,110,60)';
      c.beginPath();
      c.moveTo(W / 2, H * 0.06);
      c.quadraticCurveTo(W * 0.94, H * 0.18, W * 0.86, H * 0.55);
      c.quadraticCurveTo(W * 0.72, H * 0.88, W / 2, H * 0.96);
      c.quadraticCurveTo(W * 0.28, H * 0.88, W * 0.14, H * 0.55);
      c.quadraticCurveTo(W * 0.06, H * 0.18, W / 2, H * 0.06);
      c.fill();
    }
  },
  quest: {
    name: 'Cog',
    draw(c, W, H) {
      c.fillStyle = 'rgb(180,130,60)';
      c.save();
      c.translate(W / 2, H / 2);
      const teeth = 8;
      const outerR = W * 0.34;
      const innerR = W * 0.24;
      c.beginPath();
      for (let i = 0; i < teeth * 2; i++) {
        const r = i % 2 === 0 ? outerR : outerR * 0.82;
        const angle = (Math.PI * 2 * i) / (teeth * 2);
        c.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      }
      c.closePath();
      c.fill();
      c.fillStyle = 'rgb(40,30,20)';
      c.beginPath();
      c.arc(0, 0, innerR * 0.4, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
  },
  accessory: {
    name: 'Amulet',
    draw(c, W, H) {
      c.strokeStyle = 'rgb(190,170,90)';
      c.lineWidth = Math.max(1, W * 0.03);
      c.beginPath();
      c.moveTo(W * 0.3, H * 0.05);
      c.lineTo(W * 0.7, H * 0.05);
      c.stroke();
      c.fillStyle = 'rgb(210,190,110)';
      c.beginPath();
      c.arc(W / 2, H * 0.55, W * 0.22, 0, Math.PI * 2);
      c.fill();
    }
  }
};

export const EFFECTS = {
  none: { name: 'Plain', adjective: '', glow: '#888888' },
  fire: { name: 'Fire', adjective: 'Flaming', glow: '#ff8a3d' },
  ice: { name: 'Ice', adjective: 'Frozen', glow: '#8fd6ff' },
  lightning: { name: 'Lightning', adjective: 'Storm-Charged', glow: '#c9e8ff' },
  poison: { name: 'Poison', adjective: 'Venomous', glow: '#9dff5c' },
  holy: { name: 'Holy', adjective: 'Blessed', glow: '#ffe9a8' },
  void: { name: 'Void', adjective: 'Cursed', glow: '#b06bff' },
  wind: { name: 'Wind', adjective: 'Windforged', glow: '#d8f5ff' }
};

export function getShape(slot, weaponType) {
  if (slot === 'weapon' && weaponType && WEAPONS[weaponType]) return WEAPONS[weaponType];
  return ARMOR_SHAPES[slot] || null;
}
