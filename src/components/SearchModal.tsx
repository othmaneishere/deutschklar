import React, { useState, useMemo } from 'react';
import { Search, X, Volume2, ArrowRight } from 'lucide-react';
import { CoursePage, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPages: CoursePage[];
  languageMode: LanguageMode;
  onSelectPage: (pageNumber: number) => void;
}

interface SearchResult {
  pageNumber: number;
  chapterTitle: string;
  pageTitle: string;
  matchType: 'vocab' | 'section' | 'exercise';
  textDe: string;
  translation?: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allPages,
  languageMode,
  onSelectPage,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const found: SearchResult[] = [];

    allPages.forEach((page) => {
      // Check page title
      if (
        page.pageTitleDe.toLowerCase().includes(q) ||
        (languageMode === 'ar' && page.pageTitleAr.toLowerCase().includes(q)) ||
        (languageMode === 'en' && page.pageTitleEn.toLowerCase().includes(q)) ||
        (languageMode === 'fr' && page.pageTitleFr.toLowerCase().includes(q))
      ) {
        found.push({
          pageNumber: page.pageNumber,
          chapterTitle: page.chapterTitleDe,
          pageTitle: page.pageTitleDe,
          matchType: 'section',
          textDe: page.pageTitleDe,
          translation:
            languageMode === 'ar'
              ? page.pageTitleAr
              : languageMode === 'en'
              ? page.pageTitleEn
              : languageMode === 'fr'
              ? page.pageTitleFr
              : undefined,
        });
      }

      // Check sections and vocab
      page.sections.forEach((sec) => {
        if (sec.vocabItems) {
          sec.vocabItems.forEach((v) => {
            const matchDe = v.de.toLowerCase().includes(q);
            const matchAr = v.ar.toLowerCase().includes(q);
            const matchEn = v.en.toLowerCase().includes(q);
            const matchFr = v.fr.toLowerCase().includes(q);

            if (matchDe || matchAr || matchEn || matchFr) {
              found.push({
                pageNumber: page.pageNumber,
                chapterTitle: page.chapterTitleDe,
                pageTitle: page.pageTitleDe,
                matchType: 'vocab',
                textDe: v.de,
                translation:
                  languageMode === 'ar'
                    ? v.ar
                    : languageMode === 'en'
                    ? v.en
                    : languageMode === 'fr'
                    ? v.fr
                    : undefined,
              });
            }
          });
        }

        if (sec.dialogueLines) {
          sec.dialogueLines.forEach((line) => {
            if (
              line.textDe.toLowerCase().includes(q) ||
              line.textAr.toLowerCase().includes(q) ||
              line.textEn.toLowerCase().includes(q) ||
              line.textFr.toLowerCase().includes(q)
            ) {
              found.push({
                pageNumber: page.pageNumber,
                chapterTitle: page.chapterTitleDe,
                pageTitle: page.pageTitleDe,
                matchType: 'vocab',
                textDe: `${line.speaker}: ${line.textDe}`,
                translation:
                  languageMode === 'ar'
                    ? line.textAr
                    : languageMode === 'en'
                    ? line.textEn
                    : languageMode === 'fr'
                    ? line.textFr
                    : undefined,
              });
            }
          });
        }
      });
    });

    return found.slice(0, 20); // Cap results for fast display
  }, [query, allPages, languageMode]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="bg-white text-slate-900 rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Wort, Begriff oder Phrase suchen..."
            className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm font-medium"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-1.5 flex-1 divide-y divide-slate-100">
          {query.trim().length < 2 && (
            <div className="py-10 text-center text-slate-400 text-xs">
              Gib mindestens 2 Buchstaben ein, um das gesamte Lehrwerk zu durchsuchen.
            </div>
          )}

          {query.trim().length >= 2 && results.length === 0 && (
            <div className="py-10 text-center text-slate-500 text-sm">
              Keine Treffer für „{query}“ im Lehrwerk gefunden.
            </div>
          )}

          {results.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectPage(item.pageNumber);
                onClose();
              }}
              className="pt-2 first:pt-0 group flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/60 transition cursor-pointer border border-transparent hover:border-indigo-100"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                    {item.textDe}
                  </span>
                  <AudioButton text={item.textDe} size="sm" />
                </div>
                {item.translation && languageMode !== 'none' && (
                  <p
                    className={`text-xs text-slate-500 font-medium ${
                      languageMode === 'ar' ? 'font-arabic text-slate-700' : ''
                    }`}
                    dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {item.translation}
                  </p>
                )}
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                  <span className="font-medium text-slate-500">{item.chapterTitle}</span>
                  <span>·</span>
                  <span>{item.pageTitle}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                <span>Öffnen</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
