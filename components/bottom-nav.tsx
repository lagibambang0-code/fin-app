'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowLeftRight,
  ChartPie,
  Ellipsis,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string; icon: LucideIcon }

const NAV_ITEMS: NavItem[] = [
  { href: '/transaksi', label: 'Transaksi', icon: ArrowLeftRight },
  { href: '/statistik', label: 'Statistik', icon: ChartPie },
  { href: '/aset', label: 'Aset', icon: Wallet },
  { href: '/lainnya', label: 'Lainnya', icon: Ellipsis },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md md:absolute"
    >
      <div className="border-t bg-card/85 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl supports-[backdrop-filter]:bg-card/70">
        <ul className="grid grid-cols-4 gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                    active
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-14 items-center justify-center rounded-full transition-all duration-300',
                      active
                        ? 'bg-secondary scale-100'
                        : 'scale-90 group-hover:bg-muted',
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={active ? 2.4 : 2}
                    />
                  </span>
                  <span className={cn(active && 'font-semibold')}>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
