import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getOfferPercentage,
  getAutocompleteSuggestions,
  searchAndRankBooks,
} from './searchEngine';
import { BOOKS } from '../data/books';

describe('Shastraloka Search & Similarity Engine', () => {
  it('calculates LKR offer percentage accurately', () => {
    assert.equal(getOfferPercentage(2450, 3400), 28);
    assert.equal(getOfferPercentage(2850, 3800), 25);
    assert.equal(getOfferPercentage(3000, 3000), 0);
  });

  it('suggests Gajaga book directly in search bar when user types "gajaga" or "gaj"', () => {
    const resFull = getAutocompleteSuggestions('gajaga', BOOKS);
    assert.ok(resFull.bookSuggestions.length > 0);
    assert.equal(resFull.bookSuggestions[0].book.id, 'gajaga-wannama-royal-chronicle');
    assert.equal(resFull.bookSuggestions[0].matchType, 'Exact Match');

    const resPartial = getAutocompleteSuggestions('gaj', BOOKS);
    assert.ok(resPartial.bookSuggestions.length >= 3);
    assert.equal(resPartial.bookSuggestions[0].book.id, 'gajaga-wannama-royal-chronicle');
    // Other Gajaga / Gajabahu books also appear in suggestions
    const suggestedIds = resPartial.bookSuggestions.map((s) => s.book.id);
    assert.ok(suggestedIds.includes('gajabahu-raja-puwatha'));
    assert.ok(suggestedIds.includes('gajaga-hasti-palana-shastraya'));
  });

  it('ranks Gajaga Wannama first and similar/suggested books after when searching "gaj"', () => {
    const output = searchAndRankBooks({ query: 'gaj' }, BOOKS);
    assert.ok(output.topMatchedBook);
    assert.equal(output.topMatchedBook.book.id, 'gajaga-wannama-royal-chronicle');
    assert.ok(output.primaryMatches.length >= 4);
    assert.ok(output.suggestedBooks.length > 0);
    assert.equal(output.allItems[0].book.id, 'gajaga-wannama-royal-chronicle');
  });

  it('returns closest similar books first and suggested books after even for non-existent/approximate book names', () => {
    const output = searchAndRankBooks({ query: 'gajagaa wannam' }, BOOKS);
    assert.ok(output.topMatchedBook);
    assert.equal(output.topMatchedBook.book.id, 'gajaga-wannama-royal-chronicle');
    assert.ok(output.allItems.length > 10);

    const unknownQuery = searchAndRankBooks({ query: 'xyzrarechronicle' }, BOOKS);
    assert.ok(unknownQuery.primaryMatches.length > 0);
    assert.ok(unknownQuery.suggestedBooks.length > 0);
  });

  it('lists category books first when a category is selected and supports filtering', () => {
    const catOutput = searchAndRankBooks(
      {
        category: 'Ancient Chronicles (Itihasa)',
        minDiscount: 20,
      },
      BOOKS
    );
    assert.ok(catOutput.primaryMatches.length >= 4);
    catOutput.primaryMatches.forEach((item) => {
      assert.equal(item.book.category, 'Ancient Chronicles (Itihasa)');
      assert.ok(item.discountPercent >= 20);
    });
  });
});
