"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Stethoscope, User, Shield, Briefcase, RefreshCw, Trash2 } from "lucide-react"
import Link from "next/link"

export default function StaffPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("ALL")
  const [searchTerm, setSearchTerm] = useState("")
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 1. Fetch Staff List
  const fetchStaff = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) { router.push("/login"); return; }

      const res = await fetch("http://localhost:3001/users", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      
      if (Array.isArray(data)) setStaff(data)
      else setStaff([])

    } catch (error) {
      console.error("Failed to load staff", error)
    } finally {
      setLoading(false)
    }
  }

  // 2. Delete Staff Function
    const deleteStaff = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to remove ${name}? This cannot be undone.`)) return

        try {
          const token = localStorage.getItem("token")
          
          // Ensure we are sending the ID correctly
          const res = await fetch(`http://localhost:3001/users/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
          })

          if (res.ok) {
            alert(`${name} has been removed.`)
            fetchStaff() // Refresh list
          } else {
            // Log the error to see what happened
            console.error("Delete failed status:", res.status)
            alert("Failed to delete. Check backend terminal for details.")
          }
        } catch (error) {
          console.error("Delete error:", error)
        }
      }

  useEffect(() => { fetchStaff() }, [])

  // Filter Logic
  const filteredStaff = Array.isArray(staff) ? staff.filter((person: any) => {
    const matchesTab = activeTab === "ALL" || person.role === activeTab
    const matchesSearch = person.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  }) : []

  const getRoleBadge = (role: string) => {
    switch(role) {
      case "DOCTOR": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Doctor</Badge>
      case "NURSE": return <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">Nurse</Badge>
      case "ADMIN": return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Admin</Badge>
      default: return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200">{role}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-bold tracking-tight text-slate-800">Staff Directory</h2>
           <p className="text-slate-500">Manage doctors, nurses, and support staff.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchStaff} title="Refresh List">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Link href="/dashboard/staff/add">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add New Staff
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 bg-slate-100 p-1 rounded-lg overflow-x-auto">
             {["ALL", "DOCTOR", "NURSE", "ADMIN"].map(tab => (
               <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${activeTab === tab ? "bg-white text-blue-600 shadow" : "text-slate-500"}`}>{tab === "ALL" ? "All Staff" : tab.replace("_", " ")}</button>
             ))}
          </div>
          <Input placeholder="Search by name..." className="w-full sm:w-72" onChange={(e) => setSearchTerm(e.target.value)} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && <p className="text-slate-500 col-span-full text-center py-10">Loading...</p>}
        {!loading && filteredStaff.length === 0 && <p className="text-slate-500 col-span-full text-center py-10">No staff found.</p>}

        {filteredStaff.map((person: any) => (
          <Card key={person.id} className="hover:shadow-md transition-shadow group relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                
                {/* PHOTO LOGIC: Show Image if exists, else Show Icon */}
                {person.image ? (
                  <img
                    src={person.image}
                    alt={person.fullName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0 shadow-sm
                    ${person.role === 'DOCTOR' ? 'bg-blue-100 text-blue-600' : 
                      person.role === 'NURSE' ? 'bg-pink-100 text-pink-600' : 'bg-slate-100 text-slate-600'}`}>
                    {person.role === 'DOCTOR' ? <Stethoscope size={24} /> : <User size={24} />}
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="font-bold text-lg text-slate-900 truncate">{person.fullName}</h3>
                  {getRoleBadge(person.role)}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-slate-500 flex items-center gap-2">
                   <Briefcase className="h-3 w-3" /> {person.doctorProfile?.department || person.department || "General Staff"}
                </p>
                <p className="text-sm text-slate-400 truncate">{person.email}</p>
              </div>

              {/* ACTION BUTTONS */}
                                             <div className="mt-5 grid grid-cols-2 gap-3">
                                             <Link href={`/dashboard/staff/${person.id}`} className="w-full">
                                                <Button variant="outline" size="sm" className="w-full text-xs font-medium">
                                                   Profile
                                                </Button>
                                             </Link>
                                                              
                                                              <Button
                                                                 variant="outline"
                                                                 size="sm"
                                                                 className="w-full text-xs font-medium text-red-600 hover:bg-red-50 border-red-200 flex items-center justify-center gap-2"
                                                                 onClick={() => deleteStaff(String(person.id), person.fullName)}
                                                              >
                                                                 <Trash2 className="w-3.5 h-3.5" />
                                                                 <span>Remove</span>
                                                              </Button>
                                                           </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
