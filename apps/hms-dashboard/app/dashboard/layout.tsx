import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* 1. Sidebar (Fixed on Left) */}
      <AppSidebar />

      {/* 2. Main Content Area (Scrollable on Right) */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
        {children}
      </main>
    </div>
  )
}
