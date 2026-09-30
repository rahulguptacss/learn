'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { SitemapData } from '../../types';
import { Home, BookOpen, Newspaper, Users, User, Settings, Mail, Headphones, ChevronRight, ArrowRight } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'home': return <Home className="w-5 h-5 md:w-6 md:h-6 text-[#e60000]" />;
    case 'book-open': return <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#e60000]" />;
    case 'newspaper': return <Newspaper className="w-5 h-5 md:w-6 md:h-6 text-[#e60000]" />;
    case 'users': return <Users className="w-5 h-5 md:w-6 md:h-6 text-[#e60000]" />;
    case 'user': return <User className="w-5 h-5 md:w-6 md:h-6 text-[#e60000]" />;
    case 'settings': return <Settings className="w-5 h-5 md:w-6 md:h-6 text-[#e60000]" />;
    case 'mail': return <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#e60000]" />;
    default: return <Home className="w-5 h-5 md:w-6 md:h-6 text-[#e60000]" />;
  }
};

export default function Sitemap({ data }: { data: SitemapData }) {
  return (
    <section className="bg-[#fafafc] py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-[1300px]">
        
        {/* Header Content */}
        <motion.div 
          className="text-center max-w-[700px] mx-auto mb-6 md:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.p variants={itemVariants} className="text-[#e60000] font-bold text-[14px] md:text-[15px] uppercase tracking-[0.1em] mb-2 md:mb-3">
            {data.subtitle}
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-[36px] md:text-[50px] font-black leading-[1.2] text-[#101b29] tracking-tight mb-4 md:mb-6">
            {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[15px] md:text-[16px] text-[#5e6a7c] font-medium leading-[1.7]">
            {data.description}
          </motion.p>
        </motion.div>

        {/* Sitemap Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {data.categories.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.06)" }}
              className="bg-white rounded-[16px] overflow-hidden border border-[#f0f2f5] transition-all duration-300"
            >
              {/* Card Header */}
              <div className="bg-[#fff5f5] py-4 px-5 md:px-6 flex items-center gap-3 md:gap-4 border-b border-[#ffebeb]">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#ffcccc] bg-white flex items-center justify-center shrink-0">
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-[17px] md:text-[19px] font-extrabold text-[#101b29]">{category.title}</h3>
              </div>
              
              {/* Card Links */}
              <div className="py-2 px-5 md:px-6">
                <ul className="flex flex-col">
                  {category.links.map((link, linkIdx) => (
                    <li key={linkIdx} className={`py-3 ${linkIdx !== category.links.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <Link href={link.href} className="group flex items-center justify-between text-[14px] md:text-[15px] text-[#5e6a7c] hover:text-[#e60000] font-medium transition-colors">
                        <span>{link.name}</span>
                        <ChevronRight className="w-4 h-4 text-[#e60000] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" strokeWidth={3} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Need Help Card */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.08)" }}
            className="bg-[#fff5f5] rounded-[16px] border border-[#ffebeb] p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden h-full"
          >
            {/* Background blob for style */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ffe1e1] rounded-full blur-[40px] opacity-60"></div>
            
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#ffcccc] bg-white flex items-center justify-center mb-6 z-10">
              <Headphones className="w-8 h-8 md:w-10 md:h-10 text-[#e60000]" />
            </div>
            
            <h3 className="text-[22px] md:text-[24px] font-extrabold text-[#101b29] mb-3 z-10">{data.help_card.title}</h3>
            
            <p className="text-[14px] md:text-[15px] text-[#5e6a7c] font-medium leading-[1.7] mb-8 z-10">
              {data.help_card.description}
            </p>
            
            <Link href={data.help_card.button_href} className="inline-flex items-center justify-center gap-2 bg-[#e60000] text-white py-3 md:py-4 px-6 md:px-8 rounded-[8px] font-bold text-[15px] md:text-[16px] hover:bg-[#cc0000] transition-colors z-10 w-full sm:w-auto shadow-[0_10px_20px_rgba(230,0,0,0.2)]">
              {data.help_card.button_text}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
