'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const MONTHS = [
  { full: 'Januari', short: 'Jan' },
  { full: 'Februari', short: 'Feb' },
  { full: 'Maret', short: 'Mar' },
  { full: 'April', short: 'Apr' },
  { full: 'Mei', short: 'Mei' },
  { full: 'Juni', short: 'Jun' },
  { full: 'Juli', short: 'Jul' },
  { full: 'Agustus', short: 'Agu' },
  { full: 'September', short: 'Sep' },
  { full: 'Oktober', short: 'Okt' },
  { full: 'November', short: 'Nov' },
  { full: 'Desember', short: 'Des' },
]

type MonthValue = { year: number; month: number }

function shiftMonth({ year, month }: MonthValue, delta: number): MonthValue {
  const index = year * 12 + month + delta
  return { year: Math.floor(index / 12), month: ((index % 12) + 12) % 12 }
}

export function MonthNavigator() {
  const [today] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [selected, setSelected] = useState<MonthValue>(today)
  const [open, setOpen] = useState(false)
  const [pickerYear, setPickerYear] = useState(today.year)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popupId = useId()

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const togglePicker = () => {
    if (!open) setPickerYear(selected.year)
    setOpen((value) => !value)
  }

  const selectMonth = (month: number) => {
    setSelected({ year: pickerYear, month })
    setOpen(false)
    triggerRef.current?.focus()
  }

  const label = `${MONTHS[selected.month].short} ${selected.year}`
  const fullLabel = `${MONTHS[selected.month].full} ${selected.year}`

  return (
    <div ref={containerRef} className="relative flex items-center gap-1">
      <button
        type="button"
        onClick={() => setSelected((value) => shiftMonth(value, -1))}
        aria-label="Bulan sebelumnya"
        className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>

      <button
        ref={triggerRef}
        type="button"
        onClick={togglePicker}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popupId : undefined}
        aria-label={`Pilih bulan, saat ini ${fullLabel}`}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xl font-bold tracking-tight tabular-nums transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-2xl',
          open && 'bg-secondary',
        )}
      >
        <span aria-live="polite">{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-4 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      <button
        type="button"
        onClick={() => setSelected((value) => shiftMonth(value, 1))}
        aria-label="Bulan selanjutnya"
        className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>

      {open && (
        <div
          id={popupId}
          role="dialog"
          aria-label="Pilih bulan dan tahun"
          className="absolute top-full left-0 z-40 mt-2 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border bg-popover p-3 text-popover-foreground shadow-xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150 md:w-[30rem] md:p-4"
        >
          <div className="mb-3 flex items-center justify-between border-b pb-3">
            <button
              type="button"
              onClick={() => setPickerYear((year) => year - 1)}
              aria-label="Tahun sebelumnya"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <p className="text-base font-semibold tabular-nums" aria-live="polite">
              {pickerYear}
            </p>
            <button
              type="button"
              onClick={() => setPickerYear((year) => year + 1)}
              aria-label="Tahun selanjutnya"
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>

          <ul className="grid grid-cols-4 gap-1.5 md:gap-2">
            {MONTHS.map((month, index) => {
              const isSelected =
                selected.year === pickerYear && selected.month === index
              const isCurrent =
                today.year === pickerYear && today.month === index
              return (
                <li key={month.full}>
                  <button
                    type="button"
                    onClick={() => selectMonth(index)}
                    aria-pressed={isSelected}
                    aria-label={`${month.full} ${pickerYear}`}
                    className={cn(
                      'relative flex h-11 w-full items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isSelected
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-secondary',
                      !isSelected && isCurrent && 'text-primary',
                    )}
                  >
                    <span className="uppercase md:hidden">{month.short}</span>
                    <span className="hidden md:inline">{month.full}</span>
                    {isCurrent && !isSelected && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1.5 size-1 rounded-full bg-primary"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
