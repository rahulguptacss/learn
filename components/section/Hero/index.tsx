"use client";
import React from 'react';
import Image from 'next/image';
import { HeroData } from '../../types';
import { PlayCircle, GraduationCap, Users, BookOpen, BarChart } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

function AnimatedHeroCounter({ value }: { value: string }) {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  const cleanValue = value.replace(/,/g, '');
  const match = cleanValue.match(/^([\d.]+)(.*)$/);
  
  const numericPart = match ? parseFloat(match[1]) : 0;
  const suffixPart = match ? match[2] : value;
  const hasNumber = match !== null && !isNaN(numericPart);
  const isFloat = match ? match[1].includes('.') : false;
  const hasComma = value.includes(',');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isVisible || !hasNumber) return;
    
    // Import animate from framer-motion inside or at top. We'll use the imported animate if available,
    // but to be safe and avoid import issues if it's not imported at the top, we can use the manual step with a smoother curve.
    // Actually, let's just make the manual requestAnimationFrame extremely smooth with easeOutExpo.
    let startTimestamp: number | null = null;
    const duration = 2500; // Increased duration for smoother feel
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutExpo for a very smooth deceleration at the end
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
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
    <span ref={ref}>
      {displayCount}{suffixPart}
    </span>
  );
}

export default function Hero({ data }: { data: HeroData }) {
  const renderIcon = (iconName: string, props: any) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Users': return <Users {...props} />;
      case 'PlayCircle': return <PlayCircle {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'BarChart': return <BarChart {...props} />;
      default: return null;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative w-full min-h-[75vh] md:min-h-[calc(100vh-90px)] flex items-end md:items-center pb-8 md:pb-12 pt-[32vh] md:pt-12 overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src={data.image} 
          alt="Hero Background" 
          fill 
          priority 
          className="object-cover object-[68%_center] md:object-right" 
        />
      </motion.div>

      {/* Gradient Overlay for Mobile and Desktop */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#080202] via-[#080202]/90 to-transparent md:bg-none md:bg-transparent md:bg-gradient-to-r md:from-[#080202] md:via-[#080202]/80 lg:via-[#080202]/60 md:to-transparent"></div>

      <div className="container relative z-10 mx-auto px-5 md:px-8">
        <motion.div 
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Subtitle */}
          {data.subtitle && (
            <motion.div variants={itemVariants} className="flex items-center gap-3 md:gap-4 text-[10px] md:text-[12px] font-semibold tracking-[0.2em] uppercase text-gray-200 mb-4 md:mb-5 mt-6 md:mt-8">
              {data.subtitle}
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-[2px] bg-[#e60000]"
              />
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 variants={itemVariants} className="text-[32px] sm:text-4xl md:text-[52px] lg:text-[60px] font-bold leading-[1.2] md:leading-[1.1] mb-4 md:mb-5 text-white tracking-tight">
            {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span> <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>{data.title_line2}
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-300 mb-8 md:mb-10 leading-relaxed max-w-lg whitespace-normal sm:whitespace-pre-line">
            {data.description}
          </motion.p>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="flex flex-row items-center gap-3 sm:gap-6 mb-8 md:mb-12">
            {data.stats.map((stat, idx) => (
              <React.Fragment key={idx}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 md:gap-4 cursor-default"
                >
                  <div className={`w-[48px] h-[48px] md:w-[52px] md:h-[52px] rounded-full flex items-center justify-center shrink-0 shadow-lg ${idx === 0 ? 'bg-[#e60000] shadow-[#e60000]/20' : 'bg-[#611616] shadow-black/20'}`}>
                    {stat.icon && renderIcon(stat.icon, { className: "text-white w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                  <div>
                    <span className="block text-[16px] md:text-[20px] font-bold text-white"><AnimatedHeroCounter value={stat.value} /></span>
                    <span className="block text-[12px] md:text-[13px] text-gray-400">{stat.label}</span>
                  </div>
                </motion.div>
                {idx === 0 && (
                  <div className="h-10 w-[1px] bg-white/20 mx-1 md:mx-2"></div>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Features Section */}
          {data.features && (
            <motion.div variants={itemVariants} className="flex flex-row flex-wrap items-center justify-between sm:justify-start gap-2 sm:gap-5">
              {data.features.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <motion.div 
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-2 sm:gap-2 group cursor-pointer"
                  >
                    {feature.icon && renderIcon(feature.icon, { className: "text-[#e60000] w-6 h-6 md:w-6 md:h-6 shrink-0 group-hover:scale-110 transition-transform duration-300", strokeWidth: 1.5 })}
                    <span className="text-[12px] md:text-[14px] font-medium text-gray-200 group-hover:text-white transition-colors max-w-[65px] sm:max-w-none leading-[1.2]">{feature.label}</span>
                  </motion.div>
                  {idx < data.features!.length - 1 && (
                    <div className="h-6 sm:h-4 w-[1px] bg-white/20"></div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
