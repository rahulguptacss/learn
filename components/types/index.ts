// ============================================================
// Shared type definitions for the LearnHub site data
// ============================================================

export interface PageMetadata {
  title?: string;
  description?: string;
  [key: string]: any;
}

export interface PageData {
  title?: string;
  pageName?: string;
  metadata?: PageMetadata;
  [key: string]: any;
}

export interface HeaderLink {
  name: string;
  href: string;
  active?: boolean;
  dropdown?: { name: string; href: string }[];
}

export interface HeaderData {
  logo_text?: string;
  logo_image?: string;
  links: HeaderLink[];
  button_text?: string;
  button_link?: string;
  [key: string]: any;
}

export interface CourseItem {
  id: string;
  title: string;
  slug?: string;
  [key: string]: any;
}

export interface TeacherItem {
  id: string;
  name: string;
  slug?: string;
  [key: string]: any;
}

export interface EventExpectItem {
  icon?: string;
  title: string;
  description: string;
}

export interface EventItem {
  id: string | number;
  slug?: string;
  image: string;
  category?: string;
  title: string;
  title_line1?: string;
  title_highlight?: string;
  date: string;
  month?: string;
  full_date?: string;
  time?: string;
  location?: string;
  total_seats?: string;
  event_type?: string;
  description?: string;
  long_description?: string;
  about?: string;
  what_to_expect?: EventExpectItem[];
  who_can_attend?: string;
  read_more_text?: string;
  map_embed?: string;
  map_label?: string;
  map_link?: string;
}

export interface EventsData {
  subtitle?: string;
  title_line1?: string;
  title_highlight?: string;
  description: string;
  button_text?: string;
  categories?: string[];
  list: EventItem[];
  [key: string]: any;
}

export interface NewsItem {
  id: string | number;
  slug?: string;
  image: string;
  category: string;
  title: string;
  date: string;
  time: string;
  location: string;
  author?: string;
  description: string;
  content?: string[];
  quote?: {
    text: string;
    author: string;
  };
  benefits?: string[];
}

export interface NewsData {
  subtitle?: string;
  title_line1?: string;
  title_highlight?: string;
  description?: string;
  categories?: { name: string; count: string }[];
  list: NewsItem[];
  [key: string]: any;
}

export interface BlogItem {
  id: string | number;
  slug?: string;
  image?: string;
  category?: string;
  title: string;
  date: string | number;
  month: string;
  description: string;
  author: string;
  authorImage?: string;
  authorRole?: string;
  content?: string[];
  quote?: {
    text: string;
    author: string;
  };
  benefitsTitle?: string;
  benefits?: string[];
  [key: string]: any;
}

export interface BlogData {
  subtitle?: string;
  title_line1?: string;
  title_highlight?: string;
  description: string;
  button_text?: string;
  categories?: { name: string; count: string }[];
  list: BlogItem[];
  [key: string]: any;
}

export interface FacilityItem {
  title: string;
  description: string;
  image: string;
  icon: string;
  [key: string]: any;
}

export interface FacilitiesData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  list: FacilityItem[];
  stats: {
    value: string;
    label: string;
  }[];
  [key: string]: any;
}

export interface EnquiryData {
  left_title: string;
  left_title_highlight: string;
  description: string;
  contact_info: {
    title: string;
    content: string;
    icon: string;
  }[];
  right_title: string;
  right_title_highlight: string;
  right_description: string;
  features: {
    title: string;
    content: string;
    icon: string;
  }[];
  socials?: {
    icon: string;
    href: string;
  }[];
  [key: string]: any;
}

export interface FaqData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  left_section: {
    image: string;
    blob_text: string;
    features: {
      icon: string;
      text: string;
    }[];
    support_box: {
      title: string;
      description: string;
      button_text: string;
    };
  };
  questions: {
    question: string;
    answer: string;
  }[];
  [key: string]: any;
}

export interface StatisticsItem {
  icon: string;
  value: string;
  label: string;
  [key: string]: any;
}

export interface StatisticsData {
  subtitle?: string;
  title_line1?: string;
  title_highlight?: string;
  list: StatisticsItem[];
  [key: string]: any;
}

export interface ContactData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  lets_talk: {
    title_line1: string;
    title_highlight: string;
    description: string;
    items: {
      icon: string;
      title: string;
      content: string;
    }[];
    social_title: string;
    socials: {
      icon: string;
      href: string;
    }[];
  };
  form: {
    title_line1: string;
    title_highlight: string;
    description: string;
    button_text: string;
  };
  image_section: {
    image: string;
    support_box: {
      icon: string;
      title: string;
      description: string;
    };
  };
  map_iframe: string;
  [key: string]: any;
}

export interface NotFoundData {
  subtitle: string;
  title_404: {
    digit1: string;
    digit2: string;
    digit3: string;
  };
  heading_line1: string;
  heading_highlight: string;
  description: string;
  button: {
    text: string;
    link: string;
  };
  image: string;
  [key: string]: any;
}

export interface PolicyData {
  title_line1: string;
  title_highlight: string;
  description: string;
  policies: {
    number: string;
    title: string;
    content: string;
  }[];
  footer_message: string;
  [key: string]: any;
}

export interface SitemapData {
  subtitle: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  categories: {
    title: string;
    icon: string;
    links: {
      name: string;
      href: string;
    }[];
  }[];
  help_card: {
    title: string;
    description: string;
    button_text: string;
    button_href: string;
  };
  [key: string]: any;
}

export interface SocialItem {
  icon: string;
  href: string;
}

export interface FooterLinkItem {
  name: string;
  href: string;
}

export interface FooterContact {
  phone: string;
  phone_sub: string;
  email: string;
  email_sub: string;
  address: string;
  address_sub: string;
}

export interface FooterData {
  logo_text: string;
  description: string;
  socials: SocialItem[];
  quick_links: FooterLinkItem[];
  extra_links: FooterLinkItem[];
  contact: FooterContact;
  copyright: string;
  bottom_links?: FooterLinkItem[];
  [key: string]: any;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    Breadcrumb: Record<string, any>;
    [key: string]: any;
  };
  categories: {
    Education: {
      templateComponents: {
        'template-1': {
          pages: Record<string, PageData>;
          sections: Record<string, any>;
        };
        [key: string]: {
          pages: Record<string, PageData>;
          sections: Record<string, any>;
        };
      };
    };
    [key: string]: any;
  };
  [key: string]: any;
}
export interface CoreValuesData { [key: string]: any; }
export interface CourseDetailData { [key: string]: any; }
export interface CoursesData { [key: string]: any; }
export interface GalleryData { [key: string]: any; }
export interface HeroData { [key: string]: any; }
export interface MissionData { [key: string]: any; }
export interface ProgramCtaData { [key: string]: any; }
export interface ProgramDetailData { [key: string]: any; }
export interface ProgramItem { [key: string]: any; }
export interface ProgramsData { [key: string]: any; }
export interface TeacherDetailData { [key: string]: any; }
export interface TeachersData { [key: string]: any; }
export interface TestimonialsData { [key: string]: any; }
export interface TestimonialItem { [key: string]: any; }
export interface VideoGalleryData { [key: string]: any; }
export interface VisionData { [key: string]: any; }
export interface WhyChooseUsData { [key: string]: any; }


export interface AboutData { [key: string]: any; }
export interface AdmissionData { [key: string]: any; }
export interface ApplyOnlineData { [key: string]: any; }
export interface BreadcrumbData { [key: string]: any; }

