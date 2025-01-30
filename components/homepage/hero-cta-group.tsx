import React from 'react';
import Link from 'next/link';
import ProgramsPopup from './program-popup';

const HeroCtaGroup = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      
      <div className="w-full sm:w-auto">
        <ProgramsPopup />
      </div>
      <Link
        href="/apply-for-eligibility"
        className="inline-flex items-center rounded-full  px-8 py-4 text-sm font-medium text-white border border-10 transition-all hover:bg-white hover:text-[--primary]"
      >
        Apply for Eligibility
        
      </Link>
    </div>
  );
};

export default HeroCtaGroup;