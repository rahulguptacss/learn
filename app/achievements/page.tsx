import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import siteData from '../../components/data/data.json';
import { SiteData } from '../../components/types';
import AchievementsStats from '../../components/section/AchievementsStats';
import AchievementsTimeline from '../../components/section/AchievementsTimeline';
import AchievementsAwards from '../../components/section/AchievementsAwards';

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents["template-1"].pages.achievements;
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const commonData = data.common;

export const metadata = {
  title: pageData?.metadata?.title || 'Achievements | Learnhub',
};


const componentMap: Record<string, React.ElementType> = {
  AchievementsStats: AchievementsStats,
  AchievementsTimeline: AchievementsTimeline,
  AchievementsAwards: AchievementsAwards,
};

export default function Achievements() {
  if (!pageData) return null;

  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || 'Achievements'}
          pageName={pageData?.pageName || 'ACHIEVEMENTS'}
          data={commonData.Breadcrumb}
        />
        {(pageData.components as any[])?.map((comp, index) => {
          const Component = componentMap[comp.component];
          if (!Component) return null;

          const sectionKey = comp.component.charAt(0).toLowerCase() + comp.component.slice(1);
          const sectionData = typeof templateData !== 'undefined' ? (templateData as any)[sectionKey] : null;

          return <Component key={comp.key || index} data={sectionData} />;
        })}

      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
