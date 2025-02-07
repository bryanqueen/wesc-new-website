"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import EligibilityApplicationForm from "@/components/apply-for-eligibility-page/page"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

const headerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
}

export default function ApplyForEligibility() {
    const [formData, setFormData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFormOpen, setIsFormOpen] = useState(false)

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const response = await fetch('/api/proxy-eligibility-form')
                if (!response.ok) {
                    throw new Error("Failed to fetch form data")
                }
                const data = await response.json()
                setFormData(data)
            } catch (error) {
                console.error("Error fetching form data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchFormData()
    }, [])

    const handleFormClose = () => {
        setIsFormOpen(false)
    }

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="animate-pulse text-4xl text-gray-500">
                Loading...
            </div>
        </div> // or a loading spinner
    }
    if (!formData) {
        return <div className="flex justify-center items-center text-gray-500 text-4xl min-h-screen">There is currently no form present. Please check again later</div>
    }

    return (
        <main className="min-h-screen bg-[#FFF5F2]">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/application/eligibility-hero.jpg"
                    alt="Apply for Eligibility Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <motion.div
                    className="relative z-10 text-center px-6"
                    initial="hidden"
                    animate="visible"
                    variants={headerVariants}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Apply for Eligibility</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
                        Take the first step towards your educational journey abroad
                    </p>
                    <Button
                        onClick={() => setIsFormOpen(true)}
                        className="inline-flex items-center bg-white text-[--primary] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Open Eligibility form
                        <ArrowUpRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                </motion.div>
            </section>

            {/* Google Form Section */}
            {/* <section className="container mx-auto py-10"> */}
            {/* <motion.div
                    className="aspect-w-16 aspect-h-9"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLScuYgrKK4rC46JKBAt77BeCwVXcD4AMSBshV3UFSiQnQBh6IA/viewform?pli=1?embedded=false"
                        className="w-full h-[90vh] min-h-screen"
                        style={{ border: 0 }}
                    >
                        Loading…
                    </iframe>
                </motion.div> */}
            {isFormOpen && (
                <EligibilityApplicationForm form={formData} onClose={handleFormClose} />
            )}
            {/* </section> */}
        </main>
    )
}

