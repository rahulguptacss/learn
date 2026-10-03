"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { 
  GraduationCap, BookOpen, Monitor, FlaskConical, Users, 
  Activity, Utensils, Bus, HeartPulse
} from 'lucide-react';
import { FacilitiesData } from '../../types';

// Map icon strings to lucide icons
const iconMap: Record<string, React.ReactNode> = {
  'graduation-cap': <GraduationCap size={28} />,
  'book-open': <BookOpen size={28} />,
  'monitor': <Monitor size={28} />,
  'flask-conical': <FlaskConical size={28} />,
  'users': <Users size={28} />,
  'activity': <Activity size={28} />,
  'utensils': <Utensils size={28} />,
  'bus': <Bus size={28} />,
  'heart-pulse': <HeartPulse size={28} />,
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
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const cleanValue = value.replace(/,/g, '');
  const match = cleanValue.match(/^([\d.]+)(.*)$/);
  
  const numericPart = match ? parseFloat(match[1]) : 0;
  const suffixPart = match ? match[2] : value;
  const hasNumber = match !== null && !isNaN(numericPart);
  const isFloat = match ? match[1].includes('.') : false;
  const hasComma = value.includes(',');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !hasNumber) return;
    
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setCount(easeOut * numericPart);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericPart);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, numericPart, hasNumber]);

  if (!hasNumber) return <span>{value}</span>;

  let displayCount = isFloat ? count.toFixed(1) : Math.floor(count).toString();
  if (hasComma && !isFloat) {
    displayCount = Math.floor(count).toLocaleString('en-US');
  }

  return (
    <span ref={ref} className="relative inline-flex tabular-nums justify-center">
      <span className="invisible">{value}</span>
      <span className="absolute left-0 top-0 w-full text-center">
        {displayCount}{suffixPart}
      </span>
    </span>
  );
}

export default function Facilities({ data }: { data: FacilitiesData }) {
  return (
    <section className="py-10 md:py-12 lg:py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-[1250px] relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-10"
        >
          <motion.h4 variants={itemVariants} className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#e60000] mb-3">
            {data.subtitle}
          </motion.h4>
          <motion.h2 variants={itemVariants} className="text-[32px] md:text-[40px] lg:text-[46px] font-black leading-[1.2] text-[#1b2a4b] tracking-tight mb-5 max-w-3xl">
            {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[16px] text-[#5e6a7c] leading-[1.7] max-w-[700px] mx-auto font-medium">
            {data.description}
          </motion.p>
        </motion.div>

        {/* Facilities Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-8 mb-16"
        >
          {data.list.map((facility, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-[14px] overflow-hidden group border border-[#f0f2f5] hover:border-transparent hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col relative"
            >
              {/* Image Container */}
              <div className="relative h-[170px] w-full overflow-hidden bg-gray-100">
                <Image 
                  src={facility.image} 
                  alt={facility.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              
              {/* Content Container */}
              <div className="px-6 pb-8 flex relative bg-white">
                {/* Floating Icon */}
                <div className="mr-5 shrink-0 relative z-10">
                  <div className="w-[80px] h-[80px] bg-[#fff5f5] rounded-full flex items-center justify-center text-[#e60000] -mt-[40px] border-[5px] border-white group-hover:scale-110 transition-transform duration-300">
                    {iconMap[facility.icon] || <BookOpen size={30} />}
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="pt-4 flex-1">
                  <h3 className="text-[20px] font-bold text-[#101b29] mb-2.5 leading-tight group-hover:text-[#e60000] transition-colors">
                    {facility.title}
                  </h3>
                  
                  <p className="text-[#5e6a7c] text-[15px] leading-[1.6]">
                    {facility.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="bg-[#fff5f5] rounded-[20px] py-10 px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center"
        >
          {data.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className={`flex-1 w-full md:border-r border-[#ffdddd] last:border-0 ${idx !== data.stats.length - 1 ? 'pb-8 md:pb-0 border-b md:border-b-0' : ''}`}
            >
              <div className="text-[38px] md:text-[44px] font-black text-[#e60000] mb-1 leading-none tracking-tight">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-[16px] font-bold text-[#1b2a4b]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
