'use strict'
const { head, header, footer } = require('./layout')

// ─── 404 ──────────────────────────────────────────────────────────────────────

function notFoundPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const title   = 'Page not found — MeetLifeAgents'
  const desc    = 'The page you were looking for could not be found. Find a verified local life insurance agent on MeetLifeAgents.'

  return `${head({ title, description: desc, canonical: `${siteUrl}/404/` })}
<body>
${header()}
<div class="container" style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding-top:80px;padding-bottom:100px;">
  <div style="font-size:80px;line-height:1;margin-bottom:24px;opacity:0.15;font-family:Fraunces,serif;font-weight:700;">404</div>
  <h1 class="display" style="font-size:clamp(28px,4vw,48px);margin-bottom:16px;">Page not found.</h1>
  <p style="color:var(--ink-soft);max-width:480px;font-size:17px;margin-bottom:40px;">
    The page you were looking for has moved or doesn't exist. Use the search below to find a verified agent in your city.
  </p>
  <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;">
    <a href="/" class="btn-primary" style="background:var(--ink);color:var(--cream);padding:14px 28px;border-radius:4px;font-weight:600;font-size:15px;text-decoration:none;">Find an agent →</a>
    <a href="/how-it-works/" style="color:var(--ink);font-size:15px;padding:14px 20px;border:1px solid var(--rule);border-radius:4px;text-decoration:none;">How it works</a>
  </div>
  <div style="margin-top:60px;padding-top:40px;border-top:1px solid var(--rule);width:100%;max-width:600px;">
    <p style="font-size:14px;color:var(--ink-soft);margin-bottom:20px;">Or browse by state:</p>
    <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
      <a href="/al/" style="font-size:13px;color:var(--gold);padding:6px 12px;border:1px solid var(--rule);border-radius:3px;text-decoration:none;">Alabama</a>
      <a href="/fl/" style="font-size:13px;color:var(--gold);padding:6px 12px;border:1px solid var(--rule);border-radius:3px;text-decoration:none;">Florida</a>
      <a href="/ga/" style="font-size:13px;color:var(--gold);padding:6px 12px;border:1px solid var(--rule);border-radius:3px;text-decoration:none;">Georgia</a>
      <a href="/tx/" style="font-size:13px;color:var(--gold);padding:6px 12px;border:1px solid var(--rule);border-radius:3px;text-decoration:none;">Texas</a>
      <a href="/nc/" style="font-size:13px;color:var(--gold);padding:6px 12px;border:1px solid var(--rule);border-radius:3px;text-decoration:none;">North Carolina</a>
      <a href="/sc/" style="font-size:13px;color:var(--gold);padding:6px 12px;border:1px solid var(--rule);border-radius:3px;text-decoration:none;">South Carolina</a>
      <a href="/tn/" style="font-size:13px;color:var(--gold);padding:6px 12px;border:1px solid var(--rule);border-radius:3px;text-decoration:none;">Tennessee</a>
    </div>
  </div>
</div>
${footer()}
</body>
</html>`
}

// ─── PRIVACY ──────────────────────────────────────────────────────────────────

function privacyPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const title   = 'Privacy Policy — MeetLifeAgents'
  const desc    = 'MeetLifeAgents privacy policy. Learn how we collect, use, and protect your information.'
  const updated = 'May 1, 2026'

  return `${head({ title, description: desc, canonical: `${siteUrl}/privacy/` })}
<body>
${header()}
<div class="container legal-page">
  <nav class="breadcrumb"><a href="/">Home</a><span>›</span><span>Privacy Policy</span></nav>
  <h1 class="display" style="font-size:clamp(28px,3.5vw,44px);margin:32px 0 8px;">Privacy Policy</h1>
  <p class="legal-updated">Last updated: ${updated} · <a href="/contact/">Contact us</a> with questions.</p>
  <p class="legal-notice"><strong>Notice:</strong> This policy is a template requiring review by a qualified insurance regulatory attorney before use in production. Do not publish without legal review.</p>

  <h2>1. Who we are</h2>
  <p>MeetLifeAgents ("we," "our," or "us") operates MeetLifeAgents.com, an independent online directory that connects consumers with independently licensed life insurance agents. We are not an insurance agency, insurance company, or broker. We do not sell or underwrite insurance policies.</p>

  <h2>2. Information we collect</h2>
  <p>We collect information you voluntarily provide when you use our directory, including:</p>
  <ul>
    <li><strong>Contact form submissions:</strong> name, phone number, email address, and coverage interests you submit through our intake form.</li>
    <li><strong>Call data:</strong> if you use our call routing feature, we record that a call was placed (date, time, duration) but we do not record the content of calls.</li>
    <li><strong>Usage data:</strong> we use Cloudflare Web Analytics, which collects aggregate, privacy-preserving data about page visits. We do not use cookies for tracking.</li>
  </ul>

  <h2>3. How we use your information</h2>
  <p>Information you submit through our intake form is used solely to:</p>
  <ul>
    <li>Match you with a licensed agent in your city who matches your stated coverage interest.</li>
    <li>Send that agent your contact information so they may follow up with you directly.</li>
    <li>Comply with legal obligations.</li>
  </ul>
  <p>We do not sell your personal information to third parties. We do not use your data for re-marketing or behavioral advertising.</p>

  <h2>4. How we share your information</h2>
  <p>When you submit a lead form, your contact information is shared with the matched agent(s) in our network. By submitting the form, you consent to being contacted by these agents about life insurance products. Agents in our network are independent contractors, not employees of MeetLifeAgents.</p>
  <p>We may share information with service providers who help us operate the site (hosting, analytics), under data processing agreements.</p>

  <h2>5. TCPA consent</h2>
  <p>By submitting our contact form, you expressly consent to be contacted by MeetLifeAgents and matched agents via phone (including autodialed or prerecorded calls), text message, or email at the number and email address you provided, even if your number is on a Do Not Call registry. You may opt out at any time. See our <a href="/tcpa/">TCPA Disclosure</a> for full details.</p>

  <h2>6. Data retention</h2>
  <p>Lead form submissions are retained for up to 24 months for quality assurance and compliance purposes. You may request deletion of your data at any time by contacting us at <a href="/contact/">our contact page</a>.</p>

  <h2>7. Cookies and tracking</h2>
  <p>MeetLifeAgents does not use Google Analytics, Facebook Pixel, or other third-party behavioral trackers. We use Cloudflare Web Analytics, which uses no cookies and collects only aggregated, privacy-preserving data.</p>

  <h2>8. Your rights</h2>
  <p>Depending on your state of residence, you may have rights including: access to your personal data, correction of inaccurate data, deletion of your data, and opt-out of data sale (we do not sell data). To exercise these rights, contact us at <a href="/contact/">our contact page</a>.</p>

  <h2>9. California residents (CCPA)</h2>
  <p>California residents have additional rights under the CCPA. We do not sell personal information. You may request a copy of the categories of personal information we collect and how it is used by contacting us.</p>

  <h2>10. Security</h2>
  <p>We use industry-standard security measures to protect your data. However, no internet transmission is 100% secure. Use caution when transmitting sensitive information.</p>

  <h2>11. Children's privacy</h2>
  <p>Our site is not directed to children under 13. We do not knowingly collect personal information from children.</p>

  <h2>12. Changes to this policy</h2>
  <p>We may update this policy periodically. Material changes will be noted with an updated "Last updated" date. Continued use of the site constitutes acceptance of the updated policy.</p>

  <h2>13. Contact</h2>
  <p>Questions about this Privacy Policy may be directed to our <a href="/contact/">contact page</a>.</p>
</div>
${footer()}
</body>
</html>`
}

// ─── TERMS ────────────────────────────────────────────────────────────────────

function termsPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const title   = 'Terms of Service — MeetLifeAgents'
  const desc    = 'MeetLifeAgents terms of service. Read before using this directory.'
  const updated = 'May 1, 2026'

  return `${head({ title, description: desc, canonical: `${siteUrl}/terms/` })}
<body>
${header()}
<div class="container legal-page">
  <nav class="breadcrumb"><a href="/">Home</a><span>›</span><span>Terms of Service</span></nav>
  <h1 class="display" style="font-size:clamp(28px,3.5vw,44px);margin:32px 0 8px;">Terms of Service</h1>
  <p class="legal-updated">Last updated: ${updated} · <a href="/contact/">Contact us</a> with questions.</p>
  <p class="legal-notice"><strong>Notice:</strong> This document is a template requiring review by a qualified insurance regulatory attorney before use in production. Do not publish without legal review.</p>

  <h2>1. Acceptance of terms</h2>
  <p>By accessing or using MeetLifeAgents.com ("the Site"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the Site.</p>

  <h2>2. What MeetLifeAgents is — and is not</h2>
  <p>MeetLifeAgents is an independent directory service. We connect consumers with independently licensed life insurance agents. We are not:</p>
  <ul>
    <li>An insurance agency or broker</li>
    <li>An insurance company or underwriter</li>
    <li>A party to any insurance transaction between you and an agent</li>
    <li>A financial advisor providing investment or financial planning advice</li>
  </ul>
  <p>Any insurance transaction you enter into is solely between you and the agent. MeetLifeAgents is not responsible for the actions, omissions, representations, or policy terms of any agent listed in our directory.</p>

  <h2>3. Agent vetting — scope and limitations</h2>
  <p>We verify that listed agents hold an active state insurance license at the time of listing and meet our stated tier criteria. Our verification is based on publicly available data from state Departments of Insurance. We do not:</p>
  <ul>
    <li>Verify the accuracy of agent-provided information beyond licensure status</li>
    <li>Guarantee agent availability, responsiveness, or quality of service</li>
    <li>Perform continuous license monitoring (verify current license status on state DOI)</li>
  </ul>

  <h2>4. Consumer use</h2>
  <p>You may use the Site to search for and contact licensed agents in your area. You agree not to use the Site to harass agents, submit false contact information, or use the Site for any unlawful purpose.</p>

  <h2>5. No insurance advice</h2>
  <p>Content on the Site is for informational purposes only. Nothing on the Site constitutes insurance, legal, financial, or tax advice. Always consult a licensed professional before making coverage decisions.</p>

  <h2>6. TCPA and contact consent</h2>
  <p>By submitting a contact form, you consent to be contacted as described in our <a href="/tcpa/">TCPA Disclosure</a> and <a href="/privacy/">Privacy Policy</a>.</p>

  <h2>7. Intellectual property</h2>
  <p>All content on the Site — including text, design, and code — is owned by MeetLifeAgents or its licensors. Do not reproduce or redistribute without written permission.</p>

  <h2>8. Limitation of liability</h2>
  <p>MeetLifeAgents shall not be liable for any damages arising from your use of the Site or your reliance on information found here, including any transactions with agents. Our liability to you shall not exceed $100 in any case.</p>

  <h2>9. Indemnification</h2>
  <p>You agree to indemnify MeetLifeAgents against any claims arising from your use of the Site or violation of these Terms.</p>

  <h2>10. Governing law</h2>
  <p>These Terms are governed by the laws of the State of Alabama. Disputes shall be resolved in the courts of Autauga County, Alabama.</p>

  <h2>11. Changes</h2>
  <p>We may update these Terms. Continued use after changes constitutes acceptance.</p>

  <h2>12. Contact</h2>
  <p>Questions about these Terms may be directed to our <a href="/contact/">contact page</a>.</p>
</div>
${footer()}
</body>
</html>`
}

// ─── TCPA DISCLOSURE ──────────────────────────────────────────────────────────

function tcpaPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const title   = 'TCPA Disclosure — MeetLifeAgents'
  const desc    = 'MeetLifeAgents TCPA disclosure and consent language for telephone and text communication.'
  const updated = 'May 1, 2026'

  return `${head({ title, description: desc, canonical: `${siteUrl}/tcpa/` })}
<body>
${header()}
<div class="container legal-page">
  <nav class="breadcrumb"><a href="/">Home</a><span>›</span><span>TCPA Disclosure</span></nav>
  <h1 class="display" style="font-size:clamp(28px,3.5vw,44px);margin:32px 0 8px;">TCPA Disclosure</h1>
  <p class="legal-updated">Last updated: ${updated} · <a href="/contact/">Contact us</a> with questions.</p>
  <p class="legal-notice"><strong>Notice:</strong> This document is a template requiring review by a qualified insurance regulatory and TCPA attorney before use in production. Do not publish without legal review. TCPA violations carry statutory damages of $500–$1,500 per call.</p>

  <h2>What is the TCPA?</h2>
  <p>The Telephone Consumer Protection Act (TCPA), 47 U.S.C. § 227, restricts telephone solicitations and use of automated telephone equipment. It requires prior express written consent before contacting you via autodialed or prerecorded calls or texts for marketing purposes.</p>

  <h2>Your consent when submitting our form</h2>
  <p>When you submit a contact or lead form on MeetLifeAgents.com, you expressly authorize MeetLifeAgents and the matched agent(s) in our network to contact you via:</p>
  <ul>
    <li>Telephone calls (including calls placed using an automatic telephone dialing system or prerecorded messages)</li>
    <li>SMS/text messages (including automated messages)</li>
    <li>Email</li>
  </ul>
  <p>at the phone number and email address you provided, <strong>even if your number is on a federal, state, or local Do Not Call registry</strong>, for the purpose of discussing life insurance products and services you inquired about.</p>

  <h2>Consent is not required for purchase</h2>
  <p>You are not required to provide consent as a condition of purchasing any property, goods, or services.</p>

  <h2>How to opt out</h2>
  <p>You may revoke consent at any time by:</p>
  <ul>
    <li>Replying STOP to any text message you receive</li>
    <li>Saying "stop" or "unsubscribe" during a call</li>
    <li>Contacting us at our <a href="/contact/">contact page</a> and requesting removal</li>
  </ul>
  <p>Opt-out requests are processed within 10 business days. You may still receive transactional or administrative messages after opting out.</p>

  <h2>Do Not Call registry</h2>
  <p>Your submission of a contact form constitutes prior express written consent to be contacted notwithstanding registration on any Do Not Call list. If you do not wish to be contacted, do not submit the form.</p>

  <h2>Matched agents</h2>
  <p>When you submit a form, your contact information may be shared with up to [NUMBER] independently licensed agents who match your stated coverage needs and location. Each agent may contact you independently. Their contact will also comply with applicable TCPA requirements.</p>

  <h2>Questions</h2>
  <p>For TCPA-related questions or opt-out requests, use our <a href="/contact/">contact page</a>.</p>
</div>
${footer()}
</body>
</html>`
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function contactPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const apiUrl  = config.apiUrl  || 'https://sidecarleads.com'
  const title   = 'Contact — MeetLifeAgents'
  const desc    = 'Contact the MeetLifeAgents team. Questions about agents, vetting, or the directory.'

  return `${head({ title, description: desc, canonical: `${siteUrl}/contact/` })}
<body>
${header()}
<div class="container" style="padding-top:48px;padding-bottom:100px;max-width:800px;">
  <nav class="breadcrumb"><a href="/">Home</a><span>›</span><span>Contact</span></nav>

  <h1 class="display" style="font-size:clamp(30px,4vw,48px);margin:32px 0 12px;">Contact us</h1>
  <p style="color:var(--ink-soft);font-size:17px;margin-bottom:48px;max-width:520px;">
    Questions about the directory, agent vetting, or how it works? We read every message.
  </p>

  <div class="contact-grid">
    <!-- Form -->
    <div class="contact-form-wrap">
      <form id="contact-form" class="contact-form" onsubmit="submitContact(event)">
        <div class="form-row">
          <label for="cf-name">Your name</label>
          <input id="cf-name" type="text" name="name" placeholder="First and last name" required autocomplete="name">
        </div>
        <div class="form-row">
          <label for="cf-email">Email address</label>
          <input id="cf-email" type="email" name="email" placeholder="you@example.com" required autocomplete="email">
        </div>
        <div class="form-row">
          <label for="cf-subject">Subject</label>
          <select id="cf-subject" name="subject">
            <option value="">Select a topic…</option>
            <option value="agent-question">Question about an agent</option>
            <option value="vetting">Agent vetting standards</option>
            <option value="agent-apply">I'm an agent — joining the network</option>
            <option value="data-correction">Incorrect information on a listing</option>
            <option value="opt-out">Opt-out / data deletion request</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-row">
          <label for="cf-message">Message</label>
          <textarea id="cf-message" name="message" rows="5" placeholder="Tell us what's on your mind…" required></textarea>
        </div>
        <button type="submit" class="btn-primary" style="width:100%;background:var(--ink);color:var(--cream);padding:14px;border:none;border-radius:4px;font-size:15px;font-weight:600;cursor:pointer;">
          Send message
        </button>
        <div id="cf-success" style="display:none;margin-top:16px;padding:16px;background:#e8f5e9;border-radius:4px;color:#2d6a4f;font-size:14px;">
          ✓ Message sent — we'll respond within 1 business day.
        </div>
        <div id="cf-error" style="display:none;margin-top:16px;padding:16px;background:#fde8e4;border-radius:4px;color:#a64d3a;font-size:14px;">
          Something went wrong. Please try again or email us directly.
        </div>
      </form>
    </div>

    <!-- Info sidebar -->
    <div class="contact-info">
      <div class="contact-info-block">
        <h3>For consumers</h3>
        <p>Looking for an agent? Use our <a href="/">directory search</a> to find one in your city — no contact form needed.</p>
      </div>
      <div class="contact-info-block">
        <h3>For agents</h3>
        <p>Want to join the MeetLifeAgents network? <a href="/agents/apply/">Apply here</a>. We review applications within 5 business days.</p>
      </div>
      <div class="contact-info-block">
        <h3>Response time</h3>
        <p>We respond to all messages within 1 business day, Monday–Friday.</p>
      </div>
      <div class="contact-info-block">
        <h3>Data requests</h3>
        <p>To request deletion of your personal data, select "Opt-out / data deletion request" in the subject dropdown.</p>
      </div>
    </div>
  </div>
</div>

<script>
async function submitContact(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  const data = Object.fromEntries(new FormData(form));
  try {
    const res = await fetch('${apiUrl}/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source: 'meetlifeagents-contact' })
    });
    if (res.ok) {
      form.reset();
      document.getElementById('cf-success').style.display = 'block';
    } else {
      throw new Error('non-ok');
    }
  } catch {
    document.getElementById('cf-error').style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Send message';
  }
}
</script>

${footer()}
</body>
</html>`
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

function howItWorksPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const title   = 'How It Works — MeetLifeAgents'
  const desc    = 'How MeetLifeAgents connects you with verified local life insurance agents. Simple, transparent, no spam.'

  return `${head({ title, description: desc, canonical: `${siteUrl}/how-it-works/` })}
<body>
${header()}
<div class="container" style="padding-top:48px;padding-bottom:100px;">
  <nav class="breadcrumb"><a href="/">Home</a><span>›</span><span>How it works</span></nav>

  <div style="max-width:720px;">
    <h1 class="display" style="font-size:clamp(32px,4.5vw,56px);margin:32px 0 16px;line-height:1.1;">
      Meet a real agent.<br>No spam. No runaround.
    </h1>
    <p style="font-size:18px;color:var(--ink-soft);line-height:1.65;margin-bottom:48px;">
      Most insurance sites sell your contact info to dozens of agents who call for weeks. MeetLifeAgents works differently. You choose a local agent. You contact them directly.
    </p>
  </div>

  <!-- Steps -->
  <div class="hiw-full-steps">
    <div class="hiw-full-step">
      <div class="hiw-full-num">1</div>
      <div class="hiw-full-body">
        <h2>Find your city</h2>
        <p>Use the search on our homepage to find your state and city. We cover <strong>127 cities</strong> across 29 states, with more being added as we vet agents in new markets.</p>
        <p>If your city isn't listed yet, you can still use the form on any nearby city page to be matched with the closest available verified agent.</p>
      </div>
    </div>
    <div class="hiw-full-step">
      <div class="hiw-full-num">2</div>
      <div class="hiw-full-body">
        <h2>Review verified agents</h2>
        <p>Every agent on the site has passed our vetting process before appearing. We check:</p>
        <ul class="hiw-checklist">
          <li>Active state insurance license (verified through your state DOI)</li>
          <li>Resident of the state they serve — not a remote or virtual-only agent</li>
          <li>At least 10 independent carrier appointments — meaning they can shop the market for you</li>
          <li>Clean disciplinary record — no upheld complaints on their DOI file</li>
        </ul>
        <p>Top Tier agents have additional qualifications including 5+ years, specialty expertise, and advanced designations.</p>
      </div>
    </div>
    <div class="hiw-full-step">
      <div class="hiw-full-num">3</div>
      <div class="hiw-full-body">
        <h2>Contact them directly</h2>
        <p>Click "Call Agent" on any agent card. The button reveals the agent's direct extension on our routing number. Your second tap dials the number with the extension — the agent's phone rings.</p>
        <p>Or fill in our 3-step form to request a callback. We'll route your request to the best-matched agent for your coverage type.</p>
        <p>Either way: <strong>your information goes to one agent, not fifty</strong>.</p>
      </div>
    </div>
    <div class="hiw-full-step">
      <div class="hiw-full-num">4</div>
      <div class="hiw-full-body">
        <h2>We stay out of the way</h2>
        <p>After you connect, the conversation is between you and the agent. MeetLifeAgents doesn't get commissions. We don't influence which products get recommended. We just connect, then step back.</p>
      </div>
    </div>
  </div>

  <!-- FAQ strip -->
  <div style="margin-top:80px;padding-top:60px;border-top:1px solid var(--rule);">
    <h2 class="display" style="font-size:clamp(26px,3vw,38px);margin-bottom:40px;">Common questions</h2>
    <div class="hiw-faq">
      <details class="hiw-faq-item">
        <summary>Is MeetLifeAgents free for consumers?</summary>
        <p>Yes. Consumers use the directory at no cost. Agents pay a small fee when they receive a connection — similar to how a contractor pays for leads from a referral service. You never pay us anything.</p>
      </details>
      <details class="hiw-faq-item">
        <summary>Will I get spam calls after submitting my information?</summary>
        <p>Your contact information goes to the one matched agent, not to a network of 50 buyers. You'll hear from that agent — not from a waterfall of callers. See our <a href="/tcpa/">TCPA disclosure</a> for full consent language.</p>
      </details>
      <details class="hiw-faq-item">
        <summary>How do I know the agent is actually licensed?</summary>
        <p>Each agent card links directly to their NPN (National Producer Number) on their state's Department of Insurance lookup tool. You can verify the license yourself in 30 seconds.</p>
      </details>
      <details class="hiw-faq-item">
        <summary>What if I don't like the agent I'm matched with?</summary>
        <p>Simply go back to the city page and choose another agent. Every agent on the page is vetted — the choice is always yours.</p>
      </details>
      <details class="hiw-faq-item">
        <summary>Are the agents employees of MeetLifeAgents?</summary>
        <p>No. All agents are independent contractors who operate their own businesses. MeetLifeAgents is a directory. We connect; we don't employ, supervise, or control the agents.</p>
      </details>
    </div>
  </div>

  <!-- CTA -->
  <div style="margin-top:60px;text-align:center;">
    <a href="/" class="btn-primary" style="background:var(--ink);color:var(--cream);padding:16px 32px;border-radius:4px;font-size:16px;font-weight:600;text-decoration:none;display:inline-block;">
      Find an agent in your city →
    </a>
  </div>
</div>
${footer()}
</body>
</html>`
}

// ─── OUR VETTING ──────────────────────────────────────────────────────────────

function ourVettingPage(config) {
  const siteUrl = config.siteUrl || 'https://meetlifeagents.com'
  const title   = 'Our Vetting Standard — MeetLifeAgents'
  const desc    = 'How MeetLifeAgents vets life insurance agents. Three tiers: Verified, Premier, and Elite.'

  return `${head({ title, description: desc, canonical: `${siteUrl}/our-vetting/` })}
<body>
${header()}
<div class="container" style="padding-top:48px;padding-bottom:100px;">
  <nav class="breadcrumb"><a href="/">Home</a><span>›</span><span>Our vetting standard</span></nav>

  <div style="max-width:720px;">
    <h1 class="display" style="font-size:clamp(32px,4.5vw,52px);margin:32px 0 16px;line-height:1.1;">
      How we vet every agent.
    </h1>
    <p style="font-size:18px;color:var(--ink-soft);line-height:1.65;margin-bottom:48px;">
      Every agent on MeetLifeAgents is independently verified before they appear in our directory. Here is exactly what we check — and what each tier means.
    </p>
  </div>

  <!-- Baseline -->
  <div class="vetting-tier-block">
    <div class="vtb-header vtb-verified">
      <span class="vtb-tier-name">Verified Tier</span>
      <span class="vtb-tier-sub">Baseline — required for all listings</span>
    </div>
    <div class="vtb-body">
      <p>Every agent on our site must pass all four of these checks before appearing:</p>
      <ul class="vetting-full-list">
        <li><span class="vfl-check">✓</span><div><strong>Active state insurance license</strong> — verified directly through the state Department of Insurance NIPR/SERFF lookup. We check the license is current, not expired or surrendered.</div></li>
        <li><span class="vfl-check">✓</span><div><strong>Resident of the state they serve</strong> — we verify the agent is a genuine resident of the state, not a remote agent using a non-resident license. Consumers deserve someone who knows their community.</div></li>
        <li><span class="vfl-check">✓</span><div><strong>10+ independent carrier appointments</strong> — a truly independent agent can shop 10 or more carriers for you. Fewer than that and they may be steering you toward the products that pay them most, not the products that fit you best.</div></li>
        <li><span class="vfl-check">✓</span><div><strong>Clean DOI complaint record</strong> — we review the agent's disciplinary history on their state DOI. Any upheld complaints in the last 5 years disqualify from listing.</div></li>
      </ul>
    </div>
  </div>

  <!-- Premier -->
  <div class="vetting-tier-block">
    <div class="vtb-header vtb-premier">
      <span class="vtb-tier-name">Premier Tier</span>
      <span class="vtb-tier-sub">All Verified criteria, plus:</span>
    </div>
    <div class="vtb-body">
      <ul class="vetting-full-list">
        <li><span class="vfl-check">✓</span><div><strong>5+ years licensed</strong> — experience matters in a field where product nuances compound over time.</div></li>
        <li><span class="vfl-check">✓</span><div><strong>Documented specialty</strong> — not just "I do everything." The agent can articulate a specific niche (final expense, impaired risk, business owners, etc.) and demonstrate cases in that area.</div></li>
        <li><span class="vfl-check">✓</span><div><strong>24-hour response standard</strong> — platform-tracked. Premier agents maintain a documented average response time of 24 hours or better.</div></li>
      </ul>
    </div>
  </div>

  <!-- Elite -->
  <div class="vetting-tier-block">
    <div class="vtb-header vtb-elite">
      <span class="vtb-tier-name">Elite Tier · <em>Vetted Top Tier</em></span>
      <span class="vtb-tier-sub">All Premier criteria, plus:</span>
    </div>
    <div class="vtb-body">
      <ul class="vetting-full-list">
        <li><span class="vfl-check">✓</span><div><strong>Advanced industry designation</strong> — CLU (Chartered Life Underwriter), ChFC (Chartered Financial Consultant), CFP (Certified Financial Planner), LUTCF, or equivalent.</div></li>
        <li><span class="vfl-check">✓</span><div><strong>50+ written policies in stated specialty</strong> — track record of genuine production in the area they claim to specialize in.</div></li>
        <li><span class="vfl-check">✓</span><div><strong>3+ verified professional references</strong> — positive references from clients or peers that we contact directly.</div></li>
      </ul>
      <p style="margin-top:16px;font-size:14px;color:var(--ink-soft);">Elite agents display the gold <strong>VETTED · TOP TIER</strong> ribbon and gold card border in the directory.</p>
    </div>
  </div>

  <!-- What we don't show -->
  <div style="margin-top:60px;padding:32px;background:var(--cream-warm);border-radius:8px;">
    <h2 style="font-size:20px;margin-bottom:16px;">What we don't show — and why</h2>
    <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:12px;font-size:15px;color:var(--ink-soft);">
      <li>⊘ <strong>No star ratings or reviews at launch.</strong> FTC Endorsement Guide compliance and state DOI review rules require a rigorous process we're building toward. Misleading stars harm consumers; we'd rather wait and do it right.</li>
      <li>⊘ <strong>No carrier logos.</strong> Most carriers prohibit unauthorized use of their marks. Listing carriers by name is accurate and legally safe; logo use without permission creates C&D risk we don't take.</li>
      <li>⊘ <strong>No office addresses unless an agent chooses to provide them.</strong> Many agents work from home offices or meet clients at their location — an address isn't meaningful.</li>
    </ul>
  </div>

  <div style="margin-top:60px;text-align:center;">
    <a href="/" class="btn-primary" style="background:var(--ink);color:var(--cream);padding:16px 32px;border-radius:4px;font-size:16px;font-weight:600;text-decoration:none;display:inline-block;">
      Find a verified agent →
    </a>
  </div>
</div>
${footer()}
</body>
</html>`
}

module.exports = { notFoundPage, privacyPage, termsPage, tcpaPage, contactPage, howItWorksPage, ourVettingPage }
