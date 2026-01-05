"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Stethoscope } from "lucide-react"

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([])
  const [showForm, setShowForm] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "password123", // Default for easy testing
    phone: "",
    specialization: "General Physician"
  })

  // 1. Fetch Doctors on Load
  const fetchDoctors = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/doctors`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
    if (res.ok) {
      setDoctors(await res.json())
    }
  }

  useEffect(() => { fetchDoctors() }, [])

  // 2. Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ ...formData, role: 'DOCTOR' })
    })

    if (res.ok) {
      alert("Doctor Added Successfully!")
      setShowForm(false)
      fetchDoctors() // Refresh list
    } else {
      alert("Failed to add doctor")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Medical Staff</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <UserPlus className="mr-2 h-4 w-4" /> Add Doctor
        </Button>
      </div>

      {/* Add Doctor Form (Toggleable) */}
      {showForm && (
        <Card className="bg-slate-50 border-slate-200">
          <CardHeader>
            <CardTitle>Register New Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Full Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
              <Input placeholder="Email Address" type="email" onChange={e => setFormData({...formData, email: e.target.value})} required />
              <Input placeholder="Phone Number" onChange={e => setFormData({...formData, phone: e.target.value})} />
              <Input placeholder="Specialization (e.g. Cardiologist)" onChange={e => setFormData({...formData, specialization: e.target.value})} />
              <Input placeholder="Password" type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              <Button type="submit" className="md:col-span-2">Create Account</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Doctors List */}
      <div className="grid gap-4 md:grid-cols-3">
        {doctors.map((doc: any) => (
          <Card key={doc.id}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Stethoscope className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">{doc.fullName}</CardTitle>
                <p className="text-sm text-gray-500">{doc.doctorProfile?.specialization || "Doctor"}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                <p>📧 {doc.email}</p>
                <p>📞 {doc.phone || "No phone"}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
