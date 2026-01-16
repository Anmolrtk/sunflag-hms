"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CalendarPlus, User } from "lucide-react"
import Link from "next/link"

export default function BookAppointmentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [doctors, setDoctors] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    date: "",
    time: "",
    reason: "",
    doctorId: ""
  })

  // 1. Fetch Doctors for the Dropdown
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token")
        // Note: Using the public endpoint so we get all doctors easily
        const res = await fetch("http://localhost:3001/users/public/doctors", {
          headers: { "Authorization": `Bearer ${token}` }
        })
        const data = await res.json()
        if (Array.isArray(data)) setDoctors(data)
      } catch (err) {
        console.error("Failed to load doctors", err)
      }
    }
    fetchDoctors()
  }, [])

  // 2. Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem("token")

    try {
      // Combine Date and Time into a single ISO string
      const dateTime = new Date(`${formData.date}T${formData.time}:00`)

      const res = await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          patientName: formData.patientName,
          patientPhone: formData.patientPhone,
          date: dateTime.toISOString(),
          reason: formData.reason,
          doctorId: formData.doctorId
        }),
      })

      if (res.ok) {
        alert("Appointment Booked Successfully!")
        router.push("/dashboard/appointments")
      } else {
        const error = await res.json()
        alert(`Failed: ${error.message || "Unknown error"}`)
      }
    } catch (err) {
      alert("Network Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/appointments" className="flex items-center text-slate-500 hover:text-blue-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Book Appointment</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Booking Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Patient Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Patient Name</Label>
                <Input required placeholder="e.g. John Doe" onChange={(e) => setFormData({...formData, patientName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input required placeholder="e.g. 9876543210" onChange={(e) => setFormData({...formData, patientPhone: e.target.value})} />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" required onChange={(e) => setFormData({...formData, date: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" required onChange={(e) => setFormData({...formData, time: e.target.value})} />
               </div>
            </div>

            {/* Select Doctor */}
            <div className="space-y-2">
              <Label>Assign Doctor</Label>
              <Select onValueChange={(val) => setFormData({...formData, doctorId: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      Dr. {doc.fullName} ({doc.doctorProfile?.specialization || "General"})
                    </SelectItem>
                  ))}
                  {doctors.length === 0 && <SelectItem value="none" disabled>No Doctors Found</SelectItem>}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
               <Label>Reason for Visit</Label>
               <Textarea placeholder="Fever, Consultation, Checkup..." onChange={(e) => setFormData({...formData, reason: e.target.value})} />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-2" disabled={loading}>
              <CalendarPlus className="mr-2 h-4 w-4" />
              {loading ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
