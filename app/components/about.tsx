'use client'

import { motion } from "framer-motion"

export function About() {
  return (
    <section className="py-32 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-8">Who We Are</h2>
            <p className="text-[--muted] text-lg leading-relaxed">
              <span className="font-semibold">WESC</span> is a pioneering force in international education consulting, 
              leveraging over 12 years of expertise to transform academic aspirations 
              into reality. Our technology-driven approach and deep industry insights 
              enable us to provide unparalleled guidance to students, institutions, 
              and education partners worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pt-32"
          >
            <div className="space-y-12">
              {[
                {
                  number: "2500+",
                  label: "Colleges and Universities",
                },
                {
                  number: "12+",
                  label: "Countries & Europe",
                },
                {
                  number: "1567+",
                  label: "Clients",
                },
              ].map((stat, index) => (
                <div key={index} className="border-t border-black/10 pt-6">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-[--muted]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

