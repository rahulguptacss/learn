import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import ProgramDetail from '@/components/section/ProgramDetail';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData } from '@/components/types';

const data = siteData as SiteData;
const template = data.categories.Education.templateComponents['template-1'];
const pageData = template.pages.programDetail;
const programs = template.sections.programs.list;
const labels = template.sections.programDetail;

export const dynamicParams = true;

export function generateStaticParams() {
  return programs.map((program) => ({ id: program.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = programs.find((item) => item.slug === id);
  return {
    title: program
      ? `${program.full_name || program.title} | Learnhub`
      : 'Program Detail | Learnhub',
  };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = programs.find((item) => item.slug === id);

  if (!program) {
    notFound();
  }

  const currentIndex = programs.findIndex((item) => item.id === program.id);
  const related = [
    ...programs.slice(currentIndex + 1),
    ...programs.slice(0, currentIndex),
  ].slice(0, 4);

  return (
    <main className="min-h-screen bg-white">
      <Header data={data.common.Header} />
      <Breadcrumb
        title={program.full_name || program.title}
        pageName={program.title}
        data={data.common.Breadcrumb}
        uppercasePageName={false}
      />
      <ProgramDetail
        key={program.slug}
        program={program}
        labels={labels}
        related={related}
      />
      <Footer data={data.common.Footer} />
    </main>
  );
}
