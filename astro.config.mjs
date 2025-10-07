import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import markdoc from '@astrojs/markdoc';

import react from '@astrojs/react';

// Define Astro configuration
export default defineConfig({
  site: 'https://bsides-roanoke.com',
  outDir: 'dist',
  srcDir: 'src',
  publicDir: 'public',

  // Add the content collection integration
  integrations: [tailwind(), markdoc(), react()],

  // Configure content collections (standard approach)
  vite: {
    css: {
      devSourcemap: true,
    },
  },

  // Import global CSS file
  css: ['./src/styles/global.css'],

  // Configure content collections (standard approach)
  markdown: {
    contentCollections: {
      blogs: {
        dir: './src/content/blogs',
      },
      events: {
        dir: './src/content/events',
      },
    },
  },
});