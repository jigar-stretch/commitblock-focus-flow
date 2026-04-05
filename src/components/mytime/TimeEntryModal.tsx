import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { mockTasks } from "@/data/mockData";

interface TimeEntryModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export default function TimeEntryModal({ open, onOpenChange }: TimeEntryModalProps) {
  const [taskId, setTaskId] = useState("");
  const [minutes, setMinutes] = useState(30);
  const [note, setNote] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" />
            Quick Time Entry
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Task</Label>
            <select
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              className="mt-1 w-full text-sm bg-surface-elevated border border-border rounded px-2 py-2 text-foreground"
            >
              <option value="">Select a task...</option>
              {mockTasks.map((t) => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Minutes</Label>
            <Input type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="mt-1 bg-surface-elevated" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Note (optional)</Label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What did you work on?" className="mt-1 bg-surface-elevated" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Log Time
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
