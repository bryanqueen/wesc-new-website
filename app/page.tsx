'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import LoaderComponent from '@/components/homepage/loader';
import { Hero } from "@/components/homepage/hero";
import { About } from "@/components/homepage/about";
import { Services } from "@/components/homepage/services";
import { Markets } from "@/components/homepage/markets";
import Testimonials from '@/components/homepage/testimonials';
import { Newsletter } from "@/components/homepage/newsletter";
import { BlogOverview } from '@/components/homepage/blog-overview';

// Create a global variable to track if the page has been loaded
let isFirstLoad = true;


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Only show loader on first load
    if (isFirstLoad) {
      setIsLoading(true);
      isFirstLoad = false;
    }

    // Reset first load state when leaving the page
    return () => {
      // Don't reset on unmount if we're just re-rendering
      setTimeout(() => {
        if (document.hidden) {
          isFirstLoad = true;
        }
      }, 0);
    };
  }, []);

  // Listen for visibility changes to reset state when tab is closed
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isFirstLoad = true;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoaderComponent onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <Hero/>
          <About/>
          <Services/>
          <Markets/>
          <Testimonials/>
          <Newsletter/>
          <BlogOverview/>
        </>
      )}
    </>
  );
}