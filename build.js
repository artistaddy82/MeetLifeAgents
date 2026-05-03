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
 *     css/main.css
 *     js/city.js
 *     js/homepage.js
 *     sitemap.xml
 *     robots.txt
 *     al/
 *       index.html           (state page — placeholder)
 *       prattville/
 *         index.html         (city page)
 */

const fs   = require('fs')
const path = require('path')

// ── Config ────────────────────────────────────────────────────────────────────
const SITE_URL        = process.env.SITE_URL        || 'https://meetlifeagents.com'
const PLATFORM_NUMBER = process.env.PLATFORM_NUMBER || '+18005550199'
const PLATFORM_DISPLAY= process.env.PLATFORM_DISPLAY|| '(800) 555-0199'
const MAPBOX_TOKEN    = process.env.MAPBOX_TOKEN     || ''
const API_URL         = process.env.API_URL          || 'https://sidecarleads.com'

const config = { siteUrl: SITE_URL, platformNumber: PLATFORM_NUMBER, platformDisplay: PLATFORM_DISPLAY, mapboxToken: MAPBOX_TOKEN, apiUrl: API_URL }

// ── CLI flags ─────────────────────────────────────────────────────────────────
const ONLY_CITY = (process.argv.find(a => a.startsWith('--city=')) || '').replace('--city=', '')

// ── Load data ─────────────────────────────────────────────────────────────────
const markets = require('./data/markets.json')
const agentsDb = require('./data/agents.json')

// ── Templates ─────────────────────────────────────────────────────────────────
const { homepage } = require('./src/templates/homepage')
const { cityPage } = require('./src/templates/city')

// ── Helpers ───────────────────────────────────────────────────────────────────
function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function write(filePath, content) {
  mkdirp(path.dirname(filePath))
  fs.writeFileSync(filePath, content, 'utf8')
  const kb = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1)
  console.log(`  ✓ ${path.relative(process.cwd(), filePath).padEnd(48)} ${kb.padStart(6)} KB`)
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
      console.log(`  ✓ ${path.relative(process.cwd(), destPath).padEnd(48)} (asset)`)
    }
  }
}

// Basic state-page placeholder — full design TBD (Phase 1 build order)
function statePage(stateSlug, stateName, citiesInState) {
  const { head, header, footer } = require('./src/templates/layout')
  const title = `Life Insurance Agents in ${stateName} — Verified Local Agents | MeetLifeAgents`
  const desc  = `Find verified, locally resident life insurance agents in ${stateName}. License-verified through the ${stateName} DOI. Browse by city.`
  const cityLinks = citiesInState.map(m =>
    `<a class="nearby-link" href="/${stateSlug}/${m.city_slug}/">
      <div class="nearby-name">${m.city_name}</div>
      <div class="nearby-meta">${m.agent_count} verified agents</div>
    </a>`
  ).join('\n')

  return `${head({ title, description: desc, canonical: `${SITE_URL}/${stateSlug}/` })}
<body>
${header()}
<div class="container" style="padding-top:48px;padding-bottom:100px;">
  <nav class="breadcrumb"><a href="/">Home</a><span>›</span><span>${stateName}</span></nav>
  <h1 class="display" style="font-size:clamp(36px,4vw,52px);margin:32px 0 16px;">
    Life insurance agents in ${stateName}.
  </h1>
  <p style="font-size:17px;color:var(--ink-soft);margin-bottom:48px;max-width:560px;">
    Browse verified, locally-resident agents by city. Every agent is license-verified through the
    ${stateName} Department of Insurance.
  </p>
  <div class="nearby-grid">${cityLinks}</div>
</div>
${footer({ stateSlug, stateName })}
</body>
</html>`
}

// ── Main build ────────────────────────────────────────────────────────────────
async function build() {
  const start = Date.now()
  console.log('\n🔨 MeetLifeAgents build starting…\n')

  mkdirp('dist')

  // 1. Copy public assets (CSS, JS, images)
  console.log('Assets:')
  copyDir('public', 'dist')
  console.log()

  // 2. Homepage
  if (!ONLY_CITY) {
    console.log('Pages:')
    const html = homepage(markets.states, markets.cities, config)
    write('dist/index.html', html)
  }

  // 3. City pages
  const cities = ONLY_CITY
    ? markets.cities.filter(m => m.city_slug === ONLY_CITY)
    : markets.cities

  for (const market of cities) {
    const agentKey = `${market.city_slug}_${market.state_slug}`
    const agents   = agentsDb[agentKey] || []

    // Find DOI URL for this state
    const stateData = markets.states.find(s => s.slug === market.state_slug)
    const doiUrl    = stateData?.doi_url || `https://nipr.com/`

    const html = cityPage(market, agents, doiUrl, config)
    write(`dist/${market.state_slug}/${market.city_slug}/index.html`, html)
  }

  // 4. State index pages (one per state that has cities)
  if (!ONLY_CITY) {
    const byState = {}
    for (const m of markets.cities) {
      if (!byState[m.state_slug]) byState[m.state_slug] = { name: m.state_name, cities: [] }
      byState[m.state_slug].cities.push(m)
    }
    for (const [slug, { name, cities: citiesInState }] of Object.entries(byState)) {
      const html = statePage(slug, name, citiesInState)
      write(`dist/${slug}/index.html`, html)
    }
  }

  // 5. Sitemap
  if (!ONLY_CITY) {
    const urls = [
      `${SITE_URL}/`,
      ...markets.states.map(s => `${SITE_URL}/${s.slug}/`),
      ...markets.cities.map(m => `${SITE_URL}/${m.state_slug}/${m.city_slug}/`),
    ]
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>`
    write('dist/sitemap.xml', sitemap)

    // robots.txt
    write('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`)
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n✅ Build complete — ${cities.length} city page${cities.length !== 1 ? 's' : ''} in ${elapsed}s\n`)
}

build().catch(err => { console.error('Build failed:', err); process.exit(1) })
