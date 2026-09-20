export type LanguageMode = 'none' | 'ar' | 'en' | 'fr';

export interface MultiLangText {
  de: string;
  ar: string;
  en: string;
  fr: string;
}

export interface VocabularyItem {
  de: string;
  ar: string;
  en: string;
  fr: string;
  noteDe?: string;
  noteAr?: string;
  noteEn?: string;
  noteFr?: string;
  gender?: 'der' | 'die' | 'das';
}

export type SimpleTableRow = string[];
export interface MultiLangTableRow {
  de: string[];
  ar?: string[];
  en?: string[];
  fr?: string[];
}
export type TableRow = MultiLangTableRow | SimpleTableRow;

export interface TableData {
  headers?: string[];
  headersDe?: string[];
  headersAr?: string[];
  headersEn?: string[];
  headersFr?: string[];
  rows: TableRow[];
}

export interface DialogueLine {
  speaker: string;
  textDe: string;
  textAr: string;
  textEn: string;
  textFr: string;
}

export interface PronunciationRule {
  sound: string;
  arHint: string;
  enHint: string;
  frHint: string;
  examples: { word: string; translation: { ar: string; en: string; fr: string } }[];
}

export interface NumberItem {
  num: string | number;
  wordDe: string;
  wordAr: string;
  wordEn: string;
  wordFr: string;
}

export interface ReadingComprehensionQuestion {
  id: string;
  questionDe: string;
  questionAr?: string;
  questionEn?: string;
  questionFr?: string;
  options: string[];
  correctIndex: number;
  explanationDe?: string;
}

export interface ReadingTextData {
  titleDe: string;
  titleAr?: string;
  titleEn?: string;
  titleFr?: string;
  textDe: string;
  textAr?: string;
  textEn?: string;
  textFr?: string;
  contextDe?: string;
  contextAr?: string;
  contextEn?: string;
  contextFr?: string;
  comprehensionQuestions?: ReadingComprehensionQuestion[];
}

export interface ListeningQuestion {
  id: string;
  questionDe: string;
  options: string[];
  correctIndex: number;
  explanationDe?: string;
}

export interface ListeningActivityData {
  audioScriptDe: string;
  audioScriptAr?: string;
  audioScriptEn?: string;
  audioScriptFr?: string;
  situationDe: string;
  situationAr?: string;
  situationEn?: string;
  situationFr?: string;
  questions: ListeningQuestion[];
}

export interface SpeakingPhrase {
  phraseDe?: string;
  phraseAr?: string;
  phraseEn?: string;
  phraseFr?: string;
  de?: string;
  ar?: string;
  en?: string;
  fr?: string;
}

export interface SpeakingScenario {
  roleDe: string;
  starterDe: string;
  suggestedResponsesDe: string[];
}

export interface SpeakingTaskData {
  promptDe: string;
  promptAr?: string;
  promptEn?: string;
  promptFr?: string;
  usefulPhrases?: SpeakingPhrase[];
  scenarios?: SpeakingScenario[];
}

export interface SentenceOrderExerciseData {
  id: string;
  wordsShuffled: string[];
  correctSentence: string;
  translation?: { ar: string; en: string; fr: string };
  hint?: string;
}

export interface TransformationItem {
  id: string;
  originalSentence: string;
  transformationPromptDe: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
  hint?: string;
  translation?: { ar: string; en: string; fr: string };
}

export type SectionType = 
  | 'vocabulary'
  | 'dialogue'
  | 'table'
  | 'pronunciation'
  | 'numbers'
  | 'rule_card'
  | 'qa_list'
  | 'reading'
  | 'listening'
  | 'speaking';

export interface ContentSection {
  id: string;
  titleDe: string;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  type: SectionType;
  descriptionDe?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  vocabItems?: VocabularyItem[];
  dialogueLines?: DialogueLine[];
  tableData?: TableData;
  pronunciationRules?: PronunciationRule[];
  numberItems?: NumberItem[];
  rulePoints?: { de: string; ar: string; en: string; fr: string }[];
  qaItems?: { qDe: string; qAr: string; qEn: string; qFr: string; aDe?: string; aAr?: string; aEn?: string; aFr?: string }[];
  readingText?: ReadingTextData;
  listeningActivity?: ListeningActivityData;
  speakingTask?: SpeakingTaskData;
}

export interface MatchingPair {
  leftDe?: string;
  rightKey?: string;
  translations?: { ar: string; en: string; fr: string };
  left?: string;
  right?: string;
  rightAr?: string;
  rightEn?: string;
  rightFr?: string;
}

export interface BlankItem {
  id?: string;
  prefixDe?: string;
  suffixDe?: string;
  sentenceBeforeDe?: string;
  sentenceAfterDe?: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
  hint?: string;
  translation?: { ar: string; en: string; fr: string };
}

export interface MultipleChoiceItem {
  id: string;
  questionDe: string;
  options: string[];
  correctIndex: number;
  explanationDe?: string;
  translations?: { ar: string; en: string; fr: string };
}

export interface AnsweringItem {
  id: string;
  questionDe: string;
  questionAr: string;
  questionEn: string;
  questionFr: string;
  sampleAnswerDe: string;
}

export interface WritingPrompt {
  promptDe: string;
  promptAr?: string;
  promptEn?: string;
  promptFr?: string;
  sampleAnswerDe?: string;
  guidelinesDe?: string[];
}

export interface WritingTask {
  promptDe?: string;
  promptAr?: string;
  promptEn?: string;
  promptFr?: string;
  exampleDe?: string[];
  situationDe?: string;
  situationAr?: string;
  situationEn?: string;
  situationFr?: string;
  guidingQuestions?: string[];
  modelAnswerDe?: string;
}

export interface Exercise {
  id: string;
  titleDe: string;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  type: 'matching' | 'blanks' | 'answering' | 'writing' | 'multiple_choice' | 'sentence_order' | 'transformation';
  instructionDe: string;
  instructionAr: string;
  instructionEn: string;
  instructionFr: string;
  matchingPairs?: MatchingPair[];
  blanks?: BlankItem[];
  multipleChoice?: MultipleChoiceItem[];
  answeringQuestions?: AnsweringItem[];
  writingTask?: WritingTask;
  writingPrompt?: WritingPrompt;
  sentenceOrderItems?: SentenceOrderExerciseData[];
  transformationItems?: TransformationItem[];
}

export interface CoursePage {
  id: number; // 1 to 20
  pageNumber: number;
  chapterNumber: number;
  chapterTitleDe: string;
  chapterTitleAr: string;
  chapterTitleEn: string;
  chapterTitleFr: string;
  pageTitleDe: string;
  pageTitleAr: string;
  pageTitleEn: string;
  pageTitleFr: string;
  subtitleDe?: string;
  subtitleAr?: string;
  subtitleEn?: string;
  subtitleFr?: string;
  objectivesDe?: string[];
  objectivesAr?: string[];
  objectivesEn?: string[];
  objectivesFr?: string[];
  sections: ContentSection[];
  exercises: Exercise[];
}

export interface ChapterOverview {
  number: number;
  titleDe: string;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  topicsDe: string;
  topicsAr: string;
  topicsEn: string;
  topicsFr: string;
  startPage: number;
}

export type SectionFilterType =
  | 'all'
  | 'vocab'
  | 'dialogue'
  | 'grammar'
  | 'reading'
  | 'listening'
  | 'speaking'
  | 'numbers'
  | 'pronunciation'
  | 'exercises';

