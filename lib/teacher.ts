import { TeacherItem } from '@/components/types';

export function slugifyTeacherName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getTeacherSlug(teacher: Pick<TeacherItem, 'name' | 'slug' | 'id'>) {
  return teacher.slug || slugifyTeacherName(teacher.name);
}

export function findTeacherByParam(teachers: TeacherItem[], param: string) {
  const decoded = decodeURIComponent(param).toLowerCase();
  return teachers.find((teacher) => {
    const slug = getTeacherSlug(teacher).toLowerCase();
    return slug === decoded || teacher.id.toLowerCase() === decoded;
  });
}
