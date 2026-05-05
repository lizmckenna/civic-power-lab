// Responsive logo family for the Classic Snowflake.
// The original LogoClassic (1+4+12) breaks down below ~32px. This file builds
// a three-tier family that preserves the SAME geometric language at every size:
//
//   Full  — 1 + 4 + 12, full hierarchy. For 40px+.
//   Mid   — 1 + 4 + 4,  one leaf per arm. For 24–40px.
//   Mini  — 1 + 4,      pure plus/snowflake. For ≤24px. This is the favicon.
//
// Optical sizing: as size shrinks, stroke weight goes UP (in relative terms),
// dot radii go UP as a proportion of the mark, and secondary opacities go to 1.
// That's counterintuitive but correct — fine detail disappears at small sizes,
// so whatever remains has to carry more weight.

function LogoFull({ size = 100, color = '#1a3a8f', accent = '#c24e2a', mono = false }) {
  const cx = 50, cy = 50;
  const r1 = 22;
  const r2 = 38;
  const leaders = [0, 90, 180, 270];
  const accentColor = mono ? color : accent;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + r1 * Math.cos(a);
        const y = cy + r1 * Math.sin(a);
        return <line key={'s'+i} x1={cx} y1={cy} x2={x} y2={y} stroke={color} strokeWidth="1.6" />;
      })}
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const lx = cx + r1 * Math.cos(a);
        const ly = cy + r1 * Math.sin(a);
        return [-28, 0, 28].map((offset, j) => {
          const a2 = (deg - 90 + offset) * Math.PI / 180;
          const mx = cx + r2 * Math.cos(a2);
          const my = cy + r2 * Math.sin(a2);
          return <line key={'b'+i+'-'+j} x1={lx} y1={ly} x2={mx} y2={my} stroke={color} strokeWidth="1" opacity="0.55" />;
        });
      })}
      {leaders.map((deg, i) =>
        [-28, 0, 28].map((offset, j) => {
          const a2 = (deg - 90 + offset) * Math.PI / 180;
          const mx = cx + r2 * Math.cos(a2);
          const my = cy + r2 * Math.sin(a2);
          return <circle key={'m'+i+'-'+j} cx={mx} cy={my} r="2" fill={color} opacity="0.8" />;
        })
      )}
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + r1 * Math.cos(a);
        const y = cy + r1 * Math.sin(a);
        return <circle key={'l'+i} cx={x} cy={y} r="4" fill={color} />;
      })}
      <circle cx={cx} cy={cy} r="6" fill={accentColor} />
    </svg>
  );
}

function LogoMid({ size = 100, color = '#1a3a8f', accent = '#c24e2a', mono = false }) {
  // 1 + 4 + 4: one leaf per arm, no fanning, heavier strokes.
  const cx = 50, cy = 50;
  const r1 = 24;
  const r2 = 40;
  const leaders = [0, 90, 180, 270];
  const accentColor = mono ? color : accent;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const lx = cx + r1 * Math.cos(a);
        const ly = cy + r1 * Math.sin(a);
        const mx = cx + r2 * Math.cos(a);
        const my = cy + r2 * Math.sin(a);
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={lx} y2={ly} stroke={color} strokeWidth="2.2" />
            <line x1={lx} y1={ly} x2={mx} y2={my} stroke={color} strokeWidth="1.4" opacity="0.8" />
            <circle cx={mx} cy={my} r="2.6" fill={color} />
            <circle cx={lx} cy={ly} r="5" fill={color} />
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="7.5" fill={accentColor} />
    </svg>
  );
}

function LogoMini({ size = 100, color = '#1a3a8f', accent = '#c24e2a', mono = false }) {
  // 1 + 4: pure plus. Favicon. Must read at 16px.
  const cx = 50, cy = 50;
  const r1 = 28;
  const leaders = [0, 90, 180, 270];
  const accentColor = mono ? color : accent;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + r1 * Math.cos(a);
        const y = cy + r1 * Math.sin(a);
        return <line key={'s'+i} x1={cx} y1={cy} x2={x} y2={y} stroke={color} strokeWidth="3.2" strokeLinecap="round" />;
      })}
      {leaders.map((deg, i) => {
        const a = (deg - 90) * Math.PI / 180;
        const x = cx + r1 * Math.cos(a);
        const y = cy + r1 * Math.sin(a);
        return <circle key={'l'+i} cx={x} cy={y} r="6.5" fill={color} />;
      })}
      <circle cx={cx} cy={cy} r="10" fill={accentColor} />
    </svg>
  );
}

// Responsive: picks the right tier for the size.
function LogoResponsive({ size = 100, color, accent, mono }) {
  const Logo = size >= 40 ? LogoFull : size >= 24 ? LogoMid : LogoMini;
  return <Logo size={size} color={color} accent={accent} mono={mono} />;
}

window.CLASSIC = { LogoFull, LogoMid, LogoMini, LogoResponsive };
