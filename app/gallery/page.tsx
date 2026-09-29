import React from 'react';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import Gallery from '@/components/section/Gallery';
import VideoGallery from '@/components/section/VideoGallery';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData } from '@/components/types';

export const metadata = {
  title:
    siteData.categories.Education.templateComponents['template-1'].pages.galleryPage?.metadata
      ?.title || 'Gallery | Learnhub',
};

const data = siteData as SiteData;
const pageData = data.categories.Education.templateComponents['template-1'].pages.galleryPage;
const sections = data.categories.Education.templateComponents['template-1'].sections;

export default function GalleryPage() {
  if (!pageData) return null;

  return (
    <main className="min-h-screen bg-white">
      <Header data={data.common.Header} />
      <Breadcrumb
        title={pageData.title || 'Gallery'}
        pageName={pageData.pageName || 'GALLERY'}
        data={data.common.Breadcrumb}
      />
      <Gallery data={sections.gallery} variant="page" />
      <VideoGallery data={sections.videoGallery} />
      <Footer data={data.common.Footer} />
    </main>
  );
}
