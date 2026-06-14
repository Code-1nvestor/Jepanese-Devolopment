import type { ComponentType } from 'react'
import { ArrowLeft, ArrowRight, Bookmark, Lightbulb, Orbit, Waypoints } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { useJournalStore } from '@/store/useJournalStore'
import { milestoneLabelMap, statusLabelMap } from '@/types/entry'
import { getAdjacentEntries } from '@/utils/entries'

export default function EntryDetail() {
  const { id = '' } = useParams()
  const entries = useJournalStore((state) => state.entries)
  const entry = useJournalStore((state) => state.getEntryById(id))

  if (!entry) {
    return <Navigate to="/" replace />
  }

  const { previous, next } = getAdjacentEntries(entries, id)

  return (
    <section className="grid gap-4">
      <div className="rounded-[32px] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(248,245,237,0.92),rgba(26,40,53,0.98))] p-6 shadow-[0_28px_80px_rgba(16,24,40,0.14)]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-sm text-white transition hover:bg-white/14"
        >
          <ArrowLeft className="h-4 w-4" />
          返回时间轴
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--gold)] px-4 py-2 text-xs text-[var(--accent-strong)]">
            {milestoneLabelMap[entry.milestoneLevel]}
          </span>
          <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs text-white/80">
            {statusLabelMap[entry.status]}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/52">{entry.date}</span>
        </div>

        <h2 className="mt-6 max-w-4xl font-display text-4xl leading-tight text-[var(--paper)] md:text-5xl">
          {entry.title}
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-8 text-white/74 md:text-base">
          这一页完整保留了你当时的理解、疑问、解决路径与最终沉淀下来的方法论，适合在复习或再次遇到类似问题时回看。
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="grid gap-4">
          <DetailBlock
            icon={Lightbulb}
            label="这次学到的得着"
            content={entry.insight}
            tone="soft"
          />
          <DetailBlock
            icon={Orbit}
            label="当时最真实的困惑"
            content={entry.confusion}
            tone="warn"
          />
          <DetailBlock
            icon={Waypoints}
            label="真正帮助你打通的方法"
            content={entry.resolution}
            tone="calm"
          />
          <DetailBlock
            icon={Bookmark}
            label="最后留下来的得着"
            content={entry.finalGain}
            tone="accent"
          />
        </article>

        <aside className="grid gap-4">
          <div className="rounded-[28px] border border-[var(--line)] bg-[rgba(248,245,237,0.88)] p-5 shadow-[0_20px_50px_rgba(16,24,40,0.08)]">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Related Tags
            </p>
            <h3 className="mt-2 font-display text-2xl text-[var(--ink)]">这条记录关联的主题</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-sm text-[var(--muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--line)] bg-[rgba(248,245,237,0.88)] p-5 shadow-[0_20px_50px_rgba(16,24,40,0.08)]">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Adjacent Reading
            </p>
            <h3 className="mt-2 font-display text-2xl text-[var(--ink)]">沿着时间继续复盘</h3>
            <div className="mt-5 grid gap-3">
              <AdjacentCard
                label="更近的一条"
                entryTitle={previous?.title}
                to={previous ? `/entry/${previous.id}` : undefined}
                icon={ArrowLeft}
              />
              <AdjacentCard
                label="更早的一条"
                entryTitle={next?.title}
                to={next ? `/entry/${next.id}` : undefined}
                icon={ArrowRight}
              />
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function DetailBlock({
  icon: Icon,
  label,
  content,
  tone,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  content: string
  tone: 'soft' | 'warn' | 'calm' | 'accent'
}) {
  const toneClassMap = {
    soft: 'bg-[rgba(248,245,237,0.88)]',
    warn: 'bg-[rgba(247,238,228,0.9)]',
    calm: 'bg-[rgba(236,243,238,0.9)]',
    accent: 'bg-[rgba(231,237,245,0.9)]',
  }

  return (
    <div className={`rounded-[32px] border border-[var(--line)] p-5 shadow-[0_18px_44px_rgba(16,24,40,0.08)] ${toneClassMap[tone]}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--line)] bg-white/70">
          <Icon className="h-4 w-4 text-[var(--accent-strong)]" />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Detail</p>
          <h3 className="font-display text-2xl text-[var(--ink)]">{label}</h3>
        </div>
      </div>
      <p className="mt-5 text-sm leading-8 text-[var(--ink-soft)] md:text-base">{content}</p>
    </div>
  )
}

function AdjacentCard({
  label,
  entryTitle,
  to,
  icon: Icon,
}: {
  label: string
  entryTitle?: string
  to?: string
  icon: ComponentType<{ className?: string }>
}) {
  if (!to || !entryTitle) {
    return (
      <div className="rounded-[24px] border border-dashed border-[var(--line)] px-4 py-5 text-sm text-[var(--muted)]">
        {label}：已经到时间轴边界了
      </div>
    )
  }

  return (
    <Link
      to={to}
      className="group rounded-[24px] border border-[var(--line)] bg-white/70 px-4 py-5 transition hover:border-[var(--line-strong)] hover:bg-white"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{label}</span>
        <Icon className="h-4 w-4 text-[var(--accent-strong)]" />
      </div>
      <p className="mt-3 font-display text-xl text-[var(--ink)]">{entryTitle}</p>
    </Link>
  )
}
