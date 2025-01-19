'use client'

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoaderComponent from '@/components/homepage/loader';
import { Hero } from "@/components/homepage/hero";
import { About } from "@/components/homepage/about";
import { Services } from "@/components/homepage/services";
import { Markets } from "@/components/homepage/markets";
import Testimonials from '@/components/homepage/testimonials';
import { Newsletter } from "@/components/homepage/newsletter";
import { BlogOverview } from '@/components/homepage/blog-overview';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

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