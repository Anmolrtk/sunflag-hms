"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  
  // FIXED: Updated field names to match Backend DTO
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "", // Was 'name', now 'fullName'
    role: "ADMIN" // Default to ADMIN for your first account
  })
  
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle Dropdown changes separately
  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      console.log("Sending data:", formData) // Debug log

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert("Registration Successful! Please Log In.")
        router.push("/login")
      } else {
        const data = await res.json()
        // Improve error message display
        if (Array.isArray(data.message)) {
            setError(data.message.join(", "))
        } else {
            setError(data.message || "Registration failed")
        }
      }
    } catch (err) {
      setError("Network error. Is the backend running?")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Create Staff Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              {/* FIXED: name attribute is now 'fullName' */}
              <Input name="fullName" onChange={handleChange} required placeholder="Dr. Anmol" />
            </div>
            
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" onChange={handleChange} required placeholder="admin@sunflag.com" />
            </div>
            
            <div>
              <Label>Password</Label>
              <Input name="password" type="password" onChange={handleChange} required />
            </div>

            <div>
              <Label>Role</Label>
              <Select onValueChange={handleRoleChange} defaultValue="ADMIN">
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="DOCTOR">Doctor</SelectItem>
                  <SelectItem value="NURSE">Nurse</SelectItem>
                  <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
