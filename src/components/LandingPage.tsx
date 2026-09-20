import React from 'react';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Headphones,
  CheckCircle2,
  FileText,
  Languages,
  Bookmark,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { LanguageMode } from '../types';

interface LandingPageProps {
  onStartCourse: (level: 'A1' | 'A2') => void;
  onGoToStories: () => void;
  onGoToVocab: () => void;
  onGoToGrammar: () => void;
  languageMode: LanguageMode;
  onLanguageChange: (mode: LanguageMode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCourse,
  onGoToStories,
  onGoToVocab,
  onGoToGrammar,
  languageMode,
  onLanguageChange,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Top Simple Minimal SaaS Bar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-xs">
              DK
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                DeutscheKlar
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                A1 & A2 Deutsch
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => onLanguageChange('fr')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  languageMode === 'fr' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ar')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  languageMode === 'ar' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                AR
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  languageMode === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('none')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  languageMode === 'none' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                DE
              </button>
            </div>

            <button
              type="button"
              onClick={() => onStartCourse('A1')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Lernplattform öffnen
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section (French-first introduction as requested) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Apprenez l’allemand avec clarté, sérénité et structure</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Maîtrisez l'allemand de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900">
              A1 jusqu'à A2
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Une méthode rigoureuse et épurée sans distraction ni gamification superflue.
            Découvrez 24 leçons A1 complètes, 30 leçons A2 approfondies, des histoires audio immersives et des fiches visuelles.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onStartCourse('A1')}
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Démarrer le cours A1 (24 leçons)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onStartCourse('A2')}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-sm font-bold transition shadow-xs cursor-pointer flex items-center gap-2"
            >
              <span>Niveau A2 (30 leçons)</span>
            </button>

            <button
              type="button"
              onClick={onGoToStories}
              className="px-5 py-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-sm font-bold transition cursor-pointer flex items-center gap-2"
            >
              <Headphones className="w-4 h-4 text-indigo-700" />
              <span>Hörgeschichten</span>
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: A1 Course */}
          <div
            onClick={() => onStartCourse('A1')}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-lg group-hover:scale-105 transition">
                A1
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">Cours A1 Intégral</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                19 chapitres et 24 leçons couvrant les salutations, la famille, le logement, le travail, la santé et l'examen certifiant.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>24 leçons structurées</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: A2 Course */}
          <div
            onClick={() => onStartCourse('A2')}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-lg group-hover:scale-105 transition">
                A2
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">Cours A2 Avancé</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                15 chapitres et 30 leçons : opinions, subordonnées avec dass/weil, Konjunktiv II, passif, et préparation telc/Goethe A2.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>30 leçons dédiées</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: Hörgeschichten */}
          <div
            onClick={onGoToStories}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">Hörgeschichten</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Récits audio authentiques avec lecture phrase par phrase, vitesse réglable et traductions interlinéaires au choix.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Écouter & Pratiquer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 4: Wortschatz & Grammatik */}
          <div
            onClick={onGoToVocab}
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">Vocabulaire & Grammaire</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Fiches thématiques au format planche illustrée et diapositives interactives pour assimiler les déclinaisons sans effort.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Bibliothèques & Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="font-bold text-slate-700">
            DeutscheKlar · Plateforme d'apprentissage de l'allemand A1-A2
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onStartCourse('A1')}
              className="hover:text-slate-900 transition cursor-pointer"
            >
              A1 Lehrbuch
            </button>
            <button
              type="button"
              onClick={() => onStartCourse('A2')}
              className="hover:text-slate-900 transition cursor-pointer"
            >
              A2 Kurs
            </button>
            <button
              type="button"
              onClick={onGoToStories}
              className="hover:text-slate-900 transition cursor-pointer"
            >
              Hörgeschichten
            </button>
            <button
              type="button"
              onClick={onGoToVocab}
              className="hover:text-slate-900 transition cursor-pointer"
            >
              Wortschatz
            </button>
            <button
              type="button"
              onClick={onGoToGrammar}
              className="hover:text-slate-900 transition cursor-pointer"
            >
              Grammatik
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
