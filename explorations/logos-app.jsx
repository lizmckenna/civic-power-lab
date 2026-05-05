/* global React, ReactDOM, LOGOS, DesignCanvas, DCSection, DCArtboard */

const {
  LogoClassic, LogoCompressed, LogoAsymmetric, LogoMonoline,
  LogoPulse, LogoLetterC, LogoGrowth, LogoConstellation
} = window.LOGOS;

function Showcase({ Logo, variant }) {
  const color = '#1a3a8f';
  const accent = '#c24e2a';
  const colorLight = '#f1e9d8';
  const accentLight = '#f4c58a';
  return (
    <div className="show-grid">
      <div className={"show-main " + (variant === 'dark' ? 'dark' : '')}>
        <div className="mark-large">
          <Logo size={220} color={variant === 'dark' ? colorLight : color} accent={variant === 'dark' ? accentLight : accent} />
        </div>
      </div>
      <div className="show-side">
        <div className="scale-box">
          <div className="scale-label">Scale test</div>
          <div className="scale-row">
            <Logo size={64} color={color} accent={accent} />
            <Logo size={40} color={color} accent={accent} />
            <Logo size={24} color={color} accent={accent} />
            <Logo size={16} color={color} accent={accent} />
          </div>
        </div>
        <div className="lockup-box">
          <div className="scale-label">Lockup · light</div>
          <div className="lockup">
            <Logo size={44} color={color} accent={accent} />
            <div className="wordmark">
              Civic Power Lab
              <small>Harvard Kennedy School</small>
            </div>
          </div>
        </div>
        <div className="lockup-box dark">
          <div className="scale-label">Lockup · dark</div>
          <div className="lockup">
            <Logo size={44} color={colorLight} accent={accentLight} />
            <div className="wordmark">
              Civic Power Lab
              <small>Harvard Kennedy School</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ tag, title, num, note, Logo }) {
  return (
    <div className="ab">
      <div className="ab-head">
        <div>
          <div className="tag">{tag}</div>
          <h2>{title}</h2>
        </div>
        <div className="num">{num}</div>
      </div>
      <p className="ab-note" dangerouslySetInnerHTML={{ __html: note }} />
      <Showcase Logo={Logo} />
    </div>
  );
}

function IntroCard() {
  return (
    <div className="ab intro-ab">
      <div className="eyebrow">Logo exploration · Civic Power Lab</div>
      <h1>The snowflake, <em>as a mark</em>.</h1>

      <p>
        The snowflake organizing model (one organizer → team leaders → team members) is the right conceptual starting point: it names what the lab actually studies — <b>how participation turns into power through organizational structure</b>. As a logo, though, the full diagram has ~25 nodes. That won't survive a favicon.
      </p>
      <p>
        Eight directions below, each a different answer to "how much of the model do we keep visible?" — ranging from faithful reduction (1 + 4 + 3 nodes) to pure abstraction (ripple rings, constellation).
      </p>

      <h3>Principles I'd hold</h3>
      <ul>
        <li><b>Reduce ruthlessly.</b> Every node earns its place. The diagram loses readability past ~13 nodes.</li>
        <li><b>Hierarchy, not symmetry.</b> A perfectly symmetric snowflake reads as crystalline / cold. A little asymmetry makes it feel <em>alive</em>.</li>
        <li><b>One accent node.</b> The organizer at center gets a distinct color; everything else is one color. That single highlight carries the whole meaning.</li>
        <li><b>Test at 16px first.</b> A logo that only works at 200px isn't a logo — it's a poster.</li>
        <li><b>Wordmark does the heavy lifting.</b> "Civic Power Lab" is a long name; the mark is a companion, not a pictogram of the full phrase.</li>
      </ul>

      <h3>How the options are organized</h3>
      <div className="legend-grid">
        <div className="legend-item">01 – 03<b>Faithful to the model</b></div>
        <div className="legend-item">04<b>Technical / research</b></div>
        <div className="legend-item">05 – 06<b>Abstracted</b></div>
        <div className="legend-item">07 – 08<b>Directional / soft</b></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="intro" title="Start here">
        <DCArtboard id="intro" label="Design notes" width={1200} height={780}>
          <IntroCard />
        </DCArtboard>
      </DCSection>

      <DCSection id="faithful" title="Faithful to the model">
        <DCArtboard id="l1" label="01 · Classic Snowflake" width={1100} height={720}>
          <Card
            tag="01 · Faithful reduction" title="Classic Snowflake."
            num="1 + 4 + 12 nodes"
            note="<b>The honest one.</b> A direct reduction of the organizing model: organizer at center (terracotta), four team leaders, three members branching off each. Hierarchy intact, nothing implied. Downside: gets busy below 24px. Use when the mark can live at 40px+."
            Logo={LogoClassic}
          />
        </DCArtboard>
        <DCArtboard id="l2" label="02 · Compressed" width={1100} height={720}>
          <Card
            tag="02 · Faithful, simplified" title="Compressed."
            num="1 + 4 + 12 (small leaves)"
            note="<b>My favorite balance.</b> Spokes are solid and dominant; the outer member ring shrinks to tiny dots that read as 'and more.' Survives to ~20px cleanly, and still visibly encodes the 3-tier structure. Strong on its own or in a lockup."
            Logo={LogoCompressed}
          />
        </DCArtboard>
        <DCArtboard id="l3" label="03 · Asymmetric / Alive" width={1100} height={720}>
          <Card
            tag="03 · Faithful, loosened" title="Asymmetric."
            num="Rotated 15°, uneven leaves"
            note="<b>Least crystalline.</b> Rotated, with different leaf counts per spoke (4/2/3/3). Reads as a living network rather than a geometric icon. Costs some brand-mark 'polish' in return for feeling human and field-rooted. This is the one if you want the mark to look less like a corporate logo."
            Logo={LogoAsymmetric}
          />
        </DCArtboard>
      </DCSection>

      <DCSection id="technical" title="Technical / research-forward">
        <DCArtboard id="l4" label="04 · Monoline diagram" width={1100} height={720}>
          <Card
            tag="04 · Diagrammatic" title="Monoline."
            num="Hollow leader nodes, ring"
            note="<b>Most 'research lab.'</b> Hollow leader rings, thin connecting lines, a soft outer circle to suggest reach. Feels like something pulled from a field methods paper — which, given the lab's positioning, is on-brand. Pairs especially well with the serif wordmark."
            Logo={LogoMonoline}
          />
        </DCArtboard>
      </DCSection>

      <DCSection id="abstracted" title="Abstracted">
        <DCArtboard id="l5" label="05 · Pulse / Radial" width={1100} height={720}>
          <Card
            tag="05 · Abstracted" title="Pulse."
            num="3 rings + 12 nodes"
            note="<b>The one that scales best.</b> Three concentric rings with nodes placed on them — preserves 'center → waves outward' without drawing the tree. Reads perfectly at 16px. Loses the explicit hierarchy, but reads more universally as 'network with a core.'"
            Logo={LogoPulse}
          />
        </DCArtboard>
        <DCArtboard id="l6" label="06 · Letterform C" width={1100} height={720}>
          <Card
            tag="06 · Hybrid monogram" title="Letter-C network."
            num="Nodes arranged in a C"
            note="<b>Most memorable / most opinionated.</b> The perimeter nodes form an implied C (for Civic), with spokes returning to center. Doubles as both a network mark and a monogram. Risk: it's cleverer than it is pure. Use if you want the mark to do more work than the wordmark."
            Logo={LogoLetterC}
          />
        </DCArtboard>
      </DCSection>

      <DCSection id="directional" title="Directional / soft">
        <DCArtboard id="l7" label="07 · Growth / Directional" width={1100} height={720}>
          <Card
            tag="07 · Directional" title="Growth."
            num="3 waves, one direction"
            note="<b>The verb, not the noun.</b> Instead of a static symmetric web, a network that grows from a single organizer (lower-left) outward through three waves of increasingly smaller nodes. Reads as <em>building</em> power, not <em>being</em> a network. Unconventional, but strongly aligned with 'R&amp;D arm of democracy.'"
            Logo={LogoGrowth}
          />
        </DCArtboard>
        <DCArtboard id="l8" label="08 · Constellation" width={1100} height={720}>
          <Card
            tag="08 · Dots only" title="Constellation."
            num="No lines, implied structure"
            note="<b>The quiet one.</b> No connecting lines — the eye does the work of completing the network. Softest, most typographic-friendly, scales beautifully. Downside: at a tiny size it can read as 'scattered dots' rather than a structured network. Best in a wordmark lockup, less strong as a standalone mark."
            Logo={LogoConstellation}
          />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('canvas-root')).render(<App />);
