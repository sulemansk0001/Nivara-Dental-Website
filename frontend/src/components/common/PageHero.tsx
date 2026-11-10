import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  description: string;
  breadcrumbs?: { label: string; to?: string }[];
  ctaButton?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  highlightedText,
  description,
  breadcrumbs = [],
  ctaButton,
}) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 bg-skyblue-light/30 border-b border-clinic-border overflow-hidden">
      {/* Subtle clean background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#D6EAF7_1px,transparent_1px),linear-gradient(to_bottom,#D6EAF7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs font-medium text-clinic-muted mb-6">
            <Link to="/" className="hover:text-skyblue transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-skyblue transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-navy font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-skyblue-light border border-skyblue/20 rounded-full text-skyblue text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-skyblue animate-pulse" />
              {badge}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight leading-[1.15]"
          >
            {title}{' '}
            {highlightedText && (
              <span className="text-skyblue underline decoration-skyblue/30 underline-offset-4">
                {highlightedText}
              </span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-clinic-muted leading-relaxed"
          >
            {description}
          </motion.p>

          {ctaButton && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="mt-6 flex flex-wrap gap-4"
            >
              {ctaButton}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
