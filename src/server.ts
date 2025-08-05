import express from 'express';
import cors from 'cors';
import { DataService } from './services/data.service';
import { ApiResponse } from './types';

class DoctorWebServer {
  private app: express.Application;
  private dataService: DataService;
  private port: number;

  constructor() {
    this.app = express();
    this.dataService = new DataService();
    this.port = parseInt(process.env.PORT || '3001', 10);
    
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    // Enable strict routing (no automatic trailing slash handling)
    this.app.set('strict routing', true);

    // CORS configuration
    this.app.use(cors({
      origin: [
        'http://localhost:4200',
        'http://localhost:4006',
        'http://localhost:3000',
        'https://ankurgoswami.com'
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    }));

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  }

  private setupRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Doctor Web Server',
        version: '1.0.0'
      });
    });

    // API routes with /api prefix
    this.app.use('/api', this.createApiRoutes());

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
      });
    });

    // Error handler
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Error:', err);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
      });
    });
  }

  private createApiRoutes(): express.Router {
    const router = express.Router();

    // Pages routes
    router.get('/pages', async (req, res) => {
      try {
        const pages = await this.dataService.getPages();
        const response: ApiResponse<typeof pages> = {
          success: true,
          data: pages
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch pages'
        });
      }
    });

    router.get('/pages/:slug', async (req, res) => {
      try {
        const page = await this.dataService.getPageBySlug(req.params.slug);
        if (!page) {
          return res.status(404).json({
            success: false,
            error: 'Page not found'
          });
        }
        const response: ApiResponse<typeof page> = {
          success: true,
          data: page
        };
        return res.json(response);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch page'
        });
      }
    });

    // Blog posts routes
    router.get('/blog-posts', async (req, res) => {
      try {
        const posts = await this.dataService.getBlogPosts();
        const response: ApiResponse<typeof posts> = {
          success: true,
          data: posts
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch blog posts'
        });
      }
    });

    router.get('/blog-posts/:slug', async (req, res) => {
      try {
        const post = await this.dataService.getBlogPostBySlug(req.params.slug);
        if (!post) {
          return res.status(404).json({
            success: false,
            error: 'Blog post not found'
          });
        }
        const response: ApiResponse<typeof post> = {
          success: true,
          data: post
        };
        return res.json(response);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch blog post'
        });
      }
    });

    // Doctors routes
    router.get('/doctors', async (req, res) => {
      try {
        const doctors = await this.dataService.getDoctors();
        const response: ApiResponse<typeof doctors> = {
          success: true,
          data: doctors
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch doctors'
        });
      }
    });

    router.get('/doctors/:slug', async (req, res) => {
      try {
        const doctor = await this.dataService.getDoctorBySlug(req.params.slug);
        if (!doctor) {
          return res.status(404).json({
            success: false,
            error: 'Doctor not found'
          });
        }
        const response: ApiResponse<typeof doctor> = {
          success: true,
          data: doctor
        };
        return res.json(response);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch doctor'
        });
      }
    });

    // Cases routes
    router.get('/cases', async (req, res) => {
      try {
        const cases = await this.dataService.getCases();
        const response: ApiResponse<typeof cases> = {
          success: true,
          data: cases
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch cases'
        });
      }
    });

    router.get('/cases/:slug', async (req, res) => {
      try {
        const caseStudy = await this.dataService.getCaseBySlug(req.params.slug);
        if (!caseStudy) {
          return res.status(404).json({
            success: false,
            error: 'Case not found'
          });
        }
        const response: ApiResponse<typeof caseStudy> = {
          success: true,
          data: caseStudy
        };
        return res.json(response);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch case'
        });
      }
    });

    // SEO settings route
    router.get('/seo-settings', async (req, res) => {
      try {
        const settings = await this.dataService.getSEOSettings();
        const response: ApiResponse<typeof settings> = {
          success: true,
          data: settings
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch SEO settings'
        });
      }
    });

    // Services routes
    router.get('/services', async (req, res) => {
      try {
        const services = await this.dataService.getServices();
        const response: ApiResponse<typeof services> = {
          success: true,
          data: services
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch services'
        });
      }
    });

    // Testimonials routes
    router.get('/testimonials', async (req, res) => {
      try {
        const testimonials = await this.dataService.getTestimonials();
        const response: ApiResponse<typeof testimonials> = {
          success: true,
          data: testimonials
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch testimonials'
        });
      }
    });

    // Appointments routes
    router.get('/appointments', async (req, res) => {
      try {
        const appointments = await this.dataService.getAppointments();
        const response: ApiResponse<typeof appointments> = {
          success: true,
          data: appointments
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch appointments'
        });
      }
    });

    // Categories routes
    router.get('/categories', async (req, res) => {
      try {
        const categories = await this.dataService.getCategories();
        const response: ApiResponse<typeof categories> = {
          success: true,
          data: categories
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch categories'
        });
      }
    });

    // Contact routes
    router.get('/contact', async (req, res) => {
      try {
        const contact = await this.dataService.getContact();
        const response: ApiResponse<typeof contact> = {
          success: true,
          data: contact
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch contact information'
        });
      }
    });

    // Settings routes
    router.get('/settings', async (req, res) => {
      try {
        const settings = await this.dataService.getSettings();
        const response: ApiResponse<typeof settings> = {
          success: true,
          data: settings
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch settings'
        });
      }
    });

    // Skills routes
    router.get('/skills', async (req, res) => {
      try {
        const skills = await this.dataService.getSkills();
        const response: ApiResponse<typeof skills> = {
          success: true,
          data: skills
        };
        return res.json(response);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch skills'
        });
      }
    });

    router.get('/skills/:slug', async (req, res) => {
      try {
        const { slug } = req.params;
        const skills = await this.dataService.getSkills();
        const skill = skills.find(s => s.slug === slug);
        
        if (!skill) {
          return res.status(404).json({
            success: false,
            error: 'Skill not found'
          });
        }

        const response: ApiResponse<typeof skill> = {
          success: true,
          data: skill
        };
        return res.json(response);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch skill'
        });
      }
    });

    // Articles routes
    router.get('/articles', async (req, res) => {
      try {
        const articles = await this.dataService.getArticles();
        const response: ApiResponse<typeof articles> = {
          success: true,
          data: articles
        };
        return res.json(response);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch articles'
        });
      }
    });

    router.get('/articles/:slug', async (req, res) => {
      try {
        const { slug } = req.params;
        const articles = await this.dataService.getArticles();
        const article = articles.find(a => a.slug === slug);
        
        if (!article) {
          return res.status(404).json({
            success: false,
            error: 'Article not found'
          });
        }

        const response: ApiResponse<typeof article> = {
          success: true,
          data: article
        };
        return res.json(response);
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to fetch article'
        });
      }
    });

    return router;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Doctor Web Server running on port ${this.port}`);
      console.log(`📊 Health check: http://localhost:${this.port}/health`);
      console.log(`🔗 API Base URL: http://localhost:${this.port}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  }
}

// Start the server
const server = new DoctorWebServer();
server.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
}); 