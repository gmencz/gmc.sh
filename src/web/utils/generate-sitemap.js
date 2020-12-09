/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const globby = require('globby')

async function generateSitemap() {
  const pages = await globby([
    'pages/**/*.tsx',
    '!pages/_*.tsx',
    '!pages/**/[id].tsx',
  ])

  const sitemap = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${pages
    .map(page => {
      const path = page.replace('pages', '').replace('.tsx', '')
      const route = path === '/index' ? '' : path
      return `
  <url>
      <loc>${`https://app.gmc.sh${route}`}</loc>
  </url>
          `
    })
    .join('')}
</urlset>
  `

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()
