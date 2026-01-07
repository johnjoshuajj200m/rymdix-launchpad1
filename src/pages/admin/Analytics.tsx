import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Users, BarChart3, Eye, Activity, AlertCircle, Loader2 } from "lucide-react";
import { supabase, Lead } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";

interface GAMetrics {
  activeUsers: number;
  pageViews: number;
  sessions: number;
  events: number;
  error?: string;
}

export default function Analytics() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [gaMetrics, setGaMetrics] = useState<GAMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [gaLoading, setGaLoading] = useState(true);
  const [gaError, setGaError] = useState<string | null>(null);
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    loadLeads();
    loadGAMetrics();
  }, []);

  const loadLeads = async () => {
    try {
      if (!supabase) {
        console.error("Supabase is not available");
        setLoading(false);
        return;
      }

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

  const loadGAMetrics = async () => {
    try {
      setGaLoading(true);
      setGaError(null);

      const response = await fetch("/api/analytics");
      const data: GAMetrics = await response.json();

      if (data.error) {
        setGaError(data.error);
        setGaMetrics({
          activeUsers: 0,
          pageViews: 0,
          sessions: 0,
          events: 0,
        });
      } else {
        setGaMetrics(data);
      }
    } catch (error: any) {
      console.error("Error loading GA metrics:", error);
      setGaError(error.message || "Failed to load analytics");
      setGaMetrics({
        activeUsers: 0,
        pageViews: 0,
        sessions: 0,
        events: 0,
      });
    } finally {
      setGaLoading(false);
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

          {/* Google Analytics Metrics */}
          {GA_MEASUREMENT_ID && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Google Analytics (Last 7 Days)</h2>
                  <p className="text-sm text-muted-foreground">
                    Realtime data available in{" "}
                    <a
                      href="https://analytics.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Analytics
                    </a>
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://analytics.google.com", "_blank")}
                >
                  Open GA <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </div>

              {gaError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{gaError}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {gaLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">
                          {gaMetrics?.activeUsers.toLocaleString() || "0"}
                        </div>
                        <p className="text-xs text-muted-foreground">Last 7 days</p>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {gaLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">
                          {gaMetrics?.pageViews.toLocaleString() || "0"}
                        </div>
                        <p className="text-xs text-muted-foreground">Last 7 days</p>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {gaLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">
                          {gaMetrics?.sessions.toLocaleString() || "0"}
                        </div>
                        <p className="text-xs text-muted-foreground">Last 7 days</p>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Events</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    {gaLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold">
                          {gaMetrics?.events.toLocaleString() || "0"}
                        </div>
                        <p className="text-xs text-muted-foreground">Last 7 days</p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Leads Card */}
          <Card>
            <CardHeader>
              <CardTitle>Total Leads</CardTitle>
              <CardDescription>Contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{leads.length}</div>
            </CardContent>
          </Card>

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
