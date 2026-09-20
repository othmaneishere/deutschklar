export interface A2CourseUnit {
  id: string;
  titleDe: string;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  level: string;
  chapterNumbers: number[];
  color: {
    dotColor: string;
    bgBadge: string;
    gradient: string;
  };
}

export const a2CourseUnits: A2CourseUnit[] = [
  {
    id: 'a2-unit-1',
    titleDe: 'Einheit 1: Identität, Vergangenheit & Berufswelt',
    titleAr: 'الوحدة 1: الهوية، الماضي وعالم العمل',
    titleEn: 'Unit 1: Identity, Past & Career World',
    titleFr: 'Unité 1 : Identité, Passé & Monde du travail',
    level: 'A2',
    chapterNumbers: [1, 2, 3, 4],
    color: {
      dotColor: 'bg-purple-500',
      bgBadge: 'bg-purple-50 text-purple-700 border-purple-200',
      gradient: 'from-purple-600 to-indigo-600',
    },
  },
  {
    id: 'a2-unit-2',
    titleDe: 'Einheit 2: Wohnen, Orientierung & Unterwegs',
    titleAr: 'الوحدة 2: السكن، التوجه والتنقل',
    titleEn: 'Unit 2: Living, Navigation & Travel',
    titleFr: 'Unité 2 : Logement, Orientation & Déplacements',
    level: 'A2',
    chapterNumbers: [5, 6, 7, 8],
    color: {
      dotColor: 'bg-indigo-500',
      bgBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      gradient: 'from-indigo-600 to-blue-600',
    },
  },
  {
    id: 'a2-unit-3',
    titleDe: 'Einheit 3: Genuss, Konsum & Gesellschaft',
    titleAr: 'الوحدة 3: الغذاء، الاستهلاك والمجتمع',
    titleEn: 'Unit 3: Food, Consumption & Society',
    titleFr: 'Unité 3 : Gastronomie, Consommation & Société',
    level: 'A2',
    chapterNumbers: [9, 10, 11, 12],
    color: {
      dotColor: 'bg-blue-500',
      bgBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      gradient: 'from-blue-600 to-cyan-600',
    },
  },
  {
    id: 'a2-unit-4',
    titleDe: 'Einheit 4: Kommunikation, Umwelt & Kultur',
    titleAr: 'الوحدة 4: الإعلام، البيئة والثقافة',
    titleEn: 'Unit 4: Media, Environment & Culture',
    titleFr: 'Unité 4 : Médias, Environnement & Culture',
    level: 'A2',
    chapterNumbers: [13, 14, 15, 16],
    color: {
      dotColor: 'bg-emerald-500',
      bgBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      gradient: 'from-emerald-600 to-teal-600',
    },
  },
  {
    id: 'a2-unit-5',
    titleDe: 'Einheit 5: Behörden, Konfliktlösung & Abschlussprüfung',
    titleAr: 'الوحدة 5: الدوائر الحكومية، حل الخلافات واختبار A2 النهائي',
    titleEn: 'Unit 5: Official Services, Conflict Resolution & Final Exam',
    titleFr: 'Unité 5 : Démarches officielles, Résolution de conflits & Examen final',
    level: 'A2',
    chapterNumbers: [17, 18, 19, 20],
    color: {
      dotColor: 'bg-amber-500',
      bgBadge: 'bg-amber-50 text-amber-800 border-amber-200',
      gradient: 'from-amber-600 to-orange-600',
    },
  },
];

export const getA2UnitForChapter = (chapterNumber: number): A2CourseUnit => {
  return a2CourseUnits.find((u) => u.chapterNumbers.includes(chapterNumber)) || a2CourseUnits[0];
};
