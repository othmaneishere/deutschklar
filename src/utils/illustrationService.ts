// Service for generating and managing chapter hero illustrations via Gemini AI

export interface ChapterIllustration {
  chapterNumber: number;
  type: 'svg' | 'raster';
  content: string; // raw SVG markup or base64 data URL
  promptUsed?: string;
  timestamp: number;
}

const STORAGE_KEY = 'deutsch_custom_illustrations';

// Read all cached custom illustrations
export function getSavedIllustrations(): Record<number, ChapterIllustration> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Failed to parse saved illustrations:', err);
    return {};
  }
}

// Get saved custom illustration for a specific chapter
export function getChapterIllustration(chapterNumber: number): ChapterIllustration | null {
  const all = getSavedIllustrations();
  return all[chapterNumber] || null;
}

// Save a newly generated illustration
export function saveChapterIllustration(illustration: ChapterIllustration) {
  try {
    const all = getSavedIllustrations();
    all[illustration.chapterNumber] = illustration;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to save illustration:', err);
  }
}

// Remove / reset back to curated default
export function resetChapterIllustration(chapterNumber: number) {
  try {
    const all = getSavedIllustrations();
    delete all[chapterNumber];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to delete illustration:', err);
  }
}

export interface GenerateIllustrationParams {
  chapterNumber: number;
  chapterTitle: string;
  topics?: string;
  format?: 'svg' | 'raster';
  customPrompt?: string;
}

// Call backend API to generate illustration
export async function requestAiIllustration(
  params: GenerateIllustrationParams
): Promise<ChapterIllustration> {
  const response = await fetch('/api/generate-illustration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server returned ${response.status}`);
  }

  const result = await response.json();
  const illustration: ChapterIllustration = {
    chapterNumber: params.chapterNumber,
    type: result.type || 'svg',
    content: result.content,
    promptUsed: result.promptUsed,
    timestamp: Date.now(),
  };

  saveChapterIllustration(illustration);
  return illustration;
}
