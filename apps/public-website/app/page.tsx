import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Stethoscope, Clock, ShieldCheck, Ear, Brain, Bone } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-blue-900 text-white py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Advanced Healthcare <br /> for a Better Tomorrow
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Sunflag Global Hospital provides world-class medical services with
            cutting-edge technology and compassionate care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" /> Book Appointment
              </Button>
            </Link>
            <Link href="/doctors">
              <Button size="lg" variant="outline" className="text-blue-900 border-white hover:bg-blue-50 w-full sm:w-auto text-lg px-8 py-6">
                <Stethoscope className="mr-2 h-5 w-5" /> Find a Doctor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose Sunflag?</h2>
            <p className="text-slate-500 mt-2">Committed to clinical excellence and patient care</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Stethoscope className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Expert Doctors</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Our team includes over 10+ specialists and super-specialists from top medical institutions.
              </CardContent>
            </Card>

            <Card className="border-t-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Clock className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>24/7 Emergency</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Round-the-clock emergency services with fully equipped advanced life support ambulances.
              </CardContent>
            </Card>

            <Card className="border-t-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Modern Technology</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600">
                Equipped with the latest diagnostic and surgical technology for precise treatment.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. DEPARTMENTS PREVIEW */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Centers of Excellence</h2>
              <p className="text-slate-500 mt-2">Specialized care for complex conditions</p>
            </div>
            <Link href="/services" className="text-blue-600 font-semibold hover:underline hidden sm:block">
              View All Departments →
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* ENT */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                <Ear className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">ENT</h3>
            </div>
            
            {/* Neurology */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Neurology</h3>
            </div>

            {/* Orthopedics */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                <Bone className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Orthopedics</h3>
            </div>

            {/* General Medicine */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Stethoscope className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">General Medicine</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sunflag Global Hospital Rohtak</h2>
          <p className="mb-6">Providing care, hope, and excellence since 2014.</p>
          <div className="text-sm text-slate-500">
            © 2026 Sunflag Hospital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
// END OF FILE
