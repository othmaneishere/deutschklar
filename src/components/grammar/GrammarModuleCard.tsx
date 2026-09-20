import React from 'react';
import {
  BookOpen,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { GrammarModule, GrammarLesson } from '../../types/grammarCourseTypes';
import { LanguageMode } from '../../types';

interface GrammarModuleCardProps {
  module: GrammarModule;
  lessons: GrammarLesson[];
  activeLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
  languageMode: LanguageMode;
}

export const GrammarModuleCard: React.FC<GrammarModuleCardProps> = ({
  module,
  lessons,
  activeLessonId,
  onSelectLesson,
  languageMode,
}) => {
  const getModuleTitle = () => {
    if (languageMode === 'fr' && module.titleFr) return module.titleFr;
    if (languageMode === 'ar' && module.titleAr) return module.titleAr;
    if (languageMode === 'en' && module.titleEn) return module.titleEn;
    return module.titleDe;
  };

  const getModuleDesc = () => {
    if (languageMode === 'fr' && module.descriptionFr) return module.descriptionFr;
    if (languageMode === 'ar' && module.descriptionAr) return module.descriptionAr;
    if (languageMode === 'en' && module.descriptionEn) return module.descriptionEn;
    return module.descriptionDe;
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition hover:shadow-md">
      {/* Module Header Bar */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
              Kursmodul {module.moduleNumber}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {lessons.length} Lektionen
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            {getModuleTitle()}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
            {getModuleDesc()}
          </p>
        </div>
      </div>

      {/* Module Lessons List */}
      <div className="p-3 divide-y divide-slate-100">
        {lessons.map((lesson) => {
          const isActive = activeLessonId === lesson.id;
          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => onSelectLesson(lesson.id)}
              className={`w-full p-3.5 sm:p-4 rounded-2xl text-left transition flex items-center justify-between gap-3 cursor-pointer ${
                isActive
                  ? 'bg-blue-50/80 border border-blue-200 text-blue-950 shadow-2xs font-semibold'
                  : 'hover:bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {lesson.lessonNumber}
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {lesson.titleDe}
                  </div>
                  {lesson.titleEn && (
                    <div className="text-xs text-slate-500 truncate">
                      {lesson.titleEn}
                    </div>
                  )}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {lesson.category}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{lesson.durationMinutes}m
                    </span>
                  </div>
                </div>
              </div>

              <ChevronRight
                className={`w-4 h-4 shrink-0 transition ${
                  isActive ? 'text-blue-600 translate-x-0.5' : 'text-slate-300'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
