import { allPages } from './pagesData';
import { allA2Pages } from './a2PagesData';
import type { VocabCard, VocabTheme } from './vocabThemesData';

type SourceItem = { de?: string; ar?: string; en?: string; fr?: string };

const keywordThemes: [string[], string][] = [
  [['essen', 'lebensmittel', 'restaurant', 'getränk', 'küche'], 'essen-trinken'],
  [['wohnen', 'wohnung', 'zimmer', 'möbel', 'miete'], 'wohnen'],
  [['arbeit', 'beruf', 'büro', 'bewerbung', 'karriere'], 'arbeit'],
  [['gesund', 'arzt', 'körper', 'krank', 'medizin'], 'gesundheit'],
  [['stadt', 'verkehr', 'bahnhof', 'bus', 'zug'], 'stadt-verkehr'],
  [['einkauf', 'kleidung', 'schuhe', 'geschäft'], 'einkaufen'],
  [['behörde', 'amt', 'dokument', 'recht'], 'behoerden'],
  [['familie', 'beziehung', 'freund'], 'familie'],
  [['freizeit', 'sport', 'musik', 'kultur', 'hobby'], 'freizeit'],
  [['reise', 'hotel', 'flughafen', 'urlaub'], 'reisen'],
  [['wetter', 'natur', 'jahreszeit', 'landschaft'], 'natur-wetter'],
  [['gefühl', 'charakter', 'emotion'], 'gefuehle'],
  [['medien', 'internet', 'computer', 'telefon'], 'medien'],
  [['schule', 'bildung', 'lernen', 'prüfung', 'studium'], 'bildung'],
  [['zeit', 'uhr', 'monat', 'woche', 'kalender'], 'zahlen-zeit'],
  [['post', 'bank', 'konto', 'geld'], 'post-bank'],
  [['tier', 'hund', 'katze'], 'tiere'],
];

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();

const sourceItems = [...allPages, ...allA2Pages].flatMap((page) =>
  page.sections
    .filter((section) => section.type === 'vocabulary' && section.vocabItems)
    .flatMap((section) =>
      (section.vocabItems as SourceItem[]).map((item) => ({ item, category: section.titleDe })),
    ),
);

const sourceToCard = (item: SourceItem, category: string, index: number): VocabCard | null => {
  const de = normalize(item.de || '');
  const en = normalize(item.en || '');
  const ar = normalize(item.ar || '');
  if (!de || !en || !ar) return null;
  const articleMatch = /^(der|die|das)\s+(.+)$/i.exec(de);
  const article = articleMatch?.[1].toLowerCase() as VocabCard['article'] | undefined;
  return {
    id: `course-${index}`,
    de,
    ...(article ? { article } : {}),
    ar,
    en,
    fr: normalize(item.fr || en),
    exampleDe: de,
    exampleAr: ar,
    exampleEn: en,
    exampleFr: normalize(item.fr || en),
    category,
  };
};

export const courseVocabularyByTheme = (themes: VocabTheme[]): Map<string, VocabCard[]> => {
  const result = new Map<string, VocabCard[]>();
  themes.forEach((theme) => result.set(theme.id, []));
  const seen = new Set<string>();
  sourceItems.forEach(({ item, category }, index) => {
    const card = sourceToCard(item, category, index);
    if (!card) return;
    const key = card.de.toLocaleLowerCase('de-DE');
    if (seen.has(key)) return;
    seen.add(key);
    const searchable = `${category} ${card.de}`.toLocaleLowerCase('de-DE');
    const matched = keywordThemes.find(([keywords]) => keywords.some((keyword) => searchable.includes(keyword)));
    const themeId = matched?.[1] || themes[index % themes.length].id;
    result.get(themeId)?.push(card);
  });
  return result;
};
