import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, ArrowRight, Calendar, User } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useApp } from '../contexts/AppContext';
import { useFetch, BlogPost } from '../hooks/useData';
import { categoryLabel } from './Home';

export default function Blog() {
  const { lang, t } = useApp();
  const { data, loading } = useFetch<BlogPost[]>('/api/blog-posts');
  const posts = (data || []) as unknown as BlogPost[];
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const categories = ['all', 'tips', 'student', 'immigration', 'news'];

  const filtered = useMemo(() => {
    let list = posts;
    if (category !== 'all') list = list.filter((p) => p.categoryId === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) =>
        (lang === 'fr' ? p.titleFr : p.titleEn).toLowerCase().includes(q) ||
        (lang === 'fr' ? p.excerptFr : p.excerptEn).toLowerCase().includes(q)
      );
    }
    return list;
  }, [posts, category, query, lang]);

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-navy-900 pt-36 pb-20 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl animate-blob" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">{t.nav.blog}</span>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">{t.blog.title}</h1>
            <p className="mt-5 text-lg text-white/70 sm:text-xl">{t.blog.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search + filters */}
          <div className="mb-10 flex flex-col gap-4">
            <div className="relative mx-auto w-full max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.common.search}
                className="w-full rounded-xl glass px-11 py-3 text-sm outline-none focus:ring-2 focus:ring-gold-400/30"
                style={{ color: 'var(--text)' }}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    category === c ? 'bg-gold-gradient text-navy-900 shadow-lg' : 'glass hover:text-gold-400'
                  }`}
                  style={{ color: category === c ? undefined : 'var(--text-soft)' }}
                >
                  {c === 'all' ? t.common.all : categoryLabel(c, lang)}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-3xl" style={{ background: 'var(--bg-soft)' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg" style={{ color: 'var(--text-soft)' }}>{lang === 'fr' ? 'Aucun article trouvé.' : 'No articles found.'}</p>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filtered.map((post) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -8 }}
                    className="group flex flex-col overflow-hidden rounded-3xl glass"
                    style={{ boxShadow: '0 10px 40px -12px var(--shadow-color)' }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={post.imageUrl} alt={lang === 'fr' ? post.titleFr : post.titleEn} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center gap-4 text-xs" style={{ color: 'var(--text-soft)' }}>
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(post.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readingTime} min</span>
                      </div>
                      <h3 className="mb-2 font-display text-lg font-bold leading-snug" style={{ color: 'var(--text)' }}>{lang === 'fr' ? post.titleFr : post.titleEn}</h3>
                      <p className="mb-4 line-clamp-3 flex-1 text-sm" style={{ color: 'var(--text-soft)' }}>{lang === 'fr' ? post.excerptFr : post.excerptEn}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-soft)' }}><User className="h-3.5 w-3.5" />{post.author}</span>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 transition-all hover:gap-2.5">{t.common.readMore} <ArrowRight className="h-4 w-4" /></span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
