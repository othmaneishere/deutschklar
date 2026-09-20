import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Eye, EyeOff, Bookmark, Gauge, FileText, Sparkles } from 'lucide-react';
import { LanguageMode } from '../types';
import { getFavorites, subscribeFavorites } from '../utils/studyProgress';
import { getPlaybackSpeed, setPlaybackSpeed, subscribeSpeechState } from '../utils/speech';

interface AppHeaderProps {
  languageMode: LanguageMode;
  onLanguageChange: (mode: LanguageMode) => void;
  onOpenModuleGrid: () => void;
  onOpenSearch: () => void;
  showTranslations: boolean;
  onToggleTranslations: () => void;
  onOpenFavorites: () => void;
  onOpenCheatSheet: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  languageMode,
  onLanguageChange,
  onOpenModuleGrid,
  onOpenSearch,
  showTranslations,
  onToggleTranslations,
  onOpenFavorites,
  onOpenCheatSheet,
}) => {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [speed, setSpeed] = useState(1.0);

  useEffect(() => {
    const updateStats = () => {
      setFavoriteCount(getFavorites().length);
      setSpeed(getPlaybackSpeed());
    };
    updateStats();

    const unsubFav = subscribeFavorites(updateStats);
    const unsubSpeech = subscribeSpeechState((s) => setSpeed(s.speed));

    return () => {
      unsubFav();
      unsubSpeech();
    };
  }, []);

  const handleToggleSpeed = () => {
    const next = speed === 1.0 ? 0.8 : 1.0;
    setPlaybackSpeed(next);
    setSpeed(next);
  };

  const languageOptions: { id: LanguageMode; label: string; shortLabel: string; flag: string }[] = [
    { id: 'none', label: 'Deutsch', shortLabel: 'DE', flag: '🇩🇪' },
    { id: 'ar', label: 'العربية', shortLabel: 'عر', flag: '🇸🇦' },
    { id: 'en', label: 'English', shortLabel: 'EN', flag: '🇬🇧' },
    { id: 'fr', label: 'Français', shortLabel: 'FR', flag: '🇫🇷' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-2xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand / Logo with German Flag Accent */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onOpenModuleGrid}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-xs flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white font-extrabold text-sm tracking-tighter">
                DE
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-none">
                  Deutsch
                </span>
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-md tracking-wider uppercase">
                  A1 Kurs
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 leading-tight">
                Vollständiger Lehrgang
              </span>
            </div>
          </div>

          {/* Quick Syllabus Button */}
          <button
            type="button"
            onClick={onOpenModuleGrid}
            className="hidden md:flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 transition cursor-pointer border border-slate-200/80"
            title="Inhaltsverzeichnis & Kurslehrplan"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Kursübersicht</span>
          </button>
        </div>

        {/* Center/Right: Language Mode Selector + Tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Selector Pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            {languageOptions.map((lang) => {
              const isActive = languageMode === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => onLanguageChange(lang.id)}
                  className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                  title={`Übersetzungen: ${lang.label}`}
                >
                  <span className="text-xs">{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Grammar & CheatSheet */}
          <button
            type="button"
            onClick={onOpenCheatSheet}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-700 bg-slate-50 hover:bg-indigo-50 border border-slate-200 transition cursor-pointer"
            title="Grammatik-Übersicht & Spickzettel"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Grammatik</span>
          </button>

          {/* Bookmarks / Favorites */}
          <button
            type="button"
            onClick={onOpenFavorites}
            className="relative flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-amber-700 bg-slate-50 hover:bg-amber-50 border border-slate-200 transition cursor-pointer"
            title="Gespeicherte Vokabeln & Redemittel"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden lg:inline">Merkliste</span>
            {favoriteCount > 0 && (
              <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded-full shadow-2xs">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={handleToggleSpeed}
            className={`hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              speed < 1.0
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
            }`}
            title={`Sprachtempo umschalten (aktuell: ${speed}x)`}
          >
            <Gauge className="w-3.5 h-3.5 text-slate-500" />
            <span>{speed}x</span>
          </button>

          {/* Study Mask (Hide/Show Translations) */}
          {languageMode !== 'none' && (
            <button
              type="button"
              onClick={onToggleTranslations}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                showTranslations
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
              }`}
              title={showTranslations ? 'Übersetzungen verbergen (Selbsttest)' : 'Übersetzungen einblenden'}
            >
              {showTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{showTranslations ? 'Test' : 'Lösung'}</span>
            </button>
          )}

          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold transition cursor-pointer"
            title="Im Lehrwerk suchen (Taste /)"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <kbd className="hidden lg:inline text-[10px] text-slate-400 font-mono bg-slate-100 px-1 py-0.2 rounded border border-slate-200">/</kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
