// Logo mark SVGs. Each is a pure function (size, color1, color2?) => JSX <svg>.
// All render on a 100x100 viewBox, centered, so they swap cleanly at any size.

// --- Logo 1: Classic Snowflake (1 + 4 + 3) ---
// Faithful reduction of the snowflake organizing model. Center organizer,
// 4 team leaders, 3 members branching off each.
function LogoClassic({ size = 100, color = '#1a3a8f', accent = '#c24e2a' }) {
  const cx = 50, cy = 50;
  const r1 = 22; // team leader ring
  const r2 = 38; // outer member ring
  const leaders = [0, 90, 180, 270];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* spokes organizer -> leaders */}
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + r1 * Math.cos(a);
        const y = cy + r1 * Math.sin(a);
        return <line key={'s'+i} x1={cx} y1={cy} x2={x} y2={y} stroke={color} strokeWidth="1.5" />;
      })}
      {/* branches leader -> members (3 per leader, fanned) */}
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const lx = cx + r1 * Math.cos(a);
        const ly = cy + r1 * Math.sin(a);
        return [-28, 0, 28].map((offset, j) => {
          const a2 = (deg - 90 + offset) * Math.PI / 180;
          const mx = cx + r2 * Math.cos(a2);
          const my = cy + r2 * Math.sin(a2);
          return <line key={'b'+i+'-'+j} x1={lx} y1={ly} x2={mx} y2={my} stroke={color} strokeWidth="1" opacity="0.5" />;
        });
      })}
      {/* member dots */}
      {leaders.map((deg, i) =>
        [-28, 0, 28].map((offset, j) => {
          const a2 = (deg - 90 + offset) * Math.PI / 180;
          const mx = cx + r2 * Math.cos(a2);
          const my = cy + r2 * Math.sin(a2);
          return <circle key={'m'+i+'-'+j} cx={mx} cy={my} r="2" fill={color} opacity="0.75" />;
        })
      )}
      {/* leader dots */}
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + r1 * Math.cos(a);
        const y = cy + r1 * Math.sin(a);
        return <circle key={'l'+i} cx={x} cy={y} r="4" fill={color} />;
      })}
      {/* organizer center */}
      <circle cx={cx} cy={cy} r="6" fill={accent} />
    </svg>
  );
}

// --- Logo 2: Compressed (1 + 4, leaves implied) ---
// Strips the outer ring down to small marks. Reads instantly; the hierarchy
// is still there but doesn't fight the mark.
function LogoCompressed({ size = 100, color = '#1a3a8f', accent = '#c24e2a' }) {
  const cx = 50, cy = 50;
  const r1 = 26;
  const leaders = [0, 90, 180, 270];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + r1 * Math.cos(a);
        const y = cy + r1 * Math.sin(a);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={color} strokeWidth="2" />
            <circle cx={x} cy={y} r="5" fill={color} />
            {/* 3 tiny implied leaves */}
            {[-22, 0, 22].map((off, j) => {
              const a2 = (deg - 90 + off) * Math.PI / 180;
              const mx = cx + 40 * Math.cos(a2);
              const my = cy + 40 * Math.sin(a2);
              return <circle key={j} cx={mx} cy={my} r="1.5" fill={color} opacity="0.7" />;
            })}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="7" fill={accent} />
    </svg>
  );
}

// --- Logo 3: Asymmetric / Alive ---
// Rotated 15°, uneven leaf counts per spoke. Feels like a living network
// rather than a crystalline symmetry.
function LogoAsymmetric({ size = 100, color = '#1a3a8f', accent = '#c24e2a' }) {
  const cx = 50, cy = 50;
  const r1 = 24;
  const rot = 15;
  const spokes = [
    { deg: 0 + rot, leaves: [-24, 0, 22, 40] },
    { deg: 90 + rot, leaves: [-18, 6] },
    { deg: 180 + rot, leaves: [-22, 0, 24] },
    { deg: 270 + rot, leaves: [-28, -4, 20] }
  ];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {spokes.map((s, i) => {
        const a = (s.deg - 90) * Math.PI / 180;
        const x = cx + r1 * Math.cos(a);
        const y = cy + r1 * Math.sin(a);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke={color} strokeWidth="1.8" />
            {s.leaves.map((off, j) => {
              const a2 = (s.deg - 90 + off) * Math.PI / 180;
              const mx = cx + 40 * Math.cos(a2);
              const my = cy + 40 * Math.sin(a2);
              return (
                <g key={j}>
                  <line x1={x} y1={y} x2={mx} y2={my} stroke={color} strokeWidth="0.8" opacity="0.45" />
                  <circle cx={mx} cy={my} r="1.8" fill={color} opacity="0.8" />
                </g>
              );
            })}
            <circle cx={x} cy={y} r="4" fill={color} />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="6.5" fill={accent} />
    </svg>
  );
}

// --- Logo 4: Monoline / Diagrammatic ---
// Pure lines, tiny node markers. Reads as "research lab" / "technical".
function LogoMonoline({ size = 100, color = '#1a3a8f' }) {
  const cx = 50, cy = 50;
  const r1 = 24, r2 = 40;
  const leaders = [0, 90, 180, 270];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={color}>
      {/* outer ring (subtle) */}
      <circle cx={cx} cy={cy} r={r2} strokeWidth="0.6" opacity="0.3" />
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + r1 * Math.cos(a);
        const y = cy + r1 * Math.sin(a);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} strokeWidth="1.2" />
            {[-25, 0, 25].map((off, j) => {
              const a2 = (deg - 90 + off) * Math.PI / 180;
              const mx = cx + r2 * Math.cos(a2);
              const my = cy + r2 * Math.sin(a2);
              return (
                <g key={j}>
                  <line x1={x} y1={y} x2={mx} y2={my} strokeWidth="0.8" opacity="0.6" />
                  <circle cx={mx} cy={my} r="1.4" fill={color} stroke="none" />
                </g>
              );
            })}
            <circle cx={x} cy={y} r="3" strokeWidth="1.4" fill="#f7f1e3" />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="4.5" fill={color} stroke="none" />
    </svg>
  );
}

// --- Logo 5: Pulse / Radial ---
// Abstracts the snowflake: one central node + ripple/ring showing reach.
// Cleanest at tiny sizes.
function LogoPulse({ size = 100, color = '#1a3a8f', accent = '#c24e2a' }) {
  const cx = 50, cy = 50;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx={cx} cy={cy} r="42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <circle cx={cx} cy={cy} r="30" fill="none" stroke={color} strokeWidth="1" opacity="0.45" />
      <circle cx={cx} cy={cy} r="18" fill="none" stroke={color} strokeWidth="1.4" opacity="0.7" />
      {/* 8 nodes on the outer ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + 42 * Math.cos(a);
        const y = cy + 42 * Math.sin(a);
        return <circle key={i} cx={x} cy={y} r="1.8" fill={color} />;
      })}
      {/* 4 nodes on mid ring */}
      {[0, 90, 180, 270].map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + 30 * Math.cos(a);
        const y = cy + 30 * Math.sin(a);
        return <circle key={i} cx={x} cy={y} r="2.4" fill={color} />;
      })}
      <circle cx={cx} cy={cy} r="6" fill={accent} />
    </svg>
  );
}

// --- Logo 6: Letterform C (built from nodes) ---
// A "C" (for Civic) drawn by a network of nodes and connecting lines.
function LogoLetterC({ size = 100, color = '#1a3a8f', accent = '#c24e2a' }) {
  const cx = 50, cy = 50;
  // Points around an open arc forming a C (gap on the right)
  const pts = [];
  const start = 35, end = 325; // degrees (leaving right side open)
  const steps = 9;
  for (let i = 0; i <= steps; i++) {
    const deg = start + (end - start) * (i / steps);
    const a = deg * Math.PI / 180;
    pts.push({ x: cx + 34 * Math.cos(a), y: cy + 34 * Math.sin(a), i });
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* connecting arc */}
      {pts.slice(0, -1).map((p, i) => (
        <line key={'l'+i} x1={p.x} y1={p.y} x2={pts[i+1].x} y2={pts[i+1].y} stroke={color} strokeWidth="1.2" opacity="0.5" />
      ))}
      {/* interior spokes to center */}
      {pts.map((p, i) => (i % 2 === 0 ? <line key={'s'+i} x1={p.x} y1={p.y} x2={cx} y2={cy} stroke={color} strokeWidth="0.6" opacity="0.25" /> : null))}
      {/* perimeter nodes */}
      {pts.map((p, i) => {
        const r = (i === 0 || i === pts.length - 1) ? 4 : 3;
        return <circle key={'p'+i} cx={p.x} cy={p.y} r={r} fill={color} />;
      })}
      {/* center */}
      <circle cx={cx} cy={cy} r="5" fill={accent} />
    </svg>
  );
}

// --- Logo 7: Growth / Directional ---
// A network that grows outward in one direction — reads as "building power"
// rather than a static geometry. The snowflake, tilted and extended.
function LogoGrowth({ size = 100, color = '#1a3a8f', accent = '#c24e2a' }) {
  // organizer at lower-left, expanding to upper-right through 3 waves
  const N = { cx: 30, cy: 70 };
  const w1 = [{ x: 42, y: 52 }, { x: 52, y: 68 }];
  const w2 = [{ x: 56, y: 34 }, { x: 66, y: 52 }, { x: 70, y: 70 }];
  const w3 = [{ x: 70, y: 22 }, { x: 80, y: 40 }, { x: 84, y: 60 }];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* organizer -> w1 */}
      {w1.map((p, i) => <line key={'a'+i} x1={N.cx} y1={N.cy} x2={p.x} y2={p.y} stroke={color} strokeWidth="1.5" />)}
      {/* w1 -> w2 */}
      <line x1={w1[0].x} y1={w1[0].y} x2={w2[0].x} y2={w2[0].y} stroke={color} strokeWidth="1" opacity="0.55" />
      <line x1={w1[0].x} y1={w1[0].y} x2={w2[1].x} y2={w2[1].y} stroke={color} strokeWidth="1" opacity="0.55" />
      <line x1={w1[1].x} y1={w1[1].y} x2={w2[1].x} y2={w2[1].y} stroke={color} strokeWidth="1" opacity="0.55" />
      <line x1={w1[1].x} y1={w1[1].y} x2={w2[2].x} y2={w2[2].y} stroke={color} strokeWidth="1" opacity="0.55" />
      {/* w2 -> w3 */}
      <line x1={w2[0].x} y1={w2[0].y} x2={w3[0].x} y2={w3[0].y} stroke={color} strokeWidth="0.7" opacity="0.35" />
      <line x1={w2[0].x} y1={w2[0].y} x2={w3[1].x} y2={w3[1].y} stroke={color} strokeWidth="0.7" opacity="0.35" />
      <line x1={w2[1].x} y1={w2[1].y} x2={w3[1].x} y2={w3[1].y} stroke={color} strokeWidth="0.7" opacity="0.35" />
      <line x1={w2[1].x} y1={w2[1].y} x2={w3[2].x} y2={w3[2].y} stroke={color} strokeWidth="0.7" opacity="0.35" />
      <line x1={w2[2].x} y1={w2[2].y} x2={w3[2].x} y2={w3[2].y} stroke={color} strokeWidth="0.7" opacity="0.35" />

      {/* nodes */}
      {w3.map((p, i) => <circle key={'w3'+i} cx={p.x} cy={p.y} r="1.6" fill={color} opacity="0.7" />)}
      {w2.map((p, i) => <circle key={'w2'+i} cx={p.x} cy={p.y} r="2.5" fill={color} />)}
      {w1.map((p, i) => <circle key={'w1'+i} cx={p.x} cy={p.y} r="3.5" fill={color} />)}
      <circle cx={N.cx} cy={N.cy} r="6.5" fill={accent} />
    </svg>
  );
}

// --- Logo 8: Constellation ---
// Dots only, no visible lines. Relies on the eye to complete the network.
// The gentlest reading; works beautifully as a favicon.
function LogoConstellation({ size = 100, color = '#1a3a8f', accent = '#c24e2a' }) {
  const cx = 50, cy = 50;
  const leaders = [0, 90, 180, 270];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* subtle connecting lines on hover could be added; static here */}
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const lx = cx + 24 * Math.cos(a);
        const ly = cy + 24 * Math.sin(a);
        return (
          <g key={i}>
            <circle cx={lx} cy={ly} r="4" fill={color} />
            {[-22, 0, 22].map((off, j) => {
              const a2 = (deg - 90 + off) * Math.PI / 180;
              const mx = cx + 42 * Math.cos(a2);
              const my = cy + 42 * Math.sin(a2);
              return <circle key={j} cx={mx} cy={my} r="1.8" fill={color} opacity="0.72" />;
            })}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="7" fill={accent} />
    </svg>
  );
}

window.LOGOS = {
  LogoClassic, LogoCompressed, LogoAsymmetric, LogoMonoline,
  LogoPulse, LogoLetterC, LogoGrowth, LogoConstellation
};
