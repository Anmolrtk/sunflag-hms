"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Activity, DollarSign, TrendingUp, UserPlus } from "lucide-react"

export function DashboardOverview() {
  // Mock Data (Later we connect this to your backend)
  const stats = [
    {
      title: "Total Patients",
      value: "1,284",
      change: "+12% from last month",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Appointments Today",
      value: "42",
      change: "+4 pending confirmation",
      icon: Calendar,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      title: "Active Doctors",
      value: "18",
      change: "2 on leave today",
      icon: Activity,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      title: "Total Revenue",
      value: "₹ 8.4L",
      change: "+8% from last month",
      icon: DollarSign,
      color: "text-yellow-600",
      bg: "bg-yellow-100"
    }
  ]

  const recentPatients = [
    { name: "Rahul Sharma", age: 34, issue: "Viral Fever", status: "Admitted", time: "10:30 AM" },
    { name: "Priya Verma", age: 28, issue: "Pregnancy Checkup", status: "OPD", time: "11:15 AM" },
    { name: "Amit Kumar", age: 45, issue: "Fracture", status: "Emergency", time: "12:00 PM" },
    { name: "Sneha Gupta", age: 52, issue: "Diabetes Control", status: "OPD", time: "01:45 PM" },
  ]

  return (
    <div className="space-y-6">
      {/* 1. TOP STATS CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. RECENT ACTIVITY SECTION */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Recent Patients Table */}
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{patient.name}</p>
                      <p className="text-xs text-slate-500">{patient.issue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full 
                      ${patient.status === 'Emergency' ? 'bg-red-100 text-red-600' : 
                        patient.status === 'Admitted' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      {patient.status}
                    </span>
                    <p className="text-xs text-slate-400 mt-1">{patient.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Panel */}
        <Card className="col-span-3 shadow-sm bg-blue-50 border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full bg-white p-3 rounded-lg shadow-sm text-left flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-all group">
              <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-white" />
              <span className="font-medium text-sm">Register New Patient</span>
            </button>
            <button className="w-full bg-white p-3 rounded-lg shadow-sm text-left flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-all group">
              <Calendar className="h-5 w-5 text-blue-500 group-hover:text-white" />
              <span className="font-medium text-sm">Book Appointment</span>
            </button>
            <button className="w-full bg-white p-3 rounded-lg shadow-sm text-left flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-all group">
              <TrendingUp className="h-5 w-5 text-blue-500 group-hover:text-white" />
              <span className="font-medium text-sm">Generate Report</span>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
