"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

export default function BillingPage() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token")
      // Use the environment variable or fallback to localhost
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
      
      const res = await fetch(`${API_URL}/invoices`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setInvoices(data)
      }
    } catch (err) {
      console.error("Failed to load invoices", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Billing & Invoices</h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-600">Patient</th>
              <th className="p-4 font-semibold text-slate-600">Amount</th>
              <th className="p-4 font-semibold text-slate-600">Status</th>
              <th className="p-4 font-semibold text-slate-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr>
            ) : invoices.length === 0 ? (
              <tr><td colSpan={4} className="p-4 text-center text-slate-500">No invoices found</td></tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="p-4">{inv.patient?.fullName || "Guest"}</td>
                  <td className="p-4 font-bold">₹{inv.totalAmount}</td>
                  <td className="p-4">
                    {/* FIXED: Removed 'variant' and used 'className' directly */}
                    <Badge className={
                      inv.status === "PAID"
                        ? "bg-green-600 hover:bg-green-700 text-white border-transparent"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800 border-transparent"
                    }>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-500">
                    {new Date(inv.createdAt).toLocaleDateString()}
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
