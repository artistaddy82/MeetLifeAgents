'use strict'
const { head, header, footer } = require('./layout')

function agentProfilePage(agent, market, doiUrl, config) {
  const siteUrl        = config.siteUrl || 'https://meetlifeagents.com'
  const platformNumber = config.platformNumber || ''
  const platformDisplay= config.platformDisplay || platformNumber
  const apiUrl         = config.apiUrl || ''
  const stateSlug      = market.state_slug
  const citySlug       = market.city_slug
  const fullName       = `${agent.first_name} ${agent.last_name}`
  const initials       = (agent.first_name[0] + agent.last_name[0]).toUpperCase()
  const canonical      = `${siteUrl}/${stateSlug}/${citySlug}/${agent.slug}/`
  const doiVerify      = `${doiUrl}?npn=${agent.npn}`

  const tierBadge = agent.tier === 'elite'   ? '<span class="ap-tier ap-tier--elite">VETTED · TOP TIER</span>'
                  : agent.tier === 'premier'  ? '<span class="ap-tier ap-tier--premier">Premier Agent</span>'
                  :                             '<span class="ap-tier ap-tier--verified">Verified Agent</span>'

  const tags = (agent.specialties || []).map(t => `<span class="tag">${t}</span>`).join('')

  const title       = `${fullName} — Life Insurance Agent in ${market.city_name}, ${market.state_abbr} | MeetLifeAgents`
  const description = `${fullName} is a verified, locally-resident life insurance agent in ${market.city_name}, ${market.state_name}. ${agent.years_licensed} years licensed · ${agent.carrier_count} carrier appointments.`

  const vettingItems = [
    `Active ${market.state_abbr} life insurance license`,
    `Resident of ${market.state_name}`,
    `${agent.carrier_count}+ independent carrier appointments`,
    'Clean DOI complaint record',
    ...(agent.tier !== 'verified' ? [`${agent.years_licensed}+ years licensed`] : []),
    ...(agent.tier === 'elite' ? ['Advanced industry designation (CLU/ChFC/CFP)'] : []),
  ]

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',            item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: market.state_name, item: `${siteUrl}/${stateSlug}/` },
        { '@type': 'ListItem', position: 3, name: market.city_name,  item: `${siteUrl}/${stateSlug}/${citySlug}/` },
        { '@type': 'ListItem', position: 4, name: fullName,          item: canonical }
      ]},
      { '@type': 'Person', name: fullName,
        jobTitle: 'Independent Life Insurance Agent',
        worksFor: { '@type': 'Organization', name: 'MeetLifeAgents Network' },
        areaServed: { '@type': 'City', name: market.city_name } }
    ]
  })

  return `${head({ title, description, canonical, extraHead: `<script type="application/ld+json">${jsonLd}</script>` })}
<body data-agent="${agent.slug}" data-city="${citySlug}" data-state="${stateSlug}">
${header()}

<!-- ── AGENT HERO ─────────────────────────────────── -->
<section class="ap-hero">
  <div class="container">
    <nav class="breadcrumb" style="padding-top:20px;">
      <a href="/">Home</a><span>›</span>
      <a href="/${stateSlug}/">${market.state_name}</a><span>›</span>
      <a href="/${stateSlug}/${citySlug}/">${market.city_name}</a><span>›</span>
      <span>${fullName}</span>
    </nav>

    <div class="ap-hero-grid">
      <div class="ap-photo-col">
        ${agent.photo_url
          ? `<img src="${agent.photo_url}" alt="${fullName}" class="ap-photo" width="180" height="180" loading="eager">`
          : `<div class="ap-initials">${initials}</div>`}
        ${tierBadge}
      </div>
      <div class="ap-hero-info">
        <p class="city-eyebrow">${market.city_name}, ${market.state_abbr}</p>
        <h1 class="display" style="font-size:clamp(32px,4.5vw,52px);line-height:1.05;margin-bottom:12px;">${fullName}</h1>
        <p class="ap-location">📍 Based in ${agent.office_city}, ${agent.office_state} · Serving the ${market.city_name} area</p>

        <div class="ap-stats-row">
          <div class="city-stat">
            <span class="city-stat-num">${agent.years_licensed}</span>
            <span class="city-stat-label">Years licensed</span>
          </div>
          <div class="city-stat">
            <span class="city-stat-num">${agent.carrier_count}</span>
            <span class="city-stat-label">Carrier appts</span>
          </div>
          <div class="city-stat">
            <span class="city-stat-num">${agent.response_time || '24 hrs'}</span>
            <span class="city-stat-label">Avg. response</span>
          </div>
        </div>

        ${tags ? `<div class="agent-tags" style="margin-top:20px;">${tags}</div>` : ''}
      </div>
    </div>
  </div>
</section>

<!-- ── CALL CTA STRIP (dark) ─────────────────────── -->
<div class="intake" style="padding:28px 0;">
  <div class="container">
    <div class="ap-cta-strip">
      <div>
        <p style="font-size:18px;font-family:'Fraunces',serif;font-weight:500;color:white;margin-bottom:4px;">Ready to connect with ${agent.first_name}?</p>
        <p style="font-size:14px;color:rgba(250,246,238,0.75);">Direct call — no middlemen, no sales pressure.</p>
      </div>
      <div class="ap-cta-actions">
        <button class="intake-call-btn" data-ext="${agent.extension}" data-agent="${fullName}" onclick="revealCall(this)">
          📞 Call ${agent.first_name}
        </button>
        <a href="/${stateSlug}/${citySlug}/#intake" class="intake-form-link">Request a callback →</a>
      </div>
    </div>
  </div>
</div>
<div id="call-reveal-${agent.extension}" class="call-reveal" style="display:none;background:var(--green);padding:20px 0;">
  <div class="container" style="text-align:center;">
    <p style="color:white;font-size:13px;margin-bottom:8px;letter-spacing:0.06em;text-transform:uppercase;font-weight:600;">Call routing number + extension</p>
    <p style="color:white;font-family:'Fraunces',serif;font-size:32px;font-weight:500;margin-bottom:4px;">${platformDisplay}</p>
    <p style="color:rgba(255,255,255,0.85);font-size:15px;margin-bottom:16px;">Extension: <strong>${agent.extension}</strong></p>
    <a class="intake-call-btn" style="display:inline-flex;" href="tel:${platformNumber.replace(/\D/g,'')},,${agent.extension}">Tap to dial with extension →</a>
  </div>
</div>

<!-- ── MAIN BODY ──────────────────────────────────── -->
<div class="container ap-body">
  <div class="ap-main-grid">

    <!-- LEFT: bio + details -->
    <div class="ap-main">

      ${agent.bio ? `
      <div class="ap-section">
        <div class="sec-head">
          <h2 class="display" style="font-size:24px;">About ${agent.first_name}</h2>
        </div>
        <p style="font-size:16px;line-height:1.7;color:var(--ink-soft);">${agent.bio}</p>
      </div>` : ''}

      ${agent.specialties && agent.specialties.length ? `
      <div class="ap-section">
        <div class="sec-head">
          <h2 class="display" style="font-size:24px;">Specialties</h2>
        </div>
        <div class="ap-spec-grid">
          ${agent.specialties.map(s => `<div class="ap-spec-item"><span class="ap-spec-check">✓</span>${s}</div>`).join('')}
        </div>
      </div>` : ''}

      <div class="ap-section">
        <div class="sec-head">
          <h2 class="display" style="font-size:24px;">License verification</h2>
        </div>
        <div class="local-stats" style="grid-template-columns:repeat(2,1fr);">
          <div class="local-stat">
            <div class="local-stat-label">NPN</div>
            <div class="local-stat-value" style="font-size:22px;">${agent.npn}</div>
            <div class="local-stat-source">National Producer Number</div>
          </div>
          <div class="local-stat">
            <div class="local-stat-label">Licensed state</div>
            <div class="local-stat-value" style="font-size:22px;">${market.state_abbr}</div>
            <div class="local-stat-source">${market.state_name}</div>
          </div>
          <div class="local-stat">
            <div class="local-stat-label">Years licensed</div>
            <div class="local-stat-value" style="font-size:22px;">${agent.years_licensed}</div>
            <div class="local-stat-source">Active producer</div>
          </div>
          <div class="local-stat">
            <div class="local-stat-label">Carrier appointments</div>
            <div class="local-stat-value" style="font-size:22px;">${agent.carrier_count}</div>
            <div class="local-stat-source">Independent carrier access</div>
          </div>
        </div>
        <div style="margin-top:20px;">
          <a href="${doiVerify}" class="agent-verify-link" target="_blank" rel="noopener noreferrer" style="font-size:14px;">
            Verify NPN ${agent.npn} on the ${market.state_name} DOI ↗
          </a>
        </div>
      </div>

      <div class="ap-section">
        <div class="sec-head">
          <h2 class="display" style="font-size:24px;">Service area</h2>
        </div>
        <p style="font-size:15px;color:var(--ink-soft);line-height:1.65;">
          ${agent.first_name} is based in ${agent.office_city}, ${agent.office_state} and serves the ${market.city_name} metropolitan area. As a fully independent agent, ${agent.first_name} works with clients across ${market.state_name} — wherever the coverage need is.
        </p>
        <div style="margin-top:20px;">
          <a href="/${stateSlug}/${citySlug}/" style="color:var(--gold);font-size:14px;font-weight:600;text-decoration:none;">
            ← View all ${market.city_name} verified agents
          </a>
        </div>
      </div>

    </div>

    <!-- RIGHT: sidebar -->
    <aside class="sidebar">
      <div class="side-card dark">
        <h4>How we vetted ${agent.first_name}</h4>
        <ul class="side-list">
          ${vettingItems.map(v => `<li>${v}</li>`).join('')}
        </ul>
      </div>
      <div class="side-card">
        <h4>Connect with ${agent.first_name}</h4>
        <p style="margin-bottom:16px;">Call directly — no middlemen, no sales pressure.</p>
        <button class="call-btn" style="width:100%;margin-bottom:12px;" data-ext="${agent.extension}" data-agent="${fullName}" onclick="revealCall(this)">
          Call ${agent.first_name}
        </button>
        <a href="/${stateSlug}/${citySlug}/#intake" style="display:block;text-align:center;color:var(--ink-soft);font-size:13px;text-decoration:none;padding:10px;border:1px solid var(--rule);border-radius:6px;">
          Request a callback
        </a>
      </div>
      <div class="promise-card">
        <h4>Our promise</h4>
        <p>Your contact info goes to ${agent.first_name} — not to a pool of 50 buyers. One agent, direct connection.</p>
      </div>
    </aside>

  </div>
</div>

<script>
window.MLA_CONFIG = {
  platformNumber: "${platformNumber}",
  platformDisplay: "${platformDisplay}",
  apiUrl: "${apiUrl}"
};
</script>
<script src="/js/city.js"></script>
${footer({ stateSlug, stateName: market.state_name })}
</body>
</html>`
}

module.exports = { agentProfilePage }
