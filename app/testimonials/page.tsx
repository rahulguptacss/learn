import React from 'react';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import Testimonials from '@/components/section/Testimonials';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData } from '@/components/types';

export const metadata = {
  title:
    siteData.categories.Education.templateComponents['template-1'].pages.testimonialsPage
      ?.metadata?.title || 'Testimonials | Learnhub',
};

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents['template-1'].pages.testimonialsPage;
const sections = data.categories.Education.templateComponents['template-1'].sections;


const componentMap: Record<string, React.ElementType> = {
  Testimonials: Testimonials,
};

export default function TestimonialsPage() {
  if (!pageData) return null;

  return (
    <main className="min-h-screen bg-white">
      <Header data={data.common.Header} />
      <Breadcrumb
        title={pageData.title || 'Testimonial'}
        pageName={pageData.pageName || 'TESTIMONIAL'}
        data={data.common.Breadcrumb}
      />
      <Testimonials data={sections.testimonials} variant="page" />
      <Footer data={data.common.Footer} />
    </main>
  );
}
