import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { createEntryId, getInitialEntries, normalizeTags } from '@/lib/storage'
import type { EntryDraft, LearningEntry } from '@/types/entry'

interface JournalState {
  entries: LearningEntry[]
  addEntry: (draft: EntryDraft) => string
  getEntryById: (id: string) => LearningEntry | null
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: getInitialEntries(),
      addEntry: (draft) => {
        const timestamp = new Date().toISOString()
        const nextEntry: LearningEntry = {
          id: createEntryId(),
          title: draft.title.trim(),
          date: draft.date,
          insight: draft.insight.trim(),
          confusion: draft.confusion.trim(),
          resolution: draft.resolution.trim(),
          finalGain: draft.finalGain.trim(),
          tags: normalizeTags(draft.tagsText),
          status: draft.status,
          milestoneLevel: draft.milestoneLevel,
          createdAt: timestamp,
          updatedAt: timestamp,
        }

        set((state) => ({
          entries: [nextEntry, ...state.entries].sort((left, right) =>
            right.date.localeCompare(left.date),
          ),
        }))

        return nextEntry.id
      },
      getEntryById: (id) => get().entries.find((entry) => entry.id === id) ?? null,
    }),
    {
      name: 'jp-milestone-journal',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
