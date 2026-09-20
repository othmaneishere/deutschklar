import React from 'react';
import { CoursePage, LanguageMode } from '../types';

interface TopicPillsProps {
  chapterPages: CoursePage[];
  activePageNumber: number;
  onSelectPage: (pageNumber: number) => void;
  languageMode: LanguageMode;
  isCompact?: boolean;
}

export const TopicPills: React.FC<TopicPillsProps> = ({
  chapterPages,
  activePageNumber,
  onSelectPage,
  languageMode,
  isCompact = true,
}) => {
  if (chapterPages.length <= 1) return null;

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-0.5 scrollbar-none">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-0.5">
        Themen:
      </span>
      {chapterPages.map((page, index) => {
        const isActive = page.pageNumber === activePageNumber;

        let title = page.pageTitleDe;
        if (languageMode === 'ar') title = page.pageTitleAr;
        if (languageMode === 'en') title = page.pageTitleEn;
        if (languageMode === 'fr') title = page.pageTitleFr;

        return (
          <button
            key={page.pageNumber}
            type="button"
            onClick={() => onSelectPage(page.pageNumber)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap border ${
              isActive
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-2xs font-bold'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black ${
                isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {index + 1}
            </span>
            <span className={languageMode === 'ar' ? 'font-arabic' : ''}>{title}</span>
          </button>
        );
      })}
    </div>
  );
};
