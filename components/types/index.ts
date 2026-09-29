export interface TopBarData {
  address?: string;
  phone?: string;
  email?: string;
  socials?: { icon: string; href: string }[];
}

export interface HeaderLink {
  name: string;
  href: string;
  active?: boolean;
  dropdown?: { name: string; href: string }[];
}

export interface HeaderData {
  logo_text: string;
  logo_image?: string;
  links: HeaderLink[];
  button_text: string;
}

export interface HeroData {
  subtitle?: string;
  title_line1: string;
  title_highlight: string;
  title_line2: string;
  description: string;
  stats: { value: string; label: string; icon?: string }[];
  button_text?: string;
  button_icon?: string;
  features?: { label: string; icon: string }[];
  image: string;
}

export interface AboutFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  description_2?: string;
  features: AboutFeature[];
  stats: AboutStat[];
  image: string;
  button_text: string;
}

export interface CourseItem {
  id: string;
  slug?: string;
  image: string;
  price: string;
  title: string;
  description: string;
  category: string;
  lessons: string;
  students: string;
  rating: number;
  intro?: string;
  title_line1?: string;
  title_highlight?: string;
  about?: string[];
  long_description?: string[];
}

export interface CoursesData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  list: CourseItem[];
  button_text: string;
}

export interface CourseDetailData {
  badge: string;
  enroll_text: string;
  about_title: string;
  description_title: string;
}

export interface StatisticItem {
  icon: string;
  value: string;
  label: string;
}

export interface StatisticsData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  list: StatisticItem[];
}

export interface WhyChooseUsFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface WhyChooseUsData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  features: WhyChooseUsFeature[];
  button_text: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  category: string;
}

export interface GalleryData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  categories: string[];
  list: GalleryItem[];
  button_text?: string;
}

export interface VideoGalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
  duration: string;
  video_url: string;
}

export interface VideoGalleryData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  list: VideoGalleryItem[];
}

export interface EventItem {
  id: string;
  image: string;
  date: string;
  month: string;
  title: string;
  category?: string;
  full_date?: string;
  description?: string;
  location: string;
  read_more_text: string;
}

export interface EventsData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  list: EventItem[];
  button_text: string;
}

export interface TestimonialItem {
  id: string;
  image: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface TestimonialsData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  list: TestimonialItem[];
  page_subtitle?: string;
  page_title_highlight?: string;
}

export interface BlogItem {
  id: string;
  image: string;
  date: string;
  month: string;
  category?: string;
  title: string;
  description: string;
  author: string;
  authorRole?: string;
  authorImage: string;
  read_more_text: string;
}

export interface BlogData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  list: BlogItem[];
  button_text: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterData {
  logo_text: string;
  logo_subtitle: string;
  description: string;
  socials: { icon: string; href: string }[];
  stats?: { value: string; label: string }[];
  quick_links: FooterLink[];
  extra_links: FooterLink[];
  contact: {
    phone: string;
    phone_sub: string;
    email: string;
    email_sub: string;
    address: string;
    address_sub: string;
  };
  copyright: string;
  bottom_links: FooterLink[];
}

export interface BreadcrumbData {
  image: string;
  home_text: string;
  home_link: string;
}

export interface MissionData {
  subtitle: string;
  title_line1: string;
  title_line2?: string;
  title_highlight: string;
  description: string;
  features: { label: string; icon: string }[];
  image: string;
}

export interface VisionData {
  subtitle: string;
  title_line1: string;
  title_line2?: string;
  title_highlight: string;
  description: string;
  features: { label: string; icon: string }[];
  image: string;
}

export interface CoreValuesData {
  subtitle: string;
  title_line1: string;
  title_line2?: string;
  title_highlight: string;
  list: { icon: string; title: string; desc: string }[];
}

export interface ProgramHighlight {
  icon: string;
  title: string;
  desc: string;
}

export interface ProgramCurriculumItem {
  title: string;
  content: string;
}

export interface ProgramFaq {
  question: string;
  answer: string;
}

export interface ProgramItem {
  id: string;
  slug: string;
  image: string;
  icon: string;
  title: string;
  description: string;
  button_text: string;
  href: string;
  full_name?: string;
  video_label?: string;
  video_duration?: string;
  overview?: string;
  quote?: string;
  highlights?: ProgramHighlight[];
  curriculum?: ProgramCurriculumItem[];
  eligibility_text?: string;
  eligibility_points?: string[];
  career_text?: string;
  career_roles?: string[];
  faqs?: ProgramFaq[];
  info?: {
    program_name: string;
    duration: string;
    eligibility: string;
    mode: string;
    campus: string;
    fee: string;
  };
}

export interface ProgramsData {
  list: ProgramItem[];
}

export interface ProgramDetailData {
  video_label: string;
  tabs: string[];
  overview_title: string;
  highlights_title: string;
  curriculum_title: string;
  curriculum_intro?: string;
  info_title: string;
  info_labels: {
    program_name: string;
    duration: string;
    eligibility: string;
    mode: string;
    campus: string;
    fee: string;
  };
  apply_text: string;
  apply_href: string;
  brochure_title: string;
  brochure_desc: string;
  brochure_button: string;
  brochure_href: string;
  related_title: string;
}

export interface ProgramCtaData {
  title_line1: string;
  title_highlight: string;
  title_line2?: string;
  title_line2_highlight?: string;
  description: string;
  button_text: string;
  button_href: string;
  image: string;
  features: string[];
}

export interface TeacherStat {
  value: string;
  label: string;
}

export interface TeacherCourseLink {
  title: string;
  href?: string;
}

export interface TeacherItem {
  id: string;
  slug?: string;
  image: string;
  name: string;
  role: string;
  description: string;
  bio?: string;
  phone?: string;
  email?: string;
  location?: string;
  stats?: TeacherStat[];
  courses_taught?: TeacherCourseLink[];
}

export interface TeachersData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  list: TeacherItem[];
}

export interface TeacherDetailData {
  badge: string;
  courses_title: string;
  button_text: string;
  button_href: string;
}

export interface AdmissionStep {
  number: string;
  icon: string;
  title: string;
  text: string;
}

export interface AdmissionDocument {
  title: string;
  note: string;
}

export interface AdmissionData {
  title_line1: string;
  title_highlight: string;
  description: string;
  steps: AdmissionStep[];
  community: {
    image: string;
    title: string;
    text: string;
  };
  documents_title_line1: string;
  documents_title_highlight: string;
  documents_description: string;
  documents: AdmissionDocument[];
  help_title_line1: string;
  help_title_highlight: string;
  help_description: string;
  help_button: string;
  help_href: string;
}

export interface ApplyOnlineFeature {
  icon: string;
  title: string;
  text: string;
}

export interface ApplyOnlineData {
  badge: string;
  title_line1: string;
  title_line2: string;
  title_highlight: string;
  description: string;
  features: ApplyOnlineFeature[];
  image: string;
  help_title: string;
  help_title_highlight?: string;
  help_text: string;
  phone: string;
  phone_sub: string;
  email: string;
  email_sub: string;
  location: string;
  journey_title: string;
  journey_title_highlight?: string;
  journey_text: string;
  form_title_line1: string;
  form_title_highlight: string;
  form_description: string;
  personal_title: string;
  academic_title: string;
  additional_title: string;
  full_name_label: string;
  full_name_placeholder: string;
  dob_label: string;
  gender_label: string;
  gender_placeholder: string;
  gender_options: string[];
  nationality_label: string;
  nationality_placeholder: string;
  nationality_options: string[];
  email_label: string;
  email_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  address_label: string;
  address_placeholder: string;
  course_label: string;
  course_placeholder: string;
  program_label: string;
  program_placeholder: string;
  year_label: string;
  year_placeholder: string;
  year_options: string[];
  qualification_label: string;
  qualification_placeholder: string;
  qualification_options: string[];
  upload_label: string;
  upload_button: string;
  upload_empty: string;
  upload_hint: string;
  hear_label: string;
  hear_placeholder: string;
  hear_options: string[];
  message_label: string;
  message_placeholder: string;
  agree_prefix: string;
  terms_text: string;
  terms_href: string;
  privacy_text: string;
  privacy_href: string;
  submit_text: string;
  success_text: string;
}

export interface TemplateSections {
  hero: HeroData;
  about: AboutData;
  courses: CoursesData;
  courseDetail: CourseDetailData;
  statistics: StatisticsData;
  whyChooseUs: WhyChooseUsData;
  gallery: GalleryData;
  videoGallery: VideoGalleryData;
  events: EventsData;
  testimonials: TestimonialsData;
  blog: BlogData;
  mission: MissionData;
  vision: VisionData;
  coreValues: CoreValuesData;
  programs: ProgramsData;
  programCta: ProgramCtaData;
  programDetail: ProgramDetailData;
  teachers: TeachersData;
  teacherDetail: TeacherDetailData;
  admission: AdmissionData;
  applyOnline: ApplyOnlineData;
}

export interface PageData {
  title?: string;
  pageName?: string;
  metadata?: {
    title: string;
  };
  components: { key: string; component: string }[];
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    Breadcrumb: BreadcrumbData;
  };
  categories: {
    Education: {
      templateComponents: {
        "template-1": {
          pages: {
            home: PageData;
            about?: PageData;
            whyChooseUs?: PageData;
            missionVision?: PageData;
            courses?: PageData;
            courseDetail?: PageData;
            program?: PageData;
            programDetail?: PageData;
            teachers?: PageData;
            teacherDetail?: PageData;
            admission?: PageData;
            applyOnline?: PageData;
            galleryPage?: PageData;
            testimonialsPage?: PageData;
          };
          sections: TemplateSections;
        };
      };
    };
  };
}
