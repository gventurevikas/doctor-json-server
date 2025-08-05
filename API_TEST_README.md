# Doctor Web Server API Test Script

This PHP script provides comprehensive testing for all API endpoints in the Doctor Web Server.

## Features

- ✅ Tests all available API endpoints
- ✅ Validates HTTP status codes
- ✅ Checks response formats
- ✅ Tests error handling (404 scenarios)
- ✅ Provides detailed test results
- ✅ Generates summary reports
- ✅ Supports custom base URLs

## Prerequisites

- PHP 7.4 or higher
- cURL extension enabled
- Doctor Web Server running

## Usage

### Basic Usage
```bash
php test_api.php
```

### Custom Base URL
```bash
php test_api.php http://localhost:3001
php test_api.php https://your-domain.com
```

## Tested Endpoints

### Core API Endpoints
- `GET /health` - Health check
- `GET /api/pages` - Get all pages
- `GET /api/pages/:slug` - Get page by slug
- `GET /api/blog-posts` - Get all blog posts
- `GET /api/blog-posts/:slug` - Get blog post by slug
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:slug` - Get doctor by slug
- `GET /api/cases` - Get all cases
- `GET /api/cases/:slug` - Get case by slug
- `GET /api/seo-settings` - Get SEO settings

### Additional Endpoints (All Working ✅)
- `GET /api/services` - Get all services
- `GET /api/testimonials` - Get all testimonials
- `GET /api/appointments` - Get all appointments
- `GET /api/categories` - Get all categories
- `GET /api/contact` - Get contact information
- `GET /api/settings` - Get website settings
- `GET /api/skills` - Get all skills
- `GET /api/skills/:slug` - Get skill by slug
- `GET /api/articles` - Get all articles
- `GET /api/articles/:slug` - Get article by slug

### Error Testing
- Invalid endpoints
- Non-existent resources
- Malformed URLs

## Sample Output

```
🚀 Starting Doctor Web Server API Tests
Base URL: http://localhost:3001
------------------------------------------------------------

🏥 Testing Health Endpoint...
  ✅ PASS Health Check (HTTP 200)
    URL: http://localhost:3000/health
    Data: Single item returned

📄 Testing Pages Endpoints...
  ✅ PASS Get All Pages (HTTP 200)
    URL: http://localhost:3001/api/pages
    Data: 2 items returned

  ✅ PASS Get Page by Slug: home (HTTP 200)
    URL: http://localhost:3001/api/pages/home
    Data: Single item returned

  ✅ PASS Get Non-existent Page (HTTP 404)
    URL: http://localhost:3001/api/pages/non-existent-page

🔧 Testing Additional Endpoints...
  ✅ PASS Get services (HTTP 200)
    URL: http://localhost:3001/api/services
    Data: 3 items returned

  ✅ PASS Get All Skills (HTTP 200)
    URL: http://localhost:3001/api/skills
    Data: 5 items returned

  ✅ PASS Get Skill by Slug: minimally-invasive-spine-surgery (HTTP 200)
    URL: http://localhost:3001/api/skills/minimally-invasive-spine-surgery
    Data: 14 items returned

  ✅ PASS Get All Articles (HTTP 200)
    URL: http://localhost:3001/api/articles
    Data: 5 items returned

  ✅ PASS Get Article by Slug: advances-minimally-invasive-spine-surgery-review (HTTP 200)
    URL: http://localhost:3001/api/articles/advances-minimally-invasive-spine-surgery-review
    Data: 20 items returned

============================================================
📊 API TEST SUMMARY REPORT
============================================================
Base URL: http://localhost:3001
Test Duration: 0.04 seconds
Total Tests: 43
Passed: 43
Failed: 0
Success Rate: 100%

------------------------------------------------------------
DETAILED RESULTS:
------------------------------------------------------------
✅ health: HTTP 200
✅ pages_all: HTTP 200
✅ pages_by_slug: HTTP 200
✅ pages_not_found: HTTP 404
✅ services: HTTP 200
✅ skills_all: HTTP 200
✅ skills_by_slug: HTTP 200
✅ skills_not_found: HTTP 404
✅ articles_all: HTTP 200
✅ articles_by_slug: HTTP 200
✅ articles_not_found: HTTP 404
...

============================================================
🎉 All tests passed! Your API is working perfectly.
============================================================
```

## Test Logic

### Smart Testing
The script intelligently tests endpoints by:
1. First fetching all items from a collection endpoint
2. Using the first item's slug to test individual item endpoints
3. Testing 404 scenarios with non-existent slugs
4. Validating response structure and data counts

### Error Handling
- Tests connection errors
- Validates HTTP status codes
- Checks JSON response format
- Verifies error message structure

## Customization

### Adding New Endpoints
To test additional endpoints, modify the `testAdditionalEndpoints()` method:

```php
$additionalEndpoints = [
    'services' => '/api/services',
    'testimonials' => '/api/testimonials',
    'appointments' => '/api/appointments',
    'categories' => '/api/categories',
    'contact' => '/api/contact',
    'settings' => '/api/settings',
    'skills' => '/api/skills',
    'articles' => '/api/articles'
    // Add your new endpoint here
    // 'new-endpoint' => '/api/new-endpoint'
];
```

### Modifying Test Logic
You can customize test behavior by:
- Changing expected HTTP status codes
- Adding custom validation logic
- Modifying timeout settings
- Adding authentication headers

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure the Doctor Web Server is running
   - Check if the port is correct (default: 3001)
   - Verify firewall settings

2. **cURL Errors**
   - Ensure PHP cURL extension is installed
   - Check network connectivity
   - Verify SSL certificates (for HTTPS)

3. **Timeout Issues**
   - Increase timeout in the script (currently 30 seconds)
   - Check server performance
   - Verify database connectivity

### Debug Mode
To enable debug output, modify the script to include:
```php
curl_setopt($ch, CURLOPT_VERBOSE, true);
```

## Integration

### CI/CD Pipeline
You can integrate this script into your CI/CD pipeline:

```yaml
# GitHub Actions example
- name: Test API
  run: php test_api.php ${{ secrets.API_BASE_URL }}
```

### Automated Testing
Run tests automatically after deployment:
```bash
#!/bin/bash
# deploy.sh
npm run build
npm start &
sleep 10
php test_api.php
```

## License

This test script is provided as-is for testing the Doctor Web Server API. 