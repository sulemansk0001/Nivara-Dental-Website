import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '../components/common/PageHero';
import { Button } from '../components/common/Button';
import { AppointmentCTA } from '../components/home/AppointmentCTA';
import { api } from '../services/api';
import { BlogPost } from '../types';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Check } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;

    api.getBlogs().then((list) => {
      setAllBlogs(list);
      const found = list.find((b) => b.slug === slug);
      setBlog(found || null);
      setLoading(false);
    });
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return <div className="py-32 text-center text-clinic-muted">Loading article...</div>;
  }

  if (!blog) {
    return (
      <div className="py-32 text-center space-y-4">
        <h2 className="font-heading text-2xl font-bold text-navy">Article Not Found</h2>
        <Button to="/blog" variant="primary">Back to Blog</Button>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        badge={blog.category}
        title={blog.title}
        description={`Published on ${blog.publicationDate} • Written by ${blog.author}`}
        breadcrumbs={[
          { label: 'Blog', to: '/blog' },
          { label: blog.title }
        ]}
      />

      <article className="py-16 md:py-24 bg-white border-b border-clinic-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-clinic-border text-xs text-clinic-muted">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <User className="w-4 h-4 text-skyblue" /> By {blog.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-skyblue" /> {blog.publicationDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {blog.readTime}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-navy hover:text-skyblue font-semibold transition-colors focus:outline-none"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4 text-skyblue" />}
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>

          {/* Featured Image */}
          <div className="rounded-card overflow-hidden shadow-elevated border border-clinic-border">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-[400px] sm:h-[480px] object-cover"
            />
          </div>

          {/* Article Lead Excerpt */}
          <p className="text-base sm:text-lg text-navy font-semibold leading-relaxed border-l-4 border-skyblue pl-5 italic">
            {blog.excerpt}
          </p>

          {/* Article Body Content */}
          <div className="prose prose-navy max-w-none space-y-6 text-sm sm:text-base text-clinic-muted leading-relaxed">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-heading text-xl sm:text-2xl font-bold text-navy pt-4">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={idx} className="font-heading text-2xl font-bold text-navy pt-6">
                    {trimmed.replace('## ', '')}
                  </h2>
                );
              }
              if (trimmed) {
                return <p key={idx}>{trimmed}</p>;
              }
              return null;
            })}
          </div>

          {/* Author Bio Box */}
          <div className="p-6 bg-clinic-bg rounded-card border border-clinic-border flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-skyblue-light border-2 border-skyblue flex items-center justify-center text-skyblue font-extrabold text-xl flex-shrink-0">
              {blog.author.split(' ')[1]?.[0] || 'D'}
            </div>
            <div>
              <div className="font-heading font-extrabold text-base text-navy">
                Written by {blog.author}
              </div>
              <p className="text-xs text-clinic-muted mt-0.5">
                Clinical Practitioner at Nivara Dental Studio, Pune. Dedicated to evidence-based preventive oral healthcare.
              </p>
            </div>
          </div>

          {/* Related Articles */}
          <div className="pt-10 border-t border-clinic-border space-y-6">
            <h3 className="font-heading text-xl font-bold text-navy">
              More Insights From Our Doctors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allBlogs
                .filter((b) => b.slug !== blog.slug)
                .slice(0, 2)
                .map((b) => (
                  <Link
                    key={b.slug}
                    to={`/blog/${b.slug}`}
                    className="p-4 bg-clinic-bg rounded-brand border border-clinic-border/70 hover:border-skyblue/40 space-y-1.5 transition-colors group block"
                  >
                    <span className="text-[10px] font-bold text-skyblue uppercase tracking-wider">
                      {b.category}
                    </span>
                    <h4 className="font-heading text-sm font-bold text-navy group-hover:text-skyblue transition-colors leading-snug">
                      {b.title}
                    </h4>
                    <span className="text-xs text-skyblue font-semibold inline-flex items-center gap-1 mt-1">
                      Read article <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </article>

      <AppointmentCTA />
    </div>
  );
};
