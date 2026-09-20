import React, { useState, useEffect, useMemo } from 'react';
import { CoursePage, LanguageMode, SectionFilterType } from './types';
import { allPages, getPageByNumber } from './data/pagesData';
import { chaptersOverview } from './data/chaptersData';
import { allA2Pages, getA2PageByNumber } from './data/a2PagesData';
import { a2ChaptersOverview } from './data/a2ChaptersData';
import { AppSidebar } from './components/AppSidebar';
import { DashboardNavbar, NavViewMode } from './components/DashboardNavbar';
import { ModuleHeroCard } from './components/ModuleHeroCard';
import { VocabularySection } from './components/VocabularySection';
import { DialogueSection } from './components/DialogueSection';
import { TableSection } from './components/TableSection';
import { NumbersSection } from './components/NumbersSection';
import { PronunciationSection } from './components/PronunciationSection';
import { RuleCardSection } from './components/RuleCardSection';
import { ReadingSection } from './components/ReadingSection';
import { ListeningSection } from './components/ListeningSection';
import { SpeakingSection } from './components/SpeakingSection';
import { ExerciseSection } from './components/ExerciseSection';
import { NavigationFooter } from './components/NavigationFooter';
import { CheatSheetModal } from './components/CheatSheetModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { GlobalAudioPlayerBar } from './components/GlobalAudioPlayerBar';
import { AudioSettingsModal } from './components/AudioSettingsModal';
import { GermanStoriesLounge } from './components/GermanStoriesLounge';
import { GermanStoriesSection } from './components/GermanStoriesSection';
import { LandingPage } from './components/LandingPage';
import { VocabularyLibrary } from './components/VocabularyLibrary';
import { GrammarHub } from './components/GrammarHub';
import { A2ComingSoonModal } from './components/A2ComingSoonModal';
import { getPlaybackSpeed, subscribeSpeechState } from './utils/speech';

export function App() {
  // Primary Navigation View: 'landing' | 'course' (A1) | 'course-a2' (A2) | 'stories' | 'vocab' | 'grammar'
  const [activeView, setActiveView] = useState<NavViewMode>(() => {
    const saved = localStorage.getItem('deutsch_active_view');
    if (saved === 'videos') return 'stories';
    if (
      saved === 'landing' ||
      saved === 'course' ||
      saved === 'course-a2' ||
      saved === 'stories' ||
      saved === 'vocab' ||
      saved === 'grammar'
    ) {
      return saved;
    }
    return 'course';
  });

  // Saved Language Mode: 'none' (DE only), 'ar', 'en', 'fr'
  const [languageMode, setLanguageMode] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem('deutsch_lang_mode');
    return (saved as LanguageMode) || 'ar'; // default Arabic bilingual
  });

  // A1 page number (1..24)
  const [activeA1PageNumber, setActiveA1PageNumber] = useState<number>(() => {
    const saved = localStorage.getItem('deutsch_current_page');
    return saved ? parseInt(saved, 10) : 1;
  });

  // A2 page number (1..30)
  const [activeA2PageNumber, setActiveA2PageNumber] = useState<number>(() => {
    const saved = localStorage.getItem('deutsch_current_a2_page');
    return saved ? parseInt(saved, 10) : 1;
  });

  // Section filter
  const [sectionFilter, setSectionFilter] = useState<SectionFilterType>('all');

  // Sidebar toggle state (starts closed so screen is wide and uncluttered)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('deutsch_sidebar_open');
    if (saved !== null) return saved === 'true';
    return false;
  });

  // Modals
  const [showCheatSheet, setShowCheatSheet] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [showAudioSettings, setShowAudioSettings] = useState<boolean>(false);
  const [comingSoonLevel, setComingSoonLevel] = useState<'A2' | 'B1' | null>(null);

  // Translations visibility mask
  const [showTranslations, setShowTranslations] = useState<boolean>(true);

  // Audio speed state synced across the app
  const [audioSpeed, setAudioSpeed] = useState<number>(getPlaybackSpeed());

  useEffect(() => {
    const unsub = subscribeSpeechState((s) => {
      setAudioSpeed(s.speed);
    });
    return unsub;
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem('deutsch_active_view', activeView);
  }, [activeView]);

  useEffect(() => {
    localStorage.setItem('deutsch_lang_mode', languageMode);
  }, [languageMode]);

  useEffect(() => {
    localStorage.setItem('deutsch_sidebar_open', String(isSidebarOpen));
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('deutsch_current_page', activeA1PageNumber.toString());
    if (activeView === 'course') {
      setSectionFilter('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeA1PageNumber, activeView]);

  useEffect(() => {
    localStorage.setItem('deutsch_current_a2_page', activeA2PageNumber.toString());
    if (activeView === 'course-a2') {
      setSectionFilter('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeA2PageNumber, activeView]);

  const isA2 = activeView === 'course-a2';
  const activeCoursePages = isA2 ? allA2Pages : allPages;
  const activeChapters = isA2 ? a2ChaptersOverview : chaptersOverview;
  const currentPageNumber = isA2 ? activeA2PageNumber : activeA1PageNumber;

  // Current page object
  const currentPage: CoursePage = useMemo(() => {
    if (isA2) {
      return getA2PageByNumber(activeA2PageNumber) || allA2Pages[0];
    }
    return getPageByNumber(activeA1PageNumber) || allPages[0];
  }, [isA2, activeA2PageNumber, activeA1PageNumber]);

  // Handle Chapter Switch
  const handleSelectChapter = (chapterNum: number) => {
    const targetChapter = activeChapters.find((c) => c.number === chapterNum);
    if (targetChapter) {
      if (isA2) {
        setActiveA2PageNumber(targetChapter.startPage);
      } else {
        setActiveA1PageNumber(targetChapter.startPage);
      }
    }
  };

  const handleSelectPage = (pageNum: number) => {
    if (isA2) {
      setActiveA2PageNumber(pageNum);
    } else {
      setActiveA1PageNumber(pageNum);
    }
  };

  // Toggle Sidebar helper
  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        if (activeView === 'course' && activeA1PageNumber < allPages.length) {
          setActiveA1PageNumber((p) => p + 1);
        } else if (activeView === 'course-a2' && activeA2PageNumber < allA2Pages.length) {
          setActiveA2PageNumber((p) => p + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (activeView === 'course' && activeA1PageNumber > 1) {
          setActiveA1PageNumber((p) => p - 1);
        } else if (activeView === 'course-a2' && activeA2PageNumber > 1) {
          setActiveA2PageNumber((p) => p - 1);
        }
      } else if (e.key === 'b' || e.key === 'B') {
        setIsSidebarOpen((v) => !v);
      } else if (e.key === 's' || e.key === 'S') {
        setShowCheatSheet((v) => !v);
      } else if (e.key === 'v' || e.key === 'V') {
        setActiveView((v) => (v === 'course' ? 'stories' : 'course'));
      } else if (e.key === '?') {
        setShowShortcuts((v) => !v);
      } else if (e.key === 'Escape') {
        setShowCheatSheet(false);
        setShowShortcuts(false);
        setShowAudioSettings(false);
        setComingSoonLevel(null);
        if (window.innerWidth < 1024) {
          setIsSidebarOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeA1PageNumber, activeA2PageNumber, activeView]);

  // Filter sections logic
  const shouldShowSection = (type: string): boolean => {
    if (sectionFilter === 'all') return true;
    if (sectionFilter === 'vocab' && type === 'vocabulary') return true;
    if (sectionFilter === 'dialogue' && type === 'dialogue') return true;
    if (sectionFilter === 'grammar' && (type === 'table' || type === 'rule_card')) return true;
    if (sectionFilter === 'reading' && type === 'reading') return true;
    if (sectionFilter === 'listening' && type === 'listening') return true;
    if (sectionFilter === 'speaking' && type === 'speaking') return true;
    if (sectionFilter === 'numbers' && type === 'numbers') return true;
    if (sectionFilter === 'pronunciation' && type === 'pronunciation') return true;
    return false;
  };

  const shouldShowExercises = sectionFilter === 'all' || sectionFilter === 'exercises';

  // Render Landing Page View (full width, clean SaaS)
  if (activeView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-reading">
        <LandingPage
          onStartCourse={(lvl) => {
            if (lvl === 'A2') {
              setActiveView('course-a2');
            } else {
              setActiveView('course');
            }
          }}
          onGoToStories={() => setActiveView('stories')}
          onGoToVocab={() => setActiveView('vocab')}
          onGoToGrammar={() => setActiveView('grammar')}
          languageMode={languageMode}
          onLanguageChange={setLanguageMode}
        />
        <GlobalAudioPlayerBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-slate-200 selection:text-slate-950 flex flex-row font-reading">
      {/* Collapsible Left Sidebar with All Navigation & Icon-only Settings Dock */}
      <AppSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentChapterNumber={currentPage.chapterNumber}
        currentPageNumber={currentPageNumber}
        totalPages={activeCoursePages.length}
        onSelectChapter={handleSelectChapter}
        languageMode={languageMode}
        onLanguageChange={setLanguageMode}
        onOpenCheatSheet={() => setShowCheatSheet(true)}
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenAudioSettings={() => setShowAudioSettings(true)}
        onOpenLevelComingSoon={(lvl) => setComingSoonLevel(lvl)}
        showTranslations={showTranslations}
        onToggleTranslations={() => setShowTranslations((v) => !v)}
        audioSpeed={audioSpeed}
        onSpeedChange={setAudioSpeed}
      />

      {/* Main Reading & Learning Canvas */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <DashboardNavbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={handleToggleSidebar}
          currentPage={currentPage}
          totalPages={activeCoursePages.length}
          languageMode={languageMode}
          activeView={activeView}
          onSelectView={setActiveView}
          onOpenLevelComingSoon={(lvl) => setComingSoonLevel(lvl)}
        />

        {/* View Switch Rendering */}
        {activeView === 'stories' ? (
          /* Dedicated German Stories Lounge View */
          <main
            className={`flex-1 w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 transition-all duration-300 ${
              isSidebarOpen ? 'max-w-6xl' : 'max-w-7xl'
            }`}
          >
            <GermanStoriesLounge
              languageMode={languageMode}
              onSwitchToCourse={() => setActiveView('course')}
              onOpenAudioSettings={() => setShowAudioSettings(true)}
              onOpenLevelComingSoon={(lvl) => setComingSoonLevel(lvl)}
            />
          </main>
        ) : activeView === 'vocab' ? (
          /* Dedicated Vocabulary Library View */
          <main
            className={`flex-1 w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 transition-all duration-300 ${
              isSidebarOpen ? 'max-w-6xl' : 'max-w-7xl'
            }`}
          >
            <VocabularyLibrary
              languageMode={languageMode}
              onNavigateToCourse={(lvl) => {
                if (lvl === 'A2') {
                  setActiveView('course-a2');
                } else {
                  setActiveView('course');
                }
              }}
            />
          </main>
        ) : activeView === 'grammar' ? (
          /* Dedicated Grammar Hub View */
          <main
            className={`flex-1 w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 transition-all duration-300 ${
              isSidebarOpen ? 'max-w-6xl' : 'max-w-7xl'
            }`}
          >
            <GrammarHub
              languageMode={languageMode}
              onNavigateToCourse={(lvl) => {
                if (lvl === 'A2') {
                  setActiveView('course-a2');
                } else {
                  setActiveView('course');
                }
              }}
            />
          </main>
        ) : (
          /* Focused Course Workspace View (A1 or A2) */
          <main
            className={`flex-1 w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 space-y-8 transition-all duration-300 ${
              isSidebarOpen ? 'max-w-5xl' : 'max-w-6xl'
            }`}
          >
            {/* Level Banner for A2 or A1 */}
            {isA2 && (
              <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200/80 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-purple-900 font-bold">
                  <span className="px-2 py-0.5 rounded-md bg-purple-700 text-white font-mono text-[11px]">
                    Niveau A2
                  </span>
                  <span>Aufbaustufe · 20 Kapitel · 40 Lektionen</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView('course')}
                  className="text-purple-700 hover:text-purple-900 font-semibold cursor-pointer underline underline-offset-2"
                >
                  Zu A1 wechseln →
                </button>
              </div>
            )}

            {/* Active Module & Scenario Visual Hero Card */}
            <ModuleHeroCard
              currentPage={currentPage}
              languageMode={languageMode}
              onSelectFilter={setSectionFilter}
            />

            {/* Content Sections with generous spacing */}
            <div className="space-y-6">
              {currentPage.sections.map((section) => {
                if (!shouldShowSection(section.type)) return null;

                if (section.type === 'vocabulary') {
                  return (
                    <div key={section.id} id="section-vocabulary">
                      <VocabularySection
                        section={section}
                        languageMode={languageMode}
                        showTranslations={showTranslations}
                      />
                    </div>
                  );
                }

                if (section.type === 'dialogue') {
                  return (
                    <div key={section.id} id="section-dialogue">
                      <DialogueSection
                        section={section}
                        languageMode={languageMode}
                        showTranslations={showTranslations}
                      />
                    </div>
                  );
                }

                if (section.type === 'table') {
                  return (
                    <TableSection
                      key={section.id}
                      section={section}
                      languageMode={languageMode}
                      showTranslations={showTranslations}
                    />
                  );
                }

                if (section.type === 'numbers') {
                  return (
                    <NumbersSection
                      key={section.id}
                      section={section}
                      languageMode={languageMode}
                    />
                  );
                }

                if (section.type === 'pronunciation') {
                  return (
                    <PronunciationSection
                      key={section.id}
                      section={section}
                      languageMode={languageMode}
                    />
                  );
                }

                if (section.type === 'rule_card') {
                  return (
                    <RuleCardSection
                      key={section.id}
                      section={section}
                      languageMode={languageMode}
                    />
                  );
                }

                if (section.type === 'reading') {
                  return (
                    <div key={section.id} id="section-reading">
                      <ReadingSection
                        section={section}
                        languageMode={languageMode}
                        showTranslations={showTranslations}
                      />
                    </div>
                  );
                }

                if (section.type === 'listening') {
                  return (
                    <div key={section.id} id="section-listening">
                      <ListeningSection
                        section={section}
                        languageMode={languageMode}
                      />
                    </div>
                  );
                }

                if (section.type === 'speaking') {
                  return (
                    <div key={section.id} id="section-speaking">
                      <SpeakingSection
                        section={section}
                        languageMode={languageMode}
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* Interactive Exercises */}
            {shouldShowExercises && currentPage.exercises && currentPage.exercises.length > 0 && (
              <div id="section-exercises" className="space-y-5 pt-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <h2 className="font-bold text-slate-900 text-xl tracking-tight">
                      Übungen zum Modul
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {currentPage.exercises.length} Aufgaben
                    </span>
                  </div>
                </div>

                {currentPage.exercises.map((exercise) => (
                  <ExerciseSection
                    key={exercise.id}
                    exercise={exercise}
                    languageMode={languageMode}
                    pageId={currentPage.pageNumber}
                  />
                ))}
              </div>
            )}

            {/* In-Course German Voice Stories Section */}
            {!isA2 && (
              <GermanStoriesSection
                languageMode={languageMode}
                onOpenFullLounge={() => setActiveView('stories')}
              />
            )}

            {/* Clean Navigation Footer */}
            <NavigationFooter
              currentPage={currentPage}
              allPages={activeCoursePages}
              chapters={activeChapters}
              onSelectPage={handleSelectPage}
              languageMode={languageMode}
            />
          </main>
        )}
      </div>

      {/* Global Audio Control Bar */}
      <GlobalAudioPlayerBar />

      {/* Audio Options Modal */}
      <AudioSettingsModal
        isOpen={showAudioSettings}
        onClose={() => setShowAudioSettings(false)}
        languageMode={languageMode}
      />

      {/* A1/A2 Cheat Sheet (Spickzettel) */}
      <CheatSheetModal
        isOpen={showCheatSheet}
        onClose={() => setShowCheatSheet(false)}
        languageMode={languageMode}
      />

      {/* Keyboard Shortcuts Guide */}
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      {/* B1 Level In Preparation Modal */}
      <A2ComingSoonModal
        isOpen={comingSoonLevel !== null}
        onClose={() => setComingSoonLevel(null)}
        languageMode={languageMode}
        levelRequested={comingSoonLevel || 'B1'}
      />
    </div>
  );
}

export default App;
