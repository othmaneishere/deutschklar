import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  Volume2,
  VolumeX,
  Filter,
  Sparkles,
  Layers,
  ArrowRight,
  GraduationCap,
  Star,
  Copy,
  Check,
  Eye,
  EyeOff,
  Play,
  Square,
  RotateCcw,
  Trophy,
  LayoutGrid,
  Table as TableIcon,
  Gamepad2,
  CheckCircle2,
  XCircle,
  X,
  ChevronRight,
  Utensils,
  Home,
  Briefcase,
  Activity,
  Car,
  ShoppingBag,
  Landmark,
  Users,
  Smile,
  Plane,
  Sun,
  Heart,
  Smartphone,
  Compass,
  Shuffle,
  Bookmark,
} from 'lucide-react';
import { AUDITED_VOCAB_THEMES, VocabTheme, VocabCard } from '../data/vocabThemesData';
import { LanguageMode } from '../types';
import { speakGerman, stopSpeech, setPlaybackSpeed, getPlaybackSpeed } from '../utils/speech';

interface VocabularyLibraryProps {
  languageMode: LanguageMode;
  onSelectWord?: (word: string) => void;
  onNavigateToCourse?: (level: 'A1' | 'A2') => void;
}

type ViewMode = 'cards' | 'table' | 'trainer';
type ArticleFilter = 'all' | 'der' | 'die' | 'das';

const THEME_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Utensils,
  Home,
  Briefcase,
  Activity,
  Car,
  ShoppingBag,
  Landmark,
  Users,
  Smile,
  Plane,
  Sun,
  Heart,
  Smartphone,
  GraduationCap,
  Compass,
};

export const VocabularyLibrary: React.FC<VocabularyLibraryProps> = ({
  languageMode,
  onNavigateToCourse,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(AUDITED_VOCAB_THEMES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'A1' | 'A2'>('all');
  const [articleFilter, setArticleFilter] = useState<ArticleFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [hideTranslations, setHideTranslations] = useState<boolean>(false);
  const [revealedCardIds, setRevealedCardIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSlowAudio, setIsSlowAudio] = useState<boolean>(false);

  // Favorites (persisted in localStorage)
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('deutsch_vocab_favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  // Autoplay Playlist State
  const [isPlayingPlaylist, setIsPlayingPlaylist] = useState<boolean>(false);
  const [playlistIndex, setPlaylistIndex] = useState<number>(0);
  const playlistTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Der-Die-Das Trainer State
  const [trainerIndex, setTrainerIndex] = useState<number>(0);
  const [trainerScore, setTrainerScore] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0,
  });
  const [trainerAnswerState, setTrainerAnswerState] = useState<{
    selected: 'der' | 'die' | 'das' | null;
    isCorrect: boolean | null;
  }>({ selected: null, isCorrect: null });
  const [trainerModeAllThemes, setTrainerModeAllThemes] = useState<boolean>(false);

  // Save favorites to localStorage
  const toggleFavorite = (cardId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }
      try {
        localStorage.setItem('deutsch_vocab_favorites', JSON.stringify(Array.from(next)));
      } catch (err) {
        console.error('Failed to save favorites:', err);
      }
      return next;
    });
  };

  // Copy word to clipboard
  const handleCopy = (card: VocabCard, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${card.de}${card.plural ? ` (${card.plural})` : ''} - ${getTranslation(card)}\nBeispiel: ${card.exampleDe}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Toggle slow audio
  const handleToggleSlowAudio = () => {
    const newSlow = !isSlowAudio;
    setIsSlowAudio(newSlow);
    setPlaybackSpeed(newSlow ? 0.75 : 1.0);
  };

  // Filter themes by level
  const filteredThemes = useMemo(() => {
    return AUDITED_VOCAB_THEMES.filter((t) => {
      if (levelFilter !== 'all' && t.level !== levelFilter) return false;
      return true;
    });
  }, [levelFilter]);

  const activeTheme = useMemo(() => {
    return (
      filteredThemes.find((t) => t.id === selectedThemeId) ||
      filteredThemes[0] ||
      AUDITED_VOCAB_THEMES[0]
    );
  }, [filteredThemes, selectedThemeId]);

  // Categories in the active theme
  const categoriesInActiveTheme = useMemo(() => {
    const cats = new Set<string>();
    activeTheme.cards.forEach((c) => {
      if (c.category) cats.add(c.category);
    });
    return Array.from(cats);
  }, [activeTheme]);

  // All cards across all themes (for search or trainer)
  const allCards = useMemo(() => {
    return AUDITED_VOCAB_THEMES.flatMap((t) => t.cards);
  }, []);

  // Filtered Cards
  const filteredCards = useMemo(() => {
    // If showOnlyFavorites is true, search across all themes or active theme
    const sourceCards = showOnlyFavorites
      ? allCards.filter((c) => favorites.has(c.id))
      : activeTheme.cards;

    return sourceCards.filter((card) => {
      // Article filter
      if (articleFilter !== 'all') {
        if (card.article !== articleFilter) return false;
      }

      // Category filter
      if (!showOnlyFavorites && selectedCategory !== 'all' && card.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        card.de.toLowerCase().includes(q) ||
        (card.plural && card.plural.toLowerCase().includes(q)) ||
        card.ar.includes(q) ||
        card.en.toLowerCase().includes(q) ||
        card.fr.toLowerCase().includes(q) ||
        card.exampleDe.toLowerCase().includes(q) ||
        card.exampleAr.includes(q) ||
        card.exampleEn.toLowerCase().includes(q) ||
        card.exampleFr.toLowerCase().includes(q) ||
        (card.category && card.category.toLowerCase().includes(q))
      );
    });
  }, [
    showOnlyFavorites,
    allCards,
    favorites,
    activeTheme.cards,
    articleFilter,
    selectedCategory,
    searchQuery,
  ]);

  // Total words count
  const totalWordsCount = useMemo(() => {
    return AUDITED_VOCAB_THEMES.reduce((acc, t) => acc + t.cards.length, 0);
  }, []);

  // Translations
  const getTranslation = (card: VocabCard) => {
    if (languageMode === 'ar') return card.ar;
    if (languageMode === 'en') return card.en;
    if (languageMode === 'fr') return card.fr;
    return card.en || card.ar;
  };

  const getExampleTranslation = (card: VocabCard) => {
    if (languageMode === 'ar') return card.exampleAr;
    if (languageMode === 'en') return card.exampleEn;
    if (languageMode === 'fr') return card.exampleFr;
    return card.exampleEn || card.exampleAr;
  };

  // Autoplay Playlist logic
  useEffect(() => {
    if (!isPlayingPlaylist) {
      if (playlistTimeoutRef.current) clearTimeout(playlistTimeoutRef.current);
      return;
    }

    if (filteredCards.length === 0) {
      setIsPlayingPlaylist(false);
      return;
    }

    const currentCard = filteredCards[playlistIndex];
    if (currentCard) {
      setActiveCardId(currentCard.id);
      speakGerman(currentCard.de);

      playlistTimeoutRef.current = setTimeout(() => {
        if (playlistIndex + 1 < filteredCards.length) {
          setPlaylistIndex((prev) => prev + 1);
        } else {
          setIsPlayingPlaylist(false);
          setPlaylistIndex(0);
        }
      }, 2600);
    }

    return () => {
      if (playlistTimeoutRef.current) clearTimeout(playlistTimeoutRef.current);
    };
  }, [isPlayingPlaylist, playlistIndex, filteredCards]);

  const togglePlayAll = () => {
    if (isPlayingPlaylist) {
      setIsPlayingPlaylist(false);
      stopSpeech();
      if (playlistTimeoutRef.current) clearTimeout(playlistTimeoutRef.current);
    } else {
      setPlaylistIndex(0);
      setIsPlayingPlaylist(true);
    }
  };

  // Trainer Cards list
  const trainerCards = useMemo(() => {
    const list = trainerModeAllThemes ? allCards : activeTheme.cards;
    return list.filter((c) => !!c.article);
  }, [trainerModeAllThemes, allCards, activeTheme.cards]);

  const currentTrainerCard = trainerCards[trainerIndex % (trainerCards.length || 1)];

  const handleTrainerAnswer = (articleChoice: 'der' | 'die' | 'das') => {
    if (!currentTrainerCard || trainerAnswerState.selected !== null) return;

    const isCorrect = currentTrainerCard.article === articleChoice;
    setTrainerAnswerState({
      selected: articleChoice,
      isCorrect,
    });

    setTrainerScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    // Speak full word with correct article
    speakGerman(`${currentTrainerCard.article} ${currentTrainerCard.de.replace(/^(der|die|das)\s+/, '')}`);
  };

  const handleTrainerNext = () => {
    setTrainerAnswerState({ selected: null, isCorrect: null });
    setTrainerIndex((prev) => (prev + 1) % trainerCards.length);
  };

  const handleTrainerReset = () => {
    setTrainerScore({ correct: 0, total: 0 });
    setTrainerAnswerState({ selected: null, isCorrect: null });
    setTrainerIndex(0);
  };

  // Article visual color tokens
  const getArticleStyles = (article?: 'der' | 'die' | 'das') => {
    switch (article) {
      case 'der':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20',
          border: 'hover:border-blue-300',
          dot: 'bg-blue-600',
          label: 'Maskulin (der)',
        };
      case 'die':
        return {
          badge: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20',
          border: 'hover:border-rose-300',
          dot: 'bg-rose-600',
          label: 'Feminin (die)',
        };
      case 'das':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
          border: 'hover:border-emerald-300',
          dot: 'bg-emerald-600',
          label: 'Neutral (das)',
        };
      default:
        return {
          badge: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/20',
          border: 'hover:border-slate-300',
          dot: 'bg-slate-500',
          label: 'Plural / Ohne Artikel',
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800/80 relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interaktiver deutscher Wortschatz & Artikel-Trainer</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Deutscher Wortschatz nach Lebensbereichen
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Über <span className="font-bold text-white">{totalWordsCount}+ thematisch gegliederte Vokabeln</span> mit grammatikalischen Artikeln (der, die, das), Pluralformen, authentischen Beispielsätzen, dreisprachiger Übersetzung (AR, EN, FR) und hochauflösender nativer Sprachausgabe.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-center">
              <div className="text-2xl font-black text-indigo-400">{AUDITED_VOCAB_THEMES.length}</div>
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Themen</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-center">
              <div className="text-2xl font-black text-emerald-400">{totalWordsCount}</div>
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Wörter</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-center col-span-2 sm:col-span-1">
              <div className="text-2xl font-black text-amber-400">{favorites.size}</div>
              <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Gemerkt ⭐</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Mode Selector & Global Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* View Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-white text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Karten-Ansicht</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'table'
                ? 'bg-white text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Tabellen-Ansicht</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('trainer')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              viewMode === 'trainer'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Der-Die-Das Trainer</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Audio Play All */}
          {viewMode !== 'trainer' && (
            <button
              type="button"
              onClick={togglePlayAll}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                isPlayingPlaylist
                  ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800'
              }`}
              title="Alle Wörter dieses Themas nacheinander vorlesen"
            >
              {isPlayingPlaylist ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stoppen</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Thema vorlesen</span>
                </>
              )}
            </button>
          )}

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={handleToggleSlowAudio}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              isSlowAudio
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Sprechgeschwindigkeit für Sprachanfänger anpassen"
          >
            <span>{isSlowAudio ? '🐢 0.75x' : '⚡ 1.0x'}</span>
          </button>

          {/* Hide/Show Translation Toggle */}
          {viewMode === 'cards' && (
            <button
              type="button"
              onClick={() => {
                setHideTranslations((prev) => !prev);
                setRevealedCardIds(new Set());
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                hideTranslations
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title="Übersetzungen verbergen, um das Gedächtnis zu testen"
            >
              {hideTranslations ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Lernmodus (Verdeckt)</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Übersetzung verdecken</span>
                </>
              )}
            </button>
          )}

          {/* Favorites Filter */}
          <button
            type="button"
            onClick={() => setShowOnlyFavorites((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              showOnlyFavorites
                ? 'bg-amber-500 border-amber-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-current' : ''}`} />
            <span>Nur Gemerkte ({favorites.size})</span>
          </button>
        </div>
      </div>

      {/* Interactive Der-Die-Das Trainer View */}
      {viewMode === 'trainer' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Interaktives Grammatik-Spiel</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Der · Die · Das Artikel-Trainer
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Wähle den richtigen Artikel für jedes deutsche Substantiv und erhalte sofortiges Feedback!
              </p>
            </div>

            {/* Trainer Stats & Theme Scope */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-black text-slate-900">
                  {trainerScore.correct} / {trainerScore.total}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  ({trainerScore.total > 0 ? Math.round((trainerScore.correct / trainerScore.total) * 100) : 0}%)
                </span>
              </div>

              <button
                type="button"
                onClick={handleTrainerReset}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
                title="Ergebnis zurücksetzen"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scope Toggle */}
          <div className="flex items-center justify-between gap-4 flex-wrap bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Trainingsbereich:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTrainerModeAllThemes(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  !trainerModeAllThemes
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Nur aktuelles Thema ({activeTheme.titleDe})
              </button>
              <button
                type="button"
                onClick={() => setTrainerModeAllThemes(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  trainerModeAllThemes
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Alle {AUDITED_VOCAB_THEMES.length} Themen ({allCards.filter((c) => !!c.article).length} Wörter)
              </button>
            </div>
          </div>

          {/* Active Flashcard for Der/Die/Das */}
          {currentTrainerCard ? (
            <div className="max-w-xl mx-auto space-y-6 text-center">
              <div className="relative p-8 sm:p-10 rounded-3xl border-2 border-dashed border-indigo-200 bg-gradient-to-b from-indigo-50/40 to-white shadow-sm space-y-4">
                <div className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                  {currentTrainerCard.category || 'Vokabel'}
                </div>

                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3">
                  <span className="text-indigo-400 font-mono">
                    {trainerAnswerState.selected ? currentTrainerCard.article : '___'}
                  </span>
                  <span>{currentTrainerCard.de.replace(/^(der|die|das)\s+/, '')}</span>
                  <button
                    type="button"
                    onClick={() => speakGerman(currentTrainerCard.de)}
                    className="p-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 transition cursor-pointer shrink-0"
                    title="Aussprache anhören"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {currentTrainerCard.plural && (
                  <div className="text-sm font-mono text-slate-500">
                    Plural: {currentTrainerCard.plural}
                  </div>
                )}

                <div className="text-base font-bold text-indigo-900 bg-indigo-50/80 py-1.5 px-4 rounded-xl inline-block">
                  {getTranslation(currentTrainerCard)}
                </div>

                {/* Example context */}
                <div className="pt-3 border-t border-slate-200/70 text-xs text-slate-600 italic">
                  „{currentTrainerCard.exampleDe}“
                </div>
              </div>

              {/* Big 3 Article Buttons */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {(['der', 'die', 'das'] as const).map((art) => {
                  const isSelected = trainerAnswerState.selected === art;
                  const isCorrectAnswer = currentTrainerCard.article === art;
                  const hasAnswered = trainerAnswerState.selected !== null;

                  let buttonStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-xs';
                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      buttonStyle = 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-4 ring-emerald-500/20';
                    } else if (isSelected) {
                      buttonStyle = 'bg-rose-600 text-white border-rose-700 shadow-md ring-4 ring-rose-500/20';
                    } else {
                      buttonStyle = 'opacity-40 bg-slate-100 border-slate-200 text-slate-400';
                    }
                  }

                  const colorMarker =
                    art === 'der' ? 'text-blue-500' : art === 'die' ? 'text-rose-500' : 'text-emerald-500';

                  return (
                    <button
                      key={art}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleTrainerAnswer(art)}
                      className={`py-4 sm:py-5 px-3 rounded-2xl border-2 font-black text-lg sm:text-xl transition cursor-pointer flex flex-col items-center justify-center gap-1 ${buttonStyle}`}
                    >
                      <span>{art}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${hasAnswered ? 'text-white/80' : colorMarker}`}>
                        {art === 'der' ? 'Maskulin' : art === 'die' ? 'Feminin' : 'Neutral'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert & Next Button */}
              {trainerAnswerState.selected !== null && (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div
                    className={`p-4 rounded-2xl border flex items-center justify-center gap-3 text-sm font-extrabold ${
                      trainerAnswerState.isCorrect
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                    }`}
                  >
                    {trainerAnswerState.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>Perfekt! Richtig: {currentTrainerCard.article} {currentTrainerCard.de.replace(/^(der|die|das)\s+/, '')}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>Falsch. Der richtige Artikel ist: <strong className="underline ml-1">{currentTrainerCard.article}</strong> {currentTrainerCard.de.replace(/^(der|die|das)\s+/, '')}</span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleTrainerNext}
                    className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm transition cursor-pointer shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                  >
                    <span>Nächstes Wort üben</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Keine Wörter für den Artikel-Trainer gefunden.
            </div>
          )}
        </div>
      )}

      {/* Main Study Views (Cards & Table) */}
      {viewMode !== 'trainer' && (
        <div className="space-y-6">
          {/* Search, Level & Article Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Bar */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Vokabel, Artikel, Übersetzung oder Beispielsatz durchsuchen..."
                  className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Level Filter */}
              <div className="md:col-span-3 flex items-center gap-1.5">
                {(['all', 'A1', 'A2'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevelFilter(lvl)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                      levelFilter === lvl
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {lvl === 'all' ? 'Alle Niveaus' : lvl}
                  </button>
                ))}
              </div>

              {/* Article Filter (der/die/das) */}
              <div className="md:col-span-3 flex items-center gap-1">
                {(['all', 'der', 'die', 'das'] as const).map((art) => {
                  const isSelected = articleFilter === art;
                  const color =
                    art === 'der'
                      ? 'bg-blue-600 text-white'
                      : art === 'die'
                      ? 'bg-rose-600 text-white'
                      : art === 'das'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-white';

                  return (
                    <button
                      key={art}
                      type="button"
                      onClick={() => setArticleFilter(art)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                        isSelected
                          ? `${color} shadow-xs`
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {art === 'all' ? 'Alle' : art}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-Category Pills */}
            {!showOnlyFavorites && categoriesInActiveTheme.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                  Kategorie:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Alle ({activeTheme.cards.length})
                </button>
                {categoriesInActiveTheme.map((cat) => {
                  const count = activeTheme.cards.filter((c) => c.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Main Layout: Themes Sidebar & Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Themes Sidebar */}
            <div className="space-y-2.5 lg:col-span-1">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Themen ({filteredThemes.length})
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {totalWordsCount} Wörter gesamt
                </span>
              </div>

              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
                {filteredThemes.map((theme) => {
                  const isSelected = theme.id === activeTheme.id && !showOnlyFavorites;
                  const IconComp = THEME_ICONS[theme.icon] || Layers;

                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        setSelectedThemeId(theme.id);
                        setSelectedCategory('all');
                        setShowOnlyFavorites(false);
                      }}
                      className={`p-3.5 rounded-2xl text-left transition cursor-pointer shrink-0 lg:shrink w-64 lg:w-full border ${
                        isSelected
                          ? 'bg-indigo-50/90 border-indigo-300 text-indigo-950 shadow-xs ring-1 ring-indigo-500/20'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2 truncate">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span className="font-extrabold text-sm truncate">{theme.titleDe}</span>
                        </div>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 ${
                            theme.level === 'A1'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {theme.level}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 pl-8">
                        <span className="truncate max-w-[140px]">
                          {languageMode === 'ar' ? theme.titleAr : languageMode === 'fr' ? theme.titleFr : theme.titleEn}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-slate-400 shrink-0">
                          {theme.cards.length} Wörter
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Word Display Panel (Cards or Table) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                {/* Active Theme Title Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                        {showOnlyFavorites ? 'Favoriten' : activeTheme.level}
                      </span>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        {filteredCards.length} {filteredCards.length === 1 ? 'Wort' : 'Wörter'} angezeigt
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {showOnlyFavorites ? '⭐ Meine gemerkten Vokabeln' : activeTheme.titleDe}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      {showOnlyFavorites
                        ? 'Deine persönlich markierten Lernkarten zur gezielten Wiederholung'
                        : languageMode === 'fr'
                        ? activeTheme.descriptionFr
                        : languageMode === 'ar'
                        ? activeTheme.descriptionAr
                        : activeTheme.descriptionEn}
                    </p>
                  </div>

                  {onNavigateToCourse && !showOnlyFavorites && (
                    <button
                      type="button"
                      onClick={() => onNavigateToCourse(activeTheme.level)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      <span>Passender {activeTheme.level}-Kurs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Empty State */}
                {filteredCards.length === 0 && (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800">Keine Vokabeln gefunden</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      {showOnlyFavorites
                        ? 'Du hast noch keine Vokabeln mit dem Stern markiert. Klicke auf den Stern bei einer Karte, um sie hier zu speichern!'
                        : 'Passe deine Suche oder den Artikel-Filter an, um Wörter anzuzeigen.'}
                    </p>
                  </div>
                )}

                {/* CARDS VIEW */}
                {viewMode === 'cards' && filteredCards.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCards.map((card) => {
                      const isCardActive = activeCardId === card.id;
                      const isFav = favorites.has(card.id);
                      const isCopied = copiedId === card.id;
                      const isRevealed = revealedCardIds.has(card.id);
                      const artStyle = getArticleStyles(card.article);

                      return (
                        <div
                          key={card.id}
                          onClick={() => {
                            setActiveCardId(card.id);
                            if (hideTranslations) {
                              setRevealedCardIds((prev) => {
                                const next = new Set(prev);
                                if (next.has(card.id)) next.delete(card.id);
                                else next.add(card.id);
                                return next;
                              });
                            }
                          }}
                          className={`p-5 rounded-2xl border transition text-left flex flex-col justify-between cursor-pointer relative group ${
                            isCardActive
                              ? 'border-indigo-400 bg-indigo-50/30 shadow-xs ring-1 ring-indigo-400/30'
                              : `border-slate-200/90 ${artStyle.border} bg-white hover:bg-slate-50/60`
                          }`}
                        >
                          <div>
                            {/* Card Top Row: Article, Noun, Actions */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                {card.article ? (
                                  <span
                                    className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-lg border shadow-2xs ${artStyle.badge}`}
                                  >
                                    {card.article}
                                  </span>
                                ) : (
                                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                                    –
                                  </span>
                                )}

                                <h3 className="text-base font-black text-slate-900 tracking-tight">
                                  {card.de.replace(/^(der|die|das)\s+/, '')}
                                </h3>

                                {card.category && (
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                                    {card.category}
                                  </span>
                                )}
                              </div>

                              {/* Card Action Buttons */}
                              <div className="flex items-center gap-1 shrink-0">
                                {/* Copy Button */}
                                <button
                                  type="button"
                                  onClick={(e) => handleCopy(card, e)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                                  title="Wort kopieren"
                                >
                                  {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>

                                {/* Favorite Star */}
                                <button
                                  type="button"
                                  onClick={(e) => toggleFavorite(card.id, e)}
                                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                                    isFav
                                      ? 'text-amber-500 hover:text-amber-600 bg-amber-50'
                                      : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                                  }`}
                                  title={isFav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
                                >
                                  <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                                </button>

                                {/* Audio Button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakGerman(card.de);
                                  }}
                                  className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition cursor-pointer"
                                  title="Aussprache anhören"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Plural Form */}
                            {card.plural && (
                              <div className="text-xs text-slate-500 font-mono mb-2 flex items-center gap-1.5">
                                <span className="text-slate-400">Plural:</span>
                                <span className="font-semibold text-slate-700">{card.plural}</span>
                              </div>
                            )}

                            {/* Primary Translation */}
                            <div className="mb-3">
                              {hideTranslations && !isRevealed ? (
                                <div className="text-xs font-bold text-slate-400 bg-slate-100/90 py-1.5 px-3 rounded-lg border border-dashed border-slate-300 flex items-center justify-between">
                                  <span>🔒 Klicke zum Aufdecken</span>
                                  <Eye className="w-3.5 h-3.5" />
                                </div>
                              ) : (
                                <div className="text-sm font-bold text-indigo-950 bg-indigo-50/70 px-3 py-1.5 rounded-xl border border-indigo-100/80 flex items-center justify-between">
                                  <span>{getTranslation(card)}</span>
                                  {languageMode !== 'ar' && card.ar && (
                                    <span className="text-xs text-slate-400 font-normal font-sans" dir="rtl">
                                      {card.ar}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Example Sentence Section */}
                          <div className="pt-3 border-t border-slate-100 space-y-1.5">
                            <div className="flex items-start justify-between gap-1 text-xs font-medium text-slate-800">
                              <span className="leading-snug">{card.exampleDe}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakGerman(card.exampleDe);
                                }}
                                className="text-slate-400 hover:text-indigo-600 p-0.5 shrink-0 transition"
                                title="Beispielsatz vorlesen"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {(!hideTranslations || isRevealed) && (
                              <div className="text-[11px] text-slate-500 leading-normal">
                                {getExampleTranslation(card)}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* TABLE VIEW */}
                {viewMode === 'table' && filteredCards.length > 0 && (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-3 w-10 text-center">⭐</th>
                          <th className="py-3 px-3 w-20">Artikel</th>
                          <th className="py-3 px-4">Wort (Deutsch)</th>
                          <th className="py-3 px-4">Plural</th>
                          <th className="py-3 px-4">Übersetzung</th>
                          <th className="py-3 px-4">Beispielsatz</th>
                          <th className="py-3 px-3 text-right">Audio</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredCards.map((card) => {
                          const artStyle = getArticleStyles(card.article);
                          const isFav = favorites.has(card.id);

                          return (
                            <tr
                              key={card.id}
                              className="hover:bg-indigo-50/30 transition cursor-pointer"
                              onClick={() => speakGerman(card.de)}
                            >
                              <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                                <button
                                  type="button"
                                  onClick={(e) => toggleFavorite(card.id, e)}
                                  className={`p-1 rounded-md transition ${
                                    isFav ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'
                                  }`}
                                >
                                  <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                                </button>
                              </td>
                              <td className="py-3 px-3">
                                {card.article ? (
                                  <span
                                    className={`text-xs font-mono font-black px-2 py-0.5 rounded-md border ${artStyle.badge}`}
                                  >
                                    {card.article}
                                  </span>
                                ) : (
                                  <span className="text-slate-400">–</span>
                                )}
                              </td>
                              <td className="py-3 px-4 font-black text-slate-900">
                                {card.de.replace(/^(der|die|das)\s+/, '')}
                              </td>
                              <td className="py-3 px-4 font-mono text-xs text-slate-500">
                                {card.plural || '–'}
                              </td>
                              <td className="py-3 px-4 font-semibold text-indigo-950">
                                {getTranslation(card)}
                              </td>
                              <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">
                                <div className="font-medium truncate">{card.exampleDe}</div>
                                <div className="text-[11px] text-slate-400 truncate">
                                  {getExampleTranslation(card)}
                                </div>
                              </td>
                              <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                                <button
                                  type="button"
                                  onClick={() => speakGerman(card.de)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-700 transition cursor-pointer"
                                  title="Aussprache anhören"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



