"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Menu,
  Stethoscope
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<{ fullName: string; role: string } | null>(null)

  // 1. Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!user) return null

  // 2. UPDATED NAVIGATION LINKS
  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Patients", href: "/dashboard/patients", icon: Users },
    { label: "Staff Management", href: "/dashboard/staff", icon: Stethoscope }, // Changed from Doctors
    { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
    { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { label: "Prescriptions", href: "/dashboard/prescriptions", icon: FileText },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-white">
        <div className="p-6 text-xl font-bold tracking-tight text-blue-400">
          Sunflag Global
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-medium text-white">{user.fullName}</p>
            <p className="text-xs text-slate-400 capitalize">{user.role}</p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b md:hidden shrink-0">
          <span className="font-bold text-lg">Sunflag Hospital</span>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-slate-900 text-white border-r-slate-800">
              <div className="p-4 text-xl font-bold text-blue-400 mb-6">Sunflag HMS</div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 mt-4"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
