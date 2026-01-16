"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User, Mail, Lock, Building, Stethoscope } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddStaffPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    department: "",
    specialization: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 1. Get Token
    const token = localStorage.getItem("token")
    if (!token) {
      alert("You must be logged in to add staff.")
      router.push("/login")
      return
    }

    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          // 2. Send Token in Headers
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert("Success! Staff member has been added.")
        router.push("/dashboard/staff")
      } else {
        const errorData = await res.json()
        alert(`Error: ${errorData.message || "Failed to save staff"}`)
      }
    } catch (error) {
      console.error("API Error:", error)
      alert("Failed to connect to the server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <Link href="/dashboard/staff" className="flex items-center text-slate-500 hover:text-blue-600 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Staff List
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Add New Staff Member</CardTitle>
          <p className="text-slate-500 text-sm">
            Create an account. If you select <b>Doctor</b>, they will automatically appear on the public website.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Dr. Rajesh Kumar"
                    className="pl-8"
                    required
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="rajesh@sunflag.com"
                    className="pl-8"
                    required
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>
          
          {/* NEW: Profile Image URL */}
          <div className="space-y-2">
                         <label className="text-sm font-medium">Profile Image URL (Optional)</label>
                         <Input
                           placeholder="https://example.com/photo.jpg"
                           onChange={(e) => setFormData({...formData, image: e.target.value})}
                         />
                         <p className="text-xs text-slate-500">Paste a link to their photo.</p>
                      </div>

            {/* Role & Dept */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select onValueChange={(val) => setFormData({...formData, role: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DOCTOR">Doctor (Public)</SelectItem>
                    <SelectItem value="NURSE">Nurse</SelectItem>
                    <SelectItem value="ADMIN">Admin / Reception</SelectItem>
                    <SelectItem value="WARD_BOY">Ward Boy</SelectItem>
                    <SelectItem value="GUARD">Security Guard</SelectItem>
                    <SelectItem value="PHARMACIST">Pharmacist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <div className="relative">
                  <Building className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="e.g. ICU, Cardiology"
                    className="pl-8"
                    required
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Specialization (Only appears if Doctor is selected) */}
            {formData.role === "DOCTOR" && (
              <div className="space-y-2 bg-blue-50 p-4 rounded-md border border-blue-100 animate-in fade-in slide-in-from-top-2">
                <label className="text-sm font-bold text-blue-900 flex items-center gap-2">
                   <Stethoscope className="h-4 w-4" /> Doctor's Specialization
                </label>
                <p className="text-xs text-blue-600 mb-2">This will be shown on the website card.</p>
                <Input
                  placeholder="e.g. Senior Heart Surgeon"
                  className="bg-white"
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                />
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Set Password</label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="password"
                  placeholder="******"
                  className="pl-8"
                  required
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-4" disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving to Database..." : "Create Account"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
