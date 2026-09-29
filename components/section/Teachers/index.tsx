"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TeachersData } from '../../types';
import { getTeacherSlug } from '@/lib/teacher';

export default function Teachers({ data }: { data: TeachersData }) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-12"
        >
          <p className="text-[#e60000] text-[11px] sm:text-[12px] font-bold tracking-[0.14em] sm:tracking-[0.18em] uppercase mb-2">
            {data.subtitle}
          </p>
          <h2 className="text-[28px] sm:text-[34px] md:text-[46px] lg:text-[52px] font-extrabold text-[#0f2040] leading-[1.15] tracking-tight px-1">
            {data.title_line1}{' '}
            <span className="text-[#e60000]">{data.title_highlight}</span>
          </h2>
          <div className="w-10 h-[2px] bg-[#e60000] mx-auto mt-2.5 mb-4" />
          <p className="text-[14.5px] md:text-[15px] text-[#7b8799] max-w-[520px] mx-auto leading-[1.75]">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {data.list.map((teacher) => (
            <motion.article
              key={teacher.id}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(16,27,41,0.07)] overflow-hidden"
            >
              <Link href={`/teacher-detail/${getTeacherSlug(teacher)}`} className="block">
              <div className="relative h-[200px] bg-[#f8c9d4] overflow-hidden">
                <div className="absolute right-[-20px] bottom-[-30px] w-[160px] h-[160px] rounded-full bg-[#fde3e9]" />
                <div className="absolute left-[-40px] top-[-40px] w-[120px] h-[120px] rounded-full bg-[#fde3e9]" />
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="object-cover object-top z-[1]"
                />
              </div>
              <div className="px-5 pt-5 pb-6">
                <h3 className="text-[17px] font-extrabold text-[#1b2a4b] leading-snug mb-1">
                  {teacher.name}
                </h3>
                <p className="text-[13.5px] font-medium text-[#8a96a8] mb-2">
                  {teacher.role}
                </p>
                <div className="w-8 h-[2.5px] bg-[#e60000] mb-3" />
                <p className="text-[13.5px] text-[#5b6b85] leading-[1.65]">
                  {teacher.description}
                </p>
              </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
