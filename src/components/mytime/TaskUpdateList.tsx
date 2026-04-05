import { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { Task } from "@/data/mockData";

interface TaskUpdateListProps {
  tasks: Task[];
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
}

export default function TaskUpdateList({ tasks, onTaskUpdate }: TaskUpdateListProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelectedTasks((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <div className="px-4 py-4">
      <Separator className="mb-4" />
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">My Task Updates</h3>
        {selectedTasks.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{selectedTasks.size} selected</span>
            <Button size="sm" variant="outline" className="h-6 text-xs">
              Batch Update
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`border border-border rounded-lg overflow-hidden transition-colors ${
              selectedTasks.has(task.id) ? "border-accent/50 bg-accent/5" : "bg-card"
            }`}
          >
            <div
              className="flex items-center gap-3 px-3 py-2.5 cursor-pointer"
              onClick={() => setExpanded(expanded === task.id ? null : task.id)}
            >
              <input
                type="checkbox"
                className="rounded border-border accent-accent"
                checked={selectedTasks.has(task.id)}
                onChange={(e) => { e.stopPropagation(); toggleSelect(task.id); }}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: task.projectColor }} />
              <span className="text-sm text-foreground flex-1 truncate">{task.title}</span>
              {task.needsUpdate && (
                <AlertCircle className="h-3.5 w-3.5 text-warning shrink-0" />
              )}
              <StatusBadge status={task.status} />
              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${task.progress}%` }} />
              </div>
              <span className="text-xs text-muted-foreground w-7">{task.progress}%</span>
              {expanded === task.id ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            {expanded === task.id && (
              <div className="border-t border-border px-3 py-3 bg-surface-elevated/50 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Status</label>
                    <select
                      value={task.status}
                      onChange={(e) => onTaskUpdate(task.id, { status: e.target.value as Task["status"] })}
                      className="mt-1 w-full text-xs bg-card border border-border rounded px-2 py-1.5 text-foreground"
                    >
                      <option value="planned">Planned</option>
                      <option value="doing">Doing</option>
                      <option value="blocked">Blocked</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Progress</label>
                    <div className="flex items-center gap-1 mt-1">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={task.progress}
                        onChange={(e) => onTaskUpdate(task.id, { progress: parseInt(e.target.value) })}
                        className="flex-1 accent-accent"
                      />
                      <span className="text-xs text-foreground w-7">{task.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Est. Remaining</label>
                    <div className="text-xs text-foreground mt-1.5">
                      {Math.max(0, task.estimatedMinutes - task.loggedMinutes)} min
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Quick Note</label>
                  <div className="flex gap-2 mt-1">
                    <Input placeholder="Add a note..." className="h-7 text-xs bg-card" />
                    <Button size="sm" className="h-7 text-xs bg-accent text-accent-foreground hover:bg-accent/90">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
                {task.notes.length > 0 && (
                  <div className="space-y-1">
                    {task.notes.map((note, i) => (
                      <p key={i} className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1">
                        {note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Task["status"] }) {
  const styles = {
    planned: "bg-muted text-muted-foreground",
    doing: "bg-accent/15 text-accent",
    blocked: "bg-destructive/15 text-destructive",
    done: "bg-success/15 text-success",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}
