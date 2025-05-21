import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Custom hook for counting animation
const useCountAnimation = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef(null)
  const isInView = useInView(nodeRef, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime
        
        if (progress < duration) {
          setCount(Math.min(Math.floor((progress / duration) * end), end))
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }

      const timeoutId = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate)
      }, delay)

      return () => {
        clearTimeout(timeoutId)
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [end, duration, delay, isInView])

  return [count, nodeRef] as const
}

export function About() {
  // Using the custom hook for each number
  const [collegeCount, collegeRef] = useCountAnimation(2500)
  const [countryCount, countryRef] = useCountAnimation(37)
  const [clientCount, clientRef] = useCountAnimation(1567)

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
            <h2 className="text-4xl font-bold mb-8">Who We Are</h2>
            <p className="text-[--muted] text-lg leading-relaxed mb-12">
              <span className="font-semibold">WESC</span> is a pioneering force in international education consulting, 
              leveraging over 12 years of expertise to transform academic aspirations 
              into reality. Our technology-driven approach and deep industry insights 
              enable us to provide unparalleled guidance to students, institutions, 
              and education partners worldwide.
            </p>

            {/* Clipped image reveal animation */}
            <motion.div
              className="relative w-full h-[400px] overflow-hidden rounded-lg"
              initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
              whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src="/images/About-section.jpeg"
                alt="About WESC"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pt-32"
          >
            <div className="space-y-12">
              <div className="border-t border-black/10 pt-6">
                <div className="text-4xl font-bold mb-2" ref={collegeRef}>
                  {collegeCount}+
                </div>
                <div className="text-[--muted]">Colleges and Universities</div>
              </div>

              <div className="border-t border-black/10 pt-6">
                <div className="text-4xl font-bold mb-2" ref={countryRef}>
                  {countryCount}+
                </div>
                <div className="text-[--muted]">Countries & Europe</div>
              </div>

              <div className="border-t border-black/10 pt-6">
                <div className="text-4xl font-bold mb-2" ref={clientRef}>
                  {clientCount}+
                </div>
                <div className="text-[--muted]">Clients</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}