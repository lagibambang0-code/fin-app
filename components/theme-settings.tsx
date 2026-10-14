'use client'

import { useEffect, useState } from 'react'
import { Check, Moon, Palette, Settings2, Sun, Waves } from 'lucide-react'
import { cn } from '@/lib/utils'

const themes = [
  { id: 'light', label: 'Terang', description: 'Tampilan cerah dan bersih', icon: Sun },
  { id: 'dark', label: 'Gelap', description: 'Nyaman untuk malam hari', icon: Moon },
  { id: 'ocean', label: 'Samudra', description: 'Nuansa biru yang tenang', icon: Waves },
  { id: 'lavender', label: 'Lavender', description: 'Lembut dengan aksen ungu', icon: Palette },
] as const

type ThemeId = (typeof themes)[number]['id']

export function ThemeSettings() {
  const [theme, setTheme] = useState<ThemeId>('light')

  useEffect(() => {
    const savedTheme = document.documentElement.dataset.theme as ThemeId | undefined
    if (savedTheme && themes.some((item) => item.id === savedTheme)) setTheme(savedTheme)
  }, [])

  function selectTheme(nextTheme: ThemeId) {
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    document.documentElement.classList.toggle('light', nextTheme === 'light')
  }

  return (
    <section className="flex flex-col gap-4" aria-labelledby="theme-heading">
      <div className="flex items-center gap-3 px-1">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Settings2 aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 id="theme-heading" className="text-base font-bold">Kelola pengaturan</h2>
          <p className="text-xs text-muted-foreground">Sesuaikan pengalaman Dompetku</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Tema</h3>
          <p className="mt-1 text-xs text-muted-foreground">Pilih tampilan yang paling nyaman untukmu</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {themes.map(({ id, label, description, icon: Icon }) => {
            const selected = theme === id
            return (
              <button
                key={id}
                type="button"
                aria-pressed={selected}
                onClick={() => selectTheme(id)}
                className={cn(
                  'relative flex min-h-28 flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors',
                  'hover:border-primary/50 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  selected && 'border-primary bg-primary/5 ring-1 ring-primary',
                )}
              >
                <span className={cn('flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground', selected && 'bg-primary text-primary-foreground')}>
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="text-sm font-semibold">{label}</span>
                <span className="text-[11px] leading-tight text-muted-foreground">{description}</span>
                {selected && <Check aria-hidden="true" className="absolute right-3 top-3 size-4 text-primary" />}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
