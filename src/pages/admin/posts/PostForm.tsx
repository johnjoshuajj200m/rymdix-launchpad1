import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { supabase, BlogPost } from "@/lib/supabase";
import { toast } from "sonner";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image_url: "",
    published: false,
  });

  useEffect(() => {
    if (isEditing) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || "",
          content: data.content || "",
          cover_image_url: data.cover_image_url || "",
          published: data.published || false,
        });
      }
    } catch (error) {
      console.error("Error loading post:", error);
      toast.error("Failed to load post");
      navigate("/admin/posts");
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if slug is unique
      const { data: existing } = await supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", formData.slug)
        .maybeSingle();

      if (existing && (!isEditing || existing.id !== id)) {
        toast.error("Slug already exists. Please use a different title or edit the slug.");
        setLoading(false);
        return;
      }

      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        cover_image_url: formData.cover_image_url || null,
        published: formData.published,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", id);

        if (error) throw error;
        toast.success("Post updated successfully");
      } else {
        const { error } = await supabase.from("blog_posts").insert(postData);
        if (error) throw error;
        toast.success("Post created successfully");
      }

      navigate("/admin/posts");
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast.error(error.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <Button variant="ghost" onClick={() => navigate("/admin/posts")} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{isEditing ? "Edit Post" : "New Post"}</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    placeholder="Enter post title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    placeholder="post-slug"
                  />
                  <p className="text-xs text-muted-foreground">
                    URL-friendly version of the title. Auto-generated from title.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    placeholder="Brief description of the post"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows={15}
                    placeholder="Post content (markdown supported)"
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover_image_url">Cover Image URL</Label>
                  <Input
                    id="cover_image_url"
                    value={formData.cover_image_url}
                    onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/admin/posts")}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
