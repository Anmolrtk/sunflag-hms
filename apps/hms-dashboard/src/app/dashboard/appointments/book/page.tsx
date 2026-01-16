"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

function BookingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams.get("patientId")
  const patientName = searchParams.get("name")

  const [doctors, setDoctors] = useState<any[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)

  // 1. Fetch Doctors on Load
    useEffect(() => {
        async function fetchDoctors() {
          try {
            const res = await fetch("http://127.0.0.1:3000/appointments/doctors")
            const data = await res.json()
            
            console.log("Doctors API Response:", data); // <--- Check your console for this!

            if (Array.isArray(data)) {
              setDoctors(data)
              if (data.length > 0) setSelectedDoctor(data[0].id)
            } else {
              console.error("API did not return a list:", data)
              setDoctors([]) // Fallback to empty list to prevent crash
            }
          } catch (err) {
            console.error("Network Error:", err)
            setDoctors([])
          }
        }
        fetchDoctors()
      }, [])
  // 2. Handle Form Submit
  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://127.0.0.1:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          patientId,
          doctorId: selectedDoctor,
          date: new Date(date).toISOString(), // Convert to ISO format
        }),
      })

      if (res.ok) {
        alert("Appointment Booked Successfully!")
        router.push("/dashboard/appointments") // We will build this list next
      } else {
        alert("Failed to book appointment")
      }
    } catch (error) {
      console.error(error)
      alert("Error booking appointment")
    } finally {
      setLoading(false)
    }
  }

  if (!patientId) return <div className="p-10">Error: No patient selected.</div>

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Book Appointment for {patientName}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBook} className="space-y-4">
            
            {/* Doctor Selection */}
            <div className="space-y-2">
              <Label>Select Doctor</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} - {doc.specialty} (₹{doc.consultationFee})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label>Appointment Date</Label>
              <Input 
                type="datetime-local" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Confirm Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingForm />
    </Suspense>
  )
}
