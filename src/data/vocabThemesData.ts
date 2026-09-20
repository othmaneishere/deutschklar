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
import { courseVocabularyByTheme } from './courseVocabularyCards';

export interface VocabCard {
  id: string;
  de: string;
  article?: 'der' | 'die' | 'das';
  plural?: string;
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
];

const courseCardsByTheme = courseVocabularyByTheme(VOCAB_THEMES);
VOCAB_THEMES.forEach((theme) => {
  const existing = new Set(theme.cards.map((card) => card.de.toLocaleLowerCase('de-DE')));
  const additions = (courseCardsByTheme.get(theme.id) || []).filter(
    (card) => !existing.has(card.de.toLocaleLowerCase('de-DE')),
  );
  theme.cards.push(...additions);
});
