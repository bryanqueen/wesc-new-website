'use client'

import { motion } from "framer-motion"
import { useState } from "react"
import {
    Users,
    Building2,
    ChevronRight
} from "lucide-react"
import Image from "next/image"
import CountryModal from "@/components/coveragepage/country-modal"


const markets = [
    {
        country: "Australia",
        headline: "World-class education in a multicultural environment",
        description: "Experience high-quality education while enjoying Australia's diverse culture, stunning landscapes, and excellent quality of life.",
        stats: {
            universities: 43,
            students: "500K+",
            ranking: "#4 globally",
            cities: 8
        },
        image: "/images/countries/Australia.jpg",
        highlights: [
            "Globally recognized qualifications",
            "Post-study work opportunities",
            "Multicultural environment",
            "High quality of life"
        ],
        popular_courses: [
            "Engineering",
            "Information Technology",
            "Business Management",
            "Health Sciences"
        ],
        living_costs: "AUD 21,000 - 30,000/year",
        work_rights: "Up to 40 hours bi-weekly during studies, full-time during breaks"
    },
    {
        country: "Canada",
        headline: "Quality education with pathway to permanent residency",
        description: "Canada offers world-class education combined with extensive post-graduation work opportunities and a clear path to permanent residency.",
        stats: {
            universities: 96,
            students: "640K+",
            ranking: "#3 globally",
            cities: 10
        },
        image: "/images/countries/Canada.jpg",
        highlights: [
            "Post-graduation work permit",
            "Path to permanent residency",
            "Safe environment",
            "Bilingual education options"
        ],
        popular_courses: [
            "Business Administration",
            "Computer Science",
            "Engineering",
            "Healthcare"
        ],
        living_costs: "CAD 15,000 - 25,000/year",
        work_rights: "Up to 20 hours/week during studies, full-time during breaks"
    },
    {
        country: "Cyprus",
        headline: "Mediterranean hub for international education",
        description: "Study in the heart of the Mediterranean with affordable education options and a rich cultural heritage.",
        stats: {
            universities: 15,
            students: "50K+",
            ranking: "Top 50 in EU",
            cities: 4
        },
        image: "/images/countries/Cyprus.jpg",
        highlights: [
            "Affordable education",
            "Mediterranean lifestyle",
            "English-taught programs",
            "Strategic location"
        ],
        popular_courses: [
            "Tourism Management",
            "Business Studies",
            "Maritime Studies",
            "Hotel Management"
        ],
        living_costs: "EUR 8,000 - 12,000/year",
        work_rights: "Up to 20 hours/week during term time"
    },
    {
        country: "France",
        headline: "Excellence in education with rich cultural heritage",
        description: "Combine top-tier education with immersion in French culture and art de vivre.",
        stats: {
            universities: 67,
            students: "370K+",
            ranking: "#5 in Europe",
            cities: 12
        },
        image: "/images/countries/France.jpg",
        highlights: [
            "Affordable public education",
            "Rich cultural experience",
            "Central European location",
            "Strong research focus"
        ],
        popular_courses: [
            "Arts and Design",
            "Engineering",
            "Business",
            "Culinary Arts"
        ],
        living_costs: "EUR 10,000 - 15,000/year",
        work_rights: "Up to 20 hours/week during studies"
    },
    {
        country: "Germany",
        headline: "Engineering excellence and innovation hub",
        description: "Access world-renowned technical education and research opportunities in Europe's largest economy.",
        stats: {
            universities: 400,
            students: "420K+",
            ranking: "#2 in Europe",
            cities: 15
        },
        image: "/images/countries/Germany.jpg",
        highlights: [
            "No/Low tuition fees",
            "Strong industry connections",
            "Research opportunities",
            "High employment rate"
        ],
        popular_courses: [
            "Engineering",
            "Automotive Technology",
            "Computer Science",
            "Environmental Studies"
        ],
        living_costs: "EUR 10,000 - 15,000/year",
        work_rights: "Up to 20 hours/week during semester"
    },
    {
        country: "Ireland",
        headline: "Friendly atmosphere with strong academic tradition",
        description: "Experience Ireland's renowned hospitality while studying at institutions known for innovation and research.",
        stats: {
            universities: 34,
            students: "250K+",
            ranking: "Top 20 globally",
            cities: 5
        },
        image: "/images/countries/Ireland.jpg",
        highlights: [
            "English-speaking country",
            "Strong tech industry presence",
            "Post-study work visa",
            "Rich cultural heritage"
        ],
        popular_courses: [
            "Data Science",
            "Business",
            "Technology",
            "Medicine"
        ],
        living_costs: "EUR 12,000 - 18,000/year",
        work_rights: "Up to 20 hours/week during term time, 40 hours during holidays"
    },
    {
        country: "Netherlands",
        headline: "Innovation-driven education in the heart of Europe",
        description: "Study in a country known for its innovative approach to education and high quality of life.",
        stats: {
            universities: 14,
            students: "120K+",
            ranking: "Top 15 globally",
            cities: 6
        },
        image: "/images/countries/Netherlands.jpg",
        highlights: [
            "English-taught programs",
            "Bicycle-friendly cities",
            "International environment",
            "Strong research facilities"
        ],
        popular_courses: [
            "Artificial Intelligence",
            "Water Management",
            "Sustainable Energy",
            "International Business"
        ],
        living_costs: "EUR 11,000 - 16,000/year",
        work_rights: "Up to 16 hours/week during term time, full-time during holidays"
    },
    {
        country: "New Zealand",
        headline: "Quality education in a stunning natural setting",
        description: "Combine world-class education with an unparalleled quality of life and beautiful landscapes.",
        stats: {
            universities: 8,
            students: "150K+",
            ranking: "Top 25 globally",
            cities: 5
        },
        image: "/images/countries/NZealand.jpg",
        highlights: [
            "Work while studying",
            "Post-study work rights",
            "Safe environment",
            "Outstanding natural beauty"
        ],
        popular_courses: [
            "Agriculture",
            "Environmental Science",
            "Tourism",
            "Film and Digital Media"
        ],
        living_costs: "NZD 20,000 - 25,000/year",
        work_rights: "Up to 20 hours/week during term time, full-time during holidays"
    },
    {
        country: "United Kingdom",
        headline: "Centuries of academic excellence and innovation",
        description: "Study at institutions with rich history and cutting-edge research in one of the world's most diverse countries.",
        stats: {
            universities: 130,
            students: "600K+",
            ranking: "#1 in Europe",
            cities: 20
        },
        image: "/images/countries/United-Kingdom.jpg",
        highlights: [
            "Prestigious institutions",
            "Graduate Immigration Route",
            "Multicultural environment",
            "Rich academic heritage"
        ],
        popular_courses: [
            "Business",
            "Law",
            "Engineering",
            "Arts and Design"
        ],
        living_costs: "GBP 12,000 - 20,000/year",
        work_rights: "Up to 20 hours/week during term time"
    },
    {
        country: "United States",
        headline: "Home to world's top-ranked universities",
        description: "Access cutting-edge research facilities and diverse academic programs in a country known for innovation.",
        stats: {
            universities: 4000,
            students: "1M+",
            ranking: "#1 globally",
            cities: 50
        },
        image: "/images/countries/United-States.jpg",
        highlights: [
            "World-class facilities",
            "Diverse campus life",
            "Research opportunities",
            "Optional Practical Training"
        ],
        popular_courses: [
            "Computer Science",
            "Business",
            "Engineering",
            "Life Sciences"
        ],
        living_costs: "USD 15,000 - 25,000/year",
        work_rights: "Up to 20 hours/week on-campus during term time"
    }
];

export default function MarketsPage() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null)


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <img
                    src="/images/coverage/walking students.jpeg"
                    alt="Global Education"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"  />
                <div className=" relative z-10 text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-white"
                    >
                        Global Education Coverage
                    </motion.h1>
                    <p className="text-xl max-w-2xl mx-auto text-white/90">
                        Your gateway to world-class education across 10 leading destinations
                    </p>
                </div>
            </section>

            {/* Markets Grid */}
            <section className="py-24">
                <div className="container px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {markets.map((market, index) => (
                            <motion.div
                                key={market.country}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedCountry(market.country)}
                                className="group cursor-pointer"
                            >
                                <div className="relative h-[400px] rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow">
                                    {/* Image Container */}
                                    <div className="relative h-48 overflow-hidden">
                                        <motion.div
                                            initial={{ scale: 1.2, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{
                                                duration: 0.8,
                                                delay: 0.2
                                            }}
                                            // viewport={{ once: true }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={market.image}
                                                width={400}
                                                height={400}
                                                alt={market.country}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-2xl font-bold">{market.country}</h3>
                                            <ChevronRight className="w-5 h-5 text-[--primary] transform group-hover:translate-x-1 transition-transform" />
                                        </div>

                                        <p className="text-[--muted] line-clamp-2">{market.headline}</p>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-[--primary]" />
                                                <span className="text-sm">{market.stats.universities} Universities</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-[--primary]" />
                                                <span className="text-sm">{market.stats.students} Students</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Country Modal */}
            {selectedCountry && (
                <CountryModal
                    market={markets.find(m => m.country === selectedCountry) || markets[0]}
                    onClose={() => setSelectedCountry(null)}
                />
            )}


            {/* Call to Action */}
            <section className="py-24 bg-[--primary]/5">
                <div className="container px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-[--muted] max-w-2xl mx-auto mb-8">
                        Let us help you choose the perfect destination for your educational journey.
                        Our experts are here to guide you every step of the way.
                    </p>
                    <button className="bg-[--primary] text-white px-8 py-3 rounded-full hover:bg-[--primary]/90 transition-colors">
                        Get Expert Guidance
                    </button>
                </div>
            </section>
        </div>
    )
}