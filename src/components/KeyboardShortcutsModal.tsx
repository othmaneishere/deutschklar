import React from 'react';
import { Keyboard, X } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '← / →', desc: 'Zwischen Seiten vor- und zurückblättern' },
    { key: 'V', desc: 'Zwischen Lehrbuch und Hörgeschichten-Lounge wechseln' },
    { key: 'B', desc: 'Seitenleiste ein- und ausblenden' },
    { key: 'S', desc: 'A1 Grammatik-Spickzettel einblenden' },
    { key: '?', desc: 'Tastaturkürzel-Übersicht anzeigen' },
    { key: 'Esc', desc: 'Aktuelles Fenster schließen' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Keyboard className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-white">Tastaturkürzel</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-2.5">
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200"
            >
              <span className="text-xs text-slate-700 font-medium">{s.desc}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 font-mono text-xs font-bold text-slate-900 shadow-2xs">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
