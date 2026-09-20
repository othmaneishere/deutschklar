import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { speakGerman, subscribeSpeechState, cleanGermanText } from '../utils/speech';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  className = '',
  size = 'sm',
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const cleanedSelf = cleanGermanText(text);
    const unsubscribe = subscribeSpeechState((state) => {
      if (!state.isPlaying) {
        setIsPlaying(false);
      } else if (state.text === cleanedSelf) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    });
    return unsubscribe;
  }, [text]);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    speakGerman(text, () => {
      setIsPlaying(false);
    });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs rounded-lg',
    md: 'p-2 text-sm rounded-xl',
    lg: 'px-3 py-2 text-base rounded-xl',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title="Aussprache anhören"
      aria-label={`Listen to pronunciation of ${text}`}
      className={`inline-flex items-center gap-1.5 border transition-all cursor-pointer select-none active:scale-95 ${
        isPlaying
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-300'
          : 'bg-white hover:bg-indigo-50 text-slate-500 hover:text-indigo-700 border-slate-200 hover:border-indigo-200 shadow-2xs'
      } ${sizeClasses[size]} ${className}`}
    >
      <Volume2 className={`${iconSizes[size]} ${isPlaying ? 'animate-pulse text-white' : 'text-indigo-600'}`} />
      {label && <span className="font-semibold text-xs">{label}</span>}
    </button>
  );
};
