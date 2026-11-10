import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { api } from '../services/api';
import { BlogPost } from '../types';
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getBlogs().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Preventive Care', 'Oral Hygiene', 'Dental Implants'];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = blogs[0];

  return (
    <div>
      <PageHero
        badge="Dental Insights & Education"
        title="Oral Healthcare Articles &"
        highlightedText="Insights."
        description="Clear, medically responsible information on preventive habits, cosmetic dentistry, and dental implants written by the specialists at Nivara Dental Studio."
        breadcrumbs={[{ label: 'Blog & Insights' }]}
      />

      <section className="py-16 md:py-24 bg-[#F0F9FF] border-b border-[#D6EAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Search Bar & Categories */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#D6EAF7]">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 select-none ${
                    selectedCategory === cat
                      ? 'bg-[#38BDF8] text-white shadow-sm'
                      : 'bg-white text-[#252525] hover:bg-[#E0F2FE] border border-[#D6EAF7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#D6EAF7] rounded-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-[#252525] placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          {/* Featured Article Banner */}
          {featured && selectedCategory === 'All' && !searchQuery && (
            <div className="bg-white rounded-section overflow-hidden border border-[#D6EAF7] shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
              <div className="lg:col-span-7 h-72 sm:h-96 overflow-hidden">
                <img
                  src={featured.featuredImage}
                  alt={featured.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
                <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider bg-[#F0F9FF] border border-[#BAE6FD] px-3 py-1 rounded-full">
                  Featured: {featured.category}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#252525] group-hover:text-[#0284C7] transition-colors leading-snug">
                  <Link to={`/blog/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-clinic-muted leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-clinic-muted pt-2">
                  <span>{featured.publicationDate}</span>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                </div>
                <div className="pt-2">
                  <Button to={`/blog/${featured.slug}`} variant="primary" size="sm" withArrow>
                    Read Full Article
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((b, idx) => (
              <motion.article
                key={b.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="bg-white rounded-card overflow-hidden border border-[#D6EAF7] shadow-subtle hover:shadow-premium hover:-translate-y-1.5 hover:border-[#38BDF8] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={b.featuredImage}
                      alt={b.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded text-[11px] font-bold text-[#0284C7] shadow-sm border border-white/60">
                      {b.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-[#64748B]">
                      <span>{b.publicationDate}</span>
                      <span>•</span>
                      <span>{b.readTime}</span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-[#252525] group-hover:text-[#0284C7] transition-colors leading-snug">
                      <Link to={`/blog/${b.slug}`}>
                        {b.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
                      {b.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#D6EAF7] mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B] font-medium">By {b.author}</span>
                  <Link
                    to={`/blog/${b.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] group-hover:gap-1.5 transition-all"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="py-16 text-center space-y-3">
              <h3 className="font-heading text-lg font-bold text-navy">No articles found</h3>
              <p className="text-xs text-clinic-muted">Try clearing your search query or choosing another category.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-skyblue underline"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
};
