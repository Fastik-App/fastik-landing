import { MessageSquare, Users, Kanban, FolderOpen, Share2, Calendar } from "lucide-react";

export const glass = "bg-white/[0.03] backdrop-blur-xl border border-white/[0.07]";
export const glassHover = "hover:bg-white/[0.06] hover:border-white/[0.12]";

export const navFeatures = [
  { icon: MessageSquare, title: "Time-Stamped Feedback", desc: "Leave precise comments directly on video timelines." },
  { icon: Users,         title: "Client Dashboard",      desc: "Clients see project status and download deliverables." },
  { icon: Kanban,        title: "Project Management",    desc: "Visual Kanban boards to organize tasks and team." },
  { icon: FolderOpen,    title: "File Sharing",          desc: "Upload, organize, and share project files in one place." },
  { icon: Share2,        title: "Team Messaging",        desc: "Real-time chat between creatives and clients." },
  { icon: Calendar,      title: "Integrated Calendar",   desc: "Shared production calendar for deadlines and deliveries." },
];
