"use client";

import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SplashScreen } from "@/components/shared/SplashScreen";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    // If splash was already played, show content immediately
    if (sessionStorage.getItem("splashPlayed")) setPageReady(true);
  }, []);

  return (
    <TooltipProvider>
      <SplashScreen onComplete={() => setPageReady(true)} />
      <Toaster />
      <Sonner
        theme="dark"
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#13121a] px-4 py-3 text-sm text-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md",
            title: "font-medium text-white/95 text-[13px]",
            description: "text-white/45 text-xs mt-0.5",
            success: "border-[#7b74e0]/30",
            error: "border-red-500/30",
            icon: "text-[#7b74e0]",
            actionButton:
              "bg-[#7b74e0] text-white text-xs rounded-full px-3 py-1 hover:bg-[#8f89e8] transition-colors",
            cancelButton:
              "text-white/40 text-xs hover:text-white/60 transition-colors",
          },
        }}
      />
      <div style={{ opacity: pageReady ? 1 : 0, transition: "opacity 0.7s ease-out" }}>
        {children}
      </div>
    </TooltipProvider>
  );
}
