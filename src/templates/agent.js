'use strict'
const { head, header, footer } = require('./layout')

/**
 * Agent profile page.
 * @param {object} agent    — agent record from data/agents.json
 * @param {object} market   — city market record from data/markets.json
 * @param {string} doiUrl   — state DOI URL
 * @param {object} config   — site config
 */
function agentProfilePage(agent, market, doiUrl, config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const fullName = `${agent.first_name} ${agent.last_name}`
  const initials  = (agent.first_name[0] + agent.last_name[0]).toUpperCase()
  const stateSlug = market.state_slug
  const citySlug  = market.city_slug
  const canonical = `${siteUrl}/${stateSlug}/${citySlug}/${agent.slug}/`

  const tierLabel = agent.tier === 'elite'   ? 'Vetted · Top Tier' :
                    agent.tier === 'premier'  ? 'Premier Agent' :
                    'Verified Agent'
  const tierClass = agent.tier === 'elite'   ? 'tier-elite' :
                    agent.tier === 'premier'  ? 'tier-premier' :
                    'tier-verified'

  const title       = `${fullName} — Life Insurance Agent in ${market.city_name}, ${market.state_abbr} | MeetLifeAgents`
  const description = `${fullName} is a verified, locally-resident life insurance agent in ${market.city_name}, ${market.state_name}. ${agent.years_licensed} years licensed · ${agent.carrier_count} carrier appointments.`

  const tags = (agent.specialties || []).map(t => `<span class="tag">${t}</span>`).join('')
  const doiVerifyUrl = `${doiUrl}?npn=${agent.npn}`

  const platformNumber = config.platformNumber || ''
  const platformDisplay = config.platformDisplay || platformNumber
  const apiUrl = config.apiUrl || ''

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',                  item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: market.state_name,       item: `${siteUrl}/${stateSlug}/` },
          { '@type': 'ListItem', position: 3, name: market.city_name,        item: `${siteUrl}/${stateSlug}/${citySlug}/` },
          { '@type': 'ListItem', position: 4, name: fullName,                item: canonical }
        ]
      },
      {
        '@type': 'Person',
        name: fullName,
        jobTitle: 'Independent Life Insurance Agent',
        worksFor: { '@type': 'Organization', name: 'MeetLifeAgents Network' },
        areaServed: { '@type': 'City', name: market.city_name },
        hasCredential: agent.npn ? {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'Insurance License',
          name: `${market.state_abbr} Life & Health License`,
          recognizedBy: { '@type': 'GovernmentOrganization', name: `${market.state_name} Department of Insurance` }
        } : undefined
      }
    ]
  })

  return `${head({ title, description, canonical, extraHead: `<script type="application/ld+json">${jsonLd}</script>` })}
<body data-agent="${agent.slug}" data-city="${citySlug}" data-state="${stateSlug}">
${header()}

<div class="container" style="padding-top:40px;">
  <nav class="breadcrumb">
    <a href="/">Home</a>
    <span>›</span>
    <a href="/${stateSlug}/">${market.state_name}</a>
    <span>›</span>
    <a href="/${stateSlug}/${citySlug}/">${market.city_name}</a>
    <span>›</span>
    <span>${fullName}</span>
  </nav>
</div>

<!-- AGENT HERO -->
<section class="agent-hero">
  <div class="container">
    <div class="agent-hero-inner">
      <!-- Photo + identity -->
      <div class="agent-profile-photo-wrap">
        ${agent.photo_url
          ? `<img src="${agent.photo_url}" alt="${fullName}" class="agent-profile-photo" width="160" height="160" loading="eager">`
          : `<div class="agent-profile-initials">${initials}</div>`
        }
        <div class="agent-tier-badge ${tierClass}">${tierLabel}</div>
      </div>

      <!-- Core info -->
      <div class="agent-hero-info">
        <h1 class="display" style="font-size:clamp(28px,3.5vw,44px);margin-bottom:8px;">${fullName}</h1>
        <div class="agent-hero-location">📍 ${agent.office_city}, ${agent.office_state} · Serving ${market.city_name} area</div>

        <div class="agent-hero-stats">
          <div class="ahs-item">
            <span class="ahs-val">${agent.years_licensed}</span>
            <span class="ahs-label">years licensed</span>
          </div>
          <div class="ahs-item">
            <span class="ahs-val">${agent.carrier_count}</span>
            <span class="ahs-label">carrier appointments</span>
          </div>
          <div class="ahs-item">
            <span class="ahs-val">${agent.response_time || '24 hrs'}</span>
            <span class="ahs-label">avg. response</span>
          </div>
        </div>

        ${tags ? `<div class="agent-tags" style="margin-top:16px;">${tags}</div>` : ''}

        <!-- Call action -->
        <div class="agent-profile-cta">
          <button class="call-btn call-btn-lg" data-ext="${agent.extension}" data-agent="${fullName}" onclick="revealCall(this)">
            Call ${agent.first_name}
          </button>
          <a href="/${stateSlug}/${citySlug}/" class="agent-back-link">← All ${market.city_name} agents</a>
        </div>

        <div id="call-reveal-${agent.extension}" class="call-reveal" style="display:none;">
          <div class="call-reveal-inner">
            <div class="call-reveal-number">${platformDisplay}</div>
            <div class="call-reveal-ext">Extension: <strong>${agent.extension}</strong></div>
            <a class="call-reveal-dial" href="tel:${platformNumber.replace(/\D/g,'')},,${agent.extension}">
              Tap to dial with extension →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- MAIN CONTENT -->
<div class="agent-profile-body">
  <div class="container">
    <div class="agent-profile-grid">

      <!-- Left: Bio + details -->
      <div class="agent-profile-main">

        ${agent.bio ? `
        <section class="agent-profile-section">
          <h2 class="agent-section-title">About ${agent.first_name}</h2>
          <p class="agent-bio-full">${agent.bio}</p>
        </section>` : ''}

        ${agent.specialties && agent.specialties.length ? `
        <section class="agent-profile-section">
          <h2 class="agent-section-title">Specialties</h2>
          <div class="agent-specialties-list">
            ${agent.specialties.map(s => `
            <div class="agent-specialty-item">
              <span class="specialty-check">✓</span>
              <span>${s}</span>
            </div>`).join('')}
          </div>
        </section>` : ''}

        <section class="agent-profile-section">
          <h2 class="agent-section-title">License verification</h2>
          <div class="license-block">
            <div class="license-row">
              <span class="license-label">NPN (National Producer Number)</span>
              <span class="license-val">${agent.npn}</span>
            </div>
            <div class="license-row">
              <span class="license-label">Licensed state</span>
              <span class="license-val">${market.state_name} (${market.state_abbr})</span>
            </div>
            <div class="license-row">
              <span class="license-label">Years licensed</span>
              <span class="license-val">${agent.years_licensed}</span>
            </div>
            <div class="license-row">
              <span class="license-label">Carrier appointments</span>
              <span class="license-val">${agent.carrier_count}</span>
            </div>
          </div>
          <a href="${doiVerifyUrl}" class="doi-verify-link" target="_blank" rel="noopener noreferrer">
            Verify NPN ${agent.npn} on the ${market.state_name} DOI ↗
          </a>
        </section>

        <section class="agent-profile-section">
          <h2 class="agent-section-title">Service area</h2>
          <p style="color:var(--ink-soft);">
            ${agent.first_name} is based in ${agent.office_city}, ${agent.office_state} and serves the
            ${market.city_name} area. As an independent agent, ${agent.first_name} can work with
            clients throughout ${market.state_name}.
          </p>
        </section>

      </div>

      <!-- Right: Sidebar -->
      <aside class="agent-profile-sidebar">

        <!-- Vetting card -->
        <div class="sidebar-card">
          <div class="sidebar-card-title">How we vetted ${agent.first_name}</div>
          <ul class="vetting-checklist">
            <li class="vc-pass">Active ${market.state_abbr} life insurance license</li>
            <li class="vc-pass">Resident of ${market.state_name}</li>
            <li class="vc-pass">${agent.carrier_count}+ independent carrier appointments</li>
            <li class="vc-pass">Clean DOI complaint record</li>
            ${agent.tier !== 'verified' ? `<li class="vc-pass">${agent.years_licensed}+ years licensed</li>` : ''}
            ${agent.tier === 'elite' ? `<li class="vc-pass">Advanced industry designation</li>` : ''}
          </ul>
        </div>

        <!-- Connect card -->
        <div class="sidebar-card sidebar-card-cta">
          <div class="sidebar-card-title">Ready to connect?</div>
          <p style="font-size:14px;color:var(--ink-soft);margin-bottom:16px;">
            Call ${agent.first_name} directly — no middlemen, no sales pressure.
          </p>
          <button class="call-btn" style="width:100%;" data-ext="${agent.extension}" data-agent="${fullName}" onclick="revealCall(this)">
            Call ${agent.first_name}
          </button>
          <div style="font-size:12px;color:var(--ink-soft);margin-top:12px;text-align:center;">
            Or <a href="/${stateSlug}/${citySlug}/#intake" style="color:var(--gold);">request a callback</a> from ${market.city_name} agents
          </div>
        </div>

        <!-- Back to city -->
        <div class="sidebar-card" style="text-align:center;">
          <a href="/${stateSlug}/${citySlug}/" style="color:var(--gold);font-size:14px;font-weight:600;">
            ← View all ${market.city_name} agents
          </a>
        </div>

      </aside>
    </div>
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
