"use client"

import { notFound } from "next/navigation"
import { useState, useEffect } from "react"
import BlogViewer from "@/components/blogpage/blogviewer"

interface Block {
  id: string
  type: string
  content: string
  caption?: string
}

interface Blog {
  title: string
  coverImage: string
  content: Block[]
  author: { username: string }
  createdAt: string
}

export default function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [id, setId] = useState<string | null>(null)
  const [loading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unwrapParams = async () => {
      const { id } = await params // Unwrap the promise
      setId(id) // Store the ID in state
    }
    unwrapParams()
  }, [params])

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`/api/proxy-blogs/${id}`)
          if (!response.ok) {
            throw new Error("Failed to fetch blog")
          }
          const data = await response.json()
          if (!data || !data.title || !data.content) {
            throw new Error("Invalid blog data")
          }
          setBlog(data)
        } catch (error) {
          console.error("Error fetching blog:", error)
          setError("Failed to load blog. Please try again later.")
        } finally {
          setIsLoading(false)
        }
      }
      fetchBlog()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-pulse text-2xl text-gray-500 font-medium">
          Loading Blog...
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-2xl text-red-600 font-medium">
          {error || "Blog not found"}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogViewer
        title={blog.title}
        coverImage={blog.coverImage}
        content={blog.content}
        author={blog.author.username}
        createdAt={new Date(blog.createdAt)}
      />
    </div>
  )
}