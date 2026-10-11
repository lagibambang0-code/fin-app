import type { Metadata } from 'next'
import { ChartPie } from 'lucide-react'
import { TabPage } from '@/components/tab-page'

export const metadata: Metadata = { title: 'Statistik — Dompetku' }

export default function StatistikPage() {
  return (
    <TabPage
      title="Statistik"
      subtitle="Ringkasan keuangan"
      icon={ChartPie}
      emptyTitle="Belum ada data statistik"
      emptyDescription="Grafik dan analisis keuanganmu akan tampil di sini."
    />
  )
}
