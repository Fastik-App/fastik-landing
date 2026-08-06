"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [status, setStatus] = useState<"pending" | "visible" | "hidden">("pending");
  const [fadeOut, setFadeOut] = useState(false);
  const [animData, setAnimData] = useState<object | null>(null);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("splashPlayed");
    if (hasPlayed) {
      setStatus("hidden");
      onComplete?.();
      return;
    }

    sessionStorage.setItem("splashPlayed", "1");

    // Load Lottie JSON only on first visit
    import("../../../public/assets/Welcome.json").then((mod) => {
      setAnimData(mod.default);
      setStatus("visible");
    });

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      onComplete?.(); // trigger page fade-in in sync with splash fade-out
    }, 4000);
    const hideTimer = setTimeout(() => setStatus("hidden"), 4700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (status === "hidden") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.7s ease-out",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {animData && (
        <Lottie
          animationData={animData}
          loop={false}
          style={{ width: 300, height: 300 }}
        />
      )}
    </div>
  );
}
