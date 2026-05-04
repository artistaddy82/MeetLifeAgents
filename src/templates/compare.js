'use strict'
const { head, header, footer, GLOBAL_SCRIPTS } = require('./layout')

// ── Per-comparison content ────────────────────────────────────────────────────

const COMPARES = {

  'term-vs-whole-life': {
    left:    { name: 'Term Life',  slug: 'term-insurance',  color: 'var(--rust)' },
    right:   { name: 'Whole Life', slug: 'whole-life',      color: 'var(--gold)' },
    tagline: 'The most debated life insurance question — settled.',
    intro:   'Both policies pay a tax-free death benefit. That\'s where the similarity ends. Term is pure, cheap protection that expires. Whole life is a permanent contract that builds guaranteed cash value. One is right for most people. One is right for almost nobody by default — and oversold constantly.',
    rows: [
      { attr: 'Monthly cost (sample $500K)',  left: '$18–$45',        right: '$500–$900',       winner: 'left',  note: '' },
      { attr: 'Coverage duration',             left: '10–30 years',    right: 'Lifetime',         winner: null,    note: 'Depends on your need' },
      { attr: 'Builds cash value',             left: 'No',             right: 'Yes — guaranteed', winner: null,    note: 'Only matters if you need it' },
      { attr: 'Death benefit',                 left: 'Fixed',          right: 'Fixed (+ dividends)', winner: null, note: '' },
      { attr: 'Premiums',                      left: 'Fixed',          right: 'Fixed',            winner: null,    note: 'Both are level' },
      { attr: 'Medical exam required',         left: 'Usually',        right: 'Sometimes',        winner: 'right', note: '' },
      { attr: 'Cash out if canceled',          left: 'Nothing',        right: 'Surrender value',  winner: 'right', note: 'Penalized in early years' },
      { attr: 'Cost per dollar of coverage',   left: 'Most efficient', right: 'Least efficient',  winner: 'left',  note: '' },
      { attr: 'Estate planning tool',          left: 'No',             right: 'Yes',              winner: 'right', note: 'For high-net-worth families' },
    ],
    verdict: {
      winner: 'Term Life wins for most buyers',
      text: 'Term is 10–20× cheaper per dollar of coverage and provides the same core protection: a tax-free lump sum if you die. Whole life makes sense only in specific estate-planning scenarios — typically when you\'ve maxed every other tax-advantaged account and need a permanent death benefit for wealth transfer. For the vast majority of people with a mortgage, kids, or income to replace, term is the answer.',
      leftFor: [
        'You have dependents who need income protection now',
        'You have a mortgage or outstanding debt',
        'Your budget is limited — coverage amount matters more than permanence',
        'You want maximum coverage at the lowest possible premium',
      ],
      rightFor: [
        'You\'ve maxed your 401(k), IRA, and Roth IRA',
        'You need a permanent death benefit for estate equalization',
        'You want a conservative, guaranteed savings vehicle alongside coverage',
        'You\'re a business owner using it for key-person or buy-sell planning',
      ],
    },
    relatedLinks: [
      { href: '/compare/term-vs-iul/',               label: 'Term vs. IUL' },
      { href: '/compare/whole-life-vs-iul/',          label: 'Whole Life vs. IUL' },
      { href: '/compare/term-vs-final-expense/',      label: 'Term vs. Final Expense' },
    ],
  },

  'term-vs-iul': {
    left:    { name: 'Term Life',            slug: 'term-insurance',         color: 'var(--rust)' },
    right:   { name: 'Indexed Universal Life', slug: 'indexed-universal-life', color: 'var(--gold)' },
    tagline: 'Pure protection vs. tax-free retirement income — these aren\'t the same product.',
    intro:   'Agents often pitch IUL as "better than term because it builds cash value." That\'s the wrong framing. Term and IUL solve different problems. Term replaces income if you die young. IUL, when structured properly for someone who\'s already maxing traditional retirement accounts, provides tax-free retirement income with a life insurance wrapper. Confusing the two leads to expensive mistakes.',
    rows: [
      { attr: 'Monthly cost (sample $500K)',  left: '$18–$45',        right: '$200–$600',        winner: 'left',  note: '' },
      { attr: 'Coverage duration',             left: '10–30 years',    right: 'Permanent',        winner: null,    note: '' },
      { attr: 'Builds cash value',             left: 'No',             right: 'Yes — index-linked', winner: null,  note: '' },
      { attr: 'Downside protection',           left: 'N/A',            right: '0% floor',         winner: null,    note: 'Credited interest can\'t go negative' },
      { attr: 'Upside potential',              left: 'N/A',            right: '8–12% typical cap', winner: null,   note: 'Varies by carrier and index' },
      { attr: 'Death benefit flexibility',     left: 'Fixed',          right: 'Adjustable',       winner: 'right', note: '' },
      { attr: 'Premium flexibility',           left: 'Fixed',          right: 'Flexible (within limits)', winner: 'right', note: '' },
      { attr: 'Complexity',                    left: 'Simple',         right: 'Complex',          winner: 'left',  note: 'Illustrations can be misleading' },
      { attr: 'Tax-free retirement income',    left: 'No',             right: 'Yes (policy loans)', winner: 'right', note: 'When funded properly' },
    ],
    verdict: {
      winner: 'Term for protection. IUL only after you\'ve maxed retirement accounts.',
      text: 'If you need life insurance, buy term. Full stop. IUL is not a replacement for cheap, efficient protection — it\'s an advanced financial planning tool for people who\'ve already maxed a 401(k) and Roth IRA and need another tax-advantaged bucket. IUL sold as "investment + insurance" to someone who hasn\'t done the basics first is almost always the wrong choice.',
      leftFor: [
        'You need life insurance protection — full stop',
        'You have dependents who need income replacement',
        'You want the simplest, cheapest path to coverage',
        'You haven\'t yet maxed your 401(k) and Roth IRA',
      ],
      rightFor: [
        'You\'ve maxed every traditional retirement account',
        'You want tax-free retirement income alongside coverage',
        'You\'re a high-income earner needing another tax shelter',
        'You\'re working with an independent agent who runs realistic illustrations',
      ],
    },
    relatedLinks: [
      { href: '/compare/term-vs-whole-life/',    label: 'Term vs. Whole Life' },
      { href: '/compare/whole-life-vs-iul/',     label: 'Whole Life vs. IUL' },
      { href: '/compare/mortgage-protection-vs-term/', label: 'Mortgage Protection vs. Term' },
    ],
  },

  'whole-life-vs-iul': {
    left:    { name: 'Whole Life',             slug: 'whole-life',              color: 'var(--gold)' },
    right:   { name: 'Indexed Universal Life', slug: 'indexed-universal-life',  color: 'var(--rust)' },
    tagline: 'Guaranteed certainty vs. market-linked upside — two very different permanent policies.',
    intro:   'Both are permanent life insurance with cash value. But they are built on fundamentally different philosophies. Whole life prioritizes guarantees: guaranteed death benefit, guaranteed cash value growth, guaranteed premiums. IUL bets on market performance — within bounds — and gives you flexibility in exchange for uncertainty. Neither is universally better.',
    rows: [
      { attr: 'Monthly cost (sample $500K)',  left: '$300–$700',       right: '$200–$600',        winner: 'right', note: 'IUL is often cheaper for same face amount' },
      { attr: 'Cash value growth',            left: 'Guaranteed 2–4%', right: 'Index-linked',     winner: null,    note: 'IUL has more upside, less certainty' },
      { attr: 'Floor (minimum return)',        left: 'Guaranteed min.',  right: '0% (no negative)', winner: null,    note: '' },
      { attr: 'Dividend potential',           left: 'Yes (participating)', right: 'No',           winner: 'left',  note: 'Not guaranteed but consistent in mutual cos.' },
      { attr: 'Premium flexibility',          left: 'Fixed — must pay',  right: 'Flexible',       winner: 'right', note: 'Useful in income volatility' },
      { attr: 'Death benefit guarantee',      left: 'Fully guaranteed',  right: 'May lapse if underfunded', winner: 'left', note: '' },
      { attr: 'Illustration risk',            left: 'Low',              right: 'High',             winner: 'left',  note: 'IUL projections often aggressive' },
      { attr: 'Ideal market environment',     left: 'Any (guaranteed)',  right: 'Bull markets',    winner: null,    note: '' },
    ],
    verdict: {
      winner: 'Whole life for guarantees. IUL for growth potential — with a trusted agent.',
      text: 'Whole life is the conservative, bankable choice. You know exactly what you\'re getting. IUL can outperform in rising markets, but illustration abuse is rampant — many policies were sold on 8–10% assumed returns that never materialized, causing policies to lapse. If you choose IUL, run illustrations at 5–6% and stress-test at 0%. Work only with an independent agent who will show you both scenarios honestly.',
      leftFor: [
        'You want fully guaranteed growth and death benefit',
        'Fixed premiums fit your financial discipline',
        'You value simplicity and predictability over potential upside',
        'You\'re in a mutual company eligible for participating dividends',
      ],
      rightFor: [
        'You want flexibility in how much you pay each year',
        'You\'re comfortable with market-linked (but protected) growth',
        'You understand the illustration assumptions and risks going in',
        'You have a high-trust independent agent stress-testing the numbers',
      ],
    },
    relatedLinks: [
      { href: '/compare/term-vs-whole-life/', label: 'Term vs. Whole Life' },
      { href: '/compare/term-vs-iul/',        label: 'Term vs. IUL' },
      { href: '/compare/term-vs-final-expense/', label: 'Term vs. Final Expense' },
    ],
  },

  'term-vs-final-expense': {
    left:    { name: 'Term Life',      slug: 'term-insurance', color: 'var(--rust)' },
    right:   { name: 'Final Expense',  slug: 'final-expense',  color: 'var(--gold)' },
    tagline: 'Income protection vs. burial coverage — completely different tools.',
    intro:   'Final expense insurance is not a "smaller term policy." It\'s a distinct product designed for one purpose: covering end-of-life costs (funeral, burial, medical bills) so your family isn\'t stuck with the bill. Term life replaces your income so survivors can maintain their standard of living. Comparing them is like comparing a screwdriver to a hammer — which is right depends entirely on what you\'re trying to fix.',
    rows: [
      { attr: 'Coverage amounts',              left: '$100K–$5M+',     right: '$5K–$30K',         winner: null,    note: 'Different jobs require different amounts' },
      { attr: 'Monthly cost',                  left: '$18–$45 (healthy, 40s)', right: '$40–$200+', winner: 'left',  note: '' },
      { attr: 'Medical exam',                  left: 'Usually yes',    right: 'No — simplified issue', winner: 'right', note: '' },
      { attr: 'Age range',                     left: '18–70 typically', right: '50–85',            winner: null,    note: '' },
      { attr: 'Coverage duration',             left: '10–30 years',    right: 'Permanent',         winner: null,    note: '' },
      { attr: 'Approval timeline',             left: '2–4 weeks',      right: 'Often same day',    winner: 'right', note: '' },
      { attr: 'Primary purpose',               left: 'Income replacement', right: 'Funeral & end-of-life', winner: null, note: '' },
      { attr: 'Health requirements',           left: 'Underwritten',   right: 'Minimal — guaranteed issue available', winner: 'right', note: '' },
    ],
    verdict: {
      winner: 'Neither "wins" — they solve different problems.',
      text: 'If you\'re under 60 with dependents, buy term. The coverage amounts available with final expense ($5K–$30K) are nowhere near enough to replace your income or cover a mortgage. If you\'re 65+ and your main concern is not leaving your family with a $15,000 funeral bill, final expense is exactly right. Many seniors hold a small final expense policy after their term coverage expires — and that\'s the smartest use of the product.',
      leftFor: [
        'You\'re under 60 with dependents relying on your income',
        'You have a mortgage or significant debt that needs covering',
        'You need $100K+ in coverage to replace income',
        'You\'re healthy enough to qualify for full underwriting',
      ],
      rightFor: [
        'You\'re 55–85 and your kids are financially independent',
        'Your primary goal is covering funeral and burial costs',
        'You\'ve been declined for term due to health conditions',
        'You want guaranteed acceptance with no medical exam',
      ],
    },
    relatedLinks: [
      { href: '/compare/term-vs-whole-life/', label: 'Term vs. Whole Life' },
      { href: '/compare/mortgage-protection-vs-term/', label: 'Mortgage Protection vs. Term' },
      { href: '/compare/term-vs-iul/',        label: 'Term vs. IUL' },
    ],
  },

  'mortgage-protection-vs-term': {
    left:    { name: 'Mortgage Protection', slug: 'mortgage-protection', color: 'var(--gold)' },
    right:   { name: 'Term Life',           slug: 'term-insurance',      color: 'var(--rust)' },
    tagline: 'One product tied to your lender. One that stays with your family.',
    intro:   'Mortgage protection insurance (MPI) is marketed aggressively to new homeowners. It sounds logical: if you die, the mortgage is paid off. But the devil is in the details — the death benefit decreases as your loan balance decreases, while your premium stays the same. A level term policy covers the same period, usually costs less, keeps a fixed death benefit, and pays your family instead of the lender. In almost every case, term wins.',
    rows: [
      { attr: 'Death benefit over time',        left: 'Decreases (follows loan balance)', right: 'Level — stays fixed', winner: 'right', note: '' },
      { attr: 'Beneficiary',                    left: 'The lender',     right: 'Your family',      winner: 'right', note: 'Critical difference' },
      { attr: 'Premium over time',              left: 'Level',          right: 'Level',            winner: null,    note: '' },
      { attr: 'Cost per dollar of coverage',    left: 'Worse — benefit shrinks, cost stays', right: 'More efficient', winner: 'right', note: '' },
      { attr: 'Medical exam',                   left: 'Often no',       right: 'Usually yes',      winner: 'left',  note: '' },
      { attr: 'Portability',                    left: 'Tied to the mortgage', right: 'Follows you anywhere', winner: 'right', note: '' },
      { attr: 'Flexibility if family sells home', left: 'Coverage gone on payoff', right: 'Continues unchanged', winner: 'right', note: '' },
      { attr: 'Best scenario for use',          left: 'Can\'t qualify for term', right: 'Almost all other cases', winner: 'right', note: '' },
    ],
    verdict: {
      winner: 'Term life — in almost every scenario.',
      text: 'Mortgage protection insurance is one of the most oversold products in the industry. It feels intuitive — protect the mortgage — but it\'s structurally inferior to term: your benefit shrinks while your premium stays flat, and the payout goes to the bank instead of your family. With a term policy, your family gets a check. They can pay off the mortgage, invest the rest, or move — their choice. The one narrow case for MPI: if a health condition prevents you from qualifying for any term policy, guaranteed-issue MPI may be your only option.',
      leftFor: [
        'You\'ve been declined for term due to a health condition',
        'You want guaranteed acceptance with no medical exam',
        'You only care about the mortgage being paid — not broader income replacement',
      ],
      rightFor: [
        'You\'re healthy enough to qualify for standard underwriting',
        'You want your family to have options — not just a paid-off mortgage',
        'You want a level benefit that doesn\'t erode over time',
        'You may move or refinance before the loan is paid off',
      ],
    },
    relatedLinks: [
      { href: '/compare/term-vs-whole-life/',    label: 'Term vs. Whole Life' },
      { href: '/compare/term-vs-final-expense/', label: 'Term vs. Final Expense' },
      { href: '/compare/term-vs-iul/',           label: 'Term vs. IUL' },
    ],
  },
}

// ── Page builder ─────────────────────────────────────────────────────────────

function comparePage(slug, config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const c = COMPARES[slug]
  if (!c) throw new Error(`Unknown compare slug: ${slug}`)

  const canonical = `${siteUrl}/compare/${slug}/`
  const title     = `${c.left.name} vs. ${c.right.name} — Which is Right for You? | MeetLifeAgents`
  const description = `${c.left.name} vs. ${c.right.name}: ${c.tagline} Side-by-side comparison, verdict, and how to choose.`

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',    item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Compare', item: `${siteUrl}/compare/` },
          { '@type': 'ListItem', position: 3, name: `${c.left.name} vs. ${c.right.name}`, item: canonical },
        ],
      },
      {
        '@type': 'Article',
        headline: `${c.left.name} vs. ${c.right.name}: Which life insurance policy is right for you?`,
        description: description,
        url: canonical,
        publisher: { '@type': 'Organization', name: 'MeetLifeAgents' },
      },
    ],
  })

  // Build comparison table rows
  const tableRows = c.rows.map(r => {
    const leftWin  = r.winner === 'left'
    const rightWin = r.winner === 'right'
    return `
      <tr class="cmp-row">
        <td class="cmp-cell cmp-cell-val ${leftWin ? 'cmp-win' : ''}">
          ${leftWin ? '<span class="cmp-win-pip">✓</span>' : ''}
          <span class="cmp-val-text">${r.left}</span>
        </td>
        <td class="cmp-cell cmp-cell-attr">
          <span class="cmp-attr-label">${r.attr}</span>
          ${r.note ? `<span class="cmp-attr-note">${r.note}</span>` : ''}
        </td>
        <td class="cmp-cell cmp-cell-val ${rightWin ? 'cmp-win' : ''}">
          ${rightWin ? '<span class="cmp-win-pip">✓</span>' : ''}
          <span class="cmp-val-text">${r.right}</span>
        </td>
      </tr>`
  }).join('')

  // Build "choose if" bullets
  const leftBullets  = c.verdict.leftFor.map(b  => `<li>${b}</li>`).join('')
  const rightBullets = c.verdict.rightFor.map(b => `<li>${b}</li>`).join('')

  // Related links
  const relLinks = c.relatedLinks.map(l =>
    `<a href="${l.href}" class="cmp-rel-link">${l.label} →</a>`
  ).join('')

  return `${head({ title, description, canonical, extraHead: `<script type="application/ld+json">${jsonLd}</script>` })}
<body>
${header()}

<!-- ── COMPARE HERO ────────────────────────────────────────────── -->
<section class="cmp-hero">
  <div class="container">
    <nav class="breadcrumb" style="padding-top:20px;opacity:0.6;">
      <a href="/" style="color:var(--cream);">Home</a><span style="color:var(--cream);">›</span>
      <span style="color:var(--cream);">Compare</span><span style="color:var(--cream);">›</span>
      <span style="color:var(--gold-soft);">${c.left.name} vs. ${c.right.name}</span>
    </nav>
    <div class="cmp-hero-duel">
      <div class="cmp-hero-side cmp-hero-left">
        <span class="cmp-hero-policy-label">Policy A</span>
        <h2 class="cmp-hero-policy-name display">${c.left.name}</h2>
      </div>
      <div class="cmp-hero-vs">
        <span class="cmp-hero-vs-text">VS</span>
      </div>
      <div class="cmp-hero-side cmp-hero-right">
        <span class="cmp-hero-policy-label">Policy B</span>
        <h2 class="cmp-hero-policy-name display">${c.right.name}</h2>
      </div>
    </div>
    <p class="cmp-hero-tagline">${c.tagline}</p>
  </div>
</section>

<!-- ── INTRO ──────────────────────────────────────────────────────── -->
<section class="cmp-intro-sec">
  <div class="container">
    <div class="cmp-intro-inner">
      <p class="cmp-intro-text">${c.intro}</p>
    </div>
  </div>
</section>

<!-- ── COMPARISON TABLE ───────────────────────────────────────────── -->
<section class="cmp-table-sec">
  <div class="container">
    <div class="cmp-section-head">
      <span class="eyebrow">Head to head</span>
      <h2 class="display">Side-by-side breakdown</h2>
    </div>
    <div class="cmp-table-wrap">
      <table class="cmp-table">
        <thead>
          <tr class="cmp-thead-row">
            <th class="cmp-th cmp-th-left">${c.left.name}</th>
            <th class="cmp-th cmp-th-attr">Category</th>
            <th class="cmp-th cmp-th-right">${c.right.name}</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ── VERDICT ────────────────────────────────────────────────────── -->
<section class="cmp-verdict-sec">
  <div class="container">
    <div class="cmp-verdict-card">
      <span class="cmp-verdict-eyebrow">The bottom line</span>
      <h2 class="cmp-verdict-headline display">${c.verdict.winner}</h2>
      <p class="cmp-verdict-body">${c.verdict.text}</p>
    </div>
  </div>
</section>

<!-- ── CHOOSE IF ──────────────────────────────────────────────────── -->
<section class="cmp-choose-sec">
  <div class="container">
    <div class="cmp-section-head">
      <span class="eyebrow">Decision guide</span>
      <h2 class="display">Which one fits your situation?</h2>
    </div>
    <div class="cmp-choose-grid">
      <div class="cmp-choose-col cmp-choose-left">
        <div class="cmp-choose-policy-name">${c.left.name}</div>
        <h3 class="cmp-choose-head display">Choose ${c.left.name} if…</h3>
        <ul class="cmp-choose-list">
          ${leftBullets}
        </ul>
        <a href="/${c.left.slug}/" class="cmp-choose-link">Learn more about ${c.left.name} →</a>
      </div>
      <div class="cmp-choose-divider"></div>
      <div class="cmp-choose-col cmp-choose-right">
        <div class="cmp-choose-policy-name">${c.right.name}</div>
        <h3 class="cmp-choose-head display">Choose ${c.right.name} if…</h3>
        <ul class="cmp-choose-list">
          ${rightBullets}
        </ul>
        <a href="/${c.right.slug}/" class="cmp-choose-link">Learn more about ${c.right.name} →</a>
      </div>
    </div>
  </div>
</section>

<!-- ── AGENT CTA ───────────────────────────────────────────────────── -->
<section class="cmp-cta-sec">
  <div class="container">
    <div class="cmp-cta-inner">
      <div class="cmp-cta-text">
        <span class="cmp-cta-eyebrow">Still not sure?</span>
        <h2 class="display cmp-cta-headline">Talk to an independent agent who knows both</h2>
        <p class="cmp-cta-sub">An independent agent isn't tied to one product or carrier. They'll run real numbers for your situation — not a one-size-fits-all pitch.</p>
      </div>
      <div class="cmp-cta-action" id="cta-morph">
        <div class="cmp-find-form" id="find-form-cmp">
          <label class="search-label">Find a verified agent near you</label>
          <div class="search-row">
            <div class="select-wrap">
              <select id="cmp-state-sel">
                <option value="">State</option>
              </select>
            </div>
            <div class="select-wrap">
              <select id="cmp-city-sel" disabled>
                <option value="">City</option>
              </select>
            </div>
            <button class="search-cta" id="cmp-go-btn">Find Agent</button>
          </div>
          <p class="search-foot">No spam. Direct connection to a local agent.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── RELATED COMPARES ────────────────────────────────────────────── -->
<section class="cmp-rel-sec">
  <div class="container">
    <h3 class="cmp-rel-head display">More comparisons</h3>
    <div class="cmp-rel-links">
      ${relLinks}
    </div>
  </div>
</section>

<script>
(function(){
  const cities = window.MLA_CITIES || {}
  const stateEl = document.getElementById('cmp-state-sel')
  const cityEl  = document.getElementById('cmp-city-sel')
  const goBtn   = document.getElementById('cmp-go-btn')

  // Populate states
  const stateNames = {
    al:'Alabama',az:'Arizona',ar:'Arkansas',ca:'California',co:'Colorado',
    ct:'Connecticut',de:'Delaware',fl:'Florida',ga:'Georgia',id:'Idaho',
    il:'Illinois',ind:'Indiana',ia:'Iowa',ks:'Kansas',ky:'Kentucky',
    la:'Louisiana',me:'Maine',md:'Maryland',ma:'Massachusetts',mi:'Michigan',
    mn:'Minnesota',ms:'Mississippi',mo:'Missouri',mt:'Montana',ne:'Nebraska',
    nv:'Nevada',nh:'New Hampshire',nj:'New Jersey',nm:'New Mexico',ny:'New York',
    nc:'North Carolina',nd:'North Dakota',oh:'Ohio',ok:'Oklahoma',or:'Oregon',
    pa:'Pennsylvania',ri:'Rhode Island',sc:'South Carolina',sd:'South Dakota',
    tn:'Tennessee',tx:'Texas',ut:'Utah',vt:'Vermont',va:'Virginia',
    wa:'Washington',wv:'West Virginia',wi:'Wisconsin',wy:'Wyoming'
  }
  Object.keys(cities).sort().forEach(s => {
    const o = document.createElement('option')
    o.value = s
    o.textContent = stateNames[s] || s.toUpperCase()
    stateEl.appendChild(o)
  })

  stateEl.addEventListener('change', () => {
    cityEl.innerHTML = '<option value="">City</option>'
    const list = cities[stateEl.value] || []
    list.forEach(c => {
      const o = document.createElement('option')
      o.value = c.slug
      o.textContent = c.name
      cityEl.appendChild(o)
    })
    cityEl.disabled = !list.length
  })

  goBtn.addEventListener('click', () => {
    const s = stateEl.value, c = cityEl.value
    if (s && c) window.location.href = '/' + s + '/' + c + '/'
    else if (s) window.location.href = '/' + s + '/'
  })
})()
</script>

${GLOBAL_SCRIPTS}
${footer()}
</body>
</html>`
}

module.exports = { comparePage, COMPARES }
