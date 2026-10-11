import type { Metadata } from 'next'
import { Ellipsis } from 'lucide-react'
import { TabPage } from '@/components/tab-page'

export const metadata: Metadata = { title: 'Lainnya — Dompetku' }

export default function LainnyaPage() {
  return (
    <TabPage
      title="Lainnya"
      subtitle="Pengaturan & fitur"
      icon={Ellipsis}
      emptyTitle="Segera hadir"
      emptyDescription="Pengaturan akun, kategori, dan fitur tambahan akan tersedia di sini."
    />
  )
}
