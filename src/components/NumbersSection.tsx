import React from 'react';
import { Hash, Sparkles } from 'lucide-react';
import { ContentSection, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';

interface NumbersSectionProps {
  section: ContentSection;
  languageMode: LanguageMode;
  isCompact?: boolean;
}

export const NumbersSection: React.FC<NumbersSectionProps> = ({
  section,
  languageMode,
  isCompact = true,
}) => {
  const items = section.numberItems || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id="section-numbers">
      <div className="px-5 py-4 bg-gradient-to-r from-blue-50 via-sky-50 to-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Hash className="w-4 h-4" />
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
        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-lg border border-blue-200">
          Zahlen 0–100
        </span>
      </div>

      {/* Grid of numbers */}
      <div className="p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
        {items.map((numItem, idx) => {
          const translation =
            languageMode === 'ar'
              ? numItem.wordAr
              : languageMode === 'en'
              ? numItem.wordEn
              : languageMode === 'fr'
              ? numItem.wordFr
              : null;

          return (
            <div
              key={idx}
              className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex flex-col justify-between group bg-white shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-extrabold text-blue-700 font-mono">
                  {numItem.num}
                </span>
                <AudioButton text={numItem.wordDe} size="sm" />
              </div>

              <div className="mt-2">
                <span className="font-bold text-slate-900 text-sm block">
                  {numItem.wordDe}
                </span>
                {translation && languageMode !== 'none' && (
                  <span
                    className={`text-xs text-slate-500 block ${
                      languageMode === 'ar' ? 'font-arabic text-slate-700' : ''
                    }`}
                    dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {translation}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
