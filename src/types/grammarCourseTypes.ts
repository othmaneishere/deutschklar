// Type definitions for the Comprehensive German Grammar Course

export interface VisualSentenceSegment {
  text: string;
  role: string; // e.g., 'Subjekt (Nominativ)', 'Verb (Position 2)', 'Dativ-Objekt', 'Akkusativ-Objekt', 'Verb am Ende', etc.
  color: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'slate' | 'indigo';
  explanation?: string;
}

export interface VisualSentenceBreakdown {
  titleDe: string;
  titleEn: string;
  titleAr?: string;
  titleFr?: string;
  sentenceDe: string;
  sentenceEn: string;
  segments: VisualSentenceSegment[];
  noteDe?: string;
  noteEn?: string;
}

export interface GrammarExample {
  de: string;
  en: string;
  ar?: string;
  fr?: string;
  highlight?: string;
  note?: string;
}

export interface CommonMistake {
  incorrectDe: string;
  correctDe: string;
  explanationDe: string;
  explanationEn: string;
  explanationAr?: string;
  explanationFr?: string;
}

export interface DialogueLine {
  speaker: string;
  de: string;
  en: string;
  ar?: string;
  fr?: string;
  highlight?: string;
}

export interface MiniDialogue {
  titleDe: string;
  titleEn: string;
  contextDe: string;
  contextEn: string;
  lines: DialogueLine[];
}

export interface PracticeQuestion {
  id: string;
  type: 'multiple_choice' | 'fill_in' | 'reorder';
  promptDe: string;
  promptEn: string;
  promptAr?: string;
  promptFr?: string;
  // For multiple_choice
  options?: string[];
  correctIndex?: number;
  // For fill_in
  beforeGap?: string;
  afterGap?: string;
  correctAnswer?: string;
  // For reorder
  wordsShuffled?: string[];
  correctOrderSentence?: string;
  // Feedback
  explanationDe: string;
  explanationEn: string;
}

export interface GrammarLesson {
  id: string;
  slug: string;
  moduleNumber: number;
  lessonNumber: number;
  titleDe: string;
  titleEn: string;
  titleAr: string;
  titleFr: string;
  category: string; // e.g. 'Nomen & Artikel', 'Verben & Konjugation', 'Satzbau & Syntax', etc.
  durationMinutes: number;
  overviewDe: string;
  overviewEn: string;
  overviewAr: string;
  overviewFr: string;
  coreRuleDe: string;
  coreRuleEn: string;
  coreRuleAr: string;
  coreRuleFr: string;
  deepExplanationDe: string[];
  deepExplanationEn: string[];
  sentenceBreakdowns: VisualSentenceBreakdown[];
  tables: {
    titleDe: string;
    titleEn: string;
    headers: string[];
    rows: string[][];
    captionDe?: string;
    captionEn?: string;
  }[];
  examples: GrammarExample[];
  commonMistakes: CommonMistake[];
  miniDialogue: MiniDialogue;
  exercises: PracticeQuestion[];
}

export interface GrammarModule {
  id: string;
  number: number;
  moduleNumber: number; // alias
  titleDe: string;
  titleEn: string;
  titleAr: string;
  titleFr: string;
  descriptionDe: string;
  descriptionEn: string;
  color: string;
  lessonIds: string[];
}

export type GrammarCourseModule = GrammarModule;
export type GrammarExercise = PracticeQuestion;

