import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ArrowRight, Calendar } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import blogCoverDefault from "@/assets/blog-cover-default.jpg";
import { supabase, BlogPost } from "@/lib/supabase";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      if (!supabase) {
        setError("Blog posts are temporarily unavailable. Please check back later.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      console.error("Error loading posts:", err);
      setError(err.message || "Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };
  return (
    <Layout>
      <SEOHead
        title="Blog | Rymdix Technologies"
        description="Practical insights on custom software development, workflow automation, and building systems that scale."
        canonical="/blog"
      />
      
      {/* Hero */}
      <section className="border-b border-border py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Practical insights on building software, automating workflows, and scaling operations. No buzzwords, just useful information.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Grid */}
      <section className="py-24">
        <div className="container">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading posts...</div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <p className="text-sm text-muted-foreground">Please try again later.</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.cover_image_url || blogCoverDefault} 
                      alt={`${post.title} - blog article cover`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h2 className="mb-3 text-lg font-semibold group-hover:text-primary">{post.title}</h2>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <CTASection />
    </Layout>
  );
}
