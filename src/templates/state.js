'use strict'
const { head, header, footer } = require('./layout')

/**
 * Full state landing page.
 * @param {object} stateData  — { slug, name, abbr, doi_url, guaranty_amount, guaranty_org, guaranty_url }
 * @param {Array}  cities     — all markets for this state
 * @param {object} config     — site config
 */
function statePage(stateData, cities, config) {
  const { slug, name, abbr, doi_url, guaranty_amount, guaranty_org, guaranty_url } = stateData
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'

  const title       = `Life Insurance Agents in ${name} — Verified Local Agents | MeetLifeAgents`
  const description = `Find verified, locally-resident life insurance agents in ${name}. Browse by city. Every agent is license-checked through the ${name} Department of Insurance.`
  const canonical   = `${siteUrl}/${slug}/`

  const totalAgents = cities.reduce((s, m) => s + (m.agent_count || 0), 0)
  const cityCount   = cities.length

  // Sort cities by population (numeric) descending, then alphabetically
  const sorted = [...cities].sort((a, b) => {
    const pa = parseInt((a.population || '').replace(/,/g, '')) || 0
    const pb = parseInt((b.population || '').replace(/,/g, '')) || 0
    if (pb !== pa) return pb - pa
    return a.city_name.localeCompare(b.city_name)
  })

  const cityCards = sorted.map(m => {
    const agentLabel = m.agent_count === 1 ? '1 verified agent' : `${m.agent_count || 0} verified agents`
    const pop = m.population ? `Pop. ${m.population}` : ''
    const income = m.median_income ? `Median income ${m.median_income}` : ''
    return `<a class="state-city-card" href="/${slug}/${m.city_slug}/">
  <div class="scc-name">${m.city_name}</div>
  ${pop ? `<div class="scc-meta">${pop}${income ? ` · ${income}` : ''}</div>` : ''}
  <div class="scc-agents">${agentLabel} →</div>
</a>`
  }).join('\n')

  // Featured product links for this state
  const products = [
    { label: 'Term Insurance',        slug: 'term-insurance',        desc: 'Affordable coverage for a set period — 10, 20, or 30 years.' },
    { label: 'Whole Life',            slug: 'whole-life',            desc: 'Permanent coverage that builds guaranteed cash value.' },
    { label: 'Final Expense',         slug: 'final-expense',         desc: 'Simplified-issue coverage designed for burial and end-of-life costs.' },
    { label: 'Mortgage Protection',   slug: 'mortgage-protection',   desc: 'A policy sized to your mortgage that protects your family\'s home.' },
    { label: 'Indexed Universal Life',slug: 'indexed-universal-life',desc: 'Flexible permanent coverage with index-linked growth potential.' },
  ]
  const productCards = products.map(p => `
<a class="product-card" href="/${slug}/${p.slug}/">
  <div class="product-label">${p.label}</div>
  <div class="product-desc">${p.desc}</div>
  <span class="product-link">${name} agents →</span>
</a>`).join('')

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
          { '@type': 'ListItem', position: 2, name: name, item: canonical }
        ]
      },
      {
        '@type': 'InsuranceAgency',
        name: `MeetLifeAgents — ${name}`,
        url: canonical,
        areaServed: { '@type': 'State', name }
      }
    ]
  })

  return `${head({ title, description, canonical, extraHead: `<script type="application/ld+json">${jsonLd}</script>` })}
<body>
${header()}

<div class="container" style="padding-top:40px;">
  <nav class="breadcrumb">
    <a href="/">Home</a>
    <span>›</span>
    <span>${name}</span>
  </nav>
</div>

<!-- STATE HERO -->
<section class="state-hero">
  <div class="container">
    <div class="state-hero-inner">
      <div class="state-hero-text">
        <div class="state-eyebrow">Life insurance agents in</div>
        <h1 class="display">${name}</h1>
        <p class="state-hero-sub">Every agent in our ${name} network is a resident of the state they serve, independently licensed, and verified through the ${name} Department of Insurance. Browse by city to find an agent who actually knows your neighborhood.</p>
        <div class="state-trust-row">
          <div class="state-trust-item">
            <span class="state-trust-num">${cityCount}</span>
            <span class="state-trust-label">cities covered</span>
          </div>
          <div class="state-trust-item">
            <span class="state-trust-num">${totalAgents || '—'}</span>
            <span class="state-trust-label">verified agents</span>
          </div>
          <div class="state-trust-item">
            <span class="state-trust-num">${guaranty_amount}</span>
            <span class="state-trust-label">guaranty protection</span>
          </div>
        </div>
      </div>
      <div class="state-hero-aside">
        <div class="state-guaranty-card">
          <div class="sgc-label">State consumer protection</div>
          <div class="sgc-amount">${guaranty_amount}</div>
          <div class="sgc-desc">The <strong>${guaranty_org}</strong> protects ${name} policyholders up to ${guaranty_amount} in death benefits per insured if a carrier becomes insolvent.</div>
          <a href="${guaranty_url}" class="sgc-link" target="_blank" rel="noopener">Learn more ↗</a>
          <div class="sgc-divider"></div>
          <div class="sgc-doi">
            <span>Verify any agent's license:</span>
            <a href="${doi_url}" target="_blank" rel="noopener">${name} DOI ↗</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CITIES GRID -->
<section class="state-cities-section">
  <div class="container">
    <div class="section-header">
      <h2 class="display" style="font-size:clamp(28px,3vw,40px);">Browse by city</h2>
      <p style="color:var(--ink-soft);font-size:15px;margin-top:8px;">Select a city to see verified agents who live and work there.</p>
    </div>
    <div class="state-cities-grid">
      ${cityCards}
    </div>
  </div>
</section>

<!-- PRODUCTS FOR THIS STATE -->
<section class="state-products-section">
  <div class="container">
    <h2 class="display" style="font-size:clamp(26px,3vw,36px);margin-bottom:8px;">Coverage options in ${name}</h2>
    <p style="color:var(--ink-soft);font-size:15px;margin-bottom:32px;">Explore state-specific guidance for each major life insurance type.</p>
    <div class="state-products-grid">
      ${productCards}
    </div>
  </div>
</section>

<!-- HOW IT WORKS STRIP -->
<section class="state-hiw-strip">
  <div class="container">
    <h2 class="display" style="font-size:clamp(24px,2.5vw,34px);text-align:center;margin-bottom:40px;">How MeetLifeAgents works</h2>
    <div class="hiw-steps">
      <div class="hiw-step">
        <div class="hiw-num">1</div>
        <div class="hiw-body">
          <strong>Choose your city</strong>
          <p>Select a city in ${name} to see locally-resident agents who are actively licensed in your area.</p>
        </div>
      </div>
      <div class="hiw-step">
        <div class="hiw-num">2</div>
        <div class="hiw-body">
          <strong>Review verified agents</strong>
          <p>Every agent passed our four-point vetting: active ${abbr} license, resident of ${name}, 10+ carrier appointments, clean DOI record.</p>
        </div>
      </div>
      <div class="hiw-step">
        <div class="hiw-num">3</div>
        <div class="hiw-body">
          <strong>Connect directly</strong>
          <p>Call or request a callback. No spam, no third-party forwarding. You connect with the agent directly.</p>
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
