import React from 'react';
import {
  MessageSquare,
  Layers,
  Dumbbell,
  Table,
  ChevronRight,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { CoursePage, LanguageMode } from '../types';
import { moduleScenes, ModuleVisualScene } from '../utils/moduleAssets';
import { AudioButton } from './AudioButton';
import { getUnitForChapter } from '../data/courseUnits';
import { getA2UnitForChapter } from '../data/a2CourseUnits';

interface ModuleHeroCardProps {
  currentPage: CoursePage;
  languageMode: LanguageMode;
  onSelectFilter: (filter: any) => void;
  isCompact?: boolean;
}

export const ModuleHeroCard: React.FC<ModuleHeroCardProps> = ({
  currentPage,
  languageMode,
  onSelectFilter,
}) => {
  const isA2 = currentPage.id >= 200 || (currentPage.chapterTitleDe && currentPage.chapterTitleDe.includes('A2'));
  const scene: ModuleVisualScene = moduleScenes[currentPage.chapterNumber] || moduleScenes[1];
  const unit = isA2 ? getA2UnitForChapter(currentPage.chapterNumber) : getUnitForChapter(currentPage.chapterNumber);

  let title = currentPage.pageTitleDe;
  let subtitle = currentPage.subtitleDe;
  let scenario = scene?.scenarioDe;
  let badge = scene?.badgeDe;

  if (languageMode === 'ar') {
    title = currentPage.pageTitleAr;
    subtitle = currentPage.subtitleAr || currentPage.subtitleDe;
    scenario = scene?.scenarioAr;
    badge = scene?.badgeAr;
  } else if (languageMode === 'en') {
    title = currentPage.pageTitleEn;
    subtitle = currentPage.subtitleEn || currentPage.subtitleDe;
    scenario = scene?.scenarioEn;
    badge = scene?.badgeEn;
  } else if (languageMode === 'fr') {
    title = currentPage.pageTitleFr;
    subtitle = currentPage.subtitleFr || currentPage.subtitleDe;
    scenario = scene?.scenarioFr;
    badge = scene?.badgeFr;
  }

  const objectives =
    languageMode === 'ar' && currentPage.objectivesAr
      ? currentPage.objectivesAr
      : languageMode === 'en' && currentPage.objectivesEn
      ? currentPage.objectivesEn
      : languageMode === 'fr' && currentPage.objectivesFr
      ? currentPage.objectivesFr
      : currentPage.objectivesDe;

  // Count items for quick jump navigation
  const vocabCount = currentPage.sections
    .filter((s) => s.type === 'vocabulary')
    .reduce((acc, s) => acc + (s.vocabItems?.length || 0), 0);

  const dialogueCount = currentPage.sections
    .filter((s) => s.type === 'dialogue')
    .reduce((acc, s) => acc + (s.dialogueLines?.length ? 1 : 0), 0);

  const tableCount = currentPage.sections.filter((s) => s.type === 'table').length;
  const exerciseCount = currentPage.exercises?.length || 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all relative">
      {/* Crisp Editorial Unit Accent Line */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${unit.color.gradient}`} />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Top Unit & Level Breadcrumb */}
        <div className="flex items-center justify-between gap-3 flex-wrap pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Category Level Badge */}
            <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg">
              {unit.level || 'A1'}
            </span>

            {/* Unit Tag */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${unit.color.bgBadge}`}>
              <span className={`w-2 h-2 rounded-full ${unit.color.dotColor}`} />
              <span>{unit.titleDe.split(':')[0]}</span>
            </span>

            <ChevronRight className="w-4 h-4 text-slate-300" />

            {/* Chapter Tag */}
            <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
              Kapitel {currentPage.chapterNumber < 10 ? `0${currentPage.chapterNumber}` : currentPage.chapterNumber}
            </span>

            {badge && (
              <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                · {badge}
              </span>
            )}
          </div>

          {/* Title Audio Pronunciation */}
          <div className="flex items-center gap-2">
            <AudioButton text={currentPage.pageTitleDe} size="md" />
          </div>
        </div>

        {/* Main Content Row: Info + Visual Scene Thumbnail Illustration */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Heading + Translation */}
          <div className="space-y-2 max-w-2xl flex-1">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentPage.pageTitleDe}
            </h1>

            {languageMode !== 'none' && (
              <p
                className={`text-base sm:text-lg font-medium text-slate-700 ${
                  languageMode === 'ar' ? 'font-arabic text-slate-800 font-semibold text-xl' : ''
                }`}
                dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
              >
                {title}
              </p>
            )}

            {subtitle && (
              <p className="text-sm font-medium text-slate-500 pt-0.5 leading-relaxed">
                {subtitle}
              </p>
            )}

            {scenario && (
              <p className="text-sm sm:text-base text-slate-600 pt-1 leading-relaxed">
                {scenario}
              </p>
            )}
          </div>

          {/* Module Scenario Artwork Thumbnail */}
          {scene && scene.imageSrc && (
            <div className="w-full md:w-56 lg:w-64 h-36 sm:h-40 shrink-0 rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs relative group bg-slate-100">
              <img
                src={scene.imageSrc}
                alt={scene.alt || currentPage.pageTitleDe}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const filename = scene.imageSrc.split('/').pop();
                  if (filename) {
                    const fallbackPath = `/images/${filename}`;
                    if (e.currentTarget.src !== fallbackPath && !e.currentTarget.src.endsWith(fallbackPath)) {
                      e.currentTarget.src = fallbackPath;
                    }
                  }
                }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                <span className="text-[11px] font-bold text-white tracking-wide drop-shadow-xs truncate">
                  {badge}
                </span>
                <span className="text-[10px] font-mono font-bold bg-white/90 text-slate-900 px-2 py-0.5 rounded-md shadow-xs">
                  K{currentPage.chapterNumber}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Learning Objectives Pill List */}
        {objectives && objectives.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>
                {languageMode === 'ar'
                  ? 'أهداف الدرس ومخرجات التعلم'
                  : languageMode === 'fr'
                  ? 'Objectifs d’apprentissage'
                  : languageMode === 'en'
                  ? 'Key Learning Objectives'
                  : 'Lernziele dieses Kapitels'}
              </span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              {objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Section Quick Jump Filter Tabs with spacious touch targets */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 flex-wrap text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Vocabulary Jump */}
            {vocabCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('section-vocabulary');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  else onSelectFilter('vocab');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition cursor-pointer"
              >
                <Layers className="w-4 h-4 text-slate-600" />
                <span>Wortschatz</span>
                <span className="bg-slate-200 text-slate-700 text-[10px] font-mono px-1.5 py-0.5 rounded-md">
                  {vocabCount}
                </span>
              </button>
            )}

            {/* Dialogue Jump */}
            {dialogueCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('section-dialogue');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  else onSelectFilter('dialogue');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-slate-600" />
                <span>Dialog</span>
              </button>
            )}

            {/* Grammar Jump */}
            {tableCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('section-tables');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  else onSelectFilter('tables');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition cursor-pointer"
              >
                <Table className="w-4 h-4 text-slate-600" />
                <span>Grammatik</span>
              </button>
            )}

            {/* Exercises Jump */}
            {exerciseCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('section-exercises');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  else onSelectFilter('exercises');
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition cursor-pointer"
              >
                <Dumbbell className="w-4 h-4 text-slate-600" />
                <span>Übungen</span>
                <span className="bg-slate-200 text-slate-700 text-[10px] font-mono px-1.5 py-0.5 rounded-md">
                  {exerciseCount}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
