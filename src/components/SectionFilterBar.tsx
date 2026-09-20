import React from 'react';
import { CoursePage, LanguageMode, SectionFilterType } from '../types';

interface SectionFilterBarProps {
  page: CoursePage;
  activeFilter: SectionFilterType;
  onSelectFilter: (filter: SectionFilterType) => void;
  languageMode: LanguageMode;
  isCompact?: boolean;
}

export const SectionFilterBar: React.FC<SectionFilterBarProps> = ({
  page,
  activeFilter,
  onSelectFilter,
  languageMode,
  isCompact = true,
}) => {
  const vocabCount = page.sections.filter((s) => s.type === 'vocabulary').length;
  const dialogueCount = page.sections.filter((s) => s.type === 'dialogue').length;
  const grammarCount = page.sections.filter((s) => s.type === 'table' || s.type === 'rule_card').length;
  const readingCount = page.sections.filter((s) => s.type === 'reading').length;
  const listeningCount = page.sections.filter((s) => s.type === 'listening').length;
  const speakingCount = page.sections.filter((s) => s.type === 'speaking').length;
  const numbersCount = page.sections.filter((s) => s.type === 'numbers').length;
  const pronunciationCount = page.sections.filter((s) => s.type === 'pronunciation').length;
  const exerciseCount = page.exercises ? page.exercises.length : 0;

  const filters: {
    id: SectionFilterType;
    labelDe: string;
    labelAr: string;
    labelEn: string;
    labelFr: string;
    count?: number;
    show: boolean;
  }[] = [
    {
      id: 'all',
      labelDe: 'Alles',
      labelAr: 'الكل',
      labelEn: 'All',
      labelFr: 'Tout',
      show: true,
    },
    {
      id: 'vocab',
      labelDe: 'Wortschatz',
      labelAr: 'المفردات',
      labelEn: 'Vocabulary',
      labelFr: 'Vocabulaire',
      count: vocabCount,
      show: vocabCount > 0,
    },
    {
      id: 'dialogue',
      labelDe: 'Dialoge',
      labelAr: 'المحادثات',
      labelEn: 'Dialogues',
      labelFr: 'Dialogues',
      count: dialogueCount,
      show: dialogueCount > 0,
    },
    {
      id: 'grammar',
      labelDe: 'Grammatik',
      labelAr: 'القواعد',
      labelEn: 'Grammar',
      labelFr: 'Grammaire',
      count: grammarCount,
      show: grammarCount > 0,
    },
    {
      id: 'reading',
      labelDe: 'Lesen',
      labelAr: 'القراءة',
      labelEn: 'Reading',
      labelFr: 'Lecture',
      count: readingCount,
      show: readingCount > 0,
    },
    {
      id: 'listening',
      labelDe: 'Hören',
      labelAr: 'الاستماع',
      labelEn: 'Listening',
      labelFr: 'Écoute',
      count: listeningCount,
      show: listeningCount > 0,
    },
    {
      id: 'speaking',
      labelDe: 'Sprechen',
      labelAr: 'التحدث',
      labelEn: 'Speaking',
      labelFr: 'Expression',
      count: speakingCount,
      show: speakingCount > 0,
    },
    {
      id: 'numbers',
      labelDe: 'Zahlen',
      labelAr: 'الأرقام',
      labelEn: 'Numbers',
      labelFr: 'Nombres',
      count: numbersCount,
      show: numbersCount > 0,
    },
    {
      id: 'pronunciation',
      labelDe: 'Aussprache',
      labelAr: 'النطق',
      labelEn: 'Pronunciation',
      labelFr: 'Prononciation',
      count: pronunciationCount,
      show: pronunciationCount > 0,
    },
    {
      id: 'exercises',
      labelDe: 'Übungen',
      labelAr: 'التمارين',
      labelEn: 'Exercises',
      labelFr: 'Exercices',
      count: exerciseCount,
      show: exerciseCount > 0,
    },
  ];

  const visibleFilters = filters.filter((f) => f.show);
  if (visibleFilters.length <= 2) return null;

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none">
      {visibleFilters.map((f) => {
        const isActive = activeFilter === f.id;

        let label = f.labelDe;
        if (languageMode === 'ar') label = f.labelAr;
        if (languageMode === 'en') label = f.labelEn;
        if (languageMode === 'fr') label = f.labelFr;

        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onSelectFilter(f.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap border ${
              isActive
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-bold'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span className={languageMode === 'ar' ? 'font-arabic' : ''}>{label}</span>
            {f.count !== undefined && f.count > 0 && (
              <span
                className={`text-[10px] font-bold px-1 rounded ${
                  isActive ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {f.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
