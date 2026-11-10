import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogs }) => {
  const displayBlogs = blogs.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-clinic-bg border-b border-clinic-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-skyblue-light border border-skyblue/20 rounded-full text-skyblue text-xs font-semibold uppercase tracking-wider">
              Oral Health Insights
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Explore Dental Health Insights.
            </h2>
            <p className="text-sm sm:text-base text-clinic-muted leading-relaxed">
              Helpful information, clinical advice and preventive dental habits written by our specialists to support better everyday oral care in Pune.
            </p>
          </div>
          <div>
            <Button to="/blog" variant="outline" withArrow>
              Browse All Articles
            </Button>
          </div>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((b, idx) => (
            <motion.article
              key={b.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-card overflow-hidden border border-clinic-border shadow-subtle hover:shadow-premium hover:-translate-y-1.5 hover:border-skyblue/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
                  <img
                    src={b.featuredImage}
                    alt={b.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-bold text-skyblue shadow-sm border border-white/60">
                    {b.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-clinic-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-skyblue" />
                      {b.publicationDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {b.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-navy group-hover:text-skyblue transition-colors duration-200 leading-snug">
                    <Link to={`/blog/${b.slug}`}>
                      {b.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-clinic-muted leading-relaxed line-clamp-3">
                    {b.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom read action */}
              <div className="p-6 pt-0 border-t border-clinic-border/60 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-medium text-clinic-muted">
                  By {b.author}
                </span>
                <Link
                  to={`/blog/${b.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-skyblue hover:text-skyblue-hover group-hover:gap-1.5 transition-all duration-200"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
