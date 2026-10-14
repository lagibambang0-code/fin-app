import type { HTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type TabPageProps = {
  title: string
  subtitle?: string
  header?: ReactNode
  icon: LucideIcon
  emptyTitle?: string
  emptyDescription?: string
  children?: ReactNode
  contentProps?: HTMLAttributes<HTMLElement>
  contentKey?: string
}

export function TabPage({
  title,
  subtitle,
  header,
  icon: Icon,
  emptyTitle,
  emptyDescription,
  children,
  contentProps,
  contentKey,
}: TabPageProps) {
  const { className: contentClassName, ...restContentProps } = contentProps ?? {}

  return (
    <>
      <header className="sticky top-0 z-30 bg-background/85 px-4 pt-[calc(0.875rem+env(safe-area-inset-top))] pb-3 backdrop-blur-xl md:px-10 md:pt-8 md:pb-6">
        {header ? (
          <>
            <h1 className="sr-only">{title}</h1>
            {header}
          </>
        ) : (
          <>
            <p className="text-xs font-medium text-muted-foreground md:text-sm">
              {subtitle}
            </p>
            <h1 className="text-xl font-bold tracking-tight text-balance md:text-2xl">
              {title}
            </h1>
          </>
        )}
      </header>

      <section
        aria-label={`Konten ${title}`}
        {...restContentProps}
        className={cn('flex flex-1 flex-col', contentClassName)}
      >
        {children ?? (
          <div
            key={contentKey}
            className="flex flex-1 flex-col items-center justify-center px-8 py-10 text-center animate-in fade-in slide-in-from-bottom-2 duration-500 md:py-12"
          >
            <div className="relative mb-5 flex size-20 items-center justify-center md:mb-6 md:size-24">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl bg-secondary rotate-6 md:rounded-[1.75rem]"
              />
              <div className="relative flex size-16 items-center justify-center rounded-2xl border bg-card shadow-sm md:size-20 md:rounded-3xl">
                <Icon aria-hidden="true" className="size-7 text-primary md:size-9" />
              </div>
            </div>
            <h2 className="text-base font-semibold md:text-lg">{emptyTitle}</h2>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground text-pretty md:mt-1.5 md:text-sm">
              {emptyDescription}
            </p>
          </div>
        )}
      </section>
    </>
  )
}
