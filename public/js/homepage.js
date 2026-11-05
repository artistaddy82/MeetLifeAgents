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

// Featured agents — geo-detect state, render matching agents
(function initFeatured() {
  const wrap = document.getElementById('featured-agents-wrap');
  if (!wrap) return;
  const all = window.MLA_FEATURED || {};
  const allAgents = Object.values(all).flat();
  if (!allAgents.length) return;

  function render(agents, stateLabel) {
    const label = stateLabel ? `⭐ Featured agents in ${stateLabel}` : '⭐ Featured agents';
    const cards = agents.slice(0, 3).map(a => {
      const initials = a.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
      const tierBadge = a.tier === 'elite'
        ? '<span class="fa-badge">Elite</span>' : '';
      const specsHtml = (a.specs || []).map(s => `<span class="fa-spec">${s}</span>`).join('');
      return `<a class="fa-card" href="/${a.stateSlug}/${a.citySlug}/${a.slug}/">
  <div class="fa-card-top">
    <div class="fa-initials">${initials}</div>
    <div>
      ${tierBadge}
      <div class="fa-name">${a.name}</div>
      <div class="fa-location">${a.city}, ${a.state}</div>
    </div>
  </div>
  <div class="fa-stats">
    <div class="fa-stat"><strong>${a.years}</strong><span>yrs</span></div>
    <div class="fa-stat-sep"></div>
    <div class="fa-stat"><strong>${a.carriers}</strong><span>carriers</span></div>
    <div class="fa-stat-sep"></div>
    <div class="fa-stat-npn">NPN ${a.npn}</div>
  </div>
  ${specsHtml ? `<div class="fa-specs">${specsHtml}</div>` : ''}
  <div class="fa-cta">View profile →</div>
</a>`;
    }).join('');

    wrap.innerHTML = `<section class="featured-agents">
  <div class="container">
    <div class="fa-head">
      <div class="eyebrow">${label}</div>
      <h2 class="display">Verified agents ready to help.</h2>
      <p>License-verified, locally resident, independently vetted — each agent below has cleared our full review. Contact them directly.</p>
    </div>
    <div class="fa-grid">${cards}</div>
  </div>
</section>`;
  }

  // Try IP geo to detect state
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), 3500);
  fetch('https://ipapi.co/json/', { signal: controller.signal })
    .then(r => r.json())
    .then(geo => {
      clearTimeout(tid);
      const stateCode = (geo.region_code || '').toLowerCase();
      const stateAgents = all[stateCode] || [];
      if (stateAgents.length) {
        render(stateAgents, geo.region || geo.region_code);
      } else {
        render(allAgents);
      }
    })
    .catch(() => { render(allAgents); });
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
