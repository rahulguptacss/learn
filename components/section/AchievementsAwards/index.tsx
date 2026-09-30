"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Awards({ data }: { data: any }) {
  if (!data?.awards) return null;
  return (
    <section className="py-10 lg:py-16 bg-[#f8f9fc] border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16"
        >
          <p className="text-[#e60000] font-bold text-[14px] tracking-wider uppercase mb-2">{data.awards.subtitle}</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#101b29] mb-4">
            {data.awards.title_line1} <span className="text-[#e60000]">{data.awards.title_highlight}</span>
          </h2>
          <p className="text-[#6b7c93] text-[16px] md:text-[17px]">
            {data.awards.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.awards.items?.map((award: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-[#f0f2f5] rounded-[24px] pt-4 pb-6 px-3 md:pt-5 md:pb-8 md:px-6 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative mx-auto mb-3 flex items-center justify-center">
                <Image 
                  src={`/awards/${idx + 1}.png`}
                  alt={award.title}
                  width={110}
                  height={110}
                  className="drop-shadow-sm w-[70px] h-[70px] md:w-[110px] md:h-[110px] object-contain"
                />
              </div>
              <h3 className="text-[#101b2b] font-extrabold text-[15px] md:text-[19px] mb-1">{award.title}</h3>
              <p className="text-[#e60000] font-bold text-[14px] md:text-[16px] mb-2">{award.year}</p>
              <p className="text-[#6b7c93] font-medium text-[12px] md:text-[15px] leading-[1.4] md:leading-[1.6]">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
