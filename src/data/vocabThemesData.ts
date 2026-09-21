import { themeEssen } from './vocab/themeEssen';
import { themeWohnen } from './vocab/themeWohnen';
import { themeArbeit } from './vocab/themeArbeit';
import { themeGesundheit } from './vocab/themeGesundheit';
import { themeStadtVerkehr } from './vocab/themeStadtVerkehr';
import { themeEinkaufen } from './vocab/themeEinkaufen';
import { themeBehoerden } from './vocab/themeBehoerden';
import { themeFamilie } from './vocab/themeFamilie';
import { themeFreizeit } from './vocab/themeFreizeit';
import { themeReisen } from './vocab/themeReisen';
import { themeNaturWetter } from './vocab/themeNaturWetter';
import { themeGefuehle } from './vocab/themeGefuehle';
import { themeMedien } from './vocab/themeMedien';
import { themeBildung } from './vocab/themeBildung';
import { themeZahlenZeit } from './vocab/themeZahlenZeit';
import { themePostBank } from './vocab/themePostBank';
import { themeTiere } from './vocab/themeTiere';
import { additions, newThemes } from './vocab/curatedExpansion';

export interface VocabCard {
  id: string;
  kind?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase';
  de: string;
  article?: 'der' | 'die' | 'das';
  plural?: string;
  /** Verb principal parts or other useful inflection; never a noun plural. */
  forms?: string;
  ar: string;
  en: string;
  fr: string;
  exampleDe: string;
  exampleAr: string;
  exampleEn: string;
  exampleFr: string;
  category: string;
}

export interface VocabTheme {
  id: string;
  titleDe: string;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  level: 'A1' | 'A2';
  icon: string;
  descriptionDe: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionFr: string;
  cards: VocabCard[];
}

export const VOCAB_THEMES: VocabTheme[] = [
  themeEssen,
  themeWohnen,
  themeArbeit,
  themeGesundheit,
  themeStadtVerkehr,
  themeEinkaufen,
  themeBehoerden,
  themeFamilie,
  themeFreizeit,
  themeReisen,
  themeNaturWetter,
  themeGefuehle,
  themeMedien,
  themeBildung,
  themeZahlenZeit,
  themePostBank,
  themeTiere,
  ...newThemes,
].map((theme) => ({
  ...theme,
  cards: [...theme.cards, ...(additions[theme.id] || [])],
}));

const normalizeText = (value: string) => value.replace(/\s+/g, ' ').trim();

const auditVocabulary = (themes: VocabTheme[]): VocabTheme[] => {
  const seenWords = new Set<string>();
  const seenIds = new Set<string>();

  return themes.map((theme) => ({
    ...theme,
    cards: theme.cards
      .map((card) => {
        const de = normalizeText(card.de);
        const inferredKind: NonNullable<VocabCard['kind']> = card.kind || (card.article ? 'noun' : 'phrase');
        const normalized: VocabCard = {
          ...card,
          kind: inferredKind,
          de,
          ar: normalizeText(card.ar),
          en: normalizeText(card.en),
          fr: normalizeText(card.fr),
          exampleDe: normalizeText(card.exampleDe),
          exampleAr: normalizeText(card.exampleAr),
          exampleEn: normalizeText(card.exampleEn),
          exampleFr: normalizeText(card.exampleFr),
          category: normalizeText(card.category),
          ...(card.plural ? { plural: normalizeText(card.plural) } : {}),
        };

        if (normalized.kind === 'noun' && (!normalized.article || !normalized.plural)) return null;
        if (!normalized.de || !normalized.en || !normalized.ar || !normalized.exampleDe || !normalized.exampleEn) return null;
        return normalized;
      })
      .filter((card): card is VocabCard => {
        if (!card) return false;
        const wordKey = card.de.toLocaleLowerCase('de-DE');
        if (seenWords.has(wordKey) || seenIds.has(card.id)) return false;
        seenWords.add(wordKey);
        seenIds.add(card.id);
        return true;
      }),
  }));
};

export const AUDITED_VOCAB_THEMES = auditVocabulary(VOCAB_THEMES);
