"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, User2 } from "lucide-react"
import Link from "next/link"

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. We use the URL that we just confirmed works!
    fetch("hhttps://sunflag-hms.onrender.com/users/public/doctors", { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        console.log("Doctors found:", data); // Check your browser console to see the list!
        
        if (Array.isArray(data)) {
          setDoctors(data)
        } else {
          setDoctors([]) // Safety net
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err)
        setDoctors([])
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Meet Our Specialists</h1>
        <p className="text-blue-100 max-w-2xl mx-auto px-4">
          Expert care from our dedicated team of medical professionals.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="container mx-auto px-4 py-16">
        
        {loading ? (
          <div className="text-center py-20 text-slate-500">Loading Doctors...</div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm p-10">
            <h3 className="text-xl font-bold text-slate-700">No doctors available properly.</h3>
            <p className="text-slate-500 mt-2">Please check your internet connection or try again later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doc: any) => (
              <Card key={doc.id} className="overflow-hidden hover:shadow-lg transition-all border-0 shadow-md flex flex-col">
                
                {/* Image Section */}
                <div className="h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {doc.image ? (
                    <img
                      src={doc.image}
                      alt={doc.fullName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If the image link is broken, hide the image and show the icon below
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('fallback-icon');
                      }}
                    />
                  ) : (
                    // Default Icon if no image exists in DB
                    <User2 className="h-20 w-20 text-blue-300" />
                  )}

                  {/* Department Tag */}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {doc.doctorProfile?.department || "General"}
                  </div>
                </div>

                {/* Info Section */}
                <CardContent className="p-6 text-center flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.fullName}</h3>
                    <p className="text-blue-600 font-medium text-sm mb-4">
                      {doc.doctorProfile?.specialization || "Specialist"}
                    </p>
                    
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mb-6">
                      <MapPin className="h-4 w-4" /> Sunflag Global Hospital
                    </div>
                  </div>

                  <Link href="/book" className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
