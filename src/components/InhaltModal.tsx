import React from 'react';
import { X, BookOpen, ChevronRight, ArrowRight } from 'lucide-react';
import { ChapterOverview, LanguageMode, CoursePage } from '../types';

interface InhaltModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: ChapterOverview[];
  allPages: CoursePage[];
  currentPageNumber: number;
  languageMode: LanguageMode;
  onSelectPage: (pageNumber: number) => void;
}

export const InhaltModal: React.FC<InhaltModalProps> = ({
  isOpen,
  onClose,
  chapters,
  allPages,
  currentPageNumber,
  languageMode,
  onSelectPage,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inhalt-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="bg-white text-stone-900 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="inhalt-modal-title" className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
                <span>INHALT</span>
                {languageMode === 'ar' && <span className="text-stone-500 font-arabic font-normal">| المحتويات</span>}
                {languageMode === 'en' && <span className="text-stone-500 font-normal">| Table of Contents</span>}
                {languageMode === 'fr' && <span className="text-stone-500 font-normal">| Table des Matières</span>}
              </h2>
              <p className="text-xs text-stone-500">
                A1 Deutschkurs · 15 Kapitel · Klicke auf ein Kapitel zum Springen
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 divide-y divide-stone-100">
          {chapters.map((ch) => {
            const isCurrentChapter = allPages.some(
              (p) => p.pageNumber === currentPageNumber && p.chapterNumber === ch.number
            );

            // Find all pages belonging to this chapter
            const chapterPages = allPages.filter(p => p.chapterNumber === ch.number);

            return (
              <div key={ch.number} className="pt-3 first:pt-0">
                <div
                  onClick={() => {
                    onSelectPage(ch.startPage);
                    onClose();
                  }}
                  className={`group p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrentChapter
                      ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300/60'
                      : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-amber-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-800 transition">
                        {ch.titleDe}
                      </span>
                    </div>

                    {/* Translated title if translation mode is active */}
                    {languageMode === 'ar' && (
                      <p className="text-xs text-stone-600 font-arabic" dir="rtl">
                        {ch.titleAr}
                      </p>
                    )}
                    {languageMode === 'en' && (
                      <p className="text-xs text-stone-600">
                        {ch.titleEn}
                      </p>
                    )}
                    {languageMode === 'fr' && (
                      <p className="text-xs text-stone-600">
                        {ch.titleFr}
                      </p>
                    )}

                    {/* Topics */}
                    <p className="text-xs text-stone-500 flex items-center gap-1">
                      <span>Themen:</span>
                      <span className="text-stone-600 font-medium">
                        {languageMode === 'none' && ch.topicsDe}
                        {languageMode === 'ar' && ch.topicsAr}
                        {languageMode === 'en' && ch.topicsEn}
                        {languageMode === 'fr' && ch.topicsFr}
                      </span>
                    </p>
                  </div>

                  {/* Right side page navigation pill */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {chapterPages.length > 1 ? (
                      <div className="flex items-center gap-1">
                        {chapterPages.map((pg) => (
                          <button
                            key={pg.pageNumber}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPage(pg.pageNumber);
                              onClose();
                            }}
                            className={`px-2 py-1 rounded-md text-xs font-medium transition ${
                              pg.pageNumber === currentPageNumber
                                ? 'bg-amber-500 text-stone-950 font-bold'
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                            }`}
                          >
                            S. {pg.pageNumber}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-100 group-hover:bg-amber-100 text-stone-700 group-hover:text-amber-900 transition">
                        Seite {ch.startPage}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>Gesamt: {allPages.length} Seiten</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium transition cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
