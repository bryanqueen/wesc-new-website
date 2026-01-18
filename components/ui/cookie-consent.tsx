"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie, X } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Small delay before showing the banner
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-[--primary]/10 p-2 rounded-lg flex-shrink-0">
                    <Cookie className="h-5 w-5 text-[--primary]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">We use cookies</h3>
                    <p className="text-sm text-gray-600">
                      We use cookies to improve your experience and analyze site usage. By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
                      <Link href="/cookie-policy" className="text-[--primary] hover:underline">
                        Learn more
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={declineCookies}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={acceptCookies}
                    className="px-6 py-2 text-sm font-medium bg-[--primary] text-white rounded-lg hover:bg-[--primary]/90 transition-colors"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
