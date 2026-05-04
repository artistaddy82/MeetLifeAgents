'use strict'
const { head, header, footer } = require('./layout')

function statePage(stateData, cities, config) {
  const { slug, name, abbr, doi_url, guaranty_amount, guaranty_org, guaranty_url } = stateData
  const siteUrl    = config.siteUrl || 'https://meetlifeagents.com'
  const title      = `Life Insurance Agents in ${name} — Verified Local Agents | MeetLifeAgents`
  const description= `Find verified, locally-resident life insurance agents across ${name}. Browse by city. Every agent license-checked through the ${name} DOI.`
  const canonical  = `${siteUrl}/${slug}/`
  const cityCount  = cities.length
  const totalAgents= cities.reduce((s, m) => s + (m.agent_count || 0), 0)

  const sorted = [...cities].sort((a, b) => {
    const pa = parseInt((a.population || '').replace(/,/g, '')) || 0
    const pb = parseInt((b.population || '').replace(/,/g, '')) || 0
    return pb - pa || a.city_name.localeCompare(b.city_name)
  })

  const cityCards = sorted.map(m => {
    const agents = m.agent_count || 0
    return `<a class="sc-card" href="/${slug}/${m.city_slug}/">
  <span class="sc-name">${m.city_name}</span>
  ${m.population ? `<span class="sc-pop">Pop. ${m.population}</span>` : ''}
  <span class="sc-agents">${agents || 'Agents coming soon'} ${agents ? (agents === 1 ? 'agent →' : 'agents →') : ''}</span>
</a>`
  }).join('\n')

  const products = [
    ['term-insurance',         'Term Life',              'Affordable protection for a set period — 10, 20, or 30 years.'],
    ['whole-life',             'Whole Life',             'Permanent coverage with guaranteed cash value that grows tax-deferred.'],
    ['final-expense',          'Final Expense',          'Simplified-issue coverage for burial, medical, and end-of-life costs.'],
    ['mortgage-protection',    'Mortgage Protection',    'Coverage sized to your loan balance to keep your family in their home.'],
    ['indexed-universal-life', 'Indexed Universal Life', 'Flexible permanent coverage with index-linked upside and principal protection.'],
  ]

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: name, item: canonical }
      ]},
      { '@type': 'InsuranceAgency', name: `MeetLifeAgents — ${name}`, url: canonical,
        areaServed: { '@type': 'State', name } }
    ]
  })

  return `${head({ title, description, canonical, extraHead: `<script type="application/ld+json">${jsonLd}</script>` })}
<body>
${header()}

<!-- ── PAGE HERO ───────────────────────────────────── -->
<section class="pg-hero pg-hero--state">
  <div class="container">
    <nav class="breadcrumb" style="padding-top:20px;">
      <a href="/">Home</a><span>›</span><span>${name}</span>
    </nav>
    <div class="pg-hero-grid">
      <div class="pg-hero-left">
        <p class="city-eyebrow">${name} · Life Insurance</p>
        <h1 class="display pg-hero-title">Verified life insurance agents<br>across <em>${name}.</em></h1>
        <p class="pg-hero-sub">Every agent in our ${name} network lives and works in the state they serve. License-checked through the ${name} DOI. Independent — not captive agents pushing one carrier.</p>
        <div class="pg-hero-stats">
          <div class="pg-stat">
            <span class="pg-stat-num">${cityCount}</span>
            <span class="pg-stat-label">Cities covered</span>
          </div>
          <div class="pg-stat">
            <span class="pg-stat-num">${totalAgents || '—'}</span>
            <span class="pg-stat-label">Verified agents</span>
          </div>
          <div class="pg-stat">
            <span class="pg-stat-num">${guaranty_amount}</span>
            <span class="pg-stat-label">Guaranty protection</span>
          </div>
        </div>
      </div>
      <div class="pg-hero-right">
        <div class="state-doi-card">
          <p class="sdoi-label">Consumer protection · ${abbr}</p>
          <div class="sdoi-amount">${guaranty_amount}</div>
          <p class="sdoi-desc">The <strong>${guaranty_org}</strong> protects ${name} policyholders up to ${guaranty_amount} per insured if a carrier becomes insolvent.</p>
          <a class="sdoi-link" href="${guaranty_url}" target="_blank" rel="noopener">Learn about ${guaranty_org} ↗</a>
          <div class="sdoi-divider"></div>
          <p class="sdoi-verify-label">Verify any agent's ${abbr} license</p>
          <a class="sdoi-verify-btn" href="${doi_url}" target="_blank" rel="noopener">${name} DOI license lookup ↗</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── TRUST STRIP ─────────────────────────────────── -->
<div class="trust-strip">
  <div class="trust-strip-inner">
    <span class="trust-strip-item">License verified through ${name} DOI</span>
    <span class="trust-strip-item">State residents only — not virtual agents</span>
    <span class="trust-strip-item">10+ independent carrier appointments</span>
    <span class="trust-strip-item">Clean disciplinary record required</span>
  </div>
</div>

<!-- ── CITY GRID ────────────────────────────────────── -->
<section class="state-cities-sec">
  <div class="container">
    <div class="sec-head">
      <h2 class="display" style="font-size:clamp(26px,3vw,36px);">Browse by city</h2>
      <span class="sec-meta">${cityCount} cit${cityCount === 1 ? 'y' : 'ies'} in ${name}</span>
    </div>
    <div class="sc-grid">
      ${cityCards}
    </div>
  </div>
</section>

<!-- ── PRODUCTS STRIP (dark) ───────────────────────── -->
<section class="state-products-strip">
  <div class="container">
    <p class="city-eyebrow" style="color:var(--gold-soft);margin-bottom:16px;">Coverage options in ${name}</p>
    <h2 class="display" style="font-size:clamp(26px,3vw,36px);color:var(--cream);margin-bottom:8px;">State-specific guidance by coverage type</h2>
    <p style="color:rgba(250,246,238,0.75);font-size:15px;margin-bottom:36px;max-width:580px;">Local agents in ${name} who specialize in each product type — not generalists, not captive agents.</p>
    <div class="sp-grid">
      ${products.map(([ps, label, desc]) => `<a class="sp-card" href="/${slug}/${ps}/">
  <span class="sp-label">${label}</span>
  <span class="sp-desc">${desc}</span>
  <span class="sp-cta">${name} agents →</span>
</a>`).join('\n')}
    </div>
  </div>
</section>

<!-- ── HOW IT WORKS ─────────────────────────────────── -->
<section class="state-hiw">
  <div class="container">
    <div class="state-hiw-grid">
      <div class="state-hiw-left">
        <p class="city-eyebrow">How it works</p>
        <h2 class="display" style="font-size:clamp(28px,3.5vw,42px);margin-bottom:20px;">Meet a real agent.<br>No spam. No runaround.</h2>
        <p style="font-size:16px;color:var(--ink-soft);line-height:1.65;margin-bottom:24px;">Most insurance sites sell your contact info to dozens of agents who call for weeks. MeetLifeAgents works differently — you pick a local ${name} agent, you contact them directly.</p>
        <a href="/how-it-works/" style="color:var(--gold);font-size:14px;font-weight:600;text-decoration:none;">Read the full explanation →</a>
      </div>
      <div class="state-hiw-steps">
        <div class="step">
          <div class="step-num">1</div>
          <div>
            <h4>Choose a city in ${name}</h4>
            <p>Select any city above to see locally-resident, actively-licensed agents in that market.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div>
            <h4>Review the verified agents</h4>
            <p>Every agent passed our four-point check: active ${abbr} license, ${name} resident, 10+ carriers, clean DOI record.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div>
            <h4>Call or request a callback</h4>
            <p>Your info goes to one agent — not a waterfall of buyers. Direct contact, no middlemen.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

${footer({ stateSlug: slug, stateName: name })}
</body>
</html>`
}

module.exports = { statePage }
