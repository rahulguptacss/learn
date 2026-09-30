import React from 'react';
import Header from '../../components/section/Header';
import Footer from '../../components/section/Footer';
import Breadcrumb from '../../components/section/Breadcrumb';
import Policy from '../../components/section/Policy';
import siteData from '../../components/data/data.json';
import { SiteData, PolicyData } from '../../components/types';
import { Metadata } from 'next';

const data = siteData as SiteData;
const templateComponents = data.categories.Education.templateComponents["template-1"];
const templateData = templateComponents.sections;
const pageData = templateComponents.pages.privacy_policy;
const commonData = data.common;
const policyData = templateData.privacy_policy as PolicyData;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'Privacy Policy | Learnhub',
  description: pageData?.metadata?.description || "Privacy Policy details",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Privacy Policy"}
          pageName={pageData?.pageName || "Privacy & Policy"}
          data={commonData.Breadcrumb}
        />
        <Policy data={policyData} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
