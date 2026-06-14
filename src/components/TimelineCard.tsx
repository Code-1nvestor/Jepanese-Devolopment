import { motion } from 'framer-motion'
import { ArrowRight, CircleDot, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { LearningEntry } from '@/types/entry'
import { milestoneLabelMap, statusLabelMap } from '@/types/entry'

interface TimelineCardProps {
  entry: LearningEntry
  index: number
}

export function TimelineCard({ entry, index }: TimelineCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.36, delay: index * 0.06 }}
      className="group grid gap-4 rounded-[28px] border border-[var(--line)] bg-[rgba(250,247,240,0.88)] p-5 shadow-[0_20px_50px_rgba(16,24,40,0.08)] transition duration-300 hover:border-[var(--line-strong)] hover:bg-white/92 hover:shadow-[0_24px_60px_rgba(16,24,40,0.14)] md:grid-cols-[120px_1fr]"
    >
      <div className="relative border-b border-dashed border-[var(--line)] pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
        <div className="absolute left-0 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(112,128,144,0),rgba(112,128,144,0.5),rgba(112,128,144,0))] md:block" />
        <div className="flex items-center gap-2 text-[var(--accent-strong)]">
          <CircleDot className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-[0.22em]">Timeline</span>
        </div>
        <p className="mt-4 font-display text-2xl leading-none text-[var(--ink)]">{entry.date}</p>
        <p className="mt-3 text-xs text-[var(--muted)]">{statusLabelMap[entry.status]}</p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--accent-strong)]">
            <Sparkles className="h-3.5 w-3.5" />
            {milestoneLabelMap[entry.milestoneLevel]}
          </span>
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h3 className="mt-4 font-display text-[28px] leading-tight text-[var(--ink)]">{entry.title}</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{entry.insight}</p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-[rgba(248,243,234,0.75)] p-4">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
              当时的困惑
            </p>
            <p className="text-sm leading-7 text-[var(--ink-soft)]">{entry.confusion}</p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-[rgba(248,243,234,0.75)] p-4">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
              最终得着
            </p>
            <p className="text-sm leading-7 text-[var(--ink-soft)]">{entry.finalGain}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xs text-[var(--muted)]">
            第 {String(index + 1).padStart(2, '0')} 条成长记录
          </span>
          <Link
            to={`/entry/${entry.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--accent-strong)] transition hover:border-[var(--line-strong)] hover:bg-white"
          >
            展开完整闭环
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
