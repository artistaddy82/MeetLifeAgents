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
  // Legacy stub — real logic is in highlightStateAndZoom
  highlightStateAndZoom(code);
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
        if (!agents.length) return;
        render(agents, label);
        // Show first featured agent on the map
        const first = _featuredAgents[0];
        if (first) {
          if (window._mlaMap) {
            window._mlaShowMapAgent(first, code);
          } else {
            // Map not ready yet — store for map.onload to pick up
            window._mlaPendingMapAgent = { agent: first, code };
          }
        }
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

// ── State center lookup (fallback when no MLA_MARKERS for a state) ────────────
const _STATE_CENTERS = {
  AL:[32.7,-86.7],AK:[64.2,-153.4],AZ:[34.3,-111.1],AR:[34.9,-92.4],
  CA:[37.2,-119.7],CO:[39.0,-105.5],CT:[41.6,-72.7],DE:[39.3,-75.5],
  FL:[27.8,-81.6],GA:[32.6,-83.4],HI:[20.3,-156.4],ID:[44.4,-114.6],
  IL:[40.0,-89.2],IN:[39.9,-86.3],IA:[41.9,-93.4],KS:[38.5,-98.4],
  KY:[37.5,-85.3],LA:[30.9,-91.8],ME:[45.3,-69.0],MD:[39.0,-76.8],
  MA:[42.3,-71.8],MI:[44.3,-85.4],MN:[46.4,-93.1],MS:[32.7,-89.7],
  MO:[38.5,-92.5],MT:[47.0,-110.5],NE:[41.5,-99.9],NV:[38.5,-117.1],
  NH:[43.7,-71.6],NJ:[40.1,-74.5],NM:[34.3,-106.1],NY:[42.9,-75.5],
  NC:[35.6,-79.4],ND:[47.5,-100.5],OH:[40.4,-82.8],OK:[35.6,-96.9],
  OR:[44.1,-120.5],PA:[40.9,-77.8],RI:[41.7,-71.5],SC:[33.9,-80.9],
  SD:[44.4,-100.2],TN:[35.9,-86.6],TX:[31.1,-97.6],UT:[39.3,-111.1],
  VT:[44.0,-72.7],VA:[37.8,-78.2],WA:[47.4,-120.5],WV:[38.6,-80.6],
  WI:[44.3,-89.8],WY:[43.0,-107.6]
};

let _mlaAgentMapMarker = null; // singleton Mapbox marker for featured agent

function highlightStateAndZoom(code) {
  const map = window._mlaMap;
  if (!map || !code) return;
  try {
    // Add state fill
    if (!map.getSource('state-hl-src')) {
      map.addSource('state-hl-src', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1',
      });
    }
    const filter = ['==', ['get', 'iso_3166_2'], 'US-' + code];
    if (!map.getLayer('state-hl-fill')) {
      map.addLayer({
        id: 'state-hl-fill', type: 'fill',
        source: 'state-hl-src', 'source-layer': 'country_boundaries',
        filter,
        paint: { 'fill-color': '#c86519', 'fill-opacity': 0.18 },
      });
    }
    if (!map.getLayer('state-hl-line')) {
      map.addLayer({
        id: 'state-hl-line', type: 'line',
        source: 'state-hl-src', 'source-layer': 'country_boundaries',
        filter,
        paint: { 'line-color': '#c86519', 'line-width': 2.5, 'line-opacity': 0.7 },
      });
    }
  } catch(e) {}

  // Zoom to state: compute bounds from MLA_MARKERS or use center+fixed zoom
  const sm = (window.MLA_MARKERS || []).filter(m => m.state === code);
  if (sm.length) {
    const lngs = sm.map(m => m.lng), lats = sm.map(m => m.lat);
    const pad  = sm.length === 1 ? 120 : 60;
    map.fitBounds(
      [[Math.min(...lngs) - 1.5, Math.min(...lats) - 1],
       [Math.max(...lngs) + 1.5, Math.max(...lats) + 1]],
      { padding: pad, maxZoom: 7, duration: 900 }
    );
  } else {
    const c = _STATE_CENTERS[code];
    if (c) map.flyTo({ center: [c[1], c[0]], zoom: 5.8, duration: 900 });
  }
}

function placeAgentMapMarker(agent, stateCode) {
  const map = window._mlaMap;
  if (!map || !agent) return;

  // Remove old marker
  if (_mlaAgentMapMarker) { _mlaAgentMapMarker.remove(); _mlaAgentMapMarker = null; }

  // Determine position: centroid of state's MLA_MARKERS or state center
  let lng, lat;
  const sm = (window.MLA_MARKERS || []).filter(m => m.state === stateCode);
  if (sm.length) {
    lng = sm.reduce((s, m) => s + m.lng, 0) / sm.length;
    lat = sm.reduce((s, m) => s + m.lat, 0) / sm.length;
  } else {
    const c = _STATE_CENTERS[stateCode];
    if (!c) return;
    lat = c[0]; lng = c[1];
  }

  const name     = agent.name || '';
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const firstName = name.split(' ')[0] || 'Agent';
  const loc = agent.residentState || '';
  const yrs = agent.yearsLicensed > 0 ? `${agent.yearsLicensed} yrs` : '';
  const sub = [loc, yrs].filter(Boolean).join(' · ');

  const el = document.createElement('div');
  el.className = 'mla-map-popup';
  el.innerHTML = `
    <div class="mla-map-popup-avatar">${initials}</div>
    <div class="mla-map-popup-body">
      <div class="mla-map-popup-name">${name}</div>
      ${sub ? `<div class="mla-map-popup-sub">${sub}</div>` : ''}
      <div class="mla-map-popup-cta">View agent →</div>
    </div>`;
  el.addEventListener('click', () => window._mlaOpenAgent(0));

  _mlaAgentMapMarker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
    .setLngLat([lng, lat])
    .addTo(map);
}

// Called by both geo+agents pipelines (whichever finishes last)
window._mlaShowMapAgent = function(agent, stateCode) {
  if (!stateCode || !agent) return;
  if (!window._mlaMap) return; // map not ready yet — will be called again on map load
  highlightStateAndZoom(stateCode);
  placeAgentMapMarker(agent, stateCode);
};

// ── Mapbox map ────────────────────────────────────────────────────────────────
(function initMap() {
  const token = window.MLA_CONFIG?.mapboxToken;
  if (!token || typeof mapboxgl === 'undefined') return;
  mapboxgl.accessToken = token;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/addison82/cjsdfy9xz14c81fmfgf1onj1z',
    center: [-96, 38.5],
    zoom: 3.2,
    interactive: true,
    attributionControl: false,
    logoPosition: 'bottom-right',
  });

  map.on('load', () => {
    map.getCanvas().style.cursor = 'default';
    const logo = map.getContainer().querySelector('.mapboxgl-ctrl-logo');
    if (logo) logo.style.display = 'none';

    window._mlaMap = map;

    // If geo + agents are already ready, show now
    const pending = window._mlaPendingMapAgent;
    if (pending) window._mlaShowMapAgent(pending.agent, pending.code);
  });
})();
