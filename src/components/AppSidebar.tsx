import React, { useState } from 'react';
import {
  FileText,
  ChevronDown,
  ChevronRight,
  Languages,
  PanelLeftClose,
  BookOpen,
  Volume2,
  BookMarked,
  Lock,
  Eye,
  EyeOff,
  Gauge,
  GraduationCap,
  Sparkles,
  Home,
} from 'lucide-react';
import { LanguageMode } from '../types';
import { courseUnits } from '../data/courseUnits';
import { chaptersOverview } from '../data/chaptersData';
import { a2CourseUnits } from '../data/a2CourseUnits';
import { a2ChaptersOverview } from '../data/a2ChaptersData';
import { getPlaybackSpeed, setPlaybackSpeed } from '../utils/speech';
import { moduleScenes } from '../utils/moduleAssets';
import { NavViewMode } from './DashboardNavbar';

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentChapterNumber: number;
  currentPageNumber: number;
  totalPages: number;
  onSelectChapter: (chapterNum: number) => void;
  languageMode: LanguageMode;
  onLanguageChange: (mode: LanguageMode) => void;
  onOpenCheatSheet: () => void;
  activeView: NavViewMode;
  onSelectView: (view: NavViewMode) => void;
  onOpenAudioSettings?: () => void;
  onOpenLevelComingSoon?: (level: 'A2' | 'B1') => void;
  showTranslations?: boolean;
  onToggleTranslations?: () => void;
  audioSpeed?: number;
  onSpeedChange?: (speed: number) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isOpen,
  onClose,
  currentChapterNumber,
  currentPageNumber,
  totalPages,
  onSelectChapter,
  languageMode,
  onLanguageChange,
  onOpenCheatSheet,
  activeView,
  onSelectView,
  onOpenAudioSettings,
  onOpenLevelComingSoon,
  showTranslations = true,
  onToggleTranslations,
  audioSpeed = 1.0,
  onSpeedChange,
}) => {
  const isA2 = activeView === 'course-a2';

  // Open units tracker
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({
    'unit-1': true,
    'a2-unit-1': true,
  });

  const toggleUnit = (unitId: string) => {
    setOpenUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  const activeChapters = isA2 ? a2ChaptersOverview : chaptersOverview;
  const activeUnits = isA2 ? a2CourseUnits : courseUnits;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Sheet */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-white border-r border-slate-200/90 shadow-xl flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs tracking-tighter">
              DK
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
                DeutscheKlar
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isA2 ? 'A2 Aufbaustufe' : 'A1 Grundstufe'}
              </p>
            </div>
          </div>

          {/* Hide Sidebar Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            title="Seitenleiste schließen"
            aria-label="Seitenleiste schließen"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Level Category Selector: A1 vs A2 vs B1 */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/60 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
            <span>Sprachniveau</span>
            <span className={isA2 ? 'text-purple-700 font-bold' : 'text-slate-900 font-bold'}>
              {isA2 ? 'A2 (30 Seiten)' : 'A1 (24 Seiten)'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-200/70 rounded-xl text-xs font-bold">
            {/* A1 Level */}
            <button
              type="button"
              onClick={() => {
                onSelectView('course');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`py-1.5 px-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                activeView === 'course'
                  ? 'bg-white text-slate-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>A1</span>
              {activeView === 'course' && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </button>

            {/* A2 Level */}
            <button
              type="button"
              onClick={() => {
                onSelectView('course-a2');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`py-1.5 px-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                activeView === 'course-a2'
                  ? 'bg-purple-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>A2</span>
              {activeView === 'course-a2' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              )}
            </button>

            {/* B1 Coming Soon */}
            <button
              type="button"
              onClick={() => onOpenLevelComingSoon && onOpenLevelComingSoon('B1')}
              className="py-1.5 px-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-700 hover:bg-white/60 transition flex items-center justify-center gap-1 cursor-pointer"
              title="B1 ist in Planung"
            >
              <span>B1</span>
              <Lock className="w-2.5 h-2.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Navigation Section Buttons */}
        <div className="p-3 border-b border-slate-100 bg-white space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1">
            Bereiche
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => {
                onSelectView('stories');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                activeView === 'stories'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>Geschichten</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectView('vocab');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                activeView === 'vocab'
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Wortschatz</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectView('grammar');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                activeView === 'grammar'
                  ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grammatik</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectView('landing');
                if (window.innerWidth < 1024) onClose();
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                activeView === 'landing'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Startseite</span>
            </button>
          </div>
        </div>

        {/* Course Units Accordion Navigation */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 scrollbar-thin">
          <div className="px-1 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {isA2 ? 'A2 Kapitel' : 'A1 Kapitel'}
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              {activeChapters.length} Kapitel
            </span>
          </div>

          {activeUnits.map((unit) => {
            const isExpanded = openUnits[unit.id] ?? false;
            const containsActiveChapter = unit.chapterNumbers.includes(currentChapterNumber);

            return (
              <div
                key={unit.id}
                className="rounded-2xl border border-slate-200/90 overflow-hidden bg-slate-50/50"
              >
                {/* Unit Header Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleUnit(unit.id)}
                  className={`w-full p-2.5 text-left flex items-center justify-between transition cursor-pointer ${
                    containsActiveChapter
                      ? 'bg-white font-bold border-b border-slate-200/80'
                      : 'hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${unit.color.dotColor}`} />
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {unit.titleDe}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 shrink-0">
                    <span className="text-[10px] font-mono">
                      {unit.chapterNumbers.length}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {/* Chapter List */}
                {isExpanded && (
                  <div className="p-1.5 space-y-1 bg-white">
                    {unit.chapterNumbers.map((chNum) => {
                      const chData = activeChapters.find((c) => c.number === chNum);
                      if (!chData) return null;
                      const isActive = chNum === currentChapterNumber;
                      const scene = !isA2 ? moduleScenes[chNum] : null;

                      return (
                        <button
                          key={chNum}
                          type="button"
                          onClick={() => {
                            onSelectChapter(chNum);
                            if (isA2 && activeView !== 'course-a2') onSelectView('course-a2');
                            if (!isA2 && activeView !== 'course') onSelectView('course');
                            if (window.innerWidth < 1024) onClose();
                          }}
                          className={`w-full px-2 py-1.5 rounded-xl text-left text-xs transition flex items-center justify-between gap-2 cursor-pointer ${
                            isActive && (activeView === 'course' || activeView === 'course-a2')
                              ? isA2
                                ? 'bg-purple-700 text-white font-bold shadow-2xs'
                                : 'bg-slate-900 text-white font-bold shadow-2xs'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 truncate">
                            {/* Chapter Thumbnail or Tag */}
                            {scene?.imageSrc ? (
                              <img
                                src={scene.imageSrc}
                                alt={`K${chNum}`}
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-200/80"
                              />
                            ) : (
                              <span
                                className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                                  isActive && (activeView === 'course' || activeView === 'course-a2')
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                K{chNum < 10 ? `0${chNum}` : chNum}
                              </span>
                            )}
                            <div className="truncate">
                              <span className="truncate block font-semibold leading-tight">
                                {(chData.titleDe || '').replace(/^Kapitel \d+ – /, '')}
                              </span>
                              <span
                                className={`text-[10px] font-mono block ${
                                  isActive && (activeView === 'course' || activeView === 'course-a2')
                                    ? 'text-slate-200'
                                    : 'text-slate-400'
                                }`}
                              >
                                K{chNum < 10 ? `0${chNum}` : chNum} · S. {chData.startPage}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SETTINGS TOOLBAR DOCK (Icon-only per user request: no text, just icons as buttons) */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-1.5">
          {/* 1. Language Toggle Icon Button */}
          {(() => {
            const nextLang: Record<LanguageMode, LanguageMode> = {
              none: 'ar',
              ar: 'en',
              en: 'fr',
              fr: 'none',
            };
            return (
              <button
                type="button"
                onClick={() => onLanguageChange(nextLang[languageMode] || 'none')}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs transition cursor-pointer"
                title={`Sprache: ${languageMode.toUpperCase()} (Klick zum Wechseln)`}
                aria-label="Sprache wechseln"
              >
                <Languages className="w-4 h-4 text-slate-700" />
              </button>
            );
          })()}

          {/* 2. Translations Toggle Icon Button */}
          {onToggleTranslations && (
            <button
              type="button"
              onClick={onToggleTranslations}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition cursor-pointer shadow-2xs ${
                showTranslations
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title={showTranslations ? 'Übersetzungen ausblenden' : 'Übersetzungen einblenden'}
              aria-label="Übersetzungen umschalten"
            >
              {showTranslations ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          )}

          {/* 3. Playback Speed Cycle Icon Button */}
          <button
            type="button"
            onClick={() => {
              const speeds = [0.8, 0.9, 1.0];
              const currentIndex = speeds.findIndex((s) => Math.abs(s - audioSpeed) < 0.05);
              const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
              setPlaybackSpeed(nextSpeed);
              if (onSpeedChange) onSpeedChange(nextSpeed);
            }}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs transition cursor-pointer"
            title={`Tempo: ${audioSpeed.toFixed(1)}x (Klick zum Umschalten)`}
            aria-label="Sprechtempo anpassen"
          >
            <Gauge className="w-4 h-4 text-slate-700" />
          </button>

          {/* 4. Audio / Voice Settings Modal Trigger Icon Button */}
          {onOpenAudioSettings && (
            <button
              type="button"
              onClick={onOpenAudioSettings}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs transition cursor-pointer"
              title="Stimme & Audioeinstellungen"
              aria-label="Stimme & Audioeinstellungen"
            >
              <Volume2 className="w-4 h-4 text-slate-700" />
            </button>
          )}

          {/* 5. Grammar Cheat Sheet Modal Trigger Icon Button */}
          <button
            type="button"
            onClick={onOpenCheatSheet}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs transition cursor-pointer"
            title="A1/A2 Grammatik-Übersicht"
            aria-label="Grammatik-Übersicht öffnen"
          >
            <FileText className="w-4 h-4 text-slate-700" />
          </button>
        </div>
      </aside>
    </>
  );
};
