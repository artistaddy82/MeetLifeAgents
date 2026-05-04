'use strict'
const { head, header, footer } = require('./layout')

/* ── shared helpers ─────────────────────────────────────────────────────── */

function pageHero(eyebrow, title, sub) {
  return `<section class="pg-hero">
  <div class="container">
    <p class="city-eyebrow" style="padding-top:40px;">${eyebrow}</p>
    <h1 class="display pg-hero-title">${title}</h1>
    ${sub ? `<p class="pg-hero-sub">${sub}</p>` : ''}
  </div>
</section>`
}

/* ── 404 ─────────────────────────────────────────────────────────────────── */

function notFoundPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  return `${head({ title: 'Page not found — MeetLifeAgents', description: 'The page you were looking for could not be found. Find a verified local life insurance agent.', canonical: `${siteUrl}/404/` })}
<body>
${header()}
<section class="pg-hero" style="text-align:center;padding-bottom:80px;">
  <div class="container">
    <div class="nf-big">404</div>
    <h1 class="display pg-hero-title">Page not found.</h1>
    <p class="pg-hero-sub" style="margin:0 auto 40px;">That page has moved or doesn't exist. Use the search below to find a verified agent in your city.</p>
    <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-bottom:60px;">
      <a href="/" class="btn-ink">Find an agent →</a>
      <a href="/how-it-works/" class="btn-outline">How it works</a>
    </div>
    <p style="font-size:13px;color:var(--ink-soft);margin-bottom:20px;letter-spacing:0.06em;text-transform:uppercase;font-weight:600;">Or browse by state</p>
    <div class="nf-states">
      <a href="/al/">Alabama</a><a href="/az/">Arizona</a><a href="/ca/">California</a>
      <a href="/fl/">Florida</a><a href="/ga/">Georgia</a><a href="/nc/">North Carolina</a>
      <a href="/sc/">South Carolina</a><a href="/tn/">Tennessee</a><a href="/tx/">Texas</a>
      <a href="/il/">Illinois</a><a href="/in/">Indiana</a><a href="/oh/">Ohio</a>
    </div>
  </div>
</section>
${footer()}
</body>
</html>`
}

/* ── HOW IT WORKS ────────────────────────────────────────────────────────── */

function howItWorksPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const faqs = [
    ['Is MeetLifeAgents free for consumers?',
     'Yes. You pay nothing. Agents pay a small connection fee when they receive a lead — similar to how a contractor pays a referral service. The consumer experience is always free.'],
    ['Will I get spam calls after I submit my information?',
     'No. Your contact info goes to the one matched agent — not a waterfall of 50 buyers. You\'ll hear from that one agent. See our <a href="/tcpa/">TCPA disclosure</a> for the full consent language.'],
    ['How do I know the agent is actually licensed?',
     'Every agent card links directly to their NPN (National Producer Number) on the state DOI lookup tool. You can verify the license yourself in 30 seconds — no trust required.'],
    ['What if I don\'t like the agent I connect with?',
     'Go back to the city page and choose another. All agents on the page are vetted — the choice is always yours.'],
    ['Are the agents employees of MeetLifeAgents?',
     'No. All agents are independent contractors running their own businesses. MeetLifeAgents is a directory — we connect, we don\'t employ or supervise.'],
  ]
  const steps = [
    ['Find your city',        'Use our homepage search to find your state and city. We cover 127 cities across 29 states. If yours isn\'t listed, the nearest city page will still match you with the closest verified agent.'],
    ['Review verified agents','Every agent on the site has passed our four-point vetting: active state license, resident of the state they serve, 10+ independent carrier appointments, and a clean DOI complaint record.'],
    ['Contact them directly', 'Click "Call Agent" to reveal the agent\'s routing extension. Second tap dials — their phone rings. Or fill in our 3-step form for a callback. Either way, you choose who you talk to.'],
    ['We step back',          'After you connect, the conversation is between you and the agent. MeetLifeAgents doesn\'t take commissions or influence product recommendations. We connect — then get out of the way.'],
  ]

  return `${head({ title: 'How It Works — MeetLifeAgents', description: 'How MeetLifeAgents connects you with verified local life insurance agents. Simple, transparent, no spam.', canonical: `${siteUrl}/how-it-works/` })}
<body>
${header()}

<!-- ── HERO: split with old-way vs our-way contrast card ── -->
<section class="hiw-hero">
  <div class="container">
    <div class="hiw-hero-grid">
      <div class="hiw-hero-left">
        <p class="city-eyebrow">How it works</p>
        <h1 class="display pg-hero-title">Meet a real agent.<br><em>No spam. No runaround.</em></h1>
        <p class="pg-hero-sub">Most insurance sites sell your contact info to dozens of agents who call for weeks. We work differently — you browse, you pick, you call.</p>
        <div class="hiw-hero-btns">
          <a href="/" class="btn-ink">Find an agent →</a>
          <a href="/our-vetting/" class="btn-outline">Our vetting standard</a>
        </div>
      </div>
      <div class="hiw-contrast-card">
        <div class="hiw-cc-side">
          <div class="hiw-cc-label hiw-cc-label--bad">The old way</div>
          <div class="hiw-cc-item hiw-cc-item--bad"><span class="hiw-cc-x">✗</span>Fill out a generic form</div>
          <div class="hiw-cc-item hiw-cc-item--bad"><span class="hiw-cc-x">✗</span>Your info sold to 50 agents</div>
          <div class="hiw-cc-item hiw-cc-item--bad"><span class="hiw-cc-x">✗</span>50 agents call for weeks</div>
          <div class="hiw-cc-item hiw-cc-item--bad"><span class="hiw-cc-x">✗</span>You have no control</div>
        </div>
        <div class="hiw-cc-divider"></div>
        <div class="hiw-cc-side">
          <div class="hiw-cc-label hiw-cc-label--good">MeetLifeAgents</div>
          <div class="hiw-cc-item hiw-cc-item--good"><span class="hiw-cc-check">✓</span>Browse vetted local agents</div>
          <div class="hiw-cc-item hiw-cc-item--good"><span class="hiw-cc-check">✓</span>You pick who to contact</div>
          <div class="hiw-cc-item hiw-cc-item--good"><span class="hiw-cc-check">✓</span>One call. One agent.</div>
          <div class="hiw-cc-item hiw-cc-item--good"><span class="hiw-cc-check">✓</span>You stay in control</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── 4 STEPS: full-width horizontal rows ──────────────── -->
<section class="hiw-steps-sec">
  <div class="container">
    <div class="hiw-steps-head">
      <p class="city-eyebrow">The process</p>
      <h2 class="display" style="font-size:clamp(28px,3.5vw,42px);line-height:1.1;">Four steps from search<br>to handshake.</h2>
    </div>
    ${steps.map(([title, text], i) => `<div class="hiw-step-row${i === steps.length - 1 ? ' hiw-step-row--last' : ''}">
      <div class="hiw-step-num-big">${i + 1}</div>
      <div class="hiw-step-content">
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
    </div>`).join('')}
  </div>
</section>

<!-- ── DARK TRUST STRIP ──────────────────────────────────── -->
<section class="trust-bar">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-item"><div class="trust-num">127</div><div class="trust-label">cities covered across 29 states</div></div>
      <div class="trust-item"><div class="trust-num">0</div><div class="trust-label">spam calls — your info goes to one agent</div></div>
      <div class="trust-item"><div class="trust-num">10+</div><div class="trust-label">carrier appointments required per agent</div></div>
      <div class="trust-item"><div class="trust-num">100%</div><div class="trust-label">license-verified through state DOIs</div></div>
    </div>
  </div>
</section>

<!-- ── FAQ ───────────────────────────────────────────────── -->
<section style="padding:80px 0;background:var(--cream-warm);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);">
  <div class="container">
    <div class="hiw-faq-layout">
      <div>
        <p class="city-eyebrow">Common questions</p>
        <h2 class="display" style="font-size:clamp(28px,3.5vw,40px);line-height:1.1;">Everything you<br>might wonder.</h2>
      </div>
      <div class="hiw-faq-list">
        ${faqs.map(([q,a]) => `<details class="faq-item">
          <summary>${q}</summary>
          <p>${a}</p>
        </details>`).join('\n')}
      </div>
    </div>
  </div>
</section>

<!-- ── DARK CTA ───────────────────────────────────────────── -->
<section class="intake" style="padding:72px 0;text-align:center;">
  <div class="container">
    <h2 class="display" style="font-size:clamp(28px,4vw,46px);color:var(--cream);margin-bottom:16px;">Ready to meet a local agent?</h2>
    <p style="color:rgba(250,246,238,0.75);font-size:17px;margin-bottom:36px;">No account. No credit card. Just find your city.</p>
    <a href="/" class="btn-cream" style="font-size:16px;padding:16px 36px;">Find an agent in your city →</a>
  </div>
</section>

${footer()}
</body>
</html>`
}

/* ── OUR VETTING ─────────────────────────────────────────────────────────── */

function ourVettingPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const checks = [
    ['Active state insurance license',
     'Verified directly through the state DOI\'s NIPR/SERFF lookup. Current — not expired, lapsed, or surrendered.',
     'NIPR · State DOI lookup · NPN confirmed active'],
    ['Resident of the state they serve',
     'A genuine resident — not a remote agent using a non-resident license. Consumers deserve someone who knows their community.',
     'State residence address · Non-resident license rejected'],
    ['10+ independent carrier appointments',
     'Truly independent agents can shop 10+ carriers for you. Fewer and they may steer toward what pays them, not what fits you.',
     '10+ active appointments required · Carrier list verified'],
    ['Clean DOI complaint record',
     'We review disciplinary history on the state DOI. Any upheld complaints in the last 5 years disqualify from listing.',
     'State DOI disciplinary history · 5-year lookback'],
  ]

  return `${head({ title: 'Our Vetting Standard — MeetLifeAgents', description: 'How MeetLifeAgents vets life insurance agents. Three tiers: Verified, Premier, and Elite Top Tier.', canonical: `${siteUrl}/our-vetting/` })}
<body>
${header()}

<!-- ── DARK HERO ───────────────────────────────────────── -->
<section class="ov-dark-hero">
  <div class="container" style="text-align:center;">
    <p class="city-eyebrow" style="color:var(--gold-soft);">Our vetting standard</p>
    <h1 class="display ov-dark-title">Every agent on this site<br><em>earned their spot.</em></h1>
    <p class="ov-dark-sub">We check four things before any agent appears in our directory. Here's exactly what we verify — and what each tier means.</p>
    <div class="ov-dark-stats">
      <div class="ov-dark-stat">
        <div class="ov-dark-stat-num">4</div>
        <div class="ov-dark-stat-label">mandatory gates</div>
      </div>
      <div class="ov-dark-stat">
        <div class="ov-dark-stat-num">3</div>
        <div class="ov-dark-stat-label">verified tiers</div>
      </div>
      <div class="ov-dark-stat">
        <div class="ov-dark-stat-num">0</div>
        <div class="ov-dark-stat-label">exceptions made</div>
      </div>
    </div>
  </div>
</section>

<!-- ── FOUR CHECKS: full-width audit rows ─────────────── -->
<section class="ov-audit-sec">
  <div class="container">
    <div class="ov-audit-head">
      <p class="city-eyebrow">Baseline — all agents</p>
      <h2 class="display" style="font-size:clamp(28px,3.5vw,42px);line-height:1.1;margin-bottom:12px;">Four checks.<br>No exceptions.</h2>
      <p style="font-size:16px;color:var(--ink-soft);line-height:1.65;max-width:520px;">Every agent must pass all four before they appear on the site. These aren't preferences — they're requirements.</p>
    </div>
    ${checks.map(([title, desc, how], i) => `<div class="ov-audit-row">
      <div class="ov-audit-num">${i + 1}</div>
      <div class="ov-audit-main">
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
      <div class="ov-audit-how">
        <div class="ov-audit-how-label">How we verify</div>
        <div class="ov-audit-how-text">${how}</div>
      </div>
    </div>`).join('')}
  </div>
</section>

<!-- ── TIER CARDS ─────────────────────────────────────── -->
<section style="background:var(--cream-warm);padding:80px 0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);">
  <div class="container">
    <div style="text-align:center;max-width:600px;margin:0 auto 56px;">
      <p class="city-eyebrow">Three tiers</p>
      <h2 class="display" style="font-size:clamp(28px,3.5vw,40px);">What each badge means.</h2>
    </div>
    <div class="ov-tiers">
      <div class="ov-tier ov-tier--verified">
        <div class="ov-tier-header">
          <span class="ov-tier-badge ov-badge--verified">Verified</span>
          <h3>Baseline tier</h3>
          <p>All four requirements above. The floor, not the ceiling.</p>
        </div>
        <ul class="side-list" style="margin-top:0;">
          <li>Active state insurance license</li>
          <li>State resident — not virtual-only</li>
          <li>10+ independent carrier appointments</li>
          <li>Clean DOI complaint record</li>
        </ul>
      </div>
      <div class="ov-tier ov-tier--premier">
        <div class="ov-tier-header">
          <span class="ov-tier-badge ov-badge--premier">Premier</span>
          <h3>Mid tier</h3>
          <p>All Verified criteria, plus experience and specialty.</p>
        </div>
        <ul class="side-list" style="margin-top:0;">
          <li>All Verified criteria</li>
          <li>5+ years licensed</li>
          <li>Documented specialty niche</li>
          <li>24-hour response standard</li>
        </ul>
      </div>
      <div class="ov-tier ov-tier--elite">
        <div class="ov-tier-header">
          <span class="ov-tier-badge ov-badge--elite">Elite · Top Tier</span>
          <h3>Gold treatment</h3>
          <p>All Premier criteria, plus designation, production, and references.</p>
        </div>
        <ul class="side-list" style="margin-top:0;">
          <li>All Premier criteria</li>
          <li>Advanced designation (CLU, ChFC, CFP, LUTCF)</li>
          <li>50+ written policies in stated specialty</li>
          <li>3+ verified professional references</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ── WHAT WE DON'T DO ───────────────────────────────── -->
<section style="padding:80px 0;border-bottom:1px solid var(--rule);">
  <div class="container">
    <div class="ov-nolist-layout">
      <div>
        <p class="city-eyebrow">What we don't do — and why</p>
        <h2 class="display" style="font-size:clamp(26px,3.2vw,36px);line-height:1.15;">The intentional<br>omissions.</h2>
      </div>
      <div class="ov-nolist">
        <div class="ov-no-item">
          <span class="ov-no-x">⊘</span>
          <div><strong>No star ratings at launch.</strong><p>FTC Endorsement Guide compliance and state DOI rules require a rigorous collection process we're building toward. Misleading stars hurt consumers.</p></div>
        </div>
        <div class="ov-no-item">
          <span class="ov-no-x">⊘</span>
          <div><strong>No carrier logos.</strong><p>Most carriers prohibit unauthorized logo use and will send C&D letters. Listing carrier names as text is accurate and legally safe.</p></div>
        </div>
        <div class="ov-no-item">
          <span class="ov-no-x">⊘</span>
          <div><strong>No continuous license monitoring (yet).</strong><p>We verify at onboarding. Click the NPN verify link on any agent card to confirm current license status directly on the state DOI.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── DARK CTA ───────────────────────────────────────── -->
<section style="padding:72px 0;text-align:center;background:var(--ink);">
  <div class="container">
    <h2 class="display" style="font-size:clamp(26px,3.5vw,40px);color:var(--cream);margin-bottom:16px;">Find a vetted agent in your city.</h2>
    <p style="color:rgba(250,246,238,0.7);font-size:17px;margin-bottom:32px;">127 cities. 29 states. Every agent license-checked.</p>
    <a href="/" class="btn-cream" style="font-size:16px;padding:16px 36px;">Search the directory →</a>
  </div>
</section>

${footer()}
</body>
</html>`
}

/* ── CONTACT ─────────────────────────────────────────────────────────────── */

function contactPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const apiUrl  = config.apiUrl  || 'https://sidecarleads.com'
  return `${head({ title: 'Contact — MeetLifeAgents', description: 'Contact the MeetLifeAgents team. Questions about agents, vetting standards, or the directory.', canonical: `${siteUrl}/contact/` })}
<body>
${header()}

<!-- ── DARK TOP: headline + response facts ────────────── -->
<section class="contact-top">
  <div class="container">
    <div class="contact-top-grid">
      <div>
        <p class="city-eyebrow" style="color:var(--gold-soft);">Get in touch</p>
        <h1 class="display contact-top-title">We read<br>every message.</h1>
        <p class="contact-top-sub">Questions about the directory, agent vetting, or how it works. Our team responds to every inquiry.</p>
      </div>
      <div class="contact-top-facts">
        <div class="contact-fact">
          <div class="contact-fact-num">1 day</div>
          <div class="contact-fact-label">response time</div>
        </div>
        <div class="contact-fact">
          <div class="contact-fact-num">M – F</div>
          <div class="contact-fact-label">hours of operation</div>
        </div>
        <div class="contact-fact">
          <div class="contact-fact-num">Human</div>
          <div class="contact-fact-label">every reply, no bots</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── FORM + SIDEBAR ────────────────────────────────── -->
<section style="padding:72px 0;">
  <div class="container">
    <div class="contact-layout">

      <!-- FORM -->
      <div class="contact-form-col">
        <form id="contact-form" onsubmit="submitContact(event)">
          <div class="cf-field">
            <label for="cf-name">Your name</label>
            <input id="cf-name" type="text" name="name" placeholder="First and last name" required autocomplete="name">
          </div>
          <div class="cf-field">
            <label for="cf-email">Email address</label>
            <input id="cf-email" type="email" name="email" placeholder="you@example.com" required autocomplete="email">
          </div>
          <div class="cf-field">
            <label for="cf-subject">What's this about?</label>
            <div class="select-wrap" style="width:100%;">
              <select id="cf-subject" name="subject">
                <option value="">Select a topic…</option>
                <option value="agent-question">Question about an agent listing</option>
                <option value="vetting">Agent vetting standards</option>
                <option value="agent-apply">I'm an agent — I want to join</option>
                <option value="data-correction">Incorrect information on a listing</option>
                <option value="opt-out">Opt-out / data deletion request</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="cf-field">
            <label for="cf-message">Message</label>
            <textarea id="cf-message" name="message" rows="6" placeholder="Tell us what's on your mind…" required></textarea>
          </div>
          <button type="submit" class="btn-ink" style="width:100%;padding:16px;font-size:15px;">Send message</button>
          <div id="cf-success" style="display:none;margin-top:16px;padding:18px;background:#e8f5e9;border-radius:6px;color:#2d6a4f;font-size:14px;font-weight:600;">
            ✓ Message sent — we'll respond within 1 business day.
          </div>
          <div id="cf-error" style="display:none;margin-top:16px;padding:18px;background:#fde8e4;border-radius:6px;color:#a64d3a;font-size:14px;">
            Something went wrong. Please try again.
          </div>
        </form>
      </div>

      <!-- SIDEBAR -->
      <aside class="contact-info-col">
        <div class="side-card">
          <h4>For consumers</h4>
          <p>Looking for an agent? Use our <a href="/" style="color:var(--gold);">directory search</a> — no contact form needed. Just choose your city.</p>
        </div>
        <div class="side-card">
          <h4>For agents</h4>
          <p>Want to join the network? <a href="/agents/apply/" style="color:var(--gold);">Apply here</a>. We review applications within 5 business days.</p>
        </div>
        <div class="promise-card">
          <h4>Response time</h4>
          <p>Every message gets a human response within 1 business day, Monday–Friday.</p>
        </div>
        <div class="side-card">
          <h4>Data requests</h4>
          <p>To request deletion of your personal data under CCPA, GDPR, or similar, choose "Opt-out / data deletion request" in the subject dropdown.</p>
        </div>
      </aside>

    </div>
  </div>
</section>

<script>
async function submitContact(e) {
  e.preventDefault();
  const form = e.target, btn = form.querySelector('button[type=submit]');
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    const res = await fetch('${apiUrl}/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), source: 'meetlifeagents-contact' })
    });
    if (res.ok) { form.reset(); document.getElementById('cf-success').style.display = 'block'; }
    else throw 0;
  } catch { document.getElementById('cf-error').style.display = 'block'; btn.disabled = false; btn.textContent = 'Send message'; }
}
</script>
${footer()}
</body>
</html>`
}

/* ── PRIVACY ─────────────────────────────────────────────────────────────── */

function privacyPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  return `${head({ title: 'Privacy Policy — MeetLifeAgents', description: 'MeetLifeAgents privacy policy. How we collect, use, and protect your information.', canonical: `${siteUrl}/privacy/` })}
<body>
${header()}
${pageHero('Legal', 'Privacy Policy', 'Last updated May 1, 2026 · Template pending attorney review before publication.')}
<section style="padding:80px 0;border-top:1px solid var(--rule);">
  <div class="container">
    <div class="legal-layout">
      <nav class="legal-toc">
        <p class="legal-toc-head">Contents</p>
        <a href="#who">1. Who we are</a>
        <a href="#collect">2. Information we collect</a>
        <a href="#use">3. How we use it</a>
        <a href="#share">4. How we share it</a>
        <a href="#tcpa">5. TCPA consent</a>
        <a href="#retention">6. Data retention</a>
        <a href="#cookies">7. Cookies</a>
        <a href="#rights">8. Your rights</a>
        <a href="#ccpa">9. California (CCPA)</a>
        <a href="#security">10. Security</a>
        <a href="#children">11. Children</a>
        <a href="#changes">12. Changes</a>
      </nav>
      <div class="legal-body">
        <div class="legal-notice">⚠ This is a template. Do not publish without review by a qualified insurance regulatory attorney.</div>

        <h2 id="who">1. Who we are</h2>
        <p>MeetLifeAgents ("we," "our," or "us") operates MeetLifeAgents.com, an independent directory connecting consumers with independently licensed life insurance agents. We are not an insurance agency, company, or broker and do not sell or underwrite insurance policies.</p>

        <h2 id="collect">2. Information we collect</h2>
        <p>We collect information you voluntarily provide, including: <strong>contact form submissions</strong> (name, phone, email, coverage interest); <strong>call data</strong> (date, time, duration — not call content); and <strong>usage data</strong> via Cloudflare Web Analytics (aggregate, privacy-preserving, no cookies).</p>

        <h2 id="use">3. How we use your information</h2>
        <p>Information you submit is used solely to match you with a licensed local agent, send that agent your contact information, and comply with legal obligations. We do not sell personal information or use it for behavioral advertising.</p>

        <h2 id="share">4. How we share your information</h2>
        <p>When you submit a lead form, your contact information is shared with the matched agent(s) in our network. By submitting, you consent to being contacted by these agents about life insurance products. Agents are independent contractors, not MeetLifeAgents employees. We may share information with service providers under data processing agreements.</p>

        <h2 id="tcpa">5. TCPA consent</h2>
        <p>By submitting our contact form, you expressly consent to be contacted by MeetLifeAgents and matched agents via phone (including autodialed or prerecorded calls), text, or email — even if your number is on a Do Not Call registry. See our <a href="/tcpa/">TCPA Disclosure</a>.</p>

        <h2 id="retention">6. Data retention</h2>
        <p>Lead form submissions are retained for up to 24 months. You may request deletion at any time via our <a href="/contact/">contact page</a>.</p>

        <h2 id="cookies">7. Cookies and tracking</h2>
        <p>We do not use Google Analytics, Facebook Pixel, or behavioral trackers. Cloudflare Web Analytics uses no cookies and collects only aggregate, anonymized data.</p>

        <h2 id="rights">8. Your rights</h2>
        <p>Depending on your state, you may have rights including access, correction, deletion, and opt-out of data sale (we do not sell data). Contact us via our <a href="/contact/">contact page</a> to exercise these rights.</p>

        <h2 id="ccpa">9. California residents (CCPA)</h2>
        <p>California residents have additional rights under CCPA. We do not sell personal information. You may request a copy of what we collect by contacting us.</p>

        <h2 id="security">10. Security</h2>
        <p>We use industry-standard security measures. No internet transmission is 100% secure. Use caution when transmitting sensitive information.</p>

        <h2 id="children">11. Children's privacy</h2>
        <p>Our site is not directed to children under 13. We do not knowingly collect personal information from children.</p>

        <h2 id="changes">12. Changes to this policy</h2>
        <p>We may update this policy periodically. Material changes will be noted with an updated "Last updated" date. Continued use constitutes acceptance.</p>
      </div>
    </div>
  </div>
</section>
${footer()}
</body>
</html>`
}

/* ── TERMS ───────────────────────────────────────────────────────────────── */

function termsPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  return `${head({ title: 'Terms of Service — MeetLifeAgents', description: 'MeetLifeAgents terms of service. Read before using this directory.', canonical: `${siteUrl}/terms/` })}
<body>
${header()}
${pageHero('Legal', 'Terms of Service', 'Last updated May 1, 2026 · Template pending attorney review before publication.')}
<section style="padding:80px 0;border-top:1px solid var(--rule);">
  <div class="container">
    <div class="legal-layout">
      <nav class="legal-toc">
        <p class="legal-toc-head">Contents</p>
        <a href="#accept">1. Acceptance</a>
        <a href="#what">2. What MeetLifeAgents is</a>
        <a href="#vetting">3. Vetting scope</a>
        <a href="#consumer">4. Consumer use</a>
        <a href="#noadvice">5. No insurance advice</a>
        <a href="#tcpa">6. TCPA consent</a>
        <a href="#ip">7. Intellectual property</a>
        <a href="#liability">8. Limitation of liability</a>
        <a href="#indemnity">9. Indemnification</a>
        <a href="#law">10. Governing law</a>
        <a href="#changes">11. Changes</a>
      </nav>
      <div class="legal-body">
        <div class="legal-notice">⚠ This is a template. Do not publish without review by a qualified insurance regulatory attorney.</div>

        <h2 id="accept">1. Acceptance of terms</h2>
        <p>By accessing or using MeetLifeAgents.com ("the Site"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Site.</p>

        <h2 id="what">2. What MeetLifeAgents is — and is not</h2>
        <p>MeetLifeAgents is an independent directory service. We connect consumers with independently licensed life insurance agents. We are <strong>not</strong> an insurance agency, broker, underwriter, or financial advisor. Any insurance transaction you enter into is solely between you and the agent.</p>

        <h2 id="vetting">3. Agent vetting — scope and limitations</h2>
        <p>We verify that listed agents hold an active state insurance license at the time of listing and meet our stated tier criteria. Our verification is based on publicly available DOI data. We do not guarantee agent availability, responsiveness, or quality of service, and we do not perform continuous license monitoring.</p>

        <h2 id="consumer">4. Consumer use</h2>
        <p>You may use the Site to search for and contact licensed agents in your area. You agree not to use the Site to harass agents, submit false contact information, or use the Site for any unlawful purpose.</p>

        <h2 id="noadvice">5. No insurance advice</h2>
        <p>Content on the Site is for informational purposes only. Nothing on the Site constitutes insurance, legal, financial, or tax advice. Always consult a licensed professional before making coverage decisions.</p>

        <h2 id="tcpa">6. TCPA and contact consent</h2>
        <p>By submitting a contact form, you consent to be contacted as described in our <a href="/tcpa/">TCPA Disclosure</a> and <a href="/privacy/">Privacy Policy</a>.</p>

        <h2 id="ip">7. Intellectual property</h2>
        <p>All content on the Site is owned by MeetLifeAgents or its licensors. Do not reproduce or redistribute without written permission.</p>

        <h2 id="liability">8. Limitation of liability</h2>
        <p>MeetLifeAgents shall not be liable for any damages arising from your use of the Site or your reliance on information found here. Our total liability to you shall not exceed $100 in any case.</p>

        <h2 id="indemnity">9. Indemnification</h2>
        <p>You agree to indemnify MeetLifeAgents against claims arising from your use of the Site or violation of these Terms.</p>

        <h2 id="law">10. Governing law</h2>
        <p>These Terms are governed by the laws of the State of Alabama. Disputes shall be resolved in the courts of Autauga County, Alabama.</p>

        <h2 id="changes">11. Changes</h2>
        <p>We may update these Terms. Continued use after changes constitutes acceptance.</p>
      </div>
    </div>
  </div>
</section>
${footer()}
</body>
</html>`
}

/* ── TCPA ────────────────────────────────────────────────────────────────── */

function tcpaPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  return `${head({ title: 'TCPA Disclosure — MeetLifeAgents', description: 'MeetLifeAgents TCPA disclosure and consent language for telephone and text communication.', canonical: `${siteUrl}/tcpa/` })}
<body>
${header()}
${pageHero('Legal', 'TCPA Disclosure', 'Last updated May 1, 2026 · Template pending attorney review before publication.')}
<section style="padding:80px 0;border-top:1px solid var(--rule);">
  <div class="container">
    <div class="legal-layout">
      <nav class="legal-toc">
        <p class="legal-toc-head">Contents</p>
        <a href="#what">1. What is the TCPA?</a>
        <a href="#consent">2. Your consent</a>
        <a href="#no-condition">3. Not required for purchase</a>
        <a href="#optout">4. How to opt out</a>
        <a href="#dnc">5. Do Not Call</a>
        <a href="#agents">6. Matched agents</a>
        <a href="#questions">7. Questions</a>
      </nav>
      <div class="legal-body">
        <div class="legal-notice">⚠ TCPA violations carry statutory damages of $500–$1,500 per call. Do not publish without review by a qualified TCPA and insurance regulatory attorney.</div>

        <h2 id="what">1. What is the TCPA?</h2>
        <p>The Telephone Consumer Protection Act (TCPA), 47 U.S.C. § 227, restricts telephone solicitations and use of automated telephone equipment. It requires prior express written consent before contacting you via autodialed or prerecorded calls or texts for marketing purposes.</p>

        <h2 id="consent">2. Your consent when submitting our form</h2>
        <p>When you submit a contact or lead form on MeetLifeAgents.com, you expressly authorize MeetLifeAgents and the matched agent(s) in our network to contact you via telephone (including autodialed or prerecorded calls), SMS/text messages, and email at the phone number and email you provided — <strong>even if your number is on a federal, state, or local Do Not Call registry</strong> — to discuss life insurance products and services you inquired about.</p>

        <h2 id="no-condition">3. Consent is not required for purchase</h2>
        <p>You are not required to provide consent as a condition of purchasing any property, goods, or services.</p>

        <h2 id="optout">4. How to opt out</h2>
        <p>You may revoke consent at any time by replying STOP to any text message, saying "stop" or "unsubscribe" during a call, or contacting us via our <a href="/contact/">contact page</a>. Opt-out requests are processed within 10 business days.</p>

        <h2 id="dnc">5. Do Not Call registry</h2>
        <p>Your submission of a contact form constitutes prior express written consent to be contacted notwithstanding registration on any Do Not Call list. If you do not wish to be contacted, do not submit the form.</p>

        <h2 id="agents">6. Matched agents</h2>
        <p>When you submit a form, your contact information may be shared with one or more independently licensed agents who match your coverage needs and location. Each agent may contact you independently in compliance with applicable TCPA requirements.</p>

        <h2 id="questions">7. Questions</h2>
        <p>For TCPA-related questions or opt-out requests, use our <a href="/contact/">contact page</a>.</p>
      </div>
    </div>
  </div>
</section>
${footer()}
</body>
</html>`
}

module.exports = { notFoundPage, privacyPage, termsPage, tcpaPage, contactPage, howItWorksPage, ourVettingPage }
