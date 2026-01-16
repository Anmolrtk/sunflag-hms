"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation" // Correct import for Next.js 13+
import { useParams } from "next/navigation" // To get the ID from URL
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Trash2, Camera } from "lucide-react"
import Link from "next/link"

export default function EditStaffPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string // Get ID from URL

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<any>({})

  // 1. Fetch Existing Data
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:3001/users`, { // We fetch all to find one (simplest for now)
         headers: { "Authorization": `Bearer ${token}` }
      })
      const data = await res.json()
      // Find the specific user
      const user = data.find((u: any) => u.id === id)
      
      if (user) {
        setFormData({
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          image: user.image || "",
          department: user.doctorProfile?.department || user.department || "",
          specialization: user.doctorProfile?.specialization || ""
        })
      }
      setLoading(false)
    }
    fetchData()
  }, [id])

  // 2. Handle Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const token = localStorage.getItem("token")

    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert("Profile updated successfully!")
        router.push("/dashboard/staff")
      } else {
        alert("Failed to update.")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-10 text-center">Loading Profile...</div>

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/staff" className="flex items-center text-slate-500 hover:text-blue-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleUpdate} className="space-y-4">
            
            {/* Photo Preview */}
            <div className="flex justify-center mb-6">
               <div className="relative">
                 <img
                   src={formData.image || "https://ui-avatars.com/api/?name=" + formData.fullName}
                   className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow"
                 />
                 <div className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white">
                   <Camera size={14} />
                 </div>
               </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label>Email (Read Only)</Label>
                <Input value={formData.email} disabled className="bg-slate-100" />
              </div>

              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Role</Label>
                     <Select value={formData.role} onValueChange={(val) => setFormData({...formData, role: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DOCTOR">Doctor</SelectItem>
                        <SelectItem value="NURSE">Nurse</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label>Department</Label>
                    <Input value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
                 </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-4" disabled={saving}>
              <Save className="mr-2 h-4 w-4" /> {saving ? "Saving Changes..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
