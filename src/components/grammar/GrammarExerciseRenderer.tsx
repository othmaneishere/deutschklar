import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { GrammarExercise } from '../../types/grammarCourseTypes';
import { speakGerman } from '../../utils/speech';

interface GrammarExerciseRendererProps {
  exercise: GrammarExercise;
}

export const GrammarExerciseRenderer: React.FC<GrammarExerciseRendererProps> = ({ exercise }) => {
  // Multiple Choice State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Fill in State
  const [fillAnswer, setFillAnswer] = useState<string>('');

  // Reorder State
  const [reorderedWords, setReorderedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    exercise.wordsShuffled ? [...exercise.wordsShuffled] : []
  );

  // General evaluation State
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Multiple Choice evaluation
  const handleSelectOption = (index: number) => {
    if (isEvaluated) return;
    setSelectedOption(index);
    setIsEvaluated(true);
    setIsCorrect(index === exercise.correctIndex);
  };

  // Fill In evaluation
  const handleCheckFillIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fillAnswer.trim() || isEvaluated) return;
    const cleanUser = fillAnswer.trim().toLowerCase();
    const cleanExpected = (exercise.correctAnswer || '').trim().toLowerCase();
    setIsEvaluated(true);
    setIsCorrect(cleanUser === cleanExpected);
  };

  // Reorder evaluation
  const handleAddWord = (word: string, index: number) => {
    if (isEvaluated) return;
    setReorderedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (isEvaluated) return;
    setReorderedWords((prev) => prev.filter((_, i) => i !== index));
    setAvailableWords((prev) => [...prev, word]);
  };

  const handleCheckReorder = () => {
    if (isEvaluated || reorderedWords.length === 0) return;
    const userSentence = reorderedWords.join(' ').trim().toLowerCase().replace(/[.,!?]/g, '');
    const expectedSentence = (exercise.correctOrderSentence || '')
      .trim()
      .toLowerCase()
      .replace(/[.,!?]/g, '');
    setIsEvaluated(true);
    setIsCorrect(userSentence === expectedSentence);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setFillAnswer('');
    setIsEvaluated(false);
    setIsCorrect(false);
    if (exercise.wordsShuffled) {
      setAvailableWords([...exercise.wordsShuffled]);
      setReorderedWords([]);
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
      {/* Prompt */}
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
            {exercise.type === 'multiple_choice'
              ? 'Multiple Choice'
              : exercise.type === 'fill_in'
              ? 'Lückentext'
              : 'Satzbau'}
          </span>
          {isEvaluated && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Neu versuchen</span>
            </button>
          )}
        </div>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {exercise.promptDe}
        </h4>
        {exercise.promptEn && (
          <p className="text-xs text-slate-500 italic">{exercise.promptEn}</p>
        )}
      </div>

      {/* Multiple Choice Layout */}
      {exercise.type === 'multiple_choice' && exercise.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {exercise.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isAnswerKey = idx === exercise.correctIndex;
            let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

            if (isEvaluated) {
              if (isAnswerKey) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
              } else {
                btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isEvaluated}
                className={`p-3 rounded-xl border text-left text-sm font-medium transition cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
              >
                <span>{opt}</span>
                {isEvaluated && isAnswerKey && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                {isEvaluated && isSelected && !isCorrect && (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Fill In Layout */}
      {exercise.type === 'fill_in' && (
        <form onSubmit={handleCheckFillIn} className="space-y-3 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center flex-wrap gap-2 text-sm sm:text-base text-slate-800">
            {exercise.beforeGap && <span>{exercise.beforeGap}</span>}
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              disabled={isEvaluated}
              placeholder="Antwort eingeben..."
              className={`px-3 py-1 text-sm font-bold rounded-lg border focus:outline-none focus:ring-2 ${
                isEvaluated
                  ? isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                    : 'bg-rose-50 border-rose-400 text-rose-900'
                  : 'bg-white border-slate-300 focus:ring-slate-900'
              }`}
            />
            {exercise.afterGap && <span>{exercise.afterGap}</span>}
          </div>

          {!isEvaluated && (
            <button
              type="submit"
              disabled={!fillAnswer.trim()}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-50 transition cursor-pointer"
            >
              Antwort prüfen
            </button>
          )}
        </form>
      )}

      {/* Sentence Reordering Layout */}
      {exercise.type === 'reorder' && (
        <div className="space-y-3 pt-1">
          {/* Target Box */}
          <div className="min-h-[50px] p-3 rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 flex items-center flex-wrap gap-2">
            {reorderedWords.length === 0 ? (
              <span className="text-xs text-slate-400 italic">
                Klicken Sie auf die Wörter unten, um den Satz zu bauen...
              </span>
            ) : (
              reorderedWords.map((word, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleRemoveWord(word, idx)}
                  disabled={isEvaluated}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-2xs hover:bg-rose-50 hover:border-rose-300 transition cursor-pointer"
                >
                  {word}
                </button>
              ))
            )}
          </div>

          {/* Word Pool */}
          {availableWords.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              {availableWords.map((word, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddWord(word, idx)}
                  disabled={isEvaluated}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer"
                >
                  {word}
                </button>
              ))}
            </div>
          )}

          {!isEvaluated && reorderedWords.length > 0 && (
            <button
              type="button"
              onClick={handleCheckReorder}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
            >
              Reihenfolge prüfen
            </button>
          )}
        </div>
      )}

      {/* Feedback Alert */}
      {isEvaluated && (
        <div
          className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
            isCorrect
              ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/90 border-rose-200 text-rose-950'
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <div className="font-bold">
              {isCorrect ? 'Ausgezeichnet! Das ist vollkommen richtig.' : 'Noch nicht ganz richtig.'}
            </div>
            {exercise.explanationDe && (
              <p className="text-slate-700 leading-relaxed">{exercise.explanationDe}</p>
            )}
            {!isCorrect && exercise.correctAnswer && (
              <p className="font-mono text-xs font-bold text-slate-900 pt-1">
                Richtige Antwort: <span className="underline">{exercise.correctAnswer}</span>
              </p>
            )}
            {!isCorrect && exercise.correctOrderSentence && (
              <p className="font-mono text-xs font-bold text-slate-900 pt-1">
                Richtiger Satz: <span className="underline">{exercise.correctOrderSentence}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
