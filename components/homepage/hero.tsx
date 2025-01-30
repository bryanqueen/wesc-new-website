'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import HeroCtaGroup from "./hero-cta-group"

export function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://crmpiperun.com/wp-content/uploads/2023/08/atendimento-ativo-e-receptivo-1024x754.jpg"
          alt="Students studying"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center px-6">
        <div className="container mx-auto flex justify-center items-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center lg:mt-20"
          >
            <h1 className="hero-text text-white">
              Inspiring{" "}
              <span className="text-[--accent]">Your</span> Travel{" "}
              <span className="relative inline-block">
                Dream
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-full bg-[--accent]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                />
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl mx-auto"
            >
              Leading technology driven education service provider and Overseas Education Consultant
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              // className="mt-8"
            >
              {/* <Link
                href="#contact"
                className="inline-flex items-center rounded-full bg-white px-8 py-4 text-sm font-medium text-[--primary] transition-all hover:bg-[--accent]"
              >
                Checkout our Programmes
                <ArrowRight className="ml-4 h-5 w-5" />
              </Link> */}
              <HeroCtaGroup/>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

