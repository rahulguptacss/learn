"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { GraduationCap, Users, Trophy, Star, Medal, Award } from 'lucide-react';

function Counter({ value }: { value: string }) {
  const cleanValue = value.replace(/,/g, '');
  const match = cleanValue.match(/^([\d.]+)(.*)$/);
  
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const isFloat = match ? match[1].includes('.') : false;
  const hasComma = value.includes(',');

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      if (isNaN(target)) return;
      
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) {
            let displayCount = isFloat ? v.toFixed(1) : Math.floor(v).toString();
            if (hasComma && !isFloat) {
              displayCount = Math.floor(v).toLocaleString('en-US');
            }
            ref.current.textContent = displayCount + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, target, suffix, isFloat, hasComma]);

  return (
    <span className="relative inline-flex tabular-nums justify-center">
      <span className="invisible">{value}</span>
      <span ref={ref} className="absolute left-0 top-0 w-full text-center">
        0{suffix}
      </span>
    </span>
  );
}

const getIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Trophy': return <Trophy className={className} />;
    case 'Star': return <Star className={className} />;
    case 'Medal': return <Medal className={className} />;
    case 'Award': return <Award className={className} />;
    default: return <Star className={className} />;
  }
};

export default function Stats({ data }: { data: any }) {
  if (!data?.stats) return null;
  return (
    <section className="py-8 lg:py-12 bg-[#fafafa]">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#fff6f8] rounded-2xl py-8 md:py-10 px-4 md:px-6 shadow-sm border border-[#ffe5ec]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-2 sm:gap-x-4 lg:gap-y-0 lg:divide-x divide-[#ffccd8]">
            {data.stats.map((stat: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center text-center px-2 sm:px-4"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#ffe0e8] flex items-center justify-center mb-4 md:mb-5">
                  {getIcon(stat.icon, "w-8 h-8 md:w-10 md:h-10 text-[#e60000] stroke-[1.5]")}
                </div>
                <h3 className="text-[26px] md:text-[32px] font-bold text-[#e60000] mb-1">
                  <Counter value={stat.value} />
                </h3>
                <p className="text-[#3b4b5e] font-medium text-[13px] md:text-[15px]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
