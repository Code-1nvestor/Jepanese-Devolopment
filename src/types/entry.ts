export type EntryStatus = 'resolved' | 'ongoing'

export type MilestoneLevel = 'spark' | 'step' | 'breakthrough' | 'mastery'

export interface LearningEntry {
  id: string
  title: string
  date: string
  insight: string
  confusion: string
  resolution: string
  finalGain: string
  tags: string[]
  status: EntryStatus
  milestoneLevel: MilestoneLevel
  createdAt: string
  updatedAt: string
}

export interface EntryDraft {
  title: string
  date: string
  insight: string
  confusion: string
  resolution: string
  finalGain: string
  tagsText: string
  status: EntryStatus
  milestoneLevel: MilestoneLevel
}

export const milestoneLabelMap: Record<MilestoneLevel, string> = {
  spark: '灵光一现',
  step: '稳步推进',
  breakthrough: '关键突破',
  mastery: '阶段掌握',
}

export const statusLabelMap: Record<EntryStatus, string> = {
  ongoing: '仍在消化',
  resolved: '已经吃透',
}

export const milestoneOptions: MilestoneLevel[] = [
  'spark',
  'step',
  'breakthrough',
  'mastery',
]

export const statusOptions: EntryStatus[] = ['ongoing', 'resolved']
