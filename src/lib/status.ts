// Shared status helpers — DB enum stays as `wishlist | applied | interviewing | offer | rejected | accepted`.
// The UI displays friendlier labels without changing the backend.

export type Status = "wishlist" | "applied" | "interviewing" | "offer" | "rejected" | "accepted";

export const STATUS_ORDER: Status[] = [
  "wishlist",
  "applied",
  "interviewing",
  "offer",
  "accepted",
  "rejected",
];

const LABELS: Record<Status, string> = {
  wishlist: "Saved",
  applied: "Applied",
  interviewing: "Interview",
  offer: "Offer",
  accepted: "Accepted",
  rejected: "Rejected",
};

export function statusLabel(s: Status): string {
  return LABELS[s] ?? s;
}

export function statusTone(s: Status): string {
  switch (s) {
    case "wishlist":
      return "border-border bg-muted text-muted-foreground";
    case "applied":
      return "border-info/30 bg-info/10 text-info";
    case "interviewing":
      return "border-warning/30 bg-warning/10 text-warning";
    case "offer":
    case "accepted":
      return "border-primary/30 bg-primary/10 text-primary";
    case "rejected":
      return "border-destructive/30 bg-destructive/10 text-destructive";
  }
}
