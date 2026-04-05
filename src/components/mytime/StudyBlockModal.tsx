import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BookOpen } from "lucide-react";

interface StudyBlockModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export default function StudyBlockModal({ open, onOpenChange }: StudyBlockModalProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(30);
  const [skill, setSkill] = useState("");
  const [teamVisible, setTeamVisible] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-accent" />
            New Study Block
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. GraphQL patterns" className="mt-1 bg-surface-elevated" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Duration (minutes)</Label>
            <div className="flex gap-2 mt-1.5">
              {[15, 30, 45, 60, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                    duration === d ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d}m
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Skill / Topic</Label>
            <Input value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="e.g. Rust, Design Systems" className="mt-1 bg-surface-elevated" />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs text-foreground">Team visible</Label>
            <Switch checked={teamVisible} onCheckedChange={setTeamVisible} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Create Study Block
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
