"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Search, Phone, Calendar } from "lucide-react"

export default function PatientsPage() {
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  // 1. Fetch Data
  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
          headers: { "Authorization": `Bearer ${token}` }
        })
        if (res.ok) {
          setPatients(await res.json())
        }
      } catch (err) {
        console.error("Failed to load patients", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPatients()
  }, [])

  // 2. Search Filter Logic
  const filteredPatients = patients.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  )

  if (loading) return <div className="p-8">Loading patient registry...</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patient Registry</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or phone..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient: any) => (
          <Card key={patient.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {patient.name}
              </CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  {patient.phone}
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 font-semibold mb-1">RECENT ACTIVITY</p>
                  {patient.appointments?.length > 0 ? (
                    <div className="text-sm">
                      <div className="flex items-center text-blue-600 mb-1">
                        <Calendar className="mr-2 h-3 w-3" />
                        Last Visit: {new Date(patient.appointments[0].date).toLocaleDateString()}
                      </div>
                      <p className="text-gray-500 text-xs pl-5">
                        "{patient.appointments[0].reason}"
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">No appointments yet.</p>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 text-xs text-gray-400">
                  <span>ID: #{patient.id}</span>
                  <span>Total Visits: {patient.appointments?.length || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
