import React, { useEffect } from 'react';
import { X, ExternalLink, Headphones, BookOpen, MessageSquareQuote } from 'lucide-react';

export interface DailyDeutschVideoItem {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'A1-A2';
  isA1: boolean;
  isA2: boolean;
  published: string;
  publishedFormatted: string;
  views: number;
  viewsFormatted: string;
  thumbnail: string;
  youtubeUrl: string;
}

interface DailyDeutschVideoModalProps {
  video: DailyDeutschVideoItem | null;
  onClose: () => void;
}

export const DailyDeutschVideoModal: React.FC<DailyDeutschVideoModalProps> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (video) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [video, onClose]);

  if (!video) return null;

  const levelBadgeClass =
    video.level === 'A1'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      : video.level === 'A2'
      ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/70 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${levelBadgeClass}`}
            >
              {video.level}
            </span>
            <div className="min-w-0">
              <h3 className="font-bold text-white text-sm sm:text-base truncate">
                {video.title}
              </h3>
              <p className="text-[11px] text-slate-400">
                Kanal: <span className="text-amber-400 font-semibold">@Daily_Deutsch</span> • {video.viewsFormatted}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
              title="Auf YouTube in neuem Tab ansehen"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">YouTube ↗</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Schließen (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player 16:9 Aspect Ratio Container */}
        <div className="relative w-full aspect-video bg-black shrink-0">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Learning Advice & Strategy */}
        <div className="p-4 sm:p-5 bg-slate-900 overflow-y-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Headphones className="w-4 h-4" />
            <span>Hörverstehen-Methode für A1 / A2:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </span>
              <div>
                <p className="font-semibold text-white">Ersthören</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Ohne Untertitel lauschen, um den groben Zusammenhang zu verstehen.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </span>
              <div>
                <p className="font-semibold text-white">Mitlesen</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Deutsche Untertitel aktivieren & neue Vokabeln im Notizbuch notieren.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
                3
              </span>
              <div>
                <p className="font-semibold text-white">Shadowing</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Sätze pausieren und die Melodie laut und deutlich nachsprechen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
