import React, { useState } from 'react';
import { BookOpen, X, Sparkles, CheckCircle2, FileText } from 'lucide-react';
import { AudioButton } from './AudioButton';
import { LanguageMode } from '../types';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  languageMode: LanguageMode;
}

type TabType = 'articles' | 'cases' | 'verbs' | 'syntax' | 'questions';

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({
  isOpen,
  onClose,
  languageMode,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('articles');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20 text-white backdrop-blur-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-tight">
                Grammatik-Spickzettel (A1)
              </h2>
              <p className="text-xs text-indigo-100">
                Die wichtigsten Grundregeln, Tabellen und Satzstrukturen auf einen Blick
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition cursor-pointer"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'articles', label: 'Artikel & Genus' },
            { id: 'cases', label: 'Kasus: Akkusativ & Dativ' },
            { id: 'verbs', label: 'Verben & Konjugation' },
            { id: 'syntax', label: 'Satzstellung & Syntax' },
            { id: 'questions', label: 'W-Fragen & Fragewörter' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-slate-800 text-xs sm:text-sm">
          {/* TAB 1: ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* MASKULIN */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-lg bg-blue-600 text-white">
                      der (Maskulin)
                    </span>
                    <AudioButton text="der Mann, der Tag, der Tisch" size="sm" />
                  </div>
                  <p className="text-xs font-bold text-blue-950">Typische Endungen:</p>
                  <ul className="text-xs text-blue-900 space-y-1 list-disc list-inside font-medium">
                    <li><strong>-er:</strong> der Lehrer, der Computer</li>
                    <li><strong>-or:</strong> der Motor, der Doktor</li>
                    <li><strong>-ling:</strong> der Frühling</li>
                    <li><strong>-ist:</strong> der Polizist, der Tourist</li>
                    <li>Wochentage & Monate: <em>der Montag, der Mai</em></li>
                  </ul>
                </div>

                {/* FEMININ */}
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-lg bg-rose-600 text-white">
                      die (Feminin)
                    </span>
                    <AudioButton text="die Frau, die Sonne, die Lampe" size="sm" />
                  </div>
                  <p className="text-xs font-bold text-rose-950">Typische Endungen:</p>
                  <ul className="text-xs text-rose-900 space-y-1 list-disc list-inside font-medium">
                    <li><strong>-ung:</strong> die Wohnung, die Zeitung</li>
                    <li><strong>-heit / -keit:</strong> die Freiheit</li>
                    <li><strong>-schaft:</strong> die Freundschaft</li>
                    <li><strong>-e (ca. 90%):</strong> die Tasche</li>
                    <li><strong>-ei / -in:</strong> die Bäckerei, die Ärztin</li>
                  </ul>
                </div>

                {/* NEUTRAL */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white">
                      das (Neutral)
                    </span>
                    <AudioButton text="das Kind, das Buch, das Auto" size="sm" />
                  </div>
                  <p className="text-xs font-bold text-emerald-950">Typische Endungen:</p>
                  <ul className="text-xs text-emerald-900 space-y-1 list-disc list-inside font-medium">
                    <li><strong>-chen / -lein:</strong> das Mädchen</li>
                    <li><strong>-ment:</strong> das Dokument</li>
                    <li><strong>-um:</strong> das Museum, das Zentrum</li>
                    <li>Substantivierte Verben: <em>das Essen, das Trinken</em></li>
                  </ul>
                </div>
              </div>

              {/* Bestimmter & Unbestimmter Artikel Tabelle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">
                  Übersicht: Bestimmter & Unbestimmter Artikel
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-200/70 text-slate-700 font-bold border-b border-slate-300">
                        <th className="p-2">Kasus</th>
                        <th className="p-2 text-blue-700">Maskulin (m)</th>
                        <th className="p-2 text-rose-700">Feminin (f)</th>
                        <th className="p-2 text-emerald-700">Neutral (n)</th>
                        <th className="p-2 text-purple-700">Plural (pl)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-2 font-bold">Nominativ</td>
                        <td className="p-2 font-medium">der / ein</td>
                        <td className="p-2 font-medium">die / eine</td>
                        <td className="p-2 font-medium">das / ein</td>
                        <td className="p-2 font-medium">die / —</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">Akkusativ</td>
                        <td className="p-2 font-bold text-blue-800 bg-blue-50/50">den / einen</td>
                        <td className="p-2 font-medium">die / eine</td>
                        <td className="p-2 font-medium">das / ein</td>
                        <td className="p-2 font-medium">die / —</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold">Dativ</td>
                        <td className="p-2 font-medium">dem / einem</td>
                        <td className="p-2 font-bold text-rose-800 bg-rose-50/50">der / einer</td>
                        <td className="p-2 font-medium">dem / einem</td>
                        <td className="p-2 font-medium">den ...-n / —</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CASES */}
          {activeTab === 'cases' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-indigo-950 text-sm">
                    Akkusativ (Direktes Objekt / Wen-Fall)
                  </h3>
                  <AudioButton text="Ich habe einen Apfel. Ich trinke den Kaffee." size="sm" />
                </div>
                <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                  <strong>Wichtigste Merkregel:</strong> Nur maskuline Nomen verändern sich im Akkusativ!
                  <br />
                  <em>der Mann → den Mann</em> | <em>ein Mann → einen Mann</em> | <em>kein Mann → keinen Mann</em>
                </p>
                <div className="pt-2 text-xs text-slate-700 bg-white/80 p-3 rounded-xl border border-indigo-100">
                  <p className="font-bold text-slate-900 mb-1">Typische Verben mit Akkusativ:</p>
                  <span className="font-mono text-indigo-800">
                    haben, brauchen, kaufen, trinken, essen, suchen, finden, sehen, lesen
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-amber-950 text-sm">
                    Dativ (Indirektes Objekt / Wem-Fall)
                  </h3>
                  <AudioButton text="Ich helfe dem Mann. Wie geht es dir?" size="sm" />
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  Im Dativ verändern sich alle Artikel:
                  <br />
                  <em>der / das → dem</em> | <em>die → der</em> | <em>Plural → den (+ -n am Nomen)</em>
                </p>
                <div className="pt-2 text-xs text-slate-700 bg-white/80 p-3 rounded-xl border border-amber-100">
                  <p className="font-bold text-slate-900 mb-1">Typische Verben mit Dativ:</p>
                  <span className="font-mono text-amber-800">
                    helfen, danken, gefallen, gehören, antworten, gratulieren, schmecken
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VERBS */}
          {activeTab === 'verbs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">
                  Regelmäßige Verbkonjugation im Präsens
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block">ich (1. P. Sg.)</span>
                    <strong className="text-indigo-600 font-mono text-sm">-e</strong>
                    <span className="text-slate-600 block text-xs">lern<strong>e</strong></span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block">du (2. P. Sg.)</span>
                    <strong className="text-indigo-600 font-mono text-sm">-st</strong>
                    <span className="text-slate-600 block text-xs">lern<strong>st</strong></span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block">er / sie / es</span>
                    <strong className="text-indigo-600 font-mono text-sm">-t</strong>
                    <span className="text-slate-600 block text-xs">lern<strong>t</strong></span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block">wir (1. P. Pl.)</span>
                    <strong className="text-indigo-600 font-mono text-sm">-en</strong>
                    <span className="text-slate-600 block text-xs">lern<strong>en</strong></span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block">ihr (2. P. Pl.)</span>
                    <strong className="text-indigo-600 font-mono text-sm">-t</strong>
                    <span className="text-slate-600 block text-xs">lern<strong>t</strong></span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block">sie / Sie (3. P. Pl.)</span>
                    <strong className="text-indigo-600 font-mono text-sm">-en</strong>
                    <span className="text-slate-600 block text-xs">lern<strong>en</strong></span>
                  </div>
                </div>
              </div>

              {/* Unregelmäßige Hilfsverben: sein & haben */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-teal-950 text-xs uppercase tracking-wider">sein (to be)</h4>
                    <AudioButton text="ich bin, du bist, er ist, wir sind, ihr seid, sie sind" size="sm" />
                  </div>
                  <p className="text-xs text-teal-900 font-mono font-bold leading-relaxed">
                    bin, bist, ist, sind, seid, sind
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-purple-950 text-xs uppercase tracking-wider">haben (to have)</h4>
                    <AudioButton text="ich habe, du hast, er hat, wir haben, ihr habt, sie haben" size="sm" />
                  </div>
                  <p className="text-xs text-purple-900 font-mono font-bold leading-relaxed">
                    habe, hast, hat, haben, habt, haben
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SYNTAX */}
          {activeTab === 'syntax' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <h3 className="font-bold text-slate-900 text-sm">
                  Hauptsatz-Regel: Verb steht immer auf Position 2!
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">Pos 1</span>
                    <span className="text-slate-800">Ich</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold">Pos 2 (Verb)</span>
                    <span className="text-indigo-700 font-bold">lerne</span>
                    <span className="text-slate-600">heute Deutsch.</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">Pos 1</span>
                    <span className="text-slate-800">Heute</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold">Pos 2 (Verb)</span>
                    <span className="text-indigo-700 font-bold">lerne</span>
                    <span className="text-slate-600">ich Deutsch.</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 italic">
                  Egal was auf Position 1 steht (Subjekt, Zeitangabe, Ort), das konjugierte Verb bleibt strikt auf Position 2.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <h3 className="font-bold text-rose-950 text-sm">
                  Ja/Nein-Frage: Verb auf Position 1!
                </h3>
                <div className="p-2.5 rounded-xl bg-white border border-rose-100 font-mono text-xs text-slate-800">
                  <span className="font-bold text-rose-600">Lernst</span> du heute Deutsch? — Ja, ich lerne Deutsch.
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: QUESTIONS */}
          {activeTab === 'questions' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { w: 'Wer?', trans: 'من؟ (Who?)', ex: 'Wer ist das? — Das ist Herr Müller.' },
                { w: 'Was?', trans: 'ماذا؟ (What?)', ex: 'Was machst du? — Ich koche.' },
                { w: 'Wo?', trans: 'أين؟ (Where?)', ex: 'Wo wohnst du? — In Berlin.' },
                { w: 'Woher?', trans: 'من أين؟ (Where from?)', ex: 'Woher kommst du? — Aus Ägypten.' },
                { w: 'Wohin?', trans: 'إلى أين؟ (Where to?)', ex: 'Wohin gehst du? — Zum Supermarkt.' },
                { w: 'Wie?', trans: 'كيف؟ (How?)', ex: 'Wie heißt du? — Wie geht es dir?' },
                { w: 'Wann?', trans: 'متى؟ (When?)', ex: 'Wann beginnt der Kurs? — Um 9 Uhr.' },
                { w: 'Warum?', trans: 'لماذا؟ (Why?)', ex: 'Warum lernst du Deutsch? — Für die Arbeit.' },
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-indigo-700 text-sm">{item.w}</span>
                    <span className="text-xs text-slate-500 font-medium">{item.trans}</span>
                    <AudioButton text={item.ex} size="sm" />
                  </div>
                  <p className="text-xs text-slate-700 italic">{item.ex}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
