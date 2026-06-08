import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const appRoutes = new Set([
  '/',
  '/about',
  '/faqs',
  '/blog',
  '/blog-post.html',
  '/booking',
  '/contact',
  '/login',
  '/signup',
  '/north-india',
  '/south-india',
  '/About.html',
  '/faqs.html',
  '/blog.html',
  '/Booking.html',
  '/Contact.html',
  '/login.html',
  '/signup.html',
  '/north-india.html',
  '/south-india.html',
]);

function shouldServeApp(urlPath) {
  if (!urlPath || urlPath === '/') return true;
  if (appRoutes.has(urlPath)) return true;
  if (urlPath.startsWith('/blog/')) return true;
  if (urlPath.startsWith('/destinations/')) return true;
  if (urlPath.startsWith('/packages/')) return true;
  if (urlPath === '/admin') return true;
  if (urlPath === '/enquiry') return true;
  if (/^\/(agra|amritsar|araku-valley|bangalore|chandigarh|chennai|coorg|delhi|gulmarg|alleppey)\.html$/i.test(urlPath)) {
    return true;
  }
  if (/^\/pkg-[a-z0-9-]+\.html$/i.test(urlPath)) {
    return true;
  }
  return false;
}

function spaRewritePlugin() {
  const rewrite = (req) => {
    if (!req.url) return;

    const url = new URL(req.url, 'http://localhost');
    if (!shouldServeApp(url.pathname)) return;

    req.url = '/index.html';
  };

  return {
    name: 'spa-rewrite-legacy-pages',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), spaRewritePlugin()],
});