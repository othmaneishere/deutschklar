import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Layers,
  Sparkles,
  ArrowRight,
  GraduationCap,
  ChevronLeft,
  LayoutGrid,
  CheckCircle2,
} from 'lucide-react';
import { LanguageMode } from '../types';
import { GRAMMAR_MODULES } from '../data/grammarCourseModules';
import {
  ALL_GRAMMAR_LESSONS,
  getLessonById,
  getNextLesson,
  getPreviousLesson,
} from '../data/grammarCourseIndex';
import { GrammarLessonDetail } from './grammar/GrammarLessonDetail';
import { GrammarModuleCard } from './grammar/GrammarModuleCard';

interface GrammarCourseViewProps {
  languageMode: LanguageMode;
  onNavigateToCourse?: (level: 'A1' | 'A2') => void;
}

export const GrammarCourseView: React.FC<GrammarCourseViewProps> = ({
  languageMode,
  onNavigateToCourse,
}) => {
  // Navigation mode: 'course' (all modules overview) or 'lesson' (deep learning mode)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(() => {
    return localStorage.getItem('deutsch_active_grammar_lesson') || 'nouns-articles-gender-plural';
  });

  const [activeModuleFilter, setActiveModuleFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Save selected lesson to storage
  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    localStorage.setItem('deutsch_active_grammar_lesson', lessonId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentLesson = useMemo(() => {
    if (!selectedLessonId) return ALL_GRAMMAR_LESSONS[0];
    return getLessonById(selectedLessonId) || ALL_GRAMMAR_LESSONS[0];
  }, [selectedLessonId]);

  const previousLesson = useMemo(() => {
    if (!currentLesson) return undefined;
    return getPreviousLesson(currentLesson.id);
  }, [currentLesson]);

  const nextLesson = useMemo(() => {
    if (!currentLesson) return undefined;
    return getNextLesson(currentLesson.id);
  }, [currentLesson]);

  // Search filtering
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) {
      if (activeModuleFilter === 'all') return ALL_GRAMMAR_LESSONS;
      return ALL_GRAMMAR_LESSONS.filter((l) => l.moduleNumber === activeModuleFilter);
    }
    const q = searchQuery.toLowerCase();
    return ALL_GRAMMAR_LESSONS.filter(
      (l) =>
        l.titleDe.toLowerCase().includes(q) ||
        l.titleEn.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.coreRuleDe.toLowerCase().includes(q) ||
        l.overviewDe.toLowerCase().includes(q)
    );
  }, [searchQuery, activeModuleFilter]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      {/* Top Banner: Structured German Grammar Course */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Strukturierter Grammatikkurs · 7 Module · 21 Lektionen</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Deutscher Grammatikkurs
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Ein didaktisch aufgebauter Lehrgang von den elementaren Grundlagen (Artikel & Kasus)
            über Verbalsyntax bis hin zu komplexen Satzgefügen und Konjunktiv II. Mit
            Visualisierungen, Tabellen, Alltagsbeispielen, Stolperfallen und interaktiven Übungen.
          </p>
        </div>
      </div>

      {/* Course Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Thema oder grammatikalischen Begriff suchen (z. B. Dativ, Wechselpräpositionen, Konjunktiv, Passiv)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Module Fast-Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveModuleFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeModuleFilter === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Alle Module
          </button>
          {GRAMMAR_MODULES.map((m) => (
            <button
              key={m.moduleNumber}
              type="button"
              onClick={() => setActiveModuleFilter(m.moduleNumber)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeModuleFilter === m.moduleNumber
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              M{m.moduleNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Course View (Desktop: Left Nav Sidebar, Right: Active Rich Lesson) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Progressive Course Curriculum Navigation (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Kurslehrplan ({ALL_GRAMMAR_LESSONS.length} Lektionen)</span>
            </h2>
          </div>

          <div className="space-y-3.5 max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
            {GRAMMAR_MODULES.filter(
              (m) => activeModuleFilter === 'all' || m.moduleNumber === activeModuleFilter
            ).map((mod) => {
              const moduleLessons = filteredLessons.filter((l) => l.moduleNumber === mod.moduleNumber);
              if (moduleLessons.length === 0) return null;

              return (
                <div
                  key={mod.moduleNumber}
                  className="rounded-2xl bg-white border border-slate-200 shadow-2xs overflow-hidden"
                >
                  <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
                    <span className="text-xs font-extrabold tracking-tight">
                      Modul {mod.moduleNumber}: {mod.titleDe}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {moduleLessons.length} Lekt.
                    </span>
                  </div>

                  <div className="p-1.5 divide-y divide-slate-100">
                    {moduleLessons.map((lesson) => {
                      const isSelected = currentLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => handleSelectLesson(lesson.id)}
                          className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between gap-2.5 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 border border-blue-200 text-blue-950 font-bold shadow-2xs'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                                isSelected
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {lesson.lessonNumber}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-bold truncate">
                                {lesson.titleDe}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate">
                                {lesson.category} · ~{lesson.durationMinutes}m
                              </div>
                            </div>
                          </div>

                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Pedagogical Lesson Workspace (8 cols) */}
        <div className="lg:col-span-8">
          {currentLesson ? (
            <GrammarLessonDetail
              lesson={currentLesson}
              languageMode={languageMode}
              onSelectPrevious={() => previousLesson && handleSelectLesson(previousLesson.id)}
              onSelectNext={() => nextLesson && handleSelectLesson(nextLesson.id)}
              hasPrevious={Boolean(previousLesson)}
              hasNext={Boolean(nextLesson)}
              onSelectModule={(num) => setActiveModuleFilter(num)}
            />
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
              Bitte wählen Sie eine Lektion aus dem Lehrplan aus.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
