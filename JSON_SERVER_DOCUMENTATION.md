# JSON Server Documentation for Doctor Website

## Overview

This documentation provides a complete guide for setting up a JSON server to make the doctor website content dynamic with comprehensive SEO meta tags support. The server will serve all website content including pages, blog posts, doctors, cases, and other dynamic content with proper meta tags for SEO optimization.

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Database Schema](#database-schema)
3. [API Endpoints](#api-endpoints)
4. [SEO Meta Tags Implementation](#seo-meta-tags-implementation)
5. [Angular Integration](#angular-integration)
6. [Usage Examples](#usage-examples)
7. [Deployment](#deployment)

## Installation & Setup

### 1. Install Dependencies

```bash
cd doctor-website
npm install json-server @types/json-server cors @types/cors
```

### 2. Create JSON Server Configuration

Create `json-server.config.js` in the root directory:

```javascript
module.exports = {
  port: 3001,
  host: 'localhost',
  watch: true,
  routes: {
    '/api/*': '/$1'
  },
  middlewares: [
    require('cors')({
      origin: ['http://localhost:4200', 'http://localhost:4000'],
      credentials: true
    })
  ]
};
```

### 3. Create Database File

Create `db.json` in the root directory:

```json
{
  "pages": [],
  "blog-posts": [],
  "doctors": [],
  "cases": [],
  "services": [],
  "testimonials": [],
  "categories": [],
  "seo-settings": {}
}
```

### 4. Add Scripts to package.json

```json
{
  "scripts": {
    "json-server": "json-server --watch db.json --config json-server.config.js",
    "json-server:dev": "json-server --watch db.json --port 3001 --host localhost",
    "start:full": "concurrently \"npm run start\" \"npm run json-server\""
  }
}
```

## Database Schema

### 1. Pages Collection

```typescript
interface Page {
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

interface PageComponent {
  id: string;
  type: 'hero' | 'services' | 'testimonials' | 'contact' | 'gallery';
  data: any;
  order: number;
}
```

### 2. Blog Posts Collection

```typescript
interface BlogPost {
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

interface BlogAuthor {
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

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  seo: SEOMetadata;
}
```

### 3. Doctors Collection

```typescript
interface Doctor {
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

interface DoctorAvailability {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
}

interface TimeSlot {
  start: string;
  end: string;
}

interface DoctorContact {
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
```

### 4. Cases Collection

```typescript
interface CaseStudy {
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
```

### 5. SEO Metadata Interface

```typescript
interface SEOMetadata {
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
```

### 6. SEO Settings Collection

```typescript
interface SEOSettings {
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
```

## API Endpoints

### Pages Endpoints

```typescript
// Get all pages
GET /api/pages

// Get page by slug
GET /api/pages?slug=about

// Get page by ID
GET /api/pages/:id

// Create new page
POST /api/pages

// Update page
PUT /api/pages/:id
PATCH /api/pages/:id

// Delete page
DELETE /api/pages/:id
```

### Blog Posts Endpoints

```typescript
// Get all blog posts
GET /api/blog-posts

// Get published blog posts
GET /api/blog-posts?status=published

// Get blog posts by category
GET /api/blog-posts?categories_like=heart-health

// Get blog post by slug
GET /api/blog-posts?slug=heart-health-tips

// Get blog post by ID
GET /api/blog-posts/:id

// Create new blog post
POST /api/blog-posts

// Update blog post
PUT /api/blog-posts/:id
PATCH /api/blog-posts/:id

// Delete blog post
DELETE /api/blog-posts/:id
```

### Doctors Endpoints

```typescript
// Get all doctors
GET /api/doctors

// Get doctor by slug
GET /api/doctors?slug=dr-ankur-goswami

// Get doctor by ID
GET /api/doctors/:id

// Get doctors by specialization
GET /api/doctors?specialization_like=spine

// Create new doctor
POST /api/doctors

// Update doctor
PUT /api/doctors/:id
PATCH /api/doctors/:id

// Delete doctor
DELETE /api/doctors/:id
```

### Cases Endpoints

```typescript
// Get all cases
GET /api/cases

// Get published cases
GET /api/cases?status=published

// Get case by slug
GET /api/cases?slug=spinal-fusion-case-study

// Get case by ID
GET /api/cases/:id

// Get cases by specialization
GET /api/cases?specialization_like=spine

// Create new case
POST /api/cases

// Update case
PUT /api/cases/:id
PATCH /api/cases/:id

// Delete case
DELETE /api/cases/:id
```

### SEO Settings Endpoints

```typescript
// Get SEO settings
GET /api/seo-settings

// Update SEO settings
PUT /api/seo-settings/:id
PATCH /api/seo-settings/:id
```

## SEO Meta Tags Implementation

### 1. Angular SEO Service

Create `src/app/core/services/seo.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SEOMetadata, SEOSettings } from '../models/seo.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultSettings: SEOSettings = {
    id: '1',
    siteName: 'Dr. Ankur Goswami - Spine Surgeon',
    siteDescription: 'Leading spine surgeon specializing in advanced spinal procedures and minimally invasive spine surgery.',
    siteKeywords: ['spine surgeon', 'orthopedic surgery', 'minimally invasive spine surgery', 'spinal fusion'],
    siteAuthor: 'Dr. Ankur Goswami',
    siteUrl: 'https://dr-ankur-goswami.com',
    defaultOgImage: '/assets/images/og-default.jpg',
    defaultTwitterImage: '/assets/images/twitter-default.jpg',
    schemaMarkup: {
      organization: {
        "@type": "MedicalBusiness",
        "name": "Dr. Ankur Goswami Spine Surgery",
        "description": "Leading spine surgery practice"
      }
    }
  };

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  updateSEO(seoData: SEOMetadata, pageUrl?: string): void {
    // Update title
    this.titleService.setTitle(seoData.metaTitle || this.defaultSettings.siteName);

    // Update meta tags
    this.updateMetaTags(seoData, pageUrl);
    
    // Update Open Graph tags
    this.updateOpenGraphTags(seoData, pageUrl);
    
    // Update Twitter tags
    this.updateTwitterTags(seoData);
    
    // Update canonical URL
    this.updateCanonicalUrl(seoData.canonicalUrl || pageUrl);
    
    // Update structured data
    this.updateStructuredData(seoData.structuredData);
  }

  private updateMetaTags(seoData: SEOMetadata, pageUrl?: string): void {
    const tags = [
      { name: 'description', content: seoData.metaDescription },
      { name: 'keywords', content: seoData.keywords?.join(', ') },
      { name: 'author', content: seoData.author || this.defaultSettings.siteAuthor }
    ];

    tags.forEach(tag => {
      if (tag.content) {
        this.metaService.updateTag(tag);
      }
    });
  }

  private updateOpenGraphTags(seoData: SEOMetadata, pageUrl?: string): void {
    const ogTags = [
      { property: 'og:title', content: seoData.ogTitle || seoData.metaTitle },
      { property: 'og:description', content: seoData.ogDescription || seoData.metaDescription },
      { property: 'og:image', content: seoData.ogImage || this.defaultSettings.defaultOgImage },
      { property: 'og:url', content: seoData.ogUrl || pageUrl || this.defaultSettings.siteUrl },
      { property: 'og:type', content: seoData.ogType || 'website' },
      { property: 'og:site_name', content: this.defaultSettings.siteName }
    ];

    ogTags.forEach(tag => {
      if (tag.content) {
        this.metaService.updateTag(tag);
      }
    });
  }

  private updateTwitterTags(seoData: SEOMetadata): void {
    const twitterTags = [
      { name: 'twitter:card', content: seoData.twitterCard || 'summary_large_image' },
      { name: 'twitter:title', content: seoData.twitterTitle || seoData.metaTitle },
      { name: 'twitter:description', content: seoData.twitterDescription || seoData.metaDescription },
      { name: 'twitter:image', content: seoData.twitterImage || this.defaultSettings.defaultTwitterImage }
    ];

    if (this.defaultSettings.twitterUsername) {
      twitterTags.push({ name: 'twitter:site', content: this.defaultSettings.twitterUsername });
    }

    twitterTags.forEach(tag => {
      if (tag.content) {
        this.metaService.updateTag(tag);
      }
    });
  }

  private updateCanonicalUrl(canonicalUrl?: string): void {
    if (canonicalUrl) {
      let link: HTMLLinkElement = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonicalUrl;
    }
  }

  private updateStructuredData(structuredData?: any): void {
    if (structuredData) {
      let script: HTMLScriptElement = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }

  resetToDefaults(): void {
    this.updateSEO({
      metaTitle: this.defaultSettings.siteName,
      metaDescription: this.defaultSettings.siteDescription,
      keywords: this.defaultSettings.siteKeywords,
      author: this.defaultSettings.siteAuthor,
      ogTitle: this.defaultSettings.siteName,
      ogDescription: this.defaultSettings.siteDescription,
      ogImage: this.defaultSettings.defaultOgImage,
      ogUrl: this.defaultSettings.siteUrl,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: this.defaultSettings.siteName,
      twitterDescription: this.defaultSettings.siteDescription,
      twitterImage: this.defaultSettings.defaultTwitterImage,
      canonicalUrl: this.defaultSettings.siteUrl,
      structuredData: this.defaultSettings.schemaMarkup.organization
    });
  }
}
```

### 2. SEO Models

Create `src/app/core/models/seo.model.ts`:

```typescript
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
```

## Angular Integration

### 1. Update Components to Use SEO Service

Example for `home.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageService } from '../../core/services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageData: any = null;
  loading = true;

  constructor(
    private seoService: SeoService,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.loadPageData();
  }

  private loadPageData(): void {
    this.pageService.getPageBySlug('home').subscribe({
      next: (page) => {
        this.pageData = page;
        if (page?.seo) {
          this.seoService.updateSEO(page.seo, window.location.href);
        } else {
          this.seoService.resetToDefaults();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading page data:', error);
        this.seoService.resetToDefaults();
        this.loading = false;
      }
    });
  }
}
```

### 2. Create Page Service

Create `src/app/core/services/page.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private apiUrl = `${environment.apiUrl}/pages`;

  constructor(private http: HttpClient) {}

  getPageBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?slug=${slug}`);
  }

  getPageById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getAllPages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createPage(page: any): Observable<any> {
    return this.http.post(this.apiUrl, page);
  }

  updatePage(id: string, page: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, page);
  }

  deletePage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
```

### 3. Update Environment Configuration

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/api'
};
```

Update `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'
};
```

## Usage Examples

### 1. Sample Database Data

```json
{
  "pages": [
    {
      "id": "1",
      "slug": "home",
      "title": "Dr. Ankur Goswami - Leading Spine Surgeon",
      "content": "Welcome to the practice of Dr. Ankur Goswami...",
      "template": "home",
      "status": "published",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "seo": {
        "metaTitle": "Dr. Ankur Goswami - Leading Spine Surgeon in India",
        "metaDescription": "Expert spine surgeon Dr. Ankur Goswami specializes in minimally invasive spine surgery, spinal fusion, and advanced spinal procedures. Book your consultation today.",
        "keywords": ["spine surgeon", "orthopedic surgery", "minimally invasive spine surgery", "spinal fusion", "India"],
        "author": "Dr. Ankur Goswami",
        "ogTitle": "Dr. Ankur Goswami - Leading Spine Surgeon",
        "ogDescription": "Expert spine surgeon specializing in advanced spinal procedures and minimally invasive techniques.",
        "ogImage": "/assets/images/doctor/team-1.jpg",
        "ogUrl": "https://dr-ankur-goswami.com",
        "ogType": "website",
        "twitterCard": "summary_large_image",
        "twitterTitle": "Dr. Ankur Goswami - Leading Spine Surgeon",
        "twitterDescription": "Expert spine surgeon specializing in advanced spinal procedures.",
        "twitterImage": "/assets/images/doctor/team-1.jpg",
        "canonicalUrl": "https://dr-ankur-goswami.com",
        "structuredData": {
          "@type": "MedicalBusiness",
          "name": "Dr. Ankur Goswami Spine Surgery",
          "description": "Leading spine surgery practice",
          "url": "https://dr-ankur-goswami.com",
          "telephone": "+91-XXXXXXXXXX",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Your Address",
            "addressLocality": "Your City",
            "addressRegion": "Your State",
            "postalCode": "XXXXXX",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "YOUR_LATITUDE",
            "longitude": "YOUR_LONGITUDE"
          },
          "openingHours": "Mo-Fr 09:00-17:00",
          "priceRange": "$$"
        }
      },
      "components": [
        {
          "id": "1",
          "type": "hero",
          "data": {
            "title": "Welcome to Expert Spine Care",
            "subtitle": "Leading spine surgeon specializing in advanced procedures",
            "backgroundImage": "/assets/images/s1.jpg",
            "ctaText": "Book Appointment",
            "ctaLink": "/appointment"
          },
          "order": 1
        }
      ]
    }
  ],
  "blog-posts": [
    {
      "id": "1",
      "title": "Understanding Minimally Invasive Spine Surgery",
      "slug": "understanding-minimally-invasive-spine-surgery",
      "excerpt": "Learn about the benefits and procedures of minimally invasive spine surgery...",
      "content": "Minimally invasive spine surgery (MISS) is a modern approach...",
      "featuredImage": "/assets/images/blog/miss-surgery.jpg",
      "author": {
        "id": "1",
        "name": "Dr. Ankur Goswami",
        "bio": "Leading spine surgeon with over 15 years of experience",
        "avatar": "/assets/images/doctor/team-1.jpg",
        "title": "Spine Surgeon",
        "email": "dr.ankur@example.com",
        "social": {
          "twitter": "@dr_ankur",
          "linkedin": "dr-ankur-goswami",
          "website": "https://dr-ankur-goswami.com",
          "facebook": "dr.ankur.goswami"
        }
      },
      "publishedDate": "2024-01-15T00:00:00Z",
      "categories": [
        {
          "id": "1",
          "name": "Spine Surgery",
          "slug": "spine-surgery",
          "color": "#FF4555",
          "icon": "fa-spine"
        }
      ],
      "tags": ["spine surgery", "minimally invasive", "MISS", "orthopedic"],
      "readTime": 8,
      "status": "published",
      "views": 1250,
      "likes": 45,
      "seo": {
        "metaTitle": "Understanding Minimally Invasive Spine Surgery | Dr. Ankur Goswami",
        "metaDescription": "Learn about the benefits, procedures, and recovery process of minimally invasive spine surgery from expert spine surgeon Dr. Ankur Goswami.",
        "keywords": ["minimally invasive spine surgery", "MISS", "spine surgery", "orthopedic surgery", "Dr. Ankur Goswami"],
        "author": "Dr. Ankur Goswami",
        "ogTitle": "Understanding Minimally Invasive Spine Surgery",
        "ogDescription": "Learn about the benefits and procedures of minimally invasive spine surgery from expert spine surgeon Dr. Ankur Goswami.",
        "ogImage": "/assets/images/blog/miss-surgery.jpg",
        "ogUrl": "https://dr-ankur-goswami.com/blog/understanding-minimally-invasive-spine-surgery",
        "ogType": "article",
        "twitterCard": "summary_large_image",
        "twitterTitle": "Understanding Minimally Invasive Spine Surgery",
        "twitterDescription": "Learn about the benefits and procedures of minimally invasive spine surgery.",
        "twitterImage": "/assets/images/blog/miss-surgery.jpg",
        "canonicalUrl": "https://dr-ankur-goswami.com/blog/understanding-minimally-invasive-spine-surgery",
        "structuredData": {
          "@type": "Article",
          "headline": "Understanding Minimally Invasive Spine Surgery",
          "description": "Learn about the benefits, procedures, and recovery process of minimally invasive spine surgery.",
          "image": "/assets/images/blog/miss-surgery.jpg",
          "author": {
            "@type": "Person",
            "name": "Dr. Ankur Goswami",
            "jobTitle": "Spine Surgeon",
            "url": "https://dr-ankur-goswami.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Dr. Ankur Goswami Spine Surgery",
            "logo": {
              "@type": "ImageObject",
              "url": "/assets/images/logo.png"
            }
          },
          "datePublished": "2024-01-15T00:00:00Z",
          "dateModified": "2024-01-15T00:00:00Z",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://dr-ankur-goswami.com/blog/understanding-minimally-invasive-spine-surgery"
          }
        }
      }
    }
  ],
  "seo-settings": {
    "id": "1",
    "siteName": "Dr. Ankur Goswami - Spine Surgeon",
    "siteDescription": "Leading spine surgeon specializing in advanced spinal procedures and minimally invasive spine surgery.",
    "siteKeywords": ["spine surgeon", "orthopedic surgery", "minimally invasive spine surgery", "spinal fusion", "India"],
    "siteAuthor": "Dr. Ankur Goswami",
    "siteUrl": "https://dr-ankur-goswami.com",
    "defaultOgImage": "/assets/images/og-default.jpg",
    "defaultTwitterImage": "/assets/images/twitter-default.jpg",
    "googleAnalyticsId": "GA_MEASUREMENT_ID",
    "googleTagManagerId": "GTM-XXXXXXX",
    "facebookPixelId": "XXXXXXXXXX",
    "twitterUsername": "@dr_ankur",
    "facebookPageId": "XXXXXXXXXX",
    "linkedinCompanyId": "XXXXXXXXXX",
    "schemaMarkup": {
      "organization": {
        "@type": "MedicalBusiness",
        "name": "Dr. Ankur Goswami Spine Surgery",
        "description": "Leading spine surgery practice specializing in advanced spinal procedures",
        "url": "https://dr-ankur-goswami.com",
        "telephone": "+91-XXXXXXXXXX",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Address",
          "addressLocality": "Your City",
          "addressRegion": "Your State",
          "postalCode": "XXXXXX",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "YOUR_LATITUDE",
          "longitude": "YOUR_LONGITUDE"
        },
        "openingHours": "Mo-Fr 09:00-17:00",
        "priceRange": "$$",
        "sameAs": [
          "https://www.facebook.com/dr.ankur.goswami",
          "https://twitter.com/dr_ankur",
          "https://www.linkedin.com/in/dr-ankur-goswami"
        ]
      },
      "medicalBusiness": {
        "@type": "MedicalBusiness",
        "name": "Dr. Ankur Goswami Spine Surgery",
        "medicalSpecialty": "Spine Surgery",
        "availableService": [
          {
            "@type": "MedicalProcedure",
            "name": "Minimally Invasive Spine Surgery"
          },
          {
            "@type": "MedicalProcedure",
            "name": "Spinal Fusion"
          },
          {
            "@type": "MedicalProcedure",
            "name": "Disc Replacement"
          }
        ]
      },
      "person": {
        "@type": "Person",
        "name": "Dr. Ankur Goswami",
        "jobTitle": "Spine Surgeon",
        "description": "Leading spine surgeon with over 15 years of experience",
        "url": "https://dr-ankur-goswami.com",
        "image": "/assets/images/doctor/team-1.jpg",
        "sameAs": [
          "https://www.facebook.com/dr.ankur.goswami",
          "https://twitter.com/dr_ankur",
          "https://www.linkedin.com/in/dr-ankur-goswami"
        ],
        "worksFor": {
          "@type": "MedicalBusiness",
          "name": "Dr. Ankur Goswami Spine Surgery"
        }
      }
    }
  }
}
```

### 2. Running the Server

```bash
# Start JSON server
npm run json-server

# Start both Angular app and JSON server
npm run start:full
```

### 3. Testing API Endpoints

```bash
# Get all pages
curl http://localhost:3001/api/pages

# Get home page
curl http://localhost:3001/api/pages?slug=home

# Get all blog posts
curl http://localhost:3001/api/blog-posts

# Get published blog posts
curl http://localhost:3001/api/blog-posts?status=published
```

## Deployment

### 1. Production Setup

For production deployment, consider using:

- **Heroku**: Deploy JSON server as a separate service
- **Vercel**: Use Vercel Functions for API endpoints
- **AWS**: Deploy on EC2 or use Lambda functions
- **DigitalOcean**: Deploy on a droplet

### 2. Environment Variables

Create `.env` file for production:

```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-domain.com
DB_PATH=/path/to/db.json
```

### 3. PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'doctor-website-api',
    script: 'node_modules/json-server/lib/cli/bin.js',
    args: '--watch db.json --port 3001',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

### 4. Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Angular app
    location / {
        root /var/www/doctor-website/dist/browser;
        try_files $uri $uri/ /index.html;
    }

    # API endpoints
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Conclusion

This documentation provides a complete solution for making the doctor website content dynamic with comprehensive SEO meta tags support. The JSON server setup allows for easy content management while maintaining proper SEO optimization for all pages, blog posts, doctor profiles, and case studies.

The implementation includes:

1. ✅ Complete meta tags support (description, keywords, author, Open Graph, Twitter Cards, canonical URLs)
2. ✅ Structured data for better search engine understanding
3. ✅ Dynamic content management through JSON server
4. ✅ Angular integration with SEO service
5. ✅ Production deployment guidelines
6. ✅ Comprehensive API endpoints for all content types

This setup will significantly improve the website's SEO performance and make content management much more efficient. 