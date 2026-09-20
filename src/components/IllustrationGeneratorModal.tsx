import React, { useState } from 'react';
import { X, Sparkles, Wand2, Download, RotateCcw, Image, Check, AlertCircle } from 'lucide-react';
import { CoursePage } from '../types';
import { ChapterIllustration, requestAiIllustration, resetChapterIllustration } from '../utils/illustrationService';

interface IllustrationGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: CoursePage;
  currentIllustration: ChapterIllustration | null;
  onIllustrationUpdated: (illustration: ChapterIllustration | null) => void;
}

const STYLE_PRESETS = [
  { id: 'vector-clean', name: 'Minimalist Vector', desc: 'Flat geometric shapes, clean outlines, warm tones' },
  { id: 'vector-isometric', name: 'Isometric Scene', desc: '3D isometric perspective, modern architectural feel' },
  { id: 'vector-editorial', name: 'Editorial Flat Art', desc: 'Soft pastel gradients, subtle textures, magazine style' },
  { id: 'vector-lineart', name: 'Line Art & Color Wash', desc: 'Precise line drawings with soft watercolor fills' },
];

export const IllustrationGeneratorModal: React.FC<IllustrationGeneratorModalProps> = ({
  isOpen,
  onClose,
  currentPage,
  currentIllustration,
  onIllustrationUpdated,
}) => {
  const [selectedStyle, setSelectedStyle] = useState(STYLE_PRESETS[0].id);
  const [customPrompt, setCustomPrompt] = useState('');
  const [format, setFormat] = useState<'svg' | 'raster'>('svg');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessNotice(false);

    const styleObj = STYLE_PRESETS.find((s) => s.id === selectedStyle);
    const combinedPrompt = `${styleObj?.desc || ''}. ${customPrompt}`.trim();

    try {
      const result = await requestAiIllustration({
        chapterNumber: currentPage.chapterNumber,
        chapterTitle: currentPage.pageTitleDe,
        topics: currentPage.subtitleDe || currentPage.pageTitleEn || '',
        format,
        customPrompt: combinedPrompt,
      });

      onIllustrationUpdated(result);
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 3000);
    } catch (err: any) {
      console.warn('Illustration generation notice:', err?.message || err);
      setErrorMsg(
        err.message?.includes('503') || err.message?.includes('demand')
          ? 'Der KI-Dienst verzeichnet momentan hohe Nachfrage (503). Eine abgestimmte Vektorgrafik steht bereit – versuche es gleich erneut!'
          : (err.message || 'Die KI-Illustration konnte nicht generiert werden.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToDefault = () => {
    resetChapterIllustration(currentPage.chapterNumber);
    onIllustrationUpdated(null);
    onClose();
  };

  const handleDownload = () => {
    if (!currentIllustration) return;
    if (currentIllustration.type === 'svg') {
      const blob = new Blob([currentIllustration.content], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kapitel_${currentPage.chapterNumber}_illustration.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const a = document.createElement('a');
      a.href = currentIllustration.content;
      a.download = `kapitel_${currentPage.chapterNumber}_illustration.png`;
      a.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                KI-Vektor-Illustrator
              </h3>
              <p className="text-xs text-slate-500">
                Modul {currentPage.chapterNumber}: {currentPage.pageTitleDe}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Status feedback */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <div>
                <p className="font-bold">Hinweis zur Generierung</p>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {successNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="font-bold">Neue Vektor-Illustration erfolgreich erstellt und gespeichert!</p>
            </div>
          )}

          {/* Style Preset Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Vektor-Stilrichtung wählen
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STYLE_PRESETS.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedStyle === style.id
                      ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300/40'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <p className="font-bold text-xs text-slate-900">{style.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Format Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. Ausgabe-Format
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFormat('svg')}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition ${
                  format === 'svg'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Reines SVG (Skalierbar & Kristallklar)</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('raster')}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition ${
                  format === 'raster'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Image className="w-3.5 h-3.5 text-amber-400" />
                <span>Rasterbild (16:9 Banner)</span>
              </button>
            </div>
          </div>

          {/* Optional Prompt Customization */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              3. Eigene Details oder Bild-Idee (Optional)
            </label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={`z. B. Berliner Fernsehturm im Hintergrund, warmes Abendlicht, Fahrrad...`}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-400 text-xs text-slate-900 bg-slate-50/50"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Die KI nutzt automatisch den Kapiteltitel „{currentPage.pageTitleDe}“ als Hauptmotiv.
            </p>
          </div>

          {/* Active Status Box */}
          {currentIllustration && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Individuelle Illustration aktiv ({currentIllustration.type.toUpperCase()})</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer flex items-center gap-1 font-semibold text-[11px]"
                  title="Illustration herunterladen"
                >
                  <Download className="w-3 h-3" />
                  <span>Speichern</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 cursor-pointer flex items-center gap-1 font-semibold text-[11px]"
                  title="Auf Standard-Illustration zurücksetzen"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Zurücksetzen</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition cursor-pointer"
          >
            Schließen
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 flex items-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Wand2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>KI generiert Vektor...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-slate-950" />
                <span>Illustration jetzt generieren</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
