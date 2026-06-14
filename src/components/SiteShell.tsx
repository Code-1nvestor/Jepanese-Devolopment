import type { PropsWithChildren } from 'react'
import { BookOpenText, Plus, ScrollText } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: '学习时间轴', icon: ScrollText },
  { to: '/new', label: '新建记录', icon: Plus },
]

export function SiteShell({ children }: PropsWithChildren) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[-4%] h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(213,181,103,0.16),_transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-[-12%] h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(107,142,110,0.16),_transparent_70%)] blur-3xl" />
        <div className="paper-grid absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 rounded-[28px] border border-[var(--line)] bg-[rgba(245,240,230,0.74)] px-5 py-5 shadow-[0_16px_60px_rgba(16,24,40,0.12)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--line-strong)] bg-[var(--panel-strong)] text-[var(--accent)]"
              aria-label="返回首页"
            >
              <BookOpenText className="h-5 w-5" />
            </Link>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--muted)]">
                Nihongo Milestone Archive
              </p>
              <h1 className="font-display text-2xl text-[var(--accent-strong)]">日语得着档案馆</h1>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition duration-200',
                      isActive
                        ? 'border-[var(--line-strong)] bg-[var(--accent)] text-[var(--paper)] shadow-[0_10px_24px_rgba(26,43,60,0.2)]'
                        : 'border-[var(--line)] bg-white/60 text-[var(--ink-soft)] hover:border-[var(--line-strong)] hover:bg-white',
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </header>

        <main
          className={cn(
            'flex-1',
            location.pathname === '/' ? 'grid gap-6' : 'grid gap-4',
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
