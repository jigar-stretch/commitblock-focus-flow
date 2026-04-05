import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, GitBranch, CheckCircle2 } from "lucide-react";
import type { Task } from "@/data/mockData";
import { teamMembers } from "@/data/mockData";

interface DistributeModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  tasks: Task[];
}

type Mode = "reassign" | "split";

export default function DistributeModal({ open, onOpenChange, tasks }: DistributeModalProps) {
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<Mode>("reassign");
  const [assignTo, setAssignTo] = useState("");
  const [step, setStep] = useState<"select" | "configure" | "preview">("select");

  const distributableTasks = tasks.filter((t) => t.status !== "done");

  const toggleTask = (id: string) => {
    setSelectedTasks((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const reset = () => {
    setSelectedTasks(new Set());
    setMode("reassign");
    setAssignTo("");
    setStep("select");
  };

  const handleClose = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-accent" />
            Distribute Work
          </DialogTitle>
        </DialogHeader>

        {step === "select" && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Select tasks to distribute to team members.</p>
            <div className="max-h-60 overflow-y-auto space-y-1.5 scrollbar-thin">
              {distributableTasks.map((t) => (
                <label
                  key={t.id}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                    selectedTasks.has(t.id) ? "bg-accent/10 border border-accent/30" : "bg-surface-elevated border border-transparent hover:border-border"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedTasks.has(t.id)}
                    onChange={() => toggleTask(t.id)}
                    className="rounded accent-accent"
                  />
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.projectColor }} />
                  <span className="text-sm text-foreground flex-1 truncate">{t.title}</span>
                  <span className="text-[10px] text-muted-foreground capitalize">{t.status}</span>
                </label>
              ))}
            </div>
            <DialogFooter>
              <Button
                disabled={selectedTasks.size === 0}
                onClick={() => setStep("configure")}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Next ({selectedTasks.size} selected)
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "configure" && (
          <div className="space-y-4">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Distribution Method</span>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setMode("reassign")}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                    mode === "reassign" ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ArrowRight className="h-4 w-4 mx-auto mb-1" />
                  Reassign
                </button>
                <button
                  onClick={() => setMode("split")}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
                    mode === "split" ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <GitBranch className="h-4 w-4 mx-auto mb-1" />
                  Split
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Assign to</span>
              <div className="space-y-1.5 mt-2">
                {teamMembers.filter((m) => m.id !== "1").map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setAssignTo(m.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors border ${
                      assignTo === m.id ? "border-accent bg-accent/10 text-accent" : "border-transparent bg-surface-elevated text-foreground hover:border-border"
                    }`}
                  >
                    <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px] font-medium text-accent">
                      {m.avatar}
                    </div>
                    <span>{m.name}</span>
                    <Badge variant="outline" className="ml-auto text-[10px] capitalize">{m.role}</Badge>
                  </button>
                ))}
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="ghost" onClick={() => setStep("select")} className="text-muted-foreground">
                Back
              </Button>
              <Button
                disabled={!assignTo}
                onClick={() => setStep("preview")}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Preview
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-4">
            <div className="bg-surface-elevated rounded-lg p-3 space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Distribution Preview</p>
              {distributableTasks
                .filter((t) => selectedTasks.has(t.id))
                .map((t) => {
                  const member = teamMembers.find((m) => m.id === assignTo);
                  return (
                    <div key={t.id} className="flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.projectColor }} />
                      <span className="text-foreground truncate flex-1">{t.title}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="text-accent text-xs font-medium">{member?.name}</span>
                      {mode === "split" && (
                        <Badge variant="outline" className="text-[10px] border-accent/30 text-accent">Split</Badge>
                      )}
                    </div>
                  );
                })}
            </div>
            <p className="text-xs text-muted-foreground">
              This will {mode === "reassign" ? "reassign" : "split and assign"} {selectedTasks.size} task(s).
              All affected team members will be notified.
            </p>
            <DialogFooter className="gap-2">
              <Button variant="ghost" onClick={() => setStep("configure")} className="text-muted-foreground">
                Back
              </Button>
              <Button
                onClick={() => { handleClose(false); }}
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Confirm Distribution
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
