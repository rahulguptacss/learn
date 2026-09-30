'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { PolicyData } from '../../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function Policy({ data }: { data: PolicyData }) {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
        
        {/* Header */}
        <motion.div 
          className="mb-6 md:mb-8 border-b border-gray-100 pb-6 md:pb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-[30px] sm:text-[36px] md:text-[46px] font-black leading-[1.2] text-[#101b29] tracking-tight mb-3 md:mb-4">
            {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[14px] md:text-[16px] text-[#5e6a7c] font-medium max-w-[600px] leading-[1.7]">
            {data.description}
          </motion.p>
        </motion.div>

        {/* Policy List */}
        <motion.div 
          className="flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {data.policies.map((policy, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants} 
              whileHover={{ y: -5, boxShadow: "0px 15px 30px rgba(0,0,0,0.06)" }}
              className="flex flex-row gap-4 md:gap-6 bg-[#f9fafc] hover:bg-white transition-colors duration-300 border border-[#f0f2f5] hover:border-transparent py-5 px-4 md:py-6 md:px-6 rounded-[16px] items-start"
            >
              <div className="shrink-0">
                <div className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] rounded-[10px] md:rounded-[12px] bg-[#fff5f5] text-[#e60000] text-[18px] md:text-[22px] font-extrabold flex items-center justify-center">
                  {policy.number}
                </div>
              </div>
              <div className="pt-0 md:pt-1">
                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-extrabold text-[#101b29] mb-1 md:mb-2">{policy.title}</h3>
                <p className="text-[14px] md:text-[15px] text-[#5e6a7c] leading-[1.7] md:leading-[1.8] font-medium whitespace-pre-wrap">{policy.content}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Message */}
        <motion.div 
          className="mt-12 md:mt-16 bg-[#fff5f5] rounded-[16px] p-5 md:p-8 text-center"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <p className="text-[14px] md:text-[16px] font-bold text-[#101b29]">
            {data.footer_message}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
