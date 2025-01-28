import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Globe, Award, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import InteractiveForm from './interactive-form'

interface ProgrammeBlock {
    type: 'header' | 'text' | 'image' | 'features' | 'testimonial' | 'certification';
    content: any;
}

export interface FormField {
    id: string;
    type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'tel' | 'date' | 'file' | 'textarea' | 'radio';
    label: string;
    placeholder?: string;
    helpText?: string;
    options?: string[];
    required: boolean;
    validation?: {
        minLength?: number;
        maxLength?: number;
        pattern?: string;
        customError?: string;
    };
}

interface ProgrammeViewerProps {
    title: string;
    description: string;
    coverImage?: string;
    content: ProgrammeBlock[];
    form?: {
        sections: Array<{
            id: string;
            title: string;
            description?: string;
            fields: FormField[];
        }>;
        settings?: {
            submitButtonText?: string;
            successMessage?: string;
        };
    };
    programmeId: string
}

const defaultForm = {
    sections: [],
    settings: {
        submitButtonText: 'Submit',
        successMessage: 'Application submitted successfully'
    }
};

export default function ProgrammeViewer({
    title,
    description,
    coverImage,
    content,
    form,
    programmeId
}: ProgrammeViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
    const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

    const [isFormOpen, setIsFormOpen] = React.useState(false)

    const renderBlock = (block: ProgrammeBlock, index: number) => {
        const key = `block-${block.type}-${index}`
        switch (block.type) {
            case 'header':
                return (
                    <motion.h2
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold mb-6 text-gray-800"
                    >
                        {block.content}
                    </motion.h2>
                )
            case 'text':
                return (
                    <motion.p
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg leading-relaxed mb-6 text-gray-700"
                    >
                        {block.content}
                    </motion.p>
                )
            case 'image':
                return (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full h-[50vh] my-12 rounded-2xl overflow-hidden"
                    >
                        <Image
                            src={block.content.url}
                            alt={block.content.caption || "Programme image"}
                            fill
                            className="object-cover"
                        />
                        {block.content.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center">
                                {block.content.caption}
                            </div>
                        )}
                    </motion.div>
                )
            case 'features':
                return (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid md:grid-cols-3 gap-6 my-12"
                    >
                        {block.content.map((feature: any, featureIndex: number) => (
                            <motion.div
                                key={`feature-${featureIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
                                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all"
                            >
                                <CheckCircle2 className="w-10 h-10 text-primary mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )
            case 'testimonial':
                return (
                    <motion.blockquote
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="border-l-4 border-primary pl-6 my-12 text-2xl italic text-gray-800"
                    >
                        "{block.content.quote}"
                        <div className="mt-4 text-base not-italic">
                            - {block.content.author}{block.content.role && `, ${block.content.role}`}
                        </div>
                    </motion.blockquote>
                )
            case 'certification':
                return (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-gray-50 rounded-xl p-6 my-12"
                    >
                        <Award className="w-10 h-10 text-primary mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">{block.content.title}</h3>
                        <p className="text-gray-700">{block.content.description}</p>
                    </motion.div>
                )
            default:
                return null
        }
    }

    return (
        <div ref={containerRef} className="relative min-h-screen bg-gray-50">
            {/* Hero Section */}
            <motion.div
                style={{ opacity, scale, y }}
                className="relative h-[70vh] rounded-b-3xl overflow-hidden flex items-center justify-center"
            >
                {coverImage && (
                    <>
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            className="object-cover rounded-b-3xl"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/60 rounded-b-3xl" />
                    </>
                )}
                <div className="relative z-10 container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-4xl mx-auto text-center text-white"
                    >
                        {/* <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-6 flex items-center justify-center space-x-2">
                            <Globe className="w-4 h-4" />
                            <span>International Education Programme</span>
                        </span> */}
                        <h1 className="text-5xl md:text-6xl font-bold mb-8">{title}</h1>

                        <div className="flex justify-center">
                            {form && form.sections.length > 0 && (
                                <Button
                                    onClick={() => setIsFormOpen(true)}
                                    className="inline-flex items-center rounded-full bg-white px-8 py-4 text-sm font-medium text-[--primary] hover:bg-gray-200"
                                >
                                    Apply Now
                                    <ArrowRight className='w-5 h-5' />
                                </Button>
                            )}
                            {/* <Button
                                variant="outline"
                                className="text-white border-white hover:bg-white/10"
                            >
                                Download Brochure
                            </Button> */}
                        </div>
                    </motion.div>
                </div>
            </motion.div>


            {/* Content Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                    <p className="text-xl text-gray-600 max-w-3xl pl-4 my-8 italic">{description}</p>

                    <article>
                        {content.map((block, index) => renderBlock(block, index))}
                    </article>
                </div>
            </div>

            {/* Application Form Sheet */}
            {isFormOpen && (
                <InteractiveForm
                    programmeId={programmeId}
                    form={form || defaultForm}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </div>
    )
}