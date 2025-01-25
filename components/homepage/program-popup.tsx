'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Programme {
  _id: string,
  title: string,
  coverImage?: string,
  description: string
}

const truncateDescription = (description: string, wordLimit: number = 9): string => {
  const words = description.split(' ');
  if (words.length <= wordLimit) return description;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function ProgramsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const response = await fetch('/api/proxy-programme');
        if (!response.ok) throw new Error('Failed to fetch Programmes');
        const programmes = await response.json();
        setProgrammes(programmes);
      } catch (error) {
        console.error('Error fetching Programmes', error);
      }
    };
    fetchProgrammes();

    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scroll = (direction: 'left' | 'right') => {
    setActiveIndex(prevIndex => {
      if (direction === 'left') {
        return Math.max(0, prevIndex - 1);
      } else {
        return Math.min(programmes.length - 1, prevIndex + 1);
      }
    });
  };

  const DesktopLayout = () => (
    <div className="flex h-full">
      <div className="w-1/2 p-4 lg:p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-4">Our Programmes</h2>
          <p className="text-white text-base lg:text-lg mb-4 lg:mb-6">Explore our diverse range of programmes designed to empower and educate.</p>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => scroll('left')}
            className={`p-2 lg:p-3 rounded-full bg-white/20 text-white transition-opacity ${
              activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white/30'
            }`}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <div className="flex space-x-2">
            {programmes.map((_, index) => (
              <div
                key={index}
                className="h-1 lg:h-2 rounded-full transition-all duration-300"
                style={{
                  width: index === activeIndex ? '1.5rem' : '0.75rem',
                  backgroundColor: index === activeIndex ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)',
                }}
              />
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className={`p-2 lg:p-3 rounded-full bg-white/20 text-white transition-opacity ${
              activeIndex === programmes.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white/30'
            }`}
            disabled={activeIndex === programmes.length - 1}
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      </div>
      <div className="w-1/2 p-4 lg:p-6">
        {programmes[activeIndex] && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col h-full">
            <img
              src={programmes[activeIndex].coverImage || '/placeholder.svg'}
              alt={programmes[activeIndex].title}
              className="w-full h-40 lg:h-64 object-cover"
            />
            <div className="p-4 lg:p-6 flex flex-col flex-grow overflow-y-auto snap-mandatory snap-y no-scrollbar">
              <h3 className="text-xl lg:text-2xl font-light mb-2 lg:mb-4 text-[--primary]">
                {programmes[activeIndex].title}
              </h3>
              <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-lg flex-grow">
                {truncateDescription(programmes[activeIndex].description)}
              </p>
              <Link
                href={`/programmes/${programmes[activeIndex]._id}`}
                className="flex items-center justify-center px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-[--primary] text-white hover:bg-[--primary]/90 transition-colors text-sm lg:text-base"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  

  const MobileLayout = () => (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Our Programmes</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-white/10 rounded-full text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="relative flex-grow overflow-y-auto">
        {programmes.map((program, index) => (
          <motion.div
            key={program._id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: activeIndex === index ? 1 : 0, x: activeIndex === index ? 0 : 100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col h-full"
            style={{ display: activeIndex === index ? 'flex' : 'none' }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col flex-grow">
              <img
                src={program.coverImage || '/placeholder.svg'}
                alt={program.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow overflow-y-auto">
                <h3 className="text-xl font-light mb-2 text-[--primary]">{program.title}</h3>
                <p className="text-gray-600 mb-4 text-sm flex-grow">
                  {truncateDescription(program.description, 15)}
                </p>
                <Link
                  href={`/programmes/${program._id}`}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[--primary] text-white hover:bg-[--primary]/90 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => scroll('left')}
          className={`p-2 rounded-full bg-white/20 text-white transition-opacity ${
            activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white/30'
          }`}
          disabled={activeIndex === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex justify-center space-x-2">
          {programmes.map((_, index) => (
            <div
              key={index}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: index === activeIndex ? '1.5rem' : '0.5rem',
                backgroundColor: index === activeIndex ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className={`p-2 rounded-full bg-white/20 text-white transition-opacity ${
            activeIndex === programmes.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white/30'
          }`}
          disabled={activeIndex === programmes.length - 1}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
  

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center rounded-full bg-white px-8 py-4 text-sm font-medium text-[--primary] transition-all hover:bg-[--accent]"
      >
        Checkout our Programmes
        <ArrowRight className="ml-4 h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`bg-gradient-to-b from-[--primary] to-[--primary]/90 rounded-3xl w-full ${
                isDesktop ? 'max-w-6xl h-[80vh]' : 'max-w-md h-[75vh]'
              } overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {isDesktop ? <DesktopLayout /> : <MobileLayout />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

