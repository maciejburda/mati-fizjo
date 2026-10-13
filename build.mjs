/**
 * Mały generator statyczny.
 *
 * Źródła:  src/layout.html  +  src/pages/*.html  (nagłówek JSON między liniami ---)
 * Wynik:   gotowe pliki .html w katalogu głównym + sitemap.xml
 *
 * Uruchomienie:  node build.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const ORIGIN = 'https://brzezinskifizjo.pl';

const layout = readFileSync(join(root, 'src/layout.html'), 'utf8');

/** Rozdziel nagłówek JSON od treści. */
function parsePage(raw, file) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: brak nagłówka --- ... ---`);
  let meta;
  try { meta = JSON.parse(m[1]); }
  catch (e) { throw new Error(`${file}: nagłówek nie jest poprawnym JSON-em: ${e.message}`); }
  for (const k of ['slug', 'title', 'description']) {
    if (!meta[k]) throw new Error(`${file}: brakuje pola "${k}"`);
  }
  return { meta, body: m[2].trim() };
}

const files = readdirSync(join(root, 'src/pages')).filter(f => f.endsWith('.html')).sort();
const pages = files.map(f => parsePage(readFileSync(join(root, 'src/pages', f), 'utf8'), f));

/** Które pozycje menu podświetlić. */
const navKeys = {
  'fizjoterapia-niemowlat': 'A_NIEMOWLETA',
  'fizjoterapia-dzieci': 'A_DZIECI',
  'cennik': 'A_CENNIK',
  'o-mnie': 'A_OMNIE',
  'kontakt': 'A_KONTAKT',
};

for (const { meta, body } of pages) {
  const url = meta.slug === 'index' ? `${ORIGIN}/` : `${ORIGIN}/${meta.slug}.html`;
  let out = layout
    .replaceAll('{{TITLE}}', meta.title)
    .replaceAll('{{OGTITLE}}', meta.ogTitle || meta.title)
    .replaceAll('{{DESCRIPTION}}', meta.description)
    .replaceAll('{{CANONICAL}}', url)
    .replaceAll('{{ROBOTS}}', meta.noindex ? '<meta name="robots" content="noindex, follow">' : '')
    .replaceAll('{{JSONLD}}', meta.jsonld ? `<script type="application/ld+json">\n${JSON.stringify(meta.jsonld, null, 2)}\n</script>` : '')
    .replaceAll('{{BODY}}', body);

  // aria-current na aktywnej pozycji menu
  for (const [slug, key] of Object.entries(navKeys)) {
    out = out.replaceAll(`{{${key}}}`, meta.slug === slug ? ' aria-current="page"' : '');
  }
  out = out.replace(/\{\{[A-Z_]+\}\}/g, '');

  const name = meta.slug === 'index' ? 'index.html' : `${meta.slug}.html`;
  writeFileSync(join(root, name), `<!-- Wygenerowane przez build.mjs. Edytuj src/pages/${meta.slug}.html, nie ten plik. -->\n${out}`);
}

// sitemap.xml, tylko strony indeksowane
const indeksowane = pages.filter(p => !p.meta.noindex);
const dzis = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indeksowane.map(({ meta }) => {
  const url = meta.slug === 'index' ? `${ORIGIN}/` : `${ORIGIN}/${meta.slug}.html`;
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${dzis}</lastmod>\n    <priority>${meta.priority ?? '0.7'}</priority>\n  </url>`;
}).join('\n')}
</urlset>
`;
writeFileSync(join(root, 'sitemap.xml'), sitemap);

console.log(`Zbudowano ${pages.length} stron + sitemap.xml (${indeksowane.length} adresów)`);
for (const { meta } of pages) {
  console.log(`  ${(meta.slug === 'index' ? '/' : '/' + meta.slug + '.html').padEnd(32)} ${meta.title.slice(0, 54)}`);
}
