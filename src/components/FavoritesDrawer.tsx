import React, { useState, useEffect, useMemo } from 'react';
import { Star, X, Volume2, Trash2, Layers, Search, ArrowRight, Bookmark } from 'lucide-react';
import { getFavorites, toggleFavorite, clearFavorites, subscribeFavorites, FavoriteItem } from '../utils/studyProgress';
import { AudioButton } from './AudioButton';
import { FlashcardsView } from './FlashcardsView';
import { LanguageMode, VocabularyItem } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  languageMode: LanguageMode;
  onSelectPage: (pageNum: number) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  languageMode,
  onSelectPage,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [search, setSearch] = useState('');
  const [drillMode, setDrillMode] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    const unsubscribe = subscribeFavorites(() => {
      setFavorites(getFavorites());
    });
    return unsubscribe;
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return favorites;
    return favorites.filter(
      (f) =>
        f.de.toLowerCase().includes(q) ||
        (f.translation && f.translation.toLowerCase().includes(q))
    );
  }, [favorites, search]);

  const flashcardItems: VocabularyItem[] = useMemo(() => {
    return favorites.map((f) => ({
      de: f.de,
      ar: f.translation || '',
      en: f.translation || '',
      fr: f.translation || '',
      gender: f.gender,
      noteDe: `Modul ${f.chapterNumber} • Seite ${f.pageNumber}`,
    }));
  }, [favorites]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20 text-white backdrop-blur-xs">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-2">
                <span>Persönliche Merkliste</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  {favorites.length}
                </span>
              </h2>
              <p className="text-xs text-amber-100">
                Gezielt schwierige Begriffe & Redemittel wiederholen
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls & Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="In Merkliste filtern..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {favorites.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setDrillMode(!drillMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    drillMode
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{drillMode ? 'Listenansicht' : 'Karteikarten-Modus'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Möchtest du wirklich alle gemerkten Begriffe löschen?')) {
                      clearFavorites();
                    }
                  }}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Alle Einträge löschen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {favorites.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Deine Merkliste ist noch leer</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Tippe in den Lektionen auf das Stern-Symbol neben einem Wort oder Satz, um ihn hier zum gezielten Wiederholen zu speichern.
              </p>
            </div>
          ) : drillMode ? (
            <FlashcardsView vocabItems={flashcardItems} languageMode={languageMode} />
          ) : (
            <div className="space-y-2.5">
              {filtered.map((fav) => (
                <div
                  key={fav.id}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-2xs transition-all flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      {fav.gender && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                            fav.gender === 'der'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : fav.gender === 'die'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {fav.gender}
                        </span>
                      )}
                      <h4 className="font-bold text-slate-900 text-sm">{fav.de}</h4>
                    </div>

                    {fav.translation && (
                      <p
                        className={`text-xs text-slate-500 font-medium ${
                          languageMode === 'ar' ? 'font-arabic text-slate-700' : ''
                        }`}
                        dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {fav.translation}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <AudioButton text={fav.de} size="sm" />

                    <button
                      type="button"
                      onClick={() => {
                        onSelectPage(fav.pageNumber);
                        onClose();
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
                      title={`Zu Lektion (Seite ${fav.pageNumber}) springen`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(fav)}
                      className="p-1.5 rounded-lg text-amber-500 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                      title="Aus Merkliste entfernen"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
