'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1.000] } },
};

interface Blog {
  _id: string;
  title: string;
  coverImage?: string;
}

export function BlogOverview() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/proxy-blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const fetchedBlogs = await response.json();
        setBlogs(fetchedBlogs.slice(0, 5)); // Get only the latest 5 blogs
      } catch (error) {
        console.error('Error fetching Blogs', error);
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const scrollElement = containerRef.current;

      const handleScroll = () => {
        const { scrollWidth, clientWidth, scrollLeft } = scrollElement;
        if (scrollLeft + clientWidth >= scrollWidth) {
          controls.start('visible');
        }
      };

      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [controls]);

  if (isLoading) {
    return <div className="text-center py-20">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[--primary]">Recent Blogs</h2>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-2 text-[--primary] hover:bg-[--primary] hover:text-white transition-colors"
          >
            View all Blogs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={containerRef}
          className="flex gap-6 overflow-x-scroll snap-x snap-mandatory px-2 no-scrollbar"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              variants={cardVariants}
              className={`snap-start shrink-0 ${
                index === 0 ? 'w-[70vw] md:w-[60vw]' : 'w-[70vw] md:w-[60vw]'
              }`}
            >
              <Link href={`/blogs/${blog._id}`}>
                <div className="group relative overflow-hidden rounded-t-3xl bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={blog.coverImage || '/placeholder.svg'}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium text-[--primary]">
                        INSIGHT
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <h3 className="text-2xl md:text-3xl pt-3 font-medium group-hover:text-[--primary] transition-colors">
                      {blog.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
