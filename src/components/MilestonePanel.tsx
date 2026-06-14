import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Stars, Telescope, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { LearningEntry } from '@/types/entry'
import { milestoneLabelMap, statusLabelMap } from '@/types/entry'

const levelIconMap = {
  spark: Sparkles,
  step: Telescope,
  breakthrough: Stars,
  mastery: Trophy,
} as const

interface MilestonePanelProps {
  entries: LearningEntry[]
}

export function MilestonePanel({ entries }: MilestonePanelProps) {
  const featured = [...entries]
    .filter((entry) => ['breakthrough', 'mastery'].includes(entry.milestoneLevel))
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 3)

  return (
    <section className="rounded-[32px] border border-[var(--line)] bg-[rgba(248,245,237,0.86)] p-5 shadow-[0_24px_80px_rgba(16,24,40,0.12)] backdrop-blur md:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
            Featured Milestones
          </p>
          <h2 className="mt-2 font-display text-2xl text-[var(--accent-strong)]">
            最近最值得记住的突破
          </h2>
        </div>
        <div className="hidden rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-sm text-[var(--muted)] md:block">
          重点看那些真正改变学习方法的瞬间
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {featured.map((entry, index) => {
          const Icon = levelIconMap[entry.milestoneLevel]

          return (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group rounded-[28px] border border-[var(--line)] bg-[linear-gradient(160deg,rgba(255,255,255,0.94),rgba(243,236,221,0.88))] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[0_18px_50px_rgba(33,38,45,0.16)]"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(248,245,237,0.88)] px-3 py-1 text-xs text-[var(--muted)]">
                  <Icon className="h-3.5 w-3.5" />
                  {milestoneLabelMap[entry.milestoneLevel]}
                </span>
                <span className="font-mono text-xs text-[var(--muted)]">{entry.date}</span>
              </div>

              <h3 className="min-h-[64px] font-display text-xl leading-tight text-[var(--ink)]">
                {entry.title}
              </h3>
              <p className="mt-3 min-h-[84px] text-sm leading-7 text-[var(--ink-soft)]">
                {entry.finalGain}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--accent-strong)]">
                  {statusLabelMap[entry.status]}
                </span>
                <Link
                  to={`/entry/${entry.id}`}
                  className="inline-flex items-center gap-2 text-sm text-[var(--accent-strong)] transition group-hover:translate-x-1"
                >
                  查看复盘
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
