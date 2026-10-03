"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryData } from '../../types';
import { Search, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

export default function Gallery({
  data,
  variant = 'home',
}: {
  data: GalleryData;
  variant?: 'home' | 'page';
}) {
  const [activeTab, setActiveTab] = useState("All");
  const isPage = variant === 'page';
  const [visibleCount, setVisibleCount] = useState(isPage ? data.list.length : 8);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = activeTab === "All" 
    ? data.list 
    : data.list.filter(item => item.category === activeTab);

  const handleNext = React.useCallback(() => {
    setSelectedIndex(prev => prev !== null ? (prev === filteredImages.length - 1 ? 0 : prev + 1) : null);
  }, [filteredImages.length]);

  const handlePrev = React.useCallback(() => {
    setSelectedIndex(prev => prev !== null ? (prev === 0 ? filteredImages.length - 1 : prev - 1) : null);
  }, [filteredImages.length]);

  // Prevent scrolling and add keyboard nav when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedIndex(null);
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedIndex, handleNext, handlePrev]);

  const displayedImages = filteredImages.slice(0, visibleCount);
  const currentModalItem = selectedIndex !== null ? filteredImages[selectedIndex] : filteredImages[0];

  return (
    <section className={`py-12 lg:py-16 ${isPage ? 'bg-[#fffafa]' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          className={`mb-10 lg:mb-14 ${isPage ? 'text-center max-w-[640px] mx-auto' : 'max-w-3xl'}`}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {isPage ? (
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 sm:w-10 h-[2px] bg-[#e60000]" />
              <p className="text-[#e60000] text-[12px] sm:text-[13px] font-bold tracking-[0.22em] uppercase">
                {data.subtitle}
              </p>
              <span className="w-8 sm:w-10 h-[2px] bg-[#e60000]" />
            </div>
          ) : (
            <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] mb-2 text-[#8e98a8]">
              {data.subtitle}
            </h4>
          )}
          <h2 className={`${isPage ? 'text-[28px] sm:text-[40px] lg:text-[46px] font-extrabold text-[#0f2040] leading-[1.15] tracking-tight mb-4' : 'text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold leading-[1.1] text-[#1b2a4b] tracking-tight mb-3'}`}>
            {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
          </h2>
          {!isPage && <div className="w-[50px] h-[3px] bg-[#e60000] mb-4"></div>}
          
          <div className={`${isPage ? 'mt-3 text-[14.5px] sm:text-[16px] text-[#7b8799] leading-[1.7]' : 'text-[15px] lg:text-[16px] text-[#5e6a7c] leading-[1.6]'}`}>
            {data.description.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          className={`flex flex-wrap gap-3 sm:gap-4 mb-10 ${isPage ? 'justify-center' : ''}`}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {data.categories.map((cat, idx) => (
            <button 
              key={idx} 
              onClick={() => {
                setActiveTab(cat);
                setVisibleCount(isPage ? 99 : 8);
              }}
              className={`px-5 py-2 text-[14px] font-medium transition-all ${
                isPage ? 'rounded-full' : 'rounded-[6px] px-7 py-2.5 text-[15px]'
              } ${
                activeTab === cat 
                  ? 'bg-[#e60000] text-white shadow-[0_4px_15px_rgba(230,0,0,0.25)] border-transparent' 
                  : 'bg-white text-[#5e6a7c] border border-gray-200 hover:border-[#1b2a4b] hover:text-[#1b2a4b] hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12"
          layout
        >
          <AnimatePresence mode="popLayout">
            {displayedImages.map((item, index) => (
              <motion.div 
                key={item.id}
                layout
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setSelectedIndex(index)}
                className="relative h-[200px] w-full rounded-[10px] overflow-hidden group shadow-[0_5px_15px_rgba(0,0,0,0.05)] cursor-pointer"
              >
                <Image 
                  src={item.image} 
                  alt={item.category} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Overlay on hover (optional to improve visibility if needed) */}
                <div className="absolute inset-0 bg-[#1b2a4b]/0 group-hover:bg-[#1b2a4b]/10 transition-colors duration-300"></div>

                {!isPage && (
                  <>
                {/* Bottom Left Category Label (Always Visible) */}
                <div className="absolute bottom-3 left-3 bg-[#1b2a4b]/90 text-white text-[12px] font-medium px-3 py-1.5 rounded-[4px] border-l-[3px] border-[#e60000] z-10 backdrop-blur-sm group-hover:-translate-y-1 transition-transform duration-300">
                  {item.category}
                </div>

                {/* Bottom Right Search Icon (Always Visible) */}
                <div className="absolute bottom-3 right-3 w-[30px] h-[30px] bg-white/95 rounded-full flex items-center justify-center text-[#1b2a4b] shadow-md z-10 hover:bg-[#e60000] hover:text-white transition-colors duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <Search className="w-3.5 h-3.5" strokeWidth={2.5} />
                </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Load More Button */}
        {data.button_text && !isPage && visibleCount < filteredImages.length && (
          <motion.div 
            className="flex justify-center mt-12"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="bg-[#e60000] text-white px-8 py-3.5 rounded-[8px] font-medium hover:bg-[#cc0000] transition flex items-center gap-3 group/btn shadow-md hover:shadow-xl hover:shadow-red-600/20"
            >
              {data.button_text} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </button>
          </motion.div>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1b2a4b]/95 p-4 sm:p-8 backdrop-blur-sm"
          >
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 sm:top-8 sm:right-8 text-white/70 hover:text-white hover:scale-110 hover:rotate-90 transition-all z-[110] bg-white/10 rounded-full p-2"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 transition-all z-[110] bg-white/10 hover:bg-white/20 rounded-full p-3 hidden sm:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-110 transition-all z-[110] bg-white/10 hover:bg-white/20 rounded-full p-3 hidden sm:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative w-full max-w-6xl h-[75vh] sm:h-[85vh] overflow-hidden drop-shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            >
              <Image 
                src={currentModalItem.image}
                alt={currentModalItem.category}
                fill
                className="object-contain"
              />

              {/* Mobile controls inside the image area */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-center sm:hidden bg-gradient-to-t from-black/50 to-transparent">
                <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="text-white p-2 bg-white/20 rounded-full">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="text-white text-sm font-medium">{selectedIndex + 1} / {filteredImages.length}</div>
                <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="text-white p-2 bg-white/20 rounded-full">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
