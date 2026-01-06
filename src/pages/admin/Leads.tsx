import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Mail, Building, MessageSquare, Calendar } from "lucide-react";
import { supabase, Lead } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchQuery]);

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    if (!searchQuery) {
      setFilteredLeads(leads);
      return;
    }

    const filtered = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLeads(filtered);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
            <p className="text-muted-foreground">Contact form submissions</p>
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
                  placeholder="Search by name, email, company, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Leads ({filteredLeads.length})</CardTitle>
              <CardDescription>Click on a row to view full details</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading leads...</div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {searchQuery ? "No leads match your search" : "No leads yet"}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Message Preview</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow
                        key={lead.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {lead.email}
                          </a>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{lead.company || "—"}</TableCell>
                        <TableCell className="max-w-md truncate text-muted-foreground">
                          {lead.message}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Lead Detail Dialog */}
          <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Lead Details</DialogTitle>
                <DialogDescription>Full information about this contact form submission</DialogDescription>
              </DialogHeader>
              {selectedLead && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                      <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>
                    {selectedLead.company && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <Building className="h-4 w-4" />
                          Company
                        </div>
                        <p>{selectedLead.company}</p>
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Submitted
                      </div>
                      <p>{new Date(selectedLead.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </div>
                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                      <p className="whitespace-pre-wrap">{selectedLead.message}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setSelectedLead(null)}>
                      Close
                    </Button>
                    <Button asChild>
                      <a href={`mailto:${selectedLead.email}`}>Reply via Email</a>
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

