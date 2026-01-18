import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Users, Trophy, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-blue-900 text-white py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Sunflag Global Hospital</h1>
        <p className="text-blue-100 max-w-3xl mx-auto px-4">
          Sunflag Global Hospital is a multispecialty healthcare facility in Rohtak, Haryana, committed to delivering quality, patient-centric medical care with modern infrastructure and experienced doctors. The hospital is empanelled with <b>ECHS, Haryana Government, and multiple TPA insurance providers,</b> ensuring accessible and cashless treatment options for eligible patients while maintaining high standards of clinical excellence and compassionate care.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
          At Sunflag Global Hospital our mission is to provide safe, compassionate and affordable multispecialty healthcare that restores and enhances the quality of life for patients and communities we serve. We deliver evidence-based medicine through multidisciplinary collaboration, advanced diagnostics and continuous innovation, while upholding the highest standards of clinical excellence, ethical conduct and patient dignity. Committed to preventive care, patient education and community outreach, we strive to be the trusted healthcare partner for families across Haryana and the surrounding region.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-blue-600 mt-1" />
                <p className="text-slate-700">Patient-First Approach</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-blue-600 mt-1" />
                <p className="text-slate-700">Expert Doctors Team</p>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="h-6 w-6 text-blue-600 mt-1" />
                <p className="text-slate-700">World-Class Infrastructure</p>
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
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
