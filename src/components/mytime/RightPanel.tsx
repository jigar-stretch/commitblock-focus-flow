import { Calendar } from "@/components/ui/calendar";
import { Clock, Zap, BookOpen, Target, AlertTriangle, RefreshCw, Eye } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { workdaySummary, quickInsights, teamMembers } from "@/data/mockData";
import { useState } from "react";

interface RightPanelProps {
  currentDate: Date;
  onDateChange: (d: Date) => void;
}

export default function RightPanel({ currentDate, onDateChange }: RightPanelProps) {
  const [showLearningToTeam, setShowLearningToTeam] = useState(true);

  const formatTime = (min: number) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <aside className="w-72 shrink-0 border-l border-border bg-card flex flex-col h-full overflow-y-auto scrollbar-thin">
      {/* Mini Calendar */}
      <div className="p-3 border-b border-border">
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={(d) => d && onDateChange(d)}
          className="p-0 pointer-events-auto"
        />
      </div>

      {/* Workday Summary */}
      <div className="p-4 border-b border-border">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Workday Summary</h4>
        <div className="grid grid-cols-2 gap-2.5">
          <SummaryCard icon={Target} label="Planned" value={formatTime(workdaySummary.plannedMinutes)} />
          <SummaryCard icon={Clock} label="Logged" value={formatTime(workdaySummary.loggedMinutes)} accent />
          <SummaryCard icon={Zap} label="Focus" value={formatTime(workdaySummary.focusMinutes)} />
          <SummaryCard icon={BookOpen} label="Learning" value={formatTime(workdaySummary.learningMinutes)} />
        </div>
        {/* Overall progress */}
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>Day progress</span>
            <span>{Math.round((workdaySummary.loggedMinutes / workdaySummary.plannedMinutes) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${(workdaySummary.loggedMinutes / workdaySummary.plannedMinutes) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Team Visibility */}
      <div className="p-4 border-b border-border">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Team Visibility</h4>
        <div className="flex items-center gap-2 mb-3">
          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Visible to your team</span>
        </div>
        <div className="flex -space-x-1.5 mb-3">
          {teamMembers.slice(0, 4).map((m) => (
            <div
              key={m.id}
              className="h-6 w-6 rounded-full bg-accent/20 border-2 border-card flex items-center justify-center text-[9px] font-medium text-accent"
              title={m.name}
            >
              {m.avatar}
            </div>
          ))}
          <div className="h-6 w-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[9px] text-muted-foreground">
            +{teamMembers.length - 4}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground">Show learning blocks</span>
          <Switch checked={showLearningToTeam} onCheckedChange={setShowLearningToTeam} />
        </div>
      </div>

      {/* Quick Insights */}
      <div className="p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Insights</h4>
        <div className="space-y-2">
          <InsightRow icon={AlertTriangle} label="Behind schedule" count={quickInsights.behindSchedule} variant="warning" />
          <InsightRow icon={AlertTriangle} label="At-risk tasks" count={quickInsights.atRisk} variant="destructive" />
          <InsightRow icon={RefreshCw} label="Unupdated (2+ days)" count={quickInsights.unupdated} variant="muted" />
        </div>
      </div>
    </aside>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-surface-elevated rounded-lg p-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`h-3 w-3 ${accent ? "text-accent" : "text-muted-foreground"}`} />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <span className={`text-sm font-semibold ${accent ? "text-accent" : "text-foreground"}`}>{value}</span>
    </div>
  );
}

function InsightRow({
  icon: Icon,
  label,
  count,
  variant,
}: {
  icon: React.ElementType;
  label: string;
  count: number;
  variant: "warning" | "destructive" | "muted";
}) {
  const colors = {
    warning: "text-warning bg-warning/10",
    destructive: "text-destructive bg-destructive/10",
    muted: "text-muted-foreground bg-muted",
  };
  return (
    <div className="flex items-center gap-2">
      <div className={`h-6 w-6 rounded flex items-center justify-center ${colors[variant]}`}>
        <Icon className="h-3 w-3" />
      </div>
      <span className="text-xs text-foreground flex-1">{label}</span>
      <span className={`text-sm font-semibold ${variant === "muted" ? "text-muted-foreground" : variant === "warning" ? "text-warning" : "text-destructive"}`}>
        {count}
      </span>
    </div>
  );
}
