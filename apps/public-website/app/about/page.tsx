import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Users, Trophy, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-blue-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">About Sunflag Global Hospital</h1>
        <p className="text-blue-100 max-w-2xl mx-auto px-4">
          A legacy of healing, a future of hope. We are dedicated to providing
          world-class healthcare with compassion and integrity.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              To deliver affordable, accessible, and high-quality healthcare services to every section of society.
              We believe in treating not just the disease, but the person, ensuring a holistic recovery.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-blue-600 mt-1" />
                <p className="text-slate-700">Patient-First Approach</p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-blue-600 mt-1" />
                <p className="text-slate-700">Expert Medical Team</p>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="h-6 w-6 text-blue-600 mt-1" />
                <p className="text-slate-700">World-Class Infrastructure</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-100 rounded-2xl p-8 md:p-12 text-center">
             <Heart className="h-16 w-16 text-blue-600 mx-auto mb-4" />
             <h3 className="text-2xl font-bold text-blue-900 mb-2">Since 2014</h3>
             <p className="text-blue-800">
               Serving the community of Rohtak and beyond with unwavering dedication.
             </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Happy Patients", val: "10k+" },
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
