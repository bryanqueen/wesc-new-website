'use client'

import Link from 'next/link'
import { Facebook, Instagram, X, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer
        className="relative text-white bg-[--primary] "
    >
      <div className="px-6 container mx-auto w-full">
        {/* Main Footer Content */}
        <div className="grid pt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <a href="tel:+2348025631112" className="flex items-center gap-2 hover:text-[--accent] transition-colors">
                <Phone className="h-4 w-4" />
                +234 802 563 1112
              </a>
              <a href="https://wa.me/2348111882608" className="flex items-center gap-2 hover:text-[--accent] transition-colors">
                <Phone className="h-4 w-4" />
                +234 811 188 2608 (WhatsApp)
              </a>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Email</h3>
            <div className="space-y-2">
              <a href="mailto:wescnigeria@gmail.com" className="flex items-center gap-2 hover:text-[--accent] transition-colors">
                <Mail className="h-4 w-4" />
                wescnigeria@gmail.com
              </a>
              <a href="mailto:info@wescng.com" className="flex items-center gap-2 hover:text-[--accent] transition-colors">
                <Mail className="h-4 w-4" />
                info@wescng.com
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Visit Us</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  Km 25, Lekki-Epe Expressway, Greenwood Park Estate, Opp 2nd Abijo GRA, Ibeju-Lekki LGA, Lagos State.
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[--accent] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[--accent] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[--accent] transition-colors">
                <X className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-white/10 text-sm text-center relative z-10">
          <p>© {new Date().getFullYear()} WESC. All rights reserved.</p>
        </div>

        {/* Large Background Text */}
        <div className="overflow-hidden pointer-events-none select-none">
          <h2 className="pb-4 font-bold text-white/60 text-center text-[33vw] md:text-[35vw] leading-[0.8] mt-10">
            WESC
          </h2>
        </div>
      </div>
    </footer>
  )
}

