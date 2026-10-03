"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  BookOpen,
  Lightbulb,
  Users,
  Briefcase,
  GraduationCap,
  CalendarDays,
  FileText,
  Clock3,
  MapPin,
  Wallet,
  Download,
  ArrowRight,
  Plus,
  Minus,
} from 'lucide-react';
import { ProgramDetailData, ProgramItem } from '../../types';

const highlightIcons: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="w-7 h-7" strokeWidth={1.7} />,
  Lightbulb: <Lightbulb className="w-7 h-7" strokeWidth={1.7} />,
  Users: <Users className="w-7 h-7" strokeWidth={1.7} />,
  Briefcase: <Briefcase className="w-7 h-7" strokeWidth={1.7} />,
};

export default function ProgramDetail({
  program,
  labels,
  related,
}: {
  program: ProgramItem;
  labels: ProgramDetailData;
  related: ProgramItem[];
}) {
  const [tab, setTab] = useState(labels.tabs[0] || 'Overview');
  const [openYear, setOpenYear] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const info = program.info;

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          <div>
            <h1 className="text-[26px] md:text-[30px] font-extrabold text-[#1b2a4b] mb-4">
              {program.full_name || program.title}
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-[240px] md:h-[320px] rounded-2xl overflow-hidden mb-5"
            >
              <Image src={program.image} alt={program.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 780px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <button
                type="button"
                className="absolute left-5 bottom-5 flex items-center gap-3 text-white"
              >
                <span className="w-12 h-12 rounded-full bg-white/95 text-[#e60000] flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </span>
                <span className="text-left">
                  <span className="block text-[15px] font-semibold">{program.video_label || labels.video_label}</span>
                  <span className="block text-[13px] text-white/85">{program.video_duration}</span>
                </span>
              </button>
            </motion.div>

            <div className="flex flex-wrap gap-2 mb-8">
              {labels.tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition ${
                    tab === item
                      ? 'bg-[#e60000] text-white'
                      : 'bg-[#fff1f3] text-[#1b2a4b] hover:bg-[#ffe4ea]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {tab === 'Overview' && (
                  <>
                    <h2 className="text-[26px] font-extrabold text-[#1b2a4b] mb-3">{labels.overview_title}</h2>
                    <p className="text-[15px] text-[#5b6b85] leading-[1.8] mb-6">{program.overview}</p>
                    {program.quote && (
                      <div className="flex gap-3 mb-8">
                        <span className="text-[#e60000] text-[36px] leading-none font-serif">“</span>
                        <p className="text-[15px] italic text-[#5b6b85] leading-[1.7]">{program.quote}</p>
                      </div>
                    )}
                    <h3 className="text-[22px] font-extrabold text-[#1b2a4b] mb-4">{labels.highlights_title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                      {(program.highlights || []).map((item) => (
                        <div key={item.title} className="bg-[#fff6f7] rounded-xl px-4 py-5 text-center">
                          <div className="text-[#e60000] flex justify-center mb-3">
                            {highlightIcons[item.icon] || highlightIcons.BookOpen}
                          </div>
                          <h4 className="text-[13px] font-bold text-[#1b2a4b] mb-1">{item.title}</h4>
                          <p className="text-[12px] text-[#6b7789] leading-[1.45]">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <h3 className="text-[22px] font-extrabold text-[#1b2a4b] mb-4">{labels.curriculum_title}</h3>
                    <div className="divide-y divide-gray-100 border-t border-gray-100">
                      {(program.curriculum || []).map((item, idx) => (
                        <div key={item.title}>
                          <button
                            type="button"
                            onClick={() => setOpenYear(openYear === idx ? null : idx)}
                            className="w-full flex items-center justify-between py-4 text-left"
                          >
                            <span className="text-[15px] font-bold text-[#1b2a4b]">{item.title}</span>
                            {openYear === idx ? (
                              <Minus className="w-4 h-4 text-[#e60000]" />
                            ) : (
                              <Plus className="w-4 h-4 text-[#e60000]" />
                            )}
                          </button>
                          <AnimatePresence>
                            {openYear === idx && (
                              <motion.p
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="text-[14px] text-[#5b6b85] pb-4 overflow-hidden"
                              >
                                {item.content}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tab === 'Curriculum' && (
                  <>
                    <h2 className="text-[26px] font-extrabold text-[#1b2a4b] mb-2">{labels.curriculum_title}</h2>
                    <p className="text-[15px] text-[#5b6b85] leading-[1.8] mb-5">
                      {labels.curriculum_intro ||
                        'The curriculum is structured year-wise so you can build fundamentals first, then move to advanced skills, projects and industry exposure.'}
                    </p>
                    <div className="divide-y divide-gray-100 border-t border-gray-100">
                      {(program.curriculum || []).map((item, idx) => (
                        <div key={item.title}>
                          <button
                            type="button"
                            onClick={() => setOpenYear(openYear === idx ? null : idx)}
                            className="w-full flex items-center justify-between py-4 text-left"
                          >
                            <span className="text-[15px] font-bold text-[#1b2a4b]">{item.title}</span>
                            {openYear === idx ? (
                              <Minus className="w-4 h-4 text-[#e60000]" />
                            ) : (
                              <Plus className="w-4 h-4 text-[#e60000]" />
                            )}
                          </button>
                          <AnimatePresence>
                            {openYear === idx && (
                              <motion.p
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="text-[14.5px] text-[#5b6b85] leading-[1.8] pb-4 overflow-hidden"
                              >
                                {item.content}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {tab === 'Eligibility' && (
                  <>
                    <h2 className="text-[26px] font-extrabold text-[#1b2a4b] mb-3">Eligibility</h2>
                    <p className="text-[15px] text-[#5b6b85] leading-[1.8] mb-4">{program.eligibility_text}</p>
                    {(program.eligibility_points || []).length > 0 && (
                      <ul className="space-y-2.5">
                        {program.eligibility_points!.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-[14.5px] text-[#5b6b85] leading-[1.7]">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#e60000] shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}

                {tab === 'Career Scope' && (
                  <>
                    <h2 className="text-[26px] font-extrabold text-[#1b2a4b] mb-3">Career Scope</h2>
                    <p className="text-[15px] text-[#5b6b85] leading-[1.8] mb-4">{program.career_text}</p>
                    {(program.career_roles || []).length > 0 && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {program.career_roles!.map((role) => (
                          <li
                            key={role}
                            className="rounded-lg bg-[#fff6f7] px-4 py-3 text-[14px] font-semibold text-[#1b2a4b]"
                          >
                            {role}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}

                {tab === 'FAQs' && (
                  <div className="flex flex-col gap-3">
                    {(program.faqs || []).map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div
                          key={faq.question}
                          className={`rounded-xl border overflow-hidden transition-colors ${
                            isOpen ? 'border-[#ffd0d6] bg-[#fff7f8]' : 'border-gray-100 bg-white'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between gap-4 px-4 py-4 text-left"
                          >
                            <span className="text-[15px] font-bold text-[#1b2a4b]">{faq.question}</span>
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                isOpen ? 'bg-[#e60000] text-white' : 'bg-[#fff1f3] text-[#e60000]'
                              }`}
                            >
                              {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <p className="px-4 pb-4 text-[14px] text-[#5b6b85] leading-[1.7]">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-gray-100 shadow-[0_8px_28px_rgba(16,27,41,0.05)] p-5">
              <h3 className="text-[18px] font-extrabold text-[#1b2a4b] mb-4">{labels.info_title}</h3>
              {info && (
                <ul className="space-y-4 mb-5">
                  <InfoRow icon={<GraduationCap className="w-4 h-4" />} label={labels.info_labels.program_name} value={info.program_name} />
                  <InfoRow icon={<CalendarDays className="w-4 h-4" />} label={labels.info_labels.duration} value={info.duration} />
                  <InfoRow icon={<FileText className="w-4 h-4" />} label={labels.info_labels.eligibility} value={info.eligibility} />
                  <InfoRow icon={<Clock3 className="w-4 h-4" />} label={labels.info_labels.mode} value={info.mode} />
                  <InfoRow icon={<MapPin className="w-4 h-4" />} label={labels.info_labels.campus} value={info.campus} />
                  <InfoRow icon={<Wallet className="w-4 h-4" />} label={labels.info_labels.fee} value={info.fee} />
                </ul>
              )}
              <Link
                href={labels.apply_href}
                className="w-full bg-[#e60000] text-white px-8 py-3.5 rounded-[8px] font-medium hover:bg-[#cc0000] transition-all flex items-center justify-center gap-3 group/btn shadow-md hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5 duration-300"
              >
                {labels.apply_text} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="rounded-2xl bg-[#fff6f7] p-5">
              <div className="flex items-start gap-3 mb-3">
                <FileText className="w-6 h-6 text-[#e60000] shrink-0" />
                <div>
                  <h3 className="text-[16px] font-extrabold text-[#1b2a4b]">{labels.brochure_title}</h3>
                  <p className="text-[13px] text-[#6b7789] mt-1">{labels.brochure_desc}</p>
                </div>
              </div>
              <a
                href={labels.brochure_href}
                download="Learnhub-Program-Brochure.pdf"
                className="w-full inline-flex items-center justify-center gap-2 bg-white border border-[#ffd6de] text-[#e60000] py-3 rounded-lg text-[14px] font-semibold hover:bg-[#fff1f3]"
              >
                <Download className="w-4 h-4" /> {labels.brochure_button}
              </a>
            </div>

            <div className="rounded-2xl border border-gray-100 shadow-[0_8px_28px_rgba(16,27,41,0.05)] p-5">
              <h3 className="text-[18px] font-extrabold text-[#1b2a4b] mb-4">{labels.related_title}</h3>
              <ul className="space-y-3">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link href={`/program-detail/${item.slug}`} className="flex items-center gap-3 group">
                      <span className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="56px" />
                      </span>
                      <span className="flex-1 text-[13px] font-semibold text-[#1b2a4b] leading-snug group-hover:text-[#e60000]">
                        {item.full_name || item.title}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#fff1f3] text-[#e60000] flex items-center justify-center shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-8 h-8 rounded-lg bg-[#fff1f3] text-[#e60000] flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </span>
      <span>
        <span className="block text-[12px] text-[#8a96a8]">{label}</span>
        <span className="block text-[13.5px] font-semibold text-[#1b2a4b]">{value}</span>
      </span>
    </li>
  );
}
