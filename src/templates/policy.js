'use strict'
const { head, header, footer, GLOBAL_SCRIPTS } = require('./layout')

// ── Per-policy content ───────────────────────────────────────────────────────

const POLICIES = {

  'term-insurance': {
    name:      'Term Life Insurance',
    shortName: 'Term Life',
    specialty: 'Term Life',
    tagline:   'Pure death benefit for 10–30 years — the most affordable way to protect your family during peak earning years.',
    definition: 'Term life pays a lump-sum death benefit to your family if you die within the policy period. No cash value, no investment component — just straightforward protection at the lowest available cost. Most policies are level-premium: the rate you lock in on day one is the rate you pay until the term ends.',
    features: [
      'Amounts from $100K to $5M+',
      'Terms of 10, 15, 20, 25, or 30 years',
      'Premiums locked at issue — never increase',
      'Death benefit paid tax-free to beneficiary',
      'Convertible to permanent in most cases',
    ],
    who: [
      {
        icon: '👨‍👩‍👧',
        label: 'Young families',
        desc:  'Replace 10–15× your annual income so a surviving spouse can maintain the household, pay the mortgage, and fund education without financial crisis.',
      },
      {
        icon: '🏠',
        label: 'Mortgage holders',
        desc:  'Match the term to your loan payoff date. If you die before the mortgage is paid, your family keeps the home — free and clear.',
      },
      {
        icon: '💼',
        label: 'Income earners with dependents',
        desc:  'Anyone whose paycheck supports others — a spouse, children, or aging parents — needs coverage while that dependency is active.',
      },
    ],
    steps: [
      {
        num:   '1',
        title: 'Choose a term length',
        body:  'Pick the period during which your dependents would be most financially exposed — typically when kids are young or a mortgage is outstanding. Most families choose 20 or 30 years.',
      },
      {
        num:   '2',
        title: 'Set the death benefit',
        body:  'Most independent agents recommend 10–12× your annual income. Your agent will size it to your mortgage balance, income-replacement needs, and monthly budget.',
      },
      {
        num:   '3',
        title: 'Lock your rate and apply',
        body:  'Premiums are fixed at issue. Healthy applicants are often approved within days. Fully underwritten policies — which offer the best rates — take 2–4 weeks.',
      },
    ],
    compareLinks: [
      { href: '/compare/term-vs-whole-life/',         label: 'Term vs. Whole Life' },
      { href: '/compare/term-vs-iul/',                label: 'Term vs. IUL' },
      { href: '/compare/term-vs-final-expense/',      label: 'Term vs. Final Expense' },
      { href: '/compare/mortgage-protection-vs-term/', label: 'Mortgage Protection vs. Term' },
    ],
    otherPolicies: ['whole-life', 'final-expense', 'mortgage-protection', 'indexed-universal-life'],
  },

  'final-expense': {
    name:      'Final Expense Insurance',
    shortName: 'Final Expense',
    specialty: 'Final Expense',
    tagline:   'Simplified-issue whole life for seniors — no exam, fixed premiums, and coverage that never expires.',
    definition: 'Final expense insurance is a small whole life policy — typically $5,000 to $25,000 — designed to cover funeral costs, outstanding medical bills, credit card balances, and other end-of-life expenses. Premiums are fixed for life, the benefit never decreases, and the policy never expires as long as premiums are paid.',
    features: [
      'Coverage from $5,000 to $25,000',
      'No medical exam — health questions only',
      'Guaranteed-issue options for serious health conditions',
      'Premiums fixed for life — never increase',
      'Whole life — never expires',
    ],
    who: [
      {
        icon: '👴',
        label: 'Seniors on fixed income',
        desc:  'Social Security and pension income is predictable. Final expense premiums fit a fixed monthly budget without risking lapse from rising costs.',
      },
      {
        icon: '🏥',
        label: 'Those previously declined',
        desc:  'Simplified-issue underwriting is far more lenient than traditional policies. Guaranteed-issue options exist for those with serious health conditions who need coverage.',
      },
      {
        icon: '❤️',
        label: 'Families avoiding a financial burden',
        desc:  'The average funeral costs $9,000–$12,000. A final expense policy ensures that cost doesn\'t fall on adult children or a surviving spouse.',
      },
    ],
    steps: [
      {
        num:   '1',
        title: 'Answer a few health questions',
        body:  'No blood draw, no physical exam. You\'ll answer basic health questions during the application. Guaranteed-issue options skip the health questions entirely — acceptance is guaranteed.',
      },
      {
        num:   '2',
        title: 'Choose your coverage amount',
        body:  'Most clients choose $10,000–$15,000 to cover funeral and burial costs. Your agent can help size the benefit to your specific wishes and what you want to leave behind.',
      },
      {
        num:   '3',
        title: 'Lock your premium for life',
        body:  'Once issued, your premium never increases and coverage never decreases — even if your health changes significantly. The policy remains in force as long as you pay premiums.',
      },
    ],
    compareLinks: [
      { href: '/compare/term-vs-final-expense/', label: 'Term vs. Final Expense' },
      { href: '/compare/term-vs-whole-life/',    label: 'Term vs. Whole Life' },
    ],
    otherPolicies: ['term-insurance', 'whole-life', 'mortgage-protection', 'indexed-universal-life'],
  },

  'mortgage-protection': {
    name:      'Mortgage Protection Insurance',
    shortName: 'Mortgage Protection',
    specialty: 'Mortgage Protection',
    tagline:   'Coverage sized to your loan balance — so your family can keep the home if something happens to you.',
    definition: 'Mortgage protection is a term life policy matched to your loan balance and payoff timeline. Unlike PMI, the death benefit goes directly to your family — not the lender — giving them the flexibility to pay off the mortgage, cover ongoing expenses, or use funds however they need.',
    features: [
      'Term matched to your mortgage length',
      'Payout goes to your family, not the bank',
      'Level or decreasing benefit options',
      'Often under $40/month for healthy applicants',
      'Can be layered on top of existing coverage',
    ],
    who: [
      {
        icon: '🏡',
        label: 'New homeowners',
        desc:  'The first years of a mortgage carry the highest balance. Mortgage protection ensures your home doesn\'t become a financial liability for your family when you\'re gone.',
      },
      {
        icon: '💑',
        label: 'Single-income households',
        desc:  'When one spouse\'s income covers the mortgage, the other\'s ability to stay in the home depends entirely on that income continuing. One policy closes that gap.',
      },
      {
        icon: '🔄',
        label: 'Refinancers and move-up buyers',
        desc:  'Taking on a new or larger mortgage is the moment to review coverage. Your old policy may no longer match your current balance or payoff timeline.',
      },
    ],
    steps: [
      {
        num:   '1',
        title: 'Match the term to your loan',
        body:  'A 30-year mortgage calls for a 30-year term; a 15-year loan, a 15-year term. Your agent will explain the tradeoff between level benefit (simpler) and decreasing benefit (lower cost).',
      },
      {
        num:   '2',
        title: 'Size the death benefit',
        body:  'Most clients match the benefit to their current mortgage balance. Some add 10–20% to cover taxes, insurance, and maintenance for the first year after income is lost.',
      },
      {
        num:   '3',
        title: 'Layer with existing coverage',
        body:  'Mortgage protection often supplements — rather than replaces — an income-replacement term policy. Your agent will review what you have to eliminate gaps without overpaying.',
      },
    ],
    compareLinks: [
      { href: '/compare/mortgage-protection-vs-term/', label: 'Mortgage Protection vs. Term' },
      { href: '/compare/term-vs-whole-life/',          label: 'Term vs. Whole Life' },
    ],
    otherPolicies: ['term-insurance', 'whole-life', 'final-expense', 'indexed-universal-life'],
  },

  'indexed-universal-life': {
    name:      'Indexed Universal Life Insurance',
    shortName: 'IUL',
    specialty: 'IUL',
    tagline:   'Permanent life insurance with cash value growth linked to a market index — upside potential with downside protection.',
    definition: 'An IUL policy provides a permanent death benefit while building cash value credited based on a stock index (typically the S&P 500). A floor — usually 0% — prevents losses in down markets. A cap (typically 8–12%) limits gains. Cash value grows tax-deferred and can be accessed via policy loans that are not treated as taxable income.',
    features: [
      '0% floor — cash value never goes negative from index performance',
      'Index-linked credits (cap typically 8–12%)',
      'Tax-deferred cash value growth',
      'Tax-free policy loans',
      'Flexible premiums and adjustable death benefit',
    ],
    who: [
      {
        icon: '🏢',
        label: 'Business owners',
        desc:  'IUL is widely used for key-person coverage, buy-sell agreement funding, and executive bonus plans. The policy loan provision makes it a flexible business planning tool.',
      },
      {
        icon: '📈',
        label: 'High-income earners',
        desc:  'Once you\'ve maxed your 401(k) and IRA, an IUL offers another tax-advantaged bucket for retirement accumulation — with no IRS contribution limits.',
      },
      {
        icon: '🏛️',
        label: 'Estate planners',
        desc:  'The death benefit passes estate-tax-free to named beneficiaries. An IUL can efficiently transfer wealth to heirs or fund an irrevocable life insurance trust (ILIT).',
      },
    ],
    steps: [
      {
        num:   '1',
        title: 'Design the policy structure',
        body:  'IUL is highly customizable. Your agent sets the death benefit, premium level, and index strategy based on whether your primary goal is cash accumulation, death benefit, or both.',
      },
      {
        num:   '2',
        title: 'Select your index allocation',
        body:  'Most IULs offer multiple index options — S&P 500, Nasdaq, Bloomberg, or a fixed-interest bucket. Your agent will explain each crediting strategy and how the cap and floor apply.',
      },
      {
        num:   '3',
        title: 'Build and access cash value',
        body:  'Cash value compounds tax-deferred. Policy loans — which are not taxable income — can fund retirement needs or major expenses. Loans must be managed carefully to avoid policy lapse.',
      },
    ],
    compareLinks: [
      { href: '/compare/term-vs-iul/',       label: 'Term vs. IUL' },
      { href: '/compare/whole-life-vs-iul/', label: 'Whole Life vs. IUL' },
    ],
    otherPolicies: ['term-insurance', 'whole-life', 'final-expense', 'mortgage-protection'],
  },

}

const POLICY_DISPLAY_NAMES = {
  'term-insurance':         'Term Life',
  'whole-life':             'Whole Life',
  'final-expense':          'Final Expense',
  'mortgage-protection':    'Mortgage Protection',
  'indexed-universal-life': 'Indexed Universal Life',
}

// ── Template ────────────────────────────────────────────────────────────────

function policyPage(stateData, cities, policySlug, config) {
  const pol = POLICIES[policySlug]
  if (!pol) throw new Error(`Unknown policy slug: ${policySlug}`)

  const { slug, name, abbr, guaranty_amount, guaranty_org, guaranty_url } = stateData
  const siteUrl   = config.siteUrl || 'https://meetlifeagents.com'
  const title       = `${pol.name} in ${name} — Local Independent Agents | MeetLifeAgents`
  const description = `Find verified ${pol.shortName} specialists in ${name}. ${pol.tagline} Browse by city and connect directly.`
  const canonical   = `${siteUrl}/${slug}/${policySlug}/`

  const sorted = [...cities].sort((a, b) => {
    const pa = parseInt((a.population || '').replace(/,/g, '')) || 0
    const pb = parseInt((b.population || '').replace(/,/g, '')) || 0
    return pb - pa || a.city_name.localeCompare(b.city_name)
  })

  const cityCards = sorted.map(m => `<a class="sc-card" href="/${slug}/${m.city_slug}/">
  <span class="sc-name">${m.city_name}</span>
  ${m.population ? `<span class="sc-pop">Pop. ${m.population}</span>` : ''}
  <span class="sc-agents">${pol.shortName} agents →</span>
</a>`).join('\n')

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',  item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name,          item: `${siteUrl}/${slug}/` },
        { '@type': 'ListItem', position: 3, name: pol.name, item: canonical },
      ]},
      { '@type': 'WebPage', name: title, description, url: canonical },
    ]
  })

  return `${head({ title, description, canonical, extraHead: `<script type="application/ld+json">${jsonLd}</script>` })}
<body>
${header()}

<!-- ── HERO ──────────────────────────────────────────────────────────── -->
<section class="pol-hero">
  <div class="container">
    <nav class="breadcrumb pol-breadcrumb">
      <a href="/">Home</a><span>›</span>
      <a href="/${slug}/">${name}</a><span>›</span>
      <span>${pol.name}</span>
    </nav>
    <div class="pol-hero-inner">
      <p class="city-eyebrow" style="color:var(--gold-soft);margin-bottom:14px;">${pol.name} · ${name}</p>
      <h1 class="display pol-hero-title">${pol.name} agents<br>in <em>${name}.</em></h1>
      <p class="pol-hero-sub">${pol.tagline}</p>
      <div class="pol-chips">
        ${pol.features.map(f => `<span class="pol-chip">${f}</span>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── TRUST STRIP ───────────────────────────────────────────────────── -->
<div class="trust-strip">
  <div class="trust-strip-inner">
    <span class="trust-strip-item">License verified through ${name} DOI</span>
    <span class="trust-strip-item">Independent — not captive agents</span>
    <span class="trust-strip-item">${pol.shortName} specialists listed</span>
    <span class="trust-strip-item">No lead selling · direct contact only</span>
  </div>
</div>

<!-- ── WHAT IS IT ────────────────────────────────────────────────────── -->
<section class="pol-what-sec">
  <div class="container">
    <div class="pol-what-grid">
      <div>
        <p class="city-eyebrow" style="margin-bottom:12px;">The basics</p>
        <h2 class="display" style="font-size:clamp(28px,3.5vw,44px);margin-bottom:20px;">What is ${pol.name}?</h2>
        <p style="font-size:17px;line-height:1.72;color:var(--ink-soft);max-width:560px;">${pol.definition}</p>
        <a href="/how-it-works/" style="display:inline-block;margin-top:28px;color:var(--gold);font-size:14px;font-weight:600;text-decoration:none;">How MeetLifeAgents works →</a>
      </div>
      <div class="pol-aside-card">
        <p class="pol-aside-label">Key facts</p>
        <ul class="pol-aside-list">
          ${pol.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div class="pol-aside-note">
          Actual terms vary by carrier and underwriting. An independent agent in ${name} can shop multiple carriers to find the best fit for your situation.
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── WHO IS IT FOR ─────────────────────────────────────────────────── -->
<section class="pol-who-sec">
  <div class="container">
    <div class="sec-head">
      <h2 class="display" style="font-size:clamp(24px,3vw,36px);">Who is ${pol.shortName} right for?</h2>
    </div>
    <div class="pol-who-grid">
      ${pol.who.map(w => `<div class="pol-who-card">
        <div class="pol-who-icon">${w.icon}</div>
        <div class="pol-who-label">${w.label}</div>
        <p class="pol-who-desc">${w.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ── HOW IT WORKS ──────────────────────────────────────────────────── -->
<section class="pol-how-sec">
  <div class="container">
    <div class="pol-how-grid">
      <div>
        <p class="city-eyebrow" style="margin-bottom:12px;">Process</p>
        <h2 class="display" style="font-size:clamp(26px,3vw,40px);margin-bottom:8px;">How ${pol.shortName} works</h2>
        <p style="font-size:15px;color:var(--ink-soft);max-width:360px;line-height:1.6;">A local ${name} agent walks you through each of these steps — shopping carriers on your behalf.</p>
      </div>
      <div class="pol-steps">
        ${pol.steps.map(s => `<div class="step">
          <div class="step-num">${s.num}</div>
          <div>
            <h4>${s.title}</h4>
            <p>${s.body}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── FIND AN AGENT (dark) ──────────────────────────────────────────── -->
<section class="pol-cta-sec">
  <div class="container">
    <div class="pol-cta-grid">
      <div class="pol-cta-left">
        <p class="city-eyebrow" style="color:var(--gold-soft);margin-bottom:14px;">Find a specialist</p>
        <h2 class="display" style="font-size:clamp(28px,3.5vw,46px);color:var(--cream);line-height:1.1;margin-bottom:16px;">
          Connect with a ${name} agent<br>who knows <em style="color:var(--gold-soft);font-style:italic;">${pol.shortName}.</em>
        </h2>
        <p style="color:rgba(250,246,238,0.7);font-size:16px;line-height:1.65;max-width:460px;margin-bottom:32px;">
          Browse vetted, locally-resident agents who list ${pol.shortName} as a specialty. You contact them directly — no lead forms, no callbacks from strangers.
        </p>
        <button class="btn btn-cream" data-find-cta>Find a ${pol.shortName} agent →</button>
      </div>
      <div class="pol-cta-right">
        <div class="pol-guaranty-card">
          <p class="pol-guaranty-label">Consumer protection · ${abbr}</p>
          <div class="pol-guaranty-amount">${guaranty_amount}</div>
          <p class="pol-guaranty-desc">The <strong>${guaranty_org}</strong> protects ${name} policyholders up to ${guaranty_amount} per insured if a licensed carrier becomes insolvent.</p>
          <a class="pol-guaranty-link" href="${guaranty_url}" target="_blank" rel="noopener">About ${guaranty_org} ↗</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── CITY GRID ─────────────────────────────────────────────────────── -->
<section class="state-cities-sec">
  <div class="container">
    <div class="sec-head">
      <h2 class="display" style="font-size:clamp(22px,2.5vw,32px);">Browse cities in ${name}</h2>
      <span class="sec-meta">${cities.length} cit${cities.length === 1 ? 'y' : 'ies'}</span>
    </div>
    <div class="sc-grid">
      ${cityCards}
    </div>
  </div>
</section>

<!-- ── RELATED ───────────────────────────────────────────────────────── -->
<section class="pol-related-sec">
  <div class="container">
    <div class="pol-related-inner">
      <div>
        <p class="pol-related-eyebrow">Other coverage types in ${name}</p>
        <div class="pol-related-grid">
          ${pol.otherPolicies.map(ps => `<a class="pol-related-card" href="/${slug}/${ps}/">
            <span class="pol-related-name">${POLICY_DISPLAY_NAMES[ps]}</span>
            <span class="pol-related-arrow">→</span>
          </a>`).join('')}
        </div>
      </div>
      <div>
        <p class="pol-related-eyebrow">Compare</p>
        <div class="pol-compare-links">
          ${pol.compareLinks.map(l => `<a href="${l.href}" class="pol-compare-link">${l.label} →</a>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

${GLOBAL_SCRIPTS}
${footer({ stateSlug: slug, stateName: name })}
</body>
</html>`
}

module.exports = { policyPage, POLICIES }
