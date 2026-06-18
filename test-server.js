import http from 'http';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Handle API endpoints
  const apiRoutes = {
    '/api/appointments': './api/appointments.js',
    '/api/services': './api/services.js',
    '/api/destinations': './api/destinations.js',
    '/api/blog-posts': './api/blog-posts.js',
    '/api/faqs': './api/faqs.js',
    '/api/testimonials': './api/testimonials.js',
    '/api/messages': './api/messages.js',
    '/api/newsletter': './api/newsletter.js',
  };

  if (apiRoutes[req.url]) {
    try {
      const handler = await import(apiRoutes[req.url]);

      // Mock req/res for serverless function
      const mockReq = {
        method: req.method,
        body: req.method === 'POST' ? await getBody(req) : {},
        headers: req.headers
      };

      const mockRes = {
        status: (code) => {
          res.statusCode = code;
          return mockRes;
        },
        json: (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        },
        end: () => res.end(),
        setHeader: (...args) => res.setHeader(...args)
      };

      await handler.default(mockReq, mockRes);
    } catch (error) {
      console.error('Error:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: error.message, stack: error.stack }));
    }
    return;
  }

  // Serve test page
  if (req.url === '/' || req.url === '/test') {
    const html = await fs.readFile(join(__dirname, 'test-api.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
});

async function getBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT}/test to test the API`);
});
