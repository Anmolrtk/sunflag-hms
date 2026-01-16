import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-slate-300">We are here to help you 24/7.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Contact Cards */}
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <MapPin className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Our Location</h3>
                  <p className="text-slate-600 text-sm">
                    Sunflag Global Hospital<br/>
                    Opp. Hotel Rivoli, Sheela Bypass<br/>
                    Rohtak, Haryana 124001
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Phone className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Emergency</h3>
                  <p className="text-slate-600 text-sm">+91 9254308880</p>
                  <p className="text-slate-600 text-sm"></p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Mail className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-slate-600 text-sm">info@sunflagglobalhospital.com</p>
                  <p className="text-slate-600 text-sm">helpdesk@sunflagglobalhospital.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Clock className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Opening Hours</h3>
                  <p className="text-slate-600 text-sm">Emergency: 24/7</p>
                  <p className="text-slate-600 text-sm">OPD: Mon-Sat (9am - 6pm)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* REAL GOOGLE MAP */}
          <div className="md:col-span-2 bg-slate-200 rounded-xl overflow-hidden shadow-lg h-[400px] md:h-auto relative">
             <iframe
               width="100%"
               height="100%"
               style={{ border: 0, minHeight: '400px' }}
               loading="lazy"
               allowFullScreen
               src="https://maps.google.com/maps?q=Sunflag%20Global%20Hospital%20Rohtak&t=&z=15&ie=UTF8&iwloc=&output=embed"
             >
             </iframe>
          </div>

        </div>
      </div>
    </div>
  )
}
