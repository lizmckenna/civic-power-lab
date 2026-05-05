// Burst-variant marks for small-size legibility study.
// Each function takes (size, color, accent) and returns an SVG string on a 100x100 canvas.
(function() {
  const svgOpen = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">`;
  const svgClose = `</svg>`;

  // ---- CURRENT MINI (what ships today) ---------------------------------
  // Replicates the labMark Mini tier: 4 spokes + 4 outer dots + center accent.
  // Used in the "problem" row of the study.
  function currentMini(size, color = '#13306b', accent = '#b7432b') {
    const cx = 50, cy = 50, r = 28;
    const leaders = [0, 90, 180, 270];
    const toXY = (r, deg) => {
      const a = (deg - 90) * Math.PI / 180;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    let s = svgOpen(size);
    for (const deg of leaders) {
      const [x, y] = toXY(r, deg);
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="3.2" stroke-linecap="round"/>`;
    }
    for (const deg of leaders) {
      const [x, y] = toXY(r, deg);
      s += `<circle cx="${x}" cy="${y}" r="6.5" fill="${color}"/>`;
    }
    s += `<circle cx="${cx}" cy="${cy}" r="10" fill="${accent}"/>`;
    return s + svgClose;
  }

  // ---- 01 TAPERED SPOKES -----------------------------------------------
  // Four diamond wedges. The wedge IS the spoke + node.
  function tapered(size, color, accent) {
    // Wedge: points at (cx, cy+w), (cx+t, cy+r), (cx, cy+r+w), (cx-t, cy+r)
    // Four rotations.
    const cx = 50, cy = 50;
    const tipOuter = 46;   // how far the diamond extends
    const tipInner = 12;   // how far the diamond starts from center
    const wMid = 7;        // half-width at widest point
    // diamond points, then rotate 0/90/180/270
    const makeWedge = (rot) => {
      // base orientation: pointing down (+y direction)
      const pts = [
        [cx, cy + tipInner],
        [cx + wMid, cy + (tipInner + tipOuter)/2],
        [cx, cy + tipOuter],
        [cx - wMid, cy + (tipInner + tipOuter)/2],
      ];
      return `<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${color}" transform="rotate(${rot} ${cx} ${cy})"/>`;
    };
    let s = svgOpen(size);
    for (const rot of [0, 90, 180, 270]) s += makeWedge(rot);
    s += `<circle cx="${cx}" cy="${cy}" r="9" fill="${accent}"/>`;
    return s + svgClose;
  }

  // ---- 02 PETAL CLUSTER -------------------------------------------------
  // Four rounded petal shapes via quadratic curves.
  function petal(size, color, accent) {
    const cx = 50, cy = 50;
    const makePetal = (rot) => {
      // Petal base (pointing down): starts at (cx, cy+13), bulges to width, tips at cy+47
      const path = `M ${cx} ${cy+14} C ${cx+14} ${cy+20}, ${cx+10} ${cy+44}, ${cx} ${cy+48} C ${cx-10} ${cy+44}, ${cx-14} ${cy+20}, ${cx} ${cy+14} Z`;
      return `<path d="${path}" fill="${color}" transform="rotate(${rot} ${cx} ${cy})"/>`;
    };
    let s = svgOpen(size);
    for (const rot of [0, 90, 180, 270]) s += makePetal(rot);
    s += `<circle cx="${cx}" cy="${cy}" r="10" fill="${accent}"/>`;
    return s + svgClose;
  }

  // ---- 03 PLUS SPOKES ---------------------------------------------------
  // Chunky spokes + big terminal dots. Direct descendant of current mini,
  // but with everything scaled up for small-size legibility.
  function spokePlus(size, color, accent) {
    const cx = 50, cy = 50;
    const leaders = [0, 90, 180, 270];
    const toXY = (r, deg) => {
      const a = (deg - 90) * Math.PI / 180;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    const r = 36, dotR = 9;
    let s = svgOpen(size);
    // thick rounded spokes
    for (const deg of leaders) {
      const [x, y] = toXY(r, deg);
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="6" stroke-linecap="round"/>`;
    }
    // terminal nodes
    for (const deg of leaders) {
      const [x, y] = toXY(r, deg);
      s += `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${color}"/>`;
    }
    s += `<circle cx="${cx}" cy="${cy}" r="11" fill="${accent}"/>`;
    return s + svgClose;
  }

  // ---- 04 EIGHT-RAY BURST -----------------------------------------------
  // Eight alternating tapered rays like a compass rose.
  function eightRay(size, color, accent) {
    const cx = 50, cy = 50;
    const rays = [0, 45, 90, 135, 180, 225, 270, 315];
    let s = svgOpen(size);
    rays.forEach((rot, i) => {
      const isMajor = i % 2 === 0;
      const outer = isMajor ? 46 : 34;
      const inner = 11;
      const w = isMajor ? 6 : 3.5;
      const pts = [
        [cx, cy + inner],
        [cx + w, cy + (inner + outer)/2],
        [cx, cy + outer],
        [cx - w, cy + (inner + outer)/2],
      ];
      s += `<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${color}" transform="rotate(${rot} ${cx} ${cy})"/>`;
    });
    s += `<circle cx="${cx}" cy="${cy}" r="9" fill="${accent}"/>`;
    return s + svgClose;
  }

  // ---- 05 FILLED CROSS --------------------------------------------------
  // One filled plus-shape, center accent on top.
  function crossFill(size, color, accent) {
    const cx = 50, cy = 50;
    // plus sign arms: thickness 18, full length 92 (so extends from 4 to 96)
    const t = 10; // half-thickness
    const l = 44; // half-length
    // path that is one plus shape
    const path = `M ${cx-t} ${cy-l} L ${cx+t} ${cy-l} L ${cx+t} ${cy-t} L ${cx+l} ${cy-t} L ${cx+l} ${cy+t} L ${cx+t} ${cy+t} L ${cx+t} ${cy+l} L ${cx-t} ${cy+l} L ${cx-t} ${cy+t} L ${cx-l} ${cy+t} L ${cx-l} ${cy-t} L ${cx-t} ${cy-t} Z`;
    let s = svgOpen(size);
    s += `<path d="${path}" fill="${color}"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="11" fill="${accent}"/>`;
    return s + svgClose;
  }

  // ---- 06 RING OF DOTS --------------------------------------------------
  // Eight dots around a center accent.
  function ringDots(size, color, accent) {
    const cx = 50, cy = 50;
    const r = 34;
    const positions = [0, 45, 90, 135, 180, 225, 270, 315];
    const toXY = (deg) => {
      const a = (deg - 90) * Math.PI / 180;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    };
    let s = svgOpen(size);
    positions.forEach((deg, i) => {
      const [x, y] = toXY(deg);
      const dotR = i % 2 === 0 ? 9 : 6.5; // cardinals bigger
      s += `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${color}"/>`;
    });
    s += `<circle cx="${cx}" cy="${cy}" r="11" fill="${accent}"/>`;
    return s + svgClose;
  }

  window.BURST_MARKS = { currentMini, tapered, petal, spokePlus, eightRay, crossFill, ringDots };
})();
