'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="bg-[--primary] py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Subscribe to our newsletter
          </h2>
          <form className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white"
            />
            <Button
              type="submit"
              className="bg-[--secondary] hover:bg-[--secondary]/90 text-white"
            >
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

