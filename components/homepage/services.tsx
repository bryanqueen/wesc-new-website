'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const services = [
  {
    title: "Free Education Counselling",
    description: "We provide you with free advisory services on what option is best for you for your traveling dream.",
    link: "/services",
    image: "/images/services/counselling.jpg" // You'll need to add these images
  },
  {
    title: "Education Support Services",
    description: "Achieve your dream school easily with us; we simplify the challenging documentation process.",
    link: "/services",
    image: "/images/services/support.jpeg"
  },
  {
    title: "VISA Assistant (Student, Work and Visitor)",
    description: "Our certified visa advisors will assist you in applying for your visa.",
    link: "/services",
    image: "/images/services/visa.jpeg"
  },
  {
    title: "English Proficiency Classes",
    description: <>Pass4sure Concept offers top-notch support for international exams. Visit <a className="text-[--primary]" href='https://www.pass4sureconcept.com' target='_blank'>www.pass4sureconcept.com</a> for details.</>,
    link: "https://www.pass4sureconcept.com",
    image: "/images/services/english-class.jpeg"
  }
]

export function Services() {
  return (
    <section className="py-32 px-6 bg-[#FDF8F6]">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-16"
        >
          Some of our services
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link 
                href={service.link} 
                className="group block overflow-hidden rounded-2xl bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 group-hover:opacity-0" />
                </div>
                
                <div className="p-8 bg-white transition-colors group-hover:bg-black/5">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[--primary] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[--muted] mb-6">
                    {service.description}
                  </p>
                  <div className="flex items-center text-sm font-medium">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}