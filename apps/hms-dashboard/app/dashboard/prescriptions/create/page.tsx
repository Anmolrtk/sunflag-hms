"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus, Loader2, Pill } from "lucide-react"

function PrescriptionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams.get("patientId")
  const appointmentId = searchParams.get("appointmentId")
  const patientName = searchParams.get("name")

  const [diagnosis, setDiagnosis] = useState("")
  const [notes, setNotes] = useState("")
  
  // Default Medicine Row
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "1-0-1", duration: "5 Days", instruction: "After Food" }
  ])
  const [loading, setLoading] = useState(false)

  const handleAddMed = () => {
    setMedicines([...medicines, { name: "", dosage: "1-0-1", duration: "3 Days", instruction: "After Food" }])
  }

  const handleRemoveMed = (index: number) => {
    const newMeds = medicines.filter((_, i) => i !== index)
    setMedicines(newMeds)
  }

  const handleMedChange = (index: number, field: string, value: string) => {
    const newMeds = [...medicines]
    newMeds[index] = { ...newMeds[index], [field]: value }
    setMedicines(newMeds)
  }

  const handleSave = async () => {
    if (!diagnosis) return alert("Please enter a diagnosis")
    
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://127.0.0.1:3000/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          appointmentId,
          diagnosis,
          notes,
          medicines
        }),
      })

      if (res.ok) {
        alert("Prescription Saved Successfully!")
        router.push("/dashboard/appointments") 
      } else {
        const err = await res.json()
        console.error("Backend Error:", err)
        alert("Failed to save prescription")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!appointmentId) return <div className="p-10">Error: Missing Appointment Details</div>

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-blue-600" />
            Prescription for {patientName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          
          {/* Diagnosis Section */}
          <div className="space-y-2">
            <Label>Diagnosis</Label>
            <Input 
              placeholder="e.g. Acute Viral Fever" 
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Doctor's Notes / Advice</Label>
            <Textarea 
              placeholder="e.g. Drink plenty of warm water, rest for 2 days." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <hr />

          {/* Medicines Section */}
          <div>
            <Label className="mb-2 block text-lg font-semibold">Medicines</Label>
            <div className="grid grid-cols-12 gap-2 font-medium text-xs text-slate-500 mb-2 uppercase">
              <div className="col-span-4">Medicine Name</div>
              <div className="col-span-3">Dosage (M-A-N)</div>
              <div className="col-span-2">Duration</div>
              <div className="col-span-2">Instruction</div>
              <div className="col-span-1"></div>
            </div>

            {medicines.map((med, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
                <div className="col-span-4">
                  <Input placeholder="Paracetamol 500mg" value={med.name} onChange={(e) => handleMedChange(index, "name", e.target.value)} />
                </div>
                <div className="col-span-3">
                  <Input placeholder="1-0-1" value={med.dosage} onChange={(e) => handleMedChange(index, "dosage", e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Input placeholder="5 Days" value={med.duration} onChange={(e) => handleMedChange(index, "duration", e.target.value)} />
                </div>
                <div className="col-span-2">
                  <Input placeholder="After Food" value={med.instruction} onChange={(e) => handleMedChange(index, "instruction", e.target.value)} />
                </div>
                <div className="col-span-1 text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveMed(index)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" size="sm" onClick={handleAddMed} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Add Medicine
            </Button>
          </div>

        </CardContent>
        <CardFooter className="flex justify-end border-t p-6 bg-slate-50">
            <Button onClick={handleSave} disabled={loading} className="w-40">
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Save Prescription"}
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrescriptionForm />
    </Suspense>
  )
}
