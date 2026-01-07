import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, EyeOff, Search, ArrowUp, ArrowDown } from "lucide-react";
import { supabase, Service } from "@/lib/supabase";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function ServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery]);

  const loadServices = async () => {
    try {
      if (!supabase) {
        toast.error("Supabase is not available. Please check your configuration.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error loading services:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    if (!searchQuery) {
      setFilteredServices(services);
      return;
    }

    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      toast.success("Service deleted successfully");
      loadServices();
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
  };

  const togglePublished = async (service: Service) => {
    try {
      const { error } = await supabase
        .from("services")
        .update({ published: !service.published })
        .eq("id", service.id);

      if (error) throw error;
      toast.success(`Service ${!service.published ? "published" : "unpublished"}`);
      loadServices();
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    }
  };

  const moveService = async (service: Service, direction: "up" | "down") => {
    try {
      const currentIndex = services.findIndex((s) => s.id === service.id);
      if (currentIndex === -1) return;

      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= services.length) return;

      const targetService = services[newIndex];
      const newSortOrder = targetService.sort_order;
      const oldSortOrder = service.sort_order;

      // Swap sort orders
      await supabase
        .from("services")
        .update({ sort_order: newSortOrder })
        .eq("id", service.id);

      await supabase
        .from("services")
        .update({ sort_order: oldSortOrder })
        .eq("id", targetService.id);

      toast.success("Service order updated");
      loadServices();
    } catch (error) {
      console.error("Error reordering service:", error);
      toast.error("Failed to reorder service");
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Services</h1>
              <p className="text-muted-foreground">Manage your service offerings</p>
            </div>
            <Link to="/admin/services/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Service
              </Button>
            </Link>
          </div>

          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardContent>
          </Card>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Services ({filteredServices.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading services...</div>
              ) : filteredServices.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No services found</p>
                  <Link to="/admin/services/new">
                    <Button>Create Your First Service</Button>
                  </Link>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Order</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map((service, index) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => moveService(service, "up")}
                              disabled={index === 0}
                              title="Move up"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => moveService(service, "down")}
                              disabled={index === filteredServices.length - 1}
                              title="Move down"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{service.slug}</TableCell>
                        <TableCell>
                          <Badge variant={service.published ? "default" : "secondary"}>
                            {service.published ? (
                              <>
                                <Eye className="mr-1 h-3 w-3" />
                                Published
                              </>
                            ) : (
                              <>
                                <EyeOff className="mr-1 h-3 w-3" />
                                Draft
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => togglePublished(service)}
                              title={service.published ? "Unpublish" : "Publish"}
                            >
                              {service.published ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Link to={`/admin/services/edit/${service.id}`}>
                              <Button variant="ghost" size="icon" title="Edit">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteId(service.id)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the service.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteId && handleDelete(deleteId)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

