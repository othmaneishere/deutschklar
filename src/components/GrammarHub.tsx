import React from 'react';
import { LanguageMode } from '../types';
import { GrammarCourseView } from './GrammarCourseView';

interface GrammarHubProps {
  languageMode: LanguageMode;
  onNavigateToCourse?: (level: 'A1' | 'A2') => void;
}

export const GrammarHub: React.FC<GrammarHubProps> = ({
  languageMode,
  onNavigateToCourse,
}) => {
  return (
    <GrammarCourseView
      languageMode={languageMode}
      onNavigateToCourse={onNavigateToCourse}
    />
  );
};
