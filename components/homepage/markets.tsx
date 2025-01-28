import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Globe, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const markets = [
  {
    country: "United Kingdom",
    code: "gb",
    description: "The United Kingdom is a popular destination for international students due to its high-quality education system, diverse culture and English language proficiency.",
    stats: {
      universities: "150+",
      students: "450K+",
      ranking: "Top 10"
    },
    image: "https://media.istockphoto.com/id/478758048/photo/the-old-schools-of-cambridge-university.jpg?s=612x612&w=0&k=20&c=hczjG753IaOmFBVL2QNSp3zi23835rbd25WoXmUF7Gk="
  },
  {
    country: "USA",
    code: "us",
    description: "The United States hosts over a million international students yearly with numerous top-ranking Universities for study abroad programs.",
    stats: {
      universities: "200+",
      students: "1M+",
      ranking: "Top 5"
    },
    image: "/images/Stanford University.jfif"
  },
  {
    country: "Canada",
    code: "ca",
    description: "Canada offers a perfect blend of high-quality education, diverse culture, and safe environment for international students.",
    stats: {
      universities: "100+",
      students: "350K+",
      ranking: "Top 15"
    },
    image: "/images/U of T.jfif"
  },
  {
    country: "Ireland",
    code: "ie",
    description: "Ireland has one of the best education systems in the world, renowned internationally for academic quality.",
    stats: {
      universities: "50+",
      students: "200K+",
      ranking: "Top 20"
    },
    image: "/images/Trinity college.jfif"
  }
]

export function Markets() {
  const [activeMarket, setActiveMarket] = useState(0)

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl font-bold">Our Markets</h2>
          <p className="text-[--muted] max-w-2xl text-lg mx-auto">
            Explore top educational destinations worldwide and find the perfect place to pursue your academic dreams.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Navigation Pills */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
            {markets.map((market, index) => (
              <button
                key={market.country}
                onClick={() => setActiveMarket(index)}
                className={`
                  group relative min-w-[140px] lg:min-w-0 px-4 py-3 rounded-2xl 
                  transition-all duration-300 
                  ${activeMarket === index ? 'bg-white shadow-lg' : 'hover:bg-white/50'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Globe
                    className={`w-5 h-5 ${activeMarket === index ? 'text-[--primary]' : 'text-[--muted]'}`}
                  />
                  <span
                    className={`font-medium ${activeMarket === index ? 'text-[--primary]' : 'text-[--muted]'}`}
                  >
                    {market.country}
                  </span>
                </div>
                {activeMarket === index && (
                  <motion.div
                    layoutId="activeMarket"
                    className="absolute inset-0 bg-white rounded-2xl -z-10"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9 relative h-[600px] md:h-[500px] bg-white rounded-sm shadow-lg overflow-hidden">
            {markets.map((market, index) => (
              <motion.div
                key={market.country}
                initial={false}
                animate={{
                  opacity: activeMarket === index ? 1 : 0,
                  x: activeMarket === index ? 0 : 100,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`
                  absolute inset-0 
                  ${activeMarket === index ? 'pointer-events-auto' : 'pointer-events-none'}
                `}
              >
                <div className="h-full grid lg:grid-cols-2">
                  {/* Image Section with In-View Reveal Animation */}
                  <div className="relative h-48 lg:h-full overflow-hidden">
                    <motion.div
                      key={market.country}
                      initial={{ y: 0 }}
                      whileInView={{ y: "100%" }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        delay: 0.2 // Small delay to ensure smooth transition
                      }}
                      className="absolute inset-0 bg-white z-10 origin-top"
                    />
                    <motion.img
                      key={`img-${market.country}`}
                      src={market.image}
                      alt={market.country}
                      initial={{ scale: 1.2, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Country name overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          delay: 0.5,
                          duration: 0.5
                        }}
                        className="text-4xl font-bold text-white"
                      >
                        {market.country}
                      </motion.span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-12 flex flex-col">
                    <div className="space-y-6 flex-1">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                        <Globe className="w-5 h-5 text-[--primary]" />
                        <span className="font-medium">{market.country}</span>
                      </div>

                      <p className="text-[--muted] leading-relaxed">{market.description}</p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 py-6">
                        {Object.entries(market.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-xl font-bold text-[--primary]">{value}</div>
                            <div className="text-sm text-[--muted] capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/coverage"
                      className="flex items-center justify-center w-full sm:w-auto text-[--primary] text-[--primary]"
                    >
                      Explore our coverage
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Markets;