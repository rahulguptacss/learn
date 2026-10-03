'use client';

import React, { useEffect, useState, useRef } from 'react';
import { StatisticsData } from '../../types';
import { Users, BookOpen, Globe, GraduationCap } from 'lucide-react';

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
    const duration = 2000; // 2 seconds

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

export default function Statistics({ data }: { data: StatisticsData }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaUserGraduate': return <Users className="w-8 h-8" strokeWidth={2} />;
      case 'FaBook': return <BookOpen className="w-8 h-8" strokeWidth={2} />;
      case 'FaGlobe': return <Globe className="w-8 h-8" strokeWidth={2} />;
      case 'FaTrophy': return <GraduationCap className="w-9 h-9" strokeWidth={2} />;
      default: return <Users className="w-8 h-8" strokeWidth={2} />;
    }
  };

  return (
    <section 
      className="py-10 lg:py-12 relative overflow-hidden bg-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero/counter.png')" }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-10 mx-auto flex flex-col items-center">
          <h4 className="text-[14px] font-semibold uppercase tracking-[0.3em] text-[#8e98a8] mb-3">
            {data.subtitle}
          </h4>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.2] text-[#1b2a4b] tracking-tight mb-5">
            {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
          </h2>
          <div className="w-[50px] h-[2px] bg-[#e60000]"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-y-6 sm:gap-y-0">
          {data.list.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center justify-center text-center px-2 py-2 sm:py-4 lg:py-0 ${
                idx !== data.list.length - 1 ? 'lg:border-r border-gray-200/60' : ''
              } ${
                idx % 2 !== 0 ? 'border-l border-gray-200/60 lg:border-l-0' : ''
              }`}
            >
              <div className="w-[60px] h-[60px] sm:w-[85px] sm:h-[85px] bg-[#fff0f0] text-[#e60000] rounded-full flex items-center justify-center mb-2 sm:mb-4 shrink-0">
                <div className="scale-[0.7] sm:scale-100">
                  {getIcon(stat.icon)}
                </div>
              </div>
              <h3 className="text-[28px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#e60000] leading-none mb-1 sm:mb-1">
                <AnimatedCounter value={stat.value} />
              </h3>
              <p className="text-[12px] sm:text-[15px] lg:text-[16px] text-[#5e6a7c] font-medium leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
