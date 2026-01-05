"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, FileText, Check, X } from "lucide-react"

interface Appointment {
  id: number
  date: string
  reason: string
  status: string
  patient: {
    name: string
    phone: string
  }
  doctor: {
    name: string
  }
}

export default function AppointmentsListPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch Logic
  const fetchAppointments = async () => {
    const token = localStorage.getItem("token")
    if (!token) return router.push("/login")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  // Update Logic
  const handleStatusUpdate = async (id: number, newStatus: string) => {
    const token = localStorage.getItem("token")
    if (!token) return

    // Optimistic UI Update (Change it instantly on screen)
    setAppointments(prev => prev.map(appt =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    ))

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!res.ok) {
        // Revert if failed
        alert("Failed to update status")
        fetchAppointments()
      }
    } catch (err) {
      alert("Network Error")
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <Button onClick={fetchAppointments} variant="outline">Refresh</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appt) => (
          <Card key={appt.id} className={`border-l-4 shadow-sm ${
            appt.status === 'CONFIRMED' ? 'border-l-green-500' : 
            appt.status === 'CANCELLED' ? 'border-l-red-500' : 'border-l-yellow-500'
          }`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-start">
                <span>{appt.patient?.name || "Guest"}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  appt.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 
                  appt.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appt.status}
                </span>
              </CardTitle>
              <p className="text-sm text-gray-500">{appt.patient?.phone}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(appt.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-gray-600">
                <User className="mr-2 h-4 w-4" />
                Dr. {appt.doctor?.fullName || appt.doctor?.name || "Unassigned"}
              </div>
              <div className="pt-2 border-t mt-2 text-gray-700 italic">
                "{appt.reason}"
              </div>
            </CardContent>
            
            {/* Action Buttons - Only show if PENDING */}
            {appt.status === 'PENDING' && (
              <CardFooter className="pt-0 flex gap-2">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="sm"
                  onClick={() => handleStatusUpdate(appt.id, "CONFIRMED")}
                >
                  <Check className="w-4 h-4 mr-1" /> Approve
                </Button>
                <Button
                  className="flex-1"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleStatusUpdate(appt.id, "CANCELLED")}
                >
                  <X className="w-4 h-4 mr-1" /> Cancel
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
