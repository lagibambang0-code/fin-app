import type { Metadata } from 'next'
import { Ellipsis } from 'lucide-react'
import { TabPage } from '@/components/tab-page'
import { ThemeSettings } from '@/components/theme-settings'

export const metadata: Metadata = { title: 'Lainnya — Dompetku' }

export default function LainnyaPage() {
  return (
    <TabPage title="Lainnya" subtitle="Pengaturan & fitur" icon={Ellipsis}>
      <ThemeSettings />
    </TabPage>
  )
}
