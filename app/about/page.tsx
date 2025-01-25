"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, Check } from "lucide-react"
import Link from "next/link"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const imageRevealVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

const TeamMemberCard = ({ name, position, image }: any) => (
  <motion.div
    className="flex flex-col items-center group"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="relative w-40 h-40 md:w-48 md:h-48 mb-4 overflow-hidden rounded-xl">
      <Image
        src={image || "/placeholder.svg"}
        alt={name}
        fill
        sizes="(max-width: 768px) 160px, 192px"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <h3 className="text-base md:text-lg font-semibold text-gray-900 text-center">{name}</h3>
    <p className="text-sm md:text-base text-gray-600 text-center">{position}</p>
  </motion.div>
)

const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.8 },
      }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  const missionRef = useRef(null)
  const teamRef = useRef(null)
  const missionControls = useAnimation()
  const teamControls = useAnimation()

  const missionInView = useInView(missionRef, { once: true, amount: 0.2 })
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (missionInView) {
      missionControls.start("visible")
    }
    if (teamInView) {
      teamControls.start("visible")
    }
  }, [missionInView, teamInView, missionControls, teamControls])

  const Missions = [
    "We advance best practices in enrollment management through independent consulting and staffing services.",
    "We believe that qualitative higher education is the game changer for economic development and sustainability.",
    "Our approaches are rooted in sustainable mission fulfillment, evidence-based decision making, and goal-oriented results.",
  ]

  const Teams = [
    { name: "Olawale Okupe", position: "CEO", image: "/images/about/Teams/Olawale.png" },
    { name: "Ese Sona", position: "Chief Admission Officer", image: "/images/about/Teams/Ese.jpg" },
    { name: "Victoria Aduragbemi", position: "Recruitment Officer", image: "/images/about/Teams/Victoria.jpg" },
    { name: "Jesupelumi Ogunmola", position: "Customer Experience Officer", image: "/images/about/Teams/Jesupelumi.jpg" },
    { name: "Deborah Okoro Nkeonye", position: "Customer Relations Officer", image: "/images/about/Teams/Deborah.jpg" },
    { name: "Ajiboye Gloria", position: "Persuasive Sales Officer", image: "/images/about/Teams/Ajiboye.jpg" },
    { name: "Joseph Imhanbor", position: "Social Media Manager", image: "/images/about/Teams/Joseph.jpeg" },
    { name: "Daniel Umeh", position: "Software Engineer", image: "/images/about/Teams/Daniel.jpg" },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image src="/images/about/About-hero.jpg" alt="WESC About Us" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">About WESC</h1>
          <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto">
            Inspiring your travel and educational dreams with comprehensive global support
          </p>
        </motion.div>
      </section>

      {/* About Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Mission Section */}
        <motion.section
          ref={missionRef}
          initial="hidden"
          animate={missionControls}
          variants={sectionVariants}
          className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16"
        >
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <ul className="space-y-4">
              {Missions.map((mission, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-[--primary] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-600 flex-1">{mission}</p>
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            className="order-1 md:order-2 relative w-full aspect-video md:aspect-[4/3] lg:aspect-[16/9]"
            variants={imageRevealVariants}
          >
            <Image
              src="/images/about/mission-image.jpg"
              alt="WESC Mission"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-xl shadow-lg object-cover"
            />
          </motion.div>
        </motion.section>

        {/* Vision Section */}
        <FadeInWhenVisible>
          <section className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              To help millions of students across the world to have access to qualitative education for global relevance
              and competitiveness.
            </p>
          </section>
        </FadeInWhenVisible>

        {/* Why Choose WESC Section */}
        <FadeInWhenVisible>
          <section className="mb-16 bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose WESC?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">
                  As the world's leading premium international student recruitment organisation, we make every moment of
                  your journey with us worthwhile. Our strong international links and partnerships allow us to make
                  seamless what seems to be difficult for others to achieve within a short possible time with
                  cutting-edge technology and excellent workforce.
                </p>
                <p className="text-gray-600">
                  We inspire our students to achieve more than they ever thought possible with our in-depth knowledge
                  and expertise of international student recruitment and unmatched understanding of the various levels
                  of international student support.
                </p>
              </div>
              <motion.div
                className="relative w-full aspect-square sm:aspect-video md:aspect-square"
                variants={imageRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Image
                  src="/images/about/About-hero.jpg"
                  alt="Why Choose WESC"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-xl object-cover"
                />
              </motion.div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Commitment to Excellence Section */}
        <FadeInWhenVisible>
          <section className="mb-16 bg-[--primary] text-white rounded-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to Excellence</h2>
            <p className="text-lg mb-4">
              At WESC, we recognize that the work we do directly or indirectly affects or influences others. Therefore,
              we are committed to giving you an experience that is rare to find in the industry we represent as a key
              stakeholder.
            </p>
            <p className="text-lg">
              We regularly examine our partnerships to ensure that we have a positive impact on the communities we
              serve. As we work with our clients to help them reach their goals, we prioritize creating and fostering
              inclusive and safe educational opportunities for all.
            </p>
          </section>
        </FadeInWhenVisible>

        {/* Team Section */}
        <motion.section ref={teamRef} initial="hidden" animate={teamControls} variants={sectionVariants}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who drive our mission of inspiring educational dreams
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {Teams.map((member, idx) => (
              <TeamMemberCard key={idx} {...member} />
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-16 bg-[--primary] text-white rounded-xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Start Your Educational Journey?</h3>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-[--primary] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-gray-100 transition-colors"
          >
            Book a Consultation
            <ArrowUpRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Link>
        </motion.div>
      </div>
    </main>
  )
}

