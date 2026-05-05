/* global React, ReactDOM, CLASSIC, DesignCanvas, DCSection, DCArtboard */

const { LogoFull, LogoMid, LogoMini, LogoResponsive } = window.CLASSIC;

// ---- Color schemes ---------------------------------------------------------
const CREAM = '#f4ecd8';
const PAPER = '#f7f1e3';
const INK   = '#1a1f2e';

const SCHEMES = [
  {
    id: 'cobalt-terracotta',
    name: 'Cobalt + Terracotta',
    tag: 'The Bulcão one',
    note: 'The current direction. Warm cream field, cobalt network, terracotta organizer. Feels field-rooted and intellectual at once. Most distinctive.',
    bg: CREAM, color: '#1a3a8f', accent: '#c24e2a'
  },
  {
    id: 'ink-terracotta',
    name: 'Ink + Terracotta',
    tag: 'The neutral',
    note: 'Cooler, more versatile. The terracotta organizer still does the narrative work, but the network reads as pure structure. Safest across contexts.',
    bg: CREAM, color: INK, accent: '#c24e2a'
  },
  {
    id: 'olive-terracotta',
    name: 'Olive + Terracotta',
    tag: 'Earthy',
    note: 'Warmer, more horticultural. Reads as "organizing is growing things." Unconventional for a policy lab, which is partly the point — pairs well with the Bulcão vocabulary.',
    bg: CREAM, color: '#5a6b34', accent: '#c24e2a'
  },
  {
    id: 'cobalt-mono',
    name: 'Cobalt, monochrome',
    tag: 'Confident',
    note: 'No accent — the organizer is just "more central" structurally. Works when the lockup is busy, or when the mark sits next to other colored elements. Quieter.',
    bg: CREAM, color: '#1a3a8f', accent: '#1a3a8f', mono: true
  },
  {
    id: 'ink-mono',
    name: 'Ink, monochrome',
    tag: 'Academic',
    note: 'The most restrained. Reads as a research-paper figure. Strong for publications, funder decks, anything where the mark should defer to content.',
    bg: CREAM, color: INK, accent: INK, mono: true
  },
  {
    id: 'reversed',
    name: 'Cream on cobalt',
    tag: 'Dark field',
    note: 'Reversed out for dark backgrounds (hero sections, video bumpers, merch). The terracotta organizer becomes a warm glow against the field. Second most distinctive.',
    bg: '#0f2a6b', color: CREAM, accent: '#f4c58a', dark: true
  },
];

// ---- UI --------------------------------------------------------------------

function IntroCard() {
  return (
    <div className="ab intro-ab">
      <div className="eyebrow">Classic snowflake · deep dive</div>
      <h1>Making it work <em>everywhere</em>.</h1>

      <p>
        The Classic mark you picked is the faithful one — center organizer, four leaders, twelve members. It reads beautifully at 100px+. At 24px, the twelve outer nodes turn to mush. At 16px they disappear entirely.
      </p>
      <p>
        You don't solve this with <em>one</em> logo. You solve it with a <b>family</b> — three marks that share the same geometric language but show different amounts of detail. The browser tab, the letterhead, and the poster each get the version designed for their size.
      </p>

      <h3>The three tiers</h3>
      <div className="tier-grid">
        <div className="tier">
          <div className="tier-label">FULL<span>40px+</span></div>
          <p><b>1 + 4 + 12.</b> All three levels of hierarchy visible. For hero blocks, printed covers, large merch. This is the one that tells the whole story.</p>
        </div>
        <div className="tier">
          <div className="tier-label">MID<span>24–40px</span></div>
          <p><b>1 + 4 + 4.</b> One leaf per arm, heavier strokes. Keeps the three-tier structure but at mid-size density. For nav bars, footers, business cards.</p>
        </div>
        <div className="tier">
          <div className="tier-label">MINI<span>≤24px</span></div>
          <p><b>1 + 4.</b> Pure plus. Organizer + four leaders, nothing else. The favicon. Reads clean at 16px. Still unmistakably the same mark.</p>
        </div>
      </div>

      <h3>Design principles at small sizes</h3>
      <ul>
        <li><b>Stroke weight goes up, not down.</b> Counterintuitively, the smaller the mark, the fatter the lines need to be — fine detail disappears first.</li>
        <li><b>Accent radius grows as a proportion.</b> At 16px the organizer is ~20% of the mark; at 100px it's ~12%. Same meaning, different visual weight.</li>
        <li><b>One signal per size.</b> Don't try to squeeze the 12-node ring into a favicon. Pick the single most-important thing (center + 4) and let that be the whole mark.</li>
      </ul>

      <p className="arrow">↓ See each size rendered at native resolution on the next artboard, then six color schemes.</p>
    </div>
  );
}

function SizeStudyCard() {
  // Side-by-side comparison at ACTUAL rendered sizes.
  return (
    <div className="ab">
      <div className="ab-head">
        <div>
          <div className="tag">Size study · native resolution</div>
          <h2>How it breaks, and how to fix it.</h2>
        </div>
        <div className="num">Bad → Good</div>
      </div>
      <p className="ab-note">Top row: the <b>original</b> Classic at every size — notice how the outer ring collapses at 24px and disappears at 16px. Bottom row: the <b>responsive family</b> — each size gets the tier designed for it.</p>

      <div className="size-study">
        <div className="size-row">
          <div className="size-row-label">
            <div className="label-tag">Before</div>
            <div className="label-note">Classic, forced through all sizes</div>
          </div>
          {[100, 64, 40, 28, 20, 16].map(s => (
            <div key={s} className="size-cell">
              <div className="size-frame"><LogoFull size={s} /></div>
              <div className="size-px">{s}px</div>
            </div>
          ))}
        </div>

        <div className="size-row good">
          <div className="size-row-label">
            <div className="label-tag">After</div>
            <div className="label-note">Responsive family, right tier per size</div>
          </div>
          {[100, 64, 40, 28, 20, 16].map(s => (
            <div key={s} className="size-cell">
              <div className="size-frame"><LogoResponsive size={s} /></div>
              <div className="size-px">{s}px</div>
              <div className="size-tier">{s >= 40 ? 'full' : s >= 24 ? 'mid' : 'mini'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TierDetailCard() {
  return (
    <div className="ab">
      <div className="ab-head">
        <div>
          <div className="tag">Family members · up close</div>
          <h2>Each tier, on its own.</h2>
        </div>
        <div className="num">3 marks</div>
      </div>
      <p className="ab-note">The three members of the family at the same display size — so you can see how the geometry changes. They <em>should</em> feel like siblings, not one mark deformed three ways.</p>

      <div className="tier-detail-grid">
        <div className="tier-detail-cell">
          <div className="td-mark"><LogoFull size={240} /></div>
          <div className="td-name">FULL</div>
          <div className="td-meta">1 + 4 + 12 · for 40px+</div>
        </div>
        <div className="tier-detail-cell">
          <div className="td-mark"><LogoMid size={240} /></div>
          <div className="td-name">MID</div>
          <div className="td-meta">1 + 4 + 4 · for 24–40px</div>
        </div>
        <div className="tier-detail-cell">
          <div className="td-mark"><LogoMini size={240} /></div>
          <div className="td-name">MINI</div>
          <div className="td-meta">1 + 4 · for ≤24px</div>
        </div>
      </div>
    </div>
  );
}

function SchemeCard({ scheme, idx }) {
  return (
    <div className="ab">
      <div className="ab-head">
        <div>
          <div className="tag">{String(idx).padStart(2, '0')} · {scheme.tag}</div>
          <h2>{scheme.name}</h2>
        </div>
        <div className="num">
          <span className="swatch" style={{ background: scheme.color }} />
          <span className="swatch" style={{ background: scheme.accent }} />
          <span className="swatch swatch-rule" style={{ background: scheme.bg }} />
        </div>
      </div>
      <p className="ab-note">{scheme.note}</p>

      <div className="scheme-grid">
        <div className={'scheme-main ' + (scheme.dark ? 'dark' : '')} style={{ background: scheme.bg }}>
          <LogoFull size={220} color={scheme.color} accent={scheme.accent} mono={scheme.mono} />
        </div>
        <div className="scheme-side">
          <div className={'sc-block ' + (scheme.dark ? 'dark' : '')} style={{ background: scheme.bg }}>
            <div className="sc-label">Lockup</div>
            <div className="sc-lockup">
              <LogoMid size={44} color={scheme.color} accent={scheme.accent} mono={scheme.mono} />
              <div className="sc-wordmark" style={{ color: scheme.color }}>
                Civic Power Lab
                <small style={{ color: scheme.color, opacity: 0.65 }}>Harvard Kennedy School</small>
              </div>
            </div>
          </div>
          <div className={'sc-block ' + (scheme.dark ? 'dark' : '')} style={{ background: scheme.bg }}>
            <div className="sc-label">Responsive scale</div>
            <div className="sc-scale">
              <div className="sc-scale-item">
                <LogoResponsive size={48} color={scheme.color} accent={scheme.accent} mono={scheme.mono} />
                <span>48</span>
              </div>
              <div className="sc-scale-item">
                <LogoResponsive size={32} color={scheme.color} accent={scheme.accent} mono={scheme.mono} />
                <span>32</span>
              </div>
              <div className="sc-scale-item">
                <LogoResponsive size={24} color={scheme.color} accent={scheme.accent} mono={scheme.mono} />
                <span>24</span>
              </div>
              <div className="sc-scale-item">
                <LogoResponsive size={16} color={scheme.color} accent={scheme.accent} mono={scheme.mono} />
                <span>16</span>
              </div>
            </div>
          </div>
          <div className={'sc-block browser ' + (scheme.dark ? 'dark' : '')}>
            <div className="sc-label">Browser tab</div>
            <div className="sc-tab" style={{ background: scheme.bg }}>
              <LogoMini size={14} color={scheme.color} accent={scheme.accent} mono={scheme.mono} />
              <span style={{ color: scheme.color }}>Civic Power Lab</span>
              <span className="sc-tab-x" style={{ color: scheme.color, opacity: 0.4 }}>×</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="intro" title="The problem & approach">
        <DCArtboard id="intro" label="Design notes" width={1200} height={860}>
          <IntroCard />
        </DCArtboard>
        <DCArtboard id="size-study" label="Size study · before & after" width={1400} height={640}>
          <SizeStudyCard />
        </DCArtboard>
        <DCArtboard id="tier-detail" label="The three family members" width={1200} height={700}>
          <TierDetailCard />
        </DCArtboard>
      </DCSection>

      <DCSection id="schemes" title="Color schemes">
        {SCHEMES.map((s, i) => (
          <DCArtboard key={s.id} id={s.id} label={`${String(i+1).padStart(2,'0')} · ${s.name}`} width={1200} height={780}>
            <SchemeCard scheme={s} idx={i+1} />
          </DCArtboard>
        ))}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('canvas-root')).render(<App />);
