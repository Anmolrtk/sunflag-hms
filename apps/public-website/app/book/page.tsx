"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function BookingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    date: "",
    reason: ""
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      // Note: We use the /public/appointments endpoint
      const res = await fetch("https://sunflag-hms.onrender.com/public/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch (err) {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="rounded-full bg-green-100 p-6 mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Appointment Request Sent!</h1>
        <p className="mt-2 text-gray-600 max-w-md">
          Our team will contact you shortly at <strong>{formData.phone}</strong> to confirm your slot.
        </p>
        <Link href="/" className="mt-8 text-blue-600 font-medium hover:underline">
          Return Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-lg">
        <Link href="/" className="flex items-center text-gray-500 mb-6 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book an Appointment</h2>
        <p className="text-gray-500 mb-6">Fill in your details below.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input 
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="text" 
              placeholder="Ex. Rahul Kumar"
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input 
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="tel" 
              placeholder="Ex. 9876543210"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
            <input 
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              type="datetime-local" 
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
            <textarea 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              rows={3}
              placeholder="Ex. Fever, Stomach ache, Checkup..."
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
          >
            {status === "loading" ? "Booking..." : "Confirm Booking"}
          </button>
          
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">Something went wrong. Try again.</p>
          )}
        </form>
      </div>
    </div>
  )
}
