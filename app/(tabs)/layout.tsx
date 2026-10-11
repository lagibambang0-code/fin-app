import { BottomNav } from '@/components/bottom-nav'

export default function TabsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh justify-center bg-background md:px-6 md:py-8">
      <div className="relative flex min-h-dvh w-full max-w-md flex-col bg-background md:h-[calc(100dvh-4rem)] md:min-h-0 md:max-w-3xl md:overflow-hidden md:rounded-[2rem] md:border md:shadow-2xl md:shadow-primary/10 lg:max-w-5xl">
        <main className="flex flex-1 flex-col pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:overflow-y-auto">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
