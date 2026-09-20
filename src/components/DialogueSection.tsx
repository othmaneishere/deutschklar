import React, { useState, useEffect } from 'react';
import { MessageSquare, Play, Square, UserCheck, Star } from 'lucide-react';
import { ContentSection, LanguageMode } from '../types';
import { AudioButton } from './AudioButton';
import { speakGerman, stopSpeech } from '../utils/speech';
import { getFavorites, toggleFavorite, subscribeFavorites } from '../utils/studyProgress';

interface DialogueSectionProps {
  section: ContentSection;
  languageMode: LanguageMode;
  showTranslations: boolean;
  isCompact?: boolean;
}

export const DialogueSection: React.FC<DialogueSectionProps> = ({
  section,
  languageMode,
  showTranslations,
}) => {
  const lines = section.dialogueLines || [];
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [roleplayMode, setRoleplayMode] = useState<boolean>(false);
  const [revealedRoles, setRevealedRoles] = useState<Set<number>>(new Set());
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateFavs = () => {
      const favs = getFavorites();
      setFavoriteIds(new Set(favs.map((f) => f.id)));
    };
    updateFavs();
    return subscribeFavorites(updateFavs);
  }, []);

  const handleToggleFav = (line: any, translation: string | null) => {
    const id = `dialogue_${line.textDe.slice(0, 30).toLowerCase().replace(/\s+/g, '_')}`;
    toggleFavorite({
      id,
      de: line.textDe,
      translation: translation || undefined,
      chapterNumber: 1,
      pageNumber: 1,
      category: `Dialog (${line.speaker})`,
    });
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      stopSpeech();
      setIsPlayingAll(false);
      setActiveLineIndex(null);
      return;
    }

    setIsPlayingAll(true);
    let index = 0;

    const playNext = () => {
      if (index >= lines.length) {
        setIsPlayingAll(false);
        setActiveLineIndex(null);
        return;
      }

      setActiveLineIndex(index);
      speakGerman(lines[index].textDe, () => {
        index++;
        if (index < lines.length) {
          setTimeout(playNext, 450);
        } else {
          setIsPlayingAll(false);
          setActiveLineIndex(null);
        }
      });
    };

    playNext();
  };

  const toggleRevealRole = (index: number) => {
    setRevealedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  if (lines.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden" id="section-dialogue">
      {/* Dialogue Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold border border-teal-100">
            <MessageSquare className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-tight">
              {section.titleDe}
            </h3>
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

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Roleplay toggle */}
          <button
            type="button"
            onClick={() => {
              setRoleplayMode(!roleplayMode);
              setRevealedRoles(new Set());
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
              roleplayMode
                ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-600" />
            <span>{roleplayMode ? 'Rolle B (Verdeckt)' : 'Rollen-Übung'}</span>
          </button>

          {/* Audio Player Button */}
          <button
            type="button"
            onClick={handlePlayAll}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs ${
              isPlayingAll
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isPlayingAll ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stopp</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                <span>Dialog anhören</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Roleplay instructions */}
      {roleplayMode && (
        <div className="bg-amber-50 px-6 py-3 border-b border-amber-200 text-xs sm:text-sm text-amber-900 font-medium">
          🎙️ Du sprichst die Rolle von Sprecher B. Lies laut vor und tippe anschließend zum Aufdecken deiner Zeile.
        </div>
      )}

      {/* Chat Bubbles */}
      <div className="p-6 sm:p-8 space-y-4 bg-slate-50/40">
        {lines.map((line, idx) => {
          const isA =
            line.speaker.toUpperCase().includes('A') ||
            line.speaker.includes('Kellner') ||
            line.speaker.includes('Herr') ||
            idx % 2 === 0;

          const isActiveLine = activeLineIndex === idx;
          const isHiddenByRoleplay = roleplayMode && !isA && !revealedRoles.has(idx);

          const translation =
            languageMode === 'ar'
              ? line.textAr
              : languageMode === 'en'
              ? line.textEn
              : languageMode === 'fr'
              ? line.textFr
              : null;

          const isFav = favoriteIds.has(`dialogue_${line.textDe.slice(0, 30).toLowerCase().replace(/\s+/g, '_')}`);

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl transition-all border ${
                isActiveLine
                  ? 'bg-indigo-50/90 border-indigo-400 ring-2 ring-indigo-400 shadow-md'
                  : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {/* Speaker Avatar Pill */}
                  <div
                    className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center font-extrabold text-xs shadow-2xs ${
                      isA
                        ? 'bg-slate-900 text-white'
                        : 'bg-teal-700 text-white'
                    }`}
                  >
                    {line.speaker.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {line.speaker}
                      </span>
                    </div>

                    {/* German text / Hidden in roleplay */}
                    {isHiddenByRoleplay ? (
                      <button
                        type="button"
                        onClick={() => toggleRevealRole(idx)}
                        className="text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-100/90 px-3.5 py-2 rounded-xl cursor-pointer border border-amber-300"
                      >
                        Tippen zum Aufdecken & Kontrollieren
                      </button>
                    ) : (
                      <p className="text-slate-900 font-semibold text-lg sm:text-xl leading-relaxed">
                        {line.textDe}
                      </p>
                    )}

                    {/* Translation */}
                    {languageMode !== 'none' && !isHiddenByRoleplay && showTranslations && (
                      <p
                        className={`text-sm text-slate-600 font-medium pt-1 ${
                          languageMode === 'ar' ? 'font-arabic text-slate-700 text-base text-right' : ''
                        }`}
                        dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {translation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pt-1">
                  <button
                    type="button"
                    onClick={() => handleToggleFav(line, translation)}
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      isFav
                        ? 'text-amber-500 bg-amber-50'
                        : 'text-slate-300 hover:text-amber-500 hover:bg-amber-50/50'
                    }`}
                    title={isFav ? 'Aus Merkliste entfernen' : 'In Merkliste merken'}
                  >
                    <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                  <AudioButton text={line.textDe} size="sm" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
