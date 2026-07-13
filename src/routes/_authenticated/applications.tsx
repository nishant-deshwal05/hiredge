import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  IcPlus,
  IcSearch,
  IcFilter,
  IcEdit,
  IcTrash,
  IcExternal,
} from "@/components/icons";
import { STATUS_ORDER, statusLabel, statusTone, type Status } from "@/lib/status";

type Application = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  salary_range: string | null;
  status: Status;
  applied_date: string | null;
  deadline: string | null;
  source: string | null;
  url: string | null;
  notes: string | null;
  created_at: string;
};

type SortKey = "recent" | "company" | "deadline";

export const Route = createFileRoute("/_authenticated/applications")({
  component: ApplicationsPage,
});

function ApplicationsPage() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [sortBy, setSortBy] = useState<SortKey>("recent");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Application[];
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Application deleted");
      qc.invalidateQueries({ queryKey: ["applications"] });
      qc.invalidateQueries({ queryKey: ["applications-all"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const filtered = useMemo(() => {
    const rows = (data ?? []).filter((a) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        a.company.toLowerCase().includes(q) ||
        a.position.toLowerCase().includes(q) ||
        (a.location?.toLowerCase() ?? "").includes(q);
      const matchStatus = statusFilter === "all" || a.status === statusFilter;
      return matchSearch && matchStatus;
    });
    const sorted = [...rows];
    if (sortBy === "company") sorted.sort((a, b) => a.company.localeCompare(b.company));
    else if (sortBy === "deadline")
      sorted.sort((a, b) => {
        const ax = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const bx = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        return ax - bx;
      });
    return sorted;
  }, [data, search, statusFilter, sortBy]);

  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">Applications</h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {data?.length ?? 0} total · track roles from Saved to Offer.
          </p>
        </div>
        <Button
          size="sm"
          className="shrink-0 bg-foreground text-background hover:bg-foreground/90"
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <IcPlus size={14} className="mr-1.5" />
          <span className="hidden xs:inline sm:inline">Add application</span>
          <span className="xs:hidden sm:hidden">Add</span>
        </Button>
      </header>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <IcSearch
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search company, position, or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search applications"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as Status | "all")}>
          <SelectTrigger className="w-full sm:w-40" aria-label="Filter by status">
            <IcFilter size={13} className="mr-1.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUS_ORDER.map((s) => (
              <SelectItem key={s} value={s}>
                {statusLabel(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
          <SelectTrigger className="w-full sm:w-40" aria-label="Sort applications">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Newest first</SelectItem>
            <SelectItem value="company">Company A→Z</SelectItem>
            <SelectItem value="deadline">Deadline soonest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : isError ? (
        <Card className="border-destructive/40">
          <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
            <p className="text-sm">Couldn't load applications.</p>
            <p className="text-xs text-muted-foreground">{(error as Error).message}</p>
            <Button size="sm" variant="outline" onClick={() => refetch()}>Retry</Button>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-14 text-center">
            <p className="text-sm text-muted-foreground">
              {data?.length === 0
                ? "No applications yet. Add your first role to get started."
                : "No applications match your filters."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-lg border border-border md:block">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Position</th>
                  <th className="px-4 py-2.5 text-left font-medium">Company</th>
                  <th className="px-4 py-2.5 text-left font-medium">Status</th>
                  <th className="px-4 py-2.5 text-left font-medium">Deadline</th>
                  <th className="px-4 py-2.5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-t border-border hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="font-medium">{app.position}</div>
                      {app.location && (
                        <div className="text-xs text-muted-foreground">{app.location}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{app.company}</td>
                    <td className="px-4 py-3">
                      <span className={"rounded-full border px-2 py-0.5 text-[11px] " + statusTone(app.status)}>
                        {statusLabel(app.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {app.deadline ? format(new Date(app.deadline), "MMM d, yyyy") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <RowActions
                        app={app}
                        onEdit={() => {
                          setEditing(app);
                          setDialogOpen(true);
                        }}
                        onDelete={() => setDeleteTarget(app)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="grid gap-2 md:hidden">
            {filtered.map((app) => (
              <li key={app.id}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{app.position}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {app.company}
                          {app.location ? ` · ${app.location}` : ""}
                        </div>
                      </div>
                      <span className={"shrink-0 rounded-full border px-2 py-0.5 text-[10px] " + statusTone(app.status)}>
                        {statusLabel(app.status)}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                      {app.applied_date && (
                        <span>Applied {format(new Date(app.applied_date), "MMM d")}</span>
                      )}
                      {app.deadline && (
                        <span>Due {format(new Date(app.deadline), "MMM d")}</span>
                      )}
                      {app.source && <span>via {app.source}</span>}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <RowActions
                        app={app}
                        onEdit={() => {
                          setEditing(app);
                          setDialogOpen(true);
                        }}
                        onDelete={() => setDeleteTarget(app)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </>
      )}

      <ApplicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing}
        onSaved={() => {
          qc.invalidateQueries({ queryKey: ["applications"] });
          qc.invalidateQueries({ queryKey: ["applications-all"] });
        }}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this application?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `“${deleteTarget.position}” at ${deleteTarget.company} will be permanently removed. This cannot be undone.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) deleteMut.mutate(deleteTarget.id);
                setDeleteTarget(null);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function RowActions({
  app,
  onEdit,
  onDelete,
}: {
  app: Application;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-0.5">
      {app.url && (
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <a
            href={app.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${app.company} posting`}
            title="Open posting"
          >
            <IcExternal size={14} />
          </a>
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        aria-label={`Edit ${app.position} at ${app.company}`}
        title="Edit"
        onClick={onEdit}
      >
        <IcEdit size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        aria-label={`Delete ${app.position} at ${app.company}`}
        title="Delete"
        onClick={onDelete}
      >
        <IcTrash size={14} />
      </Button>
    </div>
  );
}

function ApplicationDialog({
  open,
  onOpenChange,
  editing,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  editing: Application | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      company: String(fd.get("company") || "").trim(),
      position: String(fd.get("position") || "").trim(),
      location: String(fd.get("location") || "").trim() || null,
      salary_range: String(fd.get("salary_range") || "").trim() || null,
      status: fd.get("status") as Status,
      applied_date: (fd.get("applied_date") as string) || null,
      deadline: (fd.get("deadline") as string) || null,
      source: String(fd.get("source") || "").trim() || null,
      url: String(fd.get("url") || "").trim() || null,
      notes: String(fd.get("notes") || "").trim() || null,
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from("applications")
          .update(payload)
          .eq("id", editing.id);
        if (error) throw error;
        toast.success("Application updated");
      } else {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) throw new Error("Not signed in");
        const { error } = await supabase
          .from("applications")
          .insert({ ...payload, user_id: userData.user.id });
        if (error) throw error;
        toast.success("Application added");
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit application" : "Add application"}</DialogTitle>
          <DialogDescription>
            Track a new opportunity from source to outcome.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="company" label="Company" required defaultValue={editing?.company} maxLength={200} />
            <Field id="position" label="Position" required defaultValue={editing?.position} maxLength={200} />
            <Field id="location" label="Location" defaultValue={editing?.location ?? ""} maxLength={200} />
            <Field id="salary_range" label="Salary range" defaultValue={editing?.salary_range ?? ""} maxLength={100} />
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={editing?.status ?? "applied"}>
                <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUS_ORDER.map((s) => (
                    <SelectItem key={s} value={s}>{statusLabel(s)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Field id="source" label="Source" placeholder="LinkedIn, referral…" defaultValue={editing?.source ?? ""} maxLength={100} />
            <Field id="applied_date" label="Applied date" type="date" defaultValue={editing?.applied_date ?? ""} />
            <Field id="deadline" label="Deadline" type="date" defaultValue={editing?.deadline ?? ""} />
          </div>
          <Field id="url" label="URL" type="url" placeholder="https://…" defaultValue={editing?.url ?? ""} maxLength={500} />
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" rows={4} defaultValue={editing?.notes ?? ""} maxLength={2000} />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              {saving ? "Saving…" : editing ? "Save changes" : "Add application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  required,
  type = "text",
  placeholder,
  defaultValue,
  maxLength,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  defaultValue?: string | null;
  maxLength?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required && " *"}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        required={required}
        maxLength={maxLength}
      />
    </div>
  );
}
