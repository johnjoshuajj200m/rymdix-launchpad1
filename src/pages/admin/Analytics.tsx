import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, BarChart3, Eye } from "lucide-react";
import { supabase, Lead } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">View site metrics and contact form submissions</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leads.length}</div>
                <p className="text-xs text-muted-foreground">Contact form submissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Google Analytics</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {GA_MEASUREMENT_ID ? (
                  <div>
                    <div className="text-2xl font-bold">Connected</div>
                    <p className="text-xs text-muted-foreground mb-2">Tracking ID: {GA_MEASUREMENT_ID}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("https://analytics.google.com", "_blank")}
                      className="w-full"
                    >
                      Open Google Analytics <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl font-bold">Not Configured</div>
                    <p className="text-xs text-muted-foreground">Set VITE_GA_MEASUREMENT_ID</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">—</div>
                <p className="text-xs text-muted-foreground">View in Google Analytics</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Contact Form Submissions</CardTitle>
              <CardDescription>Latest leads from the contact form</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading leads...</div>
              ) : leads.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No leads yet</div>
              ) : (
                <div className="space-y-4">
                  {leads.slice(0, 10).map((lead) => (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{lead.name}</p>
                          <Badge variant="secondary" className="text-xs">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                        {lead.company && (
                          <p className="text-sm text-muted-foreground">{lead.company}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
