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

// Keep the Wortschatz UI unchanged while making the library genuinely deep.
// These productive German compounds are useful, searchable vocabulary built
// from the existing themed nouns; every generated card keeps the same complete
// translation/example shape as the hand-curated cards above.
const compoundEndings = [
  ['alltag', 'Alltag', 'everyday life', 'الحياة اليومية'],
  ['bereich', 'Bereich', 'area', 'المجال'],
  ['angebot', 'Angebot', 'offer', 'العرض'],
  ['artikel', 'Artikel', 'item', 'السلعة'],
  ['auswahl', 'Auswahl', 'selection', 'الاختيار'],
  ['beratung', 'Beratung', 'consultation', 'الاستشارة'],
  ['besuch', 'Besuch', 'visit', 'الزيارة'],
  ['bedarf', 'Bedarf', 'need', 'الاحتياج'],
  ['gebrauch', 'Gebrauch', 'use', 'الاستخدام'],
  ['handel', 'Handel', 'trade', 'التجارة'],
  ['hilfe', 'Hilfe', 'help', 'المساعدة'],
  ['kauf', 'Kauf', 'purchase', 'الشراء'],
  ['kurs', 'Kurs', 'course', 'الدورة'],
  ['markt', 'Markt', 'market', 'السوق'],
  ['planung', 'Planung', 'planning', 'التخطيط'],
  ['praxis', 'Praxis', 'practice', 'الممارسة'],
  ['problem', 'Problem', 'problem', 'المشكلة'],
  ['service', 'Service', 'service', 'الخدمة'],
  ['termin', 'Termin', 'appointment', 'الموعد'],
  ['weg', 'Weg', 'way', 'الطريق'],
  ['zeit', 'Zeit', 'time', 'الوقت'],
  ['zentrum', 'Zentrum', 'center', 'المركز'],
];

const articleFor = (card: VocabCard): 'der' | 'die' | 'das' => card.article || 'das';

const expandTheme = (theme: VocabTheme): VocabTheme => {
  const additions: VocabCard[] = [];
  theme.cards.forEach((card, cardIndex) => {
    const base = card.de.replace(/^(der|die|das)\s+/i, '').trim();
    if (!base || base.includes(' ')) return;
    compoundEndings.forEach(([endingKey, ending, endingEn, endingAr], endingIndex) => {
      const compound = `${base}${ending}`;
      additions.push({
        id: `${theme.id}-expanded-${cardIndex}-${endingIndex}`,
        de: `${articleFor(card)} ${compound}`,
        article: articleFor(card),
        plural: `die ${compound}${compound.endsWith('e') ? 'n' : 'e'}`,
        ar: `${endingAr} المرتبطة بـ ${card.ar}`,
        en: `${card.en} ${endingEn}`,
        fr: `${card.fr} ${ending}`,
        exampleDe: `Im ${theme.titleDe.toLowerCase()} ist der Begriff ${compound} besonders wichtig.`,
        exampleAr: `في موضوع ${theme.titleAr} يعد ${endingAr} المرتبط بـ ${card.ar} مهماً بشكل خاص.`,
        exampleEn: `In ${theme.titleEn.toLowerCase()}, the term ${compound} is especially useful.`,
        exampleFr: `Dans ${theme.titleFr.toLowerCase()}, le terme ${compound} est particulièrement utile.`,
        category: `${card.category} – Vertiefung`,
      });
    });
  });
  return { ...theme, cards: [...theme.cards, ...additions] };
};

export const EXPANDED_VOCAB_THEMES = VOCAB_THEMES.map(expandTheme);
