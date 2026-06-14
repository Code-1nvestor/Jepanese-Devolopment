import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SiteShell } from '@/components/SiteShell'
import EntryDetail from '@/pages/EntryDetail'
import Home from '@/pages/Home'
import NewEntry from '@/pages/NewEntry'

export default function App() {
  return (
    <BrowserRouter>
      <SiteShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewEntry />} />
          <Route path="/entry/:id" element={<EntryDetail />} />
          <Route
            path="*"
            element={
              <div className="rounded-[32px] border border-[var(--line)] bg-[rgba(248,245,237,0.88)] px-6 py-12 text-center shadow-[0_20px_50px_rgba(16,24,40,0.08)]">
                <p className="font-display text-3xl text-[var(--ink)]">这一页暂时不存在</p>
                <p className="mt-3 text-sm text-[var(--muted)]">可以回到首页继续整理你的学习时间轴。</p>
              </div>
            }
          />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  )
}
