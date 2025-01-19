'use client'

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import Button from "./menu-button/button"
import { ArrowUpRight } from "lucide-react"

const menu = {

  open: {
    width: "calc(100% - 40px)",
    height: "75vh",
    top: "10px",
    right: "20px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    width: "0px",
    height: "0px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
  }

}

const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isActive, setIsActive] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20)
    })
  }

  const navItems = ['About', 'Services', 'Coverage', 'Blogs']



  return (
    <motion.header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${isScrolled ? 'bg-[--primary]' : 'bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="relative z-50">
          <Image
            src='/images/Logo.png'
            width='150'
            height='60'
            alt="logo"
          />
        </Link>

        <nav className="hidden lg:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`text-sm tracking-wide transition-colors ${isScrolled ? 'text-white hover:text-[--accent]' : 'text-white hover:text-[--accent]'
                }`}
            >
              {item.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className={`hidden lg:inline-flex rounded-full px-6 py-3 text-sm transition-colors ${isScrolled ? 'text-[--primary] bg-white hover:text-[--primary]' : 'text-white hover:text-[--accent] bg-[--primary]'
            }`}
        >
          APPLY FOR ELIGIBILITY
        </Link>
        <motion.div
          className='absolute bg-[--primary] rounded-xl '
          variants={menu}
          animate={isActive ? "open" : "closed"}
          initial="closed"
        >
          <AnimatePresence>
            {isActive && (
              <motion.nav
                className="flex flex-col h-full p-8 "
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="pt-16">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item}
                      custom={index}
                      variants={menuItemVariants}
                      className="mb-5"
                    >
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="flex items-center justify-between text-[2.5rem] font-light text-white hover:opacity-80 transition-opacity"
                        onClick={() => setIsActive(false)}
                      >
                        {item}
                        <ArrowUpRight className="w-6 h-6 opacity-60" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  custom={navItems.length}
                  variants={menuItemVariants}
                  className=""
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-between w-full px-8 py-4 text-lg font-light text-[--primary] bg-white rounded-full hover:opacity-90 transition-opacity"
                    onClick={() => setIsActive(false)}
                  >
                    Apply For Eligibilty
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
        <Button isActive={isActive} toggleMenu={() => { setIsActive(!isActive) }} />
      </div>


    </motion.header>
  )
}

