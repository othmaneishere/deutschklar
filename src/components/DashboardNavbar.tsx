import React from 'react';
import {
  PanelLeftClose,
  PanelLeftOpen,
  BookOpen,
  BookMarked,
  Home,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { CoursePage, LanguageMode } from '../types';
import { getUnitForChapter, getUnitTitle } from '../data/courseUnits';
import { chaptersOverview } from '../data/chaptersData';
import { a2ChaptersOverview } from '../data/a2ChaptersData';

export type NavViewMode = 'landing' | 'course' | 'course-a2' | 'stories' | 'vocab' | 'grammar';

interface DashboardNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  currentPage: CoursePage;
  totalPages: number;
  languageMode: LanguageMode;
  activeView: NavViewMode;
  onSelectView: (view: NavViewMode) => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  currentPage,
  totalPages,
  languageMode,
  activeView,
  onSelectView,
}) => {
  const isA2 = activeView === 'course-a2';
  const currentUnit = !isA2 ? getUnitForChapter(currentPage.chapterNumber) : null;
  const chapterInfo = isA2
    ? a2ChaptersOverview.find((c) => c.number === currentPage.chapterNumber)
    : chaptersOverview.find((c) => c.number === currentPage.chapterNumber);

  return (
    <header
      id="dashboard-navbar"
      className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-2xs"
    >
      {/* Left: Sidebar Toggle & Contextual Course Indicator */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold transition cursor-pointer shadow-2xs shrink-0"
          title={isSidebarOpen ? 'Seitenleiste schließen' : 'Menü & Einstellungen'}
          aria-label={isSidebarOpen ? 'Seitenleiste schließen' : 'Menü & Einstellungen'}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-4 h-4 text-slate-700" />
          ) : (
            <PanelLeftOpen className="w-4 h-4 text-slate-700" />
          )}
          <span className="hidden sm:inline">
            {isSidebarOpen ? 'Schließen' : 'Menü'}
          </span>
        </button>

        {/* Level Category Pills */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onSelectView('course')}
            className={`text-xs font-extrabold px-2.5 py-1 rounded-lg transition cursor-pointer shadow-2xs ${
              activeView === 'course'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            A1
          </button>
          <button
            type="button"
            onClick={() => onSelectView('course-a2')}
            className={`text-xs font-extrabold px-2.5 py-1 rounded-lg transition cursor-pointer shadow-2xs ${
              activeView === 'course-a2'
                ? 'bg-purple-700 text-white'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200'
            }`}
          >
            A2
          </button>
        </div>

        <span className="text-slate-300 hidden md:inline">/</span>

        {/* Dynamic Context Header */}
        {activeView === 'course' || activeView === 'course-a2' ? (
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            {currentUnit && (
              <span
                className={`hidden lg:inline-flex text-xs font-bold px-2 py-0.5 rounded-md border ${currentUnit.color.bgBadge}`}
              >
                {currentUnit.level} · {getUnitTitle(currentUnit, languageMode).split(':')[0]}
              </span>
            )}
            <div className="min-w-0 flex items-center gap-1.5">
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {chapterInfo?.titleDe
                  ? chapterInfo.titleDe.replace(/^Kapitel \d+ – /, '')
                  : currentPage?.chapterTitleDe
                  ? currentPage.chapterTitleDe.replace(/^Kapitel \d+ – /, '')
                  : currentPage?.pageTitleDe || ''}
              </h2>
              <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                S. {currentPage.pageNumber} / {totalPages}
              </span>
            </div>
          </div>
        ) : activeView === 'stories' ? (
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate flex items-center gap-1.5">
              <span>Hörgeschichten</span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold border border-amber-200">
                Audio Lesestücke
              </span>
            </h2>
          </div>
        ) : activeView === 'vocab' ? (
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate flex items-center gap-1.5">
              <span>Wortschatz-Bibliothek</span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                Themen & Bildtafeln
              </span>
            </h2>
          </div>
        ) : activeView === 'grammar' ? (
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate flex items-center gap-1.5">
              <span>Grammatikkurs</span>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold border border-blue-200">
                Strukturierter Lehrgang
              </span>
            </h2>
          </div>
        ) : null}
      </div>

      {/* Right: Primary Navigation Links */}
      <div className="flex items-center gap-1.5 shrink-0">
        <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => onSelectView('landing')}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              activeView === 'landing' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Startseite / Accueil"
          >
            <Home className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onSelectView('course')}
            className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeView === 'course' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="A1 Kurs (24 Seiten)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">A1</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('course-a2')}
            className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeView === 'course-a2' ? 'bg-purple-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="A2 Kurs (30 Seiten)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">A2</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('stories')}
            className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeView === 'stories' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Hörgeschichten"
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Geschichten</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('vocab')}
            className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeView === 'vocab' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Wortschatz"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Wortschatz</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('grammar')}
            className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1 ${
              activeView === 'grammar' ? 'bg-blue-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Grammatik"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Grammatik</span>
          </button>
        </div>
      </div>
    </header>
  );
};

