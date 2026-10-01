import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/section/Header';
import Breadcrumb from '@/components/section/Breadcrumb';
import TeacherDetail from '@/components/section/TeacherDetail';
import Footer from '@/components/section/Footer';
import siteData from '@/components/data/data.json';
import { SiteData, TeacherItem } from '@/components/types';
import { findTeacherByParam, getTeacherSlug } from '@/components/types';

const data = siteData as SiteData;
const template = data.categories.Education.templateComponents['template-1'];
const pageData = template.pages.teacherDetail;
const teachers = (template.sections.teachers as any).list as TeacherItem[];
const labels = (template.sections.teacherDetail as any) ?? {
  badge: 'OUR TEACHER',
  courses_title: 'Courses Taught',
  button_text: 'Get in Touch',
  button_href: '/contact',
};

export const dynamicParams = true;

export function generateStaticParams() {
  return teachers.map((teacher) => ({ id: getTeacherSlug(teacher) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teacher = findTeacherByParam(teachers, id);
  return {
    title: teacher
      ? `${teacher.name} | Learnhub`
      : pageData?.metadata?.title || 'Teacher Details | Learnhub',
  };
}

export default async function TeacherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teacher = findTeacherByParam(teachers, id);

  if (!teacher) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header data={data.common.Header} />
      <Breadcrumb
        title={pageData?.title || "Teacher Details"}
        pageName={pageData?.pageName || "TEACHER DETAILS"}
        data={data.common.Breadcrumb}
      />
      <TeacherDetail teacherId={teacher.id} labels={labels} />
      <Footer data={data.common.Footer} />
    </main>
  );
}
