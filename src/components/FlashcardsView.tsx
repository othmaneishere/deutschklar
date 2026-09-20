import React, { useState } from 'react';
import { Volume2, RotateCw, ChevronLeft, ChevronRight, Check, Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { VocabularyItem, LanguageMode } from '../types';
import { speakGerman } from '../utils/speech';

interface FlashcardsViewProps {
  vocabItems: VocabularyItem[];
  languageMode: LanguageMode;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  vocabItems,
  languageMode,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownWords, setKnownWords] = useState<Set<number>>(new Set());

  if (!vocabItems || vocabItems.length === 0) return null;

  const currentItem = vocabItems[currentIndex];
  const isKnown = knownWords.has(currentIndex);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % vocabItems.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + vocabItems.length) % vocabItems.length);
  };

  const toggleKnown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setKnownWords((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakGerman(currentItem.de);
  };

  const translation =
    languageMode === 'ar'
      ? currentItem.ar
      : languageMode === 'en'
      ? currentItem.en
      : languageMode === 'fr'
      ? currentItem.fr
      : currentItem.noteDe || 'Nur Deutsch';

  const progressPercent = Math.round(((currentIndex + 1) / vocabItems.length) * 100);

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Progress Top Bar */}
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="font-bold text-slate-700">
          Karte {currentIndex + 1} von {vocabItems.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {knownWords.size} gemeistert
          </span>
          <span className="font-mono text-xs text-slate-400 font-bold">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Progress bar line */}
      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Modern Interactive Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[260px] p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between items-center text-center relative select-none group"
      >
        {/* Top Badges */}
        <div className="w-full flex items-center justify-between">
          <div>
            {currentItem.gender ? (
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                  currentItem.gender === 'der'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : currentItem.gender === 'die'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {currentItem.gender === 'der' ? 'm. · der' : currentItem.gender === 'die' ? 'f. · die' : 'n. · das'}
              </span>
            ) : (
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                Redemittel
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeak}
              className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition cursor-pointer"
              title="Aussprache anhören"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={toggleKnown}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isKnown
                  ? 'text-emerald-600 bg-emerald-50 border border-emerald-200'
                  : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'
              }`}
              title={isKnown ? 'Als gemeistert markiert' : 'Als gelernt abhaken'}
            >
              <CheckCircle2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Card Content */}
        <div className="my-auto py-4 space-y-3">
          <span className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
            {isFlipped ? 'Übersetzung / Bedeutung' : 'Deutscher Begriff'}
          </span>

          {isFlipped ? (
            <div className="space-y-2 animate-in fade-in duration-200">
              <h3
                className={`text-2xl sm:text-3xl font-extrabold text-indigo-700 tracking-tight ${
                  languageMode === 'ar' ? 'font-arabic text-3xl font-bold' : ''
                }`}
                dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
              >
                {translation}
              </h3>
              {currentItem.noteDe && (
                <p className="text-xs text-slate-500 font-medium">
                  {currentItem.noteDe}
                </p>
              )}
            </div>
          ) : (
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentItem.de}
            </h3>
          )}

          <p className="text-xs text-slate-400 group-hover:text-indigo-600 transition-colors flex items-center justify-center gap-1">
            <RotateCw className="w-3 h-3" />
            <span>Tippen zum Umdrehen</span>
          </p>
        </div>

        {/* Bottom Hint */}
        <div className="w-full flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
          <span>{currentItem.noteDe || 'A1 Grundwortschatz'}</span>
          <span className="font-mono">Taste Leertaste</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer shadow-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Zurück</span>
        </button>

        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition cursor-pointer shadow-xs"
        >
          <RotateCw className="w-4 h-4" />
          <span>{isFlipped ? 'Vorderseite' : 'Aufdecken'}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
        >
          <span>Weiter</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
