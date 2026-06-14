import type { ComponentType } from 'react'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChartColumnBig, Compass, LibraryBig, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { FilterBar } from '@/components/FilterBar'
import { MilestonePanel } from '@/components/MilestonePanel'
import { TimelineCard } from '@/components/TimelineCard'
import { useJournalStore } from '@/store/useJournalStore'
import { buildStats, extractTags, filterEntries, type EntryFilters } from '@/utils/entries'

const initialFilters: EntryFilters = {
  query: '',
  status: 'all',
  milestone: 'all',
  tag: '',
}

export default function Home() {
  const entries = useJournalStore((state) => state.entries)
  const [filters, setFilters] = useState<EntryFilters>(initialFilters)

  const visibleEntries = useMemo(() => filterEntries(entries, filters), [entries, filters])
  const stats = useMemo(() => buildStats(entries), [entries])
  const tags = useMemo(() => extractTags(entries), [entries])

  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-[40px] border border-[var(--line)] bg-[linear-gradient(140deg,rgba(247,242,231,0.92),rgba(24,37,48,0.97))] p-6 text-[var(--paper)] shadow-[0_30px_100px_rgba(16,24,40,0.22)] md:p-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.26em] text-white/72">
              Japanese Learning Chronicle
            </span>
            <span className="rounded-full border border-[rgba(213,181,103,0.32)] bg-[rgba(213,181,103,0.12)] px-4 py-2 text-xs text-[var(--gold)]">
              把“卡住”变成“跨过去”的证据
            </span>
          </div>

          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] md:text-6xl">
            每一次得着、每一次困惑、每一次打通，都值得成为里程碑。
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/76 md:text-base">
            这个网页像一座专门收藏学习痕迹的档案馆。你可以把今天的理解、没想通的点、真正打通的方法，以及最终沉淀下来的收获，完整地串起来。
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/new"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 text-sm text-[var(--accent-strong)] transition hover:translate-y-[-1px] hover:bg-[#e5ca88]"
            >
              <Plus className="h-4 w-4" />
              新建一条学习闭环
            </Link>
            <a
              href="#timeline"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/16 bg-white/8 px-6 text-sm text-white transition hover:bg-white/14"
            >
              直接查看时间轴
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="grid gap-4"
        >
          <div className="rounded-[32px] border border-[var(--line)] bg-[rgba(248,245,237,0.86)] p-5 shadow-[0_20px_60px_rgba(16,24,40,0.1)]">
            <div className="flex items-center gap-3">
              <LibraryBig className="h-5 w-5 text-[var(--accent-strong)]" />
              <h3 className="font-display text-2xl text-[var(--ink)]">学习档案速览</h3>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <StatCard label="总记录" value={stats.total} icon={Compass} />
              <StatCard label="已打通" value={stats.resolved} icon={ChartColumnBig} />
              <StatCard label="仍在攻克" value={stats.ongoing} icon={Compass} />
              <StatCard label="主题标签" value={stats.uniqueTags} icon={LibraryBig} />
            </div>
          </div>

          <div className="rounded-[32px] border border-[var(--line)] bg-[rgba(27,40,52,0.96)] p-5 text-[var(--paper)] shadow-[0_20px_60px_rgba(16,24,40,0.16)]">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/56">
              Reflection Note
            </p>
            <p className="mt-3 text-sm leading-8 text-white/78">
              真正有价值的不是“今天学了多少”，而是“今天终于想通了什么”。把它记下来，下一次就不是从零开始。
            </p>
            <p className="mt-5 text-xs text-white/50">
              当前高强度突破记录：{stats.breakthroughs} 条
            </p>
          </div>
        </motion.aside>
      </section>

      <MilestonePanel entries={entries} />

      <section id="timeline" className="grid gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Timeline Archive
            </p>
            <h2 className="mt-2 font-display text-3xl text-[var(--accent-strong)]">
              按时间回看你的日语成长轨迹
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
            你可以按解决状态、里程碑等级和标签检索，快速找到自己曾经是怎样拆解掉一个具体困惑的。
          </p>
        </div>

        <FilterBar filters={filters} tags={tags} onChange={(patch) => setFilters((current) => ({ ...current, ...patch }))} />

        <div className="grid gap-4">
          {visibleEntries.length > 0 ? (
            visibleEntries.map((entry, index) => (
              <TimelineCard key={entry.id} entry={entry} index={index} />
            ))
          ) : (
            <div className="rounded-[28px] border border-dashed border-[var(--line-strong)] bg-[rgba(248,245,237,0.7)] px-6 py-10 text-center">
              <p className="font-display text-2xl text-[var(--ink)]">暂时没有匹配结果</p>
              <p className="mt-3 text-sm text-[var(--muted)]">
                可以试试放宽筛选条件，或者新增一条新的学习闭环。
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="rounded-[24px] border border-[var(--line)] bg-white/78 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{label}</p>
        <Icon className="h-4 w-4 text-[var(--accent-strong)]" />
      </div>
      <p className="mt-4 font-display text-4xl text-[var(--ink)]">{String(value).padStart(2, '0')}</p>
    </div>
  )
}
