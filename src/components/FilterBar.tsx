import { Search } from 'lucide-react'

import { milestoneLabelMap } from '@/types/entry'
import type { EntryFilters } from '@/utils/entries'

interface FilterBarProps {
  filters: EntryFilters
  tags: string[]
  onChange: (patch: Partial<EntryFilters>) => void
}

export function FilterBar({ filters, tags, onChange }: FilterBarProps) {
  return (
    <section className="rounded-[28px] border border-[var(--line)] bg-[rgba(248,245,237,0.84)] p-4 shadow-[0_18px_40px_rgba(16,24,40,0.08)] backdrop-blur">
      <div className="grid gap-3 lg:grid-cols-[1.2fr_repeat(3,0.6fr)]">
        <label className="relative block">
          <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            搜索关键字
          </span>
          <Search className="pointer-events-none absolute left-3 top-[42px] h-4 w-4 text-[var(--muted)]" />
          <input
            value={filters.query}
            onChange={(event) => onChange({ query: event.target.value })}
            placeholder="例如：助词、听力、跟读节奏"
            className="h-12 w-full rounded-2xl border border-[var(--line)] bg-white/90 pl-10 pr-4 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--line-strong)]"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            解决状态
          </span>
          <select
            value={filters.status}
            onChange={(event) =>
              onChange({ status: event.target.value as EntryFilters['status'] })
            }
            className="h-12 w-full rounded-2xl border border-[var(--line)] bg-white/90 px-4 text-sm outline-none transition focus:border-[var(--line-strong)]"
          >
            <option value="all">全部状态</option>
            <option value="resolved">已经吃透</option>
            <option value="ongoing">仍在消化</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            里程碑级别
          </span>
          <select
            value={filters.milestone}
            onChange={(event) =>
              onChange({ milestone: event.target.value as EntryFilters['milestone'] })
            }
            className="h-12 w-full rounded-2xl border border-[var(--line)] bg-white/90 px-4 text-sm outline-none transition focus:border-[var(--line-strong)]"
          >
            <option value="all">全部级别</option>
            {Object.entries(milestoneLabelMap).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            标签
          </span>
          <select
            value={filters.tag}
            onChange={(event) => onChange({ tag: event.target.value })}
            className="h-12 w-full rounded-2xl border border-[var(--line)] bg-white/90 px-4 text-sm outline-none transition focus:border-[var(--line-strong)]"
          >
            <option value="">全部主题</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}
