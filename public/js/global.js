/**
 * global.js — MeetLifeAgents site-wide interactions
 *
 * Find-agent CTA morph: clicking any [data-find-cta] button replaces it
 * inline with a state dropdown → city autocomplete → Go button.
 * Navigates to /{state}/{city}/ on submit.
 *
 * Requires window.MLA_CITIES (injected via /js/cities.js on all pages).
 */

;(function () {
  'use strict'

  // State slug → display name
  const STATE_NAMES = {
    al: 'Alabama',        az: 'Arizona',        ca: 'California',
    ct: 'Connecticut',    de: 'Delaware',        fl: 'Florida',
    ga: 'Georgia',        ia: 'Iowa',            id: 'Idaho',
    il: 'Illinois',       in: 'Indiana',         ky: 'Kentucky',
    la: 'Louisiana',      md: 'Maryland',        mn: 'Minnesota',
    mo: 'Missouri',       nc: 'North Carolina',  nj: 'New Jersey',
    nm: 'New Mexico',     oh: 'Ohio',            ok: 'Oklahoma',
    or: 'Oregon',         pa: 'Pennsylvania',    sc: 'South Carolina',
    sd: 'South Dakota',   tn: 'Tennessee',       tx: 'Texas',
    va: 'Virginia',       wv: 'West Virginia',
  }

  function buildSearch(btn) {
    const cities = window.MLA_CITIES || {}
    const onDark = btn.classList.contains('btn-cream')
    const uid = Math.random().toString(36).slice(2, 8)

    // Build state options (only states we have cities for)
    const stateOpts = Object.keys(STATE_NAMES)
      .filter(s => cities[s] && cities[s].length)
      .map(s => `<option value="${s}">${STATE_NAMES[s]}</option>`)
      .join('')

    const wrapper = document.createElement('div')
    wrapper.className = 'fcs-wrap' + (onDark ? ' fcs-wrap--dark' : '')
    wrapper.innerHTML = `
      <select class="fcs-state" aria-label="Choose state">
        <option value="">State…</option>
        ${stateOpts}
      </select>
      <input
        class="fcs-city"
        type="text"
        placeholder="Type city…"
        list="fcs-dl-${uid}"
        autocomplete="off"
        disabled
        aria-label="Choose city"
      >
      <datalist id="fcs-dl-${uid}"></datalist>
      <button class="fcs-go" type="button" disabled>Go →</button>
    `

    // Fade out button then swap
    btn.style.transition = 'opacity 0.12s'
    btn.style.opacity = '0'
    setTimeout(() => {
      if (btn.parentNode) btn.parentNode.replaceChild(wrapper, btn)

      const stateEl = wrapper.querySelector('.fcs-state')
      const cityEl  = wrapper.querySelector('.fcs-city')
      const listEl  = wrapper.querySelector(`#fcs-dl-${uid}`)
      const goBtn   = wrapper.querySelector('.fcs-go')
      let slugMap   = {}   // city name (lowercase) → city slug

      stateEl.addEventListener('change', () => {
        const s = stateEl.value
        cityEl.value = ''
        listEl.innerHTML = ''
        slugMap = {}
        goBtn.disabled = true

        if (s && cities[s]) {
          cities[s].forEach(c => {
            slugMap[c.name.toLowerCase()] = c.slug
            const opt = document.createElement('option')
            opt.value = c.name
            listEl.appendChild(opt)
          })
          cityEl.disabled = false
          cityEl.focus()
        } else {
          cityEl.disabled = true
        }
      })

      cityEl.addEventListener('input', () => {
        goBtn.disabled = !slugMap[cityEl.value.trim().toLowerCase()]
      })

      function navigate() {
        const s = stateEl.value
        const c = slugMap[cityEl.value.trim().toLowerCase()]
        if (s && c) window.location.href = `/${s}/${c}/`
      }

      goBtn.addEventListener('click', navigate)
      cityEl.addEventListener('keydown', e => { if (e.key === 'Enter') navigate() })

      stateEl.focus()
    }, 130)
  }

  // Wire up all find-cta buttons on the page
  function init() {
    document.querySelectorAll('[data-find-cta]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault()
        buildSearch(btn)
      })
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
