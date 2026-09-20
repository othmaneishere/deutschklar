import React, { useState, useEffect } from 'react';
import { X, Volume2, Gauge, Check, User, Play } from 'lucide-react';
import {
  AVAILABLE_GERMAN_VOICES,
  getSelectedVoice,
  setSelectedVoice,
  getPlaybackSpeed,
  setPlaybackSpeed,
  speakGerman,
  subscribeSpeechState,
} from '../utils/speech';
import { LanguageMode } from '../types';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  languageMode: LanguageMode;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  languageMode,
}) => {
  const [currentVoice, setCurrentVoice] = useState(getSelectedVoice());
  const [currentSpeed, setCurrentSpeed] = useState(getPlaybackSpeed());
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  useEffect(() => {
    setCurrentVoice(getSelectedVoice());
    setCurrentSpeed(getPlaybackSpeed());

    const unsubscribe = subscribeSpeechState((state) => {
      setCurrentVoice(state.voice);
      setCurrentSpeed(state.speed);
      setIsPlayingTest(state.isPlaying);
    });
    return unsubscribe;
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectVoice = (id: string) => {
    setSelectedVoice(id);
    setCurrentVoice(id);
  };

  const handleSelectSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    setCurrentSpeed(speed);
  };

  const handleTestAudio = (sampleText = 'Guten Tag! Herzlich willkommen beim Deutschlernen.') => {
    setIsPlayingTest(true);
    speakGerman(sampleText, () => {
      setIsPlayingTest(false);
    });
  };

  const speedOptions = [
    { value: 0.7, label: '0.7x', desc: 'Sehr langsam (Einsteiger)' },
    { value: 0.8, label: '0.8x', desc: 'Langsames Übungstempo' },
    { value: 0.9, label: '0.9x', desc: 'Gemächlich' },
    { value: 1.0, label: '1.0x', desc: 'Standardtempo (Hochdeutsch)' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                {languageMode === 'ar' ? 'إعدادات النطق والصوت الألماني' : 'Aussprache- & Audio-Optionen'}
              </h3>
              <p className="text-xs text-slate-400">
                Hochdeutsch Standard • Natürliche Sprachausgabe
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Voice selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-700" />
                <span>Deutsche Sprecherstimmen</span>
              </label>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Hochdeutsch
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_GERMAN_VOICES.map((voice) => {
                const isSelected = currentVoice === voice.id;
                return (
                  <button
                    key={voice.id}
                    type="button"
                    onClick={() => {
                      handleSelectVoice(voice.id);
                      handleTestAudio(`Hallo, ich bin ${voice.name}.`);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{voice.name}</span>
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {voice.gender}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>

                    <p
                      className={`text-xs ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {voice.style}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Speed Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-slate-700" />
              <span>Sprechgeschwindigkeit</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {speedOptions.map((opt) => {
                const isSelected = Math.abs(currentSpeed - opt.value) < 0.05;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelectSpeed(opt.value)}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <div className="text-sm font-mono">{opt.label}</div>
                    <div
                      className={`text-[10px] truncate mt-0.5 ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {opt.desc.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Audio Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleTestAudio()}
              disabled={isPlayingTest}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isPlayingTest ? 'Wird abgespielt...' : 'Stimme testen'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
            >
              Fertig
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
