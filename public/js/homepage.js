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
      const el = document.createElement('div');
      el.style.cssText = 'width:8px;height:8px;border-radius:50%;background:#c86519;border:2px solid #fff;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.4);transition:transform .15s';
      el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.8)'; el.style.zIndex = '10'; });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; el.style.zIndex = ''; });
      el.addEventListener('click', () => { window.location.href = `/${m.stateSlug}/${m.slug}/`; });
      el.title = `${m.city}, ${m.state}`;
      new mapboxgl.Marker({ element: el })
        .setLngLat([m.lng, m.lat])
        .addTo(map);
    });
  });
})();
