/**
 * homepage.js — MeetLifeAgents homepage
 * Cascading state → city dropdown + Mapbox map init.
 * CITIES_BY_STATE is injected by the build as window.MLA_CITIES.
 */

// Cascading dropdowns
const stateSelect = document.getElementById('state-select');
const citySelect  = document.getElementById('city-select');
const searchBtn   = document.querySelector('.search-cta');

if (stateSelect && citySelect) {
  stateSelect.addEventListener('change', () => {
    const state = stateSelect.value;
    citySelect.innerHTML = '<option value="">Select city</option>';
    const cities = (window.MLA_CITIES || {})[state] || [];
    if (cities.length) {
      cities.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.slug;
        opt.textContent = c.name;
        citySelect.appendChild(opt);
      });
      citySelect.disabled = false;
    } else {
      citySelect.disabled = true;
    }
  });
}

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const state = stateSelect?.value;
    const city  = citySelect?.value;
    if (state && city) {
      window.location.href = `/${state}/${city}/`;
    } else if (state) {
      window.location.href = `/${state}/`;
    }
  });
}

// ── Shared geo state ──────────────────────────────────────────────────────────
// geo detection runs once; results flow to dropdown, map glow, and featured agents
let _geoCode = '';   // e.g. "NC"
let _geoName = '';   // e.g. "North Carolina"

// Stored after map loads so geo can glow even if it arrives late
window._mlaMap          = null;
window._mlaMarkerDots   = {};  // { "NC": [dotEl, ...], ... }

function onGeoDetected(code, name) {
  _geoCode = code;
  _geoName = name;
  autoFillDropdown(code, name);
  if (window._mlaMap) glowState(code);
}

function autoFillDropdown(code, name) {
  if (!stateSelect || !code) return;
  const opts = Array.from(stateSelect.options);
  // Match by state name text (geo.region = "North Carolina")
  const match = opts.find(o => o.textContent.trim() === name);
  if (!match) return;
  stateSelect.value = match.value;
  stateSelect.dispatchEvent(new Event('change'));
  // Golden glow on the select wrapper
  const wrap = stateSelect.closest('.select-wrap');
  if (wrap) {
    wrap.classList.add('geo-active');
    // Fade glow after 5 s but keep the border to show it was auto-filled
    setTimeout(() => wrap.classList.remove('geo-active'), 5000);
  }
}

function glowState(code) {
  const map = window._mlaMap;
  if (!map || !code) return;

  // Pulse city markers in the detected state
  const dots = window._mlaMarkerDots[code] || [];
  dots.forEach(dot => dot.classList.add('marker-pulse'));

  // Try to add a Mapbox fill layer for the state polygon
  try {
    if (!map.getSource('state-boundaries')) {
      map.addSource('state-boundaries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
      });
    }
    if (!map.getLayer('state-hl')) {
      map.addLayer({
        id: 'state-hl',
        type: 'fill',
        source: 'state-boundaries',
        'source-layer': 'country_boundaries',
        filter: ['==', ['get', 'iso_3166_2'], 'US-' + code],
        paint: { 'fill-color': '#c86519', 'fill-opacity': 0.13 },
      }, 'admin-state-label' // insert below state labels if that layer exists
      );
    }
  } catch(e) {}
}

// ── Geo fetch (single fetch, shared by all consumers) ─────────────────────────
(function detectGeo() {
  const ctrl = new AbortController();
  const tid  = setTimeout(() => ctrl.abort(), 3500);
  fetch('https://ipapi.co/json/', { signal: ctrl.signal })
    .then(r => r.json())
    .then(geo => {
      clearTimeout(tid);
      const code = (geo.region_code || '').toUpperCase();
      const name = geo.region || '';
      if (code) onGeoDetected(code, name);
    })
    .catch(() => {});
})();

// ── Featured agents ───────────────────────────────────────────────────────────
(function initFeatured() {
  const wrap   = document.getElementById('featured-agents-wrap');
  if (!wrap) return;
  const apiUrl = (window.MLA_CONFIG || {}).apiUrl || 'https://sidecarleads.com';

  // Agent data array kept for modal access
  let _featuredAgents = [];

  function agentCard(a, idx) {
    const name = a.name || '';
    if (!name) return '';
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const specs = Array.isArray(a.specialties) ? a.specialties.slice(0, 2) : [];
    const specsHtml = specs.map(s => `<span class="fa-spec">${s}</span>`).join('');

    const statParts = [];
    if (a.yearsLicensed != null && a.yearsLicensed > 0) {
      statParts.push(`<div class="fa-stat"><strong>${a.yearsLicensed}</strong><span>yrs</span></div>`);
    }
    if (a.carrierCountRange) {
      if (statParts.length) statParts.push('<div class="fa-stat-sep"></div>');
      statParts.push(`<div class="fa-stat"><strong>${a.carrierCountRange}</strong><span>carriers</span></div>`);
    }
    if (a.npn) {
      if (statParts.length) statParts.push('<div class="fa-stat-sep"></div>');
      statParts.push(`<div class="fa-stat-npn">NPN ${a.npn}</div>`);
    }
    const statsHtml = statParts.length ? `<div class="fa-stats">${statParts.join('')}</div>` : '';
    const locationHtml = a.residentState ? `<div class="fa-location">${a.residentState}</div>` : '';

    return `<div class="fa-card" role="button" tabindex="0" data-idx="${idx}" onclick="window._mlaOpenAgent(${idx})" onkeydown="if(event.key==='Enter')window._mlaOpenAgent(${idx})">
  <div class="fa-card-top">
    <div class="fa-initials">${initials}</div>
    <div>
      <div class="fa-name">${name}</div>
      ${locationHtml}
    </div>
  </div>
  ${statsHtml}
  ${specsHtml ? `<div class="fa-specs">${specsHtml}</div>` : ''}
  <div class="fa-cta">View agent →</div>
</div>`;
  }

  function render(agents, stateLabel) {
    _featuredAgents = agents.slice(0, 3);
    const cards = _featuredAgents.map((a, i) => agentCard(a, i)).filter(Boolean);
    if (!cards.length) return;
    const stateName = stateLabel || 'your state';
    wrap.innerHTML = `<section class="featured-agents">
  <div class="container">
    <div class="fa-head">
      <div class="fa-eyebrow">⭐ Featured Agents in <span class="fa-eyebrow-state">${stateName}</span></div>
    </div>
    <div class="fa-grid">${cards.join('')}</div>
  </div>
</section>`;
  }

  // ── Agent modal ───────────────────────────────────────────────────────────
  function buildModal() {
    if (document.getElementById('mla-agent-modal')) return;
    const el = document.createElement('div');
    el.id = 'mla-agent-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.innerHTML = `
<div class="mla-modal-backdrop" id="mla-modal-backdrop"></div>
<div class="mla-modal-box" id="mla-modal-box">
  <button class="mla-modal-close" id="mla-modal-close" aria-label="Close">✕</button>
  <div id="mla-modal-body"></div>
</div>`;
    document.body.appendChild(el);
    document.getElementById('mla-modal-backdrop').addEventListener('click', closeModal);
    document.getElementById('mla-modal-close').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  function closeModal() {
    const modal = document.getElementById('mla-agent-modal');
    if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
  }

  window._mlaOpenAgent = function(idx) {
    const a = _featuredAgents[idx];
    if (!a) return;
    buildModal();
    const modal = document.getElementById('mla-agent-modal');
    const body  = document.getElementById('mla-modal-body');

    const name      = a.name || '';
    const initials  = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const specs     = Array.isArray(a.specialties) ? a.specialties : [];
    const desigs    = Array.isArray(a.designations) ? a.designations : [];
    const firstName = name.split(' ')[0] || 'this agent';
    const phone     = (window.MLA_CONFIG || {}).platformDisplay || '';
    const phoneRaw  = (window.MLA_CONFIG || {}).platformNumber  || '';

    // Trust badges
    const badges = [];
    if (a.doiClean === true)          badges.push('<span class="mla-badge mla-badge-green">✓ Clean DOI Record</span>');
    if (a.isStateResident === true)   badges.push('<span class="mla-badge mla-badge-green">✓ State Resident</span>');
    if (a.responseCommitment === true)badges.push('<span class="mla-badge mla-badge-blue">✓ 24-hr Response</span>');
    if (a.referenceCount >= 3)        badges.push(`<span class="mla-badge mla-badge-blue">✓ ${a.referenceCount} References</span>`);

    const statMeta = [a.residentState, a.npn ? `NPN ${a.npn}` : ''].filter(Boolean).join(' · ');

    const stats = [];
    if (a.yearsLicensed > 0)  stats.push(`<div class="mla-ms"><strong>${a.yearsLicensed}</strong><span>yrs licensed</span></div>`);
    if (a.carrierCountRange)   stats.push(`<div class="mla-ms"><strong>${a.carrierCountRange}</strong><span>carriers</span></div>`);
    if (a.annualPolicies > 0)  stats.push(`<div class="mla-ms"><strong>${a.annualPolicies}+</strong><span>policies/yr</span></div>`);

    const bioHtml    = a.bio ? `<p class="mla-modal-bio">${a.bio.slice(0, 180)}${a.bio.length > 180 ? '…' : ''}</p>` : '';
    const specsHtml  = [...specs, ...desigs].length
      ? `<div class="mla-modal-specs">${[...specs, ...desigs].map(s=>`<span>${s}</span>`).join('')}</div>` : '';
    const badgesHtml = badges.length ? `<div class="mla-modal-badges">${badges.join('')}</div>` : '';
    const statsHtml  = stats.length  ? `<div class="mla-modal-stats">${stats.join('<div class="mla-ms-sep"></div>')}</div>` : '';
    const phoneHtml  = phone ? `<div class="mla-modal-or"><span>or call us now</span></div><a href="tel:${phoneRaw}" class="mla-btn-phone">📞 ${phone}</a>` : '';

    body.innerHTML = `
<div class="mla-mh">
  <div class="mla-mh-avatar">${initials}</div>
  <div class="mla-mh-name">${name}</div>
  <div class="mla-mh-meta">${statMeta}</div>
  ${badgesHtml}
</div>
<div class="mla-mb">
  ${statsHtml}
  ${bioHtml}
  ${specsHtml}
  <div class="mla-mb-label">Contact ${firstName}</div>
  <form class="mla-modal-form" id="mla-lead-form" onsubmit="window._mlaSubmitLead(event,${JSON.stringify(a.id||'')},${JSON.stringify(a.residentState||'')},${JSON.stringify(firstName)})">
    <input name="firstName" type="text" placeholder="Your first name" required autocomplete="given-name"/>
    <input name="phone" type="tel" placeholder="Best phone number" required autocomplete="tel"/>
    <button type="submit" class="mla-btn-submit">Request a call from ${firstName} →</button>
  </form>
  <p class="mla-modal-fine">🔒 No spam. Direct call back within 24 hours.</p>
  <div id="mla-lead-thanks" class="mla-lead-thanks" hidden>
    <div class="mla-thanks-icon">✓</div>
    <strong>Request sent!</strong>
    <p>${firstName} will reach out to you shortly.</p>
  </div>
  ${phoneHtml}
</div>`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window._mlaSubmitLead = async function(e, agentId, state, agentFirstName) {
    e.preventDefault();
    const form = e.target;
    const btn  = form.querySelector('[type=submit]');
    const data = new FormData(form);
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      await fetch(apiUrl + '/leads/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consumerFirstName: data.get('firstName'),
          consumerPhone:     data.get('phone'),
          agentId:           agentId || undefined,
          state:             state   || undefined,
          source:            'web',
          domain:            'meetlifeagents.com',
        }),
      });
    } catch {}
    form.hidden = true;
    document.getElementById('mla-lead-thanks').hidden = false;
  };

  function fetchAgents(code, label) {
    if (!code) return;
    fetch(apiUrl + '/agents/mla-data?state=' + code)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const agents = Array.isArray(data) ? data : (data.agents || []);
        if (agents.length) render(agents, label);
      })
      .catch(() => {});
  }

  // Wait for geo (may already be set if detectGeo ran fast, or subscribe via polling)
  function tryFetch() {
    if (_geoCode) { fetchAgents(_geoCode, _geoName); return; }
    // Poll briefly while geo is in-flight (max 4 s)
    let tries = 0;
    const t = setInterval(() => {
      if (_geoCode || ++tries > 40) {
        clearInterval(t);
        if (_geoCode) fetchAgents(_geoCode, _geoName);
      }
    }, 100);
  }
  tryFetch();
})();

// ── Mapbox map ────────────────────────────────────────────────────────────────
(function initMap() {
  const token = window.MLA_CONFIG?.mapboxToken;
  if (!token || typeof mapboxgl === 'undefined') return;
  mapboxgl.accessToken = token;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/addison82/cjsdfy9xz14c81fmfgf1onj1z',
    center: [-96, 38.5],
    zoom: 3.0,
    interactive: true,
    attributionControl: false,
    logoPosition: 'bottom-right',
  });

  map.on('load', () => {
    map.getCanvas().style.cursor = 'default';
    const logo = map.getContainer().querySelector('.mapboxgl-ctrl-logo');
    if (logo) logo.style.display = 'none';

    const markers = window.MLA_MARKERS || [];
    markers.forEach(m => {
      const outer = document.createElement('div');
      outer.style.cssText = 'width:12px;height:12px;position:relative;cursor:pointer;';
      outer.title = `${m.city}, ${m.state}`;

      const dot = document.createElement('div');
      dot.style.cssText = 'width:8px;height:8px;border-radius:50%;background:#c86519;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);transition:transform .15s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)';
      outer.appendChild(dot);

      if (!window._mlaMarkerDots[m.state]) window._mlaMarkerDots[m.state] = [];
      window._mlaMarkerDots[m.state].push(dot);

      outer.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(1.8)'; });
      outer.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; });
      outer.addEventListener('click', () => { window.location.href = `/${m.stateSlug}/${m.slug}/`; });

      new mapboxgl.Marker({ element: outer }).setLngLat([m.lng, m.lat]).addTo(map);
    });

    // Fit map to show all markers with padding
    if (markers.length) {
      const lngs = markers.map(m => m.lng);
      const lats = markers.map(m => m.lat);
      const sw = [Math.min(...lngs) - 2, Math.min(...lats) - 1];
      const ne = [Math.max(...lngs) + 2, Math.max(...lats) + 1];
      map.fitBounds([sw, ne], { padding: 20, maxZoom: 4.5, duration: 0 });
    }

    window._mlaMap = map;
    if (_geoCode) glowState(_geoCode);
  });
})();
