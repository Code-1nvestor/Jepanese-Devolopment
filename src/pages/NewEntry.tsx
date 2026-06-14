import { useNavigate } from 'react-router-dom'

import { EntryForm } from '@/components/EntryForm'
import { useJournalStore } from '@/store/useJournalStore'
import type { EntryDraft } from '@/types/entry'

export default function NewEntry() {
  const navigate = useNavigate()
  const addEntry = useJournalStore((state) => state.addEntry)

  const handleSubmit = (draft: EntryDraft) => {
    const entryId = addEntry(draft)
    navigate(`/entry/${entryId}`)
  }

  return (
    <section className="grid gap-4">
      <div className="rounded-[28px] border border-[var(--line)] bg-[rgba(248,245,237,0.84)] p-5">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
          New Milestone Entry
        </p>
        <h2 className="mt-2 font-display text-3xl text-[var(--accent-strong)]">
          把这次学习经历整理成可复盘的里程碑
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
          建议尽量写具体场景。越具体，未来复盘时越容易看见自己的成长路径，而不是只留下抽象感受。
        </p>
      </div>

      <EntryForm onSubmit={handleSubmit} />
    </section>
  )
}
