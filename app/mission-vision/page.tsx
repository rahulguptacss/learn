import React from 'react';
import Header from '../../components/section/Header';
import Breadcrumb from '../../components/section/Breadcrumb';
import Mission from '../../components/section/Mission';
import Vision from '../../components/section/Vision';
import CoreValues from '../../components/section/CoreValues';
import Footer from '../../components/section/Footer';
import siteData from '../../components/data/data.json';
import { SiteData } from '../../components/types';

export const metadata = {
  title: siteData.categories.Education.templateComponents["template-1"].pages.missionVision?.metadata?.title || 'Mission & Vision | Learnhub',
};

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents["template-1"].pages.missionVision;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const commonData = data.common;


const componentMap: Record<string, React.ElementType> = {
  Mission: Mission,
  Vision: Vision,
  CoreValues: CoreValues,
};

export default function MissionVisionPage() {
  if (!pageData) return null;

  return (
    <div className="font-sans antialiased text-[#101b29]">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || ''} 
          pageName={pageData?.pageName || ''} 
          data={commonData.Breadcrumb} 
        />
        {(pageData.components as any[])?.map((comp, index) => {
          const Component = componentMap[comp.component];
          if (!Component) return null;

          const sectionKey = comp.component.charAt(0).toLowerCase() + comp.component.slice(1);
          const sectionData = (templateData as any)?.[sectionKey] || null;

          return <Component key={comp.key || index} data={sectionData} />;
        })}
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
