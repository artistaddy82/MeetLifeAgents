'use strict'
/**
 * Shared layout components.
 * All functions return raw HTML strings.
 */

function head({ title, description, canonical, extraHead = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/main.css?v=10">
${extraHead}
</head>`
}

function header() {
  return `<header>
  <div class="nav">
    <a href="/" class="logo">
      <span class="logo-mark">M</span>
      MeetLifeAgents
    </a>
    <div class="nav-links">
      <a href="/how-it-works/">How it works</a>
      <a href="/our-vetting/">Our vetting</a>
      <a href="https://sidecarleads.com/login" target="_blank" rel="noopener">Agent login</a>
      <a href="/#search" class="nav-cta">Find an agent</a>
    </div>
  </div>
</header>`
}

function footer({ stateSlug = '', stateName = '' } = {}) {
  return `<footer>
  <div class="container">
    <div class="foot-grid">
      <div class="foot-about">
        <a href="/" class="logo" style="color:var(--cream);margin-bottom:16px;">
          <span class="logo-mark" style="background:var(--cream);color:var(--ink);">M</span>
          MeetLifeAgents
        </a>
        <p>An independent directory connecting consumers with verified, locally resident, licensed life insurance agents. We are not an insurance agency. We do not sell policies. We connect.</p>
      </div>
      <div class="foot-col">
        <h5>Policies</h5>
        ${stateSlug ? `<a href="/${stateSlug}/term-insurance/">Term Insurance</a>
        <a href="/${stateSlug}/whole-life/">Whole Life</a>
        <a href="/${stateSlug}/final-expense/">Final Expense</a>
        <a href="/${stateSlug}/mortgage-protection/">Mortgage Protection</a>
        <a href="/${stateSlug}/indexed-universal-life/">Indexed Universal Life</a>` : `<a href="/al/term-insurance/">Term Insurance</a>
        <a href="/al/whole-life/">Whole Life</a>
        <a href="/al/final-expense/">Final Expense</a>`}
      </div>
      <div class="foot-col">
        <h5>Compare</h5>
        <a href="/compare/term-vs-whole-life/">Term vs Whole Life</a>
        <a href="/compare/term-vs-iul/">Term vs IUL</a>
        <a href="/compare/whole-life-vs-iul/">Whole Life vs IUL</a>
        <a href="/compare/term-vs-final-expense/">Term vs Final Expense</a>
        <a href="/compare/mortgage-protection-vs-term/">Mortgage Protection vs Term</a>
      </div>
      <div class="foot-col">
        <h5>Tools</h5>
        <a href="/match/">Match Me with an Agent</a>
        <a href="/calculator/">Premium Calculator</a>
        <a href="/faq/">FAQ</a>
        <a href="/glossary/">Insurance Glossary</a>
      </div>
      <div class="foot-col">
        <h5>For consumers</h5>
        <a href="/how-it-works/">How it works</a>
        <a href="/our-vetting/">Our vetting standard</a>
        <a href="/why-not-ethos/">Why not Ethos?</a>
        <a href="/about/">About</a>
      </div>
      <div class="foot-col">
        <h5>For agents</h5>
        <a href="/agents/apply/">Apply to join</a>
        <a href="https://sidecarleads.com/login" target="_blank" rel="noopener">Agent login</a>
        <a href="/agents/standards/">Network standards</a>
      </div>
      <div class="foot-col">
        <h5>Company</h5>
        <a href="/contact/">Contact</a>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
        <a href="/tcpa/">TCPA disclosure</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} MeetLifeAgents. Independent agent directory.</span>
      <span>Licensed agents in all 50 states</span>
    </div>
  </div>
</footer>`
}

const GLOBAL_SCRIPTS = `<script src="/js/cities.js"></script>
<script src="/js/global.js"></script>`

module.exports = { head, header, footer, GLOBAL_SCRIPTS }
