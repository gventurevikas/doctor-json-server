import * as fs from 'fs/promises';
import * as path from 'path';
import { Database, Page, BlogPost, Doctor, CaseStudy, SEOSettings } from '../types';

export class DataService {
  private dataDir: string;

  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
  }

  /**
   * Read data from a specific JSON file
   */
  async readDataFile<T>(filename: string): Promise<T> {
    try {
      const filePath = path.join(this.dataDir, filename);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error reading ${filename}:`, error);
      throw new Error(`Failed to read ${filename}`);
    }
  }

  /**
   * Write data to a specific JSON file
   */
  async writeDataFile<T>(filename: string, data: T): Promise<void> {
    try {
      const filePath = path.join(this.dataDir, filename);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error writing ${filename}:`, error);
      throw new Error(`Failed to write ${filename}`);
    }
  }

  /**
   * Get all pages
   */
  async getPages(): Promise<Page[]> {
    return this.readDataFile<Page[]>('pages.json');
  }

  /**
   * Get page by slug
   */
  async getPageBySlug(slug: string): Promise<Page | null> {
    const pages = await this.getPages();
    return pages.find(page => page.slug === slug) || null;
  }

  /**
   * Get page by ID
   */
  async getPageById(id: string): Promise<Page | null> {
    const pages = await this.getPages();
    return pages.find(page => page.id === id) || null;
  }

  /**
   * Create a new page
   */
  async createPage(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page> {
    const pages = await this.getPages();
    const newPage: Page = {
      ...page,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    pages.push(newPage);
    await this.writeDataFile('pages.json', pages);
    return newPage;
  }

  /**
   * Update a page
   */
  async updatePage(id: string, updates: Partial<Page>): Promise<Page | null> {
    const pages = await this.getPages();
    const index = pages.findIndex(page => page.id === id);
    
    if (index === -1) return null;
    
    const updatedPage: Page = {
      ...pages[index],
      ...updates,
      updatedAt: new Date().toISOString()
    } as Page;
    
    pages[index] = updatedPage;
    await this.writeDataFile('pages.json', pages);
    return updatedPage;
  }

  /**
   * Delete a page
   */
  async deletePage(id: string): Promise<boolean> {
    const pages = await this.getPages();
    const filteredPages = pages.filter(page => page.id !== id);
    
    if (filteredPages.length === pages.length) return false;
    
    await this.writeDataFile('pages.json', filteredPages);
    return true;
  }

  /**
   * Get all blog posts
   */
  async getBlogPosts(): Promise<BlogPost[]> {
    return this.readDataFile<BlogPost[]>('blog-posts.json');
  }

  /**
   * Get blog post by slug
   */
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  /**
   * Get blog post by ID
   */
  async getBlogPostById(id: string): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts();
    return posts.find(post => post.id === id) || null;
  }

  /**
   * Create a new blog post
   */
  async createBlogPost(post: Omit<BlogPost, 'id' | 'publishedDate' | 'updatedDate' | 'views' | 'likes'>): Promise<BlogPost> {
    const posts = await this.getBlogPosts();
    const newPost: BlogPost = {
      ...post,
      id: this.generateId(),
      publishedDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      views: 0,
      likes: 0
    };
    
    posts.push(newPost);
    await this.writeDataFile('blog-posts.json', posts);
    return newPost;
  }

  /**
   * Update a blog post
   */
  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts();
    const index = posts.findIndex(post => post.id === id);
    
    if (index === -1) return null;
    
    const updatedPost: BlogPost = {
      ...posts[index],
      ...updates,
      updatedDate: new Date().toISOString()
    } as BlogPost;
    
    posts[index] = updatedPost;
    await this.writeDataFile('blog-posts.json', posts);
    return updatedPost;
  }

  /**
   * Delete a blog post
   */
  async deleteBlogPost(id: string): Promise<boolean> {
    const posts = await this.getBlogPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    
    if (filteredPosts.length === posts.length) return false;
    
    await this.writeDataFile('blog-posts.json', filteredPosts);
    return true;
  }

  /**
   * Get all doctors
   */
  async getDoctors(): Promise<Doctor[]> {
    return this.readDataFile<Doctor[]>('doctors.json');
  }

  /**
   * Get doctor by slug
   */
  async getDoctorBySlug(slug: string): Promise<Doctor | null> {
    const doctors = await this.getDoctors();
    return doctors.find(doctor => doctor.slug === slug) || null;
  }

  /**
   * Get doctor by ID
   */
  async getDoctorById(id: string): Promise<Doctor | null> {
    const doctors = await this.getDoctors();
    return doctors.find(doctor => doctor.id === id) || null;
  }

  /**
   * Create a new doctor
   */
  async createDoctor(doctor: Omit<Doctor, 'id'>): Promise<Doctor> {
    const doctors = await this.getDoctors();
    const newDoctor: Doctor = {
      ...doctor,
      id: this.generateId()
    };
    
    doctors.push(newDoctor);
    await this.writeDataFile('doctors.json', doctors);
    return newDoctor;
  }

  /**
   * Update a doctor
   */
  async updateDoctor(id: string, updates: Partial<Doctor>): Promise<Doctor | null> {
    const doctors = await this.getDoctors();
    const index = doctors.findIndex(doctor => doctor.id === id);
    
    if (index === -1) return null;
    
    const updatedDoctor: Doctor = {
      ...doctors[index],
      ...updates
    } as Doctor;
    
    doctors[index] = updatedDoctor;
    await this.writeDataFile('doctors.json', doctors);
    return updatedDoctor;
  }

  /**
   * Delete a doctor
   */
  async deleteDoctor(id: string): Promise<boolean> {
    const doctors = await this.getDoctors();
    const filteredDoctors = doctors.filter(doctor => doctor.id !== id);
    
    if (filteredDoctors.length === doctors.length) return false;
    
    await this.writeDataFile('doctors.json', filteredDoctors);
    return true;
  }

  /**
   * Get all cases
   */
  async getCases(): Promise<CaseStudy[]> {
    return this.readDataFile<CaseStudy[]>('cases.json');
  }

  /**
   * Get case by slug
   */
  async getCaseBySlug(slug: string): Promise<CaseStudy | null> {
    const cases = await this.getCases();
    return cases.find(caseStudy => caseStudy.slug === slug) || null;
  }

  /**
   * Get case by ID
   */
  async getCaseById(id: string): Promise<CaseStudy | null> {
    const cases = await this.getCases();
    return cases.find(caseStudy => caseStudy.id === id) || null;
  }

  /**
   * Create a new case
   */
  async createCase(caseStudy: Omit<CaseStudy, 'id'>): Promise<CaseStudy> {
    const cases = await this.getCases();
    const newCase: CaseStudy = {
      ...caseStudy,
      id: this.generateId()
    };
    
    cases.push(newCase);
    await this.writeDataFile('cases.json', cases);
    return newCase;
  }

  /**
   * Update a case
   */
  async updateCase(id: string, updates: Partial<CaseStudy>): Promise<CaseStudy | null> {
    const cases = await this.getCases();
    const index = cases.findIndex(caseStudy => caseStudy.id === id);
    
    if (index === -1) return null;
    
    const updatedCase: CaseStudy = {
      ...cases[index],
      ...updates
    } as CaseStudy;
    
    cases[index] = updatedCase;
    await this.writeDataFile('cases.json', cases);
    return updatedCase;
  }

  /**
   * Delete a case
   */
  async deleteCase(id: string): Promise<boolean> {
    const cases = await this.getCases();
    const filteredCases = cases.filter(caseStudy => caseStudy.id !== id);
    
    if (filteredCases.length === cases.length) return false;
    
    await this.writeDataFile('cases.json', filteredCases);
    return true;
  }

  /**
   * Get SEO settings
   */
  async getSEOSettings(): Promise<SEOSettings> {
    return this.readDataFile<SEOSettings>('seo-settings.json');
  }

  /**
   * Update SEO settings
   */
  async updateSEOSettings(updates: Partial<SEOSettings>): Promise<SEOSettings> {
    const settings = await this.getSEOSettings();
    const updatedSettings = {
      ...settings,
      ...updates
    };
    
    await this.writeDataFile('seo-settings.json', updatedSettings);
    return updatedSettings;
  }

  /**
   * Get all services
   */
  async getServices(): Promise<any[]> {
    return this.readDataFile<any[]>('services.json');
  }

  /**
   * Get all testimonials
   */
  async getTestimonials(): Promise<any[]> {
    return this.readDataFile<any[]>('testimonials.json');
  }

  /**
   * Get all appointments
   */
  async getAppointments(): Promise<any[]> {
    return this.readDataFile<any[]>('appointments.json');
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<any[]> {
    return this.readDataFile<any[]>('categories.json');
  }

  /**
   * Get contact information
   */
  async getContact(): Promise<any> {
    return this.readDataFile<any>('contact.json');
  }

  /**
   * Get website settings
   */
  async getSettings(): Promise<any> {
    return this.readDataFile<any>('settings.json');
  }

  /**
   * Get all skills
   */
  async getSkills(): Promise<any[]> {
    return this.readDataFile<any[]>('skills.json');
  }

  /**
   * Get all articles
   */
  async getArticles(): Promise<any[]> {
    return this.readDataFile<any[]>('articles.json');
  }

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Get all data (for JSON server compatibility)
   */
  async getAllData(): Promise<Database> {
    const [pages, blogPosts, doctors, cases, seoSettings] = await Promise.all([
      this.getPages(),
      this.getBlogPosts(),
      this.getDoctors(),
      this.getCases(),
      this.getSEOSettings()
    ]);

    return {
      pages,
      'blog-posts': blogPosts,
      doctors,
      cases,
      'seo-settings': seoSettings
    };
  }
} 