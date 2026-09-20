import { LanguageMode } from '../types';

export interface CourseUnit {
  id: number;
  number: number;
  level: 'A1.1' | 'A1.2';
  titleDe: string;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  descDe: string;
  descAr: string;
  descEn: string;
  descFr: string;
  chapterNumbers: number[];
  color: {
    name: string;
    gradient: string;
    bgBadge: string;
    textBadge: string;
    borderAccent: string;
    lightBg: string;
    activeTab: string;
    dotColor: string;
    ring: string;
  };
}

export const courseUnits: CourseUnit[] = [
  {
    id: 1,
    number: 1,
    level: 'A1.1',
    titleDe: 'Einheit 1: Erste Schritte, Zahlen & Familie',
    titleAr: 'الوحدة 1: الخطوات الأولى، الأرقام والعائلة',
    titleEn: 'Unit 1: First Steps, Numbers & Family',
    titleFr: 'Unité 1 : Premiers pas, chiffres et famille',
    descDe: 'Kennenlernen, Alphabet, Umlaute, Zahlen bis 1000, Uhrzeit, sein/haben und Familie.',
    descAr: 'التعارف، الأبجدية، الحروف الصوتية، الأرقام حتى 1000، الوقت، فعلا sein و haben والعائلة.',
    descEn: 'Introductions, German alphabet, sounds, numbers to 1000, clock time, sein/haben, and family.',
    descFr: 'Présentations, alphabet, phonétique, chiffres jusqu’à 1000, heure, sein/haben et famille.',
    chapterNumbers: [1, 2, 3, 4],
    color: {
      name: 'indigo',
      gradient: 'from-blue-600 to-indigo-600',
      bgBadge: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      textBadge: 'text-indigo-700',
      borderAccent: 'border-indigo-500',
      lightBg: 'bg-indigo-50/60',
      activeTab: 'bg-indigo-600 text-white shadow-indigo-200 shadow-sm',
      dotColor: 'bg-indigo-500',
      ring: 'ring-indigo-400',
    },
  },
  {
    id: 2,
    number: 2,
    level: 'A1.1',
    titleDe: 'Einheit 2: Alltag, Ernährung & Wohnen',
    titleAr: 'الوحدة 2: الحياة اليومية، الغذاء والسكن',
    titleEn: 'Unit 2: Daily Life, Food & Home',
    titleFr: 'Unité 2 : Vie quotidienne, alimentation et logement',
    descDe: 'Freunde, Berufe, Tagesablauf, trennbare Verben, Essen & Trinken, Akkusativ und Wohnungseinrichtung.',
    descAr: 'الأصدقاء والمهن، الروتين اليومي، الأفعال المنفصلة، الطعام والشراب، المفعول به والأثاث المنزلي.',
    descEn: 'Friends & traits, daily routines, separable verbs, food & dining, accusative case, and home furnishing.',
    descFr: 'Amis & métiers, routine quotidienne, verbes à particule, alimentation, accusatif et mobilier.',
    chapterNumbers: [5, 6, 7, 8],
    color: {
      name: 'emerald',
      gradient: 'from-emerald-600 to-teal-600',
      bgBadge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      textBadge: 'text-emerald-700',
      borderAccent: 'border-emerald-500',
      lightBg: 'bg-emerald-50/60',
      activeTab: 'bg-emerald-600 text-white shadow-emerald-200 shadow-sm',
      dotColor: 'bg-emerald-500',
      ring: 'ring-emerald-400',
    },
  },
  {
    id: 3,
    number: 3,
    level: 'A1.2',
    titleDe: 'Einheit 3: Stadt, Freizeit, Mode & Gesundheit',
    titleAr: 'الوحدة 3: المدينة، الترفيه، التسوق والصحة',
    titleEn: 'Unit 3: City Life, Leisure, Fashion & Health',
    titleFr: 'Unité 3 : Ville, loisirs, mode et santé',
    descDe: 'Wegbeschreibung, Imperativ, Hobbys, Modalverb können, Kleidung & Einkaufen, Körperteile und Arztbesuch.',
    descAr: 'وصف الطريق، صيغة الأمر، الهوايات، فعل können، الملابس والتسوق، أجزاء الجسم وزيارة الطبيب.',
    descEn: 'Directions, imperative, hobbies, modal verb können, shopping for clothes, body parts & doctor visits.',
    descFr: 'Itinéraires, impératif, loisirs, verbe modal können, shopping vêtements, corps humain & médecin.',
    chapterNumbers: [9, 10, 11, 12],
    color: {
      name: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      bgBadge: 'bg-amber-50 border-amber-200 text-amber-800',
      textBadge: 'text-amber-800',
      borderAccent: 'border-amber-500',
      lightBg: 'bg-amber-50/60',
      activeTab: 'bg-amber-600 text-white shadow-amber-200 shadow-sm',
      dotColor: 'bg-amber-500',
      ring: 'ring-amber-400',
    },
  },
  {
    id: 4,
    number: 4,
    level: 'A1.2',
    titleDe: 'Einheit 4: Beruf, Reisen, Behörden & Medien',
    titleAr: 'الوحدة 4: العمل، السفر، المعاملات الرسمية والتقنية',
    titleEn: 'Unit 4: Careers, Travel, Public Offices & Tech',
    titleFr: 'Unité 4 : Carrières, voyages, administrations et médias',
    descDe: 'Arbeitswelt, Vorstellungsgespräch, Bahnreisen, Hotelbuchung, Post, Bürgeramt und digitale Kommunikation.',
    descAr: 'بيئة العمل والمقابلة، السفر بالقطار، حجز الفنادق، البريد، مكتب المواطنين والتواصل الرقمي.',
    descEn: 'Workplace dialogues, interview questions, train transit, hotel booking, post & Bürgeramt, and tech.',
    descFr: 'Monde du travail, entretien, train, réservation d’hôtel, poste & mairie, communication numérique.',
    chapterNumbers: [13, 14, 15, 16],
    color: {
      name: 'purple',
      gradient: 'from-purple-600 to-pink-600',
      bgBadge: 'bg-purple-50 border-purple-200 text-purple-700',
      textBadge: 'text-purple-700',
      borderAccent: 'border-purple-500',
      lightBg: 'bg-purple-50/60',
      activeTab: 'bg-purple-600 text-white shadow-purple-200 shadow-sm',
      dotColor: 'bg-purple-500',
      ring: 'ring-purple-400',
    },
  },
  {
    id: 5,
    number: 5,
    level: 'A1.2',
    titleDe: 'Einheit 5: Natur, Kultur, Perfekt & A1-Abschluss',
    titleAr: 'الوحدة 5: الطبيعة، الثقافة، الماضي وامتحان التخرج',
    titleEn: 'Unit 5: Nature, Culture, Past Tense & Final Exam',
    titleFr: 'Unité 5 : Nature, culture, passé composé et examen final',
    descDe: 'Wetter & weil-Sätze, Feiertage & Einladungen, Perfekt-Vergangenheit, Goethe A1 Prüfungsformat und Abschlusstest.',
    descAr: 'الطقس وجمل التعليل بـ weil، الأعياد والدعوات، صيغة الماضي Perfekt، هيكلية امتحان غوته A1 والاختبار الشامل.',
    descEn: 'Weather & because clauses, holidays & invitations, conversational past Perfekt, Goethe exam format & test.',
    descFr: 'Météo et subordonnées avec « weil », fêtes & vœux, passé composé Perfekt, format d’examen Goethe et test final.',
    chapterNumbers: [17, 18, 19, 20],
    color: {
      name: 'blue',
      gradient: 'from-sky-600 to-blue-700',
      bgBadge: 'bg-sky-50 border-sky-200 text-sky-700',
      textBadge: 'text-sky-700',
      borderAccent: 'border-sky-500',
      lightBg: 'bg-sky-50/60',
      activeTab: 'bg-sky-600 text-white shadow-sky-200 shadow-sm',
      dotColor: 'bg-sky-500',
      ring: 'ring-sky-400',
    },
  },
];

export const getUnitForChapter = (chapterNumber: number): CourseUnit => {
  return courseUnits.find((u) => u.chapterNumbers.includes(chapterNumber)) || courseUnits[0];
};

export const getUnitTitle = (unit: CourseUnit, mode: LanguageMode): string => {
  if (mode === 'ar') return unit.titleAr;
  if (mode === 'en') return unit.titleEn;
  if (mode === 'fr') return unit.titleFr;
  return unit.titleDe;
};
