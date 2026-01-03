"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        alert("Registration Successful! Please Log In.")
        router.push("/login") // We will create this next
      } else {
        const data = await res.json()
        setError(data.message || "Registration failed")
      }
    } catch (err) {
      setError("Network error. Is the backend running?")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input name="name" onChange={handleChange} required />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" onChange={handleChange} required />
            </div>
            <div>
              <Label>Password</Label>
              <Input name="password" type="password" onChange={handleChange} required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Register Staff Account</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
