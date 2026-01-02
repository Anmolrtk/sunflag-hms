"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Stethoscope } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://127.0.0.1:3000/appointments", {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">OPD Appointments</h1>

      <div className="grid gap-4">
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="text-slate-500">No appointments scheduled.</p>
        ) : (
          appointments.map((apt) => (
            <Card key={apt.id} className="flex flex-row items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {/* Date Box */}
                <div className="flex flex-col items-center justify-center h-16 w-16 bg-blue-50 rounded-lg text-blue-700">
                  <span className="text-xs font-bold uppercase">
                    {new Date(apt.date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-xl font-bold">
                    {new Date(apt.date).getDate()}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-500" />
                    {apt.patient.fullName}
                  </h3>
                  <p className="text-sm text-slate-500 flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    {apt.doctor.name} ({apt.doctor.specialty})
                  </p>
                </div>
              </div>

              {/* Status & Time */}
              <div className="text-right space-y-2">
                <Badge variant={apt.status === "PENDING" ? "secondary" : "default"}>
                  {apt.status}
                </Badge>
                <div className="text-sm text-slate-500 flex items-center justify-end gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                                     <div className="ml-4 pl-4 border-l flex gap-2"> {/* Added flex gap-2 */}
                                                     
                                                     {/* --- NEW RX BUTTON --- */}
                                                     <Link href={`/dashboard/prescriptions/create?patientId=${apt.patientId}&appointmentId=${apt.id}&name=${apt.patient.fullName}`}>
                                                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                                          Rx
                                                        </Button>
                                                     </Link>
                                                     {/* --------------------- */}

                                                     <Link href={`/dashboard/billing/create?patientId=${apt.patientId}&appointmentId=${apt.id}&name=${apt.patient.fullName}`}>
                                                        <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                                                          Bill
                                                        </Button>
                                                     </Link>
                                                   </div>
                                     
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
