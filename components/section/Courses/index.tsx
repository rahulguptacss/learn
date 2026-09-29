"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CoursesData } from '../../types';
import { getCourseSlug } from '@/lib/course';
import { Users, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Courses({ data, mode = 'slider' }: { data: CoursesData; mode?: 'slider' | 'grid' }) {
  // Duplicate list for slider; for grid use original only
  const courses = [...data.list, ...data.list.map(c => ({ ...c, id: c.id + '_2' }))];
  const gridCourses = data.list;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updatePages = () => {
      if (scrollRef.current) {
        const item = scrollRef.current.children[0] as HTMLElement;
        if (item) {
          const containerWidth = scrollRef.current.clientWidth;
          const itemWidth = item.offsetWidth;
          const visibleCount = Math.round(containerWidth / (itemWidth + 16)) || 1;
          setTotalPages(Math.ceil(courses.length / visibleCount));
        }
      }
    };
    updatePages();
    window.addEventListener('resize', updatePages);
    return () => window.removeEventListener('resize', updatePages);
  }, [courses.length]);

  useEffect(() => {
    if (mode !== 'slider' || totalPages <= 1 || isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const clientWidth = scrollRef.current.clientWidth;
        const scrollLeft = scrollRef.current.scrollLeft;
        const maxScroll = scrollRef.current.scrollWidth - clientWidth;
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [totalPages, isPaused, mode]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const clientWidth = scrollRef.current.clientWidth;
      setActiveIndex(Math.round(scrollLeft / clientWidth));
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: scrollRef.current.clientWidth * index, behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    if (activeIndex < totalPages - 1) scrollToIndex(activeIndex + 1);
    else scrollToIndex(0);
  };

  const prevSlide = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  // ─── Shared Card Component ────────────────────────────────────
  const CourseCard = ({ course, idx }: { course: typeof gridCourses[0]; idx: number }) => (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col h-full">
      <div className="relative h-[180px] w-full overflow-hidden">
        <Image
          src={`/courses/${(idx % 4) + 1}.png`}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-0 right-0 bg-[#e60000] text-white font-semibold px-4 py-1.5 rounded-bl-[16px] text-[14px] z-10">
          {course.price}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/courses/${getCourseSlug(course)}`}>
          <h3 className="text-[16.5px] font-bold text-[#1b2a4b] leading-tight hover:text-[#e60000] transition-colors">
            {course.title}
          </h3>
        </Link>
        <div className="w-9 h-[2px] bg-[#e60000] mt-1.5 mb-2.5"></div>
        <p className="text-[#5a6779] text-[13px] leading-[1.45] mb-4 flex-1 line-clamp-2 min-h-[38px]">
          {course.description}
        </p>
        <div className="flex items-center gap-3 text-[13px] font-semibold text-[#1b2a4b] mb-4">
          <div className="flex items-center gap-2">
            <Copy className="w-4 h-4" />
            <span>{course.lessons}</span>
          </div>
          <div className="text-gray-300">|</div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{course.students.replace('Students', 'Learners')}</span>
          </div>
        </div>
        <Link
          href={`/courses/${getCourseSlug(course)}`}
          className="w-full bg-[#1b2a4b] text-white py-2.5 rounded-[6px] text-[14px] font-semibold hover:bg-[#111e3b] transition cursor-pointer mt-auto text-center"
        >
          View Details →
        </Link>
      </div>
    </div>
  );

  // ─── GRID MODE (Courses Page) ─────────────────────────────────
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalGridPages = Math.ceil(gridCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = gridCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalGridPages) setCurrentPage(page);
  };

  if (mode === 'grid') {
    return (
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-10"
          >
            <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#8e98a8] mb-3">
              {data.subtitle}
            </h4>
            <h2 className="text-[32px] lg:text-[40px] font-bold text-[#1b2a4b] leading-tight">
              {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
            </h2>
            <div className="w-14 h-[3px] bg-[#e60000] mt-5"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
              >
                <CourseCard course={course} idx={idx} />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalGridPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-2 mt-12"
            >
              {/* Prev */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-11 h-11 flex items-center justify-center rounded-lg border text-[15px] font-semibold transition-all cursor-pointer ${
                  currentPage === 1
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white'
                    : 'border-gray-200 text-gray-500 bg-white hover:border-[#e60000] hover:text-[#e60000]'
                }`}
              >
                «
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalGridPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-11 h-11 flex items-center justify-center rounded-lg border text-[15px] font-semibold transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-[#e60000] border-[#e60000] text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#e60000] hover:text-[#e60000]'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalGridPages}
                className={`w-11 h-11 flex items-center justify-center rounded-lg border text-[15px] font-semibold transition-all cursor-pointer ${
                  currentPage === totalGridPages
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white'
                    : 'border-gray-200 text-gray-500 bg-white hover:border-[#e60000] hover:text-[#e60000]'
                }`}
              >
                »
              </button>
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // ─── SLIDER MODE (Homepage) ───────────────────────────────────
  return (
    <section className="py-12 lg:py-16 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#8e98a8] mb-3">
              {data.subtitle}
            </h4>
            <h2 className="text-[32px] lg:text-[40px] font-bold text-[#1b2a4b] leading-tight">
              {data.title_line1} <span className="text-[#e60000]">{data.title_highlight}</span>
            </h2>
            <div className="w-14 h-[3px] bg-[#e60000] mt-5"></div>
          </div>
          <Link href="/courses">
            <button className="bg-[#fff0f0] text-[#e60000] px-6 py-2.5 rounded-full font-bold text-[14px] flex items-center gap-2 hover:bg-[#ffe0e0] transition cursor-pointer shrink-0">
              {data.button_text} &rarr;
            </button>
          </Link>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mb-8 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courses.map((course, idx) => (
              <div
                key={course.id}
                className="snap-start shrink-0 w-full sm:w-[calc(50%-6px)] lg:w-[calc(25%-9px)]"
              >
                <CourseCard course={course} idx={idx} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-5 mt-8"
        >
          <button
            onClick={prevSlide}
            disabled={activeIndex === 0}
            className={`w-10 h-10 rounded-full shadow-sm border flex items-center justify-center transition cursor-pointer ${
              activeIndex === 0
                ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-white border-gray-200 text-gray-500 hover:text-[#1b2a4b] hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            {Array.from({ length: totalPages || 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`rounded-full transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'w-2.5 h-2.5 bg-[#e60000]'
                    : 'w-2.5 h-2.5 bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={activeIndex >= totalPages - 1}
            className={`w-10 h-10 rounded-full shadow-sm border flex items-center justify-center transition cursor-pointer ${
              activeIndex >= totalPages - 1
                ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                : 'bg-white border-gray-200 text-gray-500 hover:text-[#1b2a4b] hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

      </div>
    </section>
  );
}
