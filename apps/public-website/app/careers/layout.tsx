import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Careers & Jobs | Sunflag Global Hospital",
    description: "Join the dedicated healthcare team at Sunflag Global Hospital. Explore open medical, nursing, and administrative positions to build a rewarding career in Rohtak.",
    keywords: "Hospital Jobs Rohtak, Nursing Vacancies, Medical Careers, Hospital Administration Jobs, Hiring Doctors Rohtak",
    openGraph: {
        title: "Join Our Team | Sunflag Global Hospital Careers",
        description: "Build your career with us. We are always looking for passionate individuals to join our mission of saving lives.",
        url: "https://sunflagglobalhospital.com/careers",
        siteName: "Sunflag Global Hospital",
        locale: "en_IN",
        type: "website",
    },
}

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
