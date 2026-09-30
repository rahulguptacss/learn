import React from 'react';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import Teachers from '@/components/section/Teachers';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData } from '@/components/types';

export const metadata = {
  title:
    siteData.categories.Education.templateComponents['template-1'].pages.teachers?.metadata?.title ||
    'Teachers | Learnhub',
};

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents['template-1'].pages.teachers;
const templateData = (data as any)?.categories?.Education?.templateComponents?.["template-1"]?.sections;
const sectionsData = data.categories.Education.templateComponents['template-1'].sections;


const componentMap: Record<string, React.ElementType> = {
  Teachers: Teachers,
};

export default function TeachersPage() {
  if (!pageData) return null;

  return (
    <main className="min-h-screen bg-white">
      <Header data={data.common.Header} />
      <Breadcrumb
        title={pageData.title || 'Teachers'}
        pageName={pageData.pageName || 'TEACHERS'}
        data={data.common.Breadcrumb}
      />
        {(pageData.components as any[])?.map((comp, index) => {
          const Component = componentMap[comp.component];
          if (!Component) return null;

          const sectionKey = comp.component.charAt(0).toLowerCase() + comp.component.slice(1);
          const sectionData = (templateData as any)?.[sectionKey] || null;

          return <Component key={comp.key || index} data={sectionData} />;
        })}
      <Footer data={data.common.Footer} />
    </main>
  );
}
