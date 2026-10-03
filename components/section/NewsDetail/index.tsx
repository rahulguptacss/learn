"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { FaQuoteRight, FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { NewsItem, NewsData } from '../../types';

export default function NewsDetail({ news, allNews }: { news?: NewsItem, allNews?: NewsData }) {
  if (!news) return null;

  const recentPosts = allNews?.list?.slice(0, 4) || [];

  return (
    <section className="py-10 lg:py-12 bg-[#f8f9fb]">
      <div className="container mx-auto px-4 md:px-8 max-w-[1300px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Left Main Content */}
          <div className="lg:w-[68%]">
            <div className="bg-white rounded-[12px] p-5 lg:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100">
              
              {/* Cover Image */}
              <div className="relative w-full h-[300px] md:h-[450px] rounded-[10px] overflow-hidden mb-6">
                <Image 
                  src={news.image} 
                  alt={news.title} 
                  fill 
                  className="object-cover" 
                />
              </div>

              {/* Meta */}
              <div className="flex items-center flex-wrap gap-4 md:gap-6 mb-6 text-[14px] text-[#5e6a7c] font-medium">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-100 shadow-sm">
                     <Image src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150" alt="Author" fill className="object-cover" />
                  </div>
                  <span>By {news.author || "Admin"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#e60000]" strokeWidth={2.5} />
                  <span>{news.date}</span>
                </div>
                <div className="bg-[#fde8eb] text-[#e60000] px-3.5 py-1 rounded-[6px] text-[12px] font-bold tracking-wide">
                  {news.category}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-[28px] md:text-[38px] font-bold text-[#1b2a4b] leading-[1.25] mb-6 tracking-tight">
                {news.title}
              </h1>

              {/* Content text */}
              {news.content && news.content.length > 0 ? (
                <div className="text-[16px] text-[#5e6a7c] leading-[1.8] space-y-4 mb-6">
                  {news.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="text-[16px] text-[#5e6a7c] leading-[1.8] space-y-4 mb-6">
                  <p>{news.description}</p>
                </div>
              )}

              {/* Quote Block */}
              {news.quote && (
                <div className="bg-[#fff5f6] border-l-[4px] border-[#e60000] p-6 md:p-8 rounded-r-[10px] mb-6 relative overflow-hidden group">
                  <FaQuoteRight className="absolute right-6 top-6 text-[#fde8eb] text-[60px] group-hover:scale-110 transition-transform duration-500 pointer-events-none" />
                  <p className="text-[16px] md:text-[17px] font-bold text-[#1b2a4b] italic leading-[1.6] mb-4 relative z-10">
                    "{news.quote.text}"
                  </p>
                  <span className="text-[#5e6a7c] font-medium text-[15px] relative z-10 flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-[#e60000]"></span> {news.quote.author}
                  </span>
                </div>
              )}

              {/* Benefits List */}
              {news.benefits && news.benefits.length > 0 && (
                <>
                  <h3 className="text-[22px] md:text-[24px] font-bold text-[#1b2a4b] mb-4 tracking-tight">
                    Key Highlights
                  </h3>
                  <ul className="space-y-3 mb-6">
                    {news.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-[20px] h-[20px] text-[#e60000] shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-[#5e6a7c] text-[16px] leading-[1.6]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-[32%] space-y-8 sticky top-[120px] h-fit">
            
            {/* Recent Posts Widget */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-[12px] p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100">
                <h4 className="text-[20px] font-bold text-[#1b2a4b] mb-6 relative pb-4 border-b border-gray-100">
                  Recent Posts
                  <span className="absolute bottom-[-1px] left-0 w-[50px] h-[2px] bg-[#e60000]"></span>
                </h4>
                
                <div className="space-y-6">
                  {recentPosts.map((post: NewsItem, idx: number) => (
                    <Link href={`/news/${post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={idx} className="flex gap-4 group items-center">
                      <div className="relative w-[85px] h-[75px] rounded-[6px] overflow-hidden shrink-0">
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <h5 className="text-[14px] font-bold text-[#1b2a4b] leading-[1.4] mb-2 group-hover:text-[#e60000] transition-colors line-clamp-2">
                          {post.title}
                        </h5>
                        <div className="flex items-center gap-1.5 text-[12px] text-[#8e98a8] font-bold tracking-wide">
                          <Calendar className="w-3.5 h-3.5 text-[#e60000]" strokeWidth={2.5} /> {post.date}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Follow Us Widget */}
            <div className="bg-white rounded-[12px] p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100">
              <h4 className="text-[20px] font-bold text-[#1b2a4b] mb-6 relative pb-4 border-b border-gray-100">
                Follow Us
                <span className="absolute bottom-[-1px] left-0 w-[50px] h-[2px] bg-[#e60000]"></span>
              </h4>
              
              <div className="flex items-center gap-2.5 flex-wrap">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] bg-[#3b5998] text-white rounded-[8px] flex items-center justify-center hover:-translate-y-1 transition-transform duration-300 shadow-md shadow-[#3b5998]/20">
                  <FaFacebookF className="text-[18px]" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] bg-[#1da1f2] text-white rounded-[8px] flex items-center justify-center hover:-translate-y-1 transition-transform duration-300 shadow-md shadow-[#1da1f2]/20">
                  <FaXTwitter className="text-[18px]" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] bg-[#e1306c] text-white rounded-[8px] flex items-center justify-center hover:-translate-y-1 transition-transform duration-300 shadow-md shadow-[#e1306c]/20">
                  <FaInstagram className="text-[18px]" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] bg-[#ff0000] text-white rounded-[8px] flex items-center justify-center hover:-translate-y-1 transition-transform duration-300 shadow-md shadow-[#ff0000]/20">
                  <FaYoutube className="text-[18px]" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] bg-[#0077b5] text-white rounded-[8px] flex items-center justify-center hover:-translate-y-1 transition-transform duration-300 shadow-md shadow-[#0077b5]/20">
                  <FaLinkedinIn className="text-[18px]" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
