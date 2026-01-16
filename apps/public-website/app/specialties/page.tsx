import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Flame, Bone, Scissors, Brain, Activity,
  Baby, Heart, Ear, Scan, Droplet, ArrowRight
} from "lucide-react"
import Link from "next/link"

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
      <div className="bg-slate-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Centers of Excellence</h1>
        <p className="text-slate-300 max-w-2xl mx-auto px-4">
          Sunflag Global Hospital is recognized for its specialized departments
          equipped with cutting-edge technology.
        </p>
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
                <p className="text-slate-500 text-sm mb-4">{item.desc}</p>
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
    </div>
  )
}
