import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Clock,
  Square,
  BookMarked,
  ArrowRight,
} from 'lucide-react';
import { GERMAN_STORIES } from '../data/germanStoriesData';
import { LanguageMode } from '../types';
import { speakGerman, stopSpeech } from '../utils/speech';
import { AudioButton } from './AudioButton';

interface GermanStoriesSectionProps {
  languageMode: LanguageMode;
  onOpenFullLounge?: () => void;
}

export const GermanStoriesSection: React.FC<GermanStoriesSectionProps> = ({
  languageMode,
  onOpenFullLounge,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [playingSentenceId, setPlayingSentenceId] = useState<number | null>(null);
  const [translationMode, setTranslationMode] = useState<'interlinear' | 'end_of_story' | 'hidden'>('interlinear');

  const story = GERMAN_STORIES[activeStoryIndex] || GERMAN_STORIES[0];

  const handlePlayEntireStory = () => {
    if (isPlayingFull) {
      stopSpeech();
      setIsPlayingFull(false);
      setPlayingSentenceId(null);
      return;
    }

    setIsPlayingFull(true);
    let index = 0;

    const playNext = () => {
      if (index >= story.sentences.length) {
        setIsPlayingFull(false);
        setPlayingSentenceId(null);
        return;
      }

      const currentSentence = story.sentences[index];
      setPlayingSentenceId(currentSentence.id);

      speakGerman(currentSentence.de, () => {
        index++;
        if (index < story.sentences.length) {
          setTimeout(playNext, 450);
        } else {
          setIsPlayingFull(false);
          setPlayingSentenceId(null);
        }
      });
    };

    playNext();
  };

  const getLocalizedTitle = () => {
    if (languageMode === 'ar') return story.titleAr;
    if (languageMode === 'fr') return story.titleFr;
    if (languageMode === 'en') return story.titleEn;
    return null;
  };

  const getLocalizedSentence = (sentence: typeof story.sentences[0]) => {
    if (languageMode === 'ar') return sentence.ar;
    if (languageMode === 'fr') return sentence.fr;
    if (languageMode === 'en') return sentence.en;
    return null;
  };

  return (
    <section className="space-y-4 pt-4" id="section-german-stories">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
                Hörgeschichten & Lesestücke
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                A1 Didaktik
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {languageMode === 'ar'
                ? 'قصص قصيرة ونصوص قرائية للمستوى المبتدئ مع صوت نقي'
                : languageMode === 'fr'
                ? 'Courts textes de lecture avec prononciation claire et traductions'
                : languageMode === 'en'
                ? 'Short reading passages with clear audio and parallel translations'
                : 'Didaktische Lesestücke mit Sprachausgabe'}
            </p>
          </div>
        </div>

        {onOpenFullLounge && (
          <button
            type="button"
            onClick={onOpenFullLounge}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer self-start sm:self-auto shadow-2xs"
          >
            <span>Alle Geschichten</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Story Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Story tabs for quick selection */}
        <div className="flex items-center gap-2 p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto scrollbar-thin">
          {GERMAN_STORIES.slice(0, 4).map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveStoryIndex(idx);
                stopSpeech();
                setIsPlayingFull(false);
                setPlayingSentenceId(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeStoryIndex === idx
                  ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  item.level === 'A1'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {item.level}
              </span>
              <span>{item.titleDe}</span>
            </button>
          ))}
        </div>

        {/* Story controls bar */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h3 className="font-extrabold text-lg text-slate-900">
                {story.titleDe}
              </h3>
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {story.duration}
              </span>
            </div>
            {languageMode !== 'none' && (
              <p
                className={`text-xs sm:text-sm text-slate-600 ${
                  languageMode === 'ar' ? 'font-arabic text-slate-700 font-medium' : ''
                }`}
                dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
              >
                {getLocalizedTitle()}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Play all button */}
            <button
              type="button"
              onClick={handlePlayEntireStory}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-2xs ${
                isPlayingFull
                  ? 'bg-rose-600 text-white hover:bg-rose-700'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isPlayingFull ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stoppen</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Vollständig anhören</span>
                </>
              )}
            </button>

            {/* Translation mode pills */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setTranslationMode('interlinear')}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition ${
                  translationMode === 'interlinear'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Zeilen
              </button>
              <button
                type="button"
                onClick={() => setTranslationMode('end_of_story')}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition ${
                  translationMode === 'end_of_story'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ende
              </button>
              <button
                type="button"
                onClick={() => setTranslationMode('hidden')}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition ${
                  translationMode === 'hidden'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Aus
              </button>
            </div>
          </div>
        </div>

        {/* Story Sentences */}
        <div className="p-6 sm:p-8 space-y-4 bg-white">
          {translationMode === 'interlinear' && (
            <div className="space-y-3">
              {story.sentences.map((sentence) => {
                const isPlaying = playingSentenceId === sentence.id;
                const trans = getLocalizedSentence(sentence);

                return (
                  <div
                    key={sentence.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                      isPlaying
                        ? 'bg-indigo-50/70 border-indigo-300'
                        : 'bg-slate-50/40 hover:bg-slate-50/80 border-slate-200/80'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <p className="text-slate-900 font-semibold text-base sm:text-lg leading-relaxed">
                        {sentence.de}
                      </p>
                      {languageMode !== 'none' && trans && (
                        <p
                          className={`text-xs sm:text-sm text-slate-600 ${
                            languageMode === 'ar' ? 'font-arabic text-slate-700 font-medium text-right' : ''
                          }`}
                          dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                        >
                          {trans}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 pt-0.5">
                      <AudioButton text={sentence.de} size="sm" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {translationMode === 'end_of_story' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-200/80">
                <p className="text-slate-900 text-lg sm:text-xl font-medium leading-loose">
                  {story.sentences.map((s) => s.de).join(' ')}
                </p>
              </div>

              {languageMode !== 'none' && (
                <div
                  className={`p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 ${
                    languageMode === 'ar' ? 'font-arabic text-right' : ''
                  }`}
                  dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                >
                  <span className="text-xs uppercase font-mono font-bold tracking-wider text-amber-800 block mb-2">
                    Übersetzung
                  </span>
                  <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                    {story.sentences.map((s) => getLocalizedSentence(s)).join(' ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {translationMode === 'hidden' && (
            <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-200/80">
              <p className="text-slate-900 text-lg sm:text-xl font-medium leading-loose">
                {story.sentences.map((s) => s.de).join(' ')}
              </p>
            </div>
          )}

          {/* Key Vocabulary Pills */}
          {story.keyVocabulary && story.keyVocabulary.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Schlüsselwörter aus dieser Geschichte
              </span>
              <div className="flex flex-wrap gap-2">
                {story.keyVocabulary.map((word, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800"
                  >
                    <span>{word.de}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 font-normal">
                      {languageMode === 'ar'
                        ? word.ar
                        : languageMode === 'fr'
                        ? word.fr
                        : word.en}
                    </span>
                    <AudioButton text={word.de} size="xs" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
