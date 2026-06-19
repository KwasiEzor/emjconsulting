import { db, schema } from './api/db/client.js';
import { eq } from 'drizzle-orm';

console.log('🔧 Fixing image URLs in database...\n');

// Fix Destinations
const destUpdates = [
  { slug: 'canada', imageUrl: '/images/dest-canada.jpg' },
  { slug: 'france', imageUrl: '/images/dest-france.jpg' },
  { slug: 'belgique', imageUrl: '/images/dest-belgique.jpg' },
  { slug: 'etats-unis', imageUrl: '/images/dest-usa.jpg' },
  { slug: 'dubai', imageUrl: '/images/dest-dubai.jpg' },
  { slug: 'royaume-uni', imageUrl: '/images/dest-uk.jpg' },
  { slug: 'allemagne', imageUrl: '/images/dest-allemagne.jpg' },
  { slug: 'italie', imageUrl: '/images/dest-italie.jpg' },
  { slug: 'espagne', imageUrl: '/images/dest-espagne.jpg' },
];

console.log('📍 Updating destinations...');
for (const { slug, imageUrl } of destUpdates) {
  await db
    .update(schema.destinations)
    .set({ imageUrl })
    .where(eq(schema.destinations.slug, slug));
  console.log(`  ✓ ${slug}: ${imageUrl}`);
}

// Fix Blog Posts - assign images to first 4 posts
console.log('\n📝 Updating blog posts...');
const posts = await db.select().from(schema.blogPosts).limit(4);
const blogImages = ['/images/blog-1.jpg', '/images/blog-2.jpg', '/images/blog-3.jpg', '/images/blog-4.jpg'];

for (let i = 0; i < Math.min(posts.length, 4); i++) {
  await db
    .update(schema.blogPosts)
    .set({ imageUrl: blogImages[i] })
    .where(eq(schema.blogPosts.id, posts[i].id));
  console.log(`  ✓ Post ${i + 1}: ${blogImages[i]}`);
}

// Fix Testimonials - assign avatars
console.log('\n👤 Updating testimonials...');
const testimonials = await db.select().from(schema.testimonials).limit(5);
const avatars = ['/images/avatar-1.jpg', '/images/avatar-2.jpg', '/images/avatar-3.jpg', '/images/avatar-4.jpg', '/images/avatar-5.jpg'];

for (let i = 0; i < Math.min(testimonials.length, 5); i++) {
  await db
    .update(schema.testimonials)
    .set({ imageUrl: avatars[i] })
    .where(eq(schema.testimonials.id, testimonials[i].id));
  console.log(`  ✓ ${testimonials[i].name}: ${avatars[i]}`);
}

console.log('\n✅ All image URLs fixed!');
process.exit(0);
