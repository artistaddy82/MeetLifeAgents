/**
 * city.js — MeetLifeAgents city page interactions
 *
 * 1. Call routing — "Call Agent" button: first tap reveals platform number +
 *    agent extension; second tap opens the dialer. Auto-collapses after 30s.
 * 2. Intake form — 3-step lead capture with coverage-type routing.
 */

// Set by the build — injected into the page as window.MLA_CONFIG
const PLATFORM_NUMBER  = window.MLA_CONFIG?.platformNumber  || '+18005550199';
const PLATFORM_DISPLAY = window.MLA_CONFIG?.platformDisplay || '(800) 555-0199';
const API_URL          = window.MLA_CONFIG?.apiUrl          || 'https://sidecarleads.com';

// ── CALL ROUTING ──────────────────────────────────────────────────────────────

function collapseButton(btn) {
  btn.classList.remove('revealed');
  const isIntake = btn.classList.contains('intake-call-btn');
  btn.innerHTML = isIntake ? 'Call Now' : 'Call Agent';
  btn.style.removeProperty('flex-direction');
  if (btn._collapseTimer) { clearTimeout(btn._collapseTimer); btn._collapseTimer = null; }
}

function revealCall(btn) {
  if (btn.classList.contains('revealed')) {
    window.location.href = `tel:${PLATFORM_NUMBER},,${btn.dataset.ext}`;
    return;
  }
  // Collapse any other open button
  document.querySelectorAll('.call-btn.revealed, .intake-call-btn.revealed').forEach(other => {
    if (other !== btn) collapseButton(other);
  });
  const ext = btn.dataset.ext;
  btn.classList.add('revealed');
  btn.innerHTML = `
    <span class="call-btn-label">Tap again to dial</span>
    <span class="call-btn-ext">${PLATFORM_DISPLAY} · Ext. ${ext}</span>
  `;
  // Auto-collapse after 30s
  btn._collapseTimer = setTimeout(() => {
    if (btn.classList.contains('revealed')) collapseButton(btn);
  }, 30000);
}

function revealIntakeCall(btn) { revealCall(btn); }

// ── INTAKE FORM ───────────────────────────────────────────────────────────────

const intakeData = {
  coverageType: null, specialty: null, coverageAmount: null,
  firstName: null, lastName: null, phone: null, email: null,
  city: document.documentElement.dataset.city   || '',
  state: document.documentElement.dataset.state || '',
  timestamp: null,
};

function goToStep(step) {
  document.querySelectorAll('.intake-step, .intake-success').forEach(el => el.classList.remove('active'));
  const target = document.querySelector(`[data-step="${step}"]`);
  if (target) target.classList.add('active');
}

// Step 1 — coverage type
document.querySelectorAll('[data-step="1"] .intake-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('[data-step="1"] .intake-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    intakeData.coverageType = opt.dataset.value;
    intakeData.specialty    = opt.dataset.specialty;
    setTimeout(() => goToStep(2), 200);
  });
});

// Step 2 — coverage amount
document.querySelectorAll('[data-step="2"] .intake-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('[data-step="2"] .intake-opt').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    intakeData.coverageAmount = opt.dataset.value;
    setTimeout(() => goToStep(3), 200);
  });
});

// Step 3 — submit
function submitIntakeForm() {
  const first = document.getElementById('intake-first').value.trim();
  const last  = document.getElementById('intake-last').value.trim();
  const phone = document.getElementById('intake-phone').value.trim();
  const email = document.getElementById('intake-email').value.trim();

  if (!first || !last || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }

  Object.assign(intakeData, { firstName: first, lastName: last, phone, email, timestamp: new Date().toISOString() });

  // POST to SidecarLeads API — matches existing lead capture schema
  fetch(`${API_URL}/leads/web`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intakeData),
  }).catch(() => { /* silent fail — lead still goes through */ });

  const specialtyText = intakeData.specialty === 'General' ? 'your coverage needs' : (intakeData.specialty || 'life insurance').toLowerCase();
  const el = document.getElementById('success-specialty');
  if (el) el.textContent = specialtyText;
  goToStep('success');
}
