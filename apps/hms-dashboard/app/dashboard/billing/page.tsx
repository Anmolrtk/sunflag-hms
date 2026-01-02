"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Printer, Plus } from "lucide-react"

export default function BillingPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://127.0.0.1:3000/invoices", {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setInvoices(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Invoices</h1>
        {/* Shortcut to create a generic bill without an appointment */}
        {/* Note: This requires a patient ID, so we usually hide it or link to patient list */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Invoice #</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Patient</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Date</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Amount</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {loading ? (
                  <tr><td colSpan={6} className="p-4 text-center">Loading...</td></tr>
                ) : invoices.length === 0 ? (
                  <tr><td colSpan={6} className="p-4 text-center text-slate-500">No invoices generated yet.</td></tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="border-b transition-colors hover:bg-slate-50">
                      <td className="p-4 font-mono font-medium">{inv.invoiceNumber}</td>
                      <td className="p-4">{inv.patient.fullName}</td>
                      <td className="p-4 text-slate-500">{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 font-bold">₹{inv.totalAmount}</td>
                      <td className="p-4">
                        <Badge variant={inv.status === "PAID" ? "default" : "secondary"}>
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" onClick={() => alert("Print Feature Coming Soon!")}>
                          <Printer className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
