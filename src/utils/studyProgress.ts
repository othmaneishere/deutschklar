// Local Storage Persistence for Learning Progress, Streak, and Favorites (Merkliste)

export interface FavoriteItem {
  id: string;
  de: string;
  translation?: string;
  chapterNumber: number;
  pageNumber: number;
  gender?: 'der' | 'die' | 'das';
  category?: string;
}

type Listener = () => void;
const progressListeners: Set<Listener> = new Set();
const favoritesListeners: Set<Listener> = new Set();

export function subscribeProgress(listener: Listener): () => void {
  progressListeners.add(listener);
  return () => progressListeners.delete(listener);
}

export function subscribeFavorites(listener: Listener): () => void {
  favoritesListeners.add(listener);
  return () => favoritesListeners.delete(listener);
}

// ----------------- PAGE COMPLETION -----------------

export function getCompletedPages(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('deutsch_completed_pages');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isPageCompleted(pageNumber: number): boolean {
  const completed = getCompletedPages();
  return completed.includes(pageNumber);
}

export function togglePageCompleted(pageNumber: number): boolean {
  if (typeof window === 'undefined') return false;
  const current = getCompletedPages();
  let updated: number[];
  let isNowCompleted = false;

  if (current.includes(pageNumber)) {
    updated = current.filter((p) => p !== pageNumber);
  } else {
    updated = [...current, pageNumber];
    isNowCompleted = true;
  }

  localStorage.setItem('deutsch_completed_pages', JSON.stringify(updated));
  recordStudyActivity();
  progressListeners.forEach((l) => l());
  return isNowCompleted;
}

// ----------------- STREAK TRACKING -----------------

export function recordStudyActivity() {
  if (typeof window === 'undefined') return;
  const today = new Date().toISOString().slice(0, 10);
  const lastActive = localStorage.getItem('deutsch_last_active_date');
  let streak = parseInt(localStorage.getItem('deutsch_study_streak') || '1', 10);

  if (!lastActive) {
    localStorage.setItem('deutsch_last_active_date', today);
    localStorage.setItem('deutsch_study_streak', '1');
    return;
  }

  if (lastActive === today) {
    // Already recorded today
    return;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (lastActive === yesterday) {
    streak += 1;
  } else {
    streak = 1; // Reset streak if missed more than 1 day
  }

  localStorage.setItem('deutsch_last_active_date', today);
  localStorage.setItem('deutsch_study_streak', streak.toString());
}

export function getStudyStreak(): number {
  if (typeof window === 'undefined') return 1;
  return parseInt(localStorage.getItem('deutsch_study_streak') || '1', 10);
}

// ----------------- FAVORITES / MERKLISTE -----------------

export function getFavorites(): FavoriteItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('deutsch_favorites');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(id: string): boolean {
  const list = getFavorites();
  return list.some((item) => item.id === id);
}

export function toggleFavorite(item: FavoriteItem): boolean {
  if (typeof window === 'undefined') return false;
  const list = getFavorites();
  const exists = list.some((f) => f.id === item.id);
  let updated: FavoriteItem[];

  if (exists) {
    updated = list.filter((f) => f.id !== item.id);
  } else {
    updated = [item, ...list];
  }

  localStorage.setItem('deutsch_favorites', JSON.stringify(updated));
  favoritesListeners.forEach((l) => l());
  return !exists;
}

export function clearFavorites() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('deutsch_favorites');
  favoritesListeners.forEach((l) => l());
}
