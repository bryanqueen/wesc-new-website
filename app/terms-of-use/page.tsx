"use client"

import { motion } from "framer-motion"
import { Mail, MapPin } from "lucide-react"

export default function TermsOfUsePage() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Terms of Use</h1>
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
            By accessing{" "}
            <a href="https://wescng.com" className="text-[--primary] hover:underline">
              wescng.com
            </a>
            , you agree to the following terms.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Use of Website</h2>
            <p className="text-gray-600">
              This website is intended to provide information about WESC Nigeria Limited&apos;s education and study-abroad services. You agree to use the site lawfully and responsibly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property</h2>
            <p className="text-gray-600">
              All content on this website (text, logos, graphics, and materials) is the property of WESC Nigeria Limited and may not be copied or reproduced without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Submissions</h2>
            <p className="text-gray-600">
              Any information you submit via forms or comments must be accurate and lawful. We reserve the right to remove inappropriate or misleading content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">WESC Nigeria Limited shall not be liable for:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Inaccuracies on the website</li>
              <li>Temporary unavailability of the site</li>
              <li>Decisions made based on website information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. External Links</h2>
            <p className="text-gray-600">
              Our website may contain links to third-party websites. We are not responsible for their content or privacy practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Changes to These Terms</h2>
            <p className="text-gray-600">
              We may update these terms at any time. Continued use of the website indicates acceptance of updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Governing Law</h2>
            <p className="text-gray-600">These terms are governed by the laws of Nigeria.</p>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@wescng.com" className="hover:text-[--primary]">
                  info@wescng.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>6, Greenwood Park Estate, Ibeju-Lekki, Lagos, Nigeria</span>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  )
}
