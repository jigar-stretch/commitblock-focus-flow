import { useState, useCallback } from "react";
import LeftPanel from "@/components/mytime/LeftPanel";
import CenterPanel from "@/components/mytime/CenterPanel";
import RightPanel from "@/components/mytime/RightPanel";
import PreferencesModal from "@/components/mytime/PreferencesModal";
import DistributeModal from "@/components/mytime/DistributeModal";
import StudyBlockModal from "@/components/mytime/StudyBlockModal";
import TimeEntryModal from "@/components/mytime/TimeEntryModal";
import DailyReportModal from "@/components/mytime/DailyReportModal";
import { mockTasks, mockStudyBlocks, currentUser } from "@/data/mockData";
import type { Task, TaskStatus } from "@/data/mockData";

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeFilter, setActiveFilter] = useState<"today" | "week" | "overdue" | "needs-update" | "learning">("today");
  const [selectedStatuses, setSelectedStatuses] = useState<TaskStatus[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [distributeOpen, setDistributeOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(false);
  const [timeEntryOpen, setTimeEntryOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const isLead = currentUser.role === "admin" || currentUser.role === "lead";

  const handleStatusToggle = useCallback((s: TaskStatus) => {
    setSelectedStatuses((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }, []);

  const handleProjectToggle = useCallback((p: string) => {
    setSelectedProjects((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  }, []);

  const handleTaskUpdate = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, lastUpdated: new Date().toISOString(), lastUpdatedBy: currentUser.name, needsUpdate: false } : t))
    );
  }, []);

  return (
    <div className="h-screen flex bg-background dark">
      <LeftPanel
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        selectedStatuses={selectedStatuses}
        onStatusToggle={handleStatusToggle}
        selectedProjects={selectedProjects}
        onProjectToggle={handleProjectToggle}
        onNewTimeEntry={() => setTimeEntryOpen(true)}
        onNewStudyBlock={() => setStudyOpen(true)}
      />
      <CenterPanel
        tasks={tasks}
        studyBlocks={mockStudyBlocks}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onTaskUpdate={handleTaskUpdate}
        onOpenPreferences={() => setPrefsOpen(true)}
        onOpenDistribute={() => setDistributeOpen(true)}
        onOpenReport={() => setReportOpen(true)}
        isLead={isLead}
      />
      <RightPanel currentDate={currentDate} onDateChange={setCurrentDate} />

      <PreferencesModal open={prefsOpen} onOpenChange={setPrefsOpen} />
      <DistributeModal open={distributeOpen} onOpenChange={setDistributeOpen} tasks={tasks} />
      <StudyBlockModal open={studyOpen} onOpenChange={setStudyOpen} />
      <TimeEntryModal open={timeEntryOpen} onOpenChange={setTimeEntryOpen} />
    </div>
  );
}
