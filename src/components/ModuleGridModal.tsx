import React, { useState } from 'react';
import {
  X,
  LayoutGrid,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Search,
  Check,
  ChevronRight,
} from 'lucide-react';
import { ChapterOverview, CoursePage, LanguageMode } from '../types';
import { moduleScenes } from '../utils/moduleAssets';
import { getChapterIllustration } from '../utils/illustrationService';
import { courseUnits, CourseUnit } from '../data/courseUnits';
import { isPageCompleted } from '../utils/studyProgress';

interface ModuleGridModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: ChapterOverview[];
  allPages: CoursePage[];
  activeChapterNumber: number;
  languageMode: LanguageMode;
  onSelectChapter: (chapterNumber: number) => void;
  onSelectPage: (pageNumber: number) => void;
}

export const ModuleGridModal: React.FC<ModuleGridModalProps> = ({
  isOpen,
  onClose,
  chapters,
  allPages,
  activeChapterNumber,
  languageMode,
  onSelectChapter,
  onSelectPage,
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter units
  const displayedUnits = selectedUnitId === 'all'
    ? courseUnits
    : courseUnits.filter((u) => u.id === selectedUnitId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modules-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="bg-white text-slate-900 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modules-modal-title" className="text-xl font-extrabold tracking-tight flex items-center gap-2">
                <span>A1 Deutsch-Lehrplan & Kursaufbau</span>
                {languageMode === 'ar' && <span className="text-slate-300 font-arabic font-normal text-base">| المنهج التعليمي</span>}
                {languageMode === 'en' && <span className="text-slate-300 font-normal text-sm">| Curriculum</span>}
                {languageMode === 'fr' && <span className="text-slate-300 font-normal text-sm">| Programme de cours</span>}
              </h2>
              <p className="text-xs text-slate-300">
                15 Kapitel in 4 strukturierte Lerneinheiten gegliedert · Niveau A1.1 & A1.2 (GER)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Unit Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSelectedUnitId('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap border ${
                selectedUnitId === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Alle 4 Einheiten
            </button>
            {courseUnits.map((u) => {
              const isActive = selectedUnitId === u.id;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setSelectedUnitId(u.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? `${u.color.activeTab} border-transparent`
                      : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : u.color.dotColor}`} />
                  <span>Einheit {u.number}</span>
                  <span className={`text-[10px] px-1 rounded font-mono ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {u.level}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Thema oder Begriff suchen..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Content Body: Organized Units and Modules */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {displayedUnits.map((unit) => {
            // Find chapters for this unit
            const unitChapters = chapters.filter((ch) => {
              const matchesUnit = unit.chapterNumbers.includes(ch.number);
              if (!matchesUnit) return false;
              if (!searchQuery) return true;
              const q = searchQuery.toLowerCase();
              return (
                ch.titleDe.toLowerCase().includes(q) ||
                ch.topicsDe.toLowerCase().includes(q) ||
                ch.titleAr.toLowerCase().includes(q) ||
                ch.titleEn.toLowerCase().includes(q) ||
                ch.titleFr.toLowerCase().includes(q)
              );
            });

            if (unitChapters.length === 0 && searchQuery) return null;

            return (
              <div key={unit.id} className="space-y-3">
                {/* Unit Header Card */}
                <div className={`p-4 rounded-2xl border ${unit.color.bgBadge} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${unit.color.dotColor}`} />
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                        {languageMode === 'ar' ? unit.titleAr : languageMode === 'en' ? unit.titleEn : languageMode === 'fr' ? unit.titleFr : unit.titleDe}
                      </h3>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                        {unit.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {languageMode === 'ar' ? unit.descAr : languageMode === 'en' ? unit.descEn : languageMode === 'fr' ? unit.descFr : unit.descDe}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs font-semibold text-slate-600 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200/80">
                    {unit.chapterNumbers.length} Kapitel (K{unit.chapterNumbers[0]} - K{unit.chapterNumbers[unit.chapterNumbers.length - 1]})
                  </div>
                </div>

                {/* Chapter Cards inside this Unit */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {unitChapters.map((ch) => {
                    const isActive = ch.number === activeChapterNumber;
                    const chapterPages = allPages.filter((p) => p.chapterNumber === ch.number);
                    const isAllDone = chapterPages.every((p) => isPageCompleted(p.pageNumber));

                    let title = ch.titleDe;
                    if (languageMode === 'ar') title = ch.titleAr;
                    if (languageMode === 'en') title = ch.titleEn;
                    if (languageMode === 'fr') title = ch.titleFr;

                    let topics = ch.topicsDe;
                    if (languageMode === 'ar') topics = ch.topicsAr;
                    if (languageMode === 'en') topics = ch.topicsEn;
                    if (languageMode === 'fr') topics = ch.topicsFr;

                    const scene = moduleScenes[ch.number];
                    const customIll = getChapterIllustration(ch.number);

                    return (
                      <div
                        key={ch.number}
                        onClick={() => {
                          onSelectChapter(ch.number);
                          onClose();
                        }}
                        className={`group rounded-2xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative ${
                          isActive
                            ? 'bg-white ring-2 ring-indigo-500 border-indigo-400 shadow-md scale-[1.01]'
                            : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="h-28 w-full relative overflow-hidden bg-slate-100 flex items-center justify-center border-b border-slate-100">
                          {customIll && customIll.type === 'svg' ? (
                            <div
                              className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-cover"
                              dangerouslySetInnerHTML={{ __html: customIll.content }}
                            />
                          ) : customIll && customIll.type === 'raster' ? (
                            <img
                              src={customIll.content}
                              alt={`Modul ${ch.number}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : scene ? (
                            <img
                              src={scene.imageSrc}
                              alt={scene.alt}
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                const filename = scene.imageSrc.split('/').pop();
                                if (filename) {
                                  const fallbackPath = `/images/${filename}`;
                                  if (e.currentTarget.src !== fallbackPath && !e.currentTarget.src.endsWith(fallbackPath)) {
                                    e.currentTarget.src = fallbackPath;
                                  }
                                }
                              }}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : null}

                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                          {/* Chapter Badge */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                            <span className="text-[11px] font-mono font-bold text-white bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded-lg">
                              Kapitel {ch.number < 10 ? `0${ch.number}` : ch.number}
                            </span>
                          </div>

                          {/* Completed or Active tag */}
                          <div className="absolute top-2.5 right-2.5">
                            {isActive ? (
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-indigo-500 text-white shadow-xs">
                                Aktuell
                              </span>
                            ) : isAllDone ? (
                              <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500 text-white flex items-center gap-1 shadow-xs">
                                <Check className="w-3 h-3" /> Gelernt
                              </span>
                            ) : null}
                          </div>

                          {/* Title Overlay on Image Bottom */}
                          <div className="absolute bottom-2 left-3 right-3 text-left">
                            <h4 className="text-white text-sm font-extrabold truncate drop-shadow-sm">
                              {ch.titleDe}
                            </h4>
                          </div>
                        </div>

                        {/* Card Details */}
                        <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            {languageMode !== 'none' && (
                              <p
                                className={`text-xs text-slate-600 font-medium ${
                                  languageMode === 'ar' ? 'font-arabic text-slate-800' : ''
                                }`}
                                dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                              >
                                {title}
                              </p>
                            )}
                            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                              {topics}
                            </p>
                          </div>

                          {/* Footer with page links & start button */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                            <div className="flex items-center gap-1">
                              {chapterPages.map((page) => {
                                const done = isPageCompleted(page.pageNumber);
                                return (
                                  <button
                                    key={page.pageNumber}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onSelectPage(page.pageNumber);
                                      onClose();
                                    }}
                                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono transition cursor-pointer border ${
                                      done
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold'
                                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                    }`}
                                    title={`Zu Seite ${page.pageNumber}`}
                                  >
                                    S.{page.pageNumber}
                                  </button>
                                );
                              })}
                            </div>

                            <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
                              <span>Öffnen</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
