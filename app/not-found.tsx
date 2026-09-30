import React from 'react';
import Header from '../components/section/Header';
import Footer from '../components/section/Footer';
import NotFoundSection from '../components/section/NotFound';
import siteData from '../components/data/data.json';
import { SiteData, NotFoundData } from '../components/types';
import { Metadata } from 'next';

const data = siteData as SiteData;
const templateComponents = data.categories.Education.templateComponents["template-1"];
const templateData = templateComponents.sections;
const commonData = data.common;
const notFoundData = templateData.not_found as NotFoundData;

export const metadata: Metadata = {
  title: '404 - Page Not Found | Learnhub',
  description: 'The page you are looking for might have been removed or is temporarily unavailable.',
};

export default function NotFound() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <NotFoundSection data={notFoundData} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
