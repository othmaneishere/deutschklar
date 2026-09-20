import React from 'react';
import { BookOpen, Search, Languages, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { LanguageMode } from '../types';

interface NavbarProps {
  languageMode: LanguageMode;
  onLanguageChange: (mode: LanguageMode) => void;
  currentPageNumber: number;
  totalPages: number;
  onOpenInhalt: () => void;
  onOpenSearch: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  fontSize: 'normal' | 'large';
  onToggleFontSize: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  languageMode,
  onLanguageChange,
  currentPageNumber,
  totalPages,
  onOpenInhalt,
  onOpenSearch,
  onPrevPage,
  onNextPage,
  fontSize,
  onToggleFontSize,
}) => {
  const languageOptions: { id: LanguageMode; label: string; flag: string; sub?: string }[] = [
    { id: 'none', label: 'Nur Deutsch', flag: '🇩🇪', sub: 'Ohne Übersetzung' },
    { id: 'ar', label: 'العربية', flag: '🇸🇦', sub: 'Arabic' },
    { id: 'en', label: 'English', flag: '🇬🇧', sub: 'English' },
    { id: 'fr', label: 'Français', flag: '🇫🇷', sub: 'French' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 shadow-sm transition-colors">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: App Branding & Table of Contents */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenInhalt}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 font-medium text-xs sm:text-sm border border-stone-700 transition cursor-pointer"
            title="Inhaltsverzeichnis öffnen (Table of Contents)"
          >
            <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Inhalt | المحتويات</span>
            <span className="sm:hidden">Inhalt</span>
          </button>

          <div className="hidden md:flex items-center gap-2 border-l border-stone-800 pl-3">
            <span className="font-bold tracking-tight text-white text-sm">Deutsch Lernen</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              A1
            </span>
          </div>
        </div>

        {/* Center: Language Mode Selector */}
        <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 overflow-x-auto max-w-[260px] sm:max-w-none scrollbar-none">
          {languageOptions.map((opt) => {
            const isActive = languageMode === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onLanguageChange(opt.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
                }`}
                title={opt.label}
              >
                <span>{opt.flag}</span>
                <span className={opt.id === 'ar' ? 'font-arabic text-xs' : ''}>{opt.label}</span>
                {isActive && <Check className="w-3 h-3 ml-0.5 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>

        {/* Right: Quick Tools & Page Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 border border-transparent hover:border-stone-700 transition cursor-pointer"
            title="Suchen (Wortschatz / Themen durchsuchen)"
            aria-label="Search content"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Font Size Toggle */}
          <button
            onClick={onToggleFontSize}
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800 hover:border-stone-700 transition cursor-pointer"
            title={fontSize === 'normal' ? 'Schriftgröße vergrößern' : 'Standard-Schriftgröße'}
          >
            {fontSize === 'normal' ? 'A+' : 'A'}
          </button>

          {/* Page controls */}
          <div className="flex items-center gap-1 bg-stone-800/80 px-1 py-1 rounded-lg border border-stone-700/80 text-xs">
            <button
              onClick={onPrevPage}
              disabled={currentPageNumber <= 1}
              className="p-1 rounded text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-700 cursor-pointer"
              title="Vorherige Seite"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[11px] text-stone-200">
              {currentPageNumber}/{totalPages}
            </span>
            <button
              onClick={onNextPage}
              disabled={currentPageNumber >= totalPages}
              className="p-1 rounded text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-700 cursor-pointer"
              title="Nächste Seite"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
