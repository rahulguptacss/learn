"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  FileUp,
  Users,
  Mail,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { AdmissionData } from '../../types';

const ease = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-8 h-8 sm:w-9 sm:h-9" strokeWidth={1.7} />,
  FileUp: <FileUp className="w-8 h-8 sm:w-9 sm:h-9" strokeWidth={1.7} />,
  Users: <Users className="w-8 h-8 sm:w-9 sm:h-9" strokeWidth={1.7} />,
  Mail: <Mail className="w-8 h-8 sm:w-9 sm:h-9" strokeWidth={1.7} />,
  GraduationCap: <GraduationCap className="w-8 h-8 sm:w-9 sm:h-9" strokeWidth={1.7} />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export default function AdmissionProcess({ data }: { data: AdmissionData }) {
  return (
    <section className="bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl py-8 sm:py-12 lg:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          className="text-center mb-8 sm:mb-12 lg:mb-14"
        >
          <h2 className="text-[24px] sm:text-[32px] md:text-[42px] font-extrabold text-[#0f2040] leading-[1.25] tracking-tight px-1">
            {data.title_line1}{' '}
            <span className="text-[#e60000]">{data.title_highlight}</span>
          </h2>
          <p className="mt-3 text-[14px] sm:text-[16px] text-[#7b8799] max-w-2xl mx-auto leading-[1.7]">
            {data.description}
          </p>
        </motion.div>

        {/* Mobile / tablet timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="lg:hidden relative mb-10 sm:mb-12 pl-2"
        >
          <div className="absolute left-[47px] top-8 bottom-8 w-px border-l-2 border-dashed border-[#f5c5ce]" />
          <div className="flex flex-col gap-7">
            {data.steps.map((step) => (
              <motion.div
                key={step.number}
                variants={{
                  hidden: { opacity: 0, x: -22 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
                }}
                className="relative flex items-start gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="relative z-[1] w-[84px] h-[84px] shrink-0 rounded-full bg-[#fff1f4] flex flex-col items-center justify-center text-[#e60000] shadow-[0_6px_18px_rgba(230,0,0,0.06)]"
                >
                  {icons[step.icon] || icons.FileText}
                  <span className="text-[11px] font-bold text-[#d48a96] mt-0.5 tracking-wide">
                    {step.number}
                  </span>
                </motion.div>
                <div className="pt-3 min-w-0 pr-1">
                  <h3 className="text-[16px] font-extrabold text-[#0f2040] leading-snug mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] text-[#7b8799] leading-[1.65]">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop stepper */}
        <div className="hidden lg:block relative mb-16">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="absolute top-[48px] left-[8%] right-[8%] origin-left border-t-2 border-dashed border-[#f5c5ce]"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid grid-cols-5 gap-4"
          >
            {data.steps.map((step) => (
              <motion.div
                key={step.number}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                }}
                className="relative text-center px-2"
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="relative z-[1] mx-auto mb-4 w-[96px] h-[96px] rounded-full bg-[#fff1f4] flex flex-col items-center justify-center text-[#e60000] pt-1 shadow-[0_8px_22px_rgba(230,0,0,0.06)] cursor-default"
                >
                  {icons[step.icon] || icons.FileText}
                  <span className="text-[12px] font-bold text-[#d48a96] mt-0.5 tracking-wide">
                    {step.number}
                  </span>
                </motion.div>
                <h3 className="text-[16px] font-extrabold text-[#0f2040] leading-snug mb-2 max-w-[180px] mx-auto">
                  {step.title}
                </h3>
                <p className="text-[13.5px] text-[#7b8799] leading-[1.65] max-w-[200px] mx-auto">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease }}
            className="relative rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[320px] lg:min-h-[360px]"
          >
            <motion.div
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="absolute inset-0"
            >
              <Image
                src={data.community.image}
                alt={data.community.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="absolute left-3 right-3 sm:left-6 sm:right-auto sm:max-w-[320px] bottom-3 sm:bottom-6 bg-[#e60000] text-white rounded-2xl px-4 py-3.5 sm:px-6 sm:py-5 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] sm:text-[18px] font-extrabold leading-snug mb-1">
                    {data.community.title}
                  </p>
                  <p className="text-[12.5px] sm:text-[13px] text-white/90">{data.community.text}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease }}
            className="rounded-2xl bg-[#fff8f9] border border-[#fdecef] px-4 py-5 sm:px-8 sm:py-8"
          >
            <h3 className="text-[22px] sm:text-[28px] md:text-[30px] font-extrabold text-[#0f2040] leading-tight">
              {data.documents_title_line1}{' '}
              <span className="text-[#e60000]">{data.documents_title_highlight}</span>
            </h3>
            <p className="text-[13.5px] sm:text-[14px] text-[#7b8799] mt-2 mb-5 sm:mb-6 leading-relaxed">
              {data.documents_description}
            </p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 sm:gap-y-5"
            >
              {data.documents.map((doc) => (
                <motion.div
                  key={doc.title}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
                  }}
                  className="flex items-start gap-3 min-w-0"
                >
                  <span className="w-9 h-9 rounded-lg bg-[#fff3f5] text-[#e60000] flex items-center justify-center shrink-0">
                    <FileText className="w-[18px] h-[18px]" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13.5px] sm:text-[14px] font-bold text-[#0f2040] leading-snug">
                      {doc.title}
                    </p>
                    <p className="text-[12px] sm:text-[12.5px] text-[#8a96a8] mt-0.5">{doc.note}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="rounded-2xl bg-[#fff3f5] px-4 py-5 sm:px-8 sm:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="max-w-xl">
            <h3 className="text-[20px] sm:text-[26px] font-extrabold text-[#0f2040] leading-snug mb-2">
              {data.help_title_line1}{' '}
              <span className="text-[#e60000]">{data.help_title_highlight}</span>
            </h3>
            <p className="text-[13.5px] sm:text-[15px] text-[#7b8799] leading-[1.7]">
              {data.help_description}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full md:w-auto">
            <Link
              href={data.help_href}
              className="inline-flex items-center justify-center gap-2 bg-[#e60000] hover:bg-[#cc0000] text-white font-semibold text-[14px] sm:text-[15px] px-5 py-3 rounded-lg shrink-0 w-full md:w-auto"
            >
              {data.help_button}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
