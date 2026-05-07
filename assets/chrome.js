/* Shared chrome: nav + footer injected into every page.
   Usage: add <div data-nav></div> and <div data-footer></div> and include this script. */

(function(){
  const NAV_LINKS = [
    { href: 'research.html', label: 'Research' },
    { href: 'practice.html', label: 'Practice' },
    { href: 'teaching.html', label: 'Teaching' },
    { href: 'press.html', label: 'Press' },
    { href: 'about.html', label: 'About' },
  ];

  function currentPage() {
    const p = location.pathname.split('/').pop();
    return p || 'index.html';
  }

  function renderNav() {
    const host = document.querySelector('[data-nav]');
    if (!host) return;
    const cur = currentPage();
    const links = NAV_LINKS.map(l =>
      `<a href="${l.href}" class="${cur === l.href ? 'active' : ''}">${l.label}</a>`
    ).join('');

    host.outerHTML = `
      <nav class="nav">
        <div class="nav-inner">
          <a href="index.html" class="brand">
            <span class="brand-mark" data-mark data-size="48"></span>
            <span class="brand-name">
              <b>Civic Power Lab</b>
              <small>Harvard Kennedy School</small>
            </span>
          </a>
          <div class="nav-links">
            ${links}
            <a href="connect.html" class="nav-cta">Work with us</a>
          </div>
          <button class="nav-menu-btn" onclick="document.querySelector('.nav-links').classList.toggle('mobile-open')">Menu</button>
        </div>
      </nav>
    `;
  }

  function renderFooter() {
    const host = document.querySelector('[data-footer]');
    if (!host) return;
    const year = new Date().getFullYear();
    host.outerHTML = `
      <footer class="footer">
        <!-- Footer tile strip — same pattern language as the rest of the site -->
        <div class="footer-strip" data-tiles
             data-cols="24" data-rows="2" data-seed="909" data-density="1.0"
             data-bg="#0d3d45"
             data-colors="#b84a2e,#d9a636,#f1ead7,#d9a636,#b84a2e,#d9a636"
             data-motifs="disc"
             data-rotate-pattern="mirror"
             data-color-pattern="sequence"></div>
        <div class="container">
          <div class="footer-grid">
            <div>
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                <span data-mark data-size="40" class="footer-mark"></span>
                <div style="font-family:var(--font-display);font-size:18px;color:var(--cream);">
                  <b>Civic Power Lab</b>
                  <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--headline-em);margin-top:2px;">Harvard Kennedy School</div>
                </div>
              </div>
            </div>
            <div>
              <h4>Site</h4>
              <ul>
                <li><a href="research.html">Research</a></li>
                <li><a href="practice.html">Practice</a></li>
                <li><a href="teaching.html">Teaching</a></li>
                <li><a href="press.html">Press</a></li>
                <li><a href="about.html">About</a></li>
              </ul>
            </div>
            <div>
              <h4>Engage</h4>
              <ul>
                <li><a href="connect.html#partner">Partner with us</a></li>
                <li><a href="connect.html#ra">Join as RA / postdoc</a></li>
                <li><a href="connect.html#list">Email list</a></li>
                <li><a href="about.html#team">Team &amp; collaborators</a></li>
              </ul>
            </div>
            <div>
              <h4>Visit</h4>
              <ul style="color:rgba(241,234,215,0.78);">
                <li>79 JFK Street</li>
                <li>Cambridge, MA 02138</li>
                <li style="margin-top:12px;"><a href="mailto:emckenna@hks.harvard.edu">civicpowerlab@hks.harvard.edu</a></li>
              </ul>
            </div>
          </div>

          <!-- Colophon — Bulcão acknowledgment -->
          <div class="footer-colophon">
            <div class="fc-label">Visual identity</div>
            <p>
              The tile patterns across this site are inspired by
              <b>Athos Bulcão</b> (1918–2008) — the Brazilian modernist
              whose modular ceramic compositions cover Brasília.
              <em>Bulcão played an active role in the civic movements
              that brought democracy back to Brazil in the late
              20th century.</em>
            </p>
          </div>

          <div class="footer-bottom">
            <span>© ${year} Civic Power Lab · All rights reserved</span>
            <span>Housed at Harvard Kennedy School</span>
          </div>
        </div>
      </footer>
    `;
  }

  function init() {
    renderNav();
    renderFooter();
    if (window.renderTileElements) window.renderTileElements();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
