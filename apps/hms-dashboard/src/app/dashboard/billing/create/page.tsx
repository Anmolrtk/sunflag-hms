"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, Loader2 } from "lucide-react"

function InvoiceForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientId = searchParams.get("patientId")
  const appointmentId = searchParams.get("appointmentId")
  const patientName = searchParams.get("name")

  // Default Item: Consultation Fee
  const [items, setItems] = useState([
    { description: "Consultation Fee", amount: 500, quantity: 1 }
  ])
  const [loading, setLoading] = useState(false)

  // Calculate Grand Total
  const totalAmount = items.reduce((sum, item) => sum + (item.amount * item.quantity), 0)

  const handleAddItem = () => {
    setItems([...items, { description: "", amount: 0, quantity: 1 }])
  }

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://127.0.0.1:3000/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          patientId,
          appointmentId,
          items
        }),
      })
        
        const result = await res.json()
        
      if (res.ok) {
        alert("Invoice Generated Successfully!")
        router.push("/dashboard/billing") // We will create this list next
      } else {
          console.error("Backend Error:", result)
                  alert(`Failed: ${result.message || JSON.stringify(result)}`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!patientId) return <div className="p-10">Error: Missing Patient Details</div>

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Generate Invoice</CardTitle>
          <p className="text-sm text-muted-foreground">Biling for: <span className="font-bold text-black">{patientName}</span></p>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Line Items Header */}
          <div className="grid grid-cols-12 gap-2 font-medium text-sm text-slate-500 mb-2">
            <div className="col-span-6">Description</div>
            <div className="col-span-2">Qty</div>
            <div className="col-span-3">Price (₹)</div>
            <div className="col-span-1"></div>
          </div>

          {/* Dynamic Rows */}
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-6">
                <Input 
                  placeholder="Service Name" 
                  value={item.description}
                  onChange={(e) => handleItemChange(index, "description", e.target.value)}
                />
              </div>
              <div className="col-span-2">
                                       <Input
                                         type="number"
                                         // Fix: If quantity is NaN (empty), use "" so the field looks empty
                                         value={item.quantity || ""}
                                         onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                                       />
              </div>
              <div className="col-span-3">
                                       <Input
                                         type="number"
                                         // Fix: If amount is NaN, use ""
                                         value={item.amount || ""}
                                         onChange={(e) => handleItemChange(index, "amount", parseFloat(e.target.value) || 0)}
                                       />
              </div>
              <div className="col-span-1 text-center">
                <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" onClick={handleAddItem} className="mt-2">
            <Plus className="h-4 w-4 mr-2" /> Add Item
          </Button>

        </CardContent>
        <CardFooter className="flex justify-between items-center border-t p-6 bg-slate-50">
            <div className="text-lg font-bold">Total: ₹{totalAmount}</div>
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Generate Invoice"}
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvoiceForm />
    </Suspense>
  )
}
