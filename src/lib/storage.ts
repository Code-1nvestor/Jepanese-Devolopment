import { sampleEntries } from '@/lib/mockData'
import type { LearningEntry } from '@/types/entry'

const STORAGE_KEY = 'jp-milestone-journal'

interface StorageShape {
  state?: {
    entries?: LearningEntry[]
  }
}

export function getInitialEntries(): LearningEntry[] {
  if (typeof window === 'undefined') {
    return sampleEntries
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return sampleEntries
  }

  try {
    const parsed = JSON.parse(raw) as StorageShape
    const entries = parsed.state?.entries
    return entries && entries.length > 0 ? entries : sampleEntries
  } catch {
    return sampleEntries
  }
}

export function createEntryId() {
  return `entry-${Math.random().toString(36).slice(2, 10)}`
}

export function normalizeTags(tagsText: string) {
  return tagsText
    .split(/[,\n，]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}
