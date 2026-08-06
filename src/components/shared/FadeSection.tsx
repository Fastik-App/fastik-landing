"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface FadeSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function FadeSection({ children, className, id, delay = 0 }: FadeSectionProps) {
  const ref = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      id={id}
      className={cn("will-change-transform", className)}
      style={{
        opacity: 0,
        transform: "translateY(30px) scale(0.98)",
        filter: "blur(4px)",
        transition:
          "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease-out",
      }}
    >
      {children}
    </div>
  );
}
