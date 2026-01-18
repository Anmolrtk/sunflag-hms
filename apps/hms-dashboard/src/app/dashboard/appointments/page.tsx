"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, FileText, CheckCircle, XCircle } from "lucide-react"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch Appointments on Load
  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token")
      // Ensure we use the correct backend port (3001)
      const res = await fetch("http://localhost:3001/appointments", {
        headers: { "Authorization": `Bearer ${token}` }
      })

      if (res.ok) {
        const data = await res.json()
        setAppointments(data)
      } else {
        console.error("Failed to fetch appointments")
      }
    } catch (error) {
      console.error("Error loading appointments:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle Status Update (Mock Function for now)
    // Real API Function
      const updateStatus = async (id: string, newStatus: string) => {
        try {
          const token = localStorage.getItem("token")
          
          // Call the Backend to update status
          const res = await fetch(`http://localhost:3001/appointments/${id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
          })

          if (res.ok) {
            // If success, update the UI instantly
            setAppointments(prev =>
              prev.map((app: any) => app.id === id ? { ...app, status: newStatus } : app)
            )
          } else {
            alert("Failed to update. Check backend terminal for errors.")
            console.error("Update failed:", res.status)
          }
        } catch (error) {
          console.error("Error updating status:", error)
        }
      }

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Appointments...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Appointments</h2>
        <Button onClick={fetchAppointments} variant="outline">
          Refresh List
        </Button>
      </div>

      <div className="grid gap-4">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center text-slate-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No appointments found for today.</p>
            </CardContent>
          </Card>
        ) : (
          appointments.map((apt: any) => (
            <Card key={apt.id} className="overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                {/* Left: Patient Info */}
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {apt.patientName?.charAt(0) || "P"}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{apt.patientName}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {new Date(apt.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle: Details */}
                <div className="flex-1 md:px-8">
                  <div className="flex items-center gap-2 text-sm text-slate-700 mb-1">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{apt.doctor?.fullName || "Unknown"}</span>
                  </div>
                  {apt.reason && (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span>{apt.reason}</span>
                    </div>
                  )}
                </div>

                {/* Right: Status & Actions */}
                                          {/* Right: Status & Actions */}
                                          <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                            
                                            {/* Status Badge */}
                                            <Badge className={
                                              apt.status === "CONFIRMED" ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200" :
                                              apt.status === "CANCELLED" ? "bg-red-100 text-red-700 hover:bg-red-100 border-red-200" :
                                              "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200"
                                            }>
                                              {apt.status || "PENDING"}
                                            </Badge>

                                            {/* VISIBLE Action Buttons */}
                                            {apt.status !== "CANCELLED" && (
                                              <div className="flex gap-2">
                                                {/* Confirm Button */}
                                                {apt.status !== "CONFIRMED" && (
                                                  <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white h-8"
                                                    onClick={() => updateStatus(apt.id, "CONFIRMED")}
                                                  >
                                                    <CheckCircle className="h-4 w-4 mr-1" /> Confirm
                                                  </Button>
                                                )}

                                                {/* Cancel Button */}
                                                <Button
                                                  size="sm"
                                                  variant="outline"
                                                  className="border-red-200 text-red-600 hover:bg-red-50 h-8"
                                                  onClick={() => updateStatus(apt.id, "CANCELLED")}
                                                >
                                                  <XCircle className="h-4 w-4 mr-1" /> Cancel
                                                </Button>
                                              </div>
                                            )}
                                          </div>



              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
