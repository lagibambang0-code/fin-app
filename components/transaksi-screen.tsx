'use client'

import { useRef, useState, type PointerEvent } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { TabPage } from '@/components/tab-page'
import {
  MONTHS,
  MonthNavigator,
  shiftMonth,
  type MonthValue,
} from '@/components/month-navigator'

const SWIPE_THRESHOLD = 50

export function TransaksiScreen() {
  const [today] = useState<MonthValue>(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [selected, setSelected] = useState<MonthValue>(today)
  const start = useRef<{ x: number; y: number } | null>(null)

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    start.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!start.current) return
    const dx = event.clientX - start.current.x
    const dy = event.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy) * 1.5) return
    setSelected((value) => shiftMonth(value, dx < 0 ? 1 : -1))
  }

  const resetSwipe = () => {
    start.current = null
  }

  return (
    <TabPage
      title="Transaksi"
      header={
        <MonthNavigator value={selected} today={today} onChange={setSelected} />
      }
      icon={ArrowLeftRight}
      emptyTitle="Belum ada transaksi"
      emptyDescription={`Pemasukan dan pengeluaranmu di ${MONTHS[selected.month].full} ${selected.year} akan muncul di sini.`}
      contentKey={`${selected.year}-${selected.month}`}
      contentProps={{
        onPointerDown: handlePointerDown,
        onPointerUp: handlePointerUp,
        onPointerCancel: resetSwipe,
        className: 'touch-pan-y select-none',
      }}
    />
  )
}
