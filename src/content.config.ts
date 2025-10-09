import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the blog collection
const blogs = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: './src/content/blogs' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.string(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// Define the event collection
const events = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: './src/content/events' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string(),
    location: z.string(),
    slug: z.string(),
    featured: z.boolean().optional(),
    venue_parking: z.string().optional(),
    register: z.string().optional(),
    description: z.string().optional(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
  }),
});

// Define the talks collection
const talks = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
    timeSlot: z.string().optional(),
    timeSlotStart: z.string().optional(),
    room: z.string(),
    location: z.string().optional(),
    speakers: z.array(z.string()).optional(),
    abstract: z.string().optional(),
    eventSlug: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

// Define the speakers collection
const speakers = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: './src/content/speakers' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    title: z.string().optional(),
    bio: z.string().optional(),
    company: z.string().optional(),
    socialLinks: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    photo: image().optional(),
    photoAlt: z.string().optional(),
  }),
});

// Define the sponsors collection
const sponsors = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    website: z.string().url().optional(),
    years: z.array(z.string()),
    rank: z.number().optional(),
  }),
});

// Define the CFP collection
const cfp = defineCollection({
  loader: glob({ pattern: ['**/*.md'], base: './src/content/cfp' }),
  schema: z.object({
    title: z.string(),
    year: z.string(),
    closeDate: z.string(),
    link: z.string().url(),
  }),
});

const about = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  blogs,
  events,
  talks,
  speakers,
  sponsors,
  cfp,
  about,
};