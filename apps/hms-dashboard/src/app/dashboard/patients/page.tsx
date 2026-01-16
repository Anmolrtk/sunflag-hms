"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, User, MapPin, Activity, Droplet } from "lucide-react"
import Link from "next/link"

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:3001/users", {
         headers: { "Authorization": `Bearer ${token}` }
      })
      const data = await res.json()
      // Filter only users who are PATIENTS
      if (Array.isArray(data)) {
        const onlyPatients = data.filter((u: any) => u.role === 'PATIENT')
        setPatients(onlyPatients)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(p =>
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone?.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Patients</h2>
          <p className="text-slate-500">Total Registered: {patients.length}</p>
        </div>
        <Link href="/dashboard/patients/add">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Register New Patient
          </Button>
        </Link>
      </div>

      <Card className="p-4">
        <div className="relative max-w-sm">
           <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
           <Input
             placeholder="Search by name or phone..."
             className="pl-9"
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && <p>Loading records...</p>}
        {!loading && filteredPatients.length === 0 && <p className="text-slate-500">No patients found.</p>}

        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xl">
                    {patient.fullName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{patient.fullName}</h3>
                    <p className="text-sm text-slate-500">{patient.phone || "No Phone"}</p>
                  </div>
                </div>
                {patient.patientProfile?.bloodGroup && (
                  <Badge variant="outline" className="text-red-600 border-red-200 flex gap-1">
                    <Droplet size={10} fill="currentColor" /> {patient.patientProfile.bloodGroup}
                  </Badge>
                )}
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                   <User size={14} className="text-slate-400" />
                   <span>{patient.patientProfile?.gender || "Gender N/A"} • DOB: {patient.patientProfile?.dob || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                   <MapPin size={14} className="text-slate-400" />
                   <span className="truncate">{patient.patientProfile?.address || "No Address"}</span>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t mt-2">
                   <Activity size={14} className="text-slate-400 mt-0.5" />
                   <span className="text-xs text-slate-500 line-clamp-2">
                     {patient.patientProfile?.medicalHistory || "No History"}
                   </span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4 text-sm h-8">View History</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
