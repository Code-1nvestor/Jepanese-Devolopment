import type { LearningEntry, MilestoneLevel } from '@/types/entry'

export interface EntryFilters {
  query: string
  status: 'all' | 'resolved' | 'ongoing'
  milestone: 'all' | MilestoneLevel
  tag: string
}

export interface TimelineStats {
  total: number
  resolved: number
  ongoing: number
  breakthroughs: number
  uniqueTags: number
}

export function filterEntries(entries: LearningEntry[], filters: EntryFilters) {
  const query = filters.query.trim().toLowerCase()

  return [...entries]
    .filter((entry) => {
      if (filters.status !== 'all' && entry.status !== filters.status) {
        return false
      }

      if (filters.milestone !== 'all' && entry.milestoneLevel !== filters.milestone) {
        return false
      }

      if (filters.tag && !entry.tags.includes(filters.tag)) {
        return false
      }

      if (!query) {
        return true
      }

      return [
        entry.title,
        entry.insight,
        entry.confusion,
        entry.resolution,
        entry.finalGain,
        entry.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
    .sort((left, right) => right.date.localeCompare(left.date))
}

export function buildStats(entries: LearningEntry[]): TimelineStats {
  const tagSet = new Set(entries.flatMap((entry) => entry.tags))

  return {
    total: entries.length,
    resolved: entries.filter((entry) => entry.status === 'resolved').length,
    ongoing: entries.filter((entry) => entry.status === 'ongoing').length,
    breakthroughs: entries.filter((entry) =>
      ['breakthrough', 'mastery'].includes(entry.milestoneLevel),
    ).length,
    uniqueTags: tagSet.size,
  }
}

export function extractTags(entries: LearningEntry[]) {
  return Array.from(new Set(entries.flatMap((entry) => entry.tags))).sort((left, right) =>
    left.localeCompare(right, 'zh-Hans-CN'),
  )
}

export function getAdjacentEntries(entries: LearningEntry[], entryId: string) {
  const ordered = [...entries].sort((left, right) => right.date.localeCompare(left.date))
  const index = ordered.findIndex((entry) => entry.id === entryId)

  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null,
  }
}
