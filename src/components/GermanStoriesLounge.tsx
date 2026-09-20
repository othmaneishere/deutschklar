import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Square,
  Play,
  RotateCcw,
  BookOpen,
  Languages,
  Clock,
  Tag,
  CheckCircle2,
  Layers,
  Search,
  BookMarked,
  SlidersHorizontal,
  Lock,
} from 'lucide-react';
import { LanguageMode } from '../types';
import { GERMAN_STORIES, GermanStory, StorySentence } from '../data/germanStoriesData';
import {
  speakGerman,
  stopSpeech,
  subscribeSpeechState,
  getPlaybackSpeed,
  setPlaybackSpeed,
  getSelectedVoice,
} from '../utils/speech';

interface GermanStoriesLoungeProps {
  languageMode: LanguageMode;
  onSwitchToCourse?: () => void;
  onOpenAudioSettings?: () => void;
  onOpenLevelComingSoon?: (level: 'A2' | 'B1') => void;
}

export const GermanStoriesLounge: React.FC<GermanStoriesLoungeProps> = ({
  languageMode,
  onSwitchToCourse,
  onOpenAudioSettings,
  onOpenLevelComingSoon,
}) => {
  const [stories] = useState<GermanStory[]>(GERMAN_STORIES);
  const [activeStoryId, setActiveStoryId] = useState<string>(GERMAN_STORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'A1' | 'A2'>('all');
  const [translationMode, setTranslationMode] = useState<'interlinear' | 'end_of_story' | 'hidden'>('interlinear');
  const [currentlyPlayingSentenceId, setCurrentlyPlayingSentenceId] = useState<string | null>(null);
  const [isFullPlaying, setIsFullPlaying] = useState<boolean>(false);
  const [currentSpeed, setCurrentSpeed] = useState<number>(getPlaybackSpeed());
  const [currentVoice, setCurrentVoice] = useState<string>(getSelectedVoice());

  const activeStory = stories.find((s) => s.id === activeStoryId) || stories[0];

  useEffect(() => {
    const unsub = subscribeSpeechState((state) => {
      setCurrentSpeed(state.speed);
      setCurrentVoice(state.voice);
      if (!state.isPlaying) {
        setCurrentlyPlayingSentenceId(null);
        setIsFullPlaying(false);
      }
    });
    return () => {
      unsub();
      stopSpeech();
    };
  }, []);

  const handlePlayFullStory = () => {
    if (isFullPlaying) {
      stopSpeech();
      setIsFullPlaying(false);
      setCurrentlyPlayingSentenceId(null);
      return;
    }

    setIsFullPlaying(true);
    speakGerman(activeStory.fullStoryDe, () => {
      setIsFullPlaying(false);
      setCurrentlyPlayingSentenceId(null);
    });
  };

  const handlePlaySentence = (sentence: StorySentence) => {
    if (currentlyPlayingSentenceId === sentence.id) {
      stopSpeech();
      setCurrentlyPlayingSentenceId(null);
      setIsFullPlaying(false);
      return;
    }

    setCurrentlyPlayingSentenceId(sentence.id);
    setIsFullPlaying(false);
    speakGerman(sentence.de, () => {
      setCurrentlyPlayingSentenceId(null);
    });
  };

  const handleSelectSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    setCurrentSpeed(speed);
  };

  const filteredStories = stories.filter((story) => {
    if (levelFilter !== 'all' && story.level !== levelFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        story.titleDe.toLowerCase().includes(q) ||
        story.summaryDe.toLowerCase().includes(q) ||
        story.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getLocalizedTitle = (story: GermanStory): string => {
    if (languageMode === 'ar') return story.titleAr;
    if (languageMode === 'fr') return story.titleFr;
    if (languageMode === 'en') return story.titleEn;
    return story.titleDe;
  };

  const getLocalizedSummary = (story: GermanStory): string => {
    if (languageMode === 'ar') return story.summaryAr;
    if (languageMode === 'fr') return story.summaryFr;
    if (languageMode === 'en') return story.summaryEn;
    return story.summaryDe;
  };

  const getLocalizedSentence = (s: StorySentence): string => {
    if (languageMode === 'ar') return s.ar;
    if (languageMode === 'fr') return s.fr;
    if (languageMode === 'en') return s.en;
    return '';
  };

  const getLocalizedFullStory = (story: GermanStory): string => {
    if (languageMode === 'ar') return story.fullStoryAr;
    if (languageMode === 'fr') return story.fullStoryFr;
    if (languageMode === 'en') return story.fullStoryEn;
    return '';
  };

  const bannerDescription: Record<LanguageMode, string> = {
    none: 'Kurze, didaktische Lesestücke mit klarer Sprachausgabe, Satz-für-Satz-Wiedergabe und flexibler Übersetzung.',
    en: 'Short German reading passages with authentic audio narration, sentence-by-sentence playback, and structured translations.',
    fr: 'Courts textes de lecture en allemand avec narration audio claire, écoute phrase par phrase et traduction structurée.',
    ar: 'نصوص قرائية وقصص ألمانية مع نطق صوتي واضح، إمكانية الاستماع جملة بجملة، وترجمات منظمة.',
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header Section */}
      <section className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                Hörgeschichten
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                A1 & Lesestücke
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                A2 Weitere in Vorbereitung
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              Deutsche Lesestücke mit Audio
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              {bannerDescription[languageMode]}
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            {onSwitchToCourse && (
              <button
                type="button"
                onClick={onSwitchToCourse}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>A1 Lehrbuch</span>
              </button>
            )}

            {onOpenAudioSettings && (
              <button
                type="button"
                onClick={onOpenAudioSettings}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 transition border border-slate-200 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-slate-600" />
                <span>Audio-Optionen</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story Picker & Filter */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-700" />
                <span>Geschichten ({filteredStories.length})</span>
              </h2>
              <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                A1 / A2
              </span>
            </div>

            {/* Level selector */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setLevelFilter('all')}
                className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  levelFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Alle ({stories.length})
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter('A1')}
                className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  levelFilter === 'A1'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                A1
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter('A2')}
                className={`py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  levelFilter === 'A2'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                A2
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Thema oder Titel suchen..."
                className="w-full pl-9 pr-7 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Stories List */}
            <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredStories.map((story) => {
                const isSelected = story.id === activeStoryId;
                return (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => {
                      setActiveStoryId(story.id);
                      stopSpeech();
                      setIsFullPlaying(false);
                      setCurrentlyPlayingSentenceId(null);
                    }}
                    className={`w-full p-3 rounded-xl text-left transition flex items-start justify-between gap-2.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/80'
                    }`}
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : story.level === 'A1'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {story.level}
                        </span>
                        <span
                          className={`text-[10px] font-medium truncate ${
                            isSelected ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {story.category}
                        </span>
                      </div>

                      <h3
                        className={`text-xs font-bold truncate ${
                          isSelected ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {story.titleDe}
                      </h3>

                      {languageMode !== 'none' && (
                        <p
                          className={`text-[11px] truncate ${
                            isSelected ? 'text-slate-300' : 'text-slate-500'
                          } ${languageMode === 'ar' ? 'font-arabic' : ''}`}
                        >
                          {getLocalizedTitle(story)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0 pt-0.5">
                      <span
                        className={`text-[10px] font-mono ${
                          isSelected ? 'text-slate-300' : 'text-slate-400'
                        }`}
                      >
                        {story.duration}
                      </span>
                    </div>
                  </button>
                );
              })}

              {filteredStories.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                  Keine Geschichten für diese Kriterien gefunden.
                </div>
              )}
            </div>

            {/* A2 Coming Soon Teaser */}
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-amber-900">A2 & B1 Audio-Geschichten</p>
                <p className="text-[11px] text-amber-700">Weitere Lesestücke folgen in Kürze.</p>
              </div>
              <button
                type="button"
                onClick={() => onOpenLevelComingSoon && onOpenLevelComingSoon('A2')}
                className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] border border-amber-300 transition cursor-pointer shrink-0"
              >
                Vorschau
              </button>
            </div>
          </div>
        </aside>

        {/* Right Column: Active Story Reader & Player */}
        <main className="lg:col-span-8 space-y-4">
          <article className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
            {/* Story Top Bar */}
            <div className="p-5 sm:p-6 border-b border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        activeStory.level === 'A1'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {activeStory.level}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {activeStory.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {activeStory.duration}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {activeStory.titleDe}
                  </h2>

                  {languageMode !== 'none' && (
                    <p
                      className={`text-sm text-slate-600 font-medium ${
                        languageMode === 'ar' ? 'font-arabic text-base text-right' : ''
                      }`}
                      dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                    >
                      {getLocalizedTitle(activeStory)}
                    </p>
                  )}
                </div>

                {/* Primary Audio Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePlayFullStory}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs ${
                      isFullPlaying
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {isFullPlaying ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Stoppen</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Komplette Geschichte</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Translation Display Mode Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold text-slate-700">
                    Übersetzungsansicht:
                  </span>
                </div>

                <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => setTranslationMode('interlinear')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      translationMode === 'interlinear'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Zeile für Zeile
                  </button>

                  <button
                    type="button"
                    onClick={() => setTranslationMode('end_of_story')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      translationMode === 'end_of_story'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Am Ende der Geschichte
                  </button>

                  <button
                    type="button"
                    onClick={() => setTranslationMode('hidden')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      translationMode === 'hidden'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Nur Deutsch
                  </button>
                </div>
              </div>
            </div>

            {/* Story Content Area */}
            <div className="p-5 sm:p-8 space-y-6">
              {/* Mode 1: Interlinear (Sentence by sentence) */}
              {translationMode === 'interlinear' && (
                <div className="space-y-4">
                  {activeStory.sentences.map((sentence, idx) => {
                    const isSentencePlaying = currentlyPlayingSentenceId === sentence.id;
                    const localized = getLocalizedSentence(sentence);

                    return (
                      <div
                        key={sentence.id}
                        className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                          isSentencePlaying
                            ? 'bg-slate-100 border-slate-400'
                            : 'bg-white hover:bg-slate-50/70 border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1.5 flex-1 min-w-0">
                            {/* German Sentence */}
                            <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                              <span className="font-mono text-xs text-slate-400 mr-2 select-none">
                                {idx + 1}.
                              </span>
                              {sentence.de}
                            </p>

                            {/* Translation Line */}
                            {languageMode !== 'none' && localized && (
                              <p
                                className={`text-sm text-slate-600 leading-normal pl-5 ${
                                  languageMode === 'ar' ? 'font-arabic text-base text-right text-slate-700' : ''
                                }`}
                                dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                              >
                                {localized}
                              </p>
                            )}
                          </div>

                          {/* Individual Play Button */}
                          <button
                            type="button"
                            onClick={() => handlePlaySentence(sentence)}
                            className={`p-2 rounded-xl transition cursor-pointer shrink-0 border ${
                              isSentencePlaying
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                            }`}
                            title="Diesen Satz anhören"
                          >
                            {isSentencePlaying ? (
                              <Square className="w-3.5 h-3.5 fill-current" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Mode 2: End of Story */}
              {translationMode === 'end_of_story' && (
                <div className="space-y-6">
                  {/* German Paragraph */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Deutscher Text
                      </span>
                      <button
                        type="button"
                        onClick={handlePlayFullStory}
                        className="text-xs text-slate-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Anhören</span>
                      </button>
                    </div>

                    <p className="text-base sm:text-lg text-slate-900 font-medium leading-loose">
                      {activeStory.fullStoryDe}
                    </p>
                  </div>

                  {/* Complete Translation at End */}
                  {languageMode !== 'none' && (
                    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {languageMode === 'ar'
                            ? 'الترجمة الكاملة للقصة'
                            : languageMode === 'fr'
                            ? 'Traduction complète du texte'
                            : 'Full Story Translation'}
                        </span>
                      </div>

                      <p
                        className={`text-sm sm:text-base text-slate-700 leading-loose ${
                          languageMode === 'ar' ? 'font-arabic text-base text-right font-medium' : ''
                        }`}
                        dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {getLocalizedFullStory(activeStory)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Mode 3: German Only */}
              {translationMode === 'hidden' && (
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Lesetext (Reines Deutsch)
                    </span>
                    <button
                      type="button"
                      onClick={handlePlayFullStory}
                      className="text-xs text-slate-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Anhören</span>
                    </button>
                  </div>

                  <p className="text-lg sm:text-xl text-slate-900 font-medium leading-loose">
                    {activeStory.fullStoryDe}
                  </p>
                </div>
              )}

              {/* Important Vocabulary Highlight Box */}
              {activeStory.keyVocabulary && activeStory.keyVocabulary.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-slate-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Schlüsselwörter aus der Geschichte
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {activeStory.keyVocabulary.length} Vokabeln
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeStory.keyVocabulary.map((vocab, vIdx) => {
                      const vocabTrans =
                        languageMode === 'ar'
                          ? vocab.ar
                          : languageMode === 'fr'
                          ? vocab.fr
                          : vocab.en;

                      return (
                        <div
                          key={vIdx}
                          className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 block truncate">
                              {vocab.de}
                            </span>
                            {languageMode !== 'none' && (
                              <span
                                className={`text-slate-500 block truncate text-[11px] ${
                                  languageMode === 'ar' ? 'font-arabic text-right' : ''
                                }`}
                                dir={languageMode === 'ar' ? 'rtl' : 'ltr'}
                              >
                                {vocabTrans}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => speakGerman(vocab.de)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer shrink-0"
                            title="Anhören"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
