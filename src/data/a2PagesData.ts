import { CoursePage } from '../types';
import { a2PagesPart1 } from './a2PagesPart1';
import { a2PagesPart2 } from './a2PagesPart2';
import { a2PagesPart3 } from './a2PagesPart3';
import { a2PagesPart4 } from './a2PagesPart4';
import { a2PagesPart5 } from './a2PagesPart5';
import { a2PagesPart6 } from './a2PagesPart6';
import { a2PagesPart7 } from './a2PagesPart7';

export const allA2Pages: CoursePage[] = [
  ...a2PagesPart1,
  ...a2PagesPart2,
  ...a2PagesPart3,
  ...a2PagesPart4,
  ...a2PagesPart5,
  ...a2PagesPart6,
  ...a2PagesPart7,
];

export const getA2PageByNumber = (num: number): CoursePage | undefined => {
  return allA2Pages.find((p) => p.pageNumber === num);
};
