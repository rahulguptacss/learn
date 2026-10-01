"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TestimonialsData, TestimonialItem } from '../../types';
import { Quote, Star, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative border border-gray-100/50 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-300 h-full">
      <div className="absolute top-5 right-5 text-[#ffe5e8] pointer-events-none">
        <Quote size={48} fill="currentColor" strokeWidth={0} />
      </div>
      <div className="flex items-center gap-4 mb-5 relative z-10">
        <div className="relative w-[62px] h-[62px] rounded-full overflow-hidden shadow-sm shrink-0">
          <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-[16px] font-bold text-[#1b2a4b] mb-0.5">{testimonial.name}</h4>
          <p className="text-[13px] text-[#5e6a7c] mb-1.5">{testimonial.role}</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(testimonial.rating)
                    ? 'fill-[#ffb800] text-[#ffb800]'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-[#5e6a7c] text-[14.5px] leading-[1.75] relative z-10">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </div>
  );
}

export default function Testimonials({
  data,
  variant = 'home',
}: {
  data: TestimonialsData;
  variant?: 'home' | 'page';
}) {
  const isPage = variant === 'page';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [page, setPage] = useState(0);

  const totalOriginalItems = data.list.length;
  const extendedList = [...data.list, ...data.list];
  const perPage = 9;
  const pageList = isPage
    ? Array.from({ length: perPage * 3 }, (_, i) => ({
        ...data.list[i % data.list.length],
        id: `${data.list[i % data.list.length].id}-${i}`,
      }))
    : data.list;
  const totalPages = Math.max(1, Math.ceil(pageList.length / perPage));
  const pagedItems = pageList.slice(page * perPage, page * perPage + perPage);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  useEffect(() => {
    if (isPage) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPage]);

  useEffect(() => {
    if (isPage) return;
    if (currentIndex === totalOriginalItems) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, totalOriginalItems, isPage]);

  const handleDotClick = (idx: number) => {
    setIsTransitioning(true);
    setCurrentIndex(idx);
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-[#ffffff] to-[#fff5f7] relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none -translate-y-1/4 translate-x-1/4 z-0 hidden lg:block text-[#e60000]">
        <GraduationCap size={400} strokeWidth={1} />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-[1300px] relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 relative">
          <div className="max-w-3xl relative z-10">
            <h4 className="text-[14px] font-semibold uppercase tracking-[0.25em] text-[#8e98a8] mb-1.5">
              {data.subtitle}
            </h4>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] text-[#1b2a4b] tracking-tight mb-3">
              {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
            </h2>
            <div className="w-[50px] h-[3px] bg-[#e60000] mb-4" />
            <div className="text-[15px] lg:text-[16px] text-[#5e6a7c] leading-[1.6]">
              {data.description.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 left-[60%] -translate-y-1/2 text-[#ffe5e8] opacity-80 pointer-events-none z-0 hidden lg:block">
            <Quote size={180} fill="currentColor" strokeWidth={0} />
          </div>
        </div>

        {isPage ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
              {pagedItems.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            <div className="flex justify-center items-center gap-2 mt-10 relative z-10">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-9 h-9 rounded-md border border-[#eadfe3] text-[#8a96a8] disabled:opacity-40 hover:border-[#e60000] hover:text-[#e60000] flex items-center justify-center bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPage(idx)}
                  className={`w-9 h-9 rounded-md text-[14px] font-semibold ${
                    page === idx
                      ? 'bg-[#e60000] text-white'
                      : 'bg-white border border-[#eadfe3] text-[#5e6a7c] hover:border-[#e60000]'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="w-9 h-9 rounded-md border border-[#eadfe3] text-[#8a96a8] disabled:opacity-40 hover:border-[#e60000] hover:text-[#e60000] flex items-center justify-center bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="overflow-hidden relative z-10 -mx-2 py-4">
              <div
                className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-out' : ''}`}
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {extendedList.map((testimonial, idx) => (
                  <div key={`${testimonial.id}-${idx}`} className="px-2" style={{ flex: `0 0 ${100 / itemsPerView}%` }}>
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden sm:flex flex-wrap justify-center items-center gap-2 mt-8 relative z-10 px-2">
              {[...Array(totalOriginalItems)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentIndex % totalOriginalItems === idx ? 'bg-[#e60000]' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
