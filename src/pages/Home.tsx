import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Newspaper } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Hero from '../components/sections/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import DestinationsSection from '../components/sections/DestinationsSection';
import ProcessSection from '../components/sections/ProcessSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import FaqSection from '../components/sections/FaqSection';
import CtaSection from '../components/sections/CtaSection';
import SectionHeading from '../components/SectionHeading';
import { useApp } from '../contexts/AppContext';
import { useFetch, BlogPost } from '../hooks/useData';

export default function Home() {
  const { lang, t } = useApp();
  const { data: posts, loading } = useFetch<BlogPost[]>('/api/blog-posts');
  const latest = (posts || []).slice(0, 3);

  return (
    <PageTransition>
      <Hero />
      <ServicesSection limit={6} />
      <DestinationsSection limit={6} />
      <ProcessSection />
      <WhyChooseUs />
      <TestimonialsSection />

      {/* Blog preview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Blog" title={t.sections.blog} subtitle={t.sections.blogSub} />
          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-3xl" style={{ background: 'var(--bg-soft)' }} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {latest.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-3xl glass"
                  style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={post.image} alt={lang === 'fr' ? post.title_fr : post.title_en} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute left-3 top-3 rounded-full glass-strong px-3 py-1 text-xs font-semibold text-gold-400">
                      {categoryLabel(post.category, lang)}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-3 text-xs" style={{ color: 'var(--text-soft)' }}>
                      <span>{new Date(post.created_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</span>
                      <span>•</span>
                      <span>{post.read_time} min</span>
                    </div>
                    <h3 className="mb-2 font-display text-lg font-bold leading-snug" style={{ color: 'var(--text)' }}>
                      {lang === 'fr' ? post.title_fr : post.title_en}
                    </h3>
                    <p className="line-clamp-2 text-sm" style={{ color: 'var(--text-soft)' }}>
                      {lang === 'fr' ? post.excerpt_fr : post.excerpt_en}
                    </p>
                    <Link to="/blog" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 transition-all hover:gap-2.5">
                      {t.common.readMore} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link to="/blog" className="inline-flex items-center gap-2 rounded-xl border border-gold-400/30 px-6 py-3 text-sm font-semibold text-gold-400 transition-colors hover:bg-gold-400/10">
              <Newspaper className="h-4 w-4" /> {t.common.viewAll}
            </Link>
          </div>
        </div>
      </section>

      <FaqSection />
      <CtaSection />
    </PageTransition>
  );
}

export function categoryLabel(category: string, lang: 'fr' | 'en') {
  const map: Record<string, { fr: string; en: string }> = {
    tips: { fr: 'Conseils voyage', en: 'Travel tips' },
    student: { fr: 'Visa étudiant', en: 'Student visa' },
    immigration: { fr: 'Immigration', en: 'Immigration' },
    news: { fr: 'Actualités', en: 'News' },
  };
  return map[category]?.[lang] || category;
}
