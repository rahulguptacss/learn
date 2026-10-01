"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventsData, EventItem } from '../../types';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { getEventSlug } from '../../types';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

export default function Events({ data, showFilters = false }: { data: EventsData, showFilters?: boolean }) {
  const [activeCategory, setActiveCategory] = useState(data.categories ? data.categories[0] : 'All Events');

  const filteredEvents = React.useMemo(() => {
    if (!showFilters || !data.categories || activeCategory === data.categories[0]) return data.list;
    
    return data.list.filter(event => {
      const evCat = event.category?.toLowerCase() || '';
      const actCat = activeCategory.toLowerCase();
      if (actCat.includes('workshop') && evCat.includes('workshop')) return true;
      if (actCat.includes('seminar') && evCat.includes('seminar')) return true;
      if (actCat.includes('conference') && evCat.includes('conference')) return true;
      if (actCat.includes('campus') && evCat.includes('cultural')) return true;
      if (actCat.includes('webinar') && evCat.includes('webinar')) return true;
      return false;
    });
  }, [activeCategory, data.list, data.categories, showFilters]);

  return (
    <section className="py-12 lg:py-16 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute left-6 top-1/4 opacity-20 pointer-events-none hidden lg:block">
        <svg width="40" height="150" viewBox="0 0 40 150" fill="#e60000" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <React.Fragment key={i}>
              <circle cx="10" cy={10 + i * 20} r="2.5" />
              <circle cx="30" cy={10 + i * 20} r="2.5" />
            </React.Fragment>
          ))}
        </svg>
      </div>
      <div className="absolute right-0 top-0 opacity-[0.04] pointer-events-none hidden lg:block">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#e60000" strokeWidth="1">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1300px] relative z-10">
        
        {/* Header Section */}
        <motion.div 
          className={showFilters ? "mb-8 lg:mb-10 text-center max-w-3xl mx-auto flex flex-col items-center" : "mb-12 max-w-3xl"}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h4 className={`text-[14px] uppercase tracking-[0.25em] mb-1.5 ${showFilters ? 'font-bold text-[#e60000]' : 'font-semibold text-[#8e98a8]'}`}>
            {data.subtitle}
          </h4>
          <h2 className={`text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] text-[#1b2a4b] tracking-tight ${showFilters ? 'mb-4' : 'mb-3'}`}>
            {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
          </h2>
          {!showFilters && <div className="w-[50px] h-[3px] bg-[#e60000] mb-4"></div>}
          
          <div className="text-[15px] lg:text-[16px] text-[#5e6a7c] leading-[1.6]">
            {data.description.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </motion.div>

        {/* Categories / Filters */}
        {showFilters && data.categories && data.categories.length > 0 && (
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-2 lg:gap-3 mb-10"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {data.categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-[8px] text-[14px] font-bold transition-all duration-300 ${
                  activeCategory === category 
                  ? "bg-[#e60000] text-white shadow-md shadow-red-500/20" 
                  : "bg-white text-[#5e6a7c] border border-gray-200 hover:text-[#e60000] hover:border-[#e60000]/30 hover:bg-[#fff5f6]"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grid Section */}
        {filteredEvents.length > 0 ? (
          <motion.div 
            key={activeCategory} // Force re-render and re-animate on tab change
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {filteredEvents.map((event: EventItem) => (
            <motion.div 
              key={event.id} 
              variants={itemVariants}
            >
            <Link
              href={`/events/${getEventSlug(event)}`}
              className="bg-white rounded-[12px] flex flex-col sm:flex-row shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden group cursor-pointer block"
            >
              
              {/* Image side */}
              <div className="relative h-[240px] sm:h-auto sm:w-[40%] shrink-0 p-3 sm:p-0">
                <div className="relative w-full h-full rounded-[10px] sm:rounded-none overflow-hidden min-h-[170px]">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                  {/* Red Date Box */}
                  <div className="absolute top-3 left-3 bg-[#e60000] text-white text-center rounded-[8px] py-1.5 px-2.5 min-w-[60px] shadow-md z-10 group-hover:-translate-y-1 transition-transform duration-300">
                    <span className="block text-[22px] font-bold leading-none mb-1">{event.date}</span>
                    <span className="block text-[9.5px] font-bold tracking-wider">{event.month}</span>
                  </div>
                </div>
              </div>
              
              {/* Content side */}
              <div className="p-5 sm:p-6 sm:py-5 flex flex-col justify-center relative w-full sm:w-[60%] h-full">
                {/* Faint leaf shape in top right */}
                <div className="absolute top-0 right-0 text-[#fde8eb] opacity-90 pointer-events-none rounded-tr-[12px] overflow-hidden">
                   <svg viewBox="0 0 24 24" width="70" height="70" fill="currentColor" className="transform translate-x-3 -translate-y-3 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                     <path d="M22 2C22 2 14 2 8 8C2 14 2 22 2 22C2 22 10 22 16 16C22 10 22 2 22 2Z"/>
                   </svg>
                </div>

                <div className="text-[10px] font-bold tracking-widest uppercase text-[#e60000] mb-1.5 relative z-10">
                  {event.category}
                </div>
                
                <h3 className="text-[15px] lg:text-[17px] font-bold text-[#1b2a4b] group-hover:text-[#e60000] transition-colors duration-300 mb-2 leading-[1.3] pr-2 relative z-10">
                  {event.title}
                </h3>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-[#5e6a7c] mb-2 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#e60000]" strokeWidth={2} />
                    <span>{event.full_date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#e60000]" strokeWidth={2.5} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-[13px] text-[#5e6a7c] leading-[1.6] mb-4 pr-2 relative z-10">
                  {event.description}
                </p>
                
                <span className="flex items-center gap-1.5 text-[#1b2a4b] font-bold text-[13px] group-hover:text-[#e60000] transition-colors w-fit relative z-10">
                  {event.read_more_text}
                  <ArrowRight className="w-4 h-4 text-[#e60000] group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={2.5} />
                </span>
              </div>

            </Link>
            </motion.div>
          ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 lg:py-20 text-center bg-white rounded-[12px] border border-gray-100 shadow-sm mb-12">
            <div className="w-16 h-16 bg-[#fff5f6] rounded-full flex items-center justify-center mb-4 text-[#e60000]">
              <Calendar className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[20px] lg:text-[22px] font-bold text-[#1b2a4b] mb-2">No Events Found</h3>
            <p className="text-[#5e6a7c] text-[14px] lg:text-[15px] max-w-md mx-auto">There are currently no events scheduled for the '{activeCategory}' category. Please check back later or explore other categories.</p>
          </div>
        )}

        {/* View All Button */}
        {!showFilters && (
          <motion.div 
            className="flex justify-center mt-4"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <button className="bg-[#fde8eb] text-[#e60000] px-8 py-3.5 rounded-[8px] font-bold text-[15px] hover:bg-[#e60000] hover:text-white transition-all duration-300 flex items-center gap-2 group/btn shadow-sm hover:shadow-md hover:shadow-red-600/20">
              {data.button_text} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
