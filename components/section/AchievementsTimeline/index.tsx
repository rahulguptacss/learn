"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Timeline({ data }: { data: any }) {
  if (!data?.timeline) return null;
  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-[40%] w-full"
          >
            <div className="mb-8 pr-0 lg:pr-12 text-center lg:text-left">
              <p className="text-[#e60000] font-bold text-[14px] tracking-wider uppercase mb-3">{data.timeline.subtitle}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#081828] mb-4">
                {data.timeline.title_line1} <span className="text-[#e60000]">{data.timeline.title_highlight}</span>
              </h2>
              <p className="text-[#4b5a6d] leading-relaxed text-[16px] md:text-[17px]">
                {data.timeline.description}
              </p>
            </div>
            <div className="relative mt-12 px-4 sm:px-0">
              {/* Floating Text with Swoosh */}
              <div className="absolute -top-8 lg:-top-12 right-0 sm:right-12 z-10 transform rotate-[-5deg]">
                <p className="text-[#1a1a1a] text-[22px]" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
                  {data.timeline.image_note_line1} {data.timeline.image_note_line2}
                </p>
                <svg className="w-32 h-6 absolute -bottom-3 left-2 text-[#e60000]" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5,15 Q40,-5 95,15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <Image 
                src={data.timeline.image || '/img/achievements.png'} 
                alt="Timeline Image" 
                width={600} 
                height={600} 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
          
          <div className="lg:w-[60%] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.timeline.items?.map((item: any, idx: number) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.03)] border border-[#f0f2f5] flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="bg-[#fff0f4] text-[#e60000] font-bold text-[19px] w-[76px] h-[76px] rounded-full shrink-0 flex items-center justify-center">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#101b2b] text-[15px] mb-1">{item.title}</h4>
                    <p className="text-[14px] text-[#6b7c93] leading-[1.6]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
