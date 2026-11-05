'use strict'
const { head, header, footer, GLOBAL_SCRIPTS } = require('./layout')

/* ── Article data ──────────────────────────────────────────────────────────── */

const ARTICLES = [
  {
    slug: 'why-local-agent',
    title: 'Why You Need a Local Life Insurance Agent, Not an App',
    category: 'Buying Life Insurance',
    description: 'Online life insurance apps promise simplicity. What they deliver is a policy with no one to call when it matters. Here\'s what you lose when you skip the local agent.',
    readTime: '5 min read',
    published: '2026-11-01',
    body: `
<p>Every few years a new app promises to sell you life insurance in eight minutes. The pitch is appealing: no agent, no questions, just tap your way to coverage and move on with your day.</p>

<p>The problem isn't that those apps are dishonest. The problem is what they don't tell you about how life insurance actually works — and what happens when you need it most.</p>

<h2>The app gives you a number. An agent gives you a plan.</h2>

<p>An online quote engine takes your age, height, weight, and credit score and spits back a premium. It has no idea you're self-employed, that your spouse doesn't work, that you have three kids under ten and a mortgage, or that you bought a rental property last year. Those details matter — not for the premium, but for <em>how much</em> coverage you should actually carry and <em>what kind</em> will serve your family best.</p>

<p>A local agent asks those questions. A good one draws a picture of what your family's finances look like after you're gone, then builds a strategy around closing that gap. That's not something a form can do.</p>

<h2>Local means they know your state's rules.</h2>

<p>Life insurance is regulated at the state level. Benefit structure, contestability windows, beneficiary rights, state-specific riders — these vary more than most people realize. An agent licensed and <em>resident</em> in your state has worked these rules for years. They know the carriers that consistently approve clean claims in your state. They know which company's underwriting is favorable for your situation. An app doesn't.</p>

<h2>Who do you call when there's a claim?</h2>

<p>This is the question the app never answers. When a spouse or child files a death claim, they're grieving and dealing with paperwork at the same time. A local agent is a person with a local phone number. They walk the beneficiary through the process. They follow up with the carrier. They advocate if anything gets delayed.</p>

<p>The 1-800 number on the back of a policy card is not the same thing.</p>

<h2>Competitive pricing doesn't require giving up service.</h2>

<p>One of the most persistent myths about working with an agent is that it costs more. It doesn't — not for the buyer. Life insurance agents are compensated by the carrier through built-in commissions. The same policy often costs the same whether you buy it through an agent or direct. What changes is what you get for that money.</p>

<p>An independent agent — the kind we list on MeetLifeAgents — works with ten or more carriers. They shop your coverage across the market and place it where you get the best terms. That often beats going direct to any single carrier.</p>

<h2>What to look for in a local agent.</h2>

<p>Not all local agents are equal. Here's what separates the good ones from the rest:</p>

<ul>
  <li><strong>An active, verifiable license.</strong> Every state Department of Insurance maintains a public license lookup. Check the agent's National Producer Number before you commit. We publish every agent's NPN on their profile.</li>
  <li><strong>Independence.</strong> A captive agent (one who works for a single carrier like State Farm or New York Life) can only offer you that company's products. An independent agent shops the whole market on your behalf.</li>
  <li><strong>Enough tenure.</strong> Five or more years in the business means the agent has seen a few market cycles and claim scenarios. They know what they're doing.</li>
  <li><strong>A local address.</strong> An agent who lives in your city understands your market, your housing costs, your employers. That context matters for coverage planning.</li>
</ul>

<p>Every agent listed on MeetLifeAgents has been verified against those criteria. We check state DOI records directly. We verify carrier appointments. We require a local address. The agents you find here cleared a higher bar than "anyone with a pulse and a license."</p>

<div class="article-cta-box">
  <strong>Find a verified local agent in your city →</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Search agents</a>
</div>
`,
  },
  {
    slug: 'how-much-life-insurance',
    title: 'How Much Life Insurance Do You Actually Need?',
    category: 'Coverage Planning',
    description: 'The internet says "10x your income." That\'s a starting point, not an answer. Here\'s how to actually calculate the coverage your family needs.',
    readTime: '6 min read',
    published: '2026-11-01',
    body: `
<p>Ask a search engine how much life insurance you need and you'll get a rule of thumb: ten times your annual income. It's a defensible starting point, but it's also a guess — one that ignores your actual debts, your spouse's income, your kids' ages, and a dozen other factors that determine what your family would actually need to stay whole.</p>

<p>Here's how to get to a real number.</p>

<h2>Start with the DIME method.</h2>

<p>DIME stands for Debt, Income, Mortgage, and Education. It's not a formula — it's a checklist. Run through each category and add them up.</p>

<ul>
  <li><strong>Debt.</strong> Every dollar your family would need to pay off — car loans, credit cards, medical debt, personal loans. Not the mortgage (that's separate).</li>
  <li><strong>Income.</strong> How many years does your family need your income replaced? Multiply your annual income by the number of years until your youngest child is self-sufficient. For many families, that's 15–20 years.</li>
  <li><strong>Mortgage.</strong> The payoff balance on your home. If your family couldn't make payments without your income, include the full balance.</li>
  <li><strong>Education.</strong> If you have children and care about funding their education, estimate the cost per child at today's rates and multiply by the number of kids.</li>
</ul>

<p>Add up all four categories. That's your coverage floor. Most people land between $500,000 and $2 million. That range is wide because it depends heavily on income, family size, and debt load — which is exactly why a rule of thumb doesn't cut it.</p>

<h2>Subtract what you already have.</h2>

<p>Now subtract assets your family could actually use: a spouse's income (annualized over the coverage period), savings, existing life insurance through work (note: group coverage typically ends when employment does), and any other liquid assets.</p>

<p>The gap between your DIME total and your existing assets is what you need to insure.</p>

<h2>Adjust for your situation.</h2>

<p>A few situations change the math significantly:</p>

<ul>
  <li><strong>Stay-at-home parent.</strong> Even without a paycheck, a stay-at-home parent provides labor the surviving spouse would have to replace — childcare, household management, transportation. The economic value of that work is often $50,000–$100,000 per year. It should be insured.</li>
  <li><strong>Business owner.</strong> If your death would trigger a buyout, the sale of the business, or a sudden gap in revenue, your coverage needs are higher than DIME alone will capture. You may also need a separate key-person policy.</li>
  <li><strong>Aging parents.</strong> If you support a parent financially, factor in the support you'd no longer provide.</li>
</ul>

<h2>Coverage cost versus coverage amount.</h2>

<p>The good news is that term life insurance is cheap when you're healthy and under 50. A $1 million, 20-year term policy for a healthy 35-year-old often costs less than $60 a month. A lot of people are underinsured because they never actually looked at the price.</p>

<p>The key is to buy it when you're young and healthy — not when you have a diagnosis or when your employer coverage is about to end.</p>

<h2>Review your coverage regularly.</h2>

<p>Life insurance isn't a set-and-forget purchase. Review it every 3–5 years, or after a major life event: buying a home, having a child, starting a business, inheriting assets. Each of those changes the gap between what you have and what your family actually needs.</p>

<p>A good local agent runs this analysis with you. They update it as your life changes. That's the kind of ongoing relationship a one-time app transaction can't provide.</p>

<div class="article-cta-box">
  <strong>Talk through your coverage needs with a verified local agent.</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Find an agent near you</a>
</div>
`,
  },
  {
    slug: 'what-is-npn',
    title: 'What Is an NPN and Why You Should Always Check It',
    category: 'Agent Verification',
    description: 'Every licensed insurance agent has a National Producer Number. Here\'s what it is, what it tells you, and how to look it up in under two minutes.',
    readTime: '4 min read',
    published: '2026-11-01',
    body: `
<p>Before you sign an application or hand over a premium payment, there's one thing you should always do: look up your agent's National Producer Number.</p>

<p>It takes about two minutes. It tells you everything that matters. And most consumers have never done it.</p>

<h2>What is an NPN?</h2>

<p>A National Producer Number is a unique identifier assigned to every licensed insurance agent in the United States by the National Insurance Producer Registry (NIPR). Think of it as a license plate number for insurance professionals.</p>

<p>When an agent gets licensed in any state, they receive an NPN. That number follows them for their entire career — through every company they work for, every state they get licensed in, every disciplinary action or license lapse. It's a permanent, public record.</p>

<h2>What can you find with an NPN?</h2>

<p>Using an agent's NPN, you can look up their record on your state's Department of Insurance website or on the NIPR public database. What you'll find:</p>

<ul>
  <li><strong>License status.</strong> Is the license active? Expired? Suspended?</li>
  <li><strong>Lines of authority.</strong> What types of insurance is the agent actually licensed to sell? Life insurance, health, property and casualty — these are separate licenses.</li>
  <li><strong>License history.</strong> When were they first licensed? In which states?</li>
  <li><strong>Disciplinary actions.</strong> Any complaints, fines, or license actions filed against the agent.</li>
  <li><strong>Carrier appointments.</strong> In many states, you can see which insurance companies the agent is currently appointed with — meaning which products they can actually sell you.</li>
</ul>

<p>None of this information is hidden. It's all public record, maintained by the same government agencies that regulate the insurance industry. You just have to know to look.</p>

<h2>Red flags to watch for.</h2>

<p>When you pull an NPN record, here's what should give you pause:</p>

<ul>
  <li>A license that was recently reinstated after a lapse</li>
  <li>Disciplinary actions, even ones marked "resolved"</li>
  <li>A very short license history for someone who claims years of experience</li>
  <li>No appointment with the carrier whose product they're trying to sell you</li>
  <li>Reluctance to provide their NPN when asked</li>
</ul>

<p>A legitimate agent will hand you their NPN without hesitation. If someone gets defensive when you ask for it, that's your answer.</p>

<h2>How to look it up.</h2>

<p>Go to <strong>nipr.com</strong> and use their Producer License Search. Enter the NPN or the agent's name and state. The result will show their full license history and current status across every state they're licensed in.</p>

<p>Alternatively, most state DOI websites have their own lookup tool. Search for "[your state] Department of Insurance producer lookup" and you'll find it.</p>

<h2>Why MeetLifeAgents shows every agent's NPN publicly.</h2>

<p>Every agent profile on this site displays their NPN — not buried in a footnote, but prominently, with a direct link to the state DOI lookup. We do this because verification shouldn't require a phone call or a trust-me.</p>

<p>If you're on a city page right now, click any agent's profile. The NPN is right there. Check it. That's what it's for.</p>

<div class="article-cta-box">
  <strong>Browse verified agents with publicly listed NPNs.</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Find an agent near you</a>
</div>
`,
  },
  {
    slug: 'buying-life-insurance-in-your-30s',
    title: 'Why Your 30s Are the Best Time to Buy Life Insurance',
    category: 'Buying Life Insurance',
    description: 'Rates are cheapest when you\'re young and healthy. Most people wait until they feel the pressure — by then, it costs more. Here\'s the case for buying now.',
    readTime: '5 min read',
    published: '2026-11-01',
    body: `
<p>Life insurance is one of the few financial products where waiting always costs you. Every year you delay is a year older you are when you buy it, a year more for your health to change, and a year more in premiums you've already skipped paying.</p>

<p>Your 30s are the sweet spot: old enough to have real financial responsibilities, young enough that rates are still cheap.</p>

<h2>Why rates are lower in your 30s.</h2>

<p>Life insurance premiums are actuarial math. The carrier is pricing the probability that you'll die during the policy period and they'll have to pay out. At 32, that probability is low. At 55, it's higher. At 62 and freshly diagnosed with high blood pressure, it's higher still — and that diagnosis may push you into a higher risk class or trigger exclusions.</p>

<p>A healthy 32-year-old can get a $1 million, 30-year term policy for roughly $50–$80 a month. The same coverage at 45 often runs $150–$250 a month. By 55, you're looking at $400–$600+ monthly for the same coverage, if you can get it at the same terms at all.</p>

<p>Buying in your 30s isn't just cheaper now — it locks in your rate for the full term. A 30-year policy bought at 32 stays at the same monthly premium until age 62.</p>

<h2>The responsibilities that show up in your 30s.</h2>

<p>Most people's 30s look roughly like this: a mortgage (or the down payment saved), a spouse or partner, one or more kids, and two incomes that the household has built its budget around. Take either income away and the financial plan falls apart.</p>

<p>If a spouse depends on your income — to cover the mortgage, childcare, day-to-day expenses — that dependence is an uninsured risk until you have coverage in place. Life insurance converts that risk into a known, manageable monthly cost.</p>

<h2>Group coverage through work isn't enough.</h2>

<p>Many people in their 30s have life insurance through an employer-sponsored benefit — typically one or two times annual salary. That coverage has two problems:</p>

<ol>
  <li>It's almost always too small. One or two times your salary doesn't cover a 30-year mortgage, years of childcare, college, or the income your spouse would need long-term.</li>
  <li>It ends when your employment ends. If you change jobs, get laid off, or your employer drops the benefit, the coverage is gone. You then have to requalify for individual coverage — at whatever age and health status you're at then.</li>
</ol>

<p>Group coverage is a nice benefit. It shouldn't be your only plan.</p>

<h2>Healthy today doesn't mean healthy next year.</h2>

<p>Underwriting for life insurance looks at your current health. A diagnosis of diabetes, heart disease, or even sleep apnea can move you into a higher rate class — sometimes substantially. Many conditions show up in your 40s or early 50s without warning. Once you have the diagnosis, it follows you to every policy you apply for.</p>

<p>Buying before you have anything to disclose is simply cheaper insurance against future uninsurability.</p>

<h2>What type to buy in your 30s.</h2>

<p>For most people in their 30s, term life insurance is the right starting point. It's the simplest and cheapest way to get the coverage amount your family actually needs. A 20- or 30-year term policy covers you through the period of highest financial vulnerability — the years when you have a mortgage and kids at home.</p>

<p>Some situations call for permanent coverage alongside term: business owners protecting a partnership, high earners with estate planning needs, or people whose insurability will worsen with age. That's a conversation worth having with a local independent agent who can look at your complete picture.</p>

<h2>Start with the right agent.</h2>

<p>An independent agent shops the full market on your behalf. They look at your health profile, your budget, and your family's actual needs — not just what a single carrier will sell you. Find one who lives in your city, knows your market, and will be there when it matters.</p>

<div class="article-cta-box">
  <strong>Find a verified local life insurance agent in your city.</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Search your city</a>
</div>
`,
  },
]

/* ── Articles listing page ─────────────────────────────────────────────────── */

function articlesPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const title = 'Life Insurance Articles & Guides — MeetLifeAgents'
  const description = 'Plain-English guides on buying life insurance, understanding coverage, and verifying the agents you work with. No sales pitch — just the information you need.'

  const cards = ARTICLES.map(a => `
<a href="/articles/${a.slug}/" class="article-card">
  <div class="article-card-tag">${a.category}</div>
  <h2 class="article-card-title">${a.title}</h2>
  <p class="article-card-desc">${a.description}</p>
  <div class="article-card-meta">${a.readTime}</div>
</a>`).join('\n')

  return `${head({ title, description, canonical: `${siteUrl}/articles/` })}
<body>
${header()}

<section class="pg-hero">
  <div class="container">
    <p class="city-eyebrow" style="padding-top:40px;">Resources</p>
    <h1 class="display pg-hero-title">Life Insurance Guides</h1>
    <p class="pg-hero-sub" style="max-width:580px;">Plain-English articles on buying coverage, understanding your options, and finding the right agent. No jargon, no sales pitch.</p>
  </div>
</section>

<section style="padding:60px 0 100px;">
  <div class="container">
    <div class="articles-grid">
      ${cards}
    </div>
  </div>
</section>

${footer()}
${GLOBAL_SCRIPTS}
</body>
</html>`
}

/* ── Individual article page ──────────────────────────────────────────────── */

function articlePage(slug, config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const a = ARTICLES.find(x => x.slug === slug)
  if (!a) return null

  const title = `${a.title} — MeetLifeAgents`
  const description = a.description

  return `${head({ title, description, canonical: `${siteUrl}/articles/${a.slug}/` })}
<body>
${header()}

<article class="article-wrap">
  <div class="container article-container">
    <div class="article-header">
      <a href="/articles/" class="article-back">← All articles</a>
      <div class="article-meta-top">
        <span class="article-tag">${a.category}</span>
        <span class="article-read-time">${a.readTime}</span>
      </div>
      <h1 class="display article-title">${a.title}</h1>
      <p class="article-lede">${a.description}</p>
    </div>
    <div class="article-body">
      ${a.body}
    </div>
    <div class="article-footer-cta">
      <div class="afc-inner">
        <div class="eyebrow">Ready to find coverage?</div>
        <h2 class="display">Find a verified local agent in your city.</h2>
        <p>Every agent on MeetLifeAgents is license-verified, locally resident, and independently vetted. No call centers, no shared lead pools — just direct contact with the agent you choose.</p>
        <a href="/" class="btn-ink">Search agents →</a>
      </div>
    </div>
  </div>
</article>

${footer()}
${GLOBAL_SCRIPTS}
</body>
</html>`
}

module.exports = { articlesPage, articlePage, ARTICLES }
