"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { GraduationCap, Clock, Users, Headset, Plus, Minus, ArrowRight } from 'lucide-react';
import { FaqData } from '../../types';
import Link from 'next/link';

const iconMap: Record<string, React.ReactNode> = {
  'graduation-cap': <GraduationCap size={24} />,
  'clock': <Clock size={24} />,
  'users': <Users size={24} />,
  'headset': <Headset size={28} />
};

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

export default function Faq({ data }: { data: FaqData }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.h4 variants={itemVariants} className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#e60000] mb-3">
            {data.subtitle}
          </motion.h4>
          <motion.h2 variants={itemVariants} className="text-[32px] md:text-[40px] lg:text-[46px] font-black leading-[1.2] text-[#101b29] tracking-tight mb-5 max-w-3xl">
            {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[16px] text-[#5e6a7c] leading-[1.7] max-w-[800px] mx-auto font-medium">
            {data.description}
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* Left Column - Image & Features */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="w-full lg:w-5/12 flex flex-col relative"
          >
            {/* Blob Image Container */}
            <div className="relative w-full max-w-[400px] mx-auto lg:mx-0">
              {/* Fake Blob Shape (using rounded border radius) */}
              <div className="absolute inset-0 bg-[#fff5f5] rounded-tr-[120px] rounded-bl-[120px] rounded-tl-[40px] rounded-br-[40px] -z-10 transform scale-[0.9] translate-y-6"></div>
              
              <div className="relative h-[350px] sm:h-[450px] w-full rounded-[30px] overflow-hidden z-10">
                <Image 
                  src={data.left_section.image} 
                  alt="Student" 
                  fill 
                  className="object-cover object-top"
                />
              </div>

              {/* Floating Speech Bubble */}
              <div className="absolute top-4 sm:top-8 left-0 sm:-left-4 md:-left-8 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-[16px] sm:rounded-[20px] rounded-bl-none shadow-[0_15px_40px_rgba(0,0,0,0.08)] z-20 flex flex-col items-center rotate-[-5deg] scale-[0.85] sm:scale-100 origin-top-left">
                <span className="text-[18px] font-black text-[#101b29] italic leading-tight">
                  {data.left_section.blob_text.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}
                      {i === 0 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </div>

              {/* Features List overlay */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 md:-right-8 flex flex-col gap-3 sm:gap-4 z-20 scale-[0.85] sm:scale-100 origin-right">
                {data.left_section.features.map((feature, idx) => (
                  <div key={idx} className="bg-white rounded-[16px] p-3 md:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center w-[90px] md:w-[110px]">
                    <div className="w-[40px] h-[40px] rounded-full bg-[#ffdddd] text-[#e60000] flex items-center justify-center mb-2">
                      {iconMap[feature.icon]}
                    </div>
                    <span className="text-[12px] md:text-[13px] font-bold text-[#101b29] leading-tight">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Box */}
            <div className="mt-10 sm:mt-12 bg-[#fff5f5] rounded-[20px] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[400px] mx-auto lg:mx-0 w-full text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-[54px] h-[54px] rounded-full bg-[#ffdddd] text-[#e60000] flex items-center justify-center shrink-0">
                  <Headset size={28} />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#101b29] mb-0.5">{data.left_section.support_box.title}</h4>
                  <p className="text-[13px] text-[#5e6a7c] font-medium leading-tight">{data.left_section.support_box.description}</p>
                </div>
              </div>
              <Link href="/enquiry" className="bg-[#e60000] text-white px-8 py-3.5 rounded-[8px] font-medium hover:bg-[#cc0000] transition-all flex items-center justify-center gap-3 group/btn shadow-md hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5 duration-300">
                {data.left_section.support_box.button_text} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Accordion */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="w-full lg:w-7/12 flex flex-col gap-4"
          >
            {data.questions.map((q, idx) => {
              const isActive = activeIndex === idx;
              return (
                <motion.div 
                  key={idx} 
                  variants={itemVariants} 
                  className={`border rounded-[14px] overflow-hidden transition-all duration-300 ${isActive ? 'border-[#e60000] bg-white shadow-[0_10px_30px_rgba(230,0,0,0.08)]' : 'border-gray-100 bg-[#f8f9fa] hover:bg-white'}`}
                >
                  <button 
                    onClick={() => toggleAccordion(idx)}
                    className={`w-full flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 text-left transition-colors duration-300 ${isActive ? 'bg-[#e60000] text-white' : 'text-[#101b29]'}`}
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive ? 'bg-white text-[#e60000]' : 'bg-white text-[#e60000] shadow-sm'}`}>
                        {isActive ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                      </div>
                      <span className="font-bold text-[16px] md:text-[17px] leading-tight">
                        {q.question}
                      </span>
                    </div>
                    {!isActive && <ArrowRight size={18} className="rotate-90 shrink-0 text-gray-400" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="p-4 sm:p-6 md:p-8 text-[14px] sm:text-[15px] text-[#5e6a7c] leading-[1.8] font-medium whitespace-pre-line bg-white">
                          {q.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

