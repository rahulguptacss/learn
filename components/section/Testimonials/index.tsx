"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TestimonialsData } from '../../types';
import { Quote, Star, GraduationCap } from 'lucide-react';

export default function Testimonials({ data }: { data: TestimonialsData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalOriginalItems = data.list.length;
  // Duplicate the list to allow seamless infinite scrolling
  const extendedList = [...data.list, ...data.list];

  // Update itemsPerView based on window width
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    
    // Initial check
    updateItemsPerView();
    
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Handle infinite loop snap-back
  useEffect(() => {
    if (currentIndex === totalOriginalItems) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700); // Wait for the 700ms transition to finish
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalOriginalItems]);

  const handleDotClick = (idx: number) => {
    setIsTransitioning(true);
    setCurrentIndex(idx);
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-[#ffffff] to-[#fff5f7] relative overflow-hidden">
      {/* Background Graduation Cap */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none -translate-y-1/4 translate-x-1/4 z-0 hidden lg:block text-[#e60000]">
        <GraduationCap size={400} strokeWidth={1} />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1300px] relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 relative">
          <div className="max-w-3xl relative z-10">
            <h4 className="text-[14px] font-semibold uppercase tracking-[0.25em] text-[#8e98a8] mb-1.5">
              {data.subtitle}
            </h4>
            <h2 className="text-[36px] lg:text-[44px] font-bold leading-[1.1] text-[#1b2a4b] tracking-tight mb-3">
              {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
            </h2>
            <div className="w-[50px] h-[3px] bg-[#e60000] mb-4"></div>
            <div className="text-[15px] lg:text-[16px] text-[#5e6a7c] leading-[1.6]">
              {data.description.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          {/* Large Quote Icon in Header */}
          <div className="absolute top-1/2 left-[60%] -translate-y-1/2 text-[#ffe5e8] opacity-80 pointer-events-none z-0 hidden lg:block">
            <Quote size={180} fill="currentColor" strokeWidth={0} />
          </div>
        </div>

        {/* Testimonial Cards Carousel */}
        <div className="overflow-hidden relative z-10 -mx-2 py-4">
          <div 
            className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-out' : ''}`}
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {extendedList.map((testimonial, idx) => (
              <div 
                key={`${testimonial.id}-${idx}`} 
                className="px-2" 
                style={{ flex: `0 0 ${100 / itemsPerView}%` }}
              >
                <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative border border-gray-100/50 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-300 h-full">
                  
                  {/* Faint Background Quote in Card */}
                  <div className="absolute top-6 right-6 text-[#ffe5e8] pointer-events-none">
                    <Quote size={50} fill="currentColor" strokeWidth={0} />
                  </div>

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden shadow-sm">
                      <Image 
                        src={testimonial.image || `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200`} 
                        alt={testimonial.name} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="text-[17px] font-bold text-[#1b2a4b] mb-1">{testimonial.name}</h4>
                      <p className="text-[13px] text-[#5e6a7c] mb-2">{testimonial.role}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(testimonial.rating) ? 'fill-[#ffb800] text-[#ffb800]' : 'fill-gray-200 text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[#5e6a7c] text-[15px] leading-[1.8] relative z-10">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8 relative z-10">
          {[...Array(totalOriginalItems)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                (currentIndex % totalOriginalItems) === idx ? 'bg-[#e60000]' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
