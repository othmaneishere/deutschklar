import assert from 'node:assert/strict';
import { AUDITED_VOCAB_THEMES, VOCAB_THEMES } from '../src/data/vocabThemesData';
import { additions, newThemes } from '../src/data/vocab/curatedExpansion';

const required = ['de', 'en', 'ar', 'fr', 'exampleDe', 'exampleEn', 'exampleAr', 'exampleFr', 'category'] as const;
const newCards = [...Object.values(additions).flat(), ...newThemes.flatMap(t => t.cards)];
const publicCards = AUDITED_VOCAB_THEMES.flatMap(t => t.cards);
const key = (word: string) => word.normalize('NFC').trim().toLocaleLowerCase('de-DE');
const assertUnique = (values: string[], label: string) => {
  const duplicates = values.filter((v, i) => values.indexOf(v) !== i);
  assert.equal(duplicates.length, 0, `${label}: ${[...new Set(duplicates)].join(', ')}`);
};
assertUnique(newCards.map(c => key(c.de)), 'Duplicate new words');
assertUnique(publicCards.map(c => key(c.de)), 'Duplicate displayed words');
assertUnique(publicCards.map(c => c.id), 'Duplicate card IDs');
assertUnique(AUDITED_VOCAB_THEMES.map(t => t.id), 'Duplicate themes');
assertUnique(newCards.map(c => c.exampleDe), 'Repeated new examples');

for (const card of publicCards) {
  for (const field of required) {
    assert.ok(card[field]?.trim(), `${card.id}: missing ${field}`);
    assert.equal(card[field].trim(), card[field], `${card.id}: whitespace in ${field}`);
    assert.ok(!card[field].includes('\uFFFD'), `${card.id}: broken encoding in ${field}`);
  }
  assert.match(card.ar, /[\u0600-\u06ff]/u, `${card.id}: missing Arabic translation`);
  assert.ok(!/BrotAlltag|BrotBereich|ApfelHilfe|BrötchenService|Vertiefung/u.test(card.de), `${card.id}: artificial entry`);
}
for (const card of newCards) {
  assert.ok(['noun', 'verb', 'adjective', 'adverb', 'phrase'].includes(card.kind!), `${card.id}: invalid type`);
  assert.ok(!card.de.includes('/'), `${card.id}: combined headwords`);
  assert.notEqual(card.exampleDe, card.de, `${card.id}: headword used as placeholder example`);
  if (card.kind === 'noun') {
    assert.ok(card.article && card.de.startsWith(`${card.article} `), `${card.id}: article mismatch`);
    assert.ok(card.plural && /^(die |kein Plural|nur Plural)/u.test(card.plural), `${card.id}: missing plural/status`);
    assert.equal(card.forms, undefined, `${card.id}: verb forms on noun`);
  } else {
    assert.equal(card.article, undefined, `${card.id}: article on non-noun`);
    assert.equal(card.plural, undefined, `${card.id}: plural on non-noun`);
    if (card.kind === 'verb') assert.ok(card.forms?.includes(' · '), `${card.id}: missing principal parts`);
  }
  assert.ok(publicCards.some(c => c.id === card.id), `${card.id}: new entry silently removed`);
}
for (const id of Object.keys(additions)) assert.ok(AUDITED_VOCAB_THEMES.some(t => t.id === id), `Unknown theme: ${id}`);
const counts = publicCards.reduce<Record<string, number>>((acc, card) => {
  acc[card.kind!] = (acc[card.kind!] || 0) + 1;
  return acc;
}, {});
console.log(JSON.stringify({
  total: publicCards.length, added: newCards.length, themes: AUDITED_VOCAB_THEMES.length,
  kinds: counts, duplicatesDisplayed: 0,
  legacyDuplicatesFiltered: VOCAB_THEMES.reduce((n, t) => n + t.cards.length, 0) - publicCards.length,
  counts: AUDITED_VOCAB_THEMES.map(t => ({theme: t.titleDe, count: t.cards.length})),
}, null, 2));
