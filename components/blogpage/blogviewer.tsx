"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Block {
  id: string
  type: string
  content: string
  caption?: string
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
  readTime = "5 min read",
  category = "Education",
}: BlogViewerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  const renderBlock = (block: Block, index: number) => {
    const key = `block-${block.id}`
    switch (block.type) {
      case "h1":
        return (
          <motion.h1
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold mb-8"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
      case "h2":
        return (
          <motion.h2
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-bold mb-6"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
      case "h3":
        return (
          <motion.h3
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl font-bold mb-4"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
      case "quote":
        return (
          <motion.blockquote
            key={key}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border-l-4 border-primary pl-6 my-8 text-xl italic text-gray-700"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
      case "image":
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full my-12"
          >
            <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden">
              <Image
                src={block.content || "/placeholder.svg"}
                alt={block.caption || "Blog content image"}
                fill
                className="object-cover"
              />
            </div>
            {block.caption && (
              <div className="mt-4 text-sm text-gray-600 italic text-center border-l-2 border-gray-200 pl-4">
                {block.caption}
              </div>
            )}
          </motion.div>
        )
      case "divider":
        return (
          <motion.hr
            key={key}
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-8 border-t border-gray-300"
          />
        )
      case "bullet-list":
      case "numbered-list":
        // Lists are handled in the main render loop
        return null
      default:
        return (
          <motion.p
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg leading-relaxed mb-6 text-gray-700"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
    }
  }

  // Group consecutive list items into ul/ol
  const renderGroupedBlocks = () => {
    const groupedBlocks: React.ReactElement[] = []
    let i = 0
    while (i < content.length) {
      const block = content[i]
      if (block.type === "bullet-list" || block.type === "numbered-list") {
        const listType = block.type
        const listBlocks: Block[] = []
        let j = i
        while (j < content.length && content[j].type === listType) {
          listBlocks.push(content[j])
          j++
        }
        groupedBlocks.push(
          listType === "bullet-list" ? (
            <motion.ul
              key={`list-${block.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="list-disc my-6 ml-6 text-lg text-gray-700"
            >
              {listBlocks.map((b, idx) => (
                <motion.li
                  key={`block-${b.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  dangerouslySetInnerHTML={{ __html: b.content }}
                />
              ))}
            </motion.ul>
          ) : (
            <motion.ol
              key={`list-${block.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="list-decimal my-6 ml-6 text-lg text-gray-700"
            >
              {listBlocks.map((b, idx) => (
                <motion.li
                  key={`block-${b.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  dangerouslySetInnerHTML={{ __html: b.content }}
                />
              ))}
            </motion.ol>
          ),
        )
        i = j
      } else {
        const renderedBlock = renderBlock(block, i)
        if (renderedBlock) {
          groupedBlocks.push(renderedBlock)
        }
        i++
      }
    }
    return groupedBlocks
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <div className="">
        <motion.div
          style={{ opacity, scale, y }}
          className="relative -top-6 h-[70vh] rounded-3xl overflow-hidden flex items-center justify-center"
        >
          {coverImage ? (
            <>
              <Image
                src={coverImage || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover rounded-3xl"
                priority
              />
              <div className="absolute inset-0 bg-black/50 rounded-3xl" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gray-200 rounded-3xl flex items-center justify-center">
              <span className="text-gray-500 text-2xl">No cover image</span>
            </div>
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
                <span>
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
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
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Link>

          <article className="prose prose-lg max-w-none">{renderGroupedBlocks()}</article>
        </div>
      </div>
    </div>
  )
}
