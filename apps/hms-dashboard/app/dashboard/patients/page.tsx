"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Define what a Patient looks like
interface Patient {
  id: string
  uhid: string
  fullName: string
  mobile: string
  gender: string
  city: string
  createdAt: string
}

export default function PatientListPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token")
      // Use 127.0.0.1 since it worked for you
      const res = await fetch("http://127.0.0.1:3000/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      if (res.ok) {
        const data = await res.json()
        setPatients(data)
      } else {
        console.error("Failed to fetch patients")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Patient Records</h1>
          <p className="text-slate-500">Manage and view all registered patients.</p>
        </div>
        <Link href="/dashboard/patients/register">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Register New Patient
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border shadow-sm">
        <Search className="h-5 w-5 text-slate-400" />
        <Input 
          placeholder="Search by Name, Mobile or UHID..." 
          className="border-0 focus-visible:ring-0" 
        />
      </div>

      {/* The Table */}
      <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-medium text-slate-600">UHID</th>
              <th className="p-4 font-medium text-slate-600">Full Name</th>
              <th className="p-4 font-medium text-slate-600">Gender</th>
              <th className="p-4 font-medium text-slate-600">Mobile</th>
              <th className="p-4 font-medium text-slate-600">City</th>
              <th className="p-4 font-medium text-slate-600">Registered On</th>
          <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
                      {loading ? (
                        <tr><td colSpan={7} className="p-8 text-center text-slate-500">Loading records...</td></tr>
                      ) : patients.length === 0 ? (
                        <tr><td colSpan={7} className="p-8 text-center text-slate-500">No patients found.</td></tr>
                      ) : (
                        patients.map((patient) => (
                          <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-mono text-blue-600 font-medium">{patient.uhid}</td>
                            <td className="p-4 font-medium text-slate-900">{patient.fullName}</td>
                            <td className="p-4 text-slate-600">{patient.gender}</td>
                            <td className="p-4 text-slate-600">{patient.mobile}</td>
                            <td className="p-4 text-slate-600">{patient.city || "-"}</td>
                            <td className="p-4 text-slate-500">
                              {new Date(patient.createdAt).toLocaleDateString()}
                            </td>
                            {/* NEW COLUMN: ACTIONS */}
                            <td className="p-4">
                              <Link href={`/dashboard/appointments/book?patientId=${patient.id}&name=${patient.fullName}`}>
                                <Button size="sm" variant="outline">Book OPD</Button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
        </table>
      </div>
    </div>
  )
}
