"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Briefcase, Upload, CheckCircle2, MapPin } from "lucide-react"

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
      <div className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-blue-100 max-w-2xl mx-auto px-4">
          Build your career with Sunflag Global Hospital. We are always looking for
          passionate individuals to join our mission of saving lives.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">
        
        {/* LEFT COLUMN: Open Positions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" /> Current Openings
          </h2>
          
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border hover:border-blue-300 transition-colors">
                <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
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
                  <h3 className="text-xl font-bold text-slate-800">Application Received!</h3>
                  <p className="text-slate-500 mt-2">Thank you for applying. Our HR team will review your resume and contact you shortly.</p>
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
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      {fileName ? (
                        <p className="text-sm font-medium text-blue-600">{fileName}</p>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                          <p className="text-xs text-slate-400 mt-1">PDF, DOC up to 5MB</p>
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
    </div>
  )
}
