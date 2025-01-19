'use client'

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { usePathname } from "next/navigation"

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const preOfferServices = [
    {
        title: "Free Education Counselling",
        description: "We provide you with free advisory services on what option is best for you for your traveling dream.",
        image: "/images/services/counselling.jpg"
    },
    {
        title: "Course Selection",
        description: "We provide you with arrays of courses in your chosen field.",
        image: "/images/services/Course.jpg"
    },
    {
        title: "University Selection",
        description: "We provide you with professional advice on school that matches your expectations and budget.",
        image: "/images/services/University.jfif"
    },
    {
        title: "Application Support",
        description: "We assist you with filling in all the documents you need to apply to choice college or university. All we need from you is to supply us with all required documents pertaining to you chosen destination and we will take up from there!",
        image: "/images/services/Application.jpeg"
    },
    {
        title: "Education Support Services",
        description: "Your journey to your dream school is simply not an easy ride as it requires a lot of documentations which sometimes can serve as bottlenecks to many. With us, there is simply no cause for concern.",
        image: "/images/services/support.jpeg"
    },
    {
        title: "Scholarship Assistance",
        description: "We assist you to secure scholarships and grants based on your eligibility and qualifications.",
        image: "/images/services/Scholarship.jfif"
    },
    {
        title: "English Proficiency Classes",
        description: <>Our parent company Pass4sure Concept, provides you with touch-notched and result-oriented educational support services in all international exams. Visit <a href='https://www.pass4sureconcept.com' className='text-[--primary] hover:text-[--accent] transition-colors'>www.pass4sureconcept.com</a> for more details.</>,
        image: "/images/services/english-class.jpeg"
    }
]

const postOfferServices = [
    {
        title: "VISA Assistance",
        description: "Our certified visa advisors will assist you in applying for your student, work, or visitor visa.",
        image: "/images/services/visa.jpeg"
    },
    {
        title: "Study Abroad Loans",
        description: "We assist high-flying students with financial constraints to secure fully-funded student loans for US and Canada programs. (Terms and conditions apply)",
        image: "/images/services/loans.jpg"
    },
    {
        title: "Flight Booking",
        description: "We help to book flights with the most competitive fares.",
        image: "/images/services/flight.jpg"
    },
    {
        title: "Accommodation Services",
        description: "We assist you with finding a home in your preferred location for the duration of your studies.",
        image: "/images/services/accomodation.jpg"
    }
]

// Container animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

// Card animation variants
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.645, 0.045, 0.355, 1.000]
        }
    }
}

interface ServiceCardProps {
    title: string;
    description: string | React.ReactNode;
    image: string;
}

const ServiceCard = ({ title, description, image }: ServiceCardProps) => (
    <motion.div
        className="service-card group relative overflow-hidden rounded-2xl bg-white shadow-lg"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
    >
        <div className="relative h-64 overflow-hidden">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60" />
        </div>
        <div className="relative p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[--primary] transition-colors">
                {title}
            </h3>
            <p className="text-gray-600">
                {description}
            </p>
        </div>
    </motion.div>
)

export default function ServicesPage() {
    const headerRef = useRef(null)
    const pathname = usePathname()

    useEffect(() => {
        // Header animation
        gsap.fromTo(headerRef.current,
            {
                y: 100,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power4.out"
            }
        )
    }, [pathname])

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/services/Services2 bg.jfif"
                    alt="Services Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div ref={headerRef} className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Our Services</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Comprehensive support for your educational journey abroad, from counseling to settlement
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-24">
                {/* Pre-Offer Services */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="mb-24"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Pre-Offer Services</h2>
                    <p className="text-gray-600 mb-12 max-w-3xl">
                        Comprehensive support services to help you prepare and apply for your educational journey abroad.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {preOfferServices.map((service, index) => (
                            <ServiceCard key={service.title} {...service} />
                        ))}
                    </div>
                </motion.div>

                {/* Post-Offer Services */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Post-Offer Services</h2>
                    <p className="text-gray-600 mb-12 max-w-3xl">
                        Continued support services to ensure a smooth transition to your new academic environment.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {postOfferServices.map((service, index) => (
                            <ServiceCard key={service.title} {...service} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    )
}