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

  function agentCard(a) {
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

    const stateSlug   = (a.residentState || '').toLowerCase();
    const locationHtml = a.residentState ? `<div class="fa-location">${a.residentState}</div>` : '';
    const href   = a.calendarUrl || (stateSlug ? `/${stateSlug}/` : '/agents/apply/');
    const target = a.calendarUrl ? ' target="_blank" rel="noopener"' : '';

    return `<a class="fa-card" href="${href}"${target}>
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
</a>`;
  }

  function render(agents, stateLabel) {
    const cards = agents.slice(0, 3).map(agentCard).filter(Boolean);
    if (!cards.length) return;
    const label = stateLabel ? `⭐ Featured agents in ${stateLabel}` : '⭐ Featured agents';
    wrap.innerHTML = `<section class="featured-agents">
  <div class="container">
    <div class="fa-head">
      <div class="eyebrow">${label}</div>
      <h2 class="display">Verified agents ready to help.</h2>
      <p>License-verified, locally resident, independently vetted — each agent below has cleared our full review. Contact them directly.</p>
    </div>
    <div class="fa-grid">${cards.join('')}</div>
  </div>
</section>`;
  }

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
    zoom: 3.4,
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

      // Store dot by state code for geo glow
      if (!window._mlaMarkerDots[m.state]) window._mlaMarkerDots[m.state] = [];
      window._mlaMarkerDots[m.state].push(dot);

      outer.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(1.8)'; });
      outer.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; });
      outer.addEventListener('click', () => { window.location.href = `/${m.stateSlug}/${m.slug}/`; });

      new mapboxgl.Marker({ element: outer }).setLngLat([m.lng, m.lat]).addTo(map);
    });

    // Map is ready — apply geo glow if already detected
    window._mlaMap = map;
    if (_geoCode) glowState(_geoCode);
  });
})();
