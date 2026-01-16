"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function RegisterPatientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "", // Optional for patients
    phone: "",
    role: "PATIENT",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    medicalHistory: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem("token")

    try {
      // Auto-generate email if empty (Patients often don't have one)
      const payload = {
        ...formData,
        email: formData.email || `patient-${Date.now()}@hospital.com`
      }

      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        alert("Patient Registered Successfully!")
        router.push("/dashboard/patients")
      } else {
        alert("Failed to register patient.")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/dashboard/patients" className="flex items-center text-slate-500 hover:text-blue-600">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patient List
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Register New Patient</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Patient Name *</Label>
                <Input required onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Phone Number *</Label>
                <Input required type="tel" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
               <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" onChange={(e) => setFormData({...formData, dob: e.target.value})} />
               </div>
               <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select onValueChange={(val) => setFormData({...formData, gender: val})}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div className="space-y-2">
                  <Label>Blood Group</Label>
                  <Select onValueChange={(val) => setFormData({...formData, bloodGroup: val})}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="space-y-2">
               <Label>Address</Label>
               <Input placeholder="House No, Street, City" onChange={(e) => setFormData({...formData, address: e.target.value})} />
            </div>

            <div className="space-y-2">
               <Label>Medical History / Conditions</Label>
               <Textarea placeholder="Diabetes, Allergies, Previous Surgeries..." onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})} />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              <Save className="mr-2 h-4 w-4" /> {loading ? "Registering..." : "Register Patient"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
