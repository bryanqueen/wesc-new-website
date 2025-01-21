'use client'

import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import BlogViewer from '@/components/blogpage/blogviewer'



export default function BlogPage({ params }: { params: Promise<{ id: string }> }) {
    const [blog, setBlog] = useState<any>(null)
    const [id, setId] = useState<string | null>(null)
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const unwrapParams = async () => {
            const {id} = await params; //Unwrap the promise
            setId(id) //Store the ID in state
        }
        unwrapParams()
    },[params])

    useEffect(() => {
        if(id){
            const fetchBlog = async () => {
                try {
                    const response = await fetch(`/api/proxy-blogs/${id}`)
                    if(!response.ok){
                        throw new Error('Failed to fetch Blog')
                    }
                    const data = await response.json()
                    setBlog(data)
                } catch (error) {
                   console.error('Error Fetching Blog', error) 
                } finally{
                    setIsLoading(false)
                }
            }
            fetchBlog()
        }

    }, [id])

    if(loading){
        return <div className="text-center py-20 h-[75vh] text-3xl md:text-5xl">Loading blog...</div>
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogViewer
        title={blog.title}
        coverImage={blog.coverImage}
        content={blog.content}
        author={blog.author.username}
        createdAt={blog.createdAt}
      />
    </div>
  )
}

