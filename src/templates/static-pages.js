'use strict'
const { head, header, footer, GLOBAL_SCRIPTS } = require('./layout')

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
    ['Find your city',        'Search by state and city — we cover 127 cities across 29 states. Not listed? We\'ll route you to the nearest verified agent.'],
    ['Review verified agents','Every agent passed four checks: active state license, state resident, 10+ independent carrier appointments, clean DOI record. No exceptions.'],
    ['Contact them directly', 'Click "Call Agent" to reveal their routing extension — second tap dials directly. Or request a callback from the city page. You choose.'],
    ['We step back',          'Once you\'re connected, MeetLifeAgents is done. No commissions, no product steering — just you and your agent.'],
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
        <h1 class="display pg-hero-title">Meet a real agent.<br><em style="color:var(--gold-soft);">No spam. No runaround.</em></h1>
        <p class="pg-hero-sub">Most insurance sites sell your contact info to dozens of agents who call for weeks. We work differently — you browse, you pick, you call.</p>
        <div class="hiw-hero-btns">
          <a href="/" class="btn-ink" data-find-cta>Find an agent →</a>
          <a href="/our-vetting/" class="btn-outline">Our vetting standard</a>
        </div>
        <p class="hiw-hero-trust">127 cities &nbsp;·&nbsp; 29 states &nbsp;·&nbsp; 100% license-verified</p>
      </div>
      <div class="hiw-contrast-card">
        <div class="hiw-cc-header">
          <div class="hiw-cc-label hiw-cc-label--bad">The old way</div>
          <div class="hiw-cc-label hiw-cc-label--good">MeetLifeAgents</div>
        </div>
        <div class="hiw-cc-row-item">
          <div class="hiw-cc-bad-cell"><span class="hiw-cc-x">✗</span>Fill out a generic form</div>
          <div class="hiw-cc-good-cell"><span class="hiw-cc-check">✓</span>Browse vetted agents</div>
        </div>
        <div class="hiw-cc-row-item">
          <div class="hiw-cc-bad-cell"><span class="hiw-cc-x">✗</span>Info sold to 50 buyers</div>
          <div class="hiw-cc-good-cell"><span class="hiw-cc-check">✓</span>You pick who to contact</div>
        </div>
        <div class="hiw-cc-row-item">
          <div class="hiw-cc-bad-cell"><span class="hiw-cc-x">✗</span>50 agents call for weeks</div>
          <div class="hiw-cc-good-cell"><span class="hiw-cc-check">✓</span>One call. One agent.</div>
        </div>
        <div class="hiw-cc-row-item hiw-cc-row-item--last">
          <div class="hiw-cc-bad-cell"><span class="hiw-cc-x">✗</span>You have no control</div>
          <div class="hiw-cc-good-cell"><span class="hiw-cc-check">✓</span>You stay in control</div>
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
    <a href="/" class="btn-cream" data-find-cta style="font-size:16px;padding:16px 36px;">Find an agent in your city →</a>
  </div>
</section>

${GLOBAL_SCRIPTS}
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
    <a href="/" class="btn-cream" data-find-cta style="font-size:16px;padding:16px 36px;">Search the directory →</a>
  </div>
</section>

${GLOBAL_SCRIPTS}
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

/* ── WHY INDEPENDENT AGENT ──────────────────────────────────────────────── */

function whyIndependentPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'

  const comparisons = [
    { dim: 'Carrier access',   captive: 'Sells products from one company only — their employer',         indep: 'Shops 10–30+ independent carriers to find your best fit' },
    { dim: 'Who they work for',captive: 'Employed or contracted by a single insurance carrier',           indep: 'Works for you — licensed independently, accountable to you' },
    { dim: 'Sales pressure',   captive: 'Carries a quota from their employer — has to sell their products', indep: 'No quota from any carrier — recommends what\'s right for your situation' },
    { dim: 'Product range',    captive: 'Limited to that company\'s term, whole, and UL lineup',           indep: 'Access to term, whole, IUL, GUL, and more across many carriers' },
    { dim: 'If you need to switch', captive: 'You start over — new agent, new application, new relationship', indep: 'Your agent re-shops the market without you starting from scratch' },
  ]

  const benefits = [
    { title: 'More options. Better price.',  body: 'When one agent shops 30+ carriers, you get competitive pricing without applying to 30 companies. Rates for the same coverage can vary 40% across carriers.' },
    { title: 'No conflict of interest.',      body: 'An independent agent earns commission from whoever places your policy — so their incentive is finding the carrier that approves you at the best rate, not pushing one brand.' },
    { title: 'One agent, your whole picture.',body: 'As your needs change — term today, whole life later, key-man coverage — an independent agent re-shops your full situation instead of you starting over.' },
  ]

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',              item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Why Independent',   item: `${siteUrl}/why-independent-agent/` },
      ]},
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'What is an independent life insurance agent?',
          acceptedAnswer: { '@type': 'Answer', text: 'An independent agent is licensed to sell life insurance from multiple carriers — not employed by or contracted to a single company. They shop the market on your behalf.' } },
        { '@type': 'Question', name: 'What is the difference between a captive and independent life insurance agent?',
          acceptedAnswer: { '@type': 'Answer', text: 'A captive agent sells products from one carrier (their employer). An independent agent accesses 10–30+ carriers and recommends based on your needs, not a company quota.' } },
      ]},
    ]
  })

  return `${head({ title: 'Why Use an Independent Life Insurance Agent — MeetLifeAgents', description: 'Independent agents shop 30+ carriers for your best rate — no quotas, no brand loyalty required. See why independent beats captive for most life insurance buyers.', canonical: `${siteUrl}/why-independent-agent/`, extraHead: `<script type="application/ld+json">${jsonLd}</script>` })}
<body>
${header()}

<!-- ── HERO: dark navy split ── -->
<section class="wia-hero">
  <div class="container">
    <div class="wia-hero-grid">
      <div class="wia-hero-left">
        <p class="city-eyebrow" style="color:var(--gold-soft);">Why it matters</p>
        <h1 class="display wia-hero-title">Independent agents<br>work for <em>you.</em><br>Not one company.</h1>
        <p class="wia-hero-sub">A captive agent sells what their employer approves. An independent agent shops 30+ carriers and recommends what fits your life — with no quota to fill.</p>
        <a href="/" class="btn-cream" data-find-cta style="margin-top:32px;display:inline-block;">Find a vetted independent agent →</a>
      </div>
      <div class="wia-hero-card">
        <div class="wia-hero-card-label">What independence means</div>
        <div class="wia-hero-fact">
          <div class="wia-hero-fact-num">30+</div>
          <div class="wia-hero-fact-text">Carriers an independent agent can access — vs. one for a captive agent</div>
        </div>
        <div class="wia-hero-fact">
          <div class="wia-hero-fact-num">$0</div>
          <div class="wia-hero-fact-text">Quota or sales target from any carrier — they earn by finding your best fit</div>
        </div>
        <div class="wia-hero-fact">
          <div class="wia-hero-fact-num">1</div>
          <div class="wia-hero-fact-text">Agent relationship — not 50 lead buyers calling for weeks</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── COMPARISON: captive vs independent ── -->
<section class="wia-compare-sec">
  <div class="container">
    <div class="wia-compare-head">
      <p class="city-eyebrow">How it's different</p>
      <h2 class="display" style="font-size:clamp(28px,3.5vw,42px);line-height:1.1;">Captive vs.<br>independent.</h2>
    </div>
    <div class="wia-compare-header-row">
      <div class="wia-compare-col-label wia-compare-col-label--captive">Captive agent</div>
      <div></div>
      <div class="wia-compare-col-label wia-compare-col-label--indep">Independent agent</div>
    </div>
    ${comparisons.map(c => `<div class="wia-compare-row">
      <div class="wia-captive-cell">${c.captive}</div>
      <div class="wia-compare-vs"><span>vs</span></div>
      <div class="wia-indep-cell">${c.indep}</div>
    </div>`).join('')}
  </div>
</section>

<!-- ── BENEFITS: 3 cards ── -->
<section class="wia-benefits-sec">
  <div class="container">
    <div class="wia-benefits-head">
      <p class="city-eyebrow">What you gain</p>
      <h2 class="display" style="font-size:clamp(28px,3.5vw,42px);line-height:1.1;">Three reasons<br>independence wins.</h2>
    </div>
    <div class="wia-benefits-grid">
      ${benefits.map((b, i) => `<div class="wia-benefit-card">
        <div class="wia-benefit-num">${i + 1}</div>
        <h3 class="wia-benefit-title">${b.title}</h3>
        <p class="wia-benefit-body">${b.body}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ── DARK STATS ── -->
<section class="trust-bar">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-item"><div class="trust-num">30+</div><div class="trust-label">carriers per independent agent</div></div>
      <div class="trust-item"><div class="trust-num">1</div><div class="trust-label">company a captive agent can sell</div></div>
      <div class="trust-item"><div class="trust-num">40%</div><div class="trust-label">rate variance across carriers for same coverage</div></div>
      <div class="trust-item"><div class="trust-num">127</div><div class="trust-label">cities with MLA-vetted independent agents</div></div>
    </div>
  </div>
</section>

<!-- ── VETTING CALLOUT ── -->
<section class="wia-vetting-sec">
  <div class="container">
    <div class="wia-vetting-grid">
      <div>
        <p class="city-eyebrow">Our standard</p>
        <h2 class="display" style="font-size:clamp(24px,3vw,36px);line-height:1.1;margin-bottom:16px;">Every MLA agent is<br>independently verified.</h2>
        <p style="font-size:16px;color:var(--ink-soft);line-height:1.7;margin-bottom:28px;">We don't just take agents at their word. Every agent passes a four-point vetting check: active state license, state resident, 10+ carrier appointments, and a clean DOI record.</p>
        <a href="/our-vetting/" style="color:var(--gold);font-weight:600;font-size:14px;text-decoration:none;">See our full vetting process →</a>
      </div>
      <div class="wia-vetting-card">
        <div class="wia-vetting-card-label">Four-point check</div>
        ${['Active state insurance license', 'Resident of the state they serve', '10+ independent carrier appointments', 'Clean DOI complaint record'].map((item, i) => `<div class="wia-vetting-item">
          <div class="wia-vetting-item-num">${i + 1}</div>
          <div class="wia-vetting-item-text">${item}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── DARK CTA ── -->
<section class="intake" style="padding:72px 0;text-align:center;">
  <div class="container">
    <h2 class="display" style="font-size:clamp(28px,4vw,46px);color:var(--cream);margin-bottom:16px;">Ready to meet a local independent agent?</h2>
    <p style="color:rgba(250,246,238,0.75);font-size:17px;margin-bottom:36px;">127 cities. Every agent vetted. No account needed.</p>
    <a href="/" class="btn-cream" data-find-cta style="font-size:16px;padding:16px 36px;">Find an agent in your city →</a>
  </div>
</section>

${GLOBAL_SCRIPTS}
${footer()}
</body>
</html>`
}

/* ── FAQ ─────────────────────────────────────────────────────────────────── */

function faqPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const canonical = `${siteUrl}/faq/`

  const categories = [
    {
      id:    'getting-started',
      label: 'Getting started',
      icon:  '▸',
      faqs: [
        {
          q: 'Is MeetLifeAgents free for consumers?',
          a: 'Yes — completely free. You pay nothing to browse, compare agents, or submit your information. Agents pay a small connection fee when they receive a verified lead, similar to how a contractor pays a referral network. The consumer experience is always free and carries no obligation.',
        },
        {
          q: 'When is the best age to buy life insurance?',
          a: 'Actuarially, the earlier the better. Premiums are set at the age and health you apply — and they\'re locked for the life of the term. A healthy 30-year-old might qualify for a 20-year term policy under $25/month; the same coverage applied for at 45 can cost 3–4× more. The practical trigger isn\'t age, it\'s responsibility: any time you have dependents, a mortgage, or income that others rely on, that\'s when coverage matters.',
        },
        {
          q: 'How much life insurance coverage do I need?',
          a: 'The most common starting rule: 10–12× your annual household income. But the right number depends on your specific obligations — mortgage balance, number of years until kids are independent, any outstanding debts, and how much income your family would need to maintain their standard of living. Most independent agents will walk you through a coverage needs analysis in about 10 minutes at no charge.',
        },
        {
          q: 'Is my employer-sponsored life insurance enough?',
          a: 'Almost certainly not as a standalone. Most employer group policies cover 1–2× annual salary — a fraction of the 10–12× guideline. They also travel with your job: if you leave, get laid off, or your employer drops the plan, you lose coverage with no guarantee you\'ll re-qualify at similar rates. Most agents recommend using employer coverage as a baseline and supplementing it with a personal policy you own and control regardless of employment status.',
        },
        {
          q: 'Will I get spam calls after I submit my information?',
          a: 'No. Your contact information goes to the single matched agent we connect you with — not to a waterfall of 50 buyers. You\'ll hear from one agent. We don\'t add you to any marketing list, and we don\'t sell or share your information. See our <a href="/tcpa/">TCPA disclosure</a> for the full consent language.',
        },
      ],
    },
    {
      id:    'policy-types',
      label: 'Policy types',
      icon:  '▸',
      faqs: [
        {
          q: 'What\'s the difference between term and permanent life insurance?',
          a: '<strong>Term life</strong> covers you for a set period — typically 10, 15, 20, or 30 years — and pays a death benefit if you die during that term. It has no cash value and is the cheapest per dollar of coverage. <strong>Permanent life</strong> (whole life, universal life, IUL) covers you for your entire life and builds cash value you can borrow against or surrender. Permanent is typically 5–10× more expensive per dollar of death benefit, but it builds an asset. Most families use term for temporary obligations (a mortgage, children at home) and permanent for long-term estate planning. Many own both.',
        },
        {
          q: 'What are the main types of life insurance?',
          a: '<strong>Term Life:</strong> Affordable, temporary, pure death benefit — the most common choice for income replacement. <strong>Whole Life:</strong> Permanent, guaranteed cash value growth, fixed premiums — used for estate planning and guaranteed death benefit. <strong>Indexed Universal Life (IUL):</strong> Permanent, cash value tied to a market index with a 0% floor — used for tax-free retirement income. <strong>Final Expense:</strong> Small-face permanent policy ($5K–$30K), simplified issue, no medical exam — designed for burial and end-of-life costs. <strong>Mortgage Protection:</strong> Term policy sized to your loan balance — pays your mortgage if you die during the term.',
        },
        {
          q: 'What\'s the best life insurance for first-time homebuyers?',
          a: 'For homeowners, Mortgage Protection is the most targeted option — it\'s a term policy sized to cover your remaining loan balance and duration. If you die, the mortgage is paid and your family keeps the home. Many buyers pair it with a separate term policy for broader income replacement. A licensed independent agent can quote both options side-by-side in one conversation.',
        },
        {
          q: 'Can I get life insurance if I have a pre-existing condition?',
          a: 'Yes, in most cases. Even with conditions like type 2 diabetes, high blood pressure, a history of heart disease, cancer in remission, or treated mental health conditions, many applicants qualify for standard or rated (slightly higher premium) policies. Some carriers specialize in higher-risk cases and offer better rates than others — which is exactly why working with an independent agent matters. If you\'ve been declined before, guaranteed-issue final expense policies are available with automatic approval regardless of health, though premiums are higher and death benefits may be graded in the first 2–3 years.',
        },
      ],
    },
    {
      id:    'cost-underwriting',
      label: 'Cost & underwriting',
      icon:  '▸',
      faqs: [
        {
          q: 'How much does life insurance cost?',
          a: 'It varies widely based on age, health, coverage amount, policy type, and carrier. A healthy 35-year-old non-smoker can get a $500,000 20-year term policy for roughly $25–$40/month. A 50-year-old with some health conditions for the same coverage might pay $120–$200/month. Permanent policies (whole life, IUL) cost significantly more per dollar of coverage but build cash value. The only accurate number is your personal quote — an independent agent will run it against multiple top-rated carriers in minutes.',
        },
        {
          q: 'Do I need a medical exam to get life insurance?',
          a: 'Not necessarily. Many top-rated carriers offer no-exam or simplified-issue policies for eligible applicants. Approval is based on your application answers, prescription database checks, and the MIB (Medical Information Bureau) — no blood draw, no nurse visit. No-exam policies can approve in 24–72 hours, sometimes same-day. The trade-off: they may carry slightly higher premiums or coverage caps compared to fully underwritten policies. Your agent will match you to the underwriting path that makes sense for your health profile.',
        },
        {
          q: 'How quickly can I get life insurance coverage?',
          a: 'Timelines vary by product. No-exam and final expense policies can approve within 24–72 hours — sometimes same-day. Fully underwritten term policies take 3–6 weeks due to medical records requests, lab work, and carrier review. Guaranteed-issue final expense has effectively instant approval. If speed matters, tell your agent — there are multiple carriers that have streamlined their underwriting significantly.',
        },
        {
          q: 'Are life insurance premiums tax-deductible?',
          a: 'For individuals, personal life insurance premiums are generally not tax-deductible at the federal level or in most states. However, the death benefit is almost always income-tax-free to the beneficiary. Business-owned life insurance (key-person coverage, buy-sell agreements) can sometimes be deductible depending on how it\'s structured. If you\'re a business owner, an independent agent who works with business clients can walk through your options.',
        },
        {
          q: 'Can I own more than one life insurance policy at the same time?',
          a: 'Yes. There\'s no limit on how many policies you can own, as long as the total coverage is proportionate to your insurable interest — generally the ceiling is 20–30× your annual income, though most families stay well below this. Many households carry both a term policy for income replacement and a smaller permanent policy for final expenses or legacy planning. Carriers will ask about existing coverage during underwriting, so be transparent on your application.',
        },
      ],
    },
    {
      id:    'agents-process',
      label: 'Agents & our process',
      icon:  '▸',
      faqs: [
        {
          q: 'What\'s the difference between an independent broker and a captive agent?',
          a: 'A <strong>captive agent</strong> works for one carrier (State Farm, New York Life, etc.) and can only offer that company\'s products. An <strong>independent broker</strong> is contracted with many carriers and can shop your profile across all of them simultaneously, matching you to the carrier most likely to offer favorable underwriting for your health profile and goals. Every agent on MeetLifeAgents is an independent broker — not tied to any single carrier.',
        },
        {
          q: 'How do I know the agent is actually licensed?',
          a: 'Every agent listed on MeetLifeAgents has been verified against their state Department of Insurance records before appearing in search results. Each agent profile displays their NPN (National Producer Number) and links directly to their state DOI license lookup, so you can confirm it yourself in under a minute — no trust required.',
        },
        {
          q: 'Are the agents employees of MeetLifeAgents?',
          a: 'No. All agents are independent contractors running their own practices. MeetLifeAgents is a verified directory — we vet and connect, but we don\'t employ, supervise, or set the rates that agents quote. The agent you connect with owns their book of business and works for you, not for us.',
        },
        {
          q: 'What if I don\'t like the agent I connect with?',
          a: 'Go back to the city page and choose another — you\'re never locked in. All agents listed have passed the same vetting standards, so every option is a vetted choice. The selection is always yours, and switching agents has zero impact on your ability to get coverage.',
        },
        {
          q: 'How do I verify a life insurance agent\'s license?',
          a: 'Every licensed life insurance agent must hold an active state license issued by their state\'s Department of Insurance. You can verify any agent\'s license status for free using the NIPR (National Insurance Producer Registry) lookup at <a href="https://nipr.com" target="_blank" rel="noopener">nipr.com</a> — search by name or NPN. It\'s a public record. Every agent profile on MeetLifeAgents includes their NPN and a direct DOI verification link.',
        },
      ],
    },
    {
      id:    'policy-details',
      label: 'Policy details',
      icon:  '▸',
      faqs: [
        {
          q: 'What happens to my life insurance if I move to another state?',
          a: 'Your policy travels with you. Life insurance is a contract between you and the carrier — not tied to your address. If you move, your coverage, premium, and terms remain the same. Just update your address with the carrier. The only exception is certain state-specific riders (rare) that may not be valid in all states. Your agent can confirm portability before you apply.',
        },
        {
          q: 'How do I choose a beneficiary?',
          a: 'Your beneficiary is whoever receives the death benefit when you die. Most policyholders name a spouse or partner as primary beneficiary and adult children as contingent (backup) beneficiaries. A few important rules: minors can\'t directly receive policy proceeds — name a guardian, a trust, or a custodian instead. Update your beneficiary after major life events (marriage, divorce, new child). You can name a charity or your estate, though each has different tax implications worth discussing with your agent.',
        },
        {
          q: 'What policy riders should I consider?',
          a: 'Riders let you customize a base policy. The most useful: <strong>Waiver of Premium</strong> — keeps your policy active if you become totally disabled. <strong>Accelerated Death Benefit</strong> — lets you access part of the death benefit if diagnosed with a terminal illness. <strong>Child Term Rider</strong> — inexpensive way to cover all minor children under one policy. <strong>Return of Premium</strong> — refunds all premiums paid if you outlive a term policy (costs more, but appeals to risk-averse buyers). <strong>Convertibility</strong> — lets you convert a term policy to permanent without new underwriting. Which riders make sense depends on your budget and goals.',
        },
        {
          q: 'What protects my policy if my insurance carrier goes out of business?',
          a: 'Life insurance policies are protected by each state\'s life and health guaranty association — a member of NOLHGA (National Organization of Life & Health Insurance Guaranty Associations). If a licensed carrier becomes insolvent, the guaranty association steps in to pay covered claims up to state-specified limits (often $300,000–$500,000 in death benefits per policy, varying by state). This statutory safety net exists on top of each carrier\'s own financial reserves and reinsurance programs.',
        },
        {
          q: 'What is the contestability period?',
          a: 'Most life insurance policies have a 2-year contestability period from the issue date. During this window, the carrier has the right to investigate a claim and potentially deny it if they find material misrepresentations on the original application — such as undisclosed health conditions or tobacco use. After 2 years, the policy is generally incontestable, meaning the carrier must pay valid claims regardless of application accuracy (fraud is an exception). This is why honesty on your application matters.',
        },
      ],
    },
  ]

  const categoryNav = categories.map(c =>
    `<a href="#${c.id}" class="faq-cat-link">${c.label}</a>`
  ).join('')

  const categoryBlocks = categories.map(c => `
    <div class="faq-cat-block" id="${c.id}">
      <h2 class="faq-cat-head display">${c.label}</h2>
      <div class="faq-list">
        ${c.faqs.map(f => `
        <details class="faq-item">
          <summary>${f.q}</summary>
          <p>${f.a}</p>
        </details>`).join('')}
      </div>
    </div>`).join('')

  const totalQ = categories.reduce((n, c) => n + c.faqs.length, 0)

  return `${head({
    title:       'Life Insurance FAQ — Common Questions Answered | MeetLifeAgents',
    description: `${totalQ} life insurance questions answered plainly — cost, coverage, medical exams, policy types, agents, riders, and more. No jargon.`,
    canonical,
  })}
<body>
${header()}

<section class="pg-hero" style="border-bottom:1px solid var(--rule);padding-bottom:56px;">
  <div class="container">
    <p class="city-eyebrow" style="padding-top:40px;">${totalQ} questions answered</p>
    <h1 class="display pg-hero-title">Life Insurance FAQ</h1>
    <p class="pg-hero-sub" style="max-width:580px;">Plain answers to the questions people actually ask — no jargon, no sales pitch.</p>
    <div class="faq-cat-nav">${categoryNav}</div>
  </div>
</section>

<div class="container" style="padding-top:60px;padding-bottom:80px;">
  <div class="faq-layout">
    <nav class="faq-toc">
      <div class="faq-toc-head">Categories</div>
      ${categories.map(c => `<a href="#${c.id}">${c.label}</a>`).join('')}
    </nav>
    <div class="faq-body">
      ${categoryBlocks}
    </div>
  </div>
</div>

<section class="intake" style="padding:72px 0;text-align:center;">
  <div class="container">
    <h2 class="display" style="font-size:clamp(28px,4vw,42px);color:var(--cream);margin-bottom:16px;">Still have questions? Ask a local agent.</h2>
    <p style="color:rgba(250,246,238,0.75);font-size:17px;margin-bottom:36px;">Every agent on MeetLifeAgents is independent, vetted, and willing to explain anything — free of charge.</p>
    <a href="/" class="btn-cream" style="font-size:16px;padding:16px 36px;">Find an agent near you →</a>
  </div>
</section>

${GLOBAL_SCRIPTS}
${footer()}
</body>
</html>`
}

/* ── GLOSSARY ─────────────────────────────────────────────────────────────── */

function glossaryPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const canonical = `${siteUrl}/glossary/`

  const terms = [
    // A
    { term: 'Accelerated Death Benefit (ADB)', def: 'A rider that allows the policyholder to access a portion of the death benefit while still alive if diagnosed with a qualifying terminal, chronic, or critical illness. The remaining benefit is paid to beneficiaries at death. Sometimes called a "living benefit."' },
    { term: 'Accidental Death Benefit', def: 'A rider that pays an additional death benefit — often equal to the base policy face amount — if the insured dies as a direct result of an accident. Sometimes called "double indemnity." Does not apply to illness, suicide, or high-risk activities.' },
    { term: 'Annuity', def: 'A contract with an insurance company that provides a stream of payments over time, typically in retirement. Unlike life insurance (which pays at death), annuities are designed to be drawn down during life. They\'re a separate product from life insurance and often managed by the same carriers.' },
    { term: 'Application', def: 'The written or electronic form submitted to a carrier requesting a life insurance policy. Requires disclosure of personal and health information. Deliberate misrepresentation on an application can give the carrier grounds to rescind the policy during the contestability period.' },
    // B
    { term: 'Beneficiary', def: 'The person (or entity) designated to receive the death benefit when the insured dies. A <em>primary</em> beneficiary receives the proceeds first. A <em>contingent</em> (or secondary) beneficiary receives the proceeds only if the primary predeceases the insured. You can name multiple beneficiaries and specify percentages.' },
    { term: 'Buy-Sell Agreement', def: 'A legal agreement between business co-owners that specifies how a partner\'s share will be transferred if they die, become disabled, or leave. Often funded by life insurance policies owned by each partner on the others\' lives, ensuring the surviving partners have cash to buy out the deceased\'s share without disrupting the business.' },
    // C
    { term: 'Captive Agent', def: 'A licensed agent who is contracted exclusively with one insurance carrier (e.g., New York Life, State Farm). A captive agent can only offer their employer\'s products. Contrast with independent agent/broker.' },
    { term: 'Carrier', def: 'The insurance company that underwrites and issues the policy, assumes the financial risk, and pays claims. Examples include Prudential, Pacific Life, North American, Mutual of Omaha. Your agent works with multiple carriers; your policy is with one specific carrier.' },
    { term: 'Cash Surrender Value', def: 'The amount you receive if you voluntarily cancel a permanent life insurance policy. Usually less than the accumulated cash value in early years due to surrender charges. Increases over time as surrender charges fade. On older whole life policies it can equal or exceed total premiums paid.' },
    { term: 'Cash Value', def: 'The savings or investment component inside a permanent life insurance policy (whole life, universal life, IUL). It grows over time on a tax-deferred basis. Policyholders can borrow against it, withdraw from it, or use it to pay premiums. Term life policies have no cash value.' },
    { term: 'Contestability Period', def: 'A window — typically the first two years after policy issue — during which the insurance company can investigate and deny a claim if they discover material misrepresentation on the original application. After this period the policy is generally incontestable (except for outright fraud). Honest applications prevent contestability issues.' },
    { term: 'Conversion Privilege', def: 'A feature on many term life policies that allows the policyholder to convert to a permanent policy (e.g., whole life) without undergoing new medical underwriting — regardless of current health. Especially valuable if your health has declined since the original issue. Conversions must typically be completed before a specified age or before the term ends.' },
    { term: 'Cost of Insurance (COI)', def: 'The pure mortality cost component inside a universal life or IUL policy — essentially the pure term insurance rate the carrier charges each month. COI increases with age. In IUL and universal life policies, COI is deducted from the cash value each month.' },
    // D
    { term: 'Death Benefit', def: 'The amount paid to the beneficiary (or beneficiaries) when the insured dies. Usually paid as a lump sum, income-tax-free. Also called the "face amount" or "policy proceeds." The exact benefit depends on policy type — it\'s level in term and whole life, but can vary in universal and IUL policies.' },
    { term: 'Decreasing Term', def: 'A term policy where the death benefit decreases over the policy period, typically in proportion to a declining debt balance (like a mortgage). Premium remains level while coverage shrinks. Mortgage protection insurance is often decreasing term. Compare with level term, where the death benefit stays constant.' },
    { term: 'Dividend', def: 'A share of surplus profit returned to policyholders of <em>participating</em> whole life policies, typically issued by mutual insurance companies. Dividends are not guaranteed, but companies like MassMutual and Guardian have paid them consecutively for over a century. Can be taken as cash, used to reduce premiums, or used to buy additional paid-up insurance.' },
    // E
    { term: 'Elimination Period', def: 'In disability insurance and long-term care policies, the waiting period after a qualifying event before benefits begin — typically 30, 60, or 90 days. Sometimes called the "deductible period." Not typically applicable to life insurance death benefits, which are paid immediately upon claim approval.' },
    { term: 'Endorsement', def: 'A written amendment that modifies the original terms of a policy, either expanding or restricting coverage. Endorsements are attached to and form part of the policy contract. Similar to a rider, but a rider typically adds new benefits while an endorsement modifies existing terms.' },
    // F
    { term: 'Face Amount', def: 'The stated death benefit on the front page of the policy — the amount the carrier agrees to pay upon the insured\'s death (absent any applicable riders or loans). Also called the "coverage amount" or "death benefit." On universal life policies, the face amount may be adjustable.' },
    { term: 'Final Expense Insurance', def: 'A type of whole life policy with a small face amount ($5,000–$30,000) designed specifically to cover end-of-life costs: funeral, burial, medical bills, and minor outstanding debts. Uses simplified underwriting (few medical questions, no exam). Typically available for applicants ages 50–85. Premiums are higher per dollar of coverage than term, but qualification is easier.' },
    { term: 'Free Look Period', def: 'A mandatory period — typically 10–30 days from policy delivery — during which a new policyholder can cancel the policy for any reason and receive a full premium refund. Required by law in all states, though the length varies. A no-risk window to review your policy before committing.' },
    // G
    { term: 'Grace Period', def: 'A period after a premium due date — typically 30 or 31 days — during which the policy remains in force even if the premium hasn\'t been paid. If the insured dies during the grace period, the carrier pays the death benefit minus the unpaid premium. After the grace period, the policy lapses.' },
    { term: 'Graded Death Benefit', def: 'A provision in guaranteed-issue and some simplified-issue policies that limits the death benefit during the first 2–3 years of the policy. If the insured dies of natural causes during this period, beneficiaries receive the premiums paid plus interest (not the full face amount). After the graded period, the full death benefit is payable. Accidental death is often paid in full from day one.' },
    { term: 'Group Life Insurance', def: 'Life insurance provided through an employer or association to a group of members under a single master policy. Premiums are typically lower than individual policies, and underwriting may be minimal. The major disadvantage: coverage is usually tied to employment — if you leave the job, coverage ends (though conversion rights may apply).' },
    { term: 'Guaranteed Issue (GI)', def: 'A policy available to any applicant within the eligible age range, regardless of health status — no medical exam, no health questions. Always comes with a graded death benefit in the first 2–3 years. Premiums are the highest per dollar of coverage due to the carrier\'s adverse selection risk. Used primarily for final expense coverage when standard underwriting isn\'t available.' },
    { term: 'Guaranteed Insurability Rider', def: 'A rider allowing the policyholder to purchase additional coverage at specified future dates without providing evidence of insurability (i.e., without new medical underwriting). Useful if you expect your insurance needs to increase over time (growing family, increasing income) and want to lock in the right to buy more regardless of future health.' },
    // H
    { term: 'Health Classification', def: 'The rating tier assigned by the carrier based on the applicant\'s medical underwriting. Common classifications (best to worst): Preferred Plus → Preferred → Standard Plus → Standard → Substandard (or Table-rated). Better classifications mean lower premiums. Tobacco users are placed in separate smoker classifications with significantly higher rates.' },
    // I
    { term: 'Impaired Risk', def: 'An applicant who has a health condition that increases their mortality risk above average. May result in a substandard (table-rated) classification with higher premiums, policy exclusions for specific conditions, or declination. Some carriers specialize in impaired-risk underwriting and may offer better terms than standard carriers for certain conditions.' },
    { term: 'Independent Agent / Broker', def: 'A licensed insurance professional contracted with multiple carriers who can shop a client\'s profile across many companies simultaneously. Independent agents are not employed by any single carrier, so their recommendations should reflect your best option — not their employer\'s product. All agents on MeetLifeAgents are independent.' },
    { term: 'Indexed Universal Life (IUL)', def: 'A form of permanent life insurance where the cash value earns interest linked to a market index (like the S&P 500), subject to a cap (typically 8–12%) and a floor (typically 0% — credited interest can\'t go negative). Combines permanent death benefit, flexible premiums, and market-linked (but protected) growth. More complex than term or whole life; illustration assumptions require scrutiny.' },
    { term: 'Insurable Interest', def: 'The financial or emotional stake someone has in another person\'s continued life, which justifies owning a life insurance policy on that person. Spouses, parents of minor children, and business partners typically have clear insurable interest. You cannot take out a policy on a stranger. Must exist at policy issue; it\'s not required to persist for a claim to be paid.' },
    // J
    { term: 'Joint Life Policy', def: 'A policy covering two lives under a single contract. A "first-to-die" joint policy pays the death benefit when the first insured dies. A "second-to-die" (survivorship) policy pays only after both insureds have died — commonly used for estate planning to cover estate taxes due at the second death.' },
    // K
    { term: 'Key Person Insurance', def: 'Life insurance owned by a business on a key employee or partner whose death would create significant financial disruption. The business is the beneficiary and uses the proceeds to fund recruitment, offset lost revenue, or fund a buy-sell agreement. Premiums are generally not deductible, but proceeds are typically income-tax-free.' },
    // L
    { term: 'Lapse', def: 'The termination of a life insurance policy due to non-payment of premiums beyond the grace period. Once lapsed, coverage ends. Some policies include non-forfeiture options (extended term insurance, reduced paid-up insurance) that prevent total loss of value. Reinstatement may be possible within a specified period if back premiums are paid and insurability is demonstrated.' },
    { term: 'Level Premium', def: 'A premium structure where the amount you pay remains constant for the entire policy period. Most term and whole life policies are level-premium — the rate you lock in on day one never increases during the guaranteed period. Contrast with annually renewable term, where premiums increase each year.' },
    { term: 'Level Term', def: 'A term life policy where both the death benefit and the premium remain constant throughout the policy period (e.g., $500,000 face amount at $28/month for 20 years). The most common and straightforward form of term insurance. At the end of the term, coverage expires unless renewed or converted.' },
    { term: 'Living Benefit', def: 'See <em>Accelerated Death Benefit</em>. A broad term for any policy feature that allows the insured to access part of the death benefit while still alive — triggered by terminal illness, chronic illness, or critical illness diagnoses. Living benefits have become standard on most modern term and permanent policies.' },
    // M
    { term: 'MIB (Medical Information Bureau)', def: 'A member-owned database used by life and health insurance companies to share coded medical information from past applications, helping prevent fraud and misrepresentation. When you apply for life insurance, the carrier will check MIB records. Applicants can request their own MIB file for free once per year at mib.com.' },
    { term: 'Modified Endowment Contract (MEC)', def: 'A life insurance policy that has been funded too rapidly — beyond IRS limits — causing it to lose favorable tax treatment. Policy loans from a MEC are treated as taxable income (and potentially subject to a 10% penalty before age 59½). A properly structured policy avoids MEC status. An important consideration when over-funding IUL or universal life.' },
    { term: 'Mortgage Protection Insurance (MPI)', def: 'A type of life insurance — usually decreasing term — specifically designed to pay off a remaining mortgage balance if the primary earner dies. The death benefit decreases in parallel with the loan balance while the premium stays level. Compare to standard level term: with term, the death benefit stays constant and your family — not the lender — receives the proceeds and can use them as they choose.' },
    { term: 'Mutual Company', def: 'An insurance company owned by its policyholders rather than public shareholders. Mutual companies may issue dividends to participating policyholders from surplus profits. Examples include MassMutual, Guardian, Northwestern Mutual. Contrast with stock companies (owned by shareholders). Mutual company whole life policies are often participating (dividend-eligible).' },
    // N
    { term: 'Non-Forfeiture Options', def: 'Rights guaranteed to a permanent life policyholder who stops paying premiums, ensuring they don\'t forfeit all accumulated value. Common options: <em>Cash surrender</em> (take the surrender value in cash), <em>Reduced paid-up insurance</em> (convert to a smaller, fully paid-up policy), <em>Extended term insurance</em> (use the cash value to buy term coverage for as long as possible at the original face amount).' },
    { term: 'NPN (National Producer Number)', def: 'A unique, permanent identifier assigned to every licensed insurance agent or broker in the United States by the NIPR (National Insurance Producer Registry). An NPN never changes even if an agent moves states or changes employers. Consumers can look up any agent\'s licensure, appointment, and complaint history using their NPN at nipr.com. Every MeetLifeAgents profile displays the agent\'s NPN.' },
    // P
    { term: 'Paid-Up Additions (PUAs)', def: 'Small blocks of additional whole life insurance purchased with policy dividends or optional extra premium payments. PUAs are fully paid-up at purchase, have immediate cash value, and earn their own dividends. A powerful tool for accelerating cash value growth inside a participating whole life policy without additional underwriting.' },
    { term: 'Permanent Life Insurance', def: 'Any life insurance policy designed to remain in force for the insured\'s entire lifetime (as long as premiums are paid and the policy isn\'t surrendered). Includes whole life, universal life, indexed universal life, and variable universal life. All accumulate cash value. Contrast with term life, which expires at the end of the term.' },
    { term: 'Policy Loan', def: 'A loan taken against the cash value of a permanent life insurance policy. Not considered taxable income (in non-MEC policies) because it\'s technically a loan, not a withdrawal. Interest accrues on the outstanding loan balance. If the loan and interest exceed the cash value, the policy lapses. Outstanding loans reduce the death benefit paid to beneficiaries.' },
    { term: 'Premium', def: 'The amount paid to the insurance company to keep the policy in force. Can be paid monthly, quarterly, semi-annually, or annually (annual typically offers a slight discount). For term and whole life, the premium is fixed. For universal life and IUL, the premium is flexible within a range. Missing a premium payment begins the grace period.' },
    { term: 'Primary Beneficiary', def: 'The first-in-line recipient of a life insurance death benefit upon the insured\'s death. If the primary beneficiary predeceases the insured, the proceeds pass to the contingent (secondary) beneficiary. Multiple primary beneficiaries can share the proceeds by percentage.' },
    // R
    { term: 'Rated Policy', def: 'A policy issued at a higher-than-standard premium because the applicant\'s health or lifestyle presents elevated risk. Ratings are expressed as "table rates" (Table 2, Table 4, etc.), each adding approximately 25% to the standard premium. A Table 4 policy costs about 2× the standard rate. Ratings can sometimes be removed if health improves.' },
    { term: 'Return of Premium (ROP)', def: 'A rider or policy type that refunds all premiums paid if the insured outlives the term. A $500,000 20-year ROP term might cost $80/month vs. $25/month for standard term — the extra cost is essentially a forced savings vehicle. If you die during the term, the full death benefit is paid (not the premiums). Appeals to those uncomfortable with the idea of "wasting" premiums.' },
    { term: 'Rider', def: 'An add-on provision that modifies or expands a base life insurance policy\'s coverage, usually for an additional premium. Common riders include Waiver of Premium, Accelerated Death Benefit, Child Term, Guaranteed Insurability, and Return of Premium. Riders can often be added at issue but may be difficult to add later.' },
    // S
    { term: 'Simplified Issue', def: 'A policy that requires answering a few health questions (but no medical exam) for approval. Faster and easier than full underwriting, with slightly higher premiums. Typically available for coverage up to $500,000 depending on carrier. Common for final expense, some term, and mortgage protection products.' },
    { term: 'Substandard Risk', def: 'See <em>Rated Policy</em>. An applicant whose health profile, occupation, or avocation places them in a higher mortality risk category than standard. Results in higher premiums (table ratings) or policy exclusions. Some carriers specialize in substandard underwriting and may offer better terms for specific conditions.' },
    { term: 'Surrender Charge', def: 'A fee deducted from the cash value if a permanent life insurance policy is cancelled in its early years (typically years 1–10). Surrender charges decline each year and eventually disappear. Designed to recover the carrier\'s initial cost of issuing the policy. This is why the cash surrender value in early years is less than total premiums paid.' },
    // T
    { term: 'Term Life Insurance', def: 'Life insurance that provides pure death benefit protection for a specified period — typically 10, 15, 20, 25, or 30 years. If the insured dies during the term, the beneficiary receives the death benefit. If the insured outlives the term, coverage expires with no payout (unless an ROP rider was purchased). No cash value. The most affordable form of life insurance per dollar of coverage.' },
    { term: 'Terminal Illness Rider', def: 'See <em>Accelerated Death Benefit</em>. Specifically triggered by a diagnosis of terminal illness with a life expectancy typically of 12–24 months. Allows access to 25–100% of the death benefit while still alive. Now standard on most policies at no additional cost. Reduces the final death benefit by the amount accelerated.' },
    // U
    { term: 'Underwriting', def: 'The process by which an insurance company evaluates an applicant\'s risk profile to determine whether to issue a policy, at what premium, and under what terms. Life insurance underwriting considers age, gender, health history, current health status, family medical history, occupation, lifestyle, and existing insurance. Simplified issue uses database checks only; full underwriting may include blood work, paramedical exams, and medical records.' },
    { term: 'Universal Life Insurance (UL)', def: 'A flexible permanent life insurance product with adjustable premiums and death benefits. Cash value earns interest at a declared rate (not market-linked like IUL). The policyholder can increase or decrease premiums within limits and sometimes adjust the death benefit. Lower premiums mean the cost of insurance is deducted from cash value; if cash value runs out, the policy lapses.' },
    // W
    { term: 'Waiver of Premium Rider', def: 'A rider that waives (eliminates) the premium obligation if the policyholder becomes totally disabled and cannot work. The policy remains in full force while premiums are waived. Definition of disability varies by carrier. Typically has an elimination period (90–180 days of disability before waiver kicks in). One of the most universally recommended riders for working-age policyholders.' },
    { term: 'Whole Life Insurance', def: 'A form of permanent life insurance with a fixed death benefit, fixed premium, and guaranteed cash value growth rate. As long as premiums are paid, the policy cannot lapse and the death benefit is guaranteed. Participating whole life (from mutual companies) may also earn non-guaranteed dividends. The most predictable and conservative form of permanent insurance.' },
  ]

  // Build A-Z index
  const byLetter = {}
  const usedLetters = new Set()
  for (const t of terms) {
    const letter = t.term[0].toUpperCase()
    if (!byLetter[letter]) byLetter[letter] = []
    byLetter[letter].push(t)
    usedLetters.add(letter)
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const letterNav = alphabet.map(l =>
    usedLetters.has(l)
      ? `<a href="#gl-${l}" class="gl-letter-link gl-letter-link--active">${l}</a>`
      : `<span class="gl-letter-link gl-letter-link--empty">${l}</span>`
  ).join('')

  const termBlocks = alphabet.filter(l => byLetter[l]).map(l => `
    <div class="gl-section" id="gl-${l}">
      <div class="gl-letter-head">${l}</div>
      <div class="gl-terms">
        ${byLetter[l].map(t => `
        <div class="gl-term">
          <dt class="gl-term-name display">${t.term}</dt>
          <dd class="gl-term-def">${t.def}</dd>
        </div>`).join('')}
      </div>
    </div>`).join('')

  return `${head({
    title:       'Life Insurance Glossary — Terms Defined Plainly | MeetLifeAgents',
    description: `${terms.length} life insurance terms defined clearly — from accelerated death benefit to whole life. No jargon, no padding.`,
    canonical,
  })}
<body>
${header()}

<section class="pg-hero" style="border-bottom:3px solid var(--gold);background:var(--ink);color:var(--cream);padding:40px 0 60px;">
  <div class="container">
    <p class="city-eyebrow" style="color:var(--gold-soft);padding-top:0;">${terms.length} terms defined</p>
    <h1 class="display" style="font-size:clamp(40px,5vw,60px);color:var(--cream);line-height:1.05;letter-spacing:-0.025em;margin-bottom:16px;">Insurance Glossary</h1>
    <p style="font-size:18px;color:rgba(250,246,238,0.7);max-width:520px;line-height:1.55;">Every term you'll encounter shopping for life insurance — defined without the jargon.</p>
  </div>
</section>

<div class="gl-letter-bar">
  <div class="container">
    <div class="gl-letter-nav">${letterNav}</div>
  </div>
</div>

<div class="container" style="padding-top:64px;padding-bottom:100px;">
  <dl class="gl-body">
    ${termBlocks}
  </dl>
</div>

<section class="intake" style="padding:72px 0;text-align:center;">
  <div class="container">
    <h2 class="display" style="font-size:clamp(28px,4vw,42px);color:var(--cream);margin-bottom:16px;">Ready to put this into practice?</h2>
    <p style="color:rgba(250,246,238,0.75);font-size:17px;margin-bottom:36px;">Connect with a vetted independent agent in your city who can explain exactly how these terms apply to your situation.</p>
    <a href="/" class="btn-cream" style="font-size:16px;padding:16px 36px;">Find an agent near you →</a>
  </div>
</section>

${GLOBAL_SCRIPTS}
${footer()}
</body>
</html>`
}

// ── WHY NOT ETHOS ─────────────────────────────────────────────────────────────
function whyNotEthosPage(config) {
  const siteUrl   = config.siteUrl || 'https://meetlifeagents.com'
  const canonical = `${siteUrl}/why-not-ethos/`

  const rows = [
    { dim: 'Who you work with',  ethos: 'An algorithm and a call center', mla: 'A licensed, locally-resident independent agent you can call directly' },
    { dim: 'Carrier options',    ethos: '1–2 carriers (Ethos\'s own partners)', mla: '10–30+ carriers — your agent shops the market for you' },
    { dim: 'Policy types',       ethos: 'Term only (and some final expense)', mla: 'Term, Whole Life, IUL, Final Expense, Mortgage Protection' },
    { dim: 'Medical underwriting', ethos: 'Simplified issue — limited questions, higher rates', mla: 'Full underwriting available — best rates for healthy applicants' },
    { dim: 'Coverage ceiling',   ethos: 'Up to $2M (algorithmic approval)', mla: 'No ceiling — agents access fully underwritten policies at any amount' },
    { dim: 'If you get declined',ethos: 'No path forward — start over somewhere else', mla: 'Your agent re-shops to carriers that will approve your specific health profile' },
    { dim: 'Ongoing service',    ethos: 'App + chat support', mla: 'Direct line to the agent who placed your policy — for years' },
    { dim: 'Who pays',           ethos: 'You pay Ethos\'s margin into every premium', mla: 'Agent commission is carrier-paid — same cost to you, more options' },
  ]

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',         item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Why Not Ethos', item: canonical },
      ]},
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'Is Ethos Life Insurance legit?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ethos is a legitimate licensed platform. The tradeoff is you get simplified-issue underwriting from a narrow carrier panel and no ongoing agent relationship — which costs some applicants more and leaves others without options when declined.' } },
        { '@type': 'Question', name: 'Is Ethos cheaper than using an agent?',
          acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. Simplified-issue policies typically carry higher premiums than fully-underwritten coverage. An independent agent who shops 10–30+ carriers often finds lower rates for healthy applicants than Ethos\'s partner carriers offer.' } },
      ]},
    ]
  })

  return `${head({
    title:       'Why Not Ethos? Independent Agents vs. Direct Online Life Insurance | MeetLifeAgents',
    description: 'Ethos is convenient but limited to one or two carriers and no real agent relationship. Here\'s what you give up — and what an independent agent gives you instead.',
    canonical,
    extraHead:   `<meta name="robots" content="index,follow"><script type="application/ld+json">${jsonLd}</script>`,
  })}
<body>
${header()}

<!-- ── HERO ── -->
<section style="background:var(--ink);color:var(--cream);padding:72px 0 80px;border-bottom:3px solid var(--gold);">
  <div class="container">
    <p class="city-eyebrow" style="color:var(--gold-soft);padding-top:0;">An honest look</p>
    <h1 class="display" style="font-size:clamp(36px,5vw,60px);line-height:1.05;letter-spacing:-0.025em;color:var(--cream);max-width:700px;margin-bottom:20px;">
      Ethos is <em>convenient.</em><br>It's not always <em>best.</em>
    </h1>
    <p style="font-size:18px;color:rgba(250,246,238,0.72);max-width:560px;line-height:1.6;margin-bottom:36px;">
      Online platforms like Ethos are a step up from nothing. But for most people, a vetted independent agent finds better rates, more options, and stays in your corner after the policy issues.
    </p>
    <a href="/" class="btn-cream" data-find-cta>Find a vetted independent agent →</a>
  </div>
</section>

<!-- ── COMPARISON TABLE ── -->
<section style="padding:80px 0;">
  <div class="container">
    <p class="city-eyebrow">Side by side</p>
    <h2 class="display" style="font-size:clamp(28px,3.5vw,42px);line-height:1.1;margin-bottom:48px;">Ethos vs.<br>independent agent.</h2>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:14px 16px;border-bottom:2px solid var(--rule);width:22%;color:var(--ink-soft);font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:0.04em;"></th>
            <th style="text-align:left;padding:14px 16px;border-bottom:2px solid var(--rule);color:var(--ink-soft);font-weight:700;font-size:15px;">Ethos (direct)</th>
            <th style="text-align:left;padding:14px 16px;border-bottom:2px solid var(--rule);background:rgba(176,141,58,0.06);color:var(--ink);font-weight:700;font-size:15px;">MeetLifeAgents</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r, i) => `
          <tr style="border-bottom:1px solid var(--rule);${i % 2 === 0 ? '' : 'background:var(--cream-warm);'}">
            <td style="padding:16px;font-weight:600;font-size:13px;color:var(--ink-soft);vertical-align:top;">${r.dim}</td>
            <td style="padding:16px;color:var(--ink);line-height:1.55;vertical-align:top;">${r.ethos}</td>
            <td style="padding:16px;color:var(--ink);line-height:1.55;vertical-align:top;background:rgba(176,141,58,0.04);">
              <strong style="color:var(--gold);">✓</strong> ${r.mla}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ── WHEN ETHOS IS FINE ── -->
<section style="background:var(--cream-warm);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:72px 0;">
  <div class="container" style="max-width:760px;">
    <p class="city-eyebrow">To be fair</p>
    <h2 class="display" style="font-size:clamp(26px,3.5vw,38px);margin-bottom:24px;line-height:1.15;">When Ethos (or any direct platform) is probably fine</h2>
    <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:16px;">
      ${[
        'You\'re young, healthy, and want a quick $250K–$500K term policy with no medical exam',
        'You\'ve already decided on term life and just want the fastest possible approval',
        'You only need coverage that fits within Ethos\'s simplified-issue limits',
        'You have no health history that could complicate underwriting',
      ].map(item => `
      <li style="display:flex;gap:14px;align-items:flex-start;">
        <span style="color:var(--gold);font-weight:700;flex-shrink:0;margin-top:2px;">→</span>
        <span style="font-size:16px;line-height:1.55;color:var(--ink);">${item}</span>
      </li>`).join('')}
    </ul>
    <p style="margin-top:32px;font-size:15px;color:var(--ink-soft);line-height:1.6;">
      If that's you, Ethos works. But if you have any health history, need more than $2M, want coverage other than term, or just want a real human who knows your situation — an independent agent is worth the 15-minute phone call.
    </p>
  </div>
</section>

<!-- ── WHAT AGENTS DO ── -->
<section style="padding:80px 0;">
  <div class="container" style="max-width:760px;">
    <p class="city-eyebrow">The real difference</p>
    <h2 class="display" style="font-size:clamp(26px,3.5vw,38px);margin-bottom:40px;line-height:1.15;">What a vetted independent agent actually does for you</h2>
    <div style="display:flex;flex-direction:column;gap:32px;">
      ${[
        { title: 'Shops your health profile across carriers', body: 'Every carrier rates health conditions differently. An agent knows which carrier is lenient on diabetes, which underwrites sleep apnea well, which has the best rates for former smokers. Ethos can\'t do that — it has one underwriting algorithm and 1–2 partners.' },
        { title: 'Handles the paperwork and follow-up', body: 'Applications, medical records requests, lab orders — your agent manages all of it and stays in contact with the carrier so you don\'t have to chase anyone.' },
        { title: 'Calls you when something changes', body: 'Got healthier? Rates may have dropped. Had another kid? Your coverage need changed. Your agent notices and reaches out. An app doesn\'t.' },
        { title: 'Is there when there\'s a claim', body: 'When something happens, your family calls a real person who placed the policy and can help navigate the claim process — not a chat widget.' },
      ].map(pt => `
      <div style="display:flex;gap:20px;">
        <div style="width:3px;flex-shrink:0;background:var(--gold);border-radius:2px;margin-top:4px;"></div>
        <div>
          <h3 style="font-family:'Fraunces',serif;font-size:20px;font-weight:600;margin-bottom:8px;letter-spacing:-0.01em;">${pt.title}</h3>
          <p style="font-size:15px;color:var(--ink-soft);line-height:1.65;">${pt.body}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ── CTA ── -->
<section class="intake" style="padding:80px 0;text-align:center;">
  <div class="container">
    <h2 class="display" style="font-size:clamp(28px,4vw,44px);color:var(--cream);margin-bottom:16px;">Ready to talk to an actual human?</h2>
    <p style="color:rgba(250,246,238,0.75);font-size:17px;margin-bottom:36px;max-width:480px;margin-left:auto;margin-right:auto;">Find a vetted, locally-resident independent agent in your city — free, no spam, one call.</p>
    <a href="/" class="btn-cream" data-find-cta style="font-size:16px;padding:16px 36px;">Find an agent near you →</a>
  </div>
</section>

${GLOBAL_SCRIPTS}
${footer()}
</body>
</html>`
}

// ── ABOUT ──────────────────────────────────────────────────────────────────────
function aboutPage(config) {
  const siteUrl   = config.siteUrl || 'https://meetlifeagents.com'
  const canonical = `${siteUrl}/about/`

  return `${head({
    title:       'About MeetLifeAgents — Independent Life Insurance Agent Directory',
    description: 'MeetLifeAgents is an independent directory connecting life insurance buyers with vetted, locally-resident licensed agents. We don\'t sell policies. We connect.',
    canonical,
    extraHead:   `<meta name="robots" content="index,follow">`,
  })}
<body>
${header()}

<!-- ── HERO ── -->
<section style="background:var(--ink);color:var(--cream);padding:72px 0 80px;border-bottom:3px solid var(--gold);">
  <div class="container">
    <p class="city-eyebrow" style="color:var(--gold-soft);padding-top:0;">Who we are</p>
    <h1 class="display" style="font-size:clamp(36px,5vw,60px);line-height:1.05;letter-spacing:-0.025em;color:var(--cream);max-width:660px;margin-bottom:20px;">
      We connect. We don't sell.
    </h1>
    <p style="font-size:18px;color:rgba(250,246,238,0.72);max-width:540px;line-height:1.6;">
      MeetLifeAgents is an independent directory — not an agency, not a carrier, not a lead aggregator. We find you one vetted local agent and make the introduction. That's it.
    </p>
  </div>
</section>

<!-- ── WHAT WE ARE / AREN'T ── -->
<section style="padding:80px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;max-width:900px;">
      <div>
        <p class="city-eyebrow">What we are</p>
        <h2 class="display" style="font-size:clamp(24px,3vw,34px);margin-bottom:24px;line-height:1.15;">An independent<br>agent directory.</h2>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px;">
          ${[
            'A curated directory of licensed, vetted, locally-resident agents',
            'A free resource for consumers — we never charge buyers',
            'A private network with real vetting standards',
            'A direct connection between you and one agent — not a lead pool',
          ].map(item => `<li style="display:flex;gap:12px;font-size:15px;line-height:1.55;color:var(--ink);">
            <span style="color:var(--gold);font-weight:700;flex-shrink:0;">✓</span>
            <span>${item}</span>
          </li>`).join('')}
        </ul>
      </div>
      <div>
        <p class="city-eyebrow">What we are not</p>
        <h2 class="display" style="font-size:clamp(24px,3vw,34px);margin-bottom:24px;line-height:1.15;">Not an agency.<br>Not a carrier.</h2>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:14px;">
          ${[
            'We do not sell life insurance policies',
            'We do not employ or contract the agents in our directory',
            'We do not receive commissions from policy sales',
            'We do not sell your information to multiple agents',
          ].map(item => `<li style="display:flex;gap:12px;font-size:15px;line-height:1.55;color:var(--ink);">
            <span style="color:var(--ink-soft);font-weight:700;flex-shrink:0;">✕</span>
            <span>${item}</span>
          </li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ── HOW WE WORK ── -->
<section style="background:var(--cream-warm);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:80px 0;">
  <div class="container">
    <p class="city-eyebrow">How it works</p>
    <h2 class="display" style="font-size:clamp(26px,3.5vw,40px);margin-bottom:48px;line-height:1.1;">The model is simple.</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:40px;max-width:900px;">
      ${[
        { num: '1', title: 'You search by location', body: 'Every agent in our directory is licensed in their state and lives in or near the city where they practice. You get a local professional, not a call center.' },
        { num: '2', title: 'We vet before we list', body: 'Active license, clean disciplinary record, real local presence. We check every agent before they appear in the directory and monitor for changes.' },
        { num: '3', title: 'You connect — directly', body: 'We pass your contact to one agent. That agent calls you. No auction, no reselling, no four agents calling at once.' },
      ].map(step => `
      <div>
        <div style="font-family:'Fraunces',serif;font-size:56px;font-weight:700;color:var(--gold);line-height:1;margin-bottom:16px;font-style:italic;">${step.num}</div>
        <h3 style="font-family:'Fraunces',serif;font-size:19px;font-weight:600;margin-bottom:10px;letter-spacing:-0.01em;">${step.title}</h3>
        <p style="font-size:14px;color:var(--ink-soft);line-height:1.65;">${step.body}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ── VALUES ── -->
<section style="padding:80px 0;">
  <div class="container" style="max-width:760px;">
    <p class="city-eyebrow">What we believe</p>
    <h2 class="display" style="font-size:clamp(26px,3.5vw,40px);margin-bottom:40px;line-height:1.1;">Life insurance is a<br>relationship, not a transaction.</h2>
    <div style="display:flex;flex-direction:column;gap:32px;">
      ${[
        { title: 'Local matters', body: 'An agent who lives in your city understands the local cost of living, the common employers, the state-specific rules. They\'re also reachable — you can walk into their office.' },
        { title: 'One agent is enough', body: 'The lead-aggregator model sells your information to five agents who compete for your business with phone calls. That\'s not how trust is built. We send your contact to one vetted professional.' },
        { title: 'Consumers deserve real information', body: 'Too much life insurance content is written to rank for keywords and sell affiliate clicks. We\'d rather explain the actual tradeoffs — policy types, underwriting, what independent really means.' },
      ].map(v => `
      <div style="display:flex;gap:20px;">
        <div style="width:3px;flex-shrink:0;background:var(--gold);border-radius:2px;margin-top:4px;"></div>
        <div>
          <h3 style="font-family:'Fraunces',serif;font-size:20px;font-weight:600;margin-bottom:8px;letter-spacing:-0.01em;">${v.title}</h3>
          <p style="font-size:15px;color:var(--ink-soft);line-height:1.65;">${v.body}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- ── FOR AGENTS ── -->
<section style="background:var(--ink);color:var(--cream);padding:72px 0;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;max-width:900px;">
      <div>
        <p class="city-eyebrow" style="color:var(--gold-soft);padding-top:0;">For agents</p>
        <h2 class="display" style="font-size:clamp(26px,3.5vw,40px);color:var(--cream);line-height:1.1;margin-bottom:20px;">We work for qualified agents too.</h2>
        <p style="font-size:16px;color:rgba(250,246,238,0.72);line-height:1.6;margin-bottom:28px;">If you\'re a licensed independent agent with a real local presence, we\'d like to list you. We charge a monthly directory fee — no per-lead charges, no revenue share.</p>
        <a href="/agents/apply/" style="display:inline-block;background:var(--gold);color:var(--ink);font-weight:700;font-size:15px;padding:14px 28px;border-radius:6px;text-decoration:none;">Apply to join the network →</a>
      </div>
      <div style="display:flex;flex-direction:column;gap:20px;">
        ${[
          { stat: '1', label: 'Lead per city — we don\'t auction your leads' },
          { stat: '0%', label: 'Commission split — we don\'t take a cut of your sales' },
          { stat: '50', label: 'States — we\'re building a national independent network' },
        ].map(s => `
        <div style="border-left:2px solid var(--gold);padding-left:20px;">
          <div style="font-family:'Fraunces',serif;font-size:36px;font-weight:700;color:var(--gold);line-height:1;margin-bottom:4px;">${s.stat}</div>
          <div style="font-size:14px;color:rgba(250,246,238,0.65);line-height:1.5;">${s.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ── CTA ── -->
<section class="intake" style="padding:80px 0;text-align:center;">
  <div class="container">
    <h2 class="display" style="font-size:clamp(28px,4vw,44px);color:var(--cream);margin-bottom:16px;">Find your local agent.</h2>
    <p style="color:rgba(250,246,238,0.75);font-size:17px;margin-bottom:36px;max-width:480px;margin-left:auto;margin-right:auto;">Search by city. One vetted agent. Free connection.</p>
    <a href="/" class="btn-cream" data-find-cta style="font-size:16px;padding:16px 36px;">Find an agent near you →</a>
  </div>
</section>

${GLOBAL_SCRIPTS}
${footer()}
</body>
</html>`
}

module.exports = { notFoundPage, privacyPage, termsPage, tcpaPage, contactPage, howItWorksPage, ourVettingPage, whyIndependentPage, faqPage, glossaryPage, whyNotEthosPage, aboutPage }
