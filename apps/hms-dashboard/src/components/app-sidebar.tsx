"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, Users, FileText, Pill, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Users, label: "Patients", href: "/dashboard/register" }, // or /patients if you have a list
  { icon: Calendar, label: "Appointments", href: "/dashboard/appointments" },
  { icon: FileText, label: "Billing", href: "/dashboard/billing" },
  { icon: Pill, label: "Prescriptions", href: "/dashboard/prescriptions" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-400">Sunflag Global Hospital</h1>
        <p className="text-xs text-slate-400">Hospital Admin</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800"
          onClick={() => {
            localStorage.removeItem("token")
            window.location.href = "/"
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  )
}
