import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, PencilLine } from 'lucide-react'

import type { EntryDraft } from '@/types/entry'
import {
  milestoneLabelMap,
  milestoneOptions,
  statusLabelMap,
  statusOptions,
} from '@/types/entry'

interface EntryFormProps {
  onSubmit: (draft: EntryDraft) => void
}

const initialDraft: EntryDraft = {
  title: '',
  date: new Date().toISOString().slice(0, 10),
  insight: '',
  confusion: '',
  resolution: '',
  finalGain: '',
  tagsText: '',
  status: 'resolved',
  milestoneLevel: 'step',
}

export function EntryForm({ onSubmit }: EntryFormProps) {
  const [draft, setDraft] = useState<EntryDraft>(initialDraft)

  const tagsPreview = useMemo(
    () =>
      draft.tagsText
        .split(/[,\n，]/)
        .map((tag) => tag.trim())
        .filter(Boolean),
    [draft.tagsText],
  )

  const isValid =
    draft.title.trim() &&
    draft.date &&
    draft.insight.trim() &&
    draft.confusion.trim() &&
    draft.resolution.trim() &&
    draft.finalGain.trim()

  const updateField = <T extends keyof EntryDraft>(field: T, value: EntryDraft[T]) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        className="rounded-[32px] border border-[var(--line)] bg-[rgba(248,245,237,0.86)] p-5 shadow-[0_24px_80px_rgba(16,24,40,0.12)]"
        onSubmit={(event) => {
          event.preventDefault()
          if (!isValid) {
            return
          }

          onSubmit(draft)
          setDraft(initialDraft)
        }}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-[var(--muted)]">
              Capture The Loop
            </p>
            <h2 className="mt-2 font-display text-3xl text-[var(--accent-strong)]">
              记录这次学习是如何打通的
            </h2>
          </div>
          <div className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-xs text-[var(--muted)]">
            一条记录就是一个完整闭环
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="标题">
            <input
              value={draft.title}
              onChange={(event) => updateField('title', event.target.value)}
              placeholder="例如：第一次听懂带助词省略的会话"
              className="field-input"
            />
          </Field>
          <Field label="学习日期">
            <input
              type="date"
              value={draft.date}
              onChange={(event) => updateField('date', event.target.value)}
              className="field-input"
            />
          </Field>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="当前状态">
            <select
              value={draft.status}
              onChange={(event) => updateField('status', event.target.value as EntryDraft['status'])}
              className="field-input"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {statusLabelMap[status]}
                </option>
              ))}
            </select>
          </Field>

          <Field label="里程碑等级">
            <select
              value={draft.milestoneLevel}
              onChange={(event) =>
                updateField('milestoneLevel', event.target.value as EntryDraft['milestoneLevel'])
              }
              className="field-input"
            >
              {milestoneOptions.map((level) => (
                <option key={level} value={level}>
                  {milestoneLabelMap[level]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-4 grid gap-4">
          <Field label="这次最大的得着">
            <textarea
              value={draft.insight}
              onChange={(event) => updateField('insight', event.target.value)}
              rows={4}
              placeholder="写下今天真正理解、看懂或感受到的部分。"
              className="field-input min-h-[120px]"
            />
          </Field>
          <Field label="卡住你的困惑">
            <textarea
              value={draft.confusion}
              onChange={(event) => updateField('confusion', event.target.value)}
              rows={4}
              placeholder="把当时最具体的误解、难点和不顺写清楚。"
              className="field-input min-h-[120px]"
            />
          </Field>
          <Field label="你是如何解决它的">
            <textarea
              value={draft.resolution}
              onChange={(event) => updateField('resolution', event.target.value)}
              rows={4}
              placeholder="写下你用过的材料、方法、老师提示或自我拆解过程。"
              className="field-input min-h-[120px]"
            />
          </Field>
          <Field label="最终留下来的得着">
            <textarea
              value={draft.finalGain}
              onChange={(event) => updateField('finalGain', event.target.value)}
              rows={4}
              placeholder="总结这次突破改变了你什么，以后怎么迁移到新的语境。"
              className="field-input min-h-[120px]"
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="标签">
            <textarea
              value={draft.tagsText}
              onChange={(event) => updateField('tagsText', event.target.value)}
              rows={2}
              placeholder="多个标签请用逗号分隔，例如：助词，听力，语感"
              className="field-input min-h-[88px]"
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm text-[var(--paper)] transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
          保存这次学习闭环
        </button>
      </form>

      <aside className="rounded-[32px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(247,242,231,0.92),rgba(255,255,255,0.9))] p-5 shadow-[0_24px_80px_rgba(16,24,40,0.1)]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--line)] bg-white/80">
            <PencilLine className="h-4 w-4 text-[var(--accent-strong)]" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Live Preview
            </p>
            <h3 className="font-display text-2xl text-[var(--ink)]">预览你即将沉淀下来的成果</h3>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-[var(--line)] bg-[rgba(255,255,255,0.88)] p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--accent-strong)]">
              {milestoneLabelMap[draft.milestoneLevel]}
            </span>
            <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]">
              {statusLabelMap[draft.status]}
            </span>
          </div>

          <h4 className="mt-4 font-display text-[28px] leading-tight text-[var(--ink)]">
            {draft.title || '你的下一次突破会在这里出现'}
          </h4>

          <dl className="mt-5 grid gap-4">
            <PreviewBlock label="得着" value={draft.insight} />
            <PreviewBlock label="困惑" value={draft.confusion} />
            <PreviewBlock label="解决过程" value={draft.resolution} />
            <PreviewBlock label="最终得着" value={draft.finalGain} />
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {tagsPreview.length > 0 ? (
              tagsPreview.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--line)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-[var(--muted)]">标签会在这里自动预览</span>
            )}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--accent-strong)]">
            保存后会立即进入你的时间轴
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </aside>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </span>
      {children}
    </label>
  )
}

function PreviewBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[rgba(248,243,234,0.7)] p-4">
      <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
        {value || '这里会展示你填写后的内容。'}
      </dd>
    </div>
  )
}
