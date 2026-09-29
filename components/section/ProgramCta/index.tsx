"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { ProgramCtaData } from '../../types';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProgramCta({ data }: { data: ProgramCtaData }) {
  return (
    <section className="bg-white pb-12 lg:pb-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="rounded-[24px] bg-[#fff3f5] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_auto] items-center gap-6 px-6 py-8 md:px-10 lg:pl-12 lg:pr-10 lg:py-8">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12, ease }}
              className="max-w-[480px]"
            >
              <h2 className="text-[30px] md:text-[36px] font-extrabold text-[#15233b] leading-[1.2] tracking-[-0.03em] mb-3">
                {data.title_line1}{' '}
                <span className="text-[#e60000]">{data.title_highlight}</span>
                <br />
                {data.title_line2}{' '}
                <span className="text-[#e60000]">{data.title_line2_highlight}</span>
              </h2>
              <p className="text-[15px] md:text-[16px] font-normal text-[#8a96a8] leading-[1.65] mb-6">
                {data.description}
              </p>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={data.button_href}
                  className="inline-flex items-center gap-2 bg-[#e60000] hover:bg-[#cc0000] text-white px-6 py-3 rounded-[10px] text-[14px] font-semibold transition"
                >
                  {data.button_text}
                  <Send className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            <div className="relative flex justify-center items-end min-h-[250px] lg:min-h-[280px]">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[46%] w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-full bg-[#ffe4ea]"
              />
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.25, ease }}
                className="relative z-10 w-[230px] h-[260px] md:w-[260px] md:h-[290px]"
              >
                <Image
                  src={data.image}
                  alt={data.title_line1}
                  fill
                  sizes="260px"
                  className="object-contain object-bottom"
                />
              </motion.div>
            </div>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.28 } },
              }}
              className="flex flex-col gap-4 w-max ml-auto lg:justify-self-end lg:pr-2"
            >
              {data.features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
                  }}
                  className="flex items-center gap-3"
                >
                  <span className="relative w-[30px] h-[30px] shrink-0">
                    <svg viewBox="0 0 28 28" className="w-full h-full" aria-hidden>
                      <circle cx="14" cy="14" r="13" fill="#fde6ea" />
                      <path
                        d="M8.2 14.2l3.4 3.4 8-8.2"
                        fill="none"
                        stroke="#e60000"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[16px] md:text-[17px] font-medium text-[#8a96a8] leading-tight">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
