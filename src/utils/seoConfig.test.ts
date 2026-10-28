import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { SEO_BRAND, SEO_KEYWORDS, buildGlobalSchemaGraph } from './seoConfig';

describe('Shastraloka (ශාස්ත්රාලෝක) SEO & AI Discovery Configuration', () => {
  it('defines exact bilingual brand names and dual domains (shastraloka.lk & ශාස්ත්රාලෝක.ලංකා)', () => {
    assert.equal(SEO_BRAND.nameEn, 'Shastraloka');
    assert.equal(SEO_BRAND.nameSi, 'ශාස්ත්රාලෝක');
    assert.equal(SEO_BRAND.primaryDomain, 'shastraloka.lk');
    assert.equal(SEO_BRAND.sinhalaDomain, 'ශාස්ත්රාලෝක.ලංකා');
    assert.ok(SEO_BRAND.title.includes('Shastraloka'));
    assert.ok(SEO_BRAND.title.includes('ශාස්ත්රාලෝක'));
  });

  it('includes competitive Sri Lankan bookstore search keywords', () => {
    const joined = SEO_KEYWORDS.join(' ').toLowerCase();
    assert.ok(joined.includes('sarasavi'));
    assert.ok(joined.includes('gunasena'));
    assert.ok(joined.includes('grantha'));
    assert.ok(joined.includes('books.lk'));
    assert.ok(joined.includes('rasakatha'));
    assert.ok(joined.includes('shastraloka.lk'));
    assert.ok(joined.includes('ශාස්ත්රාලෝක.ලංකා'));
  });

  it('generates valid Schema.org @graph with BookStore, WebSite SearchAction, ItemList, and FAQPage', () => {
    const schema = buildGlobalSchemaGraph();
    assert.equal(schema['@context'], 'https://schema.org');
    assert.equal(schema['@graph'].length, 4);
    const org = schema['@graph'][0] as Record<string, unknown>;
    assert.ok((org.alternateName as string[]).includes('ශාස්ත්රාලෝක.ලංකා'));
    assert.ok((org.alternateName as string[]).includes('shastraloka.lk'));
  });
});
