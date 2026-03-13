import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Flame,
  Bone,
  Scissors,
  Brain,
  Activity,
  Baby,
  Heart,
  Ear,
  Scan,
  Droplet
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Medical Services & Specialties | Sunflag Global Hospital",
  description: "Explore our comprehensive medical services including Orthopaedics, Neurology, General Surgery, Paediatrics, and more at Sunflag Global Hospital.",
  keywords: "Hospital Services, Medical Specialties, Orthopaedics Rohtak, Neurology Hospital, General Surgery, Paediatrics Rohtak",
  openGraph: {
    title: "Medical Services | Sunflag Global Hospital",
    description: "State-of-the-art facilities and expert specialists across all major medical disciplines.",
    url: "https://sunflagglobalhospital.com/services",
    siteName: "Sunflag Global Hospital",
    locale: "en_IN",
    type: "website",
  },
}

const services = [
  {
    title: "Plastic & Burn Surgery",
    description: "Advanced reconstructive surgery, cosmetic procedures, and specialized care for burn injuries.",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-100"
  },
  {
    title: "Orthopaedics & Joint Replacement",
    description: "Expert care for bone fractures, arthritis, and total knee/hip replacement surgeries.",
    icon: Bone,
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    title: "General & Laparoscopic Surgery",
    description: "Minimally invasive surgical procedures ensuring faster recovery and minimal scarring.",
    icon: Scissors,
    color: "text-black",
    bg: "bg-slate-100"
  },
  {
    title: "Neurology",
    description: "Diagnosis and treatment of brain, spine, and nervous system disorders including stroke care.",
    icon: Brain,
    color: "text-purple-600",
    bg: "bg-purple-100"
  },
  {
    title: "Gastroenterology",
    description: "Comprehensive care for digestive system disorders, liver diseases, and endoscopic procedures.",
    icon: Activity,
    color: "text-green-600",
    bg: "bg-green-100"
  },
  {
    title: "Paediatrics",
    description: "Dedicated medical care for infants, children, and adolescents in a child-friendly environment.",
    icon: Baby,
    color: "text-yellow-600",
    bg: "bg-yellow-100"
  },
  {
    title: "Gynaecology",
    description: "Complete women's health services including maternity care, infertility treatment, and surgeries.",
    icon: Heart,
    color: "text-pink-600",
    bg: "bg-pink-100"
  },
  {
    title: "ENT Head & Neck Oncology",
    description: "Specialized treatment for Ear, Nose, Throat conditions and Head & Neck cancers.",
    icon: Ear,
    color: "text-cyan-600",
    bg: "bg-cyan-100"
  },
  {
    title: "Radiology",
    description: "Advanced imaging services including X-Ray, CT Scan, and Ultrasound for accurate diagnosis.",
    icon: Scan,
    color: "text-indigo-600",
    bg: "bg-indigo-100"
  },
  {
    title: "Endocrinology",
    description: "Expert management of diabetes, thyroid disorders, and hormonal imbalances.",
    icon: Droplet,
    color: "text-red-600",
    bg: "bg-red-100"
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative bg-blue-900 text-white py-20 text-center overflow-hidden">
        {/* Medical Specialists Background Animations */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <Brain className="absolute top-10 left-[10%] w-20 h-20 text-purple-300 animate-[bounce_6s_ease-in-out_infinite]" />
          <Heart className="absolute bottom-10 left-[20%] w-16 h-16 text-pink-300 animate-[pulse_3s_ease-in-out_infinite]" />
          <Baby className="absolute top-20 right-[15%] w-24 h-24 text-yellow-200 animate-[bounce_5s_ease-in-out_infinite]" />
          <Bone className="absolute bottom-16 right-[25%] w-14 h-14 text-blue-200 animate-[pulse_4s_ease-in-out_infinite]" />
          <Activity className="absolute top-1/2 left-[30%] w-32 h-32 text-green-300 opacity-50 animate-[ping_8s_cubic-bezier(0,0,0.2,1)_infinite]" />
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">Our Medical Specialties</h1>
          <p className="text-blue-100 max-w-2xl mx-auto px-4 text-lg drop-shadow">
            Sunflag Global Hospital is equipped with state-of-the-art facilities
            and expert specialists across all major medical disciplines.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-xl transition-all border-t-4 hover:-translate-y-1 duration-300" style={{ borderColor: service.color.replace('text-', 'var(--') }}>
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 ${service.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>
                <CardTitle className="text-lg font-bold min-h-[56px] flex items-center justify-center">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-black text-sm">
                {service.description}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-xl text-black font-medium mb-6">Need to consult a specialist?</p>
          <Link href="/book">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-semibold px-8">
              Book Appointment
            </Button>
          </Link>
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
