import { CoursePage } from '../types';
import { chapter01to04 } from './a1/chapter01to04';
import { chapter05to08 } from './a1/chapter05to08';
import { chapter09to12 } from './a1/chapter09to12';
import { chapter13to16 } from './a1/chapter13to16';
import { chapter17to20 } from './a1/chapter17to20';

export const allPages: CoursePage[] = [
  ...chapter01to04,
  ...chapter05to08,
  ...chapter09to12,
  ...chapter13to16,
  ...chapter17to20,
];

export const getPageByNumber = (num: number): CoursePage | undefined => {
  return allPages.find(p => p.pageNumber === num);
};

export const getTotalPages = (): number => {
  return allPages.length;
};
