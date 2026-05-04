'use strict'
/**
 * server.js — minimal static file server for MeetLifeAgents
 *
 * Serves the pre-built dist/ directory.
 * Runs after build.js has already generated all HTML.
 * PORT is injected by DigitalOcean App Platform.
 */
const http = require('http')
const fs   = require('fs')
const path = require('path')

const PORT = parseInt(process.env.PORT || '8080', 10)
const DIST = path.join(__dirname, 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css',
  '.js'  : 'application/javascript',
  '.json': 'application/json',
  '.xml' : 'application/xml',
  '.txt' : 'text/plain',
  '.svg' : 'image/svg+xml',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.ico' : 'image/x-icon',
  '.webp': 'image/webp',
}

function handler(req, res) {
  // Strip query string, decode special chars
  let pathname = decodeURIComponent(req.url.split('?')[0])

  // Security: prevent directory traversal
  const resolved = path.resolve(DIST, '.' + pathname)
  if (!resolved.startsWith(DIST)) {
    res.writeHead(403); res.end('Forbidden'); return
  }

  // Try: exact path → index.html in that dir → 404.html
  const candidates = [
    resolved,
    path.join(resolved, 'index.html'),
    path.join(DIST, '404.html'),
  ]

  for (const filePath of candidates) {
    let stat
    try { stat = fs.statSync(filePath) } catch { continue }
    if (!stat.isFile()) continue

    const ext         = path.extname(filePath).toLowerCase()
    const contentType = MIME[ext] || 'application/octet-stream'
    const is404       = filePath.endsWith('404.html') && !resolved.endsWith('404.html')
    const cache       = ext === '.html' ? 'no-cache, no-store' : 'public, max-age=86400'

    res.writeHead(is404 ? 404 : 200, {
      'Content-Type' : contentType,
      'Cache-Control': cache,
    })
    fs.createReadStream(filePath).pipe(res)
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('Not found')
}

http.createServer(handler).listen(PORT, () => {
  console.log(`MeetLifeAgents running on port ${PORT} — serving dist/`)
})
