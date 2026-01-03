import Link from "next/link"
import { Phone, Calendar, Clock, MapPin, Menu, ArrowRight, ShieldCheck, UserCheck, Activity } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link className="flex items-center gap-2 font-bold text-xl text-blue-700" href="#">
            <Activity className="h-6 w-6" />
            <span>Sunflag Global Hospital</span>
          </Link>
          <nav className="ml-auto hidden md:flex gap-6">
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">Services</Link>
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">Doctors</Link>
            <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">Contact</Link>
          </nav>
          <div className="ml-auto md:ml-4">
            <Link
              href="https://sunflag-hms.vercel.app/book"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-9 px-4 py-2"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        
        {/* --- HERO SECTION --- */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 w-fit">
                  <ShieldCheck className="mr-1 h-4 w-4" />
                  No.1 Hospital in Rohtak
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                  World-Class Care <br/> For Your Family
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Sunflag Global Hospital combines advanced medical technology with compassionate care. 24/7 Emergency support available.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700"
                    href="https://sunflag-hms.vercel.app/book"
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
                    href="#"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Emergency: 102
                  </Link>
                </div>
              </div>
              {/* Simple Image Placeholder using a Colored Div */}
              <div className="mx-auto aspect-video overflow-hidden rounded-xl bg-white shadow-xl flex items-center justify-center border p-4 sm:w-full lg:order-last">
                 <div className="w-full h-full bg-blue-100 rounded-lg flex items-center justify-center text-blue-300">
                    <Activity className="h-32 w-32 opacity-20" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg border bg-slate-50">
                <div className="p-3 bg-blue-100 rounded-full">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Expert Doctors</h3>
                <p className="text-gray-500">Over 50+ specialists from top medical institutes across India.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg border bg-slate-50">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">24/7 Service</h3>
                <p className="text-gray-500">Emergency care, pharmacy, and ambulance services available round the clock.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg border bg-slate-50">
                <div className="p-3 bg-blue-100 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">Prime Location</h3>
                <p className="text-gray-500">Located in the heart of Rohtak, easily accessible from all transport hubs.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="w-full py-6 bg-slate-900 text-white">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">© 2026 Sunflag Global Hospital. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link className="text-sm hover:underline underline-offset-4" href="#">Privacy</Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
