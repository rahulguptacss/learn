"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AboutData } from '../../types';
import { GraduationCap, Users, BarChart } from 'lucide-react';
import { useInView, animate, motion } from 'framer-motion';

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView) {
      const match = value.match(/(\d+)(.*)/);
      if (match) {
        const num = parseInt(match[1], 10);
        const suffix = match[2] || '';
        const controls = animate(0, num, {
          duration: 2,
          ease: "easeOut",
          onUpdate(val) {
            if (ref.current) {
              ref.current.textContent = Math.round(val) + suffix;
            }
          }
        });
        return () => controls.stop();
      }
    }
  }, [value, inView]);

  return <span ref={ref}>{value}</span>;
}

export default function About({ data }: { data: AboutData }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'BarChart': return <BarChart className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          
          {/* Content Left */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 mt-10 lg:mt-0"
          >
            <h4 className="text-[14px] lg:text-[15px] font-semibold uppercase tracking-[0.25em] text-[#8e98a8] mb-2">
              {data.subtitle}
            </h4>
            
            <h2 className="text-[38px] lg:text-[42px] font-bold leading-[1.2] text-[#1b2a4b] mb-3 tracking-tight">
              {data.title_line1} <br /> {data.title_highlight}
            </h2>
            
            <div className="w-16 h-[3px] bg-[#e60000] mb-4"></div>
            
            <p className="text-[18px] lg:text-[19px] text-[#3d5272] font-normal mb-2 leading-[1.6]">
              {data.description}
            </p>

            {data.description_2 && (
              <p className="text-[14px] lg:text-[15px] text-[#718096] mb-4 leading-[1.7] max-w-xl">
                {data.description_2}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-4 xl:gap-4 mb-8">
               {data.features.map((feature, idx) => (
                 <motion.div 
                   key={idx} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                   className="flex flex-row gap-2.5 items-start"
                 >
                   <div className="w-[40px] h-[40px] lg:w-[48px] lg:h-[48px] rounded-full bg-[#fff0f0] text-[#cc0000] flex items-center justify-center shrink-0">
                     {getIcon(feature.icon)}
                   </div>
                   <div className="flex flex-col justify-start mt-1">
                     <h4 className="text-[11px] lg:text-[12px] font-bold text-[#1b2a4b] mb-0.5 leading-tight whitespace-nowrap">{feature.title}</h4>
                     <p className="text-[11px] lg:text-[12px] text-[#718096] leading-snug">{feature.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>

            <button className="bg-[#1b2a4b] text-white px-7 py-3.5 text-[15px] font-medium hover:bg-[#111e3b] transition cursor-pointer">
              {data.button_text}
            </button>
          </motion.div>

          {/* Image Right */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative h-[300px] lg:h-[420px] w-full rounded-[24px] overflow-hidden shadow-xl">
               <Image 
                 src={data.image}
                 alt="About Campus" 
                 fill 
                 className="object-cover" 
               />
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-10 lg:-bottom-12 left-1/2 -translate-x-1/2 w-[90%] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl py-4 lg:py-5 flex justify-between divide-x divide-gray-100 z-10">
               {data.stats.map((stat, idx) => (
                 <div key={idx} className="flex-1 text-center px-2 lg:px-4">
                   <h3 className="text-3xl lg:text-[40px] font-bold text-[#e60000] mb-1 lg:mb-2 leading-none">
                     <AnimatedCounter value={stat.value} />
                   </h3>
                   <p className="text-[11px] lg:text-[13px] font-medium text-gray-500">{stat.label}</p>
                 </div>
               ))}
            </div>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
