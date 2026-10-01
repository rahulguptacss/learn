"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BlogData } from '../../types';
import { getBlogSlug } from '@/lib/blog';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
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

export default function Blog({ data }: { data: BlogData }) {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = isHomepage ? 3 : 6;
  const totalPages = Math.ceil((data.list?.length || 0) / itemsPerPage);

  const currentPosts = data.list?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to the top of the section slightly offset
    window.scrollTo({
      top: Math.max(0, (document.getElementById('blog-section')?.offsetTop || 0) - 100),
      behavior: 'smooth'
    });
  };

  return (
    <section id="blog-section" className="py-12 lg:py-16 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      
      {/* Background Decor */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute right-0 top-10 pointer-events-none hidden lg:block text-[#e60000] translate-x-1/4 -translate-y-1/4 z-0"
      >
        <GraduationCap size={700} strokeWidth={1} />
      </motion.div>
      <div className="absolute right-20 top-28 opacity-[0.07] pointer-events-none hidden lg:block z-0">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="#e60000" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <circle cx="10" cy={10 + i * 15} r="3" />
              <circle cx="25" cy={10 + i * 15} r="3" />
              <circle cx="40" cy={10 + i * 15} r="3" />
              <circle cx="55" cy={10 + i * 15} r="3" />
              <circle cx="70" cy={10 + i * 15} r="3" />
            </React.Fragment>
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1300px] relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 relative"
        >
          <div className="max-w-3xl relative z-10">
            <motion.h4 variants={itemVariants} className="text-[14px] font-semibold uppercase tracking-[0.25em] text-[#8e98a8] mb-1.5">
              {data.subtitle}
            </motion.h4>
            <motion.h2 variants={itemVariants} className="text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] text-[#1b2a4b] tracking-tight mb-3">
              {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
            </motion.h2>
            <motion.div variants={itemVariants} className="w-[50px] h-[3px] bg-[#e60000] mb-4"></motion.div>
            <motion.div variants={itemVariants} className="text-[15px] lg:text-[16px] text-[#5e6a7c] leading-[1.6]">
              {data.description.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Blog Cards */}
        <motion.div 
          key={currentPage}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-3"
        >
          {currentPosts.map((post) => (
            <motion.div 
              variants={itemVariants}
              key={post.id} 
              className="bg-white rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col border border-gray-100/80"
            >
              <div className="relative h-[210px] w-full overflow-hidden">
                <Image 
                  src={post.image || `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800`} 
                  alt={post.title} 
                  fill 
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute top-5 left-5 bg-[#e60000] text-white text-center rounded-[6px] px-3 py-2.5 min-w-[65px] shadow-md">
                  <span className="block text-[26px] font-black leading-none mb-1">{post.date}</span>
                  <span className="block text-[11px] font-bold tracking-wider">{post.month}</span>
                </div>
              </div>
              
              <div className="p-5 lg:p-6 flex flex-col flex-1">
                <div className="text-[12px] font-bold tracking-[0.15em] text-[#e60000] uppercase mb-1.5">
                  {post.category || 'EDUCATION'}
                </div>
                
                <Link href={`/blog/${getBlogSlug(post)}`}>
                  <h3 className="text-[21px] lg:text-[23px] font-bold text-[#1b2a4b] mb-2 hover:text-[#e60000] transition-colors cursor-pointer leading-[1.3] tracking-tight">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-[#64748b] text-[14px] lg:text-[15px] leading-[1.6] mb-4">
                  {post.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-3.5 border-t border-gray-100/80">
                  <div className="flex items-center gap-3.5">
                    <div className="w-[48px] h-[48px] rounded-full overflow-hidden relative border border-gray-100 shadow-sm">
                      <Image src={post.authorImage || '/images/author-1.jpg'} alt={post.author} fill className="object-cover object-top" />
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-[#1b2a4b] leading-tight mb-0.5">{post.author}</div>
                      <div className="text-[13px] text-[#64748b]">{post.authorRole || 'Author'}</div>
                    </div>
                  </div>

                  <Link href={`/blog/${getBlogSlug(post)}`} className="flex items-center gap-1.5 text-[#e60000] font-bold text-[15px] group-hover:text-[#cc0000] transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Pagination */}
        {!isHomepage && totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12 gap-2.5"
          >
            {/* Prev Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-[46px] h-[46px] flex items-center justify-center rounded-[10px] font-medium text-[22px] transition-all duration-300 border ${
                currentPage === 1 
                  ? 'bg-white text-[#cbd5e1] border-gray-200 cursor-not-allowed' 
                  : 'bg-white text-[#64748b] border-gray-200 hover:border-[#e60000] hover:text-[#e60000]'
              }`}
            >
              &laquo;
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-[46px] h-[46px] flex items-center justify-center rounded-[10px] font-semibold text-[17px] transition-all duration-300 border ${
                  currentPage === i + 1
                    ? 'bg-[#e60000] text-white border-[#e60000] shadow-[0_4px_12px_rgba(230,0,0,0.25)]'
                    : 'bg-white text-[#334155] border-gray-200 hover:border-[#e60000] hover:text-[#e60000]'
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-[46px] h-[46px] flex items-center justify-center rounded-[10px] font-medium text-[22px] transition-all duration-300 border ${
                currentPage === totalPages 
                  ? 'bg-white text-[#cbd5e1] border-gray-200 cursor-not-allowed' 
                  : 'bg-white text-[#475569] border-gray-200 hover:border-[#e60000] hover:text-[#e60000]'
              }`}
            >
              &raquo;
            </button>
          </motion.div>
        )}

        {/* View All Button for Homepage */}
        {isHomepage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 bg-[#e60000] hover:bg-[#cc0000] text-white px-8 py-3.5 rounded-[10px] font-bold text-[16px] transition-all shadow-[0_4px_14px_rgba(230,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(230,0,0,0.4)] hover:-translate-y-0.5 duration-200"
            >
              {data.button_text || 'View All Blogs'}
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
