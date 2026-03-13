import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Globe, HeartHandshake } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us & Location | Sunflag Global Hospital",
  description: "Get in touch with Sunflag Global Hospital Rohtak. View our address, 24/7 emergency helpline number, contact details, and location map.",
  keywords: "Sunflag Hospital Contact Number, Hospital Address Rohtak, Emergency Number Haryana, Hospital Directions",
  openGraph: {
    title: "Get in Touch | Sunflag Global Hospital",
    description: "We are here to help you 24/7. Find our emergency hotline, email, and location.",
    url: "https://sunflagglobalhospital.com/contact",
    siteName: "Sunflag Global Hospital",
    locale: "en_IN",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative bg-blue-900 text-white py-20 text-center overflow-hidden">
        {/* Contact Background Animations */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <Phone className="absolute top-10 left-[15%] w-24 h-24 text-blue-300 animate-[bounce_5s_ease-in-out_infinite]" />
          <MessageCircle className="absolute bottom-6 left-[25%] w-16 h-16 text-green-300 animate-[pulse_4s_ease-in-out_infinite]" />
          <Send className="absolute top-1/2 right-[15%] w-20 h-20 text-indigo-300 animate-[bounce_6s_ease-in-out_infinite]" />
          <Globe className="absolute bottom-10 right-[30%] w-28 h-28 text-cyan-300 animate-[pulse_3s_ease-in-out_infinite]" />
          <HeartHandshake className="absolute top-8 left-[40%] w-12 h-12 text-pink-300 animate-[ping_8s_ease-in-out_infinite]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-md">Get in Touch</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg drop-shadow">We are here to help you 24/7.</p>
        </div>
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
                  <p className="text-black text-sm">
                    Sunflag Global Hospital<br />
                    Opp. Hotel Rivoli, Sheela Bypass<br />
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
                  <p className="text-black text-sm">+91 9254308880</p>
                  <p className="text-black text-sm"></p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Mail className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-black text-sm">info@sunflagglobalhospital.com</p>
                  <p className="text-black text-sm">helpdesk@sunflagglobalhospital.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-4 p-6">
                <Clock className="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Opening Hours</h3>
                  <p className="text-black text-sm">Emergency: 24/7</p>
                  <p className="text-black text-sm">OPD: Mon-Sat (9am - 6pm)</p>
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
      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sunflag Global Hospital Rohtak</h2>
          <p className="mb-6">Providing care, hope, and excellence since 2014.</p>
          <div className="text-sm text-white">
            © 2026 Sunflag Hospital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
