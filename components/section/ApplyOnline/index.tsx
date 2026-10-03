"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  ShieldCheck,
  Clock,
  Users,
  User,
  Phone,
  Mail,
  MapPin,
  Send,
  CalendarDays,
  FileUp,
  Headphones,
  Upload,
} from 'lucide-react';
import { ApplyOnlineData } from '../../types';
import siteData from '@/components/data/data.json';
import { SiteData } from '../../types';

const ease = [0.22, 1, 0.36, 1] as const;

const featureIcons: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-8 h-8" strokeWidth={1.6} />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" strokeWidth={1.6} />,
  Clock: <Clock className="w-8 h-8" strokeWidth={1.6} />,
  Users: <Users className="w-8 h-8" strokeWidth={1.6} />,
};

const inputClass =
  'w-full h-[42px] border border-[#eceff4] rounded-[10px] px-3.5 text-[13px] text-[#1b2a4b] placeholder:text-[#b7bec9] bg-[#f7f8fb] focus:outline-none focus:bg-white focus:border-[#e60000] appearance-none';

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[13px] font-semibold text-[#1b2a4b] mb-1.5">
      {children}
      {required && <span className="text-[#e60000]"> *</span>}
    </label>
  );
}

function SectionTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[#e60000]">{icon}</span>
      <p className="text-[16px] font-extrabold text-[#1b2a4b]">{children}</p>
    </div>
  );
}

export default function ApplyOnline({ data }: { data: ApplyOnlineData }) {
  const template = (siteData as SiteData).categories.Education.templateComponents['template-1'].sections;
  const courses = template.courses.list.map((c) => c.title);
  const programs = template.programs.list.map((p) => p.title);

  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.08fr] gap-8 lg:gap-10 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -16 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
              }}
              className="flex items-center gap-2 mb-3"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="w-8 h-[3px] bg-[#e60000] origin-left"
              />
              <p className="text-[#e60000] text-[12px] font-bold tracking-[0.18em] uppercase">
                {data.badge}
              </p>
            </motion.div>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
              }}
              className="text-[28px] sm:text-[44px] md:text-[52px] font-extrabold text-[#0f2040] leading-[1.12] tracking-tight mb-4"
            >
              {data.title_line1}
              <br className="hidden sm:block" />
              {data.title_line2}{' '}
              <span className="text-[#e60000]">{data.title_highlight}</span>
            </motion.h2>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="text-[14.5px] sm:text-[15.5px] text-[#6b7789] leading-[1.75] max-w-[520px] mb-7"
            >
              {data.description}
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-2 sm:grid-cols-4 mb-8"
            >
              {data.features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.92 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease } },
                  }}
                  whileHover={{ y: -4 }}
                  className={`text-center px-2 sm:px-3 py-2 ${
                    idx % 2 === 1 ? 'max-sm:border-l max-sm:border-[#eceff4]' : ''
                  } ${idx > 0 ? 'sm:border-l sm:border-[#eceff4]' : ''}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -4 }}
                    className="w-[68px] h-[68px] rounded-full bg-[#fff1f4] text-[#e60000] flex items-center justify-center mx-auto mb-3"
                  >
                    {featureIcons[feature.icon] || featureIcons.GraduationCap}
                  </motion.div>
                  <p className="text-[14.5px] sm:text-[15px] font-extrabold text-[#0f2040] leading-snug mb-1 max-w-[110px] mx-auto">
                    {feature.title}
                  </p>
                  <p className="text-[12.5px] text-[#8a96a8] leading-snug max-w-[120px] mx-auto">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
              className="relative rounded-2xl overflow-hidden h-[240px] sm:h-[300px] bg-[#f8c9d4] mb-5"
            >
              <div className="absolute right-[-30px] bottom-[-40px] w-[180px] h-[180px] rounded-full bg-[#fde3e9]" />
              <motion.div
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="absolute inset-0 z-[1]"
              >
                <Image
                  src={data.image}
                  alt={data.title_line1}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover object-top"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08, ease }}
              className="rounded-2xl bg-[#fff4f6] border border-[#fde8ed] px-4 py-5 sm:px-6 sm:py-6 grid grid-cols-1 sm:grid-cols-[7fr_auto_3fr] gap-5 sm:gap-0 items-stretch"
            >
              <div className="sm:pr-6">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Headphones className="w-[22px] h-[22px] text-[#e60000]" strokeWidth={2} />
                  <p className="text-[20px] font-extrabold leading-none">
                    <span className="text-[#0f2040]">{data.help_title} </span>
                    <span className="text-[#e60000]">{data.help_title_highlight || ''}</span>
                  </p>
                </div>
                <p className="text-[13px] text-[#8a96a8] mb-4 pl-[34px]">{data.help_text}</p>
                <div className="space-y-3">
                  <a href={`tel:${data.phone.replace(/\s/g, '')}`} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 text-[#e60000] shadow-[0_2px_8px_rgba(230,0,0,0.08)]">
                      <Phone className="w-4 h-4" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block text-[14px] font-extrabold text-[#0f2040]">{data.phone}</span>
                      <span className="block text-[12px] text-[#8a96a8]">{data.phone_sub}</span>
                    </span>
                  </a>
                  <a href={`mailto:${data.email}`} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 text-[#e60000] shadow-[0_2px_8px_rgba(230,0,0,0.08)]">
                      <Mail className="w-4 h-4" strokeWidth={2} />
                    </span>
                    <span>
                      <span className="block text-[14px] font-extrabold text-[#0f2040] break-all">{data.email}</span>
                      <span className="block text-[12px] text-[#8a96a8]">{data.email_sub}</span>
                    </span>
                  </a>
                  <p className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 text-[#e60000] shadow-[0_2px_8px_rgba(230,0,0,0.08)]">
                      <MapPin className="w-4 h-4" strokeWidth={2} />
                    </span>
                    <span className="text-[14px] font-extrabold text-[#0f2040] leading-snug">
                      {data.location.split(',').slice(0, 1).join(',')},
                      <br />
                      {data.location.split(',').slice(1).join(',').trim()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px bg-[#f3cfd6] my-1" />

              <div className="sm:pl-8 flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [-12, -6, -12] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-3"
                >
                  <Send className="w-10 h-10 text-[#e60000]" strokeWidth={1.8} />
                </motion.div>
                <p className="text-[20px] sm:text-[22px] font-extrabold leading-[1.2] mb-2">
                  <span className="text-[#0f2040]">{data.journey_title} </span>
                  <span className="text-[#e60000]">{data.journey_title_highlight}</span>
                </p>
                <p className="relative text-[14px] text-[#7b8799] leading-snug max-w-[200px]">
                  {data.journey_text}
                  <svg
                    className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-[90px] h-2.5 text-[#e60000]"
                    viewBox="0 0 90 10"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 7c18-5 36 4 52-2 10-4 22 1 34 2"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="rounded-[22px] overflow-hidden shadow-[0_18px_50px_rgba(21,35,59,0.12)] bg-white"
          >
            <div className="relative bg-[#15233b] px-6 sm:px-8 pt-6 pb-5 overflow-hidden">
              <motion.div
                animate={{ rotate: [0, 8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-3 -bottom-2"
              >
                <GraduationCap className="w-[110px] h-[110px] text-white/[0.08]" strokeWidth={1.2} />
              </motion.div>
              <h3 className="relative text-[22px] sm:text-[26px] font-extrabold text-white leading-tight">
                {data.form_title_line1}{' '}
                <span className="text-[#ff2a2a]">{data.form_title_highlight}</span>
              </h3>
              <p className="relative text-[12.5px] sm:text-[13.5px] text-white/70 mt-1.5 max-w-[480px] leading-relaxed">
                {data.form_description}
              </p>
            </div>

            <form onSubmit={onSubmit} className="bg-white px-4 sm:px-7 py-5 sm:py-6">
              <SectionTitle icon={<User className="w-[18px] h-[18px]" strokeWidth={2.2} />}>
                {data.personal_title}
              </SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 mb-5">
                <div>
                  <Label required>{data.full_name_label}</Label>
                  <input name="fullName" required placeholder={data.full_name_placeholder} className={inputClass} />
                </div>
                <div>
                  <Label required>{data.dob_label}</Label>
                  <div className="relative">
                    <input
                      name="dob"
                      type="date"
                      required
                      className={`${inputClass} pr-9 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                    />
                    <CalendarDays className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9aa6b8]" />
                  </div>
                </div>
                <div>
                  <Label required>{data.gender_label}</Label>
                  <select name="gender" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      {data.gender_placeholder}
                    </option>
                    {data.gender_options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label required>{data.nationality_label}</Label>
                  <select name="nationality" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      {data.nationality_placeholder}
                    </option>
                    {data.nationality_options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label required>{data.email_label}</Label>
                  <input name="email" type="email" required placeholder={data.email_placeholder} className={inputClass} />
                </div>
                <div>
                  <Label required>{data.phone_label}</Label>
                  <input type="tel" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} name="phone" required placeholder={data.phone_placeholder} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <Label required>{data.address_label}</Label>
                  <input name="address" required placeholder={data.address_placeholder} className={inputClass} />
                </div>
              </div>

              <div className="rounded-[14px] bg-[#fff4f6] px-4 sm:px-5 py-4 sm:py-5 mb-5">
                <SectionTitle icon={<GraduationCap className="w-[18px] h-[18px]" strokeWidth={2.2} />}>
                  {data.academic_title}
                </SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5">
                  <div>
                    <Label required>{data.course_label}</Label>
                    <select name="course" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        {data.course_placeholder}
                      </option>
                      {courses.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label required>{data.program_label}</Label>
                    <select name="program" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        {data.program_placeholder}
                      </option>
                      {programs.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label required>{data.year_label}</Label>
                    <select name="year" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        {data.year_placeholder}
                      </option>
                      {data.year_options.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label required>{data.qualification_label}</Label>
                    <select name="qualification" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        {data.qualification_placeholder}
                      </option>
                      {data.qualification_options.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <SectionTitle icon={<FileUp className="w-[18px] h-[18px]" strokeWidth={2.2} />}>
                {data.additional_title}
              </SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 mb-4">
                <div>
                  <Label>{data.upload_label}</Label>
                  <label className="flex items-center w-full h-[42px] rounded-[10px] border border-[#eceff4] bg-[#f7f8fb] px-3 cursor-pointer">
                    <Upload className="w-4 h-4 text-[#1b2a4b] shrink-0 mr-2" strokeWidth={2.2} />
                    <span className="text-[13px] font-semibold text-[#1b2a4b] shrink-0 mr-3">
                      {data.upload_button}
                    </span>
                    <span className="text-[13px] text-[#9aa6b8] truncate">
                      {fileName || data.upload_empty}
                    </span>
                    <input
                      type="file"
                      name="documents"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = e.target.files;
                        setFileName(files && files.length ? Array.from(files).map((f) => f.name).join(', ') : '');
                      }}
                    />
                  </label>
                  <p className="text-[11px] text-[#b0b8c5] mt-1">{data.upload_hint}</p>
                </div>
                <div>
                  <Label>{data.hear_label}</Label>
                  <select name="hear" defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      {data.hear_placeholder}
                    </option>
                    {data.hear_options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label>{data.message_label}</Label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={data.message_placeholder}
                    className="w-full border border-[#eceff4] rounded-[10px] px-3.5 py-2.5 text-[13px] text-[#1b2a4b] placeholder:text-[#b7bec9] bg-[#f7f8fb] focus:outline-none focus:bg-white focus:border-[#e60000] resize-none min-h-[84px]"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-[13px] text-[#5b6b85] mb-4 cursor-pointer">
                <input type="checkbox" required className="mt-0.5 accent-[#e60000] w-4 h-4 rounded" />
                <span>
                  {data.agree_prefix}{' '}
                  <Link href={data.terms_href} className="text-[#e60000] font-semibold hover:underline">
                    {data.terms_text}
                  </Link>{' '}
                  and{' '}
                  <Link href={data.privacy_href} className="text-[#e60000] font-semibold hover:underline">
                    {data.privacy_text}
                  </Link>
                </span>
              </label>

              {submitted && (
                <p className="text-[13.5px] text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2 mb-3">
                  {data.success_text}
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#e60000] text-white px-8 py-3.5 rounded-[8px] font-medium hover:bg-[#cc0000] transition-all flex items-center justify-center gap-3 group/btn shadow-md hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5 duration-300"
              >
                {data.submit_text}
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
