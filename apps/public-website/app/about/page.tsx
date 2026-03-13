import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Users, Trophy, Heart, Activity } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Sunflag Global Hospital",
  description: "Learn about Sunflag Global Hospital's mission, vision, and our commitment to delivering accessible, high-quality, patient-centric healthcare in Rohtak.",
  keywords: "About Sunflag Hospital, Healthcare Mission, Best Doctors Rohtak, Cashless Treatment, Multispecialty Hospital",
  openGraph: {
    title: "About Us | Sunflag Global Hospital",
    description: "Learn about our mission to provide safe, compassionate, and affordable multispecialty healthcare.",
    url: "https://sunflagglobalhospital.com/about",
    siteName: "Sunflag Global Hospital",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sunflag Global Hospital",
    description: "Learn about our mission and vision for healthcare.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative bg-blue-900 text-white py-24 text-center overflow-hidden">
        {/* Medical Background Animations */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Activity className="absolute top-12 left-[10%] w-24 h-24 text-blue-400 animate-[pulse_3s_ease-in-out_infinite]" />
          <Heart className="absolute top-24 right-[15%] w-16 h-16 text-red-400 animate-[bounce_4s_ease-in-out_infinite]" />
          <Activity className="absolute bottom-12 right-[30%] w-32 h-32 text-blue-300 animate-[pulse_4s_ease-in-out_infinite]" />

          {/* ECG Line Animation */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-600">
            <svg width="100%" height="150" viewBox="0 0 1000 150" preserveAspectRatio="none">
              <path
                d="M 0 75 L 400 75 L 430 20 L 460 130 L 490 75 L 1000 75"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-yellow-300"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="1000"
                  to="0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="relative flex items-center justify-center p-4 bg-white/10 rounded-full backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
              <Activity className="absolute w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-md">Sunflag Global Hospital</h1>
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed drop-shadow mx-auto">
            Sunflag Global Hospital is a multispecialty healthcare facility in Rohtak, Haryana, committed to delivering quality, patient-centric medical care with modern infrastructure and experienced doctors. The hospital is empanelled with <b className="text-white">ECHS, Haryana Government, and multiple TPA insurance providers,</b> ensuring accessible and cashless treatment options for eligible patients while maintaining high standards of clinical excellence and compassionate care.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Our Mission</h2>
            <p className="text-black leading-relaxed mb-6">
              At Sunflag Global Hospital our mission is to provide safe, compassionate and affordable multispecialty healthcare that restores and enhances the quality of life for patients and communities we serve. We deliver evidence-based medicine through multidisciplinary collaboration, advanced diagnostics and continuous innovation, while upholding the highest standards of clinical excellence, ethical conduct and patient dignity. Committed to preventive care, patient education and community outreach, we strive to be the trusted healthcare partner for families across Haryana and the surrounding region.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-blue-600 mt-1" />
                <p className="text-black">Patient-First Approach</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-blue-600 mt-1" />
                <p className="text-black">Expert Doctors Team</p>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="h-6 w-6 text-blue-600 mt-1" />
                <p className="text-black">World-Class Infrastructure</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 rounded-2xl p-8 md:p-12 text-center">
            <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Since 2014</h3>
            <p className="text-blue-800">
              Serving the community of Haryana and beyond with unwavering dedication.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Happy Patients", val: "200k+" },
            { label: "Expert Doctors", val: "12+" },
            { label: "Hospital Beds", val: "50+" },
            { label: "Awards Won", val: "27+" },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.val}</div>
                <div className="text-sm text-black font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
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
