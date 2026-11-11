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
    slug: 'term-vs-whole-life',
    title: 'Term vs. Whole Life Insurance: The Honest Comparison',
    category: 'Coverage Planning',
    description: 'Term is cheap and simple. Whole life is permanent and builds cash value. Neither is right for everyone — here\'s how to think through which one fits your situation.',
    readTime: '6 min read',
    published: '2026-11-11',
    body: `
<p>Ask ten people which type of life insurance is "better" and you'll get ten different answers, usually from people who have a financial stake in the answer. Here's an honest comparison with no agenda.</p>

<h2>What term life insurance is.</h2>

<p>Term life insurance covers you for a fixed period — 10, 20, or 30 years. If you die during the term, the policy pays out. If you're still alive when it ends, the coverage expires and you've paid premiums for protection you didn't need to use.</p>

<p>That last part sounds like a loss. It isn't. You also pay for car insurance and hope you never need it. Insurance is a risk transfer, not an investment.</p>

<p>Term is the simplest, cheapest form of life insurance. A healthy 35-year-old can typically get $1 million in coverage for $40–$60 a month on a 20-year term policy. That's the monthly cost of a couple of streaming subscriptions.</p>

<h2>What whole life insurance is.</h2>

<p>Whole life insurance covers you permanently — it doesn't expire. It also builds a cash value account alongside the death benefit, which grows at a guaranteed (though modest) rate and can be borrowed against over time.</p>

<p>In exchange for those features, whole life is significantly more expensive. The same $1 million in coverage that costs $50/month as term might cost $700–$1,000/month as whole life.</p>

<h2>When term is the right choice.</h2>

<p>Term makes sense for the majority of people buying life insurance, especially those who:</p>

<ul>
  <li>Have a mortgage they're paying down over 20–30 years</li>
  <li>Have children who will eventually become financially independent</li>
  <li>Have a spouse or partner who depends on their income</li>
  <li>Want the maximum coverage amount for the lowest possible premium</li>
</ul>

<p>The logic is simple: your financial vulnerability peaks when your debts are highest and your dependents are youngest. That's exactly what a 20- or 30-year term covers. By the time the policy expires, the mortgage is paid off and the kids are grown.</p>

<h2>When whole life makes sense.</h2>

<p>Whole life isn't a bad product — it's a product designed for specific situations that most people don't have. It can make sense for:</p>

<ul>
  <li><strong>Estate planning.</strong> High-net-worth individuals who want to leave a tax-advantaged inheritance or fund estate taxes use permanent coverage specifically because it doesn't expire.</li>
  <li><strong>Business owners.</strong> Buy-sell agreements between business partners often use permanent coverage so the death benefit is available regardless of when a partner dies.</li>
  <li><strong>Children with serious medical conditions.</strong> A parent may buy a small whole life policy on a child to lock in future insurability before the child's condition becomes uninsurable.</li>
  <li><strong>Final expense coverage for older adults.</strong> A smaller whole life policy designed to cover funeral costs and final medical bills — sometimes called burial insurance — serves a specific, permanent need.</li>
</ul>

<h2>The "buy term and invest the difference" argument.</h2>

<p>You'll hear financial advisors argue that the gap between what you'd pay for whole life versus term — sometimes $600–$800 a month — invested consistently in a low-cost index fund would outperform the cash value growth in a whole life policy. Mathematically, that's usually true.</p>

<p>The counterargument is behavioral: most people don't invest the difference. They spend it. A whole life policy is forced savings with a death benefit attached. For some people, that structure is worth the premium.</p>

<h2>The honest answer.</h2>

<p>For most families with a mortgage and kids, term life insurance is the right tool. It's not a compromise — it's the purpose-built product for the problem you're trying to solve. Whole life is a different tool for different needs. An independent agent who doesn't have a commission preference between the two is the right person to help you decide which one fits your situation.</p>

<div class="article-cta-box">
  <strong>Talk through your options with a verified independent agent.</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Find an agent near you</a>
</div>
`,
  },
  {
    slug: 'what-is-final-expense-insurance',
    title: 'What Is Final Expense Insurance — and Do You Need It?',
    category: 'Coverage Types',
    description: 'Final expense insurance is a small whole life policy designed to cover end-of-life costs. Here\'s what it covers, what it costs, and who actually benefits from it.',
    readTime: '5 min read',
    published: '2026-11-11',
    body: `
<p>Final expense insurance goes by several names — burial insurance, funeral insurance, simplified issue whole life — but they all describe essentially the same product: a small permanent life insurance policy designed to cover the costs associated with dying.</p>

<h2>What does it actually cover?</h2>

<p>The death benefit on a final expense policy is typically between $5,000 and $25,000 — well below the $500,000–$2 million range of a standard term life policy. That benefit is paid to whoever the policyholder names as beneficiary, who can use it for:</p>

<ul>
  <li>Funeral and burial or cremation costs (average funeral in the U.S.: $7,000–$12,000)</li>
  <li>Outstanding medical bills from a final illness</li>
  <li>Credit card debt or small personal loans</li>
  <li>Legal and estate settlement costs</li>
</ul>

<p>The payout goes directly to the beneficiary as a lump sum, with no restrictions on how it's spent. The beneficiary isn't required to use it exclusively for funeral costs — it's simply a death benefit like any other life insurance policy.</p>

<h2>Who it's designed for.</h2>

<p>Final expense insurance is primarily marketed to — and genuinely useful for — adults between 50 and 85 who don't have traditional life insurance and are past the age or health threshold where they can qualify for it affordably.</p>

<p>The appeal is that most final expense policies use simplified underwriting. Instead of a full medical exam, applicants answer a short health questionnaire. Some policies are "guaranteed issue" — no health questions at all — though those come with a waiting period (typically 2 years) before the full benefit is paid out.</p>

<h2>What it costs.</h2>

<p>Premiums depend on age and health, but as a general range:</p>

<ul>
  <li>A 65-year-old woman in good health might pay $40–$60/month for $15,000 in coverage</li>
  <li>A 70-year-old man might pay $70–$100/month for the same coverage</li>
  <li>Guaranteed issue policies (no health questions) run higher — often $80–$150/month for $10,000 in coverage</li>
</ul>

<p>Premiums are fixed for life and the coverage doesn't expire, which is why these are whole life policies rather than term.</p>

<h2>When it makes sense — and when it doesn't.</h2>

<p>Final expense insurance is a good fit when you have no other life insurance, your dependents are grown and financially independent, and your primary goal is to make sure your death doesn't leave a family member scrambling to cover funeral costs. If you have savings earmarked for that purpose, you may not need a policy at all.</p>

<p>It doesn't make sense as a substitute for income-replacement coverage. If you have a spouse, kids, or dependents who rely on your income, the death benefit on a final expense policy is too small to protect them financially. You need a full life insurance policy for that — and you should buy it while you're young enough to get it at a reasonable rate.</p>

<h2>Watch out for aggressive marketing.</h2>

<p>Final expense insurance is heavily marketed by mail, TV, and phone to older adults. The products themselves are legitimate, but some policies are more expensive than necessary, some have gotchas in the waiting period language, and some salespeople steer buyers toward guaranteed issue when a simplified issue policy (cheaper, faster payout) would qualify them just fine.</p>

<p>Work with an independent agent who sells multiple final expense carriers. They can compare pricing and terms across the market and place you in the right product for your health profile.</p>

<div class="article-cta-box">
  <strong>Find a verified local agent to compare final expense options.</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Search your city</a>
</div>
`,
  },
  {
    slug: 'life-insurance-self-employed',
    title: 'Life Insurance When You\'re Self-Employed: What\'s Different',
    category: 'Buying Life Insurance',
    description: 'No group plan. No employer contribution. Variable income. Self-employed buyers face a different set of questions when it comes to life insurance — here\'s how to navigate them.',
    readTime: '5 min read',
    published: '2026-11-11',
    body: `
<p>When you work for someone else, life insurance is often something that shows up in your benefits packet and mostly handles itself. When you're self-employed, there's no benefits packet — and the stakes are usually higher, because your business and your personal finances are tangled together in ways a salaried employee's aren't.</p>

<h2>The income picture looks different.</h2>

<p>Life insurance underwriting uses your income to help size your coverage. For W-2 earners, that's straightforward: last year's salary. For the self-employed, underwriters typically want to see two years of tax returns to establish a stable income baseline.</p>

<p>If your income varies significantly year to year, or if the most recent tax year was lower than usual (a common situation for new businesses or anyone who had a slow year), that can affect what coverage amount you qualify for at standard rates.</p>

<p>The practical implication: if you've had a strong recent year, don't wait. Locking in coverage now, based on current income, is better than waiting for next year's return when the picture might look different.</p>

<h2>No group coverage means you're the entire safety net.</h2>

<p>Employer-sponsored life insurance typically gives employees one or two times their salary in coverage as a base benefit. It's not enough — but it's something. As a self-employed person, you have nothing unless you've put something in place yourself.</p>

<p>That means your spouse, your dependents, and your business all depend on whatever individual policy you've bought. The coverage floor needs to be realistic about what your income actually supports.</p>

<h2>Business-specific coverage needs.</h2>

<p>If your business has partners, employees, or would be difficult to wind down quickly, you may need coverage beyond a personal policy:</p>

<ul>
  <li><strong>Key-person insurance.</strong> A policy owned by the business that pays the business — not a family member — when a key person dies. The benefit covers the cost of replacing that person, covering revenue loss during transition, or funding a buyout.</li>
  <li><strong>Buy-sell agreement funding.</strong> If you have business partners, a buy-sell agreement typically requires that the remaining partners buy out the deceased partner's share. Life insurance is the standard way to fund that buyout. Without it, surviving partners may have to take on debt or liquidate assets to pay the estate.</li>
  <li><strong>Business debt protection.</strong> If your business carries a loan backed by personal guarantees, your estate inherits that liability when you die. A term policy sized to cover business debt protects your family from that exposure.</li>
</ul>

<h2>Deductibility.</h2>

<p>Personal life insurance premiums are generally not tax-deductible — this applies whether you're self-employed or not. Business-owned policies used for key-person or buy-sell purposes are also typically not deductible by the business. If a financial advisor or agent tells you otherwise, ask them to show you the IRS provision they're citing.</p>

<h2>What to actually do.</h2>

<p>Start with a personal term policy sized to your income and your family's actual needs — a DIME analysis (Debt, Income, Mortgage, Education) is a reasonable starting point. Then separately assess whether the business needs key-person or buy-sell coverage. These are two different risk categories and two different policies.</p>

<p>An independent local agent who regularly works with business owners can walk through both sides of the picture without having to refer you elsewhere. That's what you're looking for.</p>

<div class="article-cta-box">
  <strong>Find a verified local agent familiar with self-employed coverage.</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Search agents near you</a>
</div>
`,
  },
  {
    slug: 'independent-vs-captive-agent',
    title: 'Independent vs. Captive Agent: Why It Matters More Than You Think',
    category: 'Agent Verification',
    description: 'A captive agent works for one company. An independent agent works for you. The difference changes what options you see, what rates you\'re quoted, and what happens at claim time.',
    readTime: '4 min read',
    published: '2026-11-11',
    body: `
<p>When you go looking for a life insurance agent, you're likely to encounter two completely different types of people who use the same job title. Understanding the difference — before you sit down with either one — changes what you get out of the conversation.</p>

<h2>What a captive agent is.</h2>

<p>A captive agent is contracted exclusively with one insurance company. They sell that company's products and only that company's products. Common examples include agents who work for New York Life, Northwestern Mutual, State Farm, or Primerica.</p>

<p>Being captive doesn't make an agent bad at their job. Many captive agents are genuinely skilled at explaining coverage and serving clients. But their product shelf is limited to what their employer offers — full stop. If another carrier has better underwriting for your health profile, or a lower premium for the same coverage, your captive agent either doesn't know or can't offer it.</p>

<h2>What an independent agent is.</h2>

<p>An independent agent — sometimes called an independent broker — has appointments with multiple carriers. Depending on the agent, that might mean 10 companies or 40. When you work with an independent agent, they shop your profile across the market and place you with the carrier that offers the best combination of pricing, terms, and underwriting for your situation.</p>

<p>Their compensation still comes from the carrier as a commission built into the premium — you don't pay them directly. But because they can place business with multiple companies, their incentive is to find you the right fit rather than the only product they're authorized to sell.</p>

<h2>Why this matters for pricing.</h2>

<p>Life insurance underwriting is not uniform across carriers. One company may charge someone with controlled high blood pressure a standard rate; another may apply a surcharge. One company might be aggressive on preferred rates for former smokers who've been tobacco-free for three years; another requires five. One carrier's preferred plus rate tier might be another carrier's standard rate.</p>

<p>An independent agent who knows the market can often find meaningful savings — 20–40% — by placing you with the carrier whose underwriting favors your specific profile. A captive agent doesn't have that option.</p>

<h2>Why this matters at claim time.</h2>

<p>Your agent is also your advocate when a claim is filed. If your beneficiary is dealing with a delayed or contested claim, having an agent who is not an employee of the carrier filing the dispute matters. An independent agent isn't on the carrier's payroll. Their relationship is with you and your family, not with any single insurer.</p>

<h2>How to tell which type you're talking to.</h2>

<p>The simplest question: "Which carriers can you place me with?" If the agent names one company or hedges the answer, they're likely captive. An independent agent will give you a direct answer: "I work with about 20 carriers — here are the ones I'd consider for your situation and why."</p>

<p>Every agent listed on MeetLifeAgents is an independent agent. That's part of the vetting criteria — not because captive agents are unethical, but because shopping the market on a buyer's behalf is the job description we're built to support.</p>

<div class="article-cta-box">
  <strong>Find a verified independent agent in your city.</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Search agents</a>
</div>
`,
  },
  {
    slug: 'when-to-update-your-beneficiary',
    title: 'When to Update Your Life Insurance Beneficiary (And Why It\'s Urgent)',
    category: 'Policy Management',
    description: 'Your beneficiary designation overrides your will. If the name on your policy is wrong — an ex-spouse, a deceased parent — the payout goes to the wrong person regardless of your intentions.',
    readTime: '4 min read',
    published: '2026-11-11',
    body: `
<p>Life insurance beneficiary designations are one of the most overlooked documents in personal finance. Most people set them once, when they first buy the policy, and never look at them again. That's a mistake — because a lot can change between when you bought the policy and when it pays out.</p>

<h2>The most important thing to understand: beneficiary designations override your will.</h2>

<p>Your will directs how your estate is distributed after death. Your life insurance beneficiary designation is a contract with the insurance company that is entirely separate from your estate. The carrier will pay the named beneficiary regardless of what your will says.</p>

<p>This means if your policy still names an ex-spouse as beneficiary after a divorce, the carrier will pay your ex-spouse — even if your will names your current spouse. This has happened in court cases numerous times. The named beneficiary wins.</p>

<h2>Life events that require a beneficiary review.</h2>

<ul>
  <li><strong>Marriage.</strong> Your new spouse isn't automatically your beneficiary. You have to change it.</li>
  <li><strong>Divorce.</strong> Some states automatically revoke an ex-spouse's beneficiary designation after divorce — but many don't. Don't assume. Update it.</li>
  <li><strong>Birth of a child.</strong> If you want your children included, they need to be listed. Naming minor children directly can create complications — the carrier typically can't pay a minor directly, which may require court-appointed guardianship over the funds. Consider naming a trust or a custodian under your state's UTMA laws instead.</li>
  <li><strong>Death of a named beneficiary.</strong> If your primary beneficiary predeceases you and you have no contingent beneficiary listed, the proceeds may pass through your estate — a slower, more expensive process than a direct payout.</li>
  <li><strong>Estrangement or relationship changes.</strong> Life changes. The person who made sense as your beneficiary ten years ago may not be the right choice today.</li>
</ul>

<h2>Primary vs. contingent beneficiaries.</h2>

<p>Your primary beneficiary receives the payout. Your contingent beneficiary receives it only if the primary predeceases you or can't be located. Many people name a primary beneficiary and leave the contingent blank — meaning if the primary dies first, the proceeds go through probate. Name both.</p>

<h2>How to update your beneficiary.</h2>

<p>Contact the insurance carrier directly or through your agent. Most carriers have a beneficiary change form — either paper or online. You'll typically need the full legal name, Social Security number, date of birth, and relationship to you for each beneficiary.</p>

<p>The change takes effect when the carrier processes it, not when you fill out the form. Follow up to confirm it was received and recorded. Keep a copy.</p>

<h2>Review it every few years regardless.</h2>

<p>Even if nothing dramatic has changed in your life, reviewing your beneficiary designations every three to five years is good practice. People's circumstances change — a beneficiary who was financially stable may no longer be, and naming a large sum to someone in financial crisis isn't always the best outcome.</p>

<p>Your local agent can walk you through a full policy review, including beneficiary designations. It takes about an hour and costs nothing.</p>

<div class="article-cta-box">
  <strong>Connect with a verified local agent for a full policy review.</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Find an agent near you</a>
</div>
`,
  },
  {
    slug: 'life-insurance-mistakes-40s-50s',
    title: '6 Life Insurance Mistakes People Make in Their 40s and 50s',
    category: 'Buying Life Insurance',
    description: 'Your 40s and 50s are when life insurance decisions have the most consequences — and the most ways to go wrong. Here are the mistakes worth avoiding.',
    readTime: '6 min read',
    published: '2026-11-11',
    body: `
<p>Buying life insurance in your 40s and 50s is fundamentally different from buying it in your 30s. The stakes are higher, the premiums are higher, the health questions are more complicated, and the decisions you make lock in for a long time. Here are the mistakes that show up most often in this age range.</p>

<h2>1. Waiting because you feel fine right now.</h2>

<p>People in their 40s often delay purchasing coverage because they feel healthy and assume they'll still be insurable when they "get around to it." The problem is that underwriting looks at your health at the moment of application — not how you felt five years ago.</p>

<p>Between 40 and 55, it's common to pick up diagnoses that meaningfully affect life insurance premiums or eligibility: high blood pressure, elevated cholesterol, pre-diabetes, sleep apnea, or cardiovascular findings on a routine exam. None of these necessarily make you uninsurable, but all of them raise your rates compared to a clean bill of health. The window to buy at standard rates closes faster than most people expect.</p>

<h2>2. Only keeping group coverage through work.</h2>

<p>Employer-provided group coverage is better than nothing. It's also not portable and not sufficient. When you leave your job — through a layoff, a career change, or retirement — that coverage ends. At 54, re-qualifying for individual coverage from scratch is significantly more expensive than it was at 42. Buy individual coverage while you have options.</p>

<h2>3. Underestimating how long the kids will be dependent.</h2>

<p>The intuitive coverage endpoint is "until the kids graduate college." In reality, many adult children in their 20s remain financially tethered to their parents longer than previous generations — through graduate school, career transitions, or just the economics of launching in an expensive housing market. If you're in your mid-50s and your youngest is 20, don't assume your coverage need evaporates in two years.</p>

<h2>4. Buying too short a term.</h2>

<p>People in their late 40s sometimes buy a 10-year term policy because the premium is lower. The problem is what happens at 58 when the policy expires: you're in your late 50s, potentially with new health conditions, and you need to requalify for coverage you still need. A 20-year term bought at 48 covers you to 68 — through the full mortgage payoff, through the years your spouse is most financially dependent on your income. The difference in monthly premium between a 10- and 20-year term in your late 40s is usually modest compared to the coverage risk you're accepting.</p>

<h2>5. Not revisiting coverage after a major financial change.</h2>

<p>People review coverage when they buy it and rarely after. But in your 40s and 50s, your financial picture changes significantly: the mortgage balance drops, the kids start working, you accumulate more savings. The gap between what your family needs and what you have may shrink substantially — meaning you might be overinsured on one policy and underinsured on another. A policy review every 3–5 years is the right cadence.</p>

<h2>6. Working with a captive agent who can't shop the market.</h2>

<p>In your 40s and 50s, underwriting variation between carriers matters more than it does for a healthy 32-year-old. If you have any health conditions — even well-managed ones — different carriers will treat them differently in terms of rate class. An agent who can only offer you one carrier's products is an agent who can't tell you whether another company would rate you more favorably. That gap can mean hundreds of dollars a year for the same coverage.</p>

<p>Work with an independent agent who has appointments across the market and will show you multiple quotes before recommending a placement.</p>

<div class="article-cta-box">
  <strong>Find a verified independent agent who can shop the full market for your profile.</strong>
  <a href="/" class="btn-ink" style="margin-top:16px;display:inline-block;">Search agents near you</a>
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
