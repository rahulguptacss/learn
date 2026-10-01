"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaQuoteRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { getBlogSlug, BlogItem } from '../../types';

function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#edf0f5] rounded-[10px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8">
      <div className="px-6 py-5 border-b border-[#f0f0f0] relative">
        <h3 className="text-[20px] font-bold text-[#1b2a4b] inline-block m-0 relative">
          {title}
        </h3>
        <div className="absolute bottom-[-1px] left-6 w-[80px] h-[2px] bg-[#e60000]" />
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

export default function BlogDetail({ 
  blog, 
  recentPosts = [], 
  categories = [] 
}: { 
  blog: BlogItem, 
  recentPosts?: BlogItem[], 
  categories?: { name: string; count: string }[] 
}) {
  // Title highlighting logic (similar to screenshot)
  const words = blog.title.split(' ');
  // Assuming the user wants exactly the last word red, or last two. I'll just use the last word for highlight.
  const lastWord = words.pop();
  const restOfTitle = words.join(' ');

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-[1250px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10">
          
          {/* ── LEFT COLUMN: MAIN CONTENT ──────────────────────────────────── */}
          <div>
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-[2/1] overflow-hidden mb-6"
            >
              <Image
                src={blog.image || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200`}
                alt={blog.title}
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            {/* Meta info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-5 flex-wrap mb-6 text-[14px] font-semibold text-[#5e6a7c]"
            >
              <div className="flex items-center gap-2">
                <Image src={blog.authorImage || '/images/author-1.jpg'} alt={blog.author} width={30} height={30} className="rounded-full object-cover" />
                <span>By {blog.author}</span>
              </div>
              <div className="flex items-center gap-2 text-[#e60000]">
                <Calendar className="w-4 h-4" />
                <span className="text-[#5e6a7c]">{blog.date} {blog.month} {new Date().getFullYear()}</span>
              </div>
              <div className="bg-[#fff0f0] text-[#e60000] px-3 py-1 rounded-[20px] text-[13px] font-bold">
                {blog.category || 'Education'}
              </div>
            </motion.div>

            {/* Title */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-[32px] md:text-[38px] font-bold text-[#1b2a4b] leading-[1.2] tracking-tight mb-6">
                {restOfTitle} <span className="text-[#e60000]">{lastWord}</span>
              </h1>
            </motion.div>

            {/* Content Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg max-w-none text-[#5e6a7c] leading-[1.8]"
            >
              {/* Dynamic Content Paragraphs */}
              {blog.content ? (
                blog.content.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-[16px]">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="mb-6 text-[16px]">
                  {blog.description}
                </p>
              )}

              {/* Dynamic Blockquote */}
              {blog.quote && (
                <div className="bg-[#fff5f5] rounded-[6px] p-8 mb-8 relative border-l-4 border-[#e60000]">
                  <div className="absolute top-6 right-8 text-[#ffcccc] opacity-60">
                    <FaQuoteRight size={50} />
                  </div>
                  <p className="text-[17px] italic font-bold text-[#1b2a4b] leading-[1.7] m-0 mb-4 pr-12 relative z-10">
                    "{blog.quote.text}"
                  </p>
                  <span className="text-[16px] text-[#5e6a7c] font-semibold relative z-10">— {blog.quote.author}</span>
                </div>
              )}

              {/* Dynamic Benefits List */}
              {blog.benefits && blog.benefits.length > 0 && (
                <>
                  <h3 className="text-[24px] font-bold text-[#1b2a4b] mt-8 mb-5">
                    {blog.benefitsTitle || `Key Benefits of ${blog.category || 'Education'}`}
                  </h3>
                  
                  <ul className="space-y-3 mb-8">
                    {blog.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-[16px]">
                        <CheckCircle2 className="w-5 h-5 text-[#e60000] shrink-0 mt-0.5 fill-[#e60000] text-white" strokeWidth={3} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: SIDEBAR ──────────────────────────────────── */}
          <div className="lg:sticky lg:top-24 self-start space-y-2">
            
            {/* Recent Posts */}
            <SideCard title="Recent Posts">
              <div className="space-y-5">
                {recentPosts.map((post) => (
                  <Link href={`/blog/${getBlogSlug(post)}`} key={post.id} className="flex gap-4 group">
                    <div className="w-[85px] h-[75px] shrink-0 rounded-[8px] overflow-hidden relative border border-gray-100">
                      <Image src={post.image || '/images/default-blog.jpg'} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[14px] font-bold text-[#1b2a4b] leading-[1.4] group-hover:text-[#e60000] transition-colors line-clamp-2 mb-1.5">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[12px] text-[#e60000] font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[#8e98a8]">{post.month && post.month.substring(0, 3)} {post.date}, {post.month && post.month.substring(post.month.length - 4)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </SideCard>



            {/* Follow Us */}
            <SideCard title="Follow Us">
              <div className="flex items-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-[6px] bg-[#3b5998] hover:bg-opacity-90 text-white flex items-center justify-center transition-all duration-300">
                  <FaFacebook size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-[6px] bg-[#1da1f2] hover:bg-opacity-90 text-white flex items-center justify-center transition-all duration-300">
                  <FaXTwitter size={18} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-[6px] bg-[#e1306c] hover:bg-opacity-90 text-white flex items-center justify-center transition-all duration-300">
                  <FaInstagram size={18} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-[6px] bg-[#ff0000] hover:bg-opacity-90 text-white flex items-center justify-center transition-all duration-300">
                  <FaYoutube size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-[6px] bg-[#0077b5] hover:bg-opacity-90 text-white flex items-center justify-center transition-all duration-300">
                  <FaLinkedin size={18} />
                </a>
              </div>
            </SideCard>

          </div>
        </div>
      </div>
    </section>
  );
}
