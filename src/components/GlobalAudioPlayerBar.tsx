import React, { useEffect, useState } from 'react';
import { Volume2, Square, RotateCcw, Gauge, X, User } from 'lucide-react';
import {
  subscribeSpeechState,
  stopSpeech,
  speakGerman,
  getPlaybackSpeed,
  setPlaybackSpeed,
  getSelectedVoice,
  setSelectedVoice,
  AVAILABLE_GERMAN_VOICES,
} from '../utils/speech';

export const GlobalAudioPlayerBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [speed, setSpeed] = useState(1.0);
  const [selectedVoice, setLocalVoice] = useState(getSelectedVoice());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setSpeed(getPlaybackSpeed());
    setLocalVoice(getSelectedVoice());
    const unsubscribe = subscribeSpeechState((state) => {
      setIsPlaying(state.isPlaying);
      if (state.text) {
        setCurrentText(state.text);
        setVisible(true);
      }
      setSpeed(state.speed);
      setLocalVoice(state.voice);
    });
    return unsubscribe;
  }, []);

  const handleToggleSpeed = () => {
    const nextSpeed = speed === 1.0 ? 0.8 : 1.0;
    setPlaybackSpeed(nextSpeed);
    setSpeed(nextSpeed);
    if (isPlaying && currentText) {
      speakGerman(currentText);
    }
  };

  const handleCycleVoice = () => {
    const currentIndex = AVAILABLE_GERMAN_VOICES.findIndex((v) => v.id === selectedVoice);
    const nextIndex = (currentIndex + 1) % AVAILABLE_GERMAN_VOICES.length;
    const nextVoice = AVAILABLE_GERMAN_VOICES[nextIndex];
    setSelectedVoice(nextVoice.id);
    setLocalVoice(nextVoice.id);
    if (isPlaying && currentText) {
      speakGerman(currentText);
    }
  };

  const handleReplay = () => {
    if (currentText) {
      speakGerman(currentText);
    }
  };

  const handleStop = () => {
    stopSpeech();
    setIsPlaying(false);
  };

  const handleDismiss = () => {
    stopSpeech();
    setVisible(false);
  };

  if (!visible || !currentText) return null;

  const currentVoiceObj =
    AVAILABLE_GERMAN_VOICES.find((v) => v.id === selectedVoice) || AVAILABLE_GERMAN_VOICES[0];

  return (
    <aside
      aria-label="Audio player"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-xl bg-slate-900/95 text-white backdrop-blur-md border border-slate-700/60 shadow-2xl rounded-2xl p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Left: Speaker icon & Text snippet */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-xs ${
            isPlaying ? 'bg-amber-500 text-slate-950 animate-pulse font-bold' : 'bg-slate-800 text-slate-400'
          }`}
        >
          <Volume2 className="w-4 h-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              {isPlaying ? 'Aussprache aktiv' : 'Audio bereit'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Hochdeutsch ({speed}x)
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-100 truncate">
            {currentText}
          </p>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleCycleVoice}
          className="p-1.5 sm:px-2 sm:py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
          title={`Stimme wechseln: ${currentVoiceObj.style}`}
        >
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span>{currentVoiceObj.name}</span>
        </button>

        <button
          type="button"
          onClick={handleToggleSpeed}
          className="p-1.5 sm:px-2 sm:py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
          title={`Tempo umschalten (aktuell ${speed}x)`}
        >
          <Gauge className="w-3.5 h-3.5 text-slate-400" />
          <span>{speed}x</span>
        </button>

        <button
          type="button"
          onClick={handleReplay}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition cursor-pointer"
          title="Erneut abspielen"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {isPlaying ? (
          <button
            type="button"
            onClick={handleStop}
            className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition cursor-pointer shadow-xs"
            title="Wiedergabe stoppen"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
        ) : null}

        <button
          type="button"
          onClick={handleDismiss}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          title="Leiste schließen"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
