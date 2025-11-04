// lib/progress.ts
export const storageKey = (id: string) => `klinikmat:case:${id}`;

export type SavedProgress = {
  indice: number;
  score: number;
  mcqAnswers: Record<string, string>;
  shortAnswers: Record<string, string>;
};

export function readProgress(id: string): SavedProgress | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(storageKey(id));
  if (!raw) return null;
  try { return JSON.parse(raw) as SavedProgress; } catch { return null; }
}

export function clearProgress(id: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(storageKey(id));
}
