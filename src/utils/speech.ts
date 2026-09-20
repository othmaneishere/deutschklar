// High-Quality Neat German Neural TTS Engine with Browser Fallback

export interface GermanVoice {
  id: string;
  name: string;
  gender: 'Weiblich' | 'Männlich';
  style: string;
}

export const AVAILABLE_GERMAN_VOICES: GermanVoice[] = [
  { id: 'de-DE-KatjaNeural', name: 'Katja', gender: 'Weiblich', style: 'Klar & Natürlich (Standard)' },
  { id: 'de-DE-KillianNeural', name: 'Killian', gender: 'Männlich', style: 'Klar & Natürlich' },
  { id: 'de-DE-ConradNeural', name: 'Conrad', gender: 'Männlich', style: 'Ruhig & Seriös' },
  { id: 'de-DE-AmalaNeural', name: 'Amala', gender: 'Weiblich', style: 'Sanft & Freundlich' },
];

type SpeechStateListener = (state: { isPlaying: boolean; text: string; speed: number; voice: string }) => void;

const listeners: Set<SpeechStateListener> = new Set();
let activeAudio: HTMLAudioElement | null = null;
let currentPlayingText = '';
let globalSpeed = typeof window !== 'undefined'
  ? parseFloat(localStorage.getItem('deutsch_tts_speed') || '1.0')
  : 1.0;
let globalVoice = typeof window !== 'undefined'
  ? localStorage.getItem('deutsch_tts_voice') || 'de-DE-KatjaNeural'
  : 'de-DE-KatjaNeural';

function notifyListeners(isPlaying: boolean, text: string = '') {
  currentPlayingText = isPlaying ? text : '';
  listeners.forEach((listener) => {
    try {
      listener({ isPlaying, text: currentPlayingText, speed: globalSpeed, voice: globalVoice });
    } catch (e) {
      console.error('Speech state listener error:', e);
    }
  });
}

export function subscribeSpeechState(listener: SpeechStateListener): () => void {
  listeners.add(listener);
  // Initial callback
  listener({
    isPlaying: !!activeAudio || (typeof window !== 'undefined' && !!window.speechSynthesis?.speaking),
    text: currentPlayingText,
    speed: globalSpeed,
    voice: globalVoice,
  });
  return () => {
    listeners.delete(listener);
  };
}

export function getPlaybackSpeed(): number {
  return globalSpeed;
}

export function setPlaybackSpeed(speed: number) {
  globalSpeed = speed;
  if (typeof window !== 'undefined') {
    localStorage.setItem('deutsch_tts_speed', speed.toString());
  }
  if (activeAudio) {
    activeAudio.playbackRate = speed;
  }
  notifyListeners(!!activeAudio, currentPlayingText);
}

export function getSelectedVoice(): string {
  return globalVoice;
}

export function setSelectedVoice(voiceId: string) {
  globalVoice = voiceId;
  if (typeof window !== 'undefined') {
    localStorage.setItem('deutsch_tts_voice', voiceId);
  }
  notifyListeners(!!activeAudio, currentPlayingText);
}

export function getCurrentPlayingText(): string {
  return currentPlayingText;
}

export function stopSpeech() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  notifyListeners(false);
}

// Clean text for speech
export function cleanGermanText(text?: string | null): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/[→·|/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Speaks German text using neat external German neural TTS endpoint,
 * with automatic fallback to Web Speech API if offline or unavailable.
 */
export const speakGerman = (text: string, onEnd?: () => void): boolean => {
  if (typeof window === 'undefined') return false;

  stopSpeech();

  const cleanText = cleanGermanText(text);
  if (!cleanText) {
    if (onEnd) onEnd();
    return false;
  }

  notifyListeners(true, cleanText);

  // Strategy 1: External High-Definition Neural German Audio via Server Proxy
  try {
    const audioUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&voice=${encodeURIComponent(globalVoice)}`;
    const audio = new Audio(audioUrl);
    audio.playbackRate = globalSpeed;
    activeAudio = audio;

    let handledEnd = false;
    const finalize = () => {
      if (handledEnd) return;
      handledEnd = true;
      if (activeAudio === audio) {
        activeAudio = null;
      }
      notifyListeners(false);
      if (onEnd) onEnd();
    };

    audio.onended = finalize;
    audio.onerror = () => {
      // Upstream audio failed; smoothly fall back to Web Speech API
      console.warn('External TTS unavailable, falling back to Web Speech API');
      activeAudio = null;
      fallbackWebSpeech(cleanText, finalize);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((playErr) => {
        console.warn('Audio play prevented, falling back to Web Speech API:', playErr);
        activeAudio = null;
        fallbackWebSpeech(cleanText, finalize);
      });
    }

    return true;
  } catch (err) {
    console.warn('Error starting external audio, falling back:', err);
    return fallbackWebSpeech(cleanText, onEnd);
  }
};

function fallbackWebSpeech(cleanText: string, onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    notifyListeners(false);
    if (onEnd) onEnd();
    return false;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'de-DE';
    utterance.rate = globalSpeed * 0.9;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const deVoice = voices.find((v) => v.lang.startsWith('de') || v.lang === 'de_DE');
    if (deVoice) {
      utterance.voice = deVoice;
    }

    utterance.onend = () => {
      notifyListeners(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      notifyListeners(false);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.error('Speech synthesis fallback failed:', e);
    notifyListeners(false);
    if (onEnd) onEnd();
    return false;
  }
}

