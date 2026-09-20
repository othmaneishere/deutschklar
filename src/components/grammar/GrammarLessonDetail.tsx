import React from 'react';
import {
  Volume2,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Table as TableIcon,
} from 'lucide-react';
import { GrammarLesson } from '../../types/grammarCourseTypes';
import { LanguageMode } from '../../types';
import { speakGerman } from '../../utils/speech';
import { VisualSentenceBreakdownCard } from './VisualSentenceBreakdownCard';
import { MiniDialogueCard } from './MiniDialogueCard';
import { GrammarExerciseRenderer } from './GrammarExerciseRenderer';

interface GrammarLessonDetailProps {
  lesson: GrammarLesson;
  languageMode: LanguageMode;
  onSelectPrevious?: () => void;
  onSelectNext?: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  onSelectModule?: (moduleNum: number) => void;
}

export const GrammarLessonDetail: React.FC<GrammarLessonDetailProps> = ({
  lesson,
  languageMode,
  onSelectPrevious,
  onSelectNext,
  hasPrevious,
  hasNext,
  onSelectModule,
}) => {
  const getOverview = () => {
    if (languageMode === 'fr' && lesson.overviewFr) return lesson.overviewFr;
    if (languageMode === 'ar' && lesson.overviewAr) return lesson.overviewAr;
    if (languageMode === 'en' && lesson.overviewEn) return lesson.overviewEn;
    return lesson.overviewDe;
  };

  const getCoreRule = () => {
    if (languageMode === 'fr' && lesson.coreRuleFr) return lesson.coreRuleFr;
    if (languageMode === 'ar' && lesson.coreRuleAr) return lesson.coreRuleAr;
    if (languageMode === 'en' && lesson.coreRuleEn) return lesson.coreRuleEn;
    return lesson.coreRuleDe;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Lesson Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
              Modul {lesson.moduleNumber} · Lektion {lesson.lessonNumber}
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-semibold">
              {lesson.category}
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Dauer: ~{lesson.durationMinutes} Min.
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {lesson.titleDe}
          </h1>
          {lesson.titleEn && (
            <p className="text-sm sm:text-base text-blue-200 font-medium">
              {lesson.titleEn}
            </p>
          )}
        </div>

        {/* Overview Paragraph */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl pt-2">
          {getOverview()}
        </p>

        {/* Core Rule Golden Banner */}
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-100 flex items-start gap-3.5">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Goldene Kernregel / Core Rule
            </div>
            <div className="text-sm sm:text-base font-semibold text-white whitespace-pre-line leading-relaxed">
              {getCoreRule()}
            </div>
          </div>
        </div>
      </div>

      {/* Deep Explanation Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-6">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Ausführliche Erklärung & Systematik
          </h2>
        </div>

        <div className="space-y-3.5 text-slate-700 leading-relaxed text-sm sm:text-base">
          {lesson.deepExplanationDe.map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Visual Sentence Breakdowns */}
      {lesson.sentenceBreakdowns && lesson.sentenceBreakdowns.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Visuelle Satzanalyse & Farbkodierung
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {lesson.sentenceBreakdowns.map((breakdown, idx) => (
              <VisualSentenceBreakdownCard key={idx} breakdown={breakdown} />
            ))}
          </div>
        </div>
      )}

      {/* Systematic Grammar Tables */}
      {lesson.tables && lesson.tables.length > 0 && (
        <div className="space-y-6">
          {lesson.tables.map((table, tIdx) => (
            <div
              key={tIdx}
              className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <TableIcon className="w-5 h-5 text-blue-600" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {table.titleDe}
                </h3>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-slate-900 text-white font-bold">
                    <tr>
                      {table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3 sm:p-3.5 border-b border-slate-800">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70 hover:bg-blue-50/40'}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3 sm:p-3.5 text-slate-800 font-medium ${
                              cIdx === 0 ? 'font-bold text-slate-900 bg-slate-50/50' : ''
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {table.captionDe && (
                <p className="text-xs text-slate-500 italic pl-1">{table.captionDe}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Real-life Examples with German Audio */}
      {lesson.examples && lesson.examples.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Musterbeispiele aus dem echten Sprachgebrauch
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {lesson.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 hover:bg-slate-100/70 transition"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {ex.de}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500">{ex.en}</div>
                  {ex.highlight && (
                    <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 mt-1">
                      Fokus: {ex.highlight}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => speakGerman(ex.de)}
                  className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition cursor-pointer shrink-0 shadow-2xs"
                  title="Aussprache anhören"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes to Avoid */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/40 border border-rose-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-rose-200/60">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h3 className="text-lg font-bold text-rose-950">
              Häufige Fehler vermeiden (Typische Stolperfallen)
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3.5 pt-1">
            {lesson.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-2xs space-y-2"
              >
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-xs uppercase font-extrabold">
                    Falsch
                  </span>
                  <span className="line-through">{mistake.incorrectDe}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs uppercase font-extrabold">
                    Richtig
                  </span>
                  <span>{mistake.correctDe}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 pt-1 border-t border-slate-100">
                  {mistake.explanationDe}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mini Dialogue in Context */}
      {lesson.miniDialogue && (
        <div className="space-y-3">
          <MiniDialogueCard dialogue={lesson.miniDialogue} />
        </div>
      )}

      {/* Interactive Exercises */}
      {lesson.exercises && lesson.exercises.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Interaktive Verständnisübungen
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              {lesson.exercises.length} Aufgaben
            </span>
          </div>

          <div className="space-y-4">
            {lesson.exercises.map((ex) => (
              <GrammarExerciseRenderer key={ex.id} exercise={ex} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation between Lessons */}
      <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4 flex-wrap">
        <button
          type="button"
          onClick={onSelectPrevious}
          disabled={!hasPrevious}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition cursor-pointer ${
            hasPrevious
              ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-950'
              : 'opacity-40 border-slate-200 text-slate-400 pointer-events-none'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Vorherige Lektion</span>
        </button>

        <button
          type="button"
          onClick={onSelectNext}
          disabled={!hasNext}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer shadow-2xs ${
            hasNext
              ? 'bg-slate-900 hover:bg-slate-800 text-white'
              : 'opacity-40 bg-slate-200 text-slate-400 pointer-events-none'
          }`}
        >
          <span>Nächste Lektion</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
