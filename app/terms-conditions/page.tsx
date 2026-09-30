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
const pageData = templateComponents.pages.terms_conditions;
const commonData = data.common;
const policyData = templateData.terms_conditions as PolicyData;

export const metadata: Metadata = {
  title: pageData?.metadata?.title || 'Terms & Conditions | Learnhub',
  description: pageData?.metadata?.description || "Terms and Conditions",
};

export default function TermsConditionsPage() {
  return (
    <div className="font-sans antialiased text-[#101b29] bg-white">
      <Header data={commonData.Header} />
      <main>
        <Breadcrumb 
          title={pageData?.title || "Terms & Conditions"}
          pageName={pageData?.pageName || "Terms & Conditions"}
          data={commonData.Breadcrumb}
        />
        <Policy data={policyData} />
      </main>
      <Footer data={commonData.Footer} />
    </div>
  );
}
