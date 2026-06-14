import { describe, expect, it } from 'vitest'

import { sampleEntries } from '@/lib/mockData'
import { buildStats, filterEntries, getAdjacentEntries } from '@/utils/entries'

describe('entries utilities', () => {
  it('filters entries by status, milestone and keyword', () => {
    const result = filterEntries(sampleEntries, {
      query: '助词',
      status: 'resolved',
      milestone: 'breakthrough',
      tag: '',
    })

    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('entry-particle-wa-ga')
  })

  it('builds summary stats for timeline overview', () => {
    const stats = buildStats(sampleEntries)

    expect(stats.total).toBe(4)
    expect(stats.resolved).toBe(3)
    expect(stats.ongoing).toBe(1)
    expect(stats.breakthroughs).toBe(2)
    expect(stats.uniqueTags).toBeGreaterThanOrEqual(10)
  })

  it('returns adjacent entries around a selected record', () => {
    const { previous, next } = getAdjacentEntries(sampleEntries, 'entry-te-form')

    expect(previous?.id).toBe('entry-shadowing-break')
    expect(next?.id).toBe('entry-kanji-radical')
  })
})
