import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Flame, Bone, Scissors, Brain, Activity,
  Baby, Heart, Ear, Scan, Droplet, ArrowRight
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Centers of Excellence | Sunflag Global Hospital",
  description: "Sunflag Global Hospital is recognized for its specialized Centers of Excellence equipped with cutting-edge medical technology and leading specialists.",
  keywords: "Centers of Excellence, Specialized Healthcare, Top Hospitals Haryana, Multi-Specialty Hospital, Advanced Medical Tech",
  openGraph: {
    title: "Centers of Excellence | Sunflag Global Hospital",
    description: "World-class care delivered by specialized departments and expert teams.",
    url: "https://sunflagglobalhospital.com/specialties",
    siteName: "Sunflag Global Hospital",
    locale: "en_IN",
    type: "website",
  },
}

const specialties = [
  { name: "Plastic & Burn Surgery", icon: Flame, desc: "Reconstructive surgery and burn care unit." },
  { name: "Orthopaedics & Joint Replacement", icon: Bone, desc: "Total knee/hip replacement and trauma." },
  { name: "General & Laparoscopic Surgery", icon: Scissors, desc: "Minimally invasive surgical procedures." },
  { name: "Neurology", icon: Brain, desc: "Advanced neuro care and stroke management." },
  { name: "Gastroenterology", icon: Activity, desc: "Digestive health and endoscopic procedures." },
  { name: "Paediatrics", icon: Baby, desc: "Comprehensive child and newborn care." },
  { name: "Gynaecology", icon: Heart, desc: "Women's health, maternity, and fertility." },
  { name: "ENT Head & Neck Oncology", icon: Ear, desc: "Ear, Nose, Throat and tumor surgery." },
  { name: "Radiology", icon: Scan, desc: "CT Scan, X-Ray, and diagnostic imaging." },
  { name: "Endocrinology", icon: Droplet, desc: "Diabetes and hormonal disorder management." },
]

export default function SpecialtiesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative bg-blue-900 text-white py-24 text-center overflow-hidden">
        {/* Medical Specialists Background Animations */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <Scan className="absolute top-10 left-[15%] w-24 h-24 text-indigo-300 animate-[pulse_4s_ease-in-out_infinite]" />
          <Brain className="absolute bottom-10 left-[25%] w-16 h-16 text-purple-300 animate-[bounce_5s_ease-in-out_infinite]" />
          <Ear className="absolute top-1/2 right-[15%] w-20 h-20 text-cyan-200 animate-[pulse_3s_ease-in-out_infinite]" />
          <Scissors className="absolute bottom-12 right-[30%] w-14 h-14 text-white hover:rotate-45 transition-transform animate-[bounce_6s_ease-in-out_infinite]" />
          <Droplet className="absolute top-12 left-[40%] w-12 h-12 text-red-300 animate-[ping_8s_ease-in-out_infinite]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">Centers of Excellence</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg drop-shadow">
            Sunflag Global Hospital is recognized for its specialized departments
            equipped with cutting-edge technology.
          </p>
        </div>
      </div>

      {/* Specialties List */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {specialties.map((item) => (
            <Card key={item.name} className="group hover:border-blue-500 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <item.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-black text-sm mb-4">{item.desc}</p>
                <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}

        </div>

        {/* Bottom CTA */}
        <div className="mt-20 bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">World-Class Care, Right Here.</h2>
          <p className="mb-8 text-blue-100 max-w-xl mx-auto">
            Our centers of excellence are staffed by leading specialists ready to help you.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/doctors">
              <Button variant="secondary" size="lg">Find a Specialist</Button>
            </Link>
            <Link href="/book">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" size="lg">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>
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
