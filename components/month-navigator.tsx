'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const MONTHS = [
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

export type MonthValue = { year: number; month: number }

export function shiftMonth({ year, month }: MonthValue, delta: number): MonthValue {
  const index = year * 12 + month + delta
  return { year: Math.floor(index / 12), month: ((index % 12) + 12) % 12 }
}

const iconButton =
  'flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:size-9'

type MonthNavigatorProps = {
  value: MonthValue
  today: MonthValue
  onChange: (value: MonthValue) => void
}

export function MonthNavigator({ value, today, onChange }: MonthNavigatorProps) {
  const [open, setOpen] = useState(false)
  const [pickerYear, setPickerYear] = useState(value.year)
  const popupRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popupId = useId()

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (popupRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target)) return
      setOpen(false)
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
    if (!open) setPickerYear(value.year)
    setOpen((current) => !current)
  }

  const selectMonth = (month: number) => {
    onChange({ year: pickerYear, month })
    setOpen(false)
    triggerRef.current?.focus()
  }

  const label = `${MONTHS[value.month].short} ${value.year}`
  const fullLabel = `${MONTHS[value.month].full} ${value.year}`

  return (
    <div className="relative inline-flex items-center gap-0.5 md:gap-1">
      <button
        type="button"
        onClick={() => onChange(shiftMonth(value, -1))}
        aria-label="Bulan sebelumnya"
        className={iconButton}
      >
        <ChevronLeft aria-hidden="true" className="size-4 md:size-5" />
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
          'flex items-center gap-1 rounded-full px-2.5 py-1 text-base font-semibold tracking-tight tabular-nums transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:gap-1.5 md:px-3 md:py-1.5 md:text-xl md:font-bold',
          open && 'bg-secondary',
        )}
      >
        <span aria-live="polite">{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-3.5 text-muted-foreground transition-transform duration-200 md:size-4',
            open && 'rotate-180',
          )}
        />
      </button>

      <button
        type="button"
        onClick={() => onChange(shiftMonth(value, 1))}
        aria-label="Bulan selanjutnya"
        className={iconButton}
      >
        <ChevronRight aria-hidden="true" className="size-4 md:size-5" />
      </button>

      {open && (
        <div
          ref={popupRef}
          id={popupId}
          role="dialog"
          aria-label="Pilih bulan dan tahun"
          className="absolute top-full left-0 z-40 mt-2 w-[min(18rem,calc(100vw-2.5rem))] rounded-2xl border bg-popover p-2.5 text-popover-foreground shadow-xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150 md:w-[30rem] md:p-4"
        >
          <div className="mb-2.5 flex items-center justify-between border-b pb-2.5 md:mb-3 md:pb-3">
            <button
              type="button"
              onClick={() => setPickerYear((year) => year - 1)}
              aria-label="Tahun sebelumnya"
              className={iconButton}
            >
              <ChevronLeft aria-hidden="true" className="size-4 md:size-5" />
            </button>
            <p className="text-sm font-semibold tabular-nums md:text-base" aria-live="polite">
              {pickerYear}
            </p>
            <button
              type="button"
              onClick={() => setPickerYear((year) => year + 1)}
              aria-label="Tahun selanjutnya"
              className={iconButton}
            >
              <ChevronRight aria-hidden="true" className="size-4 md:size-5" />
            </button>
          </div>

          <ul className="grid grid-cols-4 gap-1 md:gap-2">
            {MONTHS.map((month, index) => {
              const isSelected = value.year === pickerYear && value.month === index
              const isCurrent = today.year === pickerYear && today.month === index
              return (
                <li key={month.full}>
                  <button
                    type="button"
                    onClick={() => selectMonth(index)}
                    aria-pressed={isSelected}
                    aria-label={`${month.full} ${pickerYear}`}
                    className={cn(
                      'relative flex h-10 w-full items-center justify-center rounded-xl text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-11 md:text-sm',
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
                        className="absolute bottom-1 size-1 rounded-full bg-primary md:bottom-1.5"
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
