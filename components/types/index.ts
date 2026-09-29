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
  image: string;
  price: string;
  title: string;
  description: string;
  category: string;
  lessons: string;
  students: string;
  rating: number;
}

export interface CoursesData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  list: CourseItem[];
  button_text: string;
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
  stats: { value: string; label: string }[];
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

export interface TemplateSections {
  hero: HeroData;
  about: AboutData;
  courses: CoursesData;
  statistics: StatisticsData;
  whyChooseUs: WhyChooseUsData;
  gallery: GalleryData;
  events: EventsData;
  testimonials: TestimonialsData;
  blog: BlogData;
}

export interface PageData {
  components: { key: string; component: string }[];
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
  };
  categories: {
    Education: {
      templateComponents: {
        "template-1": {
          pages: {
            home: PageData;
          };
          sections: TemplateSections;
        };
      };
    };
  };
}
