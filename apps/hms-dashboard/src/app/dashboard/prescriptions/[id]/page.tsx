"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"

export default function PrescriptionView() {
  const params = useParams()
  const [data, setData] = useState<any>(null)

  // Wait for the ID to be ready
  useEffect(() => {
    if (params?.id) fetchRx(params.id as string)
  }, [params])

  async function fetchRx(id: string) {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://127.0.0.1:3000/prescriptions/${id}`, {
         headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) setData(await res.json())
    } catch (e) { console.error(e) }
  }

  if (!data) return <div className="p-10 text-center">Loading Prescription Details...</div>

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg border my-10 print:shadow-none print:border-0 print:m-0">
      
      {/* Header */}
      <div className="border-b pb-6 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">SUNFLAG GLOBAL HOSPITAL</h1>
          <p className="text-sm text-slate-500">Excellence in Care • 24/7 Emergency</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold">Dr. {data.appointment?.doctor?.name}</h2>
          <p className="text-sm text-slate-500">{data.appointment?.doctor?.specialty}</p>
        </div>
      </div>

      {/* Patient Info */}
      <div className="bg-slate-50 p-4 rounded-md mb-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-slate-500 block">Patient Name</span>
          <span className="font-semibold text-lg">{data.appointment?.patient?.fullName}</span>
        </div>
        <div className="text-right">
          <span className="text-slate-500 block">Date</span>
          <span className="font-semibold">{new Date(data.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase text-slate-400 mb-1">Diagnosis</h3>
        <p className="text-xl font-medium">{data.diagnosis}</p>
      </div>

      {/* Medicines Table */}
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase text-slate-400 mb-2">Rx (Medicines)</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 text-left">
              <th className="py-2">Medicine</th>
              <th className="py-2">Dosage</th>
              <th className="py-2">Duration</th>
              <th className="py-2">Instruction</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.medicines.map((med: any) => (
              <tr key={med.id}>
                <td className="py-3 font-medium">{med.medicineName}</td>
                <td className="py-3">{med.dosage}</td>
                <td className="py-3">{med.duration}</td>
                <td className="py-3 text-slate-600 italic">{med.instruction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="fixed bottom-8 right-8 print:hidden">
        <Button size="lg" onClick={() => window.print()} className="shadow-xl">
          <Printer className="mr-2 h-5 w-5" /> Print
        </Button>
      </div>
    </div>
  )
}
