import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, ChevronDown, ChevronUp, CheckCircle, MessageCircle } from 'lucide-react';
import { ContentSection, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';

interface SpeakingSectionProps {
  section: ContentSection;
  languageMode: LanguageMode;
}

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({
  section,
  languageMode,
}) => {
  const speakingData = section.speakingTask;
  const [revealedScenarios, setRevealedScenarios] = useState<{ [index: number]: boolean }>({});

  if (!speakingData) return null;

  const promptText =
    languageMode === 'ar'
      ? speakingData.promptAr || speakingData.promptDe
      : languageMode === 'en'
      ? speakingData.promptEn || speakingData.promptDe
      : languageMode === 'fr'
      ? speakingData.promptFr || speakingData.promptDe
      : speakingData.promptDe;

  const toggleScenario = (index: number) => {
    setRevealedScenarios((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-emerald-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Mic className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800">
              Mündlicher Ausdruck A2
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {section.titleDe}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {promptText}
          </p>
        </div>
      </div>

      {/* Useful Redemittel (Conversational Connectors / Sentence Frames) */}
      {speakingData.usefulPhrases && speakingData.usefulPhrases.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nützliche Redemittel (Sprechbausteine)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {speakingData.usefulPhrases.map((phrase, idx) => {
              const phraseTranslation =
                languageMode === 'ar'
                  ? phrase.phraseAr
                  : languageMode === 'en'
                  ? phrase.phraseEn
                  : languageMode === 'fr'
                  ? phrase.phraseFr
                  : null;

              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-50/80 transition flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs sm:text-sm font-semibold text-emerald-950 truncate">
                      {phrase.phraseDe}
                    </p>
                    {phraseTranslation && (
                      <p className="text-[11px] text-emerald-700 truncate">
                        {phraseTranslation}
                      </p>
                    )}
                  </div>
                  <AudioButton text={phrase.phraseDe} size="sm" className="shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Roleplay / Practice Scenarios */}
      {speakingData.scenarios && speakingData.scenarios.length > 0 && (
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sprechsimulation & Antwortbeispiele</span>
          </h4>

          <div className="space-y-3">
            {speakingData.scenarios.map((sc, idx) => {
              const isRevealed = revealedScenarios[idx] ?? false;

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-white"
                >
                  <div className="p-4 bg-slate-50/70 border-b border-slate-200/80 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">
                        {sc.roleDe}
                      </span>
                      <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        <span>„{sc.starterDe}“</span>
                        <AudioButton text={sc.starterDe} size="sm" />
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleScenario(idx)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>{isRevealed ? 'Antworten verbergen' : 'Musterantworten'}</span>
                      {isRevealed ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {isRevealed && (
                    <div className="p-4 space-y-2 bg-emerald-50/20">
                      <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                        Mögliche A2-Antworten:
                      </div>
                      <ul className="space-y-2">
                        {sc.suggestedResponsesDe.map((resp, rIdx) => (
                          <li
                            key={rIdx}
                            className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-white border border-emerald-100 text-xs sm:text-sm text-slate-800"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{resp}</span>
                            </div>
                            <AudioButton text={resp} size="sm" className="shrink-0" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
