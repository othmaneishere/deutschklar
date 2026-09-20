import React from 'react';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { CoursePage, LanguageMode } from '../types';

interface PagePaginationProps {
  currentPageNumber: number;
  totalPages: number;
  allPages: CoursePage[];
  onSelectPage: (pageNumber: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  showTranslations: boolean;
  onToggleTranslations: () => void;
  languageMode: LanguageMode;
}

export const PagePagination: React.FC<PagePaginationProps> = ({
  currentPageNumber,
  totalPages,
  allPages,
  onSelectPage,
  onPrevPage,
  onNextPage,
  showTranslations,
  onToggleTranslations,
  languageMode,
}) => {
  const progressPercent = Math.round((currentPageNumber / totalPages) * 100);

  return (
    <div className="pt-6 pb-12 space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-stone-200/80 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-amber-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main navigation controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-xs">
        {/* Previous button */}
        <button
          onClick={onPrevPage}
          disabled={currentPageNumber <= 1}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Vorherige Seite</span>
        </button>

        {/* Center: Page Selector & Study Mode toggle */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <select
            value={currentPageNumber}
            onChange={(e) => onSelectPage(Number(e.target.value))}
            className="px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {allPages.map((pg) => (
              <option key={pg.pageNumber} value={pg.pageNumber}>
                Seite {pg.pageNumber}: {pg.pageTitleDe}
              </option>
            ))}
          </select>

          {languageMode !== 'none' && (
            <button
              onClick={onToggleTranslations}
              className={`p-2 rounded-xl border transition cursor-pointer text-xs flex items-center gap-1.5 ${
                showTranslations
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
              }`}
              title={
                showTranslations
                  ? 'Übersetzungen verbergen (Selbsttest-Modus)'
                  : 'Übersetzungen einblenden'
              }
            >
              {showTranslations ? (
                <>
                  <Eye className="w-4 h-4 text-amber-700" />
                  <span className="hidden md:inline font-medium">Sichtbar</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-stone-500" />
                  <span className="hidden md:inline font-medium">Verdeckt</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={onNextPage}
          disabled={currentPageNumber >= totalPages}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-xs disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
        >
          <span>Nächste Seite</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
