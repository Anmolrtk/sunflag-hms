"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Briefcase, Upload, CheckCircle2, MapPin, UserPlus, FileText, Award } from "lucide-react"

export default function CareersPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [fileName, setFileName] = useState("")

  // Static list of open jobs (Mock Data)
  const jobs = [
    { id: 1, title: "Senior Staff Nurse", type: "Full-time", dept: "Emergency" },
    { id: 2, title: "Medical Laboratory Technician", type: "Full-time", dept: "Pathology" },
    { id: 3, title: "Front Desk Receptionist", type: "Part-time", dept: "Administration" },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate an API call delay
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      // Reset form logic would go here
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20 text-center overflow-hidden">
        {/* Careers Background Animations */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <Briefcase className="absolute top-12 left-[15%] w-24 h-24 text-blue-300 animate-[bounce_5s_ease-in-out_infinite]" />
          <UserPlus className="absolute bottom-8 left-[25%] w-16 h-16 text-green-300 animate-[pulse_4s_ease-in-out_infinite]" />
          <FileText className="absolute top-1/2 right-[15%] w-20 h-20 text-purple-300 animate-[bounce_6s_ease-in-out_infinite]" />
          <Award className="absolute bottom-12 right-[30%] w-24 h-24 text-yellow-300 animate-[pulse_3s_ease-in-out_infinite]" />
          <CheckCircle2 className="absolute top-8 left-[40%] w-12 h-12 text-cyan-200 animate-[ping_8s_ease-in-out_infinite]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">Join Our Team</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg drop-shadow">
            Build your career with Sunflag Global Hospital. We are always looking for
            passionate individuals to join our mission of saving lives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">

        {/* LEFT COLUMN: Open Positions */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" /> Current Openings
          </h2>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border hover:border-blue-300 transition-colors">
                <h3 className="font-bold text-lg text-black">{job.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-black">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">{job.type}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.dept}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-900">Don't see your role?</h3>
            <p className="text-sm text-blue-700 mt-1">
              Submit your resume anyway! We are always hiring for talented doctors, nurses, and support staff.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Application Form */}
        <div>
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-white border-b pb-4">
              <CardTitle>Apply Now</CardTitle>
              <CardDescription>Fill out the form below to submit your application.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-white">

              {success ? (
                <div className="text-center py-10">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Application Received!</h3>
                  <p className="text-black mt-2">Thank you for applying. Our HR team will review your resume and contact you shortly.</p>
                  <Button onClick={() => setSuccess(false)} variant="outline" className="mt-6">
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position Applying For</Label>
                    <select
                      id="position"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select a position...</option>
                      <option value="nurse">Staff Nurse</option>
                      <option value="technician">Lab Technician</option>
                      <option value="receptionist">Receptionist</option>
                      <option value="doctor">Doctor / Specialist</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Resume Upload Section */}
                  <div className="space-y-2 pt-2">
                    <Label>Resume / CV (PDF or Word)</Label>
                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                      <Upload className="h-8 w-8 text-black mx-auto mb-2" />
                      {fileName ? (
                        <p className="text-sm font-medium text-blue-600">{fileName}</p>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-black">Click to upload or drag and drop</p>
                          <p className="text-xs text-black mt-1">PDF, DOC up to 5MB</p>
                        </>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sunflag Global Hospital Rohtak</h2>
          <p className="mb-6">Providing care, hope, and excellence since 2014.</p>
          <div className="text-sm text-white">
            © 2026 Sunflag Hospital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
