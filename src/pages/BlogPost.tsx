import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { ArticleSchema } from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { supabase, BlogPost } from "@/lib/supabase";
import blogCoverDefault from "@/assets/blog-cover-default.jpg";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;

      if (!data) {
        setError("Post not found");
        setLoading(false);
        return;
      }

      setPost(data);

      // Load related posts
      const { data: related } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .neq("id", data.id)
        .order("created_at", { ascending: false })
        .limit(3);

      setRelatedPosts(related || []);
    } catch (err: any) {
      console.error("Error loading post:", err);
      setError(err.message || "Failed to load post");
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

  if (loading) {
    return (
      <Layout>
        <SEOHead title="Loading..." description="Loading blog post..." />
        <section className="py-24">
          <div className="container text-center">
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <SEOHead title="Article Not Found | Rymdix Technologies" description="The requested article could not be found." />
        <section className="py-24">
          <div className="container text-center">
            <h1 className="mb-4 text-3xl font-bold">Article Not Found</h1>
            <p className="mb-6 text-muted-foreground">{error || "The article you're looking for doesn't exist."}</p>
            <Link to="/blog">
              <Button>View All Articles</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={`${post.title} | Rymdix Technologies`}
        description={post.excerpt}
        canonical={`/blog/${slug}`}
        ogType="article"
        article={{
          publishedTime: post.created_at,
          modifiedTime: post.updated_at,
          author: "Rymdix Technologies",
        }}
      />
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        url={`/blog/${slug}`}
        datePublished={post.created_at}
        dateModified={post.updated_at}
      />
      
      {/* Hero */}
      <section className="border-b border-border py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              All Articles
            </Link>
            
            <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {calculateReadTime(post.content)}
              </span>
            </div>
            
            <h1 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image_url && (
        <section className="border-b border-border">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <img 
                src={post.cover_image_url} 
                alt={post.title}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </section>
      )}
      
      {/* Content */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground">{post.content}</div>
          </div>
        </div>
      </section>
      
      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-2xl font-bold">More Articles</h2>
              
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                  >
                    <h3 className="mb-2 font-semibold group-hover:text-primary">{relatedPost.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      
      <CTASection />
    </Layout>
  );
}
