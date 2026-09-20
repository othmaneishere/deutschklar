import React from 'react';
import { Volume2, MessageSquare } from 'lucide-react';
import { MiniDialogue } from '../../types/grammarCourseTypes';
import { speakGerman } from '../../utils/speech';

interface MiniDialogueCardProps {
  dialogue: MiniDialogue;
}

export const MiniDialogueCard: React.FC<MiniDialogueCardProps> = ({ dialogue }) => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-md border border-slate-800 space-y-4">
      {/* Title & Context */}
      <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <h4 className="text-base font-bold text-white tracking-tight">
              {dialogue.titleDe}
            </h4>
          </div>
          {dialogue.contextDe && (
            <p className="text-xs text-slate-400">{dialogue.contextDe}</p>
          )}
        </div>
      </div>

      {/* Dialogue Lines */}
      <div className="space-y-3">
        {dialogue.lines.map((line, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start justify-between gap-3"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-700 text-emerald-300">
                  {line.speaker}
                </span>
                <span className="text-sm font-semibold text-slate-100">{line.de}</span>
              </div>
              {line.en && (
                <div className="text-xs text-slate-400 italic pl-1">{line.en}</div>
              )}
            </div>

            <button
              type="button"
              onClick={() => speakGerman(line.de)}
              className="p-1.5 rounded-lg bg-slate-700 hover:bg-emerald-600 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
              title="Aussprache anhören"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
