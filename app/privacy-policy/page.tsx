"use client"

import { motion } from "framer-motion"
import { Mail, MapPin } from "lucide-react"

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Privacy Policy</h1>
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
            WESC Nigeria Limited (&quot;WESC&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website{" "}
            <a href="https://wescng.com" className="text-[--primary] hover:underline">
              https://wescng.com
            </a>
            . This Privacy Policy explains how we collect, use, disclose, and protect personal information provided by users of our website.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We may collect the following personal information when you interact with our website:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Any information submitted through contact forms or comments</li>
            </ul>
            <p className="text-gray-600 mt-4">We do not knowingly collect sensitive personal data.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use collected information to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Respond to enquiries and messages</li>
              <li>Communicate with prospective students or partners</li>
              <li>Improve website performance and user experience</li>
              <li>Monitor and analyze website usage via Google Analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Legal Basis for Processing</h2>
            <p className="text-gray-600 mb-4">We process personal data based on:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>User consent</li>
              <li>Legitimate business interest</li>
              <li>Compliance with legal obligations under the Data Protection Act 2018</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Analytics</h2>
            <p className="text-gray-600">
              We use Google Analytics to understand how visitors use our website. This data is anonymized and used strictly for analytical purposes. Users can control or disable cookies through browser settings or our cookie consent banner.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing</h2>
            <p className="text-gray-600 mb-4">We do not sell or rent personal data. Data may be shared only with:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Website hosting providers (Namecheap)</li>
              <li>Analytics providers (Google Analytics)</li>
              <li>Regulatory authorities where required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-600">
              We take reasonable technical and organizational measures to protect personal data from unauthorized access, loss, or misuse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-600">
              We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent at any time</li>
              <li>Object to data processing</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Requests can be sent to{" "}
              <a href="mailto:info@wescng.com" className="text-[--primary] hover:underline">
                info@wescng.com
              </a>
              .
            </p>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <div className="space-y-3">
              <p className="font-semibold text-gray-900">WESC Nigeria Limited</p>
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
