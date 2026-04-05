export type TaskStatus = "planned" | "doing" | "blocked" | "done";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface Task {
  id: string;
  title: string;
  project: string;
  projectColor: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  progress: number;
  lastUpdated: string;
  lastUpdatedBy: string;
  assignee: string;
  estimatedMinutes: number;
  loggedMinutes: number;
  notes: string[];
  timeSlot?: { start: number; end: number };
  needsUpdate: boolean;
}

export interface StudyBlock {
  id: string;
  title: string;
  duration: number;
  skill: string;
  linkedTaskId?: string;
  teamVisible: boolean;
  timeSlot: { start: number; end: number };
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: "admin" | "lead" | "member";
}

export const teamMembers: TeamMember[] = [
  { id: "1", name: "Alex Rivera", avatar: "AR", role: "admin" },
  { id: "2", name: "Sam Chen", avatar: "SC", role: "lead" },
  { id: "3", name: "Jordan Lee", avatar: "JL", role: "member" },
  { id: "4", name: "Taylor Kim", avatar: "TK", role: "member" },
  { id: "5", name: "Morgan Patel", avatar: "MP", role: "member" },
];

export const currentUser = teamMembers[0];

export const projects = [
  { id: "p1", name: "CommitBlock UI", color: "hsl(168, 72%, 46%)" },
  { id: "p2", name: "API Gateway", color: "hsl(215, 70%, 55%)" },
  { id: "p3", name: "Mobile App", color: "hsl(280, 60%, 55%)" },
  { id: "p4", name: "Data Pipeline", color: "hsl(38, 90%, 55%)" },
];

export const mockTasks: Task[] = [
  {
    id: "t1",
    title: "Implement time tracking widget",
    project: "CommitBlock UI",
    projectColor: "hsl(168, 72%, 46%)",
    status: "doing",
    priority: "high",
    dueDate: "2026-04-06",
    progress: 65,
    lastUpdated: "2026-04-05T09:30:00",
    lastUpdatedBy: "Alex Rivera",
    assignee: "Alex Rivera",
    estimatedMinutes: 240,
    loggedMinutes: 156,
    notes: ["Started layout scaffolding", "API integration pending"],
    timeSlot: { start: 9, end: 11 },
    needsUpdate: false,
  },
  {
    id: "t2",
    title: "Fix auth token refresh logic",
    project: "API Gateway",
    projectColor: "hsl(215, 70%, 55%)",
    status: "planned",
    priority: "critical",
    dueDate: "2026-04-05",
    progress: 0,
    lastUpdated: "2026-04-03T14:00:00",
    lastUpdatedBy: "Sam Chen",
    assignee: "Alex Rivera",
    estimatedMinutes: 120,
    loggedMinutes: 0,
    notes: [],
    timeSlot: { start: 11, end: 12 },
    needsUpdate: true,
  },
  {
    id: "t3",
    title: "Design onboarding flow screens",
    project: "Mobile App",
    projectColor: "hsl(280, 60%, 55%)",
    status: "doing",
    priority: "medium",
    dueDate: "2026-04-07",
    progress: 40,
    lastUpdated: "2026-04-05T08:15:00",
    lastUpdatedBy: "Alex Rivera",
    assignee: "Alex Rivera",
    estimatedMinutes: 180,
    loggedMinutes: 72,
    notes: ["Wireframes approved", "Working on high-fidelity"],
    timeSlot: { start: 13, end: 15 },
    needsUpdate: false,
  },
  {
    id: "t4",
    title: "Set up ETL pipeline for analytics",
    project: "Data Pipeline",
    projectColor: "hsl(38, 90%, 55%)",
    status: "blocked",
    priority: "high",
    dueDate: "2026-04-08",
    progress: 20,
    lastUpdated: "2026-04-02T11:00:00",
    lastUpdatedBy: "Morgan Patel",
    assignee: "Alex Rivera",
    estimatedMinutes: 360,
    loggedMinutes: 72,
    notes: ["Waiting on data source credentials"],
    needsUpdate: true,
  },
  {
    id: "t5",
    title: "Write unit tests for task module",
    project: "CommitBlock UI",
    projectColor: "hsl(168, 72%, 46%)",
    status: "planned",
    priority: "low",
    dueDate: "2026-04-10",
    progress: 0,
    lastUpdated: "2026-04-04T16:30:00",
    lastUpdatedBy: "Alex Rivera",
    assignee: "Alex Rivera",
    estimatedMinutes: 90,
    loggedMinutes: 0,
    notes: [],
    needsUpdate: false,
  },
  {
    id: "t6",
    title: "Review PR #142 - notification service",
    project: "API Gateway",
    projectColor: "hsl(215, 70%, 55%)",
    status: "done",
    priority: "medium",
    dueDate: "2026-04-04",
    progress: 100,
    lastUpdated: "2026-04-04T17:00:00",
    lastUpdatedBy: "Alex Rivera",
    assignee: "Sam Chen",
    estimatedMinutes: 45,
    loggedMinutes: 50,
    notes: ["Approved with minor suggestions"],
    needsUpdate: false,
  },
];

export const mockStudyBlocks: StudyBlock[] = [
  {
    id: "sb1",
    title: "GraphQL Advanced Patterns",
    duration: 60,
    skill: "GraphQL",
    teamVisible: true,
    timeSlot: { start: 15, end: 16 },
    date: "2026-04-05",
  },
  {
    id: "sb2",
    title: "Rust Ownership Deep Dive",
    duration: 45,
    skill: "Rust",
    linkedTaskId: "t4",
    teamVisible: true,
    timeSlot: { start: 16, end: 17 },
    date: "2026-04-05",
  },
];

export const workdaySummary = {
  plannedMinutes: 480,
  loggedMinutes: 350,
  focusMinutes: 210,
  learningMinutes: 105,
};

export const quickInsights = {
  behindSchedule: 2,
  atRisk: 1,
  unupdated: 2,
};
