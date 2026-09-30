import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import siteData from '../../components/data/data.json';
import { SiteData, EventsData } from '../../components/types';
import Events from '../../components/section/Events';

const data = siteData as SiteData;
// Use events data from templateData
const templateData = data.categories.Education.templateComponents["template-1"].sections;
const commonData = data.common;

// Check if page data exists (it might not be in data.json yet, so we provide fallbacks)
const pageData = data.categories.Education.templateComponents["template-1"].pages?.events || {
  title: "Events",
  pageName: "EVENTS",
  metadata: { title: "Events | Learnhub" }
};

export const metadata = {
  title: pageData?.metadata?.title || 'events | Learnhub',
  description: pageData?.metadata?.description || 'Learnhub',
};


const componentMap: Record<string, React.ElementType> = {
  Events: Events,
};

export default function EventsPage() {
  if (!pageData) return null;

  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData.title || 'Event'}
          pageName={pageData.pageName || 'EVENT'}
          data={commonData.Breadcrumb}
        />
        
        {/* We use the homepage Events component, which we will modify to accept/display filters if needed */}
        <Events data={templateData.events as EventsData} showFilters={true} />

      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
