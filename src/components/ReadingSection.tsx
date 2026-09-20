import React, { useState } from 'react';
import { BookOpen, Volume2, Eye, EyeOff, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { ContentSection, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';

interface ReadingSectionProps {
  section: ContentSection;
  languageMode: LanguageMode;
  showTranslations: boolean;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  section,
  languageMode,
  showTranslations: globalShowTranslations,
}) => {
  const readingData = section.readingText;
  const [localShowTranslation, setLocalShowTranslation] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [checkedAnswers, setCheckedAnswers] = useState(false);

  if (!readingData) return null;

  const translation =
    languageMode === 'ar'
      ? readingData.textAr
      : languageMode === 'en'
      ? readingData.textEn
      : languageMode === 'fr'
      ? readingData.textFr
      : null;

  const contextText =
    languageMode === 'ar'
      ? readingData.contextAr || readingData.contextDe
      : languageMode === 'en'
      ? readingData.contextEn || readingData.contextDe
      : languageMode === 'fr'
      ? readingData.contextFr || readingData.contextDe
      : readingData.contextDe;

  const handleSelectOption = (qId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCheckedAnswers(false);
  };

  const questions = readingData.comprehensionQuestions || [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-100/60 text-blue-800">
              Leseverstehen A2
            </span>
            {contextText && (
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                • {contextText}
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {readingData.titleDe}
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {translation && (
            <button
              type="button"
              onClick={() => setLocalShowTranslation((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              {localShowTranslation ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  <span>Übersetzung ausblenden</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>Übersetzung anzeigen</span>
                </>
              )}
            </button>
          )}

          <AudioButton
            text={readingData.textDe}
            size="md"
            label="Gesamten Text anhören"
            className="border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold text-xs px-3 py-1.5"
          />
        </div>
      </div>

      {/* Reading Text Container */}
      <div className="rounded-xl bg-slate-50/70 border border-slate-200/80 p-5 sm:p-6 text-slate-800 leading-relaxed font-serif text-[16px] sm:text-[17px] space-y-4">
        {readingData.textDe.split('\n\n').map((paragraph, idx) => (
          <div key={idx} className="flex items-start gap-3 group">
            <p className="flex-1 whitespace-pre-line text-slate-800">{paragraph}</p>
            <AudioButton
              text={paragraph}
              size="sm"
              className="opacity-40 group-hover:opacity-100 transition shrink-0 mt-1"
              title="Absatz anhören"
            />
          </div>
        ))}
      </div>

      {/* Optional Side-by-Side or Below Translation */}
      {localShowTranslation && translation && (
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950 text-sm leading-relaxed whitespace-pre-line">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
            Übersetzung:
          </div>
          {translation}
        </div>
      )}

      {/* Comprehension Questions (Leseverstehen-Prüfung) */}
      {questions.length > 0 && (
        <div className="pt-4 border-t border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Verständnisfragen zum Text</span>
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
              const isCorrect = isSelected && selectedIdx === q.correctIndex;

              return (
                <div
                  key={q.id || idx}
                  className="p-4 rounded-xl border border-slate-200/90 bg-white space-y-3"
                >
                  <p className="font-semibold text-slate-900 text-sm">
                    <span className="text-blue-600 mr-1.5">{idx + 1}.</span>
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
                        optionClasses = 'border-blue-600 bg-blue-50/70 text-blue-950 font-medium ring-1 ring-blue-600';
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
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
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
