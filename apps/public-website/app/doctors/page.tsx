"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, User2 } from "lucide-react"
import Link from "next/link"

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch doctors from the Backend API
  useEffect(() => {
    fetch("http://localhost:3001/users/public/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load doctors", err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Meet Our Specialists</h1>
        <p className="text-blue-100 max-w-2xl mx-auto px-4">
          Our team of experienced doctors and surgeons are dedicated to providing
          the highest standard of medical care.
        </p>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading Doctors...</div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-slate-700">No doctors found.</h3>
            <p className="text-slate-500">Please check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doc: any) => (
              <Card key={doc.id} className="overflow-hidden hover:shadow-lg transition-all group border-0 shadow-md">
                {/* Doctor Image Area */}
                <div className="h-64 bg-slate-200 relative overflow-hidden">
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={doc.fullName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50">
                      <User2 className="h-20 w-20 text-blue-200" />
                    </div>
                  )}
                  {/* Department Badge */}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {doc.doctorProfile?.department || "General"}
                  </div>
                </div>

                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.fullName}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-4">
                    {doc.doctorProfile?.specialization || "Medical Specialist"}
                  </p>
                  
                  {/* Fixed Hospital Name */}
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-6">
                    <MapPin className="h-4 w-4" /> Sunflag Global Hospital
                  </div>

                  <Link href="/book">
                    {/* Fixed Button Color (Now standard Blue) */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                      <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
