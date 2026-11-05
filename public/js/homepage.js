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

// Featured agents — geo-detect state, fetch from live API
(function initFeatured() {
  const wrap = document.getElementById('featured-agents-wrap');
  if (!wrap) return;
  const apiUrl = (window.MLA_CONFIG || {}).apiUrl || 'https://sidecarleads.com';

  function agentCard(a) {
    const name = [a.first_name, a.last_name].filter(Boolean).join(' ') || a.name || '';
    if (!name) return '';
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const tierBadge = a.tier === 'elite' ? '<span class="fa-badge">Elite</span>' : '';
    const specs = Array.isArray(a.specialties) ? a.specialties.slice(0, 2) : [];
    const specsHtml = specs.map(s => `<span class="fa-spec">${s}</span>`).join('');

    const statParts = [];
    if (a.yearsLicensed != null && a.yearsLicensed > 0) {
      statParts.push(`<div class="fa-stat"><strong>${a.yearsLicensed}</strong><span>yrs</span></div>`);
    }
    if (a.carrierCountRange) {
      statParts.push(`<div class="fa-stat-sep"></div><div class="fa-stat"><strong>${a.carrierCountRange}</strong><span>carriers</span></div>`);
    }
    if (a.npn) {
      statParts.push(`<div class="fa-stat-sep"></div><div class="fa-stat-npn">NPN ${a.npn}</div>`);
    }
    const statsHtml = statParts.length ? `<div class="fa-stats">${statParts.join('')}</div>` : '';

    const citySlug  = (a.office_city || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const stateSlug = (a.resident_state || '').toLowerCase();
    const city  = a.office_city  || '';
    const state = a.resident_state || '';
    const locationHtml = (city || state) ? `<div class="fa-location">${[city, state].filter(Boolean).join(', ')}</div>` : '';

    return `<a class="fa-card" href="/${stateSlug}/${citySlug}/${a.slug || a.id}/">
  <div class="fa-card-top">
    <div class="fa-initials">${initials}</div>
    <div>
      ${tierBadge}
      <div class="fa-name">${name}</div>
      ${locationHtml}
    </div>
  </div>
  ${statsHtml}
  ${specsHtml ? `<div class="fa-specs">${specsHtml}</div>` : ''}
  <div class="fa-cta">View profile →</div>
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

  function fetchAndRender(stateCode, stateLabel) {
    const url = apiUrl + '/agents/mla-data' + (stateCode ? '?state=' + stateCode.toUpperCase() : '');
    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const agents = Array.isArray(data) ? data : (data.agents || []);
        if (agents.length) render(agents, stateLabel);
      })
      .catch(() => {});
  }

  // Try IP geo to detect state, then fetch matching agents
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 3500);
  fetch('https://ipapi.co/json/', { signal: controller.signal })
    .then(r => r.json())
    .then(geo => {
      clearTimeout(tid);
      const stateCode = geo.region_code || '';
      fetchAndRender(stateCode, geo.region || stateCode);
    })
    .catch(() => { fetchAndRender('', ''); });
})();

// Mapbox — only init if token is set
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

  // Hide Mapbox logo
  map.on('load', () => {
    map.getCanvas().style.cursor = 'default';
    const logo = map.getContainer().querySelector('.mapboxgl-ctrl-logo');
    if (logo) logo.style.display = 'none';

    // Drop a marker for every city
    const markers = window.MLA_MARKERS || [];
    markers.forEach(m => {
      // Outer wrapper: fixed size so Mapbox never recalculates offset on hover
      const outer = document.createElement('div');
      outer.style.cssText = 'width:12px;height:12px;position:relative;cursor:pointer;';
      outer.title = `${m.city}, ${m.state}`;

      // Inner dot: handles all visual animation
      const dot = document.createElement('div');
      dot.style.cssText = 'width:8px;height:8px;border-radius:50%;background:#c86519;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4);transition:transform .15s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)';
      outer.appendChild(dot);

      outer.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(1.8)'; });
      outer.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; });
      outer.addEventListener('click', () => { window.location.href = `/${m.stateSlug}/${m.slug}/`; });

      new mapboxgl.Marker({ element: outer })
        .setLngLat([m.lng, m.lat])
        .addTo(map);
    });
  });
})();
