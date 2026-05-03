'use strict'
const { head, header, footer } = require('./layout')

function stateGrid(states, markets) {
  // Count agents per state from markets
  const counts = {}
  for (const m of markets) {
    counts[m.state_slug] = (counts[m.state_slug] || 0) + (m.agent_count || 0)
  }
  return states.map(s => `<a class="state-link" href="/${s.slug}/">
  <span class="state-name">${s.name}</span>
  <span class="state-count">${counts[s.slug] || 0} agent${(counts[s.slug] || 0) !== 1 ? 's' : ''}</span>
</a>`).join('\n')
}

function cityOptionsByState(markets) {
  const byState = {}
  for (const m of markets) {
    if (!byState[m.state_slug]) byState[m.state_slug] = []
    byState[m.state_slug].push({ slug: m.city_slug, name: m.city_name })
  }
  return byState
}

function homepage(states, markets, config = {}) {
  const title       = 'MeetLifeAgents — Find a Verified Local Life Insurance Agent'
  const description = 'Find verified, locally resident life insurance agents in your city. Every agent is license-verified through your state DOI. Direct contact, no spam, no call centers.'
  const canonical   = config.siteUrl || 'https://meetlifeagents.com'
  const totalAgents = markets.reduce((sum, m) => sum + (m.agent_count || 0), 0)
  const totalCities = markets.length

  const citiesByState = cityOptionsByState(markets)
  const stateOptions  = states.map(s =>
    `<option value="${s.slug}">${s.name}</option>`
  ).join('\n')

  const configScript = `<script>
window.MLA_CONFIG  = ${JSON.stringify({
    mapboxToken:     config.mapboxToken     || '',
    platformNumber:  config.platformNumber  || '+18005550199',
    platformDisplay: config.platformDisplay || '(800) 555-0199',
    apiUrl:          config.apiUrl          || 'https://sidecarleads.com',
  })};
window.MLA_CITIES = ${JSON.stringify(citiesByState)};
</script>`

  const extraHead = config.mapboxToken
    ? `<link href="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css" rel="stylesheet">`
    : ''

  return `${head({ title, description, canonical: canonical + '/', extraHead })}
<body>

${header()}

<section class="hero" id="search">
  <div class="container">
    <div class="hero-grid">
      <div>
        <div class="eyebrow">Verified local agents · Licensed in all 50 states</div>
        <h1 class="display hero-title">
          Meet a life insurance agent who actually <em>lives</em> in your city.
        </h1>
        <p class="hero-sub">
          Every agent on MeetLifeAgents is a resident of the state they serve, holds an active license verified
          through the state Department of Insurance, and meets our independent vetting standard.
          No call centers. No bait-and-switch.
        </p>

        <div class="search-card">
          <label class="search-label">Find a verified agent in your area</label>
          <div class="search-row">
            <div class="select-wrap">
              <select id="state-select" aria-label="Select state">
                <option value="">Select state</option>
                ${stateOptions}
              </select>
            </div>
            <div class="select-wrap">
              <select id="city-select" disabled aria-label="Select city">
                <option value="">Select city</option>
              </select>
            </div>
            <button class="search-cta" type="button">Find agents →</button>
          </div>
          <div class="search-foot">We never sell or share your information. Calls go directly to the agent you choose.</div>
        </div>
      </div>

      <div class="map-wrap">
        <div id="map"></div>
        <div class="map-overlay">
          <strong>${totalCities} cities · ${totalAgents}+ agents</strong>
          Click your state to browse verified life insurance agents in your area.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="trust-bar">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-item">
        <div class="trust-num">100%</div>
        <div class="trust-label">License-verified through state DOI public records</div>
      </div>
      <div class="trust-item">
        <div class="trust-num">5+</div>
        <div class="trust-label">Years of licensure required for our top-tier agents</div>
      </div>
      <div class="trust-item">
        <div class="trust-num">10+</div>
        <div class="trust-label">Carrier appointments minimum for independent placement</div>
      </div>
      <div class="trust-item">
        <div class="trust-num">0</div>
        <div class="trust-label">Information sold to third parties. Ever.</div>
      </div>
    </div>
  </div>
</section>

<section class="diff" id="vetting">
  <div class="container">
    <div class="diff-head">
      <div class="eyebrow" style="justify-content:center;">Why MeetLifeAgents</div>
      <h2 class="display">A directory built around a higher standard.</h2>
      <p>Most life insurance directories list anyone with a license. We don't. Here's what every agent on our platform has to clear before they appear in your search.</p>
    </div>
    <div class="diff-grid">
      <div class="diff-card">
        <div class="diff-num">— 01</div>
        <h3 class="display">Verified local resident.</h3>
        <p>Every agent is a resident of the state they serve, with a verifiable address in or near the city they're listed under. We check it against state DOI records — not a remote call center pretending to be local.</p>
      </div>
      <div class="diff-card">
        <div class="diff-num">— 02</div>
        <h3 class="display">License-verified, no exceptions.</h3>
        <p>Each agent's National Producer Number is displayed publicly and links directly to their state Department of Insurance record. You can verify their license history, disciplinary record, and active appointments before you call.</p>
      </div>
      <div class="diff-card">
        <div class="diff-num">— 03</div>
        <h3 class="display">Independent vetting standard.</h3>
        <p>Beyond the license, our vetted agents meet a higher bar — minimum tenure, carrier diversity, ethical standing, product depth. We test them. Only the agents who pass earn the Vetted Shield.</p>
      </div>
    </div>
  </div>
</section>

<section class="how" id="how">
  <div class="container">
    <div class="how-grid">
      <div class="how-head">
        <div class="eyebrow">How it works</div>
        <h2 class="display">Find your agent in three steps.</h2>
        <p>No forms, no spam, no waiting. Browse local agents, see their credentials, and call the one you choose — directly.</p>
      </div>
      <div class="steps">
        <div class="step">
          <div class="step-num">01</div>
          <div>
            <h4 class="display">Choose your city.</h4>
            <p>Use the map or dropdown to find verified agents serving your area. We'll show you who's licensed, who's local, and who's earned the Vetted Shield.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-num">02</div>
          <div>
            <h4 class="display">Review credentials publicly.</h4>
            <p>Every agent profile shows their license, NPN, years of experience, carrier appointments, and specialties. Click through to verify with the state DOI yourself.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-num">03</div>
          <div>
            <h4 class="display">Call the agent directly.</h4>
            <p>Phone numbers go straight to the agent you choose. No middleman, no shared lead pool, no spam. Your information stays yours.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="states">
  <div class="container">
    <div class="states-head">
      <div class="eyebrow" style="justify-content:center;">Browse by state</div>
      <h2 class="display">Find agents in your state.</h2>
    </div>
    <div class="states-grid">
      ${stateGrid(states, markets)}
    </div>
  </div>
</section>

${footer()}

${configScript}
${config.mapboxToken ? `<script src="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js"></script>` : ''}
<script src="/js/homepage.js" defer></script>
</body>
</html>`
}

module.exports = { homepage }
