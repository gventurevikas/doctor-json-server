# Doctor Web Server Data Files

This directory contains all the JSON data files for the Doctor Web Server. Each file represents a different aspect of the website's content and functionality.

## File Structure

### Core Content Files

1. **`pages.json`** - Website pages content
   - Home page, About page, and other static pages
   - Includes SEO metadata and page components
   - Template-based content management

2. **`blog-posts.json`** - Blog articles
   - Medical articles and educational content
   - Author information and categories
   - SEO optimized with meta tags

3. **`doctors.json`** - Doctor profiles
   - Doctor information, qualifications, and experience
   - Availability schedules and contact details
   - Professional credentials and specializations

4. **`cases.json`** - Case studies
   - Patient case studies and outcomes
   - Before/after images and treatment details
   - Medical procedure documentation

### Supporting Content Files

5. **`services.json`** - Medical services
   - Available medical procedures and treatments
   - Service descriptions, duration, and pricing
   - Features and benefits of each service

6. **`testimonials.json`** - Patient testimonials
   - Patient reviews and feedback
   - Before/after results
   - Verified patient experiences

7. **`appointments.json`** - Appointment data
   - Patient appointment records
   - Scheduling information
   - Consultation and follow-up details

8. **`categories.json`** - Blog categories
   - Content categorization for blog posts
   - Category metadata and SEO information
   - Visual styling and icons

### Configuration Files

9. **`seo-settings.json`** - SEO configuration
   - Global SEO settings and meta tags
   - Social media configuration
   - Structured data markup

10. **`contact.json`** - Contact information
    - Clinic address and contact details
    - Operating hours and social media links
    - Location coordinates and services

11. **`settings.json`** - Website settings
    - General website configuration
    - Feature toggles and theme settings
    - Analytics and security settings

## Data Structure

Each JSON file follows a consistent structure:

- **Arrays** for collections (pages, blog-posts, doctors, etc.)
- **Objects** for single entities (seo-settings, contact, settings)
- **SEO metadata** included where relevant
- **Timestamps** for creation and updates
- **Status fields** for content management

## API Endpoints

The server provides RESTful API endpoints for each data type:

- `GET /api/pages` - Get all pages
- `GET /api/pages/:slug` - Get page by slug
- `GET /api/blog-posts` - Get all blog posts
- `GET /api/blog-posts/:slug` - Get blog post by slug
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:slug` - Get doctor by slug
- `GET /api/cases` - Get all cases
- `GET /api/cases/:slug` - Get case by slug
- `GET /api/services` - Get all services
- `GET /api/testimonials` - Get all testimonials
- `GET /api/appointments` - Get all appointments
- `GET /api/categories` - Get all categories
- `GET /api/seo-settings` - Get SEO settings
- `GET /api/contact` - Get contact information
- `GET /api/settings` - Get website settings

## Usage

1. **Development**: Files are read directly by the TypeScript server
2. **Production**: Files can be served via JSON Server or custom API
3. **Updates**: Modify JSON files and restart the server
4. **Backup**: Regular backups recommended for production

## SEO Features

All content includes comprehensive SEO metadata:

- Meta titles and descriptions
- Open Graph tags
- Twitter Card tags
- Structured data markup
- Canonical URLs
- Keywords and author information

## Content Management

- **Status fields**: Control content visibility (published/draft/archived)
- **Timestamps**: Track creation and modification dates
- **Slugs**: SEO-friendly URLs for content
- **Categories**: Organize content by topics
- **Tags**: Additional content classification

## Security Considerations

- Sensitive data (phone numbers, emails) should be sanitized in production
- Patient information should be anonymized for public display
- Regular backups of all data files
- Access control for administrative functions

## Maintenance

- Regular content updates
- SEO optimization
- Data validation
- Performance monitoring
- Security audits 