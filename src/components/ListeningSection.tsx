import React, { useState } from 'react';
import { Headphones, Volume2, Eye, EyeOff, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { ContentSection, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';

interface ListeningSectionProps {
  section: ContentSection;
  languageMode: LanguageMode;
}

export const ListeningSection: React.FC<ListeningSectionProps> = ({
  section,
  languageMode,
}) => {
  const listeningData = section.listeningActivity;
  const [showScript, setShowScript] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [checkedAnswers, setCheckedAnswers] = useState(false);

  if (!listeningData) return null;

  const situationText =
    languageMode === 'ar'
      ? listeningData.situationAr || listeningData.situationDe
      : languageMode === 'en'
      ? listeningData.situationEn || listeningData.situationDe
      : languageMode === 'fr'
      ? listeningData.situationFr || listeningData.situationDe
      : listeningData.situationDe;

  const handleSelectOption = (qId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCheckedAnswers(false);
  };

  const questions = listeningData.questions || [];

  return (
    <div className="rounded-2xl border border-indigo-200 bg-white p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-indigo-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Headphones className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-indigo-100/70 text-indigo-800">
              Hörverstehen A2
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {section.titleDe}
          </h3>
          {situationText && (
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              <span className="text-indigo-600 font-bold">Situation: </span>
              {situationText}
            </p>
          )}
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowScript((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition cursor-pointer"
          >
            {showScript ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Transkript verbergen</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Transkript lesen</span>
              </>
            )}
          </button>

          <AudioButton
            text={listeningData.audioScriptDe}
            size="md"
            label="Audio abspielen"
            className="border border-indigo-300 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-1.5 shadow-2xs"
          />
        </div>
      </div>

      {/* Audio Prompt Card */}
      <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-indigo-900">
            🎧 Hören Sie den Audio-Ausschnitt aufmerksam an.
          </div>
          <p className="text-xs text-indigo-700">
            Tipp: Hören Sie den Text 1–2 Mal an, bevor Sie das Transkript öffnen oder die Fragen beantworten.
          </p>
        </div>
      </div>

      {/* Hidden/Revealed Transcript */}
      {showScript && (
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Hörtext-Transkript</span>
            <AudioButton text={listeningData.audioScriptDe} size="sm" />
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-serif whitespace-pre-line">
            {listeningData.audioScriptDe}
          </p>
        </div>
      )}

      {/* Listening Comprehension Quiz */}
      {questions.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Fragen zum Gehörten</span>
            </h4>
            {checkedAnswers && (
              <button
                type="button"
                onClick={handleResetQuiz}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Zurücksetzen</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const selectedIdx = selectedAnswers[q.id];
              const isSelected = selectedIdx !== undefined;

              return (
                <div
                  key={q.id || idx}
                  className="p-4 rounded-xl border border-slate-200/90 bg-white space-y-3"
                >
                  <p className="font-semibold text-slate-900 text-sm">
                    <span className="text-indigo-600 mr-1.5">{idx + 1}.</span>
                    {q.questionDe}
                  </p>

                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      let optionClasses =
                        'border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700';

                      if (checkedAnswers) {
                        if (optIdx === q.correctIndex) {
                          optionClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                        } else if (isOptionSelected) {
                          optionClasses = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                        }
                      } else if (isOptionSelected) {
                        optionClasses = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-medium ring-1 ring-indigo-600';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={checkedAnswers}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-2.5 rounded-lg border text-left text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {checkedAnswers && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                          )}
                          {checkedAnswers && isOptionSelected && optIdx !== q.correctIndex && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {checkedAnswers && q.explanationDe && (
                    <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 text-xs leading-relaxed">
                      <span className="font-bold text-slate-900">Erklärung: </span>
                      {q.explanationDe}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!checkedAnswers && questions.length > 0 && (
            <button
              type="button"
              onClick={() => setCheckedAnswers(true)}
              disabled={Object.keys(selectedAnswers).length === 0}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-2xs cursor-pointer ${
                Object.keys(selectedAnswers).length > 0
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Antworten prüfen
            </button>
          )}
        </div>
      )}
    </div>
  );
};
