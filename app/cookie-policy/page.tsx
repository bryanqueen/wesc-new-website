"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[--primary] pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-lg text-white/80">WESC Nigeria Limited</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12"
        >
          <p className="text-gray-600 mb-8">
            This Cookie Policy explains how{" "}
            <a href="https://wescng.com" className="text-[--primary] hover:underline">
              wescng.com
            </a>{" "}
            uses cookies and similar technologies.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-600">
              Cookies are small text files placed on your device to help websites function properly and improve user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cookies We Use</h2>
            <p className="text-gray-600 mb-4">We use:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><span className="font-medium">Essential Cookies</span> – required for basic site functionality</li>
              <li><span className="font-medium">Analytics Cookies</span> – provided by Google Analytics to understand site usage</li>
            </ul>
            <p className="text-gray-600 mt-4">We do not use cookies for advertising or profiling.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookie Consent</h2>
            <p className="text-gray-600">
              When you visit our website, you will be asked to accept or reject non-essential cookies. You can change your preferences at any time via browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Managing Cookies</h2>
            <p className="text-gray-600 mb-4">You may:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Accept or reject cookies via the cookie banner</li>
              <li>Disable cookies in your browser settings</li>
              <li>Delete cookies already stored on your device</li>
            </ul>
            <p className="text-gray-600 mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <span className="font-medium">Note:</span> Disabling cookies may affect website functionality.
            </p>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact</h2>
            <p className="text-gray-600 mb-3">For questions about our use of cookies, contact:</p>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@wescng.com" className="hover:text-[--primary]">
                info@wescng.com
              </a>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  )
}
