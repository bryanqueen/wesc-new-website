'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1.000]
    }
  }
}

const headerVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

interface Blog {
  _id: string
  title: string
  createdAt: string
  coverImage?: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/proxy-blogs')
        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }
        const fetchedBlogs = await response.json()
        console.log('Fetched blogs:', fetchedBlogs)
        setBlogs(fetchedBlogs)
      } catch (error) {
        console.error('Error fetching Blogs', error)
        setError('Failed to load blogs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const BlogCard = ({ blog }: { blog: Blog }) => (
    <motion.div variants={cardVariants}>
      <Link href={`/blogs/${blog._id}`}>
        <div className="group relative overflow-hidden rounded-3xl bg-white">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={blog.coverImage || '/placeholder.svg'}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-[--primary]">
                INSIGHTS
              </span>
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-medium group-hover:text-[--primary] transition-colors">
              {blog.title}
            </h2>
            <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
              <time dateTime={blog.createdAt}>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>
  }

  return (
    <main className="min-h-screen bg-[#FFF5F2]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400x] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/blog/blog-hero.jfif"
          alt="Blogs Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="relative z-10 text-center px-6"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Blogs</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Stay updated with the latest news and insights from the world of education abroad
          </p>
        </motion.div>
      </section>

      {/* Blogs Grid Section */}
      {isLoading ?
        <div className="text-center py-20">Loading blogs...</div> :
        <section className="container mx-auto px-6 py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {blogs.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-600">No blogs found. Check back later for new insights!</p>
              </div>
            )}
          </motion.div>
        </section>
      }
    </main>
  )
}

