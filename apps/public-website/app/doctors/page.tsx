import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

// Fetch data from your backend
async function getDoctors() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/public/doctors`, {
      cache: 'no-store' // Ensure we always get the latest list
    })
    if (!res.ok) return []
    return res.json()
  } catch (err) {
    return []
  }
}

export default async function PublicDoctorsPage() {
  const doctors = await getDoctors()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Meet Our Specialists</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            World-class care starts with world-class doctors. Browse our team of specialists below.
          </p>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc: any) => (
            <Card key={doc.id} className="hover:shadow-xl transition-all border-t-4 border-blue-600">
              <CardHeader className="text-center pb-2">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-100">
                  <Stethoscope className="w-10 h-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">{doc.fullName}</CardTitle>
                <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm mt-1">
                  {doc.doctorProfile?.specialization || "General Physician"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <div className="text-gray-500 text-sm flex items-center justify-center gap-2">
                   <MapPin className="w-4 h-4" /> 
                   Department of {doc.doctorProfile?.department || "General Medicine"}
                </div>
                
                <div className="pt-6">
                  <Link href="/book">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {doctors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No doctors are publicly listed right now.</p>
            <p className="text-sm text-gray-400">Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  )
}
