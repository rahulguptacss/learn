"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CourseDetailData, CourseItem } from '../../types';

function SectionBlock({
  title,
  paragraphs,
  showDivider,
}: {
  title: string;
  paragraphs: string[];
  showDivider?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={showDivider ? 'pb-10 mb-10 border-b border-[#e8edf3]' : ''}
    >
      <h3 className="text-[28px] md:text-[32px] font-extrabold text-[#1b2a4b] leading-tight">
        {title}
      </h3>
      <div className="w-11 h-[3px] bg-[#e60000] mt-2.5 mb-4" />
      <div className="space-y-2.5">
        {paragraphs.map((paragraph, idx) => (
          <p
            key={idx}
            className="text-[#5b6b85] text-[16px] md:text-[17px] leading-[1.7] font-normal"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export default function CourseDetail({
  course,
  labels,
}: {
  course: CourseItem;
  labels: CourseDetailData;
}) {
  const about = course.about || [];
  const description = course.long_description || about;
  const words = course.title.trim().split(/\s+/);
  const highlight = course.title_highlight || words[words.length - 1];
  const line1 = course.title_line1 || words.slice(0, -1).join(' ');

  return (
    <section className="bg-white">
      <div className="container mx-auto px-5 md:px-8 max-w-7xl pt-12 pb-8 lg:pt-16 lg:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.08fr] gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:pr-4"
          >
            <p className="text-[#e60000] text-[13px] font-bold tracking-[0.18em] uppercase mb-4">
              {labels.badge}
            </p>
            <h2 className="text-[40px] md:text-[48px] lg:text-[52px] font-bold text-[#1b2a4b] leading-[1.08] tracking-[-0.02em] mb-5">
              {line1 ? (
                <>
                  {line1}{' '}
                  <span className="text-[#e60000]">{highlight}</span>
                </>
              ) : (
                <span className="text-[#e60000]">{highlight}</span>
              )}
            </h2>
            <p className="text-[#5b6b85] text-[16px] md:text-[17px] leading-[1.75] max-w-[500px] mb-8">
              {course.intro || course.description}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#e60000] hover:bg-[#cc0000] text-white px-8 py-[13px] rounded-lg text-[15px] font-semibold transition"
            >
              {labels.enroll_text}
              <span className="text-[16px] leading-none">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative w-full aspect-[16/11] min-h-[260px] lg:min-h-[360px] rounded-[14px] overflow-hidden"
          >
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 580px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-8 max-w-7xl pb-16 lg:pb-20">
        <SectionBlock title={labels.about_title} paragraphs={about} showDivider />
        <SectionBlock title={labels.description_title} paragraphs={description} />
      </div>
    </section>
  );
}
