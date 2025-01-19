import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Direction = number;

const testimonials = [
  {
    quote: "I’ve been consistently impressed with WESC. The team is responsive, delivers results promptly, and goes above and beyond to ensure satisfaction. Highly satisfied!",
    author: "Christopher Uzoma",
    role: "Robotics and Autonomous Systems (System Engineering)",
    school: "Arizona State University, USA"
  },
  {
    quote: "You guys are amazing! Your admission process is prompt, and your client relationship is excellent.",
    author: "Eunice Edokpolor",
    role: "Personal Support Worker",
    school: "Canadore College, Canada"
  },
  {
    quote: "WESC’s services are exceptional. They assist with applications, follow-ups, and provide timely support. I’m truly grateful for the help! ❤️",
    author: "Oluwatosin Bello",
    role: "Occupational Health, Safety & Wellness",
    school: "Conestoga College, Canada"
  },
  {
    quote: "I had a great experience with WESC. Their guidance secured my spot at DePaul, and I couldn’t be happier. Highly recommend their services!",
    author: "Stephenie Ugochukwu Obiazikwor",
    role: "Master of Science - Data Science - Computational Methods",
    school: "DePaul University, USA"
  },
  {
    quote: "Highly recommended for anyone seeking international admissions. They guide you from start to finish, offering step-by-step support and quick responses. Great team!",
    author: "Chidiebube Joseph Uduh",
    role: "Supply Chain Management",
    school: "Georgian College, Canada"
  },
  {
    quote: "WESC not only secures admissions but also helps with financial aid, which is often the biggest challenge. Excellent service, keep it up! 👍",
    author: "Brume Osale Charles",
    role: "Master of Public Health",
    school: "Massachusetts College of Pharmacy and Health Sciences"
  },
  {
    quote: "WESC offers professional and efficient services. Their quick responses and quality education support are unmatched.",
    author: "Uduak Okon Iwatt",
    role: "Business - Accounting",
    school: "Niagara College, Canada"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<Direction>(0);

  const slideVariants = {
    enter: (direction: Direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1]
      }
    },
    exit: (direction: Direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1]
      }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <motion.section 
      className="py-24 bg-[#FDF8F6] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <div className="relative">
          <motion.div 
            className="flex justify-between items-center mb-12"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold">
              What our <span className="text-[--primary]">Students</span> are saying
            </h2>
          </motion.div>

          <div className="relative justify-center">
            <div className="absolute z-20 inset-y-0 left-0 md:-left-4 flex items-center">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-[--primary]" />
              </button>
            </div>

            <div className="absolute z-20 inset-y-0 right-0 md:-right-4 flex items-center">
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-[--primary]" />
              </button>
            </div>

            <div className="relative min-h-[500px] md:min-h-[600px] mx-5 md:mx-10">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full"
                >
                  <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-12 shadow-sm h-[500px] md:h-[600px] flex flex-col justify-between">
                    <motion.div 
                      className="text-2xl md:text-4xl font-light text-[--primary] mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    >
                      "{testimonials[current].quote}"
                    </motion.div>
                    <div>
                      <p className="font-semibold text-lg">{testimonials[current].author}</p>
                      <p className="text-[--muted]">{testimonials[current].role}</p>
                      <p className="text-[--primary] text-sm">{testimonials[current].school}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    current === index ? 'bg-[--primary]' : 'bg-gray-300'
                  }`}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

