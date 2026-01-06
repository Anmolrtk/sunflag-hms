import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Stethoscope } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-900">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span>Sunflag Hospital</span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/doctors" className="hover:text-blue-600 transition-colors">
            Doctors
          </Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">
            Services
          </Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link href="/book">
            <Button className="bg-blue-600 hover:bg-blue-700 font-semibold">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
