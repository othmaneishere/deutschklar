import React, { useState, useEffect } from 'react';
import { Layers, LayoutGrid, Star } from 'lucide-react';
import { ContentSection, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';
import { FlashcardsView } from './FlashcardsView';
import { getFavorites, toggleFavorite, subscribeFavorites } from '../utils/studyProgress';

interface VocabularySectionProps {
  section: ContentSection;
  languageMode: LanguageMode;
  showTranslations: boolean;
  isCompact?: boolean;
}

export const VocabularySection: React.FC<VocabularySectionProps> = ({
  section,
  languageMode,
  showTranslations,
}) => {
  const items = section.vocabItems || [];
  const [viewMode, setViewMode] = useState<'cards' | 'flashcards'>('cards');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateFavs = () => {
      const favs = getFavorites();
      setFavoriteIds(new Set(favs.map((f) => f.id)));
    };
    updateFavs();
    return subscribeFavorites(updateFavs);
  }, []);

  if (items.length === 0) return null;

  const handleToggleFav = (item: any, translation: string | null) => {
    const safeDe = item?.de || '';
    const id = `vocab_${safeDe.toLowerCase().replace(/\s+/g, '_')}`;
    toggleFavorite({
      id,
      de: safeDe,
      translation: translation || undefined,
      gender: item.gender,
      chapterNumber: 1,
      pageNumber: 1,
    });
  };

  return (
    <div className="space-y-4" id="section-vocabulary">
      {/* Section Header with Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-white rounded-3xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-100">
            <Layers className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
                {section.titleDe}
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                {items.length} Wörter
              </span>
            </div>
            {languageMode !== 'none' && (
              <p
                className={`text-xs sm:text-sm text-slate-500 mt-0.5 ${
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

        {/* View Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/80 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-slate-500" />
            <span>Katalog</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('flashcards')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              viewMode === 'flashcards'
                ? 'bg-white text-blue-700 shadow-2xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Karteikarten</span>
          </button>
        </div>
      </div>

      {/* Render selected view */}
      {viewMode === 'flashcards' ? (
        <FlashcardsView vocabItems={items} languageMode={languageMode} />
      ) : (
        /* Spacious Vocabulary Grid: 1 col on mobile, 2 on medium, 3 on large wide screens */
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const translation =
              languageMode === 'ar'
                ? item.ar
                : languageMode === 'en'
                ? item.en
                : languageMode === 'fr'
                ? item.fr
                : null;

            const isFav = favoriteIds.has(`vocab_${item.de.toLowerCase().replace(/\s+/g, '_')}`);

            return (
              <div
                key={idx}
                className="group p-5 rounded-3xl bg-white hover:bg-slate-50/60 border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between gap-4 relative"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    {item.gender ? (
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
                          item.gender === 'der'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : item.gender === 'die'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {item.gender === 'der' ? 'm. · der' : item.gender === 'die' ? 'f. · die' : 'n. · das'}
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono font-bold text-slate-500 uppercase bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200/60">
                        Ausdruck
                      </span>
                    )}

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleFav(item, translation)}
                        className={`p-1.5 rounded-xl transition cursor-pointer ${
                          isFav
                            ? 'text-amber-500 bg-amber-50'
                            : 'text-slate-300 hover:text-amber-500 hover:bg-amber-50/50'
                        }`}
                        title={isFav ? 'Aus Merkliste entfernen' : 'In Merkliste merken'}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                      <AudioButton text={item.de} size="sm" />
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl leading-snug tracking-tight">
                    {item.de}
                  </h3>

                  {item.noteDe && (
                    <span className="text-xs text-slate-500 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg inline-block">
                      {item.noteDe}
                    </span>
                  )}
                </div>

                {/* Translation Display */}
                {showTranslations && languageMode !== 'none' && translation && (
                  <div
                    className={`pt-3 border-t border-slate-100 ${
                      languageMode === 'ar' ? 'font-arabic text-right' : ''
                    }`}
                    dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <span className="text-sm font-semibold text-slate-700 leading-normal block">
                      {translation}
                    </span>
                    {item.noteAr && languageMode === 'ar' && (
                      <span className="text-xs text-slate-500 block mt-0.5">
                        {item.noteAr}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
