import React, { useEffect, useState, useMemo } from 'react';
import {
  Play,
  Video,
  ExternalLink,
  RotateCw,
  Search,
  Sparkles,
  CheckCircle2,
  Tv,
  Maximize2,
} from 'lucide-react';
import {
  DailyDeutschVideoItem,
  DailyDeutschVideoModal,
} from './DailyDeutschVideoModal';
import { LanguageMode } from '../types';

interface DailyDeutschVideoSectionProps {
  languageMode: LanguageMode;
  onOpenFullHub?: () => void;
}

export const DailyDeutschVideoSection: React.FC<DailyDeutschVideoSectionProps> = ({
  languageMode,
  onOpenFullHub,
}) => {
  const [videos, setVideos] = useState<DailyDeutschVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<'all' | 'A1' | 'A2'>('all');
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter videos by Level and search term
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
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
  }, [videos, levelFilter, searchQuery]);

  const a1Count = useMemo(() => videos.filter((v) => v.isA1).length, [videos]);
  const a2Count = useMemo(() => videos.filter((v) => v.isA2).length, [videos]);

  const headerSubtitles: Record<LanguageMode, string> = {
    none: 'Authentische deutsche Hörgeschichten & Dialoge direkt vom YouTube-Kanal @Daily_Deutsch (A1 & A2 Niveau).',
    en: 'Authentic German listening stories & dialogues directly from the YouTube channel @Daily_Deutsch (A1 & A2 levels).',
    fr: 'Histoires audio & dialogues allemands authentiques de la chaîne YouTube @Daily_Deutsch (niveaux A1 et A2).',
    ar: 'قصص استماع ومحادثات ألمانية أصلية مباشرة من قناة يوتيوب @Daily_Deutsch (مستويات A1 و A2).',
  };

  return (
    <section
      id="section-daily-deutsch-videos"
      aria-labelledby="daily-deutsch-heading"
      className="scroll-mt-24 space-y-5"
    >
      {/* Container Card */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
                <Video className="w-4 h-4" />
              </div>
              <h2
                id="daily-deutsch-heading"
                className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
              >
                Daily Deutsch – A1 & A2 Videos
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
                YouTube @Daily_Deutsch
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-2xl">
              {headerSubtitles[languageMode]}
            </p>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {onOpenFullHub && (
              <button
                type="button"
                onClick={onOpenFullHub}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                title="Als eigene Video-Lounge öffnen"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Separates Portal öffnen</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => fetchVideos(true)}
              disabled={refreshing}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
              title="Aktuelle Videos vom Kanal neu laden"
            >
              <RotateCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-amber-600' : ''}`} />
              <span>Aktualisieren</span>
            </button>

            <a
              href="https://www.youtube.com/@Daily_Deutsch"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>YouTube ↗</span>
            </a>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Level Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200/80 w-fit">
            <button
              type="button"
              onClick={() => setLevelFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                levelFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Alle ({videos.length})
            </button>

            <button
              type="button"
              onClick={() => setLevelFilter('A1')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                levelFilter === 'A1'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-600 inline-block" />
              <span>Nur A1 ({a1Count})</span>
            </button>

            <button
              type="button"
              onClick={() => setLevelFilter('A2')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                levelFilter === 'A2'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-200 inline-block" />
              <span>Nur A2 ({a2Count})</span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Videos filtern (z.B. Morgen-Routine, Restaurant)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            ) : null}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="pt-5">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 overflow-hidden animate-pulse bg-slate-50 p-3 space-y-3"
                >
                  <div className="w-full aspect-video rounded-xl bg-slate-200" />
                  <div className="h-4 bg-slate-200 rounded-md w-3/4" />
                  <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                </div>
              ))}
            </div>
          ) : error && videos.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
              <p className="font-semibold text-sm">{error}</p>
              <button
                type="button"
                onClick={() => fetchVideos()}
                className="mt-3 px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition cursor-pointer"
              >
                Erneut versuchen
              </button>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500">
              <p className="font-semibold text-sm">Keine Videos für diese Auswahl gefunden.</p>
              <button
                type="button"
                onClick={() => {
                  setLevelFilter('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
              >
                Filter zurücksetzen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredVideos.map((video) => {
                const isA1Only = video.level === 'A1';
                const isA2Only = video.level === 'A2';

                return (
                  <article
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className="group relative rounded-2xl border border-slate-200/90 bg-white hover:border-red-400/80 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden cursor-pointer"
                  >
                    {/* Thumbnail with overlay & Level badge */}
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

                      {/* View count in bottom-left */}
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-[10px] font-semibold text-slate-200">
                        {video.viewsFormatted}
                      </div>
                    </div>

                    {/* Content info */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-2 group-hover:text-red-600 transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                          <Tv className="w-3 h-3 text-red-500" />
                          <span>Daily Deutsch</span>
                          <span>•</span>
                          <span>{video.publishedFormatted}</span>
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-red-600 group-hover:underline flex items-center gap-1">
                          <span>Video ansehen</span>
                          <span>→</span>
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {video.isA1 ? 'A1 Hörpraxis' : 'A2 Hörpraxis'}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal Player */}
      <DailyDeutschVideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
};
