import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { ContentSection, LanguageMode } from '../types';

interface RuleCardSectionProps {
  section: ContentSection;
  languageMode: LanguageMode;
  isCompact?: boolean;
}

export const RuleCardSection: React.FC<RuleCardSectionProps> = ({
  section,
  languageMode,
  isCompact = true,
}) => {
  const points = section.rulePoints || [];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-white border border-amber-200/80 p-5 sm:p-6 text-slate-900 shadow-sm" id="section-rules">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3.5 pb-3 border-b border-amber-200/60">
        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-tight">
            {section.titleDe}
          </h3>
          {languageMode !== 'none' && (
            <p
              className={`text-xs text-slate-600 mt-0.5 ${
                languageMode === 'ar' ? 'font-arabic text-slate-800 font-medium' : ''
              }`}
              dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
            >
              {languageMode === 'ar' && section.titleAr}
              {languageMode === 'en' && section.titleEn}
              {languageMode === 'fr' && section.titleFr}
            </p>
          )}
        </div>
      </div>

      {/* Points */}
      <div className="space-y-2">
        {points.map((pt, idx) => {
          const translation =
            languageMode === 'ar'
              ? pt.ar
              : languageMode === 'en'
              ? pt.en
              : languageMode === 'fr'
              ? pt.fr
              : null;

          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-amber-200/60 bg-white/95 space-y-1 shadow-2xs"
            >
              <div className="flex items-baseline gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 self-center" />
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {pt.de}
                </p>
              </div>

              {translation && languageMode !== 'none' && (
                <p
                  className={`text-xs text-slate-600 pl-3.5 font-medium ${
                    languageMode === 'ar' ? 'font-arabic text-slate-800' : ''
                  }`}
                  dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                >
                  {translation}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
