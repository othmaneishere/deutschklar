import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Compass, Sparkles, BookOpen } from 'lucide-react';
import { ChapterOverview, LanguageMode } from '../types';
import { courseUnits, getUnitForChapter, getUnitTitle } from '../data/courseUnits';

interface ChapterBarProps {
  chapters: ChapterOverview[];
  activeChapterNumber: number;
  onSelectChapter: (chapterNumber: number) => void;
  languageMode: LanguageMode;
  onOpenModuleGrid?: () => void;
}

export const ChapterBar: React.FC<ChapterBarProps> = ({
  chapters,
  activeChapterNumber,
  onSelectChapter,
  languageMode,
  onOpenModuleGrid,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  const currentUnit = getUnitForChapter(activeChapterNumber);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Center active chapter when chapter changes
  useEffect(() => {
    if (activeBtnRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const btn = activeBtnRef.current;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: btnLeft - containerWidth / 2 + btnWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeChapterNumber]);

  return (
    <div className="bg-white border-b border-slate-200/80 shadow-xs relative">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Tier 1: Course Units (Einheiten) Overview */}
        <div className="pt-2.5 pb-2 border-b border-slate-100 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0">
            {courseUnits.map((unit) => {
              const isUnitActive = unit.id === currentUnit.id;

              // Short labels
              const shortTitles: Record<number, string> = {
                1: '1. Grundlagen',
                2: '2. Alltag & Familie',
                3: '3. Praxis & Freizeit',
                4: '4. Beruf & Prüfung',
              };

              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => onSelectChapter(unit.chapterNumbers[0])}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap border ${
                    isUnitActive
                      ? `${unit.color.activeTab} border-transparent`
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200/70'
                  }`}
                  title={`${unit.titleDe} (Kapitel ${unit.chapterNumbers.join(', ')})`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isUnitActive ? 'bg-white' : unit.color.dotColor
                    }`}
                  />
                  <span>{shortTitles[unit.id] || unit.titleDe}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                      isUnitActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {unit.level}
                  </span>
                </button>
              );
            })}
          </div>

          {onOpenModuleGrid && (
            <button
              type="button"
              onClick={onOpenModuleGrid}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 border border-slate-200 transition shrink-0 cursor-pointer"
              title="Vollständigen A1-Lehrplan anzeigen"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Lehrplan-Übersicht</span>
              <span className="inline sm:hidden">Alle</span>
            </button>
          )}
        </div>

        {/* Tier 2: Chapters in the Active Unit (with quick access to all) */}
        <div className="py-2 flex items-center gap-2">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="hidden sm:flex p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0 cursor-pointer"
            aria-label="Nach links scrollen"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable Chapter Buttons */}
          <div
            ref={scrollRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 scroll-smooth flex-1"
          >
            {chapters.map((ch) => {
              const isActive = ch.number === activeChapterNumber;
              const chUnit = getUnitForChapter(ch.number);
              const isSameUnit = chUnit.id === currentUnit.id;

              // Clean short title
              let shortTitle = (ch.titleDe || '').replace(/Kapitel \d+\s*[–-]\s*/, '');
              if (languageMode === 'ar' && ch.titleAr) {
                shortTitle = ch.titleAr.replace(/الفصل \d+\s*[–-]\s*/, '');
              } else if (languageMode === 'en' && ch.titleEn) {
                shortTitle = ch.titleEn.replace(/Chapter \d+\s*[–-]\s*/, '');
              } else if (languageMode === 'fr' && ch.titleFr) {
                shortTitle = ch.titleFr.replace(/Chapitre \d+\s*[–-]\s*/, '');
              }

              const formattedNum = ch.number < 10 ? `0${ch.number}` : `${ch.number}`;

              return (
                <button
                  key={ch.number}
                  ref={isActive ? activeBtnRef : null}
                  type="button"
                  onClick={() => onSelectChapter(ch.number)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition cursor-pointer whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-md scale-[1.02]'
                      : isSameUnit
                      ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 font-medium hover:border-slate-400'
                      : 'bg-slate-50/80 hover:bg-white text-slate-500 hover:text-slate-800 border-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : `${chUnit.color.bgBadge}`
                    }`}
                  >
                    K{formattedNum}
                  </span>
                  <span
                    className={
                      languageMode === 'ar'
                        ? 'font-arabic text-xs font-semibold'
                        : 'text-xs'
                    }
                  >
                    {shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="hidden sm:flex p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0 cursor-pointer"
            aria-label="Nach rechts scrollen"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
