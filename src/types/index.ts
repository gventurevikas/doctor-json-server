// SEO Metadata Interface
export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  author: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  structuredData?: any;
}

// SEO Settings Interface
export interface SEOSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  siteKeywords: string[];
  siteAuthor: string;
  siteUrl: string;
  defaultOgImage: string;
  defaultTwitterImage: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  twitterUsername?: string;
  facebookPageId?: string;
  linkedinCompanyId?: string;
  schemaMarkup: {
    organization: any;
    medicalBusiness?: any;
    person?: any;
  };
}

// Page Component Interface
export interface PageComponent {
  id: string;
  type: 'hero' | 'services' | 'testimonials' | 'contact' | 'gallery';
  data: any;
  order: number;
}

// Page Interface
export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  template: 'home' | 'about' | 'contact' | 'services' | 'custom';
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  seo: SEOMetadata;
  components: PageComponent[];
}

// Blog Author Interface
export interface BlogAuthor {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  title: string;
  email: string;
  social: {
    twitter: string;
    linkedin: string;
    website: string;
    facebook: string;
  };
}

// Blog Category Interface
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  seo: SEOMetadata;
}

// Blog Post Interface
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: BlogAuthor;
  publishedDate: string;
  updatedDate?: string;
  categories: BlogCategory[];
  tags: string[];
  readTime: number;
  status: 'published' | 'draft' | 'archived';
  views: number;
  likes: number;
  seo: SEOMetadata;
}

// Time Slot Interface
export interface TimeSlot {
  start: string;
  end: string;
}

// Doctor Availability Interface
export interface DoctorAvailability {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
}

// Doctor Contact Interface
export interface DoctorContact {
  phone: string;
  email: string;
  address: string;
  clinicName?: string;
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
}

// Doctor Interface
export interface Doctor {
  id: string;
  name: string;
  bio: string;
  slug: string;
  title: string;
  specialization: string[];
  experience: number;
  education: string[];
  about: string;
  profileImage: string;
  rating: number;
  totalReviews: number;
  availability: DoctorAvailability;
  contact: DoctorContact;
  languages: string[];
  certifications: string[];
  awards?: string[];
  seo: SEOMetadata;
}

// Case Study Interface
export interface CaseStudy {
  id: string;
  name: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  profileImage: string;
  specialization: string[];
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  outcome: string;
  beforeImage?: string;
  afterImage?: string;
  patientAge?: number;
  patientGender?: 'male' | 'female' | 'other';
  procedureDate: string;
  followUpDate?: string;
  status: 'published' | 'draft' | 'archived';
  seo: SEOMetadata;
}

// Database Interface
export interface Database {
  pages: Page[];
  'blog-posts': BlogPost[];
  doctors: Doctor[];
  cases: CaseStudy[];
  'seo-settings': SEOSettings;
}

// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Pagination Interface
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Paginated Response Interface
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
} 