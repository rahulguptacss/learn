import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import Sitemap from '../../components/section/Sitemap';
import siteData from '../../components/data/data.json';
import { SiteData, SitemapData } from '../../components/types';
import { Metadata } from 'next';

const data = siteData as SiteData;
const templateComponents = data.categories.Education.templateComponents["template-1"];
const templateData = templateComponents.sections;
const pageData = templateComponents.pages.sitemap;
const commonData = data.common;
const sitemapData = templateData.sitemap as SitemapData;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'Sitemap | Learnhub',
  description: pageData?.metadata?.description || "Find all important pages in one place.",
};

export default function SitemapPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Sitemap"}
          pageName={pageData?.pageName || "Sitemap"}
          data={commonData.Breadcrumb}
        />
        <Sitemap data={sitemapData} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
