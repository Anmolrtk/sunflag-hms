import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Heart, Stethoscope, Clock, CheckCircle2 } from "lucide-react"

const jobs = [
  {
    role: "Senior Staff Nurse",
    dept: "ICU / Emergency",
    type: "Full Time",
    exp: "3-5 Years",
    location: "Rohtak"
  },
  {
    role: "Resident Medical Officer (RMO)",
    dept: "General Ward",
    type: "Rotational Shifts",
    exp: "1-2 Years",
    location: "Rohtak"
  },
  {
    role: "Front Desk Executive",
    dept: "Administration",
    type: "Full Time",
    exp: "Fresher / 1 Year",
    location: "Rohtak"
  },
  {
    role: "Pharmacist",
    dept: "Pharmacy",
    type: "Full Time",
    exp: "2 Years",
    location: "Rohtak"
  },
  {
    role: "Marketing Manager",
    dept: "Business Development",
    type: "Full Time",
    exp: "4-6 Years",
    location: "Rohtak"
  }
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <div className="bg-blue-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Join the Sunflag Family</h1>
        <p className="text-blue-100 max-w-2xl mx-auto px-4">
          Build a rewarding career where your work truly matters. We are looking for
          passionate individuals to help us deliver world-class healthcare.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">

        {/* 2. WHY WORK WITH US */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Compassionate Culture</h3>
                <p className="text-slate-500 text-sm">
                  We treat our staff like family so they can treat patients with care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Professional Growth</h3>
                <p className="text-slate-500 text-sm">
                  Continuous learning programs, workshops, and career advancement opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white">
              <CardContent className="pt-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Work-Life Balance</h3>
                <p className="text-slate-500 text-sm">
                  Structured shifts and leave policies to ensure a healthy lifestyle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
          
          {/* 3. CURRENT OPENINGS */}
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-8">Current Openings</h2>
                    <div className="grid gap-4">
                      {jobs.map((job) => (
                        <Card key={job.role} className="hover:shadow-lg transition-all border-l-4 border-l-blue-600">
                          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="bg-blue-50 p-3 rounded-lg hidden sm:block">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-slate-900">{job.role}</h3>
                                <div className="flex flex-wrap gap-2 md:gap-4 mt-1 text-sm text-slate-500">
                                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {job.dept}</span>
                                  <span className="hidden md:inline">•</span>
                                  <span>{job.type}</span>
                                  <span className="hidden md:inline">•</span>
                                  <span>Exp: {job.exp}</span>
                                </div>
                              </div>
                            </div>
                            
                            <Button className="bg-blue-600 hover:bg-blue-700 md:w-auto w-full">
                              Apply Now
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* 4. HR CONTACT */}
                  <div className="bg-slate-900 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Don't see a suitable role?</h3>
                    <p className="text-slate-300 mb-6">
                      Send your CV to our HR department and we will contact you when a position opens up.
                    </p>
                    <div className="inline-block bg-white/10 px-6 py-3 rounded-lg font-mono text-blue-200">
                      careers@sunflaghospital.com
                    </div>
                  </div>

                </div>
              </div>
            )
          }
