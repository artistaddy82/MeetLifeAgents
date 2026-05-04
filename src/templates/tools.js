'use strict'
const { head, header, footer, GLOBAL_SCRIPTS } = require('./layout')

/* ─────────────────────────────────────────────────────────────────────────────
   /match/ — AgentMatch Quiz Tool
   4 visual questions → policy recommendation → contact form → success
   ───────────────────────────────────────────────────────────────────────── */

function matchPage(config) {
  const siteUrl  = config.siteUrl || 'https://meetlifeagents.com'
  const apiUrl   = config.apiUrl  || 'https://sidecarleads.com'
  const canonical = `${siteUrl}/match/`

  return `${head({
    title:       'Match Me with an Agent — Find the Right Life Insurance | MeetLifeAgents',
    description: 'Answer 4 quick questions and get matched with a vetted, locally-resident independent agent who specializes in exactly what you need.',
    canonical,
    extraHead:   `<meta name="robots" content="index,follow">`,
  })}
<body>
${header()}

<!-- ── HERO ────────────────────────────────────────────────────── -->
<section class="mth-hero">
  <div class="container">
    <div class="mth-hero-inner">
      <span class="mth-hero-eyebrow">AgentMatch™</span>
      <h1 class="display mth-hero-title">Find your <em>exact</em> policy match.</h1>
      <p class="mth-hero-sub">4 questions. 60 seconds. Matched with a vetted local agent who specializes in what you actually need.</p>
      <div class="mth-hero-pills">
        <span>✓ No spam</span>
        <span>✓ One agent, direct connection</span>
        <span>✓ Always free</span>
      </div>
    </div>
  </div>
</section>

<!-- ── TOOL ────────────────────────────────────────────────────── -->
<section class="mth-tool-sec">
  <div class="container">
    <div class="mth-tool-wrap" id="mth-tool">

      <!-- Progress bar -->
      <div class="mth-progress-bar">
        <div class="mth-progress-track">
          <div class="mth-progress-fill" id="mth-progress" style="width:25%"></div>
        </div>
        <span class="mth-progress-label" id="mth-progress-label">Step 1 of 4</span>
      </div>

      <!-- ── STEP 1: Goal ───────────────────────────────────────── -->
      <div class="mth-step active" id="mth-step-1">
        <div class="mth-step-head">
          <div class="mth-step-num">01</div>
          <h2 class="mth-question display">What's your main reason for getting life insurance?</h2>
          <p class="mth-step-hint">Pick the one that fits best — we'll tailor the match from here.</p>
        </div>
        <div class="mth-options mth-options--2col">
          <button class="mth-opt" data-q="goal" data-val="income">
            <span class="mth-opt-icon">🛡️</span>
            <span class="mth-opt-label">Protect my family's income</span>
            <span class="mth-opt-sub">Replace what I earn if something happens to me</span>
          </button>
          <button class="mth-opt" data-q="goal" data-val="final">
            <span class="mth-opt-icon">🕊️</span>
            <span class="mth-opt-label">Cover final expenses</span>
            <span class="mth-opt-sub">Funeral, burial, and end-of-life costs</span>
          </button>
          <button class="mth-opt" data-q="goal" data-val="wealth">
            <span class="mth-opt-icon">📈</span>
            <span class="mth-opt-label">Build tax-free wealth</span>
            <span class="mth-opt-sub">Cash value growth alongside permanent coverage</span>
          </button>
          <button class="mth-opt" data-q="goal" data-val="mortgage">
            <span class="mth-opt-icon">🏠</span>
            <span class="mth-opt-label">Pay off my mortgage</span>
            <span class="mth-opt-sub">Make sure my family keeps the house</span>
          </button>
          <button class="mth-opt mth-opt--wide" data-q="goal" data-val="unsure">
            <span class="mth-opt-icon">🤔</span>
            <span class="mth-opt-label">I'm not sure yet</span>
            <span class="mth-opt-sub">Help me figure out what I actually need</span>
          </button>
        </div>
      </div>

      <!-- ── STEP 2: Health ─────────────────────────────────────── -->
      <div class="mth-step" id="mth-step-2">
        <div class="mth-step-head">
          <div class="mth-step-num">02</div>
          <h2 class="mth-question display">How would you describe your overall health?</h2>
          <p class="mth-step-hint">This helps us match you to agents whose carrier portfolio fits your profile.</p>
        </div>
        <div class="mth-options mth-options--1col">
          <button class="mth-opt" data-q="health" data-val="excellent">
            <span class="mth-opt-icon">💪</span>
            <span class="mth-opt-label">Excellent</span>
            <span class="mth-opt-sub">No significant conditions, not a smoker, no medications</span>
          </button>
          <button class="mth-opt" data-q="health" data-val="good">
            <span class="mth-opt-icon">👍</span>
            <span class="mth-opt-label">Good</span>
            <span class="mth-opt-sub">Minor issues — managed with medication or lifestyle</span>
          </button>
          <button class="mth-opt" data-q="health" data-val="some">
            <span class="mth-opt-icon">⚠️</span>
            <span class="mth-opt-label">Some health conditions</span>
            <span class="mth-opt-sub">Diabetes, heart history, cancer remission, or similar</span>
          </button>
          <button class="mth-opt" data-q="health" data-val="declined">
            <span class="mth-opt-icon">🔒</span>
            <span class="mth-opt-label">I've been declined before</span>
            <span class="mth-opt-sub">A previous application was denied — I need guaranteed options</span>
          </button>
        </div>
        <button class="mth-back" onclick="mthBack(1)">← Back</button>
      </div>

      <!-- ── STEP 3: Age ────────────────────────────────────────── -->
      <div class="mth-step" id="mth-step-3">
        <div class="mth-step-head">
          <div class="mth-step-num">03</div>
          <h2 class="mth-question display">What's your age range?</h2>
          <p class="mth-step-hint">Premiums are set at the age you apply — locking in now saves money.</p>
        </div>
        <div class="mth-options mth-options--ages">
          <button class="mth-opt mth-opt--age" data-q="age" data-val="18-35">
            <span class="mth-opt-age-num">18–35</span>
            <span class="mth-opt-sub">Lowest rates available</span>
          </button>
          <button class="mth-opt mth-opt--age" data-q="age" data-val="36-45">
            <span class="mth-opt-age-num">36–45</span>
            <span class="mth-opt-sub">Still excellent pricing</span>
          </button>
          <button class="mth-opt mth-opt--age" data-q="age" data-val="46-55">
            <span class="mth-opt-age-num">46–55</span>
            <span class="mth-opt-sub">Act before rates climb</span>
          </button>
          <button class="mth-opt mth-opt--age" data-q="age" data-val="56-65">
            <span class="mth-opt-age-num">56–65</span>
            <span class="mth-opt-sub">More options than you think</span>
          </button>
          <button class="mth-opt mth-opt--age" data-q="age" data-val="65+">
            <span class="mth-opt-age-num">65+</span>
            <span class="mth-opt-sub">Final expense &amp; permanent options</span>
          </button>
        </div>
        <button class="mth-back" onclick="mthBack(2)">← Back</button>
      </div>

      <!-- ── STEP 4: Priority ───────────────────────────────────── -->
      <div class="mth-step" id="mth-step-4">
        <div class="mth-step-head">
          <div class="mth-step-num">04</div>
          <h2 class="mth-question display">Last one — what matters most to you?</h2>
          <p class="mth-step-hint">There's no wrong answer. This tells us how to weigh the trade-offs.</p>
        </div>
        <div class="mth-options mth-options--2col">
          <button class="mth-opt" data-q="priority" data-val="cost">
            <span class="mth-opt-icon">💰</span>
            <span class="mth-opt-label">Lowest monthly cost</span>
            <span class="mth-opt-sub">Maximum coverage for minimum premium</span>
          </button>
          <button class="mth-opt" data-q="priority" data-val="permanent">
            <span class="mth-opt-icon">♾️</span>
            <span class="mth-opt-label">Permanent coverage</span>
            <span class="mth-opt-sub">Coverage that lasts my entire lifetime</span>
          </button>
          <button class="mth-opt" data-q="priority" data-val="cashvalue">
            <span class="mth-opt-icon">💵</span>
            <span class="mth-opt-label">Builds cash value</span>
            <span class="mth-opt-sub">A policy that grows as a financial asset</span>
          </button>
          <button class="mth-opt" data-q="priority" data-val="speed">
            <span class="mth-opt-icon">⚡</span>
            <span class="mth-opt-label">Fast, easy approval</span>
            <span class="mth-opt-sub">No exam, quick decision, coverage fast</span>
          </button>
        </div>
        <button class="mth-back" onclick="mthBack(3)">← Back</button>
      </div>

      <!-- ── RESULT + CONTACT ──────────────────────────────────── -->
      <div class="mth-step" id="mth-step-result">
        <div class="mth-result-wrap">
          <div class="mth-result-card">
            <div class="mth-result-label">Your match</div>
            <div class="mth-result-policy display" id="mth-policy-name">Term Life Insurance</div>
            <div class="mth-result-why" id="mth-policy-why">Based on your answers, this is the most efficient option for your situation.</div>
            <div class="mth-result-tags" id="mth-policy-tags"></div>
          </div>
          <div class="mth-contact-form">
            <h3 class="mth-contact-head display">Connect with a specialist near you</h3>
            <p class="mth-contact-sub">Your info goes to one matched local agent — not a pool of buyers.</p>
            <div class="mth-input-row">
              <input type="text" class="mth-input" id="mth-first" placeholder="First name" autocomplete="given-name">
              <input type="text" class="mth-input" id="mth-last"  placeholder="Last name"  autocomplete="family-name">
            </div>
            <input type="tel"   class="mth-input" id="mth-phone" placeholder="Phone number" autocomplete="tel">
            <input type="email" class="mth-input" id="mth-email" placeholder="Email (optional)" autocomplete="email">
            <div class="mth-location-row">
              <div class="select-wrap">
                <select class="mth-select" id="mth-state-sel">
                  <option value="">State</option>
                </select>
              </div>
              <div class="select-wrap">
                <select class="mth-select" id="mth-city-sel" disabled>
                  <option value="">City</option>
                </select>
              </div>
            </div>
            <button class="mth-submit" id="mth-submit-btn" onclick="mthSubmit()">
              Connect me with a <span id="mth-btn-policy">Term Life</span> specialist →
            </button>
            <button class="mth-back" style="margin-top:12px;" onclick="mthBack(4)">← Retake the quiz</button>
            <p class="mth-privacy">By submitting, you agree to be contacted by one licensed agent. We never sell your information. <a href="/tcpa/">TCPA disclosure</a>.</p>
          </div>
        </div>
      </div>

      <!-- ── SUCCESS ────────────────────────────────────────────── -->
      <div class="mth-step" id="mth-step-success">
        <div class="mth-success">
          <div class="mth-success-mark">✓</div>
          <h2 class="display mth-success-head">You're matched.</h2>
          <p class="mth-success-body">A <strong id="mth-success-policy">Term Life</strong> specialist in your area will call you within 15 minutes.</p>
          <p class="mth-success-sub">Check your phone for a call from a local number. No pressure, no pitch — just answers.</p>
          <a href="/" class="mth-success-link">← Browse all agents by city</a>
        </div>
      </div>

    </div><!-- /mth-tool -->
  </div>
</section>

<!-- ── HOW IT WORKS STRIP ──────────────────────────────────────── -->
<section class="mth-how-sec">
  <div class="container">
    <div class="mth-how-grid">
      <div class="mth-how-item">
        <div class="mth-how-num display">1</div>
        <h4>Answer 4 questions</h4>
        <p>Tell us your goal, health, age, and priorities. Takes under 60 seconds.</p>
      </div>
      <div class="mth-how-item">
        <div class="mth-how-num display">2</div>
        <h4>See your policy match</h4>
        <p>We identify the product category that fits your answers — with a plain explanation of why.</p>
      </div>
      <div class="mth-how-item">
        <div class="mth-how-num display">3</div>
        <h4>Connect with a local specialist</h4>
        <p>One verified, locally-resident agent who works that product type. Direct — no middlemen.</p>
      </div>
    </div>
  </div>
</section>

<script>
(function () {
  const API_URL = '${apiUrl}';
  const answers = { goal: null, health: null, age: null, priority: null };

  // ── Recommendation engine ──────────────────────────────────────
  const RECS = {
    'term':  {
      name: 'Term Life Insurance',
      short: 'Term Life',
      tags: ['Most affordable', 'Level premiums', 'Up to $5M coverage'],
      why: 'For income replacement and mortgage protection, term is the most efficient option — maximum coverage at the lowest cost. You pay for pure protection, nothing else.',
      link: '/al/term-insurance/',
    },
    'final': {
      name: 'Final Expense Insurance',
      short: 'Final Expense',
      tags: ['No medical exam', 'Guaranteed issue available', 'Ages 50–85'],
      why: 'A small permanent policy sized for burial and end-of-life costs. Simplified underwriting means even applicants with health conditions can qualify.',
      link: '/al/final-expense/',
    },
    'whole': {
      name: 'Whole Life Insurance',
      short: 'Whole Life',
      tags: ['Guaranteed death benefit', 'Guaranteed cash value growth', 'Lifelong coverage'],
      why: 'Permanent coverage with guaranteed growth — the most predictable permanent option. Cash value grows at a fixed rate regardless of market conditions.',
      link: '/al/whole-life/',
    },
    'iul': {
      name: 'Indexed Universal Life (IUL)',
      short: 'IUL',
      tags: ['Market-linked growth', '0% floor (never lose value)', 'Tax-free retirement income'],
      why: 'For tax-free wealth building alongside permanent coverage. Cash value grows linked to a market index with a 0% downside floor — upside potential without direct market risk.',
      link: '/al/indexed-universal-life/',
    },
    'mort': {
      name: 'Term Life Insurance',
      short: 'Term Life',
      tags: ['Pay your family — not the bank', 'Level death benefit', 'More flexible than MPI'],
      why: 'For mortgage protection, a level term policy almost always beats dedicated mortgage protection insurance. Your family gets a lump sum they control — not a payout that only covers the lender.',
      link: '/al/term-insurance/',
    },
  };

  function recommend(g, h, a, p) {
    if (h === 'declined') return RECS.final;
    if (g === 'final')    return RECS.final;
    if (a === '65+')      return RECS.final;
    if (g === 'mortgage') return RECS.mort;
    if (g === 'wealth') {
      return (p === 'cashvalue') ? RECS.iul : RECS.whole;
    }
    if (p === 'cashvalue')  return RECS.iul;
    if (p === 'permanent')  return RECS.whole;
    if (p === 'speed' && (a === '56-65' || a === '65+')) return RECS.final;
    return RECS.term;
  }

  // ── Step navigation ────────────────────────────────────────────
  const progressEl = document.getElementById('mth-progress');
  const labelEl    = document.getElementById('mth-progress-label');
  const steps      = [1, 2, 3, 4, 'result', 'success'];
  const TOTAL      = 4;

  function showStep(id) {
    document.querySelectorAll('.mth-step').forEach(s => s.classList.remove('active'));
    const el = document.getElementById('mth-step-' + id);
    if (el) { el.classList.add('active'); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    const n = typeof id === 'number' ? id : (id === 'result' ? TOTAL + 1 : TOTAL + 2);
    progressEl.style.width = Math.min(100, Math.round((n / TOTAL) * 100)) + '%';
    labelEl.textContent = typeof id === 'number' ? 'Step ' + id + ' of ' + TOTAL : (id === 'result' ? 'Almost done!' : 'Done!');
  }

  window.mthBack = function(toStep) { showStep(toStep); };

  // ── Option click handlers ──────────────────────────────────────
  document.querySelectorAll('.mth-opt').forEach(btn => {
    btn.addEventListener('click', function () {
      const q   = this.dataset.q;
      const val = this.dataset.val;
      answers[q] = val;

      document.querySelectorAll('[data-q="' + q + '"]').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');

      setTimeout(() => {
        if (q === 'goal')     showStep(2);
        else if (q === 'health') showStep(3);
        else if (q === 'age')    showStep(4);
        else if (q === 'priority') {
          const rec = recommend(answers.goal, answers.health, answers.age, answers.priority);
          renderResult(rec);
          showStep('result');
        }
      }, 220);
    });
  });

  // ── Render result card ─────────────────────────────────────────
  function renderResult(rec) {
    document.getElementById('mth-policy-name').textContent = rec.name;
    document.getElementById('mth-policy-why').textContent  = rec.why;
    document.getElementById('mth-btn-policy').textContent  = rec.short;
    document.getElementById('mth-success-policy').textContent = rec.short;
    const tagEl = document.getElementById('mth-policy-tags');
    tagEl.innerHTML = rec.tags.map(t => '<span class="mth-tag">' + t + '</span>').join('');
  }

  // ── State/city dropdowns ───────────────────────────────────────
  const cities = window.MLA_CITIES || {};
  const stateEl = document.getElementById('mth-state-sel');
  const cityEl  = document.getElementById('mth-city-sel');

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
  };

  Object.keys(cities).sort().forEach(s => {
    const o = document.createElement('option');
    o.value = s; o.textContent = stateNames[s] || s.toUpperCase();
    stateEl.appendChild(o);
  });

  stateEl.addEventListener('change', () => {
    cityEl.innerHTML = '<option value="">City</option>';
    (cities[stateEl.value] || []).forEach(c => {
      const o = document.createElement('option');
      o.value = c.slug; o.textContent = c.name;
      cityEl.appendChild(o);
    });
    cityEl.disabled = !(cities[stateEl.value] || []).length;
  });

  // ── Submit ─────────────────────────────────────────────────────
  window.mthSubmit = function () {
    const first = document.getElementById('mth-first').value.trim();
    const last  = document.getElementById('mth-last').value.trim();
    const phone = document.getElementById('mth-phone').value.trim();
    const email = document.getElementById('mth-email').value.trim();
    const state = stateEl.value;
    const city  = cityEl.value;

    if (!first || !last || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const rec = recommend(answers.goal, answers.health, answers.age, answers.priority);
    const payload = {
      firstName: first, lastName: last, phone, email,
      city, state,
      coverageType: answers.goal,
      specialty:    rec.short,
      matchGoal:    answers.goal,
      matchHealth:  answers.health,
      matchAge:     answers.age,
      matchPriority:answers.priority,
      source: 'match-tool',
      timestamp: new Date().toISOString(),
    };

    fetch(API_URL + '/leads/web', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});

    // If state + city selected, redirect to that city page
    if (state && city) {
      setTimeout(() => { window.location.href = '/' + state + '/' + city + '/'; }, 2200);
    }
    showStep('success');
  };

})();
</script>

${GLOBAL_SCRIPTS}
${footer()}
</body>
</html>`
}

/* ─────────────────────────────────────────────────────────────────────────────
   /calculator/ — Premium Calculator
   Inputs → estimated range → lead form
   ───────────────────────────────────────────────────────────────────────── */

function calculatorPage(config) {
  const siteUrl  = config.siteUrl || 'https://meetlifeagents.com'
  const apiUrl   = config.apiUrl  || 'https://sidecarleads.com'
  const canonical = `${siteUrl}/calculator/`

  return `${head({
    title:       'Life Insurance Premium Calculator — Estimate Your Monthly Cost | MeetLifeAgents',
    description: 'Get an instant estimate of your monthly life insurance premium. Enter your age, coverage amount, and policy type — see a realistic range in seconds.',
    canonical,
    extraHead:   `<meta name="robots" content="index,follow">`,
  })}
<body>
${header()}

<!-- ── HERO ────────────────────────────────────────────────────── -->
<section class="calc-hero">
  <div class="container">
    <p class="city-eyebrow" style="padding-top:0;color:var(--gold-soft);">Estimate in 30 seconds</p>
    <h1 class="display calc-hero-title">Premium Calculator</h1>
    <p class="calc-hero-sub">Adjust the inputs and see a realistic monthly cost range — no email required to see results.</p>
  </div>
</section>

<!-- ── CALCULATOR TOOL ─────────────────────────────────────────── -->
<section class="calc-tool-sec">
  <div class="container">
    <div class="calc-tool-grid">

      <!-- LEFT: Inputs -->
      <div class="calc-inputs-col">
        <h2 class="display calc-col-head">Your details</h2>

        <div class="calc-field">
          <label class="calc-label">Age</label>
          <div class="calc-slider-wrap">
            <input type="range" class="calc-slider" id="calc-age" min="18" max="75" value="35" oninput="calcUpdate()">
            <div class="calc-slider-val"><span id="calc-age-display">35</span> years old</div>
          </div>
        </div>

        <div class="calc-field">
          <label class="calc-label">Sex assigned at birth</label>
          <div class="calc-toggle-row">
            <button class="calc-toggle selected" data-field="gender" data-val="male"   onclick="calcToggle(this)">Male</button>
            <button class="calc-toggle"           data-field="gender" data-val="female" onclick="calcToggle(this)">Female</button>
          </div>
        </div>

        <div class="calc-field">
          <label class="calc-label">Tobacco use in the last 12 months?</label>
          <div class="calc-toggle-row">
            <button class="calc-toggle selected" data-field="smoker" data-val="no"  onclick="calcToggle(this)">No</button>
            <button class="calc-toggle"          data-field="smoker" data-val="yes" onclick="calcToggle(this)">Yes</button>
          </div>
        </div>

        <div class="calc-field">
          <label class="calc-label">Policy type</label>
          <div class="calc-type-grid">
            <button class="calc-type selected" data-field="type" data-val="term20" onclick="calcToggle(this)">
              <span class="calc-type-name">Term 20</span>
              <span class="calc-type-sub">20-year level term</span>
            </button>
            <button class="calc-type" data-field="type" data-val="term10" onclick="calcToggle(this)">
              <span class="calc-type-name">Term 10</span>
              <span class="calc-type-sub">10-year level term</span>
            </button>
            <button class="calc-type" data-field="type" data-val="term30" onclick="calcToggle(this)">
              <span class="calc-type-name">Term 30</span>
              <span class="calc-type-sub">30-year level term</span>
            </button>
            <button class="calc-type" data-field="type" data-val="final" onclick="calcToggle(this)">
              <span class="calc-type-name">Final Expense</span>
              <span class="calc-type-sub">Permanent, $5K–$25K</span>
            </button>
          </div>
        </div>

        <div class="calc-field" id="coverage-field">
          <label class="calc-label">Coverage amount</label>
          <div class="calc-coverage-grid">
            <button class="calc-cov" data-field="coverage" data-val="100"  onclick="calcToggle(this)">$100K</button>
            <button class="calc-cov" data-field="coverage" data-val="250"  onclick="calcToggle(this)">$250K</button>
            <button class="calc-cov selected" data-field="coverage" data-val="500"  onclick="calcToggle(this)">$500K</button>
            <button class="calc-cov" data-field="coverage" data-val="750"  onclick="calcToggle(this)">$750K</button>
            <button class="calc-cov" data-field="coverage" data-val="1000" onclick="calcToggle(this)">$1M</button>
          </div>
        </div>

        <div class="calc-field" id="fe-coverage-field" style="display:none;">
          <label class="calc-label">Coverage amount</label>
          <div class="calc-coverage-grid">
            <button class="calc-cov selected" data-field="fe-coverage" data-val="10" onclick="calcToggle(this)">$10K</button>
            <button class="calc-cov" data-field="fe-coverage" data-val="15" onclick="calcToggle(this)">$15K</button>
            <button class="calc-cov" data-field="fe-coverage" data-val="20" onclick="calcToggle(this)">$20K</button>
            <button class="calc-cov" data-field="fe-coverage" data-val="25" onclick="calcToggle(this)">$25K</button>
          </div>
        </div>
      </div>

      <!-- RIGHT: Result -->
      <div class="calc-result-col" id="calc-result-col">
        <div class="calc-result-card" id="calc-result-card">
          <div class="calc-result-label">Estimated monthly premium</div>
          <div class="calc-result-range">
            <span class="calc-result-num" id="calc-low">$18</span>
            <span class="calc-result-dash">–</span>
            <span class="calc-result-num" id="calc-high">$35</span>
            <span class="calc-result-unit">/mo</span>
          </div>
          <div class="calc-result-summary" id="calc-result-summary">
            500,000 · 20-year term · age 35 · male · non-smoker
          </div>
          <div class="calc-result-disclaimer">
            Based on aggregate market data from top-rated carriers. Your exact rate depends on full underwriting — including health history, medical records, and carrier guidelines. This estimate is for planning purposes only.
          </div>
          <div class="calc-result-health-note" id="calc-health-note"></div>
        </div>

        <!-- Lead form -->
        <div class="calc-lead-card">
          <h3 class="display calc-lead-head">Get your exact quote</h3>
          <p class="calc-lead-sub">A vetted local agent will shop this against multiple carriers and give you a real, bindable number — free, no obligation.</p>

          <div class="mth-input-row">
            <input type="text" class="mth-input" id="cq-first" placeholder="First name" autocomplete="given-name">
            <input type="text" class="mth-input" id="cq-last"  placeholder="Last name"  autocomplete="family-name">
          </div>
          <input type="tel"   class="mth-input" id="cq-phone" placeholder="Phone number" autocomplete="tel">
          <div class="mth-location-row">
            <div class="select-wrap">
              <select class="mth-select" id="cq-state-sel"><option value="">State</option></select>
            </div>
            <div class="select-wrap">
              <select class="mth-select" id="cq-city-sel" disabled><option value="">City</option></select>
            </div>
          </div>
          <button class="mth-submit" onclick="cqSubmit()">Get my exact quote →</button>
          <p class="mth-privacy">One agent. No spam. <a href="/tcpa/">TCPA disclosure</a>.</p>

          <div class="calc-lead-success" id="cq-success" style="display:none;">
            <div class="mth-success-mark" style="font-size:28px;margin-bottom:12px;">✓</div>
            <strong>You're all set.</strong>
            <p>A local agent will call you shortly with a real quote across multiple carriers.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── EXPLAINER STRIP ─────────────────────────────────────────── -->
<section style="background:var(--cream-warm);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:56px 0;">
  <div class="container">
    <div class="mth-how-grid">
      <div class="mth-how-item">
        <div class="mth-how-num display">~</div>
        <h4>These are estimates</h4>
        <p>Real premiums depend on full medical underwriting — health records, blood work, and carrier-specific guidelines. This tool gives you a realistic planning range.</p>
      </div>
      <div class="mth-how-item">
        <div class="mth-how-num display">↕</div>
        <h4>Ranges reflect carrier spread</h4>
        <p>Different carriers rate the same applicant differently. The range reflects the spread across top-rated carriers — an independent agent finds the low end for your profile.</p>
      </div>
      <div class="mth-how-item">
        <div class="mth-how-num display">✓</div>
        <h4>Exact quotes are free</h4>
        <p>A real, bindable quote from a vetted independent agent costs nothing. They shop multiple carriers and show you the actual numbers — no obligation.</p>
      </div>
    </div>
  </div>
</section>

<script>
(function () {
  const API_URL = '${apiUrl}';

  // ── State ──────────────────────────────────────────────────────
  const state = { age: 35, gender: 'male', smoker: 'no', type: 'term20', coverage: 500, feCoverage: 10 };

  // ── Base rates per $100K, 20-yr term, male, non-smoker ─────────
  // [low, high] per $100K face amount
  const TERM_BASE = {
    18: [4, 7],   25: [5, 8],   30: [6, 9],   35: [7, 11],
    40: [10, 15], 45: [15, 23], 50: [24, 38], 55: [38, 60],
    60: [60, 98], 65: [98, 155],70: [155, 250],75: [240, 390],
  };

  // Final expense base per $10K face, male, non-smoker
  const FE_BASE = {
    50: [18, 28],  55: [22, 35],  60: [28, 45],
    65: [36, 58],  70: [50, 80],  75: [70, 115], 80: [100, 165],
  };

  function nearestAge(tbl, age) {
    const keys = Object.keys(tbl).map(Number).sort((a, b) => a - b);
    let closest = keys[0];
    for (const k of keys) { if (k <= age) closest = k; else break; }
    return tbl[closest];
  }

  function calcPremium() {
    const age = state.age;

    if (state.type === 'final') {
      const base  = nearestAge(FE_BASE, Math.max(50, Math.min(80, age)));
      const feMult = state.feCoverage / 10;
      const smkMult = state.smoker === 'yes' ? 1.7 : 1;
      const genMult = state.gender === 'female' ? 0.82 : 1;
      return [
        Math.round(base[0] * feMult * smkMult * genMult),
        Math.round(base[1] * feMult * smkMult * genMult),
      ];
    }

    // Term
    const base100k = nearestAge(TERM_BASE, Math.min(75, age));
    const termMult = { term10: 0.68, term20: 1.0, term30: 1.38 }[state.type] || 1;
    // Coverage multiplier (per $100K, economies of scale)
    const covMults = { 100: 1.0, 250: 2.35, 500: 4.4, 750: 6.3, 1000: 8.2 };
    const covMult  = covMults[state.coverage] || 4.4;
    const genMult  = state.gender === 'female' ? 0.8 : 1;
    const smkMult  = state.smoker === 'yes' ? 2.5 : 1;

    return [
      Math.round(base100k[0] * termMult * covMult * genMult * smkMult),
      Math.round(base100k[1] * termMult * covMult * genMult * smkMult),
    ];
  }

  function fmtCov(v, type) {
    if (type === 'final') return '$' + state.feCoverage + ',000 final expense';
    const labels = { 100: '$100,000', 250: '$250,000', 500: '$500,000', 750: '$750,000', 1000: '$1,000,000' };
    const typeLabels = { term10: '10-year term', term20: '20-year term', term30: '30-year term' };
    return (labels[v] || v) + ' · ' + (typeLabels[type] || type);
  }

  window.calcUpdate = function () {
    const ageSlider = document.getElementById('calc-age');
    state.age = +ageSlider.value;
    document.getElementById('calc-age-display').textContent = state.age;
    renderResult();
  };

  window.calcToggle = function (btn) {
    const field = btn.dataset.field;
    const val   = btn.dataset.val;
    document.querySelectorAll('[data-field="' + field + '"]').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    if (field === 'gender')      state.gender   = val;
    if (field === 'smoker')      state.smoker   = val;
    if (field === 'type')        state.type     = val;
    if (field === 'coverage')    state.coverage = +val;
    if (field === 'fe-coverage') state.feCoverage = +val;

    // Show/hide coverage fields
    document.getElementById('coverage-field').style.display   = state.type === 'final' ? 'none' : '';
    document.getElementById('fe-coverage-field').style.display = state.type === 'final' ? '' : 'none';

    renderResult();
  };

  function renderResult() {
    const [low, high] = calcPremium();
    document.getElementById('calc-low').textContent  = '$' + low;
    document.getElementById('calc-high').textContent = '$' + high;

    const genderLabel = state.gender === 'female' ? 'female' : 'male';
    const smokerLabel = state.smoker === 'yes'    ? 'smoker' : 'non-smoker';
    document.getElementById('calc-result-summary').textContent =
      fmtCov(state.coverage, state.type) + ' · age ' + state.age + ' · ' + genderLabel + ' · ' + smokerLabel;

    const note = document.getElementById('calc-health-note');
    if (state.smoker === 'yes') {
      note.textContent = 'Tobacco users typically pay 2–3× more than non-smokers. Quitting for 12+ months can qualify you for non-smoker rates.';
      note.style.display = '';
    } else if (state.age >= 60 && state.type !== 'final') {
      note.textContent = 'Rates at 60+ vary significantly by carrier and health classification. An independent agent will find the best underwriting match.';
      note.style.display = '';
    } else {
      note.style.display = 'none';
    }
  }

  // ── State/city for lead form ───────────────────────────────────
  const cities   = window.MLA_CITIES || {};
  const stateEl  = document.getElementById('cq-state-sel');
  const cityEl   = document.getElementById('cq-city-sel');
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
  };
  Object.keys(cities).sort().forEach(s => {
    const o = document.createElement('option');
    o.value = s; o.textContent = stateNames[s] || s.toUpperCase();
    stateEl.appendChild(o);
  });
  stateEl.addEventListener('change', () => {
    cityEl.innerHTML = '<option value="">City</option>';
    (cities[stateEl.value] || []).forEach(c => {
      const o = document.createElement('option');
      o.value = c.slug; o.textContent = c.name;
      cityEl.appendChild(o);
    });
    cityEl.disabled = !(cities[stateEl.value] || []).length;
  });

  // ── Submit ─────────────────────────────────────────────────────
  window.cqSubmit = function () {
    const first = document.getElementById('cq-first').value.trim();
    const last  = document.getElementById('cq-last').value.trim();
    const phone = document.getElementById('cq-phone').value.trim();
    if (!first || !last || !phone) { alert('Please enter your name and phone number.'); return; }
    const [low, high] = calcPremium();
    const payload = {
      firstName: first, lastName: last, phone,
      city: cityEl.value, state: stateEl.value,
      coverageType: state.type,
      specialty: state.type === 'final' ? 'Final Expense' : 'Term Life',
      calcAge: state.age, calcGender: state.gender,
      calcSmoker: state.smoker, calcType: state.type,
      calcCoverage: state.type === 'final' ? state.feCoverage + 'K' : state.coverage + 'K',
      calcEstLow: low, calcEstHigh: high,
      source: 'calculator',
      timestamp: new Date().toISOString(),
    };
    fetch(API_URL + '/leads/web', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});
    document.getElementById('cq-success').style.display = '';
  };

  // Initial render
  renderResult();
})();
</script>

${GLOBAL_SCRIPTS}
${footer()}
</body>
</html>`
}

module.exports = { matchPage, calculatorPage }
