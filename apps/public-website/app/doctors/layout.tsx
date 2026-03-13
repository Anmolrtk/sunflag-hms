import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Our Doctors & Specialists | Sunflag Global Hospital",
    description: "Meet our expert team of doctors and specialists at Sunflag Global Hospital. Find the right medical professional for your healthcare needs in Rohtak.",
    keywords: "Best Doctors in Rohtak, Find a Doctor, Hospital Specialists, Medical Professionals, Cardiologist, Orthopaedic Surgeon, Neurologist",
    openGraph: {
        title: "Meet Our Specialists | Sunflag Global Hospital",
        description: "Expert care from our dedicated team of top-tier medical professionals.",
        url: "https://sunflagglobalhospital.com/doctors",
        siteName: "Sunflag Global Hospital",
        locale: "en_IN",
        type: "profile",
    },
}

export default function DoctorsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
