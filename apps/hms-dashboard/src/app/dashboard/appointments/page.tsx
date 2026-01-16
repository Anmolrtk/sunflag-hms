"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, CheckCircle, XCircle, Trash2, Search, Stethoscope } from "lucide-react"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:3001/appointments", {
        headers: { "Authorization": `Bearer ${token}` },
        cache: "no-store" // Ensure we don't get cached old data
      })
      const data = await res.json()
      
      console.log("API DATA RECEIVED:", data) // <--- DEBUG LOG: Look at this in Console!

      if (Array.isArray(data)) {
        setAppointments(data)
      }
    } catch (error) {
      console.error("Failed to load appointments", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:3001/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })
      if (res.ok) fetchAppointments()
    } catch (error) { console.error(error) }
  }

  const deleteAppointment = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:3001/appointments/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) fetchAppointments()
    } catch (error) { console.error(error) }
  }

  // Filter Logic (Handles Guests Correctly)
  const filtered = appointments.filter(app => {
    // Check both "Guest Name" (patientName) and "Registered Name" (patient.fullName)
    const pName = app.patientName || app.patient?.fullName || "Guest"
    const dName = app.doctor?.fullName || "Unassigned"
    const term = searchTerm.toLowerCase()
    
    return pName.toLowerCase().includes(term) || dName.toLowerCase().includes(term)
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case "CONFIRMED": return "bg-green-100 text-green-700 hover:bg-green-200"
      case "CANCELLED": return "bg-red-100 text-red-700 hover:bg-red-200"
      default: return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Appointments</h2>
          <p className="text-slate-500">Manage patient bookings.</p>
        </div>
        <div className="flex gap-2">
           <Button onClick={fetchAppointments} variant="outline">Refresh</Button>
           <Link href="/dashboard/appointments/add">
             <Button className="bg-blue-600 hover:bg-blue-700">
               + New Appointment
             </Button>
           </Link>
        </div>
      </div>

      <Card className="p-4">
        <div className="relative max-w-sm">
           <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
           <Input
             placeholder="Search by Patient or Doctor..."
             className="pl-9"
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && <p>Loading...</p>}
        {!loading && filtered.length === 0 && <p className="text-slate-500">No appointments found.</p>}

        {filtered.map((apt) => (
          <Card key={apt.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
                <button onClick={() => deleteAppointment(apt.id)} className="text-slate-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Display Logic: Priority to Guest Name, then Registered User Name */}
              <h3 className="font-bold text-lg text-slate-900">
                 {apt.patientName || apt.patient?.fullName || "Guest Patient"}
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                 {apt.patientPhone || apt.patient?.phone || "No Phone"}
              </p>

              <div className="space-y-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
                <div className="flex items-center gap-2">
                   <Calendar size={14} className="text-blue-500" />
                   <span>{new Date(apt.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Clock size={14} className="text-blue-500" />
                   <span>{new Date(apt.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-slate-800">
                   <Stethoscope size={14} className="text-purple-500" />
                   <span>Dr. {apt.doctor?.fullName || "Unassigned"}</span>
                </div>
              </div>

              {apt.status === "PENDING" && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => updateStatus(apt.id, "CONFIRMED")}>
                    <CheckCircle className="mr-1 h-4 w-4" /> Accept
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => updateStatus(apt.id, "CANCELLED")}>
                    <XCircle className="mr-1 h-4 w-4" /> Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
