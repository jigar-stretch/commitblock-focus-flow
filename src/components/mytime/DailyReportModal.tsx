import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, Clock, BookOpen, AlertTriangle } from "lucide-react";
import type { Task, StudyBlock } from "@/data/mockData";
import { workdaySummary } from "@/data/mockData";
import { format } from "date-fns";
import { toast } from "sonner";

interface DailyReportModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  tasks: Task[];
  studyBlocks: StudyBlock[];
  currentDate: Date;
}

export default function DailyReportModal({ open, onOpenChange, tasks, studyBlocks, currentDate }: DailyReportModalProps) {
  const [summary, setSummary] = useState("");
  const [blockers, setBlockers] = useState("");
  const [tomorrowPlan, setTomorrowPlan] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const completedToday = tasks.filter((t) => t.status === "done");
  const inProgress = tasks.filter((t) => t.status === "doing");
  const blockedTasks = tasks.filter((t) => t.status === "blocked");

  const formatTime = (min: number) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      setSummary("");
      setBlockers("");
      setTomorrowPlan("");
      toast.success("Daily report submitted successfully", {
        description: `Report for ${format(currentDate, "MMM d, yyyy")} sent to your team.`,
      });
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border max-h-[85vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Send className="h-4 w-4 text-accent" />
            Submit Daily Report
          </DialogTitle>
          <p className="text-xs text-muted-foreground">{format(currentDate, "EEEE, MMMM d, yyyy")}</p>
        </DialogHeader>

        {/* Auto-generated summary */}
        <div className="space-y-3">
          <div className="bg-surface-elevated rounded-lg p-3 space-y-2.5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Auto-generated Summary</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs text-muted-foreground">Logged:</span>
                <span className="text-xs font-medium text-foreground">{formatTime(workdaySummary.loggedMinutes)}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs text-muted-foreground">Learning:</span>
                <span className="text-xs font-medium text-foreground">{formatTime(workdaySummary.learningMinutes)}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                <span className="text-xs text-muted-foreground">Completed:</span>
                <span className="text-xs font-medium text-foreground">{completedToday.length} task(s)</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                <span className="text-xs text-muted-foreground">Blocked:</span>
                <span className="text-xs font-medium text-foreground">{blockedTasks.length} task(s)</span>
              </div>
            </div>
          </div>

          {/* Tasks worked on */}
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">Tasks Worked On</p>
            <div className="space-y-1">
              {[...completedToday, ...inProgress, ...blockedTasks].map((t) => (
                <div key={t.id} className="flex items-center gap-2 text-xs bg-surface-elevated rounded px-2.5 py-1.5">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: t.projectColor }} />
                  <span className="text-foreground flex-1 truncate">{t.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium capitalize ${
                    t.status === "done" ? "bg-success/15 text-success" :
                    t.status === "doing" ? "bg-accent/15 text-accent" :
                    t.status === "blocked" ? "bg-destructive/15 text-destructive" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {t.status}
                  </span>
                  <span className="text-muted-foreground w-7 text-right">{t.progress}%</span>
                </div>
              ))}
              {studyBlocks.length > 0 && studyBlocks.map((sb) => (
                <div key={sb.id} className="flex items-center gap-2 text-xs bg-accent/5 border border-accent/10 rounded px-2.5 py-1.5">
                  <span className="text-accent">📖</span>
                  <span className="text-foreground flex-1 truncate">{sb.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-accent/15 text-accent">Learning</span>
                  <span className="text-muted-foreground">{sb.duration}m</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editable fields */}
          <div>
            <Label className="text-xs text-muted-foreground">Key Accomplishments / Notes</Label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Anything else you'd like to highlight..."
              className="mt-1 bg-surface-elevated min-h-[60px] text-sm resize-none"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Blockers / Challenges</Label>
            <Textarea
              value={blockers}
              onChange={(e) => setBlockers(e.target.value)}
              placeholder="Any blockers or things you need help with..."
              className="mt-1 bg-surface-elevated min-h-[50px] text-sm resize-none"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Plan for Tomorrow</Label>
            <Textarea
              value={tomorrowPlan}
              onChange={(e) => setTomorrowPlan(e.target.value)}
              placeholder="What are you planning to work on next?"
              className="mt-1 bg-surface-elevated min-h-[50px] text-sm resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="text-muted-foreground">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
          >
            {submitting ? (
              <>
                <span className="h-3.5 w-3.5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Submit Report
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
