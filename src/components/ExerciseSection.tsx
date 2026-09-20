import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Eye, Sparkles, Send, Volume2, CheckSquare } from 'lucide-react';
import { Exercise, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';

interface ExerciseSectionProps {
  exercise: Exercise;
  languageMode: LanguageMode;
  pageId: number;
}

export const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  exercise,
  languageMode,
  pageId,
}) => {
  // Matching State
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<{ [left: string]: string }>({});
  const [wrongAttempt, setWrongAttempt] = useState<string | null>(null);

  // Blanks State
  const [blankInputs, setBlankInputs] = useState<{ [id: string]: string }>({});
  const [checkedBlanks, setCheckedBlanks] = useState<boolean>(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);

  // Answering State
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});
  const [revealedSamples, setRevealedSamples] = useState<{ [id: string]: boolean }>({});

  // Writing State
  const [writingText, setWritingText] = useState<string>('');
  const [savedWriting, setSavedWriting] = useState<boolean>(false);
  const [showExampleWriting, setShowExampleWriting] = useState<boolean>(false);

  // Multiple Choice State
  const [selectedChoices, setSelectedChoices] = useState<{ [id: string]: number }>({});
  const [checkedChoices, setCheckedChoices] = useState<boolean>(false);

  // Sentence Order State
  const [orderedWords, setOrderedWords] = useState<{ [id: string]: string[] }>({});
  const [checkedSentenceOrder, setCheckedSentenceOrder] = useState<boolean>(false);
  const [revealedSentenceOrder, setRevealedSentenceOrder] = useState<boolean>(false);

  // Sentence Transformation State
  const [transformationInputs, setTransformationInputs] = useState<{ [id: string]: string }>({});
  const [checkedTransformations, setCheckedTransformations] = useState<boolean>(false);
  const [revealedTransformations, setRevealedTransformations] = useState<boolean>(false);

  // Load saved writing text from localStorage if available
  useEffect(() => {
    if (exercise.type === 'writing') {
      const saved = localStorage.getItem(`deutsch_writing_${pageId}_${exercise.id}`);
      if (saved) {
        setWritingText(saved);
      }
    }
  }, [exercise.id, exercise.type, pageId]);

  const handleSaveWriting = () => {
    localStorage.setItem(`deutsch_writing_${pageId}_${exercise.id}`, writingText);
    setSavedWriting(true);
    setTimeout(() => setSavedWriting(false), 2500);
  };

  // Reset exercise
  const handleReset = () => {
    setSelectedLeft(null);
    setMatchedPairs({});
    setWrongAttempt(null);
    setBlankInputs({});
    setCheckedBlanks(false);
    setShowSolutions(false);
    setAnswers({});
    setRevealedSamples({});
    setSelectedChoices({});
    setCheckedChoices(false);
    setOrderedWords({});
    setCheckedSentenceOrder(false);
    setRevealedSentenceOrder(false);
    setTransformationInputs({});
    setCheckedTransformations(false);
    setRevealedTransformations(false);
  };

  const getExerciseBadge = (type: string) => {
    switch (type) {
      case 'matching':
        return { label: 'Zuordnungsübung', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'blanks':
        return { label: 'Lückentext', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'answering':
        return { label: 'Freie Antwort', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'writing':
        return { label: 'Schreibaufgabe', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'multiple_choice':
        if (exercise.titleDe.toLowerCase().includes('minitest') || exercise.titleDe.toLowerCase().includes('test') || exercise.titleDe.toLowerCase().includes('review')) {
          return { label: 'Kapitel-Minitest & Review', color: 'bg-violet-100 text-violet-900 border-violet-300 font-bold' };
        }
        return { label: 'Multiple Choice', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'sentence_order':
        return { label: 'Satzbau & Wortstellung', color: 'bg-teal-50 text-teal-700 border-teal-200' };
      case 'transformation':
        return { label: 'Satzumformung', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      default:
        return { label: 'Interaktive Übung', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const badge = getExerciseBadge(exercise.type);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-5 sm:p-6 space-y-4">
      {/* Exercise Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${badge.color}`}>
              {badge.label}
            </span>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
              {exercise.titleDe}
            </h3>
          </div>
          {languageMode !== 'none' && (
            <p
              className={`text-xs text-slate-500 mt-0.5 ${
                languageMode === 'ar' ? 'font-arabic text-slate-700 font-medium' : ''
              }`}
              dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
            >
              {languageMode === 'ar' && exercise.titleAr}
              {languageMode === 'en' && exercise.titleEn}
              {languageMode === 'fr' && exercise.titleFr}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
          title="Übung zurücksetzen"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Neu starten</span>
        </button>
      </div>

      {/* Instruction text */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
        <p className="font-semibold text-slate-900">{exercise.instructionDe}</p>
        {languageMode !== 'none' && (
          <p
            className={`text-slate-500 text-xs ${
              languageMode === 'ar' ? 'font-arabic text-slate-700 font-medium' : ''
            }`}
            dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
          >
            {languageMode === 'ar' && exercise.instructionAr}
            {languageMode === 'en' && exercise.instructionEn}
            {languageMode === 'fr' && exercise.instructionFr}
          </p>
        )}
      </div>

      {/* 1. MATCHING EXERCISE */}
      {exercise.type === 'matching' && exercise.matchingPairs && (
        <div className="space-y-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Left Column (German Items) */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Deutsch
              </span>
              {exercise.matchingPairs.map((pair, idx) => {
                const leftText = pair.leftDe || pair.left || `item-${idx}`;
                const isMatched = !!matchedPairs[leftText];
                const isSelected = selectedLeft === leftText;

                return (
                  <div
                    key={leftText}
                    className={`w-full p-3 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-2 shadow-2xs ${
                      isMatched
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : isSelected
                        ? 'bg-indigo-50 text-indigo-950 border-indigo-400 ring-2 ring-indigo-300'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      disabled={isMatched}
                      onClick={() => {
                        if (!isMatched) {
                          setSelectedLeft(leftText);
                          setWrongAttempt(null);
                        }
                      }}
                      className="flex-1 text-left font-bold text-base py-0.5 cursor-pointer disabled:cursor-default"
                    >
                      {leftText}
                    </button>
                    {isMatched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AudioButton text={leftText} size="sm" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column (Translations) */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {languageMode === 'ar'
                  ? 'الترجمة (المعنى)'
                  : languageMode === 'en'
                  ? 'Translation (Target)'
                  : languageMode === 'fr'
                  ? 'Traduction'
                  : 'Bedeutung'}
              </span>
              {exercise.matchingPairs.map((pair, idx) => {
                const rightKey = pair.rightKey || pair.right || `right-${idx}`;
                const isMatched = Object.values(matchedPairs).includes(rightKey);
                const isWrong = wrongAttempt === rightKey;

                const translation =
                  (languageMode === 'ar'
                    ? (pair.translations?.ar || pair.rightAr)
                    : languageMode === 'en'
                    ? (pair.translations?.en || pair.rightEn)
                    : languageMode === 'fr'
                    ? (pair.translations?.fr || pair.rightFr)
                    : null) ||
                  pair.translations?.en ||
                  pair.translations?.ar ||
                  pair.rightEn ||
                  pair.right ||
                  rightKey;

                return (
                  <div
                    key={rightKey}
                    className={`w-full p-3 rounded-xl border text-left text-sm transition-all flex items-center justify-between gap-2 shadow-2xs ${
                      isMatched
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : isWrong
                        ? 'bg-rose-50 text-rose-900 border-rose-300 animate-shake'
                        : selectedLeft
                        ? 'bg-white hover:bg-indigo-50/70 text-slate-800 border-indigo-200 hover:border-indigo-300'
                        : 'bg-white text-slate-500 border-slate-200'
                    }`}
                  >
                    <button
                      type="button"
                      disabled={isMatched}
                      onClick={() => {
                        if (!selectedLeft || isMatched) return;

                        const matchingTarget = exercise.matchingPairs?.find(
                          (p) => (p.leftDe || p.left) === selectedLeft
                        );

                        const targetKey = matchingTarget?.rightKey || matchingTarget?.right;

                        if (targetKey === rightKey) {
                          setMatchedPairs((prev) => ({
                            ...prev,
                            [selectedLeft]: rightKey,
                          }));
                          setSelectedLeft(null);
                          setWrongAttempt(null);
                        } else {
                          setWrongAttempt(rightKey);
                          setTimeout(() => setWrongAttempt(null), 1200);
                        }
                      }}
                      className={`flex-1 text-left py-0.5 cursor-pointer disabled:cursor-default font-semibold ${
                        languageMode === 'ar' ? 'font-arabic text-base' : ''
                      }`}
                      dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                    >
                      {translation}
                    </button>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Success message when all matched */}
          {Object.keys(matchedPairs).length === exercise.matchingPairs.length && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-sm">
                  Klasse gemacht! Alle Paare wurden richtig zugeordnet.
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 cursor-pointer shadow-xs"
              >
                Nochmal üben
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. BLANKS EXERCISE (Lückentext) */}
      {exercise.type === 'blanks' && exercise.blanks && (
        <div className="space-y-3 pt-1">
          {exercise.blanks.map((b, bIdx) => {
            const bId = b.id || `blank-${bIdx}`;
            const val = blankInputs[bId] || '';
            const prefix = b.prefixDe || b.sentenceBeforeDe || '';
            const suffix = b.suffixDe || b.sentenceAfterDe || '';
            const isCorrect =
              val.trim().toLowerCase() === b.correctAnswer.trim().toLowerCase() ||
              (b.acceptedAnswers &&
                b.acceptedAnswers.some(
                  (ans) => ans.trim().toLowerCase() === val.trim().toLowerCase()
                ));

            return (
              <div
                key={bId}
                className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs"
              >
                <div className="flex items-center gap-2 flex-wrap text-sm sm:text-base font-semibold text-slate-800">
                  {prefix && <span>{prefix}</span>}

                  <input
                    type="text"
                    value={val}
                    onChange={(e) => {
                      setBlankInputs((prev) => ({ ...prev, [bId]: e.target.value }));
                      setCheckedBlanks(false);
                    }}
                    placeholder={b.hint ? `(${b.hint})` : '...'}
                    className={`px-3 py-1.5 text-sm font-bold rounded-xl border focus:outline-none transition min-w-[130px] max-w-[200px] ${
                      checkedBlanks
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                          : 'bg-rose-50 border-rose-400 text-rose-800'
                        : 'bg-slate-50 border-slate-300 focus:border-indigo-600 focus:bg-white text-slate-900'
                    }`}
                  />

                  {suffix && <span>{suffix}</span>}

                  {checkedBlanks && (
                    <span className="ml-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 inline" />
                      )}
                    </span>
                  )}
                </div>

                {/* Show solution if toggled */}
                {showSolutions && (
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 self-start sm:self-center">
                    Lösung: {b.correctAnswer}
                  </span>
                )}
              </div>
            );
          })}

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCheckedBlanks(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
            >
              Antworten prüfen
            </button>
            <button
              type="button"
              onClick={() => setShowSolutions(!showSolutions)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 border border-slate-200"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showSolutions ? 'Lösungen verbergen' : 'Lösungen anzeigen'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. ANSWERING EXERCISE */}
      {exercise.type === 'answering' && exercise.answeringQuestions && (
        <div className="space-y-3 pt-1">
          {exercise.answeringQuestions.map((q) => {
            const userAns = answers[q.id] || '';
            const isRevealed = revealedSamples[q.id];

            return (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">
                        {q.questionDe}
                      </span>
                      <AudioButton text={q.questionDe} size="sm" />
                    </div>

                    {languageMode !== 'none' && (
                      <p
                        className={`text-xs text-slate-500 font-medium ${
                          languageMode === 'ar' ? 'font-arabic text-slate-700' : ''
                        }`}
                        dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {languageMode === 'ar' && q.questionAr}
                        {languageMode === 'en' && q.questionEn}
                        {languageMode === 'fr' && q.questionFr}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setRevealedSamples((prev) => ({
                        ...prev,
                        [q.id]: !prev[q.id],
                      }))
                    }
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer border border-slate-200 whitespace-nowrap"
                  >
                    {isRevealed ? 'Muster ausblenden' : 'Musterantwort'}
                  </button>
                </div>

                {/* User Input */}
                <input
                  type="text"
                  value={userAns}
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  placeholder="Deine Antwort auf Deutsch schreiben..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:outline-none font-medium"
                />

                {/* Sample Answer Box */}
                {isRevealed && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-2">
                    <span className="font-semibold">
                      Beispielantwort: <strong>{q.sampleAnswerDe}</strong>
                    </span>
                    <AudioButton text={q.sampleAnswerDe} size="sm" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 4. WRITING EXERCISE */}
      {exercise.type === 'writing' && exercise.writingTask && (
        <div className="space-y-3 pt-1">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
            <p className="font-bold text-slate-900">{exercise.writingTask.promptDe}</p>
            {languageMode !== 'none' && (
              <p
                className={`text-slate-500 font-medium ${
                  languageMode === 'ar' ? 'font-arabic text-slate-700' : ''
                }`}
                dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
              >
                {languageMode === 'ar' && exercise.writingTask.promptAr}
                {languageMode === 'en' && exercise.writingTask.promptEn}
                {languageMode === 'fr' && exercise.writingTask.promptFr}
              </p>
            )}
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              rows={5}
              value={writingText}
              onChange={(e) => setWritingText(e.target.value)}
              placeholder="Schreibe deinen Text hier auf Deutsch..."
              className="w-full p-4 text-sm sm:text-base rounded-xl border border-slate-200 bg-white focus:border-indigo-600 focus:outline-none transition leading-relaxed font-sans"
            />
            <div className="absolute bottom-3 right-3 text-[11px] text-slate-500 font-mono font-bold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              {writingText.trim() ? writingText.trim().split(/\s+/).length : 0} Wörter
            </div>
          </div>

          {/* Actions & Example */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveWriting}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Text speichern</span>
              </button>
              {savedWriting && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Gespeichert!
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowExampleWriting(!showExampleWriting)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer border border-slate-200"
            >
              {showExampleWriting ? 'Beispiel schließen' : 'Mustertext ansehen'}
            </button>
          </div>

          {/* Example Drawer */}
          {showExampleWriting && (
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700">
                Musterbeispiel:
              </span>
              <div className="space-y-1.5">
                {exercise.writingTask.exampleDe.map((line, lIdx) => (
                  <div key={lIdx} className="flex items-center justify-between text-sm text-slate-900 font-semibold">
                    <span>{line}</span>
                    <AudioButton text={line} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. MULTIPLE CHOICE EXERCISE */}
      {exercise.type === 'multiple_choice' && exercise.multipleChoice && (
        <div className="space-y-3 pt-1">
          {exercise.multipleChoice.map((mc) => {
            const userPick = selectedChoices[mc.id];
            const isCorrect = userPick === mc.correctIndex;

            return (
              <div key={mc.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
                <p className="font-bold text-slate-900 text-base">
                  {mc.questionDe}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mc.options.map((opt, optIdx) => {
                    const isSelected = userPick === optIdx;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => {
                          setSelectedChoices((prev) => ({ ...prev, [mc.id]: optIdx }));
                          setCheckedChoices(false);
                        }}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition cursor-pointer font-semibold ${
                          checkedChoices
                            ? optIdx === mc.correctIndex
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : isSelected
                              ? 'bg-rose-50 border-rose-300 text-rose-900'
                              : 'bg-white border-slate-200 text-slate-400'
                            : isSelected
                            ? 'bg-indigo-50 border-indigo-400 text-indigo-950 ring-2 ring-indigo-300'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {checkedChoices && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{mc.explanationDe}</span>
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => setCheckedChoices(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
          >
            Auswertung anzeigen
          </button>
        </div>
      )}

      {/* Type: SENTENCE ORDER (Satzbau & Wortstellung) */}
      {exercise.type === 'sentence_order' && exercise.sentenceOrderItems && (
        <div className="space-y-6 pt-2">
          {exercise.sentenceOrderItems.map((item, idx) => {
            const currentOrder = orderedWords[item.id] || [];
            const isFinished = currentOrder.length === item.wordsShuffled.length;
            const userSentence = currentOrder.join(' ');
            const isCorrect = userSentence.trim() === item.correctSentence.trim();

            const availableWords = item.wordsShuffled.filter((word, wIdx) => {
              // Count occurrences in shuffled vs chosen
              const totalOccurrences = item.wordsShuffled.slice(0, wIdx + 1).filter((w) => w === word).length;
              const chosenOccurrences = currentOrder.filter((w) => w === word).length;
              return totalOccurrences > chosenOccurrences;
            });

            const handleAddWord = (word: string) => {
              if (checkedSentenceOrder) return;
              setOrderedWords((prev) => ({
                ...prev,
                [item.id]: [...(prev[item.id] || []), word],
              }));
            };

            const handleRemoveWord = (wordIdx: number) => {
              if (checkedSentenceOrder) return;
              setOrderedWords((prev) => {
                const arr = [...(prev[item.id] || [])];
                arr.splice(wordIdx, 1);
                return { ...prev, [item.id]: arr };
              });
            };

            return (
              <div
                key={item.id || idx}
                className="p-4 rounded-xl border border-teal-200/90 bg-teal-50/20 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-teal-800">
                    Aufgabe {idx + 1}
                  </span>
                  {item.hint && (
                    <span className="text-[11px] text-slate-500 font-medium italic">
                      Hinweis: {item.hint}
                    </span>
                  )}
                </div>

                {/* Target Construction Area */}
                <div className="min-h-[50px] p-3 rounded-xl bg-white border-2 border-dashed border-teal-300 flex flex-wrap items-center gap-1.5">
                  {currentOrder.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">
                      Klicken Sie unten auf die Satzbausteine in der richtigen Reihenfolge...
                    </span>
                  ) : (
                    currentOrder.map((word, wIdx) => (
                      <button
                        key={wIdx}
                        type="button"
                        onClick={() => handleRemoveWord(wIdx)}
                        className="px-2.5 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition cursor-pointer shadow-2xs flex items-center gap-1"
                        title="Klicken zum Entfernen"
                      >
                        <span>{word}</span>
                        <span className="text-[10px] opacity-70">×</span>
                      </button>
                    ))
                  )}
                </div>

                {/* Available Word Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {item.wordsShuffled.map((word, wIdx) => {
                    const isUsed =
                      currentOrder.filter((w) => w === word).length >=
                      item.wordsShuffled.filter((w) => w === word).length;

                    return (
                      <button
                        key={wIdx}
                        type="button"
                        disabled={isUsed || checkedSentenceOrder}
                        onClick={() => handleAddWord(word)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                          isUsed
                            ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                            : 'bg-white hover:bg-teal-50 text-slate-800 border-slate-300 shadow-2xs hover:border-teal-400'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>

                {/* Result Feedback */}
                {checkedSentenceOrder && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>
                        {isCorrect
                          ? 'Perfekt! Die Satzstellung ist grammatikalisch korrekt.'
                          : `Lösung: ${item.correctSentence}`}
                      </span>
                    </div>
                    <AudioButton text={item.correctSentence} size="sm" />
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCheckedSentenceOrder(true)}
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition cursor-pointer shadow-xs"
            >
              Satzbau prüfen
            </button>
          </div>
        </div>
      )}

      {/* Type: TRANSFORMATION (Satzumformung) */}
      {exercise.type === 'transformation' && exercise.transformationItems && (
        <div className="space-y-6 pt-2">
          {exercise.transformationItems.map((item, idx) => {
            const userVal = transformationInputs[item.id] || '';
            const normalizedUser = userVal.trim().toLowerCase().replace(/[.!?]/g, '');
            const normalizedCorrect = item.correctAnswer.trim().toLowerCase().replace(/[.!?]/g, '');
            const acceptedList = (item.acceptedAnswers || []).map((a) =>
              a.trim().toLowerCase().replace(/[.!?]/g, '')
            );
            const isCorrect =
              normalizedUser === normalizedCorrect || acceptedList.includes(normalizedUser);

            return (
              <div
                key={item.id || idx}
                className="p-4 rounded-xl border border-rose-200/90 bg-rose-50/20 space-y-3"
              >
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Ausgangssatz:
                  </div>
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white border border-slate-200 font-semibold text-xs sm:text-sm text-slate-900">
                    <span>{item.originalSentence}</span>
                    <AudioButton text={item.originalSentence} size="sm" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-rose-900">
                    ➔ {item.transformationPromptDe}
                  </div>
                  <input
                    type="text"
                    value={userVal}
                    onChange={(e) => {
                      setTransformationInputs((prev) => ({ ...prev, [item.id]: e.target.value }));
                      setCheckedTransformations(false);
                    }}
                    placeholder="Geben Sie den umgeformten Satz ein..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  />
                </div>

                {checkedTransformations && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>
                        {isCorrect
                          ? 'Hervorragend! Richtig umgeformt.'
                          : `Musterlösung: ${item.correctAnswer}`}
                      </span>
                    </div>
                    <AudioButton text={item.correctAnswer} size="sm" />
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCheckedTransformations(true)}
              className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs transition cursor-pointer shadow-xs"
            >
              Umformung überprüfen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
