"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

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
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="animate-pulse text-4xl text-gray-500">
                Loading...
            </div>
        </div> // or a loading spinner
    }

    return (
        <main className="min-h-screen bg-[#FFF5F2]">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
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
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Take the first step towards your educational journey abroad
                    </p>
                </motion.div>
            </section>

            {/* Google Form Section */}
            <section className="container mx-auto py-20 px-4">
                <motion.div
                    className="aspect-w-16 aspect-h-9"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLScuYgrKK4rC46JKBAt77BeCwVXcD4AMSBshV3UFSiQnQBh6IA/viewform?pli=1?embedded=true"
                        className="w-full h-[90vh] min-h-screen"
                        style={{ border: 0 }}
                    >
                        Loading…
                    </iframe>
                </motion.div>
            </section>
        </main>
    )
}

