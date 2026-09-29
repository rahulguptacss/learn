"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Monitor,
  BarChart3,
  BookOpen,
  Settings,
  FlaskConical,
  Users,
  Stethoscope,
  Award,
} from 'lucide-react';
import { ProgramsData } from '../../types';

const icons: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="w-[22px] h-[22px]" strokeWidth={2.2} />,
  BarChart3: <BarChart3 className="w-[22px] h-[22px]" strokeWidth={2.2} />,
  BookOpen: <BookOpen className="w-[22px] h-[22px]" strokeWidth={2.2} />,
  Settings: <Settings className="w-[22px] h-[22px]" strokeWidth={2.2} />,
  FlaskConical: <FlaskConical className="w-[22px] h-[22px]" strokeWidth={2.2} />,
  Users: <Users className="w-[22px] h-[22px]" strokeWidth={2.2} />,
  Stethoscope: <Stethoscope className="w-[22px] h-[22px]" strokeWidth={2.2} />,
  Award: <Award className="w-[22px] h-[22px]" strokeWidth={2.2} />,
};

export default function Programs({ data }: { data: ProgramsData }) {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-12 lg:pt-16 pb-8 lg:pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {data.list.map((program) => (
            <motion.article
              key={program.id}
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_8px_28px_rgba(16,27,41,0.06)] hover:shadow-[0_16px_40px_rgba(16,27,41,0.12)] flex flex-col"
            >
              <div className="relative h-[168px] w-full overflow-hidden rounded-t-2xl">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.45 }}
                >
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 280px"
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
                className="absolute top-[140px] left-5 z-10 w-[58px] h-[58px] rounded-full bg-white p-[5px] shadow-[0_6px_16px_rgba(16,27,41,0.1)]"
              >
                <div className="w-full h-full rounded-full bg-[#ffe4ea] text-[#e60000] flex items-center justify-center">
                  {icons[program.icon] || icons.Monitor}
                </div>
              </motion.div>
              <div className="px-5 pt-10 pb-5 flex flex-col flex-1">
                <h3 className="text-[17px] font-extrabold text-[#1b2a4b] mb-2 leading-snug">
                  {program.title}
                </h3>
                <p className="text-[13.5px] font-medium text-[#6b7789] leading-[1.55] mb-4 flex-1">
                  {program.description}
                </p>
                <Link
                  href={program.href}
                  className="text-[#e60000] text-[14px] font-semibold inline-flex items-center gap-1 hover:gap-1.5 transition-all"
                >
                  {program.button_text}
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
