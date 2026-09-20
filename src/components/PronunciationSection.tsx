import React from 'react';
import { Volume2, Sparkles, Mic } from 'lucide-react';
import { ContentSection, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';

interface PronunciationSectionProps {
  section: ContentSection;
  languageMode: LanguageMode;
  isCompact?: boolean;
}

export const PronunciationSection: React.FC<PronunciationSectionProps> = ({
  section,
  languageMode,
  isCompact = true,
}) => {
  const rules = section.pronunciationRules || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="section-pronunciation">
      <div className="px-5 py-4 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-tight">
              {section.titleDe}
            </h3>
            {languageMode !== 'none' && (
              <p
                className={`text-xs text-slate-500 mt-0.5 ${
                  languageMode === 'ar' ? 'font-arabic text-slate-700 font-medium' : ''
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
        <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100/80 px-2.5 py-1 rounded-lg border border-purple-200">
          Phonetik & Laute
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-3.5">
        {rules.map((rule, idx) => {
          const explanation =
            languageMode === 'ar'
              ? rule.arHint
              : languageMode === 'en'
              ? rule.enHint
              : languageMode === 'fr'
              ? rule.frHint
              : rule.sound;

          return (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-extrabold text-sm px-3 py-1 rounded-lg bg-purple-600 text-white shadow-2xs">
                  {rule.sound}
                </span>
                {languageMode !== 'none' && (
                  <span
                    className={`text-xs text-slate-600 font-medium ${
                      languageMode === 'ar' ? 'font-arabic text-slate-800' : ''
                    }`}
                    dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {explanation}
                  </span>
                )}
              </div>

              {/* Examples */}
              <div className="flex flex-wrap gap-2 pt-1">
                {rule.examples.map((ex, eIdx) => {
                  const word = typeof ex === 'string' ? ex : (ex as any)?.word || '';
                  const translation =
                    typeof ex === 'object' && ex !== null && 'translation' in ex
                      ? languageMode === 'ar'
                        ? (ex as any).translation?.ar
                        : languageMode === 'en'
                        ? (ex as any).translation?.en
                        : languageMode === 'fr'
                        ? (ex as any).translation?.fr
                        : null
                      : null;

                  return (
                    <div
                      key={eIdx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs hover:border-purple-300 transition-colors"
                    >
                      <span className="font-bold text-slate-900 text-sm">{word}</span>
                      {translation && languageMode !== 'none' && (
                        <span
                          className={`text-xs text-slate-500 font-medium ${
                            languageMode === 'ar' ? 'font-arabic text-slate-600' : ''
                          }`}
                          dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                        >
                          ({translation})
                        </span>
                      )}
                      <AudioButton text={word} size="sm" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
