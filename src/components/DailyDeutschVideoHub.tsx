import React, { useEffect, useState, useMemo } from 'react';
import {
  Play,
  Video,
  ExternalLink,
  RotateCw,
  Search,
  Sparkles,
  BookOpen,
  Headphones,
  CheckCircle2,
  Tv,
  Film,
  Flame,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import {
  DailyDeutschVideoItem,
  DailyDeutschVideoModal,
} from './DailyDeutschVideoModal';
import { LanguageMode } from '../types';

interface DailyDeutschVideoHubProps {
  languageMode: LanguageMode;
  onSwitchToCourse?: () => void;
}

export const DailyDeutschVideoHub: React.FC<DailyDeutschVideoHubProps> = ({
  languageMode,
  onSwitchToCourse,
}) => {
  const [videos, setVideos] = useState<DailyDeutschVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<'all' | 'A1' | 'A2'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'views' | 'recent' | 'title'>('views');
  const [activeVideo, setActiveVideo] = useState<DailyDeutschVideoItem | null>(null);

  const fetchVideos = async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const res = await fetch('/api/daily-deutsch-videos');
      if (!res.ok) {
        throw new Error(`Fehler beim Laden (${res.status})`);
      }
      const data = await res.json();
      if (data && Array.isArray(data.videos)) {
        setVideos(data.videos);
      } else {
        throw new Error('Ungültiges Datenformat empfangen');
      }
    } catch (err: any) {
      console.error('Daily Deutsch fetch error:', err);
      setError(err?.message || 'Videos konnten nicht geladen werden');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Filter & sort videos
  const filteredVideos = useMemo(() => {
    let result = videos.filter((v) => {
      // Level filter
      if (levelFilter === 'A1' && !v.isA1) return false;
      if (levelFilter === 'A2' && !v.isA2) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          v.title.toLowerCase().includes(q) ||
          v.level.toLowerCase().includes(q)
        );
      }
      return true;
    });

    if (sortBy === 'views') {
      result = [...result].sort((a, b) => b.views - a.views);
    } else if (sortBy === 'recent') {
      result = [...result].sort(
        (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
      );
    } else if (sortBy === 'title') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [videos, levelFilter, searchQuery, sortBy]);

  const a1Count = useMemo(() => videos.filter((v) => v.isA1).length, [videos]);
  const a2Count = useMemo(() => videos.filter((v) => v.isA2).length, [videos]);

  const headerSubtitles: Record<LanguageMode, string> = {
    none: 'Kuratiertes Videoportal des beliebten YouTube-Kanals @Daily_Deutsch – exklusiv gefiltert nach Anfänger- und Grundstufen-Niveau (A1 & A2) mit interaktivem Player und Lerntipps.',
    en: 'Curated video hub of the popular YouTube channel @Daily_Deutsch – strictly filtered for beginner levels (A1 & A2) with interactive player and listening strategies.',
    fr: 'Portail vidéo sélectionné de la chaîne YouTube @Daily_Deutsch – filtré exclusivement pour les niveaux débutants (A1 et A2) avec lecteur intégré et méthodes d’écoute.',
    ar: 'بوابة الفيديو التعليمية المخصصة لقناة اليوتيوب الشهيرة @Daily_Deutsch – مصفاة حصرياً للمستويات المبتدئة (A1 و A2) مع مشغل مدمج ونصائح استماع فعالة.',
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Visual Portal Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
        <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none hidden md:block">
          <Film className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-xl bg-red-600/90 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Tv className="w-3.5 h-3.5" />
              YouTube Studio
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-slate-300 text-xs font-semibold backdrop-blur-xs border border-white/10">
              Kanal: @Daily_Deutsch
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
              Gefiltert: Nur A1 / A2
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Daily Deutsch Video-Lounge
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {headerSubtitles[languageMode]}
          </p>

          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <a
              href="https://www.youtube.com/@Daily_Deutsch"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-md hover:shadow-red-600/30"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Kanal auf YouTube abonnieren ↗</span>
            </a>

            <button
              type="button"
              onClick={() => fetchVideos(true)}
              disabled={refreshing}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition backdrop-blur-xs border border-white/10 cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
              <span>{refreshing ? 'Lädt Feed...' : 'Neu laden'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Learning Method Guide Callout */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center shrink-0 text-sm">
            1
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Ersthören ohne Text</h4>
            <p className="text-slate-500 text-xs mt-0.5 leading-normal">
              Spiele die Geschichte zuerst durch, um die Sprachmelodie und den Gesamtsinn zu erfassen.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 font-black flex items-center justify-center shrink-0 text-sm">
            2
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Mitlesen & Untertitel</h4>
            <p className="text-slate-500 text-xs mt-0.5 leading-normal">
              Nutze die Untertitel des Videos, um Vokabeln mit den Modulen der A1-Grammatik abzugleichen.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-sm">
            3
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Lautes Shadowing</h4>
            <p className="text-slate-500 text-xs mt-0.5 leading-normal">
              Pausiere nach kurzen Phrasen und sprich die Sätze der Protagonisten laut und deutlich nach.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filter & Video Catalog */}
      <section className="space-y-6">
        {/* Controls Toolbar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Level Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 w-fit flex-wrap">
            <button
              type="button"
              onClick={() => setLevelFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                levelFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Alle Videos ({videos.length})
            </button>

            <button
              type="button"
              onClick={() => setLevelFilter('A1')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                levelFilter === 'A1'
                  ? 'bg-amber-500 text-slate-950 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-700 inline-block" />
              <span>A1 Niveau ({a1Count})</span>
            </button>

            <button
              type="button"
              onClick={() => setLevelFilter('A2')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                levelFilter === 'A2'
                  ? 'bg-sky-500 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-200 inline-block" />
              <span>A2 Niveau ({a2Count})</span>
            </button>
          </div>

          {/* Search & Sort Options */}
          <div className="flex items-center gap-2.5 flex-1 max-w-lg justify-end">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Themen suchen (z.B. Morgenroutine, Restaurant)..."
                className="w-full pl-9 pr-7 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition"
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

            {/* Sort selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition shrink-0"
            >
              <option value="views">Meistgesehen</option>
              <option value="recent">Neueste</option>
              <option value="title">Titel A-Z</option>
            </select>
          </div>
        </div>

        {/* Video Catalog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-200 overflow-hidden animate-pulse bg-white p-3.5 space-y-3 shadow-2xs"
              >
                <div className="w-full aspect-video rounded-2xl bg-slate-200" />
                <div className="h-4 bg-slate-200 rounded-md w-4/5" />
                <div className="h-3 bg-slate-200 rounded-md w-1/2" />
              </div>
            ))}
          </div>
        ) : error && videos.length === 0 ? (
          <div className="p-10 text-center rounded-3xl bg-white border border-amber-200 text-amber-900 shadow-sm space-y-3">
            <p className="font-bold text-base">{error}</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Die Videos können temporär nicht geladen werden. Klicke auf 'Neu laden' oder öffne den Kanal direkt auf YouTube.
            </p>
            <button
              type="button"
              onClick={() => fetchVideos()}
              className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition cursor-pointer"
            >
              Erneut versuchen
            </button>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 text-slate-500 shadow-sm space-y-3">
            <p className="font-bold text-base text-slate-800">Keine Videos gefunden</p>
            <p className="text-xs text-slate-500">
              Zu deinen aktuellen Such- und Filterkriterien gibt es keine Übereinstimmung.
            </p>
            <button
              type="button"
              onClick={() => {
                setLevelFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map((video) => {
              const isA1Only = video.level === 'A1';
              const isA2Only = video.level === 'A2';

              return (
                <article
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="group relative rounded-3xl border border-slate-200/90 bg-white hover:border-red-400 hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Level Badge in top-right */}
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider shadow-sm border ${
                          isA1Only
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : isA2Only
                            ? 'bg-sky-500 text-white border-sky-400'
                            : 'bg-emerald-600 text-white border-emerald-500'
                        }`}
                      >
                        {video.level}
                      </span>
                    </div>

                    {/* Views pill */}
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-semibold text-slate-200">
                      {video.viewsFormatted}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                        <Tv className="w-3 h-3 text-red-500" />
                        <span>Daily Deutsch</span>
                        <span>•</span>
                        <span>{video.publishedFormatted}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-red-600 group-hover:underline flex items-center gap-1">
                        <span>Video abspielen</span>
                        <span>→</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {video.isA1 ? 'A1 Hörpraxis' : 'A2 Hörpraxis'}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Video Modal Player */}
      <DailyDeutschVideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
};
