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
    color: "text-slate-600",
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
      <div className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Medical Specialties</h1>
        <p className="text-blue-100 max-w-2xl mx-auto px-4">
          Sunflag Global Hospital is equipped with state-of-the-art facilities
          and expert specialists across all major medical disciplines.
        </p>
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
              <CardContent className="text-center text-slate-600 text-sm">
                {service.description}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-xl text-slate-700 font-medium mb-6">Need to consult a specialist?</p>
          <Link href="/book">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-semibold px-8">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
