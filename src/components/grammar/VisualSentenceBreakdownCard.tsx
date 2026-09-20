import React from 'react';
import { Volume2, BookOpen, Layers } from 'lucide-react';
import { VisualSentenceBreakdown } from '../../types/grammarCourseTypes';
import { speakGerman } from '../../utils/speech';

interface VisualSentenceBreakdownCardProps {
  breakdown: VisualSentenceBreakdown;
}

export const VisualSentenceBreakdownCard: React.FC<VisualSentenceBreakdownCardProps> = ({
  breakdown,
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-900 border-blue-200 border-t-2 border-t-blue-600';
      case 'purple':
        return 'bg-purple-50 text-purple-900 border-purple-200 border-t-2 border-t-purple-600';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200 border-t-2 border-t-emerald-600';
      case 'amber':
        return 'bg-amber-50 text-amber-900 border-amber-200 border-t-2 border-t-amber-600';
      case 'rose':
        return 'bg-rose-50 text-rose-900 border-rose-200 border-t-2 border-t-rose-600';
      case 'slate':
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200 border-t-2 border-t-slate-600';
    }
  };

  const getTagClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-200/80 text-blue-900';
      case 'purple':
        return 'bg-purple-200/80 text-purple-900';
      case 'emerald':
        return 'bg-emerald-200/80 text-emerald-900';
      case 'amber':
        return 'bg-amber-200/80 text-amber-900';
      case 'rose':
        return 'bg-rose-200/80 text-rose-900';
      case 'slate':
      default:
        return 'bg-slate-200/80 text-slate-800';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">
            {breakdown.titleDe}
          </h4>
        </div>
        <button
          type="button"
          onClick={() => speakGerman(breakdown.sentenceDe)}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition cursor-pointer"
          title="Gesamten Beispielsatz anhören"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* Visual Segments Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
        {breakdown.segments.map((seg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 transition-transform hover:-translate-y-0.5 ${getColorClasses(
              seg.color
            )}`}
          >
            <div className="font-bold text-sm sm:text-base leading-snug">
              {seg.text}
            </div>
            <div
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md inline-block self-start ${getTagClasses(
                seg.color
              )}`}
            >
              {seg.role}
            </div>
          </div>
        ))}
      </div>

      {/* English Translation */}
      {breakdown.sentenceEn && (
        <div className="text-xs text-slate-500 italic pl-1 border-l-2 border-slate-200">
          {breakdown.sentenceEn}
        </div>
      )}

      {/* Extra Note */}
      {breakdown.noteDe && (
        <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-950 flex items-start gap-2">
          <BookOpen className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
          <span>{breakdown.noteDe}</span>
        </div>
      )}
    </div>
  );
};
