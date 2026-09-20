import { GrammarLesson } from '../types/grammarCourseTypes';
import { LESSONS_PART_1 } from './grammarCourseLessonsPart1';
import { LESSONS_PART_2 } from './grammarCourseLessonsPart2';
import { LESSONS_PART_3 } from './grammarCourseLessonsPart3';
import { LESSONS_PART_4 } from './grammarCourseLessonsPart4';
import { LESSONS_PART_5 } from './grammarCourseLessonsPart5';
import { LESSONS_PART_6 } from './grammarCourseLessonsPart6';
import { LESSONS_PART_7 } from './grammarCourseLessonsPart7';

export const ALL_GRAMMAR_LESSONS: GrammarLesson[] = [
  ...LESSONS_PART_1,
  ...LESSONS_PART_2,
  ...LESSONS_PART_3,
  ...LESSONS_PART_4,
  ...LESSONS_PART_5,
  ...LESSONS_PART_6,
  ...LESSONS_PART_7,
];

export function getLessonById(id: string): GrammarLesson | undefined {
  return ALL_GRAMMAR_LESSONS.find((l) => l.id === id || l.slug === id);
}

export function getLessonsByModule(moduleNumber: number): GrammarLesson[] {
  return ALL_GRAMMAR_LESSONS.filter((l) => l.moduleNumber === moduleNumber);
}

export function getNextLesson(currentLessonId: string): GrammarLesson | undefined {
  const index = ALL_GRAMMAR_LESSONS.findIndex((l) => l.id === currentLessonId || l.slug === currentLessonId);
  if (index >= 0 && index < ALL_GRAMMAR_LESSONS.length - 1) {
    return ALL_GRAMMAR_LESSONS[index + 1];
  }
  return undefined;
}

export function getPreviousLesson(currentLessonId: string): GrammarLesson | undefined {
  const index = ALL_GRAMMAR_LESSONS.findIndex((l) => l.id === currentLessonId || l.slug === currentLessonId);
  if (index > 0) {
    return ALL_GRAMMAR_LESSONS[index - 1];
  }
  return undefined;
}
