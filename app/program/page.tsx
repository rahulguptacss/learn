import React from 'react';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import Programs from '@/components/section/Programs';
import ProgramCta from '@/components/section/ProgramCta';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData } from '@/components/types';

export const metadata = {
  title:
    siteData.categories.Education.templateComponents['template-1'].pages.program?.metadata?.title ||
    'Program | Learnhub',
};

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents['template-1'].pages.program;
const sectionsData = data.categories.Education.templateComponents['template-1'].sections;

export default function ProgramPage() {
  if (!pageData) return null;

  return (
    <main className="min-h-screen bg-white">
      <Header data={data.common.Header} />
      <Breadcrumb
        title={pageData.title || 'Program'}
        pageName={pageData.pageName || 'PROGRAM'}
        data={data.common.Breadcrumb}
      />
      <Programs data={sectionsData.programs} />
      <ProgramCta data={sectionsData.programCta} />
      <Footer data={data.common.Footer} />
    </main>
  );
}
