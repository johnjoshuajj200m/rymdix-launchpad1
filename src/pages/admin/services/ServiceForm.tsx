import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, X } from "lucide-react";
import { supabase, Service } from "@/lib/supabase";
import { toast } from "sonner";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const AVAILABLE_ICONS = [
  "Code",
  "Globe",
  "Bot",
  "LineChart",
  "Database",
  "Zap",
  "Shield",
  "Rocket",
  "TrendingUp",
  "Settings",
  "Workflow",
  "BarChart",
];

export default function ServiceForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    description: "",
    bullets: [""] as string[],
    icon_name: "Code",
    image_url: "",
    published: false,
    sort_order: 0,
  });

  useEffect(() => {
    if (isEditing) {
      loadService();
    } else {
      // Set default sort_order to max + 1
      loadMaxSortOrder();
    }
  }, [id]);

  const loadMaxSortOrder = async () => {
    try {
      if (!supabase) return;
      const { data } = await supabase
        .from("services")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      setFormData((prev) => ({
        ...prev,
        sort_order: (data?.sort_order ?? -1) + 1,
      }));
    } catch (error) {
      console.error("Error loading max sort order:", error);
    }
  };

  const loadService = async () => {
    try {
      if (!supabase) {
        toast.error("Supabase is not available. Please check your configuration.");
        navigate("/admin/services");
        return;
      }

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          summary: data.summary,
          description: data.description || "",
          bullets: data.bullets && Array.isArray(data.bullets) ? data.bullets : [""],
          icon_name: data.icon_name || "Code",
          image_url: data.image_url || "",
          published: data.published || false,
          sort_order: data.sort_order || 0,
        });
      }
    } catch (error) {
      console.error("Error loading service:", error);
      toast.error("Failed to load service");
      navigate("/admin/services");
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleBulletChange = (index: number, value: string) => {
    const newBullets = [...formData.bullets];
    newBullets[index] = value;
    setFormData({ ...formData, bullets: newBullets });
  };

  const addBullet = () => {
    setFormData({ ...formData, bullets: [...formData.bullets, ""] });
  };

  const removeBullet = (index: number) => {
    const newBullets = formData.bullets.filter((_, i) => i !== index);
    setFormData({ ...formData, bullets: newBullets.length > 0 ? newBullets : [""] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!supabase) {
        toast.error("Supabase is not available. Please check your configuration.");
        setLoading(false);
        return;
      }

      // Check if slug is unique
      const { data: existing } = await supabase
        .from("services")
        .select("id")
        .eq("slug", formData.slug)
        .maybeSingle();

      if (existing && (!isEditing || existing.id !== id)) {
        toast.error("Slug already exists. Please use a different title or edit the slug.");
        setLoading(false);
        return;
      }

      // Filter out empty bullets
      const cleanBullets = formData.bullets.filter((b) => b.trim() !== "");

      const serviceData = {
        title: formData.title,
        slug: formData.slug,
        summary: formData.summary,
        description: formData.description || null,
        bullets: cleanBullets.length > 0 ? cleanBullets : null,
        icon_name: formData.icon_name,
        image_url: formData.image_url || null,
        published: formData.published,
        sort_order: formData.sort_order,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", id);

        if (error) throw error;
        toast.success("Service updated successfully");
      } else {
        const { error } = await supabase.from("services").insert(serviceData);
        if (error) throw error;
        toast.success("Service created successfully");
      }

      navigate("/admin/services");
    } catch (error: any) {
      console.error("Error saving service:", error);
      toast.error(error.message || "Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
          <div>
            <Button variant="ghost" onClick={() => navigate("/admin/services")} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">{isEditing ? "Edit Service" : "New Service"}</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    placeholder="Custom Software Development"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    placeholder="custom-software-development"
                  />
                  <p className="text-xs text-muted-foreground">
                    URL-friendly version of the title. Auto-generated from title.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Summary *</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    required
                    rows={2}
                    placeholder="Brief description shown in service grid"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    placeholder="Longer description for service detail page"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Features / Bullet Points</Label>
                  {formData.bullets.map((bullet, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={bullet}
                        onChange={(e) => handleBulletChange(index, e.target.value)}
                        placeholder="Feature or benefit"
                      />
                      {formData.bullets.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBullet(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addBullet} className="w-full">
                    Add Feature
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon_name">Icon Name *</Label>
                  <select
                    id="icon_name"
                    value={formData.icon_name}
                    onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {AVAILABLE_ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">Icon from lucide-react</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg or /assets/service-image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    min="0"
                  />
                  <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
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
                    {loading ? "Saving..." : isEditing ? "Update Service" : "Create Service"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/admin/services")}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
  );
}

