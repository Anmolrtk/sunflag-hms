"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Stethoscope, Menu, Phone, Lock, LayoutDashboard } from "lucide-react"
import { useState } from "react"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Specialties", href: "/specialties" },
    { name: "Doctors", href: "/doctors" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ]

  // This points to your Admin Dashboard
  // Default is localhost:3000 (Local), but respects Environment Variables (Live)
  const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3000"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-900">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span className="hidden sm:inline-block">Sunflag Global Hospital Rohtak</span>
          <span className="sm:hidden">Sunflag</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-blue-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          
          {/* Emergency Number */}
          <div className="hidden xl:flex items-center gap-2 text-red-600 font-bold mr-2">
            <Phone className="h-4 w-4 fill-current" />
            <span>Emergency: +91 9254308880</span>
          </div>

          {/* Desktop Staff Login - CONNECTED TO DASHBOARD */}
          <Link href={ADMIN_URL} target="_blank" className="hidden sm:flex items-center gap-1 text-slate-500 hover:text-blue-600 text-sm font-medium mr-2 transition-colors border px-3 py-1.5 rounded-md hover:bg-slate-50">
            <Lock className="h-3 w-3" />
            <span>Login</span>
          </Link>

          <Link href="/book" className="hidden sm:block">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Book Appointment
            </Button>
          </Link>
          
          <Button variant="ghost" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="lg:hidden border-t bg-white p-4 space-y-3 shadow-lg absolute w-full left-0">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="block text-sm font-medium text-slate-700 py-2 border-b border-slate-100 last:border-0">
              {link.name}
            </Link>
          ))}
          
          <div className="pt-2 text-red-600 font-bold flex items-center gap-2 pb-2">
             <Phone className="h-4 w-4" /> <span>Emergency: 98765-43210</span>
          </div>

          <Link href="/book" className="block pt-2">
             <Button className="w-full bg-blue-600 text-white">Book Appointment</Button>
          </Link>

          {/* Mobile Staff Login Button */}
          <Link href={ADMIN_URL} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 text-slate-600 hover:text-blue-600 text-sm mt-2 bg-slate-100 rounded-md font-medium">
             <LayoutDashboard className="h-4 w-4" /> Go to Staff Dashboard
          </Link>
        </div>
      )}
    </header>
  )
}
