/* Athos Bulcão-inspired generative tile system
   Each motif is a self-contained 100x100 SVG group, rotated 0/90/180/270. */

(function(){
  const MOTIFS = {
    // Quarter-circle arc, very Bulcão
    arc: (color) => `<path d="M 0 100 A 100 100 0 0 1 100 0" fill="none" stroke="${color}" stroke-width="18"/>`,
    arcThin: (color) => `<path d="M 0 100 A 100 100 0 0 1 100 0" fill="none" stroke="${color}" stroke-width="10"/>`,
    // Double concentric arc
    doubleArc: (color) => `
      <path d="M 0 100 A 100 100 0 0 1 100 0" fill="none" stroke="${color}" stroke-width="8"/>
      <path d="M 0 70 A 70 70 0 0 1 70 0" fill="none" stroke="${color}" stroke-width="8"/>
      <path d="M 0 40 A 40 40 0 0 1 40 0" fill="none" stroke="${color}" stroke-width="8"/>
    `,
    // Solid quarter-disc
    disc: (color) => `<path d="M 0 0 L 100 0 A 100 100 0 0 1 0 100 Z" fill="${color}"/>`,
    // Triangle
    tri: (color) => `<path d="M 0 0 L 100 0 L 0 100 Z" fill="${color}"/>`,
    // Squiggle (S-curve)
    squiggle: (color) => `<path d="M 10 50 Q 30 10 50 50 T 90 50" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round"/>`,
    // Chevron/banana
    banana: (color) => `<path d="M 20 80 Q 20 20 80 20" fill="none" stroke="${color}" stroke-width="22" stroke-linecap="round"/>`,
    // Dot grid
    dots: (color) => `
      <circle cx="25" cy="25" r="10" fill="${color}"/>
      <circle cx="75" cy="25" r="10" fill="${color}"/>
      <circle cx="25" cy="75" r="10" fill="${color}"/>
      <circle cx="75" cy="75" r="10" fill="${color}"/>
    `,
    // Diamond
    diamond: (color) => `<path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" fill="${color}"/>`,
    // Half-circle
    half: (color) => `<path d="M 0 50 A 50 50 0 0 1 100 50 Z" fill="${color}"/>`,
    // Eye / lens (almond shape)
    eye: (color) => `<path d="M 10 50 Q 50 15 90 50 Q 50 85 10 50 Z" fill="${color}"/>`,
    // Plus / cross
    plus: (color) => `<path d="M 40 15 L 60 15 L 60 40 L 85 40 L 85 60 L 60 60 L 60 85 L 40 85 L 40 60 L 15 60 L 15 40 L 40 40 Z" fill="${color}"/>`,
    // Thick centered vertical bar (Bulcão stripe)
    stripe: (color) => `<rect x="40" y="0" width="20" height="100" fill="${color}"/>`,
    // Thin bar near top edge
    stripeEdge: (color) => `<rect x="0" y="28" width="100" height="18" fill="${color}"/>`,
    // Large lens (two mirrored quarter-discs) — pairs with disc for image-2 style
    lens: (color) => `<path d="M 0 0 A 100 100 0 0 1 100 100 L 100 0 A 100 100 0 0 1 0 100 Z" fill="${color}"/>`,
    // Empty
    blank: () => ``,
  };

  function seededRandom(seed) {
    let s = seed;
    return function() {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  /**
   * Render a generative tile grid.
   * @param {number} cols - number of columns
   * @param {number} rows - number of rows
   * @param {Object} opts
   *   - motifs: array of motif keys to use
   *   - colors: array of color strings
   *   - bg: background color (or null for transparent)
   *   - density: 0-1, chance a cell is populated (else blank)
   *   - tileSize: svg units per tile (default 100)
   *   - seed: number for reproducibility
   *   - rotateRandom: allow random 90° rotations (default true)
   */
  window.bulcaoTiles = function(cols, rows, opts = {}) {
    const {
      motifs = ['arc', 'arc', 'disc', 'tri', 'squiggle'],
      colors = ['#1a3a8f'],
      bg = null,
      density = 0.85,
      tileSize = 100,
      seed = 42,
      rotateRandom = true,
      // 'random' | 'fixed' | 'stripes' | 'mirror' | 'checker'
      // - random: original random 90° rotations
      // - fixed: all tiles at 0°
      // - stripes: each row gets one rotation (alternating 0/180)
      // - mirror: (c%2, r%2) → horizontally/vertically flipped (0, 270, 90, 180)
      // - checker: alternating 0° / 180° per tile
      rotatePattern = null,
      // 'random' | 'sequence' | 'checker' — how to pick color when >1 provided
      colorPattern = 'random',
      showGrid = false,
    } = opts;

    const rnd = seededRandom(seed);
    const w = cols * tileSize;
    const h = rows * tileSize;

    let tiles = '';
    if (bg) tiles += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * tileSize;
        const y = r * tileSize;
        const isBlank = rnd() > density;
        const motif = isBlank ? 'blank' : motifs[Math.floor(rnd() * motifs.length)];

        // Color selection
        let color;
        if (colorPattern === 'sequence') {
          color = colors[(c + r) % colors.length];
        } else if (colorPattern === 'checker') {
          color = colors[((c + r) % 2) % colors.length];
        } else {
          color = colors[Math.floor(rnd() * colors.length)];
        }

        // Rotation selection
        let rot;
        if (rotatePattern === 'fixed') {
          rot = 0;
        } else if (rotatePattern === 'stripes') {
          rot = (r % 2) * 180;
        } else if (rotatePattern === 'mirror') {
          // checker of 4 quadrants — (0,0)=0, (1,0)=270, (0,1)=90, (1,1)=180
          const table = [[0, 270], [90, 180]];
          rot = table[r % 2][c % 2];
        } else if (rotatePattern === 'checker') {
          rot = ((c + r) % 2) * 180;
        } else {
          rot = rotateRandom ? Math.floor(rnd() * 4) * 90 : 0;
        }

        const content = MOTIFS[motif](color);

        if (showGrid) {
          tiles += `<rect x="${x}" y="${y}" width="${tileSize}" height="${tileSize}" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="0.5"/>`;
        }
        tiles += `<g transform="translate(${x} ${y}) rotate(${rot} ${tileSize/2} ${tileSize/2})">${content}</g>`;
      }
    }

    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid slice" style="width:100%;height:100%;display:block;">${tiles}</svg>`;
  };

  /** Render the lab's mark — the Classic Snowflake.
   *  Responsive family: size decides which tier renders.
   *    ≥28 → Full  (1 + 4 + 12 network)
   *    <28 → Mini (Plus Spokes — favicon tier)
   */
  window.labMark = function(size = 32, color = '#1a3a8f', accent, tilt = 0) {
    if (!accent) accent = color; // monochrome fallback
    const cx = 50, cy = 50;
    const leaders = [0, 90, 180, 270];
    const toXY = (r, deg) => {
      const a = (deg - 90) * Math.PI / 180;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    const svgOpen = `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">` +
      (tilt ? `<g transform="rotate(${tilt} ${cx} ${cy})">` : '');
    const svgClose = (tilt ? `</g>` : '') + `</svg>`;

    if (size >= 28) {
      // FULL: 1 + 4 + 12 — robust from 28px up.
      // Stroke weights and dot radii bumped so branches/outer dots hold at 28–40px.
      const r1 = 22, r2 = 38;
      let s = svgOpen;
      // spokes (center → leader)
      for (const deg of leaders) {
        const [x, y] = toXY(r1, deg);
        s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="2"/>`;
      }
      // branches + outer dots (three per quadrant)
      for (const deg of leaders) {
        const [lx, ly] = toXY(r1, deg);
        for (const off of [-28, 0, 28]) {
          const [mx, my] = toXY(r2, deg + off);
          s += `<line x1="${lx}" y1="${ly}" x2="${mx}" y2="${my}" stroke="${color}" stroke-width="1.4" opacity="0.7"/>`;
          s += `<circle cx="${mx}" cy="${my}" r="2.6" fill="${color}" opacity="0.9"/>`;
        }
      }
      // leader dots
      for (const deg of leaders) {
        const [x, y] = toXY(r1, deg);
        s += `<circle cx="${x}" cy="${y}" r="4.4" fill="${color}"/>`;
      }
      s += `<circle cx="${cx}" cy="${cy}" r="6.5" fill="${accent}"/>`;
      return s + svgClose;
    }

    // MINI: Plus spokes — chunky favicon-friendly burst (picked from burst-study).
    // Same four-fold network structure as Full/Mid, but drawn with enough mass
    // to hold from 12px up. Spokes r=36, terminal nodes r=9, center accent r=11.
    const r1 = 36, dotR = 9;
    let s = svgOpen;
    for (const deg of leaders) {
      const [x, y] = toXY(r1, deg);
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`;
    }
    for (const deg of leaders) {
      const [x, y] = toXY(r1, deg);
      s += `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${color}"/>`;
    }
    s += `<circle cx="${cx}" cy="${cy}" r="11" fill="${accent}"/>`;
    return s + svgClose;
  };

  /** Render a Bulcão book cover: top atomized → bottom ordered.
   *  Black/white by default. Title/author overlay; clean Penguin-style framing.
   */
  window.bulcaoCover = function(opts = {}) {
    const {
      title = '',
      subtitle = '',
      author = '',
      cols = 6,
      rows = 12,
      ink = '#0a0a0a',
      paper = '#f4eedc',
      tileSize = 100,
    } = opts;

    const w = cols * tileSize;
    const h = rows * tileSize;

    // Layout (top → bottom):
    //   1. Black bar — author, mono caps, ~8% h
    //   2. Bulcão half-moon tile band, 2 rows
    //   3. Cream title band w/ double rules, ~4 rows
    //   4. Bulcão half-moon tile band, 2 rows
    //   5. Black bar — subtitle, italic serif sentence case, ~8% h
    const authorBarH = Math.round(h * 0.085);
    const subBarH = Math.round(h * 0.11);  // taller — needs to fit 2 lines of mono caps
    const tileBandRows = 2;
    const tileBandH = tileBandRows * tileSize;
    const titleBandTop = authorBarH + tileBandH;
    const titleBandH = h - authorBarH - subBarH - tileBandH * 2;
    const titleBandBot = titleBandTop + titleBandH;

    let s = `<rect width="${w}" height="${h}" fill="${paper}"/>`;

    // --- Bulcão "Positivo e Negativo" pattern (Brasília Palace Hotel, 1958) ---
    // Each tile = solid background with a quarter-disc cutout, OR
    // background paper with a solid quarter-disc. The two tile types alternate
    // in a checker. Each 2x2 supercell rotates the quarter-disc 0/90/270/180
    // (mirror) so curves meet inward to form full circles + triangular voids.
    function paintBulcaoTile(x, y, rotation, isInk) {
      // Quarter-disc with center at top-left corner, filling top-left of tile.
      // Path: from (0,0) line to (0,100), arc to (100,0), close.
      const fg = isInk ? paper : ink;
      const bg = isInk ? ink : paper;
      let g = `<g transform="translate(${x} ${y}) rotate(${rotation} 50 50)">`;
      g += `<rect width="100" height="100" fill="${bg}"/>`;
      g += `<path d="M 0 0 L 0 100 A 100 100 0 0 1 100 0 Z" fill="${fg}"/>`;
      g += `</g>`;
      return g;
    }
    function paintTileBand(yStart) {
      for (let r = 0; r < tileBandRows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * tileSize;
          const y = yStart + r * tileSize;
          // Mirror rotation: 4 quarter-discs converge at supercell center.
          const rotMap = [180, 90, 270, 0];
          const rotation = rotMap[(r % 2) * 2 + (c % 2)];
          // Color alternates by checker so positive/negative tiles tessellate.
          const isInk = (r + c) % 2 === 0;
          s += paintBulcaoTile(x, y, rotation, isInk);
        }
      }
    }
    paintTileBand(authorBarH);
    paintTileBand(authorBarH + tileBandH + titleBandH);

    // --- Top author bar ---
    s += `<rect x="0" y="0" width="${w}" height="${authorBarH}" fill="${ink}"/>`;
    // --- Bottom subtitle bar ---
    s += `<rect x="0" y="${h - subBarH}" width="${w}" height="${subBarH}" fill="${ink}"/>`;

    // --- Centered cream title band w/ double rules ---
    s += `<rect x="0" y="${titleBandTop}" width="${w}" height="${titleBandH}" fill="${paper}"/>`;
    const ruleW = Math.max(2, Math.round(w * 0.006));
    s += `<line x1="0" y1="${titleBandTop}" x2="${w}" y2="${titleBandTop}" stroke="${ink}" stroke-width="${ruleW}"/>`;
    s += `<line x1="0" y1="${titleBandTop + ruleW * 3}" x2="${w}" y2="${titleBandTop + ruleW * 3}" stroke="${ink}" stroke-width="1"/>`;
    s += `<line x1="0" y1="${titleBandBot}" x2="${w}" y2="${titleBandBot}" stroke="${ink}" stroke-width="${ruleW}"/>`;
    s += `<line x1="0" y1="${titleBandBot - ruleW * 3}" x2="${w}" y2="${titleBandBot - ruleW * 3}" stroke="${ink}" stroke-width="1"/>`;

    // --- Title (centered) ---
    const titleLines = title ? title.split('|') : [];
    // Width-fit with margin (88% of cover width — ~6% per side)
    const longest = titleLines.reduce((a, b) => a.length > b.length ? a : b, '');
    const widthFit = longest ? Math.floor((w * 0.88) / (longest.length * 0.55)) : Math.round(w * 0.18);
    const heightFit = titleLines.length ? Math.floor(titleBandH * 1.0 / (titleLines.length * 0.96)) : 200;
    const titleFS = Math.min(widthFit, heightFit);
    if (titleLines.length) {
      const lineH = titleFS * 0.96;
      const blockH = titleLines.length * lineH;
      const startY = titleBandTop + (titleBandH - blockH) / 2 + titleFS * 0.78;
      titleLines.forEach((line, i) => {
        s += `<text x="${w/2}" y="${startY + i * lineH}" font-family="'Bricolage Grotesque', 'Helvetica Neue', sans-serif" font-size="${titleFS}" font-weight="800" fill="${ink}" text-anchor="middle" letter-spacing="-${titleFS * 0.025}">${line}</text>`;
      });
    }

    // --- Author (top bar, mono caps with wide tracking — computer-y) ---
    const authorFS = Math.max(14, Math.round(w * 0.038));
    if (author) {
      const cy = authorBarH / 2 + authorFS / 3;
      s += `<text x="${w/2}" y="${cy}" font-family="'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace" font-size="${authorFS}" font-weight="500" letter-spacing="${authorFS * 0.18}" fill="${paper}" text-anchor="middle">${author}</text>`;
    }

    // --- Subtitle (bottom bar, mono caps wide-tracked — matches author) ---
    if (subtitle) {
      const subLines = subtitle.split('|');
      // Autofit by width: longest line must fit w * 0.88 with letter-spacing.
      // Mono char ≈ fs * 0.6 wide; tracking adds fs * 0.16 per char.
      const longest = subLines.reduce((a, b) => a.length > b.length ? a : b, '');
      const charAdv = 0.6 + 0.16; // mono char + tracking
      const widthFit = longest ? Math.floor((w * 0.86) / (longest.length * charAdv)) : 30;
      // Cap by bar height (need lineH * lines to fit)
      const heightFit = Math.floor((subBarH * 0.78) / Math.max(subLines.length, 1));
      const subFS = Math.max(11, Math.min(widthFit, heightFit, Math.round(w * 0.04)));
      const lineH = subFS * 1.18;
      const blockH = subLines.length * lineH;
      const startY = (h - subBarH) + (subBarH - blockH) / 2 + subFS * 0.78;
      subLines.forEach((line, i) => {
        s += `<text x="${w/2}" y="${startY + i * lineH}" font-family="'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace" font-size="${subFS}" font-weight="500" letter-spacing="${subFS * 0.16}" fill="${paper}" text-anchor="middle">${line.toUpperCase()}</text>`;
      });
    }

    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block;">${s}</svg>`;
  };

  /** Auto-populate any [data-tiles] elements on load */
  window.renderTileElements = function() {
    document.querySelectorAll('[data-tiles]').forEach(el => {
      if (el.dataset.rendered) return;
      const cols = parseInt(el.dataset.cols || '8');
      const rows = parseInt(el.dataset.rows || '4');
      const seed = parseInt(el.dataset.seed || '42');
      const density = parseFloat(el.dataset.density || '0.85');
      const bg = el.dataset.bg || null;
      const colors = (el.dataset.colors || '#1a3a8f').split(',');
      const motifs = (el.dataset.motifs || 'arc,arc,disc,tri,squiggle').split(',');
      const rotatePattern = el.dataset.rotatePattern || null;
      const colorPattern = el.dataset.colorPattern || 'random';
      el.innerHTML = window.bulcaoTiles(cols, rows, { cols, rows, seed, density, bg, colors, motifs, rotatePattern, colorPattern });
      el.dataset.rendered = '1';
    });

    document.querySelectorAll('[data-bulcao-cover]').forEach(el => {
      if (el.dataset.rendered) return;
      el.innerHTML = window.bulcaoCover({
        title: el.dataset.title || '',
        subtitle: el.dataset.subtitle || '',
        author: el.dataset.author || '',
        kicker: el.dataset.kicker || '',
        cols: parseInt(el.dataset.cols || '7'),
        rows: parseInt(el.dataset.rows || '14'),
        seed: parseInt(el.dataset.seed || '1'),
        ink: el.dataset.ink || '#0a0a0a',
        paper: el.dataset.paper || '#f4eedc',
        orderFrom: parseFloat(el.dataset.orderFrom || '0.55'),
      });
      el.dataset.rendered = '1';
    });

    document.querySelectorAll('[data-mark]').forEach(el => {
      const size = parseInt(el.dataset.size || '32');
      // Read from an explicit override on the element, then fall back to the
      // nearest CSS custom props (scheme-aware). If a .footer-mark class is on
      // the element we intentionally read the footer-tuned vars so the mark
      // still reads on dark backgrounds.
      const scope = el.classList.contains('footer-mark') ? el : document.documentElement;
      const cs = getComputedStyle(scope);
      const color  = el.dataset.color  || cs.getPropertyValue(el.classList.contains('footer-mark') ? '--footer-mark-color'  : '--mark-color').trim()  || '#1a3a8f';
      const accent = el.dataset.accent || cs.getPropertyValue(el.classList.contains('footer-mark') ? '--footer-mark-accent' : '--mark-accent').trim() || '#c24e2a';
      const rootCs = getComputedStyle(document.documentElement);
      const tilt = parseFloat(el.dataset.tilt || rootCs.getPropertyValue('--mark-tilt').trim() || '0');
      el.innerHTML = window.labMark(size, color, accent, tilt);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.renderTileElements);
  } else {
    window.renderTileElements();
  }
})();
