import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Stethoscope, Clock, ShieldCheck, Ear, Brain, Bone, Syringe, Pill, Activity } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sunflag Global Hospital | Advanced Healthcare in Rohtak",
  description: "Sunflag Global Hospital is a premier multispecialty healthcare facility in Rohtak, Haryana. We offer top-tier medical services, 24/7 emergency care, and advanced treatments.",
  keywords: "Sunflag Global Hospital, Hospital in Rohtak, Best Hospital Haryana, Multispecialty Hospital, Healthcare Services, Emergency Care Rohtak, Doctors Rohtak",
  openGraph: {
    title: "Sunflag Global Hospital | Advanced Healthcare for a Better Tomorrow",
    description: "Providing world-class medical services with cutting-edge technology and compassionate care in Rohtak, Haryana.",
    url: "https://sunflagglobalhospital.com",
    siteName: "Sunflag Global Hospital",
    images: [
      {
        url: "https://sunflagglobalhospital.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sunflag Global Hospital Rohtak",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunflag Global Hospital Rohtak",
    description: "Advanced Healthcare for a Better Tomorrow in Rohtak, Haryana.",
    images: ["https://sunflagglobalhospital.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. HERO SECTION */}
      <section className="relative bg-blue-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Doctor Tools Background Animations */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Stethoscope className="absolute top-20 left-[15%] w-24 h-24 text-blue-300 animate-[bounce_5s_ease-in-out_infinite]" />
          <Syringe className="absolute bottom-20 left-[25%] w-16 h-16 text-blue-400 animate-[pulse_4s_ease-in-out_infinite]" />
          <Pill className="absolute top-32 right-[20%] w-14 h-14 text-blue-200 animate-[bounce_6s_ease-in-out_infinite]" />
          <Activity className="absolute bottom-32 right-[15%] w-28 h-28 text-blue-400 animate-[pulse_3s_ease-in-out_infinite]" />
          {/* Subtle glowing orbs */}
          <div className="absolute top-1/2 left-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <div className="absolute top-1/4 right-[30%] w-16 h-16 bg-white/5 backdrop-blur-md rounded-full animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-md">
            Sunflag Global Hospital
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight drop-shadow-md">
            <span className="inline-block animate-[pulse_2s_ease-in-out_infinite] bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
              Advanced Healthcare
            </span> <br /> for a Better Tomorrow
          </h1>


          { /* <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
             Sunflag Global Hospital provides world-class medical services with
             cutting-edge technology and compassionate care.
             </p> */}


          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                <Calendar className="mr-2 h-5 w-5" /> Book Appointment
              </Button>
            </Link>
            <Link href="/doctors">
              <Button size="lg" variant="outline" className="text-blue-900 border-white hover:bg-blue-50 w-full sm:w-auto text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
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
            <h2 className="text-3xl font-bold text-black">Why Choose Sunflag?</h2>
            <p className="text-black mt-2">State-of-the-art facilities, round-the-clock emergency services, and attentive nursing ensure comfort, safety, and continuity of care at every stage of treatment.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Stethoscope className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle className="text-blue-600">Expert Doctors</CardTitle>
              </CardHeader>
              <CardContent className="text-black">
                Our team includes over 12+ specialists and super-specialists from top medical institutions.
              </CardContent>
            </Card>

            <Card className="border-t-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Clock className="h-10 w-10 text-black-950 mb-2" />
                <CardTitle className="text-blue-600">24/7 Emergency</CardTitle>
              </CardHeader>
              <CardContent className="text-black">
                Round-the-clock emergency services with fully equipped advanced life support ambulances.
              </CardContent>
            </Card>

            <Card className="border-t-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle className="text-blue-600">Modern Technology</CardTitle>
              </CardHeader>
              <CardContent className="text-black">
                Equipped with the latest diagnostic and surgical technology for precise treatment.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. DEPARTMENTS PREVIEW */}
      <section className="py-20 bg-Black-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-black">Centers of Excellence</h2>
              <p className="text-black mt-2">Specialized care for complex conditions</p>
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
              <h3 className="font-bold text-black-600 text-lg mb-2">ENT</h3>
            </div>

            {/* Neurology */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-black-600 text-lg mb-2">Neurology</h3>
            </div>

            {/* Orthopedics */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                <Bone className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-black-600 text-lg mb-2">Orthopedics</h3>
            </div>

            {/* General Medicine */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Stethoscope className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-black-950 text-lg mb-2">General Medicine</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sunflag Global Hospital Rohtak</h2>
          <p className="mb-6">Providing care, hope, and excellence since 2014.</p>
          <div className="text-sm text-white">
            © 2026 Sunflag Hospital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
// END OF FILE
