import React from 'react';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import AdmissionProcess from '@/components/section/AdmissionProcess';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData } from '@/components/types';

export const metadata = {
  title:
    siteData.categories.Education.templateComponents['template-1'].pages.admission?.metadata
      ?.title || 'Admission Process | Learnhub',
};

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents['template-1'].pages.admission;
const sectionsData = data.categories.Education.templateComponents['template-1'].sections;

export default function AdmissionPage() {
  if (!pageData || !sectionsData.admission) return null;

  return (
    <main className="min-h-screen bg-white">
      <Header data={data.common.Header} />
      <Breadcrumb
        title={pageData.title || 'Admission Process'}
        pageName={pageData.pageName || 'ADMISSION PROCESS'}
        data={data.common.Breadcrumb}
      />
      <AdmissionProcess data={sectionsData.admission} />
      <Footer data={data.common.Footer} />
    </main>
  );
}
