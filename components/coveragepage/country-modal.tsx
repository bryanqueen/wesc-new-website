import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import { X, GraduationCap } from "lucide-react";

interface Market {
    country: string;
    headline: string;
    description: string;
    stats: {
        universities: number;
        students: string;
        ranking: string;
        cities: number;
    };
    image: string;
    highlights: string[];
    popular_courses: string[];
    living_costs: string;
    work_rights: string;
}

const CountryModal = ({ market, onClose }: { market: Market; onClose: () => void }) => {
    const [isHeaderColored, setIsHeaderColored] = useState(false);
    const modalContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (modalContentRef.current) {
                setIsHeaderColored(modalContentRef.current.scrollTop > 50);
            }
        };

        const modalContent = modalContentRef.current;
        if (modalContent) {
            modalContent.addEventListener('scroll', handleScroll);
            return () => modalContent.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    ref={modalContentRef}
                    className="absolute inset-0 overflow-y-auto rounded-3xl"
                >
                    {/* Header - Now properly fixed */}
                    <div
                        className={`sticky top-0 w-full transition-colors duration-200 z-10 text-white p-4 flex items-center justify-between ${
                            isHeaderColored ? 'bg-[--primary]' : 'bg-gradient-to-b from-black/50 to-transparent'
                        }`}
                    >
                        <h2 className="text-3xl font-bold">{market.country}</h2>
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className="relative -mt-20">
                        <Image
                            src={market.image}
                            width={400}
                            height={400}
                            alt={market.country}
                            className="w-full h-64 object-cover"
                        />
                    </div>

                    {/* Rest of your modal content */}
                    <div className="p-8 space-y-8">
                        {/* Overview */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Overview</h3>
                            <p className="text-[--muted] leading-relaxed">{market.description}</p>
                        </div>

                        {/* Statistics Grid */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Key Statistics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-[--primary]">
                                        {market.stats.universities}
                                    </div>
                                    <div className="text-sm text-[--muted]">Universities</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-[--primary]">
                                        {market.stats.students}
                                    </div>
                                    <div className="text-sm text-[--muted]">Int'l Students</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-[--primary]">
                                        {market.stats.ranking}
                                    </div>
                                    <div className="text-sm text-[--muted]">Education Ranking</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-[--primary]">
                                        {market.stats.cities}
                                    </div>
                                    <div className="text-sm text-[--muted]">Major Cities</div>
                                </div>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Key Highlights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {market.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[--primary]" />
                                        <span>{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Courses */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Popular Courses</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {market.popular_courses.map((course, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <GraduationCap className="w-5 h-5 text-[--primary]" />
                                        <span>{course}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Living Costs & Work Rights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">Living Costs</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-lg font-semibold text-[--primary]">
                                        {market.living_costs}
                                    </div>
                                    <div className="text-sm text-[--muted]">
                                        Average annual living expenses
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-4">Work Rights</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="text-lg font-semibold text-[--primary]">
                                        {market.work_rights}
                                    </div>
                                    <div className="text-sm text-[--muted]">Student work permissions</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CountryModal;