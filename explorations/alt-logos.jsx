// Ten alternative (non-snowflake) logo marks for the Civic Power Lab.
// Each is a pure function (size, color, accent) => JSX <svg>.
// All render centered in a 100x100 viewBox. Hairlines scale with size.

function svg(size, children) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

// 01 — Civic Column. Fluted classical column, head-on.
function ColumnMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  const fluteX = [30, 38, 46, 54, 62, 70];
  return svg(size, (
    <g>
      {/* capital */}
      <rect x="22" y="14" width="56" height="4" fill={color}/>
      <rect x="26" y="18" width="48" height="6" fill={color}/>
      {/* shaft with flutes */}
      <rect x="30" y="24" width="40" height="52" fill="none" stroke={color} strokeWidth="2"/>
      {fluteX.map((x, i) => i < fluteX.length - 1 ? (
        <line key={i} x1={x + 4} y1="26" x2={x + 4} y2="74" stroke={color} strokeWidth="1"/>
      ) : null)}
      {/* base */}
      <rect x="26" y="76" width="48" height="6" fill={color}/>
      <rect x="22" y="82" width="56" height="4" fill={color}/>
      {/* small accent: keystone dot on capital */}
      <circle cx="50" cy="16" r="2" fill={accent}/>
    </g>
  ));
}

// 02 — Three-strand Braid.
function BraidMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  // Three sine-ish strands that weave vertically
  const stroke = 5;
  const h = 68;
  const y0 = 16;
  const amp = 10;
  const freq = 2; // full cycles
  const build = (phase) => {
    const pts = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = y0 + t * h;
      const x = 50 + Math.sin(t * Math.PI * 2 * freq + phase) * amp;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return 'M ' + pts.join(' L ');
  };
  return svg(size, (
    <g fill="none" strokeLinecap="round" strokeWidth={stroke}>
      <path d={build(0)} stroke={color}/>
      <path d={build(Math.PI * 2 / 3)} stroke={color} opacity="0.7"/>
      <path d={build(Math.PI * 4 / 3)} stroke={accent}/>
    </g>
  ));
}

// 03 — Converging Arrows. Four arrows meeting at center.
function ConvergeMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  return svg(size, (
    <g fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* N */}
      <path d="M 50 14 L 50 44"/><path d="M 44 24 L 50 18 L 56 24"/>
      {/* S */}
      <path d="M 50 86 L 50 56"/><path d="M 44 76 L 50 82 L 56 76"/>
      {/* W */}
      <path d="M 14 50 L 44 50"/><path d="M 24 44 L 18 50 L 24 56"/>
      {/* E */}
      <path d="M 86 50 L 56 50"/><path d="M 76 44 L 82 50 L 76 56"/>
      {/* central meeting point */}
      <circle cx="50" cy="50" r="4" fill={accent} stroke="none"/>
    </g>
  ));
}

// 04 — Delta with horizon. Greek delta (change) with internal rule.
function DeltaMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  return svg(size, (
    <g>
      {/* outer triangle */}
      <path d="M 50 14 L 86 82 L 14 82 Z" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round"/>
      {/* internal horizon line = infrastructure */}
      <line x1="27" y1="58" x2="73" y2="58" stroke={accent} strokeWidth="3"/>
      {/* tiny node on the horizon */}
      <circle cx="50" cy="58" r="3" fill={accent}/>
    </g>
  ));
}

// 05 — Marked Ballot. Filled circle inside a square.
function BallotMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  return svg(size, (
    <g>
      <rect x="14" y="14" width="72" height="72" fill="none" stroke={color} strokeWidth="3"/>
      <circle cx="50" cy="50" r="20" fill={color}/>
      {/* corner tick anchors it */}
      <path d="M 70 24 L 76 18 L 82 24" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  ));
}

// 06 — Forum / Assembly. Ring of seats around center convener.
function ForumMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  const N = 12;
  const R = 32;
  const cx = 50, cy = 50;
  const seats = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(a) * R;
    const y = cy + Math.sin(a) * R;
    seats.push({ x, y, i });
  }
  return svg(size, (
    <g>
      {/* thin guide ring */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={color} strokeWidth="1" opacity="0.25"/>
      {/* seats */}
      {seats.map(({ x, y, i }) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill={i === 0 ? accent : color}/>
      ))}
      {/* central convener */}
      <circle cx={cx} cy={cy} r="5.5" fill={color}/>
    </g>
  ));
}

// 07 — Keystone + arch.
function KeystoneMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  return svg(size, (
    <g>
      {/* ghosted arch behind */}
      <path d="M 18 80 L 18 50 A 32 32 0 0 1 82 50 L 82 80"
            fill="none" stroke={color} strokeWidth="2" opacity="0.28"/>
      {/* keystone trapezoid at top of arch */}
      <path d="M 42 22 L 58 22 L 64 46 L 36 46 Z" fill={color}/>
      {/* small accent dot at apex */}
      <circle cx="50" cy="32" r="2.8" fill={accent}/>
    </g>
  ));
}

// 08 — CPL Monogram. Typographic only.
function MonogramMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  return svg(size, (
    <g>
      <text x="50" y="62" textAnchor="middle"
            fontFamily="'Source Serif 4', Georgia, serif"
            fontSize="42" fontWeight="400" fill={color}
            letterSpacing="-1">CPL</text>
      {/* single period-dot in accent to anchor */}
      <circle cx="78" cy="62" r="2.5" fill={accent}/>
    </g>
  ));
}

// 09 — Lantern. Hexagonal civic lantern with contained flame.
function LanternMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  return svg(size, (
    <g>
      {/* top cap */}
      <rect x="34" y="14" width="32" height="4" fill={color}/>
      {/* hex body */}
      <path d="M 30 22 L 50 18 L 70 22 L 70 68 L 50 72 L 30 68 Z"
            fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round"/>
      {/* internal vertical bars (panels) */}
      <line x1="42" y1="22" x2="42" y2="70" stroke={color} strokeWidth="1" opacity="0.5"/>
      <line x1="58" y1="22" x2="58" y2="70" stroke={color} strokeWidth="1" opacity="0.5"/>
      {/* flame */}
      <path d="M 50 32 Q 56 40 50 52 Q 44 40 50 32 Z" fill={accent}/>
      {/* hanger + base */}
      <line x1="50" y1="8" x2="50" y2="14" stroke={color} strokeWidth="2"/>
      <rect x="38" y="76" width="24" height="4" fill={color}/>
      <rect x="42" y="80" width="16" height="4" fill={color}/>
    </g>
  ));
}

// 10 — Agora (open ring). Heavy ring with a notch at top and center dot.
function AgoraMark({ size = 64, color = '#13306b', accent = '#b7432b' }) {
  // Two arcs together form a ~320° ring, leaving a ~40° gap at top.
  // Start ~200° (upper-left), sweep CW the long way to ~340° (upper-right).
  const r = 36;
  const cx = 50, cy = 50;
  const deg2rad = d => (d * Math.PI) / 180;
  // gap at top: from -70° to -110° (i.e. 250° to 290° in standard)
  // ring arc: from -70° going CW down and around to -110° (missing the top wedge)
  const start = { x: cx + r * Math.cos(deg2rad(-70)), y: cy + r * Math.sin(deg2rad(-70)) };
  const end   = { x: cx + r * Math.cos(deg2rad(-110)), y: cy + r * Math.sin(deg2rad(-110)) };
  // large-arc-flag = 1 (take the long way), sweep-flag = 1 (CW)
  const d = `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 1 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
  return svg(size, (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="7" fill={accent}/>
    </g>
  ));
}

window.ALT_LOGOS = {
  ColumnMark, BraidMark, ConvergeMark, DeltaMark, BallotMark,
  ForumMark, KeystoneMark, MonogramMark, LanternMark, AgoraMark,
};
