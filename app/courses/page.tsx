import React from 'react';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import Courses from '@/components/section/Courses';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData } from '@/components/types';

export const metadata = {
  title: siteData.categories.Education.templateComponents["template-1"].pages.courses?.metadata?.title || 'Courses | Learnhub',
};

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents["template-1"].pages.courses;
const templateData = (data as any)?.categories?.Education?.templateComponents?.["template-1"]?.sections;
const sectionsData = data.categories.Education.templateComponents["template-1"].sections;


const componentMap: Record<string, React.ElementType> = {
  Courses: Courses,
};

export default function CoursesPage() {
  if (!pageData) return null;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header data={data.common.Header} />

      {/* Breadcrumb */}
      <Breadcrumb 
        title={pageData.title || "Courses"} 
        pageName={pageData.pageName || "COURSES"} 
        data={data.common.Breadcrumb} 
      />

      {/* Courses Section - Grid Mode */}
      <div className="relative">
        {(pageData.components as any[])?.map((comp, index) => {
          const Component = componentMap[comp.component];
          if (!Component) return null;

          const sectionKey = comp.component.charAt(0).toLowerCase() + comp.component.slice(1);
          const sectionData = (templateData as any)?.[sectionKey] || null;

          return <Component key={comp.key || index} data={sectionData} />;
        })}
      </div>

      {/* Footer */}
      <Footer data={data.common.Footer} />
    </main>
  );
}
