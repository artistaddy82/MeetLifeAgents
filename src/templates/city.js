'use strict'
const { head, header, footer } = require('./layout')

/**
 * Renders one agent card.
 * tier: 'elite' | 'premier' | 'verified'
 */
function agentCard(agent, stateSlug, citySlug, stateDoiUrl) {
  const initials  = (agent.first_name[0] + agent.last_name[0]).toUpperCase()
  const fullName  = `${agent.first_name} ${agent.last_name}`
  const featured  = agent.tier === 'elite' || agent.tier === 'premier'
  const tags      = (agent.specialties || []).map(t => `<span class="tag">${t}</span>`).join('')
  const doiUrl    = `${stateDoiUrl}?npn=${agent.npn}`

  return `<article class="agent-card${featured ? ' featured' : ''}">
  <div class="agent-photo">${agent.photo_url ? `<img src="${agent.photo_url}" alt="${fullName}" width="96" height="96" loading="lazy">` : initials}</div>
  <div class="agent-info">
    <div class="agent-name">${fullName}</div>
    <div class="agent-meta">
      <span class="badge badge-verify">License verified</span>
      <span class="badge badge-tenure">${agent.years_licensed} years licensed</span>
      <span class="badge-response">Responds in ${agent.response_time || '24 hrs'}</span>
      <span class="agent-meta-item">📍 ${agent.office_city}, ${agent.office_state}</span>
      <span class="agent-meta-item">🏢 ${agent.carrier_count} carrier appointments</span>
    </div>
    ${agent.bio ? `<p class="agent-bio">${agent.bio}</p>` : ''}
    ${tags ? `<div class="agent-tags">${tags}</div>` : ''}
  </div>
  <div class="agent-action">
    <button class="call-btn" data-ext="${agent.extension}" data-agent="${fullName}" onclick="revealCall(this)">
      Call Agent
    </button>
    <a href="/${stateSlug}/${citySlug}/${agent.slug}/" class="agent-profile-link">View profile →</a>
    <a href="${doiUrl}" class="agent-verify-link" target="_blank" rel="noopener noreferrer">
      Verify NPN ${agent.npn} ↗
    </a>
  </div>
</article>`
}

/**
 * Renders a nearby-city grid item.
 */
function nearbyLink(city) {
  const href = city.slug ? `/${city.state}/${city.slug}/` : `/${city.state}/`
  const meta = city.distance === 'statewide'
    ? `${city.agent_count} verified agents statewide`
    : `${city.agent_count} verified agents · ${city.distance}`
  return `<a class="nearby-link" href="${href}">
  <div class="nearby-name">${city.name}</div>
  <div class="nearby-meta">${meta}</div>
</a>`
}

/**
 * Main city page template.
 * @param {object} market   — entry from data/markets.json
 * @param {Array}  agents   — agents for this city from data/agents.json
 * @param {string} doiUrl   — state DOI lookup URL
 * @param {object} config   — site config (platformNumber, apiUrl, etc.)
 */
function cityPage(market, agents, doiUrl, config = {}) {
  const { city_name, city_slug, state_name, state_slug, state_abbr } = market
  const pageTitle   = `Life Insurance Agents in ${city_name}, ${state_abbr} — Verified Local Agents | MeetLifeAgents`
  const description = `Find verified, locally resident life insurance agents in ${city_name}, ${state_name}. Every agent is license-verified through the ${state_name} DOI. Direct phone contact, no spam.`
  const canonical   = `${config.siteUrl || 'https://meetlifeagents.com'}/${state_slug}/${city_slug}/`

  const eliteAgents    = agents.filter(a => a.tier === 'elite' || a.tier === 'premier')
  const verifiedAgents = agents.filter(a => a.tier === 'verified')

  const eliteCardsHtml    = eliteAgents.map(a => agentCard(a, state_slug, city_slug, doiUrl)).join('\n')
  const verifiedCardsHtml = verifiedAgents.map(a => agentCard(a, state_slug, city_slug, doiUrl)).join('\n')
  const nearbyHtml        = (market.nearby || []).map(nearbyLink).join('\n')
  const localProseHtml    = (market.local_prose || []).map(p => `<p>${p}</p>`).join('\n')

  const configScript = `<script>
window.MLA_CONFIG = ${JSON.stringify({
    platformNumber:  config.platformNumber  || '+18005550199',
    platformDisplay: config.platformDisplay || '(800) 555-0199',
    apiUrl:          config.apiUrl          || 'https://sidecarleads.com',
  })};
document.documentElement.dataset.city  = '${city_name}';
document.documentElement.dataset.state = '${state_abbr}';
</script>`

  return `${head({ title: pageTitle, description, canonical })}
<body>

${header()}

<div class="container">
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a><span>›</span>
    <a href="/${state_slug}/">${state_name}</a><span>›</span>
    <span>${city_name}</span>
  </nav>
</div>

<section class="city-hero">
  <div class="container">
    <div class="city-hero-grid">
      <div>
        <div class="city-eyebrow">Verified local agents · ${city_name}, ${state_name}</div>
        <h1 class="display city-title">
          Life insurance agents <em>who live in</em> ${city_name}, ${state_abbr}.
        </h1>
        <p class="city-sub">
          Every agent listed below is a resident of ${state_name}, holds an active license verified through the
          ${state_name} Department of Insurance, and serves ${city_name}${market.county ? ` and surrounding ${market.county}` : ''}.
          Click any agent's NPN to verify their credentials directly with the state.
        </p>
      </div>
      <div class="city-stats">
        <div class="city-stat">
          <div class="city-stat-num">${market.agent_count}</div>
          <div class="city-stat-label">Verified agents</div>
        </div>
        <div class="city-stat">
          <div class="city-stat-num">${market.vetted_count}</div>
          <div class="city-stat-label">Top-tier vetted</div>
        </div>
        ${market.avg_distance ? `<div class="city-stat">
          <div class="city-stat-num">${market.avg_distance}</div>
          <div class="city-stat-label">Avg. distance from city center</div>
        </div>` : ''}
      </div>
    </div>
  </div>
</section>

<section class="trust-strip" aria-label="Verification criteria">
  <div class="container">
    <div class="trust-strip-inner">
      <span class="trust-strip-item">${state_abbr} DOI verified</span>
      <span class="trust-strip-item">Local resident</span>
      <span class="trust-strip-item">4+ years licensed</span>
      <span class="trust-strip-item">Multi-carrier appointed</span>
      <span class="trust-strip-item">Clean complaint record</span>
    </div>
  </div>
</section>

<section class="intake">
  <div class="container">
    <div class="intake-grid">
      <div class="intake-left">
        <h2 class="display">Talk to a verified agent <em>now</em>.</h2>
        <p>Skip the search — call our local intake line and we'll connect you with the right ${city_name} agent for your situation. Or fill out the form and an agent specializing in your needs will call you within 15 minutes.</p>
        <button class="intake-call-btn" data-ext="${market.intake_extension}" data-agent="${city_name} Intake" onclick="revealIntakeCall(this)">
          Call Now
        </button>
        <div class="intake-divider">— or fill out the form —</div>
      </div>

      <div class="intake-form-wrap">
        <div class="intake-step active" data-step="1">
          <div class="intake-form-head">
            <h3>Find your match</h3>
            <span class="intake-step-label">Step 1 of 3</span>
          </div>
          <p class="intake-form-sub">Answer 3 quick questions and we'll route you to the right local agent.</p>
          <div class="intake-q">What type of coverage are you looking for?</div>
          <div class="intake-options">
            <button class="intake-opt" data-value="term" data-specialty="Term Life">
              Term Life<span class="intake-opt-sub">Affordable, time-limited coverage</span>
            </button>
            <button class="intake-opt" data-value="whole" data-specialty="Whole Life">
              Whole Life<span class="intake-opt-sub">Lifelong with cash value</span>
            </button>
            <button class="intake-opt" data-value="final" data-specialty="Final Expense">
              Final Expense<span class="intake-opt-sub">Burial &amp; end-of-life costs</span>
            </button>
            <button class="intake-opt" data-value="not-sure" data-specialty="General">
              Not Sure<span class="intake-opt-sub">Help me figure it out</span>
            </button>
          </div>
        </div>

        <div class="intake-step" data-step="2">
          <div class="intake-form-head">
            <h3>Coverage amount</h3>
            <span class="intake-step-label">Step 2 of 3</span>
          </div>
          <p class="intake-form-sub">Roughly how much coverage are you looking for?</p>
          <div class="intake-q">Coverage amount needed:</div>
          <div class="intake-options">
            <button class="intake-opt" data-value="under-250k">Under $250,000</button>
            <button class="intake-opt" data-value="250k-500k">$250K – $500K</button>
            <button class="intake-opt" data-value="500k-1m">$500K – $1M</button>
            <button class="intake-opt" data-value="over-1m">Over $1M</button>
            <button class="intake-opt" data-value="not-sure-amount">Not sure yet</button>
          </div>
          <button class="intake-back" onclick="goToStep(1)">← Back</button>
        </div>

        <div class="intake-step" data-step="3">
          <div class="intake-form-head">
            <h3>Where should the agent call you?</h3>
            <span class="intake-step-label">Step 3 of 3</span>
          </div>
          <p class="intake-form-sub">Your information is shared only with the agent we match you with.</p>
          <div class="intake-input-row">
            <input type="text" class="intake-input" id="intake-first" placeholder="First name" autocomplete="given-name">
            <input type="text" class="intake-input" id="intake-last"  placeholder="Last name"  autocomplete="family-name">
          </div>
          <input type="tel"   class="intake-input" id="intake-phone" placeholder="Phone number" autocomplete="tel">
          <input type="email" class="intake-input" id="intake-email" placeholder="Email (optional)" autocomplete="email">
          <button class="intake-submit" onclick="submitIntakeForm()">Match me with an agent →</button>
          <button class="intake-back" onclick="goToStep(2)">← Back</button>
          <div class="intake-privacy">By submitting, you agree to be contacted by a licensed agent. We never sell your information.</div>
        </div>

        <div class="intake-success" data-step="success">
          <div class="intake-success-icon">✓</div>
          <h3>You're matched.</h3>
          <p>An agent specializing in <strong id="success-specialty">your coverage needs</strong> will call you within 15 minutes.</p>
          <p>Watch for a call from a ${city_name}-area number.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="container">
  <div class="main">
    <main>
      ${eliteAgents.length ? `
      <div class="sec-head">
        <h2 class="display">Vetted agents in ${city_name}</h2>
        <span class="sec-meta">${eliteAgents.length} agent${eliteAgents.length !== 1 ? 's' : ''} · License-verified</span>
      </div>
      <div class="agents-grid">${eliteCardsHtml}</div>` : ''}

      ${verifiedAgents.length ? `
      <div class="sec-head">
        <h2 class="display">All licensed agents in ${city_name}</h2>
        <span class="sec-meta">${verifiedAgents.length} additional verified agent${verifiedAgents.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="agents-grid">${verifiedCardsHtml}</div>` : ''}
    </main>

    <aside class="sidebar">
      <div class="side-card dark">
        <h4>The MeetLifeAgents standard</h4>
        <p>Every agent listed on this page has cleared three independent verification steps before appearing in your search.</p>
        <ul class="side-list" style="margin-top:18px;">
          <li>Active state license verified through ${state_name} DOI</li>
          <li>Verified ${state_name} resident with local address</li>
          <li>Minimum 4 years of licensed practice</li>
          <li>Carrier appointment diversity confirmed</li>
          <li>No upheld consumer complaints on record</li>
        </ul>
      </div>
      <div class="promise-card">
        <h4>Our promise to you.</h4>
        <p>We never sell or share your contact information. Your phone number stays yours — we don't add you to any marketing list or pass your details to anyone other than the agent you choose to contact.</p>
      </div>
      <div class="side-card">
        <h4>Are you an agent in ${state_name}?</h4>
        <p style="margin-bottom:16px;">Apply to be listed on MeetLifeAgents. Free profile for all ${state_name}-licensed life insurance producers.</p>
        <a href="/agents/apply/" style="font-size:13px;font-weight:600;color:var(--ink);text-decoration:underline;text-underline-offset:3px;">Apply to join →</a>
      </div>
    </aside>
  </div>
</div>

${market.population ? `
<section class="local">
  <div class="container">
    <div class="local-grid">
      <div>
        <h2 class="display">Life insurance in ${city_name}, ${state_name}</h2>
        <p class="local-intro">Local context for residents shopping coverage — from market data to state-specific protections.</p>
      </div>
      <div class="local-stats">
        ${market.population     ? `<div class="local-stat"><div class="local-stat-label">Population</div><div class="local-stat-value">${market.population}</div><div class="local-stat-source">U.S. Census Bureau, 2024 estimate</div></div>` : ''}
        ${market.median_income  ? `<div class="local-stat"><div class="local-stat-label">Median household income</div><div class="local-stat-value">${market.median_income}</div><div class="local-stat-source">U.S. Census ACS 5-year</div></div>` : ''}
        ${market.median_home_value ? `<div class="local-stat"><div class="local-stat-label">Median home value</div><div class="local-stat-value">${market.median_home_value}</div><div class="local-stat-source">Mortgage protection benchmark</div></div>` : ''}
        ${market.guaranty_amount ? `<div class="local-stat"><div class="local-stat-label">${state_abbr} guaranty coverage</div><div class="local-stat-value">${market.guaranty_amount}</div><div class="local-stat-source">Per insolvent insurer, ${market.guaranty_org || state_abbr + 'IGA'}</div></div>` : ''}
      </div>
      ${localProseHtml ? `<div class="local-prose">${localProseHtml}</div>` : ''}
    </div>
  </div>
</section>` : ''}

${nearbyHtml ? `
<section class="nearby">
  <div class="container">
    <h2 class="display">Nearby cities in ${state_name}</h2>
    <div class="nearby-grid">${nearbyHtml}</div>
  </div>
</section>` : ''}

${market.community_text ? `
<section class="community-banner" aria-label="Community involvement">
  <div class="container">
    <div class="community-grid">
      <div class="community-icon">★</div>
      <div class="community-text">
        <h4 class="display">Giving back to <em>${city_name}</em>.</h4>
        <p>${market.community_text}</p>
      </div>
    </div>
  </div>
</section>` : ''}

${footer({ stateSlug: state_slug, stateName: state_name })}

${configScript}
<script src="/js/city.js" defer></script>
</body>
</html>`
}

module.exports = { cityPage }
