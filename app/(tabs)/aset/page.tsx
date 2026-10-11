import type { Metadata } from 'next'
import { Wallet } from 'lucide-react'
import { TabPage } from '@/components/tab-page'

export const metadata: Metadata = { title: 'Aset — Dompetku' }

export default function AsetPage() {
  return (
    <TabPage
      title="Aset"
      subtitle="Kekayaan kamu"
      icon={Wallet}
      emptyTitle="Belum ada aset"
      emptyDescription="Rekening, dompet digital, dan investasimu akan terlihat di sini."
    />
  )
}
