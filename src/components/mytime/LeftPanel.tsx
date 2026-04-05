import { useState } from "react";
import { Clock, CalendarDays, AlertTriangle, RefreshCw, BookOpen, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/data/mockData";
import type { TaskStatus } from "@/data/mockData";

type QuickFilter = "today" | "week" | "overdue" | "needs-update" | "learning";
const quickFilters: { key: QuickFilter; label: string; icon: React.ElementType; count?: number }[] = [
  { key: "today", label: "Today", icon: Clock, count: 4 },
  { key: "week", label: "This Week", icon: CalendarDays, count: 6 },
  { key: "overdue", label: "Overdue", icon: AlertTriangle, count: 1 },
  { key: "needs-update", label: "Needs Update", icon: RefreshCw, count: 2 },
  { key: "learning", label: "Learning Blocks", icon: BookOpen, count: 2 },
];

const statusOptions: { key: TaskStatus; label: string }[] = [
  { key: "planned", label: "Planned" },
  { key: "doing", label: "Doing" },
  { key: "blocked", label: "Blocked" },
  { key: "done", label: "Done" },
];

interface LeftPanelProps {
  activeFilter: QuickFilter;
  onFilterChange: (f: QuickFilter) => void;
  selectedStatuses: TaskStatus[];
  onStatusToggle: (s: TaskStatus) => void;
  selectedProjects: string[];
  onProjectToggle: (p: string) => void;
  onNewTimeEntry: () => void;
  onNewStudyBlock: () => void;
}

export default function LeftPanel({
  activeFilter,
  onFilterChange,
  selectedStatuses,
  onStatusToggle,
  selectedProjects,
  onProjectToggle,
  onNewTimeEntry,
  onNewStudyBlock,
}: LeftPanelProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col h-full overflow-y-auto scrollbar-thin">
      <div className="p-4 pb-2">
        <h2 className="text-lg font-semibold text-foreground">My Time</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Track & update your work</p>
      </div>

      <div className="px-3 space-y-0.5">
        {quickFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
              activeFilter === f.key
                ? "bg-accent/15 text-accent font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <f.icon className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">{f.label}</span>
            {f.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeFilter === f.key ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
              }`}>
                {f.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <Separator className="my-3 mx-3" />

      <div className="px-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Projects</span>
        </div>
        <div className="space-y-0.5">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => onProjectToggle(p.id)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                selectedProjects.includes(p.id)
                  ? "bg-accent/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
              <span className="truncate text-left">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-3 mx-3" />

      <div className="px-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</span>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {statusOptions.map((s) => (
            <button
              key={s.key}
              onClick={() => onStatusToggle(s.key)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedStatuses.includes(s.key)
                  ? s.key === "blocked"
                    ? "bg-destructive/15 text-destructive"
                    : s.key === "done"
                    ? "bg-success/15 text-success"
                    : s.key === "doing"
                    ? "bg-accent/15 text-accent"
                    : "bg-muted text-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-3 space-y-2">
        <Button onClick={onNewTimeEntry} size="sm" className="w-full justify-start gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="h-4 w-4" />
          New Time Entry
        </Button>
        <Button onClick={onNewStudyBlock} variant="outline" size="sm" className="w-full justify-start gap-2 border-accent/30 text-accent hover:bg-accent/10">
          <BookOpen className="h-4 w-4" />
          Study Block
        </Button>
      </div>
    </aside>
  );
}
