'use strict'
/**
 * build.js — MeetLifeAgents static site generator
 *
 * Usage:
 *   node build.js            — full build to dist/
 *   node build.js --city=prattville  — rebuild one city only
 *
 * Output structure:
 *   dist/
 *     index.html
 *     how-it-works/index.html
 *     our-vetting/index.html
 *     contact/index.html
 *     privacy/index.html
 *     terms/index.html
 *     tcpa/index.html
 *     404.html
 *     css/main.css
 *     js/city.js
 *     js/homepage.js
 *     sitemap.xml
 *     robots.txt
 *     [state]/
 *       index.html            (state page)
 *       [city]/
 *         index.html          (city page)
 *         [agent-slug]/
 *           index.html        (agent profile)
 */

const fs   = require('fs')
const path = require('path')

// ── Config ────────────────────────────────────────────────────────────────────
const SITE_URL        = process.env.SITE_URL        || 'https://meetlifeagents.com'
const PLATFORM_NUMBER = process.env.PLATFORM_NUMBER || ''
const PLATFORM_DISPLAY= process.env.PLATFORM_DISPLAY|| ''
const MAPBOX_TOKEN    = process.env.MAPBOX_TOKEN     || ''
const API_URL         = process.env.API_URL          || 'https://sidecarleads.com'

const config = { siteUrl: SITE_URL, platformNumber: PLATFORM_NUMBER, platformDisplay: PLATFORM_DISPLAY, mapboxToken: MAPBOX_TOKEN, apiUrl: API_URL }

// ── CLI flags ─────────────────────────────────────────────────────────────────
const ONLY_CITY  = (process.argv.find(a => a.startsWith('--city='))  || '').replace('--city=', '')
const ONLY_STATE = (process.argv.find(a => a.startsWith('--state=')) || '').replace('--state=', '')
const FULL_BUILD = !ONLY_CITY && !ONLY_STATE

// ── Load data ─────────────────────────────────────────────────────────────────
const markets  = require('./data/markets.json')
const agentsDb = require('./data/agents.json')

// ── Templates ─────────────────────────────────────────────────────────────────
const { homepage }        = require('./src/templates/homepage')
const { cityPage }        = require('./src/templates/city')
const { statePage }       = require('./src/templates/state')
const { agentProfilePage }= require('./src/templates/agent')
const {
  notFoundPage,
  privacyPage,
  termsPage,
  tcpaPage,
  contactPage,
  howItWorksPage,
  ourVettingPage,
  whyIndependentPage
} = require('./src/templates/static-pages')

// ── Helpers ───────────────────────────────────────────────────────────────────
function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function write(filePath, content) {
  mkdirp(path.dirname(filePath))
  fs.writeFileSync(filePath, content, 'utf8')
  const kb = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1)
  console.log(`  ✓ ${path.relative(process.cwd(), filePath).padEnd(52)} ${kb.padStart(6)} KB`)
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  mkdirp(dest)
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
      console.log(`  ✓ ${path.relative(process.cwd(), destPath).padEnd(52)} (asset)`)
    }
  }
}

// Build a lookup: state slug → stateData
function buildStateMap() {
  const m = {}
  for (const s of markets.states) m[s.slug] = s
  return m
}

// ── Main build ────────────────────────────────────────────────────────────────
async function build() {
  const start = Date.now()
  console.log('\n🔨 MeetLifeAgents build starting…\n')
  mkdirp('dist')

  // 1. Copy public assets
  console.log('Assets:')
  copyDir('public', 'dist')

  // Generate global cities data file (used by find-agent CTA morph on all pages)
  const citiesByState = {}
  for (const m of markets.cities) {
    if (!citiesByState[m.state_slug]) citiesByState[m.state_slug] = []
    citiesByState[m.state_slug].push({ slug: m.city_slug, name: m.city_name })
  }
  mkdirp('dist/js')
  fs.writeFileSync('dist/js/cities.js', `window.MLA_CITIES=${JSON.stringify(citiesByState)};`)
  console.log(`  ✓ dist/js/cities.js${' '.repeat(38)} (asset)`)
  console.log()

  const stateMap = buildStateMap()

  // ── FULL BUILD ONLY ────────────────────────────────────────────────────────
  if (FULL_BUILD) {
    console.log('Global pages:')

    // 2. Homepage
    const allCities = markets.cities
    write('dist/index.html', homepage(markets.states, allCities, config))

    // 3. Static utility pages
    write('dist/how-it-works/index.html',        howItWorksPage(config))
    write('dist/our-vetting/index.html',          ourVettingPage(config))
    write('dist/why-independent-agent/index.html', whyIndependentPage(config))
    write('dist/contact/index.html',      contactPage(config))
    write('dist/privacy/index.html',      privacyPage(config))
    write('dist/terms/index.html',        termsPage(config))
    write('dist/tcpa/index.html',         tcpaPage(config))
    write('dist/404.html',                notFoundPage(config))
    console.log()
  }

  // ── CITY PAGES ─────────────────────────────────────────────────────────────
  let cities = markets.cities
  if (ONLY_CITY)  cities = cities.filter(m => m.city_slug === ONLY_CITY)
  if (ONLY_STATE) cities = cities.filter(m => m.state_slug === ONLY_STATE)

  if (cities.length) {
    console.log(`City pages (${cities.length}):`)
    for (const market of cities) {
      const agentKey = `${market.city_slug}_${market.state_slug}`
      const agents   = agentsDb[agentKey] || []
      const stateData = stateMap[market.state_slug]
      const doiUrl    = stateData?.doi_url || 'https://nipr.com/'

      // City page
      const html = cityPage(market, agents, doiUrl, config)
      write(`dist/${market.state_slug}/${market.city_slug}/index.html`, html)

      // Agent profile pages
      for (const agent of agents) {
        const profileHtml = agentProfilePage(agent, market, doiUrl, config)
        write(`dist/${market.state_slug}/${market.city_slug}/${agent.slug}/index.html`, profileHtml)
      }
    }
    console.log()
  }

  // ── STATE INDEX PAGES ──────────────────────────────────────────────────────
  // Build a state page for each state that has at least one city
  const statesToBuild = new Set(cities.map(m => m.state_slug))

  if (statesToBuild.size) {
    console.log(`State pages (${statesToBuild.size}):`)
    const byState = {}
    for (const m of markets.cities) {
      if (!byState[m.state_slug]) byState[m.state_slug] = []
      byState[m.state_slug].push(m)
    }
    for (const slug of statesToBuild) {
      const stateData = stateMap[slug]
      if (!stateData) continue
      const citiesForState = byState[slug] || []
      write(`dist/${slug}/index.html`, statePage(stateData, citiesForState, config))
    }
    console.log()
  }

  // ── SITEMAP + ROBOTS ───────────────────────────────────────────────────────
  if (FULL_BUILD) {
    console.log('Sitemap & robots:')
    const staticUrls = [
      `${SITE_URL}/`,
      `${SITE_URL}/how-it-works/`,
      `${SITE_URL}/our-vetting/`,
      `${SITE_URL}/why-independent-agent/`,
      `${SITE_URL}/contact/`,
      `${SITE_URL}/privacy/`,
      `${SITE_URL}/terms/`,
      `${SITE_URL}/tcpa/`,
    ]
    const stateUrls  = markets.states.map(s => `${SITE_URL}/${s.slug}/`)
    const cityUrls   = markets.cities.map(m => `${SITE_URL}/${m.state_slug}/${m.city_slug}/`)

    // Agent profile URLs
    const agentUrls = []
    for (const market of markets.cities) {
      const key = `${market.city_slug}_${market.state_slug}`
      for (const a of (agentsDb[key] || [])) {
        agentUrls.push(`${SITE_URL}/${market.state_slug}/${market.city_slug}/${a.slug}/`)
      }
    }

    const allUrls = [...staticUrls, ...stateUrls, ...cityUrls, ...agentUrls]
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url><loc>${u}</loc><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>`
    write('dist/sitemap.xml', sitemap)
    write('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /404\nSitemap: ${SITE_URL}/sitemap.xml\n`)
    console.log()
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  const cityCount = cities.length
  console.log(`✅ Build complete — ${cityCount} cit${cityCount !== 1 ? 'ies' : 'y'} in ${elapsed}s\n`)
}

build().catch(err => { console.error('Build failed:', err); process.exit(1) })
