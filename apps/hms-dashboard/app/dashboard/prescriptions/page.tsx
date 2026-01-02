"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"

export default function PrescriptionList() {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://127.0.0.1:3000/prescriptions", {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        setList(await res.json())
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Prescription Records</h1>
      <Card>
        <CardHeader><CardTitle>Recent Prescriptions</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm text-left">
            <thead className="text-muted-foreground border-b">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Diagnosis</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr> :
               list.length === 0 ? <tr><td colSpan={4} className="p-4 text-center text-slate-500">No records found.</td></tr> :
               list.map((rx) => (
                <tr key={rx.id} className="hover:bg-slate-50">
                  <td className="p-4">{new Date(rx.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-medium">{rx.appointment?.patient?.fullName}</td>
                  <td className="p-4 text-slate-600">{rx.diagnosis}</td>
                  <td className="p-4 text-right">
                    {/* THIS LINK MUST MATCH THE FOLDER STRUCTURE BELOW */}
                    <Link href={`/dashboard/prescriptions/${rx.id}`}>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
