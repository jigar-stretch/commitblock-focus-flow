import { useState } from "react";
import { ChevronLeft, ChevronRight, Settings, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, subDays } from "date-fns";
import type { Task, StudyBlock, TaskStatus } from "@/data/mockData";
import TimelineGrid from "./TimelineGrid";
import TaskUpdateList from "./TaskUpdateList";

type ViewMode = "daily" | "weekly" | "monthly";

interface CenterPanelProps {
  tasks: Task[];
  studyBlocks: StudyBlock[];
  currentDate: Date;
  onDateChange: (d: Date) => void;
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
  onOpenPreferences: () => void;
  onOpenDistribute: () => void;
  onOpenReport: () => void;
  isLead: boolean;
}

export default function CenterPanel({
  tasks,
  studyBlocks,
  currentDate,
  onDateChange,
  onTaskUpdate,
  onOpenPreferences,
  onOpenDistribute,
  onOpenReport,
  isLead,
}: CenterPanelProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [viewFor, setViewFor] = useState("me");

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      {/* Top controls */}
      <div className="border-b border-border bg-card px-4 py-2.5 flex items-center gap-2 flex-wrap">
        <div className="flex bg-muted rounded-md p-0.5">
          {(["daily", "weekly", "monthly"] as ViewMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                viewMode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex bg-muted rounded-md p-0.5 ml-1">
          <button
            onClick={() => setViewFor("me")}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              viewFor === "me" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Me
          </button>
          <button
            onClick={() => setViewFor("team")}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 ${
              viewFor === "team" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <Users className="h-3 w-3" />
            Team
          </button>
        </div>

        <div className="flex items-center gap-1 ml-2">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onDateChange(subDays(currentDate, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <button
            onClick={() => onDateChange(new Date())}
            className="px-3 py-1 text-xs font-medium rounded hover:bg-muted transition-colors text-foreground"
          >
            Today
          </button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onDateChange(addDays(currentDate, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-foreground ml-1">
            {format(currentDate, "EEEE, MMM d, yyyy")}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Button size="sm" className="h-7 text-xs gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90" onClick={onOpenReport}>
            <Send className="h-3 w-3" />
            Submit Report
          </Button>
          {isLead && (
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 border-accent/30 text-accent hover:bg-accent/10" onClick={onOpenDistribute}>
              Distribute Work
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onOpenPreferences}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <TimelineGrid tasks={tasks} studyBlocks={studyBlocks} onTaskUpdate={onTaskUpdate} />
        <TaskUpdateList tasks={tasks} onTaskUpdate={onTaskUpdate} />
      </div>
    </div>
  );
}
