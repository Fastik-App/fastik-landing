import { MessageSquare, Users, Kanban, FolderOpen, Share2, Calendar } from "lucide-react";

export const glass = "bg-white/[0.03] backdrop-blur-xl border border-white/[0.07]";
export const glassHover = "hover:bg-white/[0.06] hover:border-white/[0.12]";

/**
 * Download + app destinations. `mac` is live — it 307s to the latest
 * fastik-desktop release asset (src/app/download/mac/route.ts). `ios` is
 * still a placeholder; swap it for the real App Store listing once it exists.
 */
export const DOWNLOADS = {
  mac: "/download/mac",
  ios: "https://apps.apple.com/app/fastik",
  web: "https://app.fastik.io",
};

export const navFeatures = [
  { icon: MessageSquare, title: "Time-Stamped Feedback", desc: "Leave precise comments directly on video timelines." },
  { icon: Users,         title: "Client Dashboard",      desc: "Clients see project status and download deliverables." },
  { icon: Kanban,        title: "Project Management",    desc: "Visual Kanban boards to organize tasks and team." },
  { icon: FolderOpen,    title: "File Sharing",          desc: "Upload, organize, and share project files in one place." },
  { icon: Share2,        title: "Team Messaging",        desc: "Real-time chat between creatives and clients." },
  { icon: Calendar,      title: "Integrated Calendar",   desc: "Shared production calendar for deadlines and deliveries." },
];
