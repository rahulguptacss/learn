'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { NotFoundData } from '../../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function NotFound({ data }: { data: NotFoundData }) {
  return (
    <section className="bg-white relative overflow-hidden flex items-center min-h-[75vh] pt-10 md:pt-16">
      {/* Background blobs/decorations */}
      <motion.div 
        className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/3"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[600px] h-[600px] bg-[#fff5f5] rounded-full blur-[100px]"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-[1300px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Content Area */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-center relative z-10 lg:pl-16 text-center lg:text-left items-center lg:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[#e60000]"></div>
              <h4 className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#e60000]">
                {data.subtitle}
              </h4>
            </motion.div>

            {/* Giant 404 text */}
            <motion.div variants={itemVariants} className="relative inline-flex items-baseline mb-4 md:mb-6 font-black leading-none select-none justify-center">
              {/* Graduation Cap */}
              <motion.div 
                className="absolute -top-10 -left-2 md:-top-16 md:-left-8 text-[#101b29] z-10 origin-bottom-right"
                animate={{ rotate: [-12, -5, -12], y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <GraduationCap size={80} className="hidden md:block" fill="#101b29" />
                <GraduationCap size={45} className="md:hidden" fill="#101b29" />
              </motion.div>
              
              <motion.span 
                className="text-[90px] sm:text-[120px] md:text-[180px] text-[#101b29] tracking-tighter"
                whileHover={{ y: -10, scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
              >
                {data.title_404.digit1}
              </motion.span>
              <motion.span 
                className="text-[90px] sm:text-[120px] md:text-[180px] text-[#e60000] tracking-tighter"
                whileHover={{ y: -10, scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
              >
                {data.title_404.digit2}
              </motion.span>
              <motion.span 
                className="text-[90px] sm:text-[120px] md:text-[180px] text-[#101b29] tracking-tighter"
                whileHover={{ y: -10, scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
              >
                {data.title_404.digit3}
              </motion.span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-[28px] sm:text-[32px] md:text-[40px] font-black leading-[1.2] text-[#101b29] tracking-tight mb-4">
              {data.heading_line1} <span className="text-[#e60000]">{data.heading_highlight}</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-[15px] text-[#5e6a7c] leading-[1.7] max-w-[450px] mx-auto lg:mx-0 font-medium mb-8">
              {data.description}
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link href={data.button.link}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#ed0020] hover:bg-[#cc001a] text-white h-[56px] px-8 rounded-[8px] font-bold text-[15px] flex items-center justify-center gap-2 transition-colors shadow-[0_10px_20px_rgba(237,0,32,0.2)]"
                >
                  {data.button.text} <ArrowRight size={18} />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image Area */}
          <motion.div 
            className="lg:col-span-7 relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full mt-4 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image 
                src={data.image} 
                alt="404 Not Found" 
                fill 
                className="object-contain lg:object-right object-center"
                priority
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
