// Canvas app for alternative (non-snowflake) logo options.
const { ColumnMark, BraidMark, ConvergeMark, DeltaMark, BallotMark,
        ForumMark, KeystoneMark, MonogramMark, LanternMark, AgoraMark } = window.ALT_LOGOS;

const CREAM = '#f1ead7';
const INK = '#171514';
const INDIGO = '#13306b';
const TERRACOTTA = '#b7432b';
const PEACOCK = '#15616d';
const MUTE = '#6a6256';

const altCardStyles = {
  wrap: { padding: '48px 56px', background: CREAM, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'Source Serif 4', Georgia, serif" },
  num: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTE, marginBottom: 18 },
  title: { fontSize: 30, letterSpacing: '-0.02em', color: INK, margin: '0 0 6px', fontWeight: 400 },
  sub: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: TERRACOTTA, marginBottom: 18 },
  desc: { fontSize: 15, lineHeight: 1.55, color: '#332f2b', maxWidth: '54ch', marginBottom: 28, fontStyle: 'italic' },
  markRow: { display: 'flex', alignItems: 'center', gap: 48, marginTop: 'auto', paddingTop: 24, borderTop: '1px solid #cec2a8' },
  sizesRow: { display: 'flex', alignItems: 'flex-end', gap: 28, flex: 1 },
  sizeBlock: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  sizeLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: MUTE },
  lockup: { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', border: '1px solid #cec2a8', background: '#efe6d1' },
  lockupMeta: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: MUTE, lineHeight: 1.5 },
  lockupName: { color: INDIGO, fontWeight: 600, display: 'block', marginBottom: 4 },
};

function AltLogoCard({ num, title, tag, desc, Mark, color = INDIGO, accent = TERRACOTTA }) {
  return (
    <div style={altCardStyles.wrap}>
      <div style={altCardStyles.num}>{num}</div>
      <h2 style={altCardStyles.title}>{title}</h2>
      <div style={altCardStyles.sub}>{tag}</div>
      <p style={altCardStyles.desc}>{desc}</p>
      <div style={altCardStyles.markRow}>
        <div style={altCardStyles.sizesRow}>
          {[96, 56, 32, 20].map(s => (
            <div key={s} style={altCardStyles.sizeBlock}>
              <div style={{ width: s, height: s, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mark size={s} color={color} accent={accent}/>
              </div>
              <div style={altCardStyles.sizeLabel}>{s}px</div>
            </div>
          ))}
        </div>
        <div style={altCardStyles.lockup}>
          <Mark size={36} color={color} accent={accent}/>
          <div style={altCardStyles.lockupMeta}>
            <span style={altCardStyles.lockupName}>Civic Power Lab</span>
            HKS · Center for Public Leadership
          </div>
        </div>
      </div>
    </div>
  );
}

function AltLogosApp() {
  const options = [
    { id: 'column',   num: '01', title: 'Civic Column', tag: 'Architectural',
      desc: 'A fluted classical column, head-on. Civic architecture (capitol, courthouse, bank) reduced to pure geometry. Stable, institutional, unambiguously about public life.',
      Mark: ColumnMark },
    { id: 'braid',    num: '02', title: 'Three-strand Braid', tag: 'Relational',
      desc: 'Three woven strands. The clearest visual metaphor for relational organizing and coalition. Organic without being saccharine; reads especially well animated.',
      Mark: BraidMark },
    { id: 'converge', num: '03', title: 'Converging Arrows', tag: 'Power concentrating',
      desc: 'Four arrows meeting at a shared point. Power gathered from distributed directions. Quieter than a raised fist, more kinetic than a seal.',
      Mark: ConvergeMark },
    { id: 'delta',    num: '04', title: 'Delta with horizon', tag: 'Change + infrastructure',
      desc: 'Greek delta means change. The internal horizontal rule is the organizing infrastructure inside the change. Clean, mathematical, one-beat reading.',
      Mark: DeltaMark },
    { id: 'ballot',   num: '05', title: 'Marked Ballot', tag: 'Civic icon',
      desc: 'A filled circle inside a square: the most universally legible civic symbol in the world. Direct, plain, no metaphor to decode. Small tick mark grounds it.',
      Mark: BallotMark },
    { id: 'forum',    num: '06', title: 'Forum / Assembly', tag: 'Democratic body',
      desc: 'A ring of evenly spaced seats around a central convener. The council, the town hall, the jury. One seat is the organizer; participation is the picture.',
      Mark: ForumMark },
    { id: 'keystone', num: '07', title: 'Keystone + arch', tag: 'Infrastructure',
      desc: 'A keystone trapezoid with a ghosted arch behind it. The stone at the top that holds everything else up. Strongest architectural metaphor for infrastructure work.',
      Mark: KeystoneMark },
    { id: 'monogram', num: '08', title: 'CPL Monogram', tag: 'Typographic',
      desc: 'No iconography at all. Just the three letters, set in the same serif as the site. Works at 14px better than any mark can. A confident, grown-up choice.',
      Mark: MonogramMark },
    { id: 'lantern',  num: '09', title: 'Lantern', tag: 'Civic illumination',
      desc: 'A hexagonal lantern with a single contained flame. Civic illumination — Enlightenment, streetlamp, public square after dark. Warmer than a torch.',
      Mark: LanternMark },
    { id: 'agora',    num: '10', title: 'Agora (open ring)', tag: 'The gathering',
      desc: 'A heavy open ring with a single notch (the entrance) and a dot at center (the gathering). Simplest possible mark on offer. Reads at 14px, scales to a building.',
      Mark: AgoraMark },
  ];

  return (
    <>
      <DCSection id="intro" title="Non-snowflake directions">
        <DCArtboard id="brief" label="00 · The brief" width={1200} height={780}>
          <div style={{ padding: 64, background: CREAM, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'Source Serif 4', Georgia, serif" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTE, marginBottom: 24 }}>Round 2 · Alternatives</div>
            <h1 style={{ fontSize: 56, letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.05, fontWeight: 400, maxWidth: '18ch', color: INK }}>Ten directions that aren't the snowflake.</h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: '#332f2b', maxWidth: '62ch', marginBottom: 20 }}>
              The snowflake is the most accurate to what the lab studies. If we set it aside, these are the next strongest ideas, each grouped by metaphor family so you can see what <em>kinds</em> of story are on offer.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16, maxWidth: 820 }}>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: TERRACOTTA, marginBottom: 8 }}>Architecture</div>
                <div style={{ fontSize: 15, lineHeight: 1.5, color: '#332f2b' }}>Column, Keystone. Civic buildings reduced to geometry. Institutional, stable.</div>
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: TERRACOTTA, marginBottom: 8 }}>Relational</div>
                <div style={{ fontSize: 15, lineHeight: 1.5, color: '#332f2b' }}>Braid, Converging Arrows. Interdependence and power gathering from many directions.</div>
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: TERRACOTTA, marginBottom: 8 }}>Civic symbols</div>
                <div style={{ fontSize: 15, lineHeight: 1.5, color: '#332f2b' }}>Ballot, Forum, Agora, Lantern. Direct references to the practice of democracy.</div>
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: TERRACOTTA, marginBottom: 8 }}>Typographic / abstract</div>
                <div style={{ fontSize: 15, lineHeight: 1.5, color: '#332f2b' }}>Delta, Monogram. Letters and pure shapes. The smallest-scale-safe options.</div>
              </div>
            </div>
            <p style={{ marginTop: 'auto', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.14em', color: MUTE, textTransform: 'uppercase' }}>↓ Each option shown at 96 / 56 / 32 / 20 px and locked up with the wordmark.</p>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="architecture" title="Architecture family">
        {options.filter(o => ['column','keystone'].includes(o.id)).map(o => (
          <DCArtboard key={o.id} id={o.id} label={`${o.num} · ${o.title}`} width={1200} height={780}>
            <AltLogoCard {...o}/>
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection id="relational" title="Relational family">
        {options.filter(o => ['braid','converge'].includes(o.id)).map(o => (
          <DCArtboard key={o.id} id={o.id} label={`${o.num} · ${o.title}`} width={1200} height={780}>
            <AltLogoCard {...o}/>
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection id="civic" title="Civic-symbol family">
        {options.filter(o => ['ballot','forum','agora','lantern'].includes(o.id)).map(o => (
          <DCArtboard key={o.id} id={o.id} label={`${o.num} · ${o.title}`} width={1200} height={780}>
            <AltLogoCard {...o}/>
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection id="abstract" title="Typographic & abstract">
        {options.filter(o => ['delta','monogram'].includes(o.id)).map(o => (
          <DCArtboard key={o.id} id={o.id} label={`${o.num} · ${o.title}`} width={1200} height={780}>
            <AltLogoCard {...o}/>
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection id="peacock" title="In the peacock palette">
        {options.filter(o => ['column','braid','forum','monogram'].includes(o.id)).map(o => (
          <DCArtboard key={o.id} id={o.id + '-peacock'} label={`${o.num} · ${o.title} · peacock`} width={1200} height={780}>
            <AltLogoCard {...o} color={PEACOCK} accent={TERRACOTTA}/>
          </DCArtboard>
        ))}
      </DCSection>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('canvas-root')).render(
  <DesignCanvas><AltLogosApp/></DesignCanvas>
);
