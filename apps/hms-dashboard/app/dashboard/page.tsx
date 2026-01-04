"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, FileText } from "lucide-react"

// Define what an Appointment looks like
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
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token")
      
      // If no token, kick them out to login
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
          headers: {
            "Authorization": `Bearer ${token}` // This is the Key! 🔑
          }
        })

        if (res.ok) {
          const data = await res.json()
          setAppointments(data)
        } else {
          setError("Failed to load appointments. Are you logged in?")
        }
      } catch (err) {
        setError("Network error. Backend might be down.")
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [router])

  if (loading) return <div className="p-8">Loading appointments...</div>
  if (error) return <div className="p-8 text-red-500">{error}</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <Button onClick={() => window.location.reload()}>Refresh List</Button>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            No appointments found yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appt) => (
            <Card key={appt.id} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between">
                  <span>{appt.patient?.name || "Guest Patient"}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    appt.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
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
                  <Clock className="mr-2 h-4 w-4" />
                  {new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="mr-2 h-4 w-4" />
                  Dr. {appt.doctor?.name || "Unassigned"}
                </div>
                <div className="mt-3 pt-3 border-t flex items-start text-gray-600">
                  <FileText className="mr-2 h-4 w-4 mt-0.5" />
                  <span className="italic">"{appt.reason}"</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
