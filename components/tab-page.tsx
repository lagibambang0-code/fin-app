import type { LucideIcon } from 'lucide-react'

type TabPageProps = {
  title: string
  subtitle: string
  icon: LucideIcon
  emptyTitle: string
  emptyDescription: string
}

export function TabPage({
  title,
  subtitle,
  icon: Icon,
  emptyTitle,
  emptyDescription,
}: TabPageProps) {
  return (
    <>
      <header className="sticky top-0 z-30 bg-background/85 px-5 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-4 backdrop-blur-xl md:px-10 md:pt-8 md:pb-6">
        <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
        <h1 className="text-2xl font-bold tracking-tight text-balance">
          {title}
        </h1>
      </header>

      <section
        aria-label={`Konten ${title}`}
        className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        <div className="relative mb-6 flex size-24 items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[1.75rem] bg-secondary rotate-6"
          />
          <div className="relative flex size-20 items-center justify-center rounded-3xl border bg-card shadow-sm">
            <Icon aria-hidden="true" className="size-9 text-primary" />
          </div>
        </div>
        <h2 className="text-lg font-semibold">{emptyTitle}</h2>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
          {emptyDescription}
        </p>
      </section>
    </>
  )
}
