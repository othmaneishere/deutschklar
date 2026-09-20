import React from 'react';
import { Clock, Lock, Sparkles, X, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { LanguageMode } from '../types';

interface A2ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  languageMode: LanguageMode;
  levelRequested?: 'A2' | 'B1';
}

export const A2ComingSoonModal: React.FC<A2ComingSoonModalProps> = ({
  isOpen,
  onClose,
  languageMode,
  levelRequested = 'A2',
}) => {
  if (!isOpen) return null;

  const content = {
    title: {
      none: `Niveau ${levelRequested} – Demnächst verfügbar`,
      en: `Level ${levelRequested} – Coming Soon`,
      fr: `Niveau ${levelRequested} – Bientôt disponible`,
      ar: `المستوى ${levelRequested} – قريباً جداً`,
    },
    subtitle: {
      none: `Derzeit konzentriert sich dieser Kurs vollständig auf das Niveau A1 (Grundstufe). Die Module für ${levelRequested} befinden sich in der didaktischen Aufbereitung.`,
      en: `This course currently focuses entirely on Level A1 (Beginner). Curated modules for ${levelRequested} are currently in editorial production.`,
      fr: `Ce cours est actuellement entièrement dédié au niveau A1 (Débutant). Les modules pour le niveau ${levelRequested} sont en cours de préparation pédagogique.`,
      ar: `يركز هذا المنهج حالياً بشكل كامل ومكثف على المستوى التأسيسي A1. وحدات المستوى ${levelRequested} قيد الإعداد التعليمي والتدقيق اللغوي وستتاح قريباً.`,
    },
    badge: {
      none: 'In redaktioneller Vorbereitung',
      en: 'In Editorial Production',
      fr: 'En cours de rédaction',
      ar: 'قيد الإعداد المنهجي',
    },
    features: [
      {
        de: 'Vertiefende Grammatik (Nebensätze mit weil/dass, Perfekt & Präteritum)',
        en: 'Advanced grammar (subordinate clauses with weil/dass, Perfekt & Präteritum)',
        fr: 'Grammaire approfondie (propositions subordonnées avec weil/dass, Perfekt & Präteritum)',
        ar: 'قواعد معمقة (الجمل الجانبية مع weil/dass، الماضي التام والبسيط)',
      },
      {
        de: 'Praxisorientierte Hörgeschichten & Dialoge für Fortgeschrittene',
        en: 'Practical audio stories & advanced daily dialogues',
        fr: 'Histoires audio pratiques et dialogues quotidiens avancés',
        ar: 'قصص استماع واقعية وحوارات يومية للمستوى المتوسط',
      },
      {
        de: 'Interaktive Übungssätze mit automatischer Sofortauswertung',
        en: 'Interactive practice exercises with instant feedback',
        fr: 'Exercices interactifs avec validation immédiate',
        ar: 'تمارين تفاعلية متطورة مع تصحيح فوري',
      },
    ],
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner header */}
        <div className="px-6 py-6 bg-slate-900 text-white flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 tracking-wider">
                  Demnächst / Coming Soon
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Niveau {levelRequested}
                </span>
              </div>
              <h3 className="font-extrabold text-lg sm:text-xl text-white">
                {content.title[languageMode]}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5">
          <p className={`text-sm text-slate-600 leading-relaxed ${languageMode === 'ar' ? 'font-arabic text-right' : ''}`} dir={languageMode === 'ar' ? 'rtl' : 'ltr'}>
            {content.subtitle[languageMode]}
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Inhalte in Vorbereitung:</span>
            </div>

            <div className="space-y-2">
              {content.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className={languageMode === 'ar' ? 'font-arabic' : ''}>
                    {languageMode === 'ar' ? feat.ar : languageMode === 'fr' ? feat.fr : languageMode === 'en' ? feat.en : feat.de}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Current A1 CTA */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-500">
              <span className="font-bold text-slate-800">Aktuell verfügbar:</span> A1 (19 Kapitel)
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <span>A1 Lektionen fortsetzen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
