"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { NewsData } from '../../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export default function NewsGrid({ data }: { data: NewsData }) {
  const newsData = data?.list || [];
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(newsData.length / itemsPerPage);

  const currentNews = newsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-[#f8f9fb]">
      <div className="container mx-auto px-4 md:px-8 max-w-[1300px]">
        
        {/* Grid */}
        <motion.div 
          key={currentPage} // Force re-render of animation when page changes
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {currentNews.map((news) => (
            <motion.div 
              key={news.id} 
              variants={itemVariants}
              className="bg-white rounded-[12px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col group"
            >
              {/* Image */}
              <Link href={`/news/${news.slug || news.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="relative w-full h-[240px] block overflow-hidden">
                <Image 
                  src={news.image} 
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </Link>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                
                {/* Date */}
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#e60000]" strokeWidth={2.5} />
                  <span className="text-[12px] font-bold tracking-wider text-[#8e98a8]">{news.date}</span>
                </div>

                {/* Title */}
                <Link href={`/news/${news.slug || news.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  <h3 className="text-[17px] font-bold text-[#1b2a4b] hover:text-[#e60000] transition-colors leading-[1.3] mb-2">
                    {news.title}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-[14px] text-[#5e6a7c] leading-[1.6] mb-3">
                  {news.description}
                </p>

                {/* Footer Meta */}
                <div className="flex items-center gap-2 flex-wrap mb-3 text-[12.5px] font-medium text-[#8e98a8]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#e60000]" strokeWidth={2.5} />
                    <span>{news.time}</span>
                  </div>
                  <span className="text-[#edf0f5]">|</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#e60000]" strokeWidth={2.5} />
                    <span>{news.location}</span>
                  </div>
                </div>

                {/* Read More */}
                <div className="mt-auto pt-1">
                  <Link href={`/news/${news.slug || news.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#e60000] group-hover:text-[#cc0000] transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-[6px] flex items-center justify-center font-bold transition-colors ${
                  currentPage === page
                    ? 'text-white bg-[#e60000] shadow-md shadow-red-500/20'
                    : 'text-[#1b2a4b] bg-white border border-gray-200 hover:bg-gray-50 hover:text-[#e60000]'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-[6px] flex items-center justify-center transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-300 bg-gray-50 border border-gray-100 cursor-not-allowed'
                  : 'text-[#1b2a4b] bg-white border border-gray-200 hover:bg-gray-50 hover:text-[#e60000]'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
