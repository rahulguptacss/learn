"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import siteData from '@/components/data/data.json';
import { SiteData, TeacherDetailData, TeacherItem } from '../../types';

function AnimatedStat({ value }: { value: string }) {
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
    setCount(0);
    setIsVisible(false);
  }, [value]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  React.useEffect(() => {
    if (!isVisible || !hasNumber) return;
    let startTimestamp: number | null = null;
    const duration = 1800;
    let raf = 0;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * numericPart);
      if (progress < 1) raf = window.requestAnimationFrame(step);
      else setCount(numericPart);
    };
    raf = window.requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, numericPart, hasNumber]);

  if (!hasNumber) return <span>{value}</span>;

  let displayCount = isFloat ? count.toFixed(1) : Math.floor(count).toString();
  if (hasComma && !isFloat) {
    displayCount = Math.floor(count).toLocaleString('en-US');
  }

  return (
    <span ref={ref}>
      {displayCount}
      {suffixPart}
    </span>
  );
}

const teachers =
  (siteData as SiteData).categories.Education.templateComponents['template-1'].sections
    .teachers.list;

export default function TeacherDetail({
  teacherId,
  labels,
}: {
  teacherId: string;
  labels: TeacherDetailData;
}) {
  const teacher =
    teachers.find((item) => item.id === teacherId || item.slug === teacherId) ||
    ({} as TeacherItem);

  const parts = (teacher.name || '').trim().split(/\s+/);
  const last = parts.pop() || teacher.name;
  const first = parts.join(' ');
  const stats = teacher.stats || [];
  const courses = teacher.courses_taught || [];

  return (
    <section className="bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl py-8 sm:py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] gap-6 sm:gap-8 lg:gap-14 items-start">
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-[420px] mx-auto lg:max-w-none lg:mx-0 rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(16,27,41,0.08)] bg-white"
          >
            <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] bg-[#f7c4d2]">
              <Image
                src={teacher.image}
                alt={teacher.name}
                fill
                sizes="(max-width: 1024px) 100vw, 380px"
                className="object-cover object-top"
                priority
              />
            </div>
            <div className="bg-[#fff3f5] px-4 sm:px-6 py-5 sm:py-6">
              <a
                href={`tel:${(teacher.phone || '').replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-[14px] sm:text-[14.5px] text-[#2c3e50] mb-3.5 hover:text-[#e60000]"
              >
                <Phone className="w-[18px] h-[18px] text-[#e60000] shrink-0" strokeWidth={2} />
                <span className="min-w-0 break-words">{teacher.phone}</span>
              </a>
              <a
                href={`mailto:${teacher.email}`}
                className="flex items-center gap-3 text-[14px] sm:text-[14.5px] text-[#2c3e50] mb-3.5 hover:text-[#e60000]"
              >
                <Mail className="w-[18px] h-[18px] text-[#e60000] shrink-0" strokeWidth={2} />
                <span className="min-w-0 break-words">{teacher.email}</span>
              </a>
              <p className="flex items-center gap-3 text-[14px] sm:text-[14.5px] text-[#2c3e50] mb-5 sm:mb-6">
                <MapPin className="w-[18px] h-[18px] text-[#e60000] shrink-0" strokeWidth={2} />
                <span className="min-w-0 break-words">{teacher.location}</span>
              </p>
              <Link
                href={labels.button_href}
                className="block text-center bg-[#c4121a] hover:bg-[#a80f16] text-white font-semibold text-[14.5px] sm:text-[15px] py-3 rounded-lg transition-colors w-full"
              >
                {labels.button_text}
              </Link>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="min-w-0"
          >
            <p className="text-[#e60000] text-[11px] sm:text-[12px] font-bold tracking-[0.14em] sm:tracking-[0.22em] uppercase mb-2 sm:mb-3">
              {labels.badge}
            </p>
            <h2 className="text-[26px] sm:text-[32px] md:text-[42px] lg:text-[46px] font-extrabold leading-[1.2] tracking-tight mb-2">
              {first ? (
                <>
                  <span className="text-[#0f2040]">{first} </span>
                  <span className="text-[#e60000]">{last}</span>
                </>
              ) : (
                <span className="text-[#e60000]">{last}</span>
              )}
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[#8a96a8] font-medium mb-3 sm:mb-4">{teacher.role}</p>
            <p className="text-[14.5px] sm:text-[15px] md:text-[16px] text-[#5b6b85] leading-[1.8] max-w-[720px] mb-6 sm:mb-8">
              {teacher.bio || teacher.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden bg-[#fff3f5] mb-8 sm:mb-10">
              {stats.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className={`py-4 sm:py-5 px-2 sm:px-3 text-center ${
                    idx % 2 === 1 ? 'border-l border-[#f3d5db]' : ''
                  } ${idx < 2 ? 'border-b border-[#f3d5db] md:border-b-0' : ''} ${
                    idx > 0 ? 'md:border-l md:border-[#f3d5db]' : ''
                  }`}
                >
                  <p className="text-[22px] sm:text-[26px] md:text-[28px] font-extrabold text-[#e60000] leading-none mb-1.5">
                    <AnimatedStat value={stat.value} />
                  </p>
                  <p className="text-[11px] sm:text-[13px] text-[#7b8799] leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            <h3 className="text-[20px] sm:text-[24px] md:text-[26px] font-extrabold text-[#0f2040] mb-4 sm:mb-5">
              {labels.courses_title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {courses.map((course) => {
                const className =
                  'flex items-center justify-between gap-3 bg-white border border-[#eef1f6] rounded-lg px-3.5 sm:px-4 py-3 sm:py-3.5 text-[13.5px] sm:text-[14.5px] font-medium text-[#1b2a4b] hover:border-[#e60000]/30 hover:text-[#e60000] transition-colors shadow-[0_2px_10px_rgba(16,27,41,0.03)] min-w-0';
                const inner = (
                  <>
                    <span className="min-w-0 leading-snug">{course.title}</span>
                    <ChevronRight className="w-4 h-4 text-[#c9d2de] shrink-0" />
                  </>
                );
                if (course.href) {
                  return (
                    <Link key={course.title} href={course.href} className={className}>
                      {inner}
                    </Link>
                  );
                }
                return (
                  <div key={course.title} className={className}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
