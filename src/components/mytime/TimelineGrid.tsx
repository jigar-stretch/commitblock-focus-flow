import { Play, Pause, Square, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task, StudyBlock } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface TimelineGridProps {
  tasks: Task[];
  studyBlocks: StudyBlock[];
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
}

const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8AM-5PM

export default function TimelineGrid({ tasks, studyBlocks, onTaskUpdate }: TimelineGridProps) {
  const getTasksAtHour = (hour: number) =>
    tasks.filter((t) => t.timeSlot && t.timeSlot.start <= hour && t.timeSlot.end > hour);

  const getStudyAtHour = (hour: number) =>
    studyBlocks.filter((s) => s.timeSlot.start <= hour && s.timeSlot.end > hour);

  const rendered = new Set<string>();

  return (
    <div className="px-4 pt-3">
      <h3 className="text-sm font-semibold text-foreground mb-2">Daily Timeline</h3>
      <div className="relative">
        {hours.map((hour) => {
          const hourTasks = getTasksAtHour(hour);
          const hourStudy = getStudyAtHour(hour);
          const newTasks = hourTasks.filter((t) => !rendered.has(t.id));
          const newStudy = hourStudy.filter((s) => !rendered.has(s.id));
          newTasks.forEach((t) => rendered.add(t.id));
          newStudy.forEach((s) => rendered.add(s.id));

          return (
            <div key={hour} className="flex min-h-[3.5rem] border-b border-border/50">
              <div className="w-16 shrink-0 text-xs text-muted-foreground py-2 pr-2 text-right">
                {hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`}
              </div>
              <div className="flex-1 py-1 space-y-1">
                {newTasks.map((task) => (
                  <TaskBlock key={task.id} task={task} onTaskUpdate={onTaskUpdate} />
                ))}
                {newStudy.map((block) => (
                  <StudyBlockCard key={block.id} block={block} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TaskBlock({ task, onTaskUpdate }: { task: Task; onTaskUpdate: (id: string, u: Partial<Task>) => void }) {
  const statusColor =
    task.status === "doing"
      ? "border-l-accent"
      : task.status === "blocked"
      ? "border-l-destructive"
      : task.status === "done"
      ? "border-l-success"
      : "border-l-muted-foreground";

  return (
    <div className={`bg-surface-elevated rounded-md border border-border p-2.5 border-l-[3px] ${statusColor}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground truncate">{task.title}</span>
            {task.needsUpdate && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-warning text-warning shrink-0">
                <AlertCircle className="h-3 w-3 mr-0.5" />
                Needs update
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: task.projectColor }} />
            <span>{task.project}</span>
            <span>·</span>
            <span className="capitalize">{task.priority}</span>
            <span>·</span>
            <span>Due {task.dueDate}</span>
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${task.progress}%` }} />
            </div>
            <span className="text-[10px] text-muted-foreground w-7 text-right">{task.progress}%</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">Last updated by {task.lastUpdatedBy}</p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {task.status !== "doing" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-accent hover:bg-accent/10"
              onClick={() => onTaskUpdate(task.id, { status: "doing" })}
              title="Start"
            >
              <Play className="h-3.5 w-3.5" />
            </Button>
          )}
          {task.status === "doing" && (
            <>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-warning hover:bg-warning/10" title="Pause">
                <Pause className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:bg-destructive/10"
                onClick={() => onTaskUpdate(task.id, { status: "planned" })}
                title="Stop & Log"
              >
                <Square className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-success hover:bg-success/10"
            onClick={() => onTaskUpdate(task.id, { status: "done", progress: 100 })}
            title="Mark Done"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:bg-muted" title="Add Note">
            <MessageSquare className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function StudyBlockCard({ block }: { block: StudyBlock }) {
  return (
    <div className="bg-accent/10 border border-accent/20 rounded-md p-2.5 border-l-[3px] border-l-accent">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-accent">📖 {block.title}</span>
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-accent/30 text-accent">
          Learning
        </Badge>
      </div>
      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
        <span>{block.duration} min</span>
        <span>·</span>
        <span>{block.skill}</span>
        {block.teamVisible && (
          <>
            <span>·</span>
            <span className="text-accent">Team visible</span>
          </>
        )}
      </div>
    </div>
  );
}
