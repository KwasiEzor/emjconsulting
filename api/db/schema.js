import { pgTable, uuid, text, timestamp, varchar, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

// Appointments
export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientId: uuid('client_id'),
  serviceId: uuid('service_id'),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  phone: varchar('phone'),
  date: varchar('date').notNull(),
  time: varchar('time').notNull(),
  status: varchar('status').notNull().default('pending'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Services
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  titleFr: varchar('title_fr').notNull(),
  titleEn: varchar('title_en').notNull(),
  descriptionFr: text('description_fr').notNull(),
  descriptionEn: text('description_en').notNull(),
  icon: varchar('icon').notNull(),
  slug: varchar('slug').notNull(),
  benefits: jsonb('benefits'),
  process: jsonb('process'),
  price: varchar('price'),
  duration: varchar('duration'),
  featured: boolean('featured'),
  order: integer('order'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Destinations
export const destinations = pgTable('destinations', {
  id: uuid('id').defaultRandom().primaryKey(),
  nameFr: varchar('name_fr').notNull(),
  nameEn: varchar('name_en').notNull(),
  slug: varchar('slug').notNull(),
  flagEmoji: varchar('flag_emoji').notNull(),
  imageUrl: varchar('image_url'),
  descriptionFr: text('description_fr').notNull(),
  descriptionEn: text('description_en').notNull(),
  visaDuration: varchar('visa_duration'),
  requirements: jsonb('requirements'),
  featured: boolean('featured'),
  continent: varchar('continent'),
  order: integer('order'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Blog Categories
export const blogCategories = pgTable('blog_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  nameFr: varchar('name_fr').notNull(),
  nameEn: varchar('name_en').notNull(),
  slug: varchar('slug').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Blog Posts
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  titleFr: varchar('title_fr').notNull(),
  titleEn: varchar('title_en').notNull(),
  slug: varchar('slug').notNull(),
  excerptFr: text('excerpt_fr').notNull(),
  excerptEn: text('excerpt_en').notNull(),
  contentFr: text('content_fr').notNull(),
  contentEn: text('content_en').notNull(),
  imageUrl: varchar('image_url'),
  categoryId: uuid('category_id'),
  author: varchar('author').notNull(),
  status: varchar('status').notNull(),
  readingTime: integer('reading_time'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// FAQ
export const faq = pgTable('faq', {
  id: uuid('id').defaultRandom().primaryKey(),
  questionFr: varchar('question_fr').notNull(),
  questionEn: varchar('question_en').notNull(),
  answerFr: text('answer_fr').notNull(),
  answerEn: text('answer_en').notNull(),
  order: integer('order'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Messages
export const messages = pgTable('messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  phone: varchar('phone'),
  country: varchar('country'),
  message: text('message').notNull(),
  isRead: boolean('is_read').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Newsletter Subscribers
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email').notNull(),
  subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
});

// Clients
export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  phone: varchar('phone'),
  country: varchar('country'),
  status: varchar('status').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Testimonials
export const testimonials = pgTable('testimonials', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name').notNull(),
  role: varchar('role'),
  content: text('content').notNull(),
  imageUrl: varchar('image_url'),
  rating: varchar('rating'),
  featured: boolean('featured').default(false),
  order: integer('order'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
