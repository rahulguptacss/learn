"use client";
import React from 'react';
import Image from 'next/image';
import { VisionData } from '../../types';
import { Lightbulb, Globe, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Vision({ data }: { data: VisionData }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb': return <Lightbulb className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
      default: return null;
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-[#fafbfc] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Content Left */}
          <div className="flex flex-col order-2 lg:order-1">
            <motion.h4 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[14px] font-bold uppercase tracking-[0.25em] text-[#e60000] mb-3"
            >
              {data.subtitle}
            </motion.h4>
            
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[26px] sm:text-[32px] lg:text-[44px] font-black tracking-tight leading-[1.2] sm:leading-[1.1] text-[#0a1128] mb-5"
            >
              {data.title_line1} <br />
              {data.title_line2 && <>{data.title_line2} </>}
              <span className="text-[#e60000]">{data.title_highlight}</span>
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 60 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-[3px] bg-[#e60000] mb-8"
            ></motion.div>
            
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[16px] lg:text-[17px] text-[#718096] font-normal mb-6 leading-[1.7]"
            >
              {data.description}
            </motion.p>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
               {data.features.map((feature, idx) => (
                 <motion.div 
                   key={idx} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                   className="flex flex-col items-center text-center"
                 >
                   <div className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] lg:w-[70px] lg:h-[70px] rounded-full bg-[#fff0f0] text-[#e60000] flex items-center justify-center mb-3 lg:mb-4">
                     {getIcon(feature.icon)}
                   </div>
                   <h4 className="text-[12px] sm:text-[14px] lg:text-[16px] font-bold text-[#0a1128] leading-[1.3] whitespace-pre-line">
                     {feature.label}
                   </h4>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Image Right */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            {/* Decorative background shape */}
            <div className="absolute -right-10 -bottom-10 w-[80%] h-[80%] bg-[#fff0f0] rounded-[40px] -z-10"></div>
            
            <div className="relative h-[320px] lg:h-[400px] w-full rounded-[24px] overflow-hidden shadow-xl">
               <Image 
                 src={data.image}
                 alt="Vision" 
                 fill 
                 className="object-cover" 
               />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
