import type { Metadata } from 'next'
import { ArrowLeftRight } from 'lucide-react'
import { TabPage } from '@/components/tab-page'
import { MonthNavigator } from '@/components/month-navigator'

export const metadata: Metadata = { title: 'Transaksi — Dompetku' }

export default function TransaksiPage() {
  return (
    <TabPage
      title="Transaksi"
      header={<MonthNavigator />}
      icon={ArrowLeftRight}
      emptyTitle="Belum ada transaksi"
      emptyDescription="Pemasukan dan pengeluaranmu akan muncul di sini."
    />
  )
}
