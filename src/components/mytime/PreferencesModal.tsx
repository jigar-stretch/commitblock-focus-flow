import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface PreferencesModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export default function PreferencesModal({ open, onOpenChange }: PreferencesModalProps) {
  const [workStart, setWorkStart] = useState(9);
  const [workEnd, setWorkEnd] = useState(17);
  const [granularity, setGranularity] = useState(30);
  const [showWeekends, setShowWeekends] = useState(false);
  const [groupBy, setGroupBy] = useState<"project" | "priority">("project");
  const [colorMode, setColorMode] = useState<"project" | "status">("project");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Preferences</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Work Start</Label>
              <select
                value={workStart}
                onChange={(e) => setWorkStart(Number(e.target.value))}
                className="mt-1 w-full text-sm bg-surface-elevated border border-border rounded px-2 py-1.5 text-foreground"
              >
                {Array.from({ length: 12 }, (_, i) => i + 6).map((h) => (
                  <option key={h} value={h}>{h > 12 ? `${h - 12} PM` : `${h} AM`}</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Work End</Label>
              <select
                value={workEnd}
                onChange={(e) => setWorkEnd(Number(e.target.value))}
                className="mt-1 w-full text-sm bg-surface-elevated border border-border rounded px-2 py-1.5 text-foreground"
              >
                {Array.from({ length: 12 }, (_, i) => i + 12).map((h) => (
                  <option key={h} value={h}>{h > 12 ? `${h - 12} PM` : `12 PM`}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Time Slot Granularity</Label>
            <div className="flex gap-2 mt-1.5">
              {[15, 30, 60].map((g) => (
                <button
                  key={g}
                  onClick={() => setGranularity(g)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    granularity === g ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {g} min
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs text-foreground">Show weekends</Label>
            <Switch checked={showWeekends} onCheckedChange={setShowWeekends} />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Group by</Label>
            <div className="flex gap-2 mt-1.5">
              {(["project", "priority"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGroupBy(g)}
                  className={`px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors ${
                    groupBy === g ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Color mode</Label>
            <div className="flex gap-2 mt-1.5">
              {(["project", "status"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setColorMode(c)}
                  className={`px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors ${
                    colorMode === c ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
