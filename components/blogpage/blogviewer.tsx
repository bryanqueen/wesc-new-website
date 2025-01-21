import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Block {
    type: string
    content: string
}

interface BlogViewerProps {
    title: string
    coverImage?: string
    content: Block[]
    author: string
    createdAt: Date
    readTime?: string
    category?: string
}

export default function BlogViewer({
    title,
    coverImage,
    content,
    author,
    createdAt,
    readTime = '5 min read',
    category = 'Education'
}: BlogViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
    const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

    const renderBlock = (block: Block, index: number) => {
        const key = `block-${block.type}-${index}`
        switch (block.type) {
            case 'h1':
                return (
                    <motion.h1
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl font-bold mb-8"
                    >
                        {block.content}
                    </motion.h1>
                )
            case 'h2':
                return (
                    <motion.h2
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold mb-6"
                    >
                        {block.content}
                    </motion.h2>
                )
            case 'h3':
                return (
                    <motion.h2
                        key={key}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{ opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className='text-2xl font-bold mb-4'
                    >
                        {block.content}
                    </motion.h2>
                )
            case 'quote':
                return (
                    <motion.blockquote
                        key={key}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="border-l-4 border-[--primary] pl-6 my-8 text-xl italic"
                    >
                        {block.content}
                    </motion.blockquote>
                )
            case 'image':
                return (
                    <motion.div

                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full h-[60vh] my-12 rounded-2xl overflow-hidden"
                        key={index}
                    >
                        <Image
                            src={block.content}
                            alt="Blog content image"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                )
            default:
                return (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="text-lg leading-relaxed mb-6 text-gray-700"
                        key={index}
                    >
                        {block.content}
                    </motion.p>
                )
        }
    }

    return (
        <div ref={containerRef} className="relative min-h-screen bg-white">
            {/* Hero Section */}
            <div className="">
                <motion.div
                    style={{ opacity, scale, y }}
                    className="relative -top-6 h-[70vh] rounded-3xl overflow-hidden flex items-center justify-center"
                >
                    {coverImage && (
                        <>
                            <Image
                                src={coverImage}
                                alt={title}
                                fill
                                className="object-cover rounded-3xl"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/50 rounded-3xl" />
                        </>
                    )}
                    <div className="relative z-10 container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="max-w-4xl mx-auto text-center text-white"
                        >
                            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm mb-6">
                                {category}
                            </span>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
                            <div className="flex items-center justify-center space-x-6 text-sm">
                                <span>{new Date(createdAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}</span>
                                <span>·</span>
                                <span>{readTime}</span>
                                <span>·</span>
                                <span>{author}</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-10">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-[--primary] transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Blogs</span>
                    </Link>

                    <article className="prose prose-lg max-w-none">
                        {content.map((block, index) => renderBlock(block, index))}
                    </article>
                </div>
            </div>
        </div>
    )
}