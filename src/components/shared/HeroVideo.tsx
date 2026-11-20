"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The hero product video, served from Mux.
 *
 * Behaviour (matches Apple-style product pages): plays immediately, muted,
 * and loops silently in the background. Clicking unmute restarts the clip
 * from the start — the point is to give the sound a clean first impression
 * rather than dropping in mid-loop — then it plays on with audio. Muting it
 * again just silences it in place; only the mute → unmute transition resets.
 *
 * HLS playback is hand-rolled rather than using @mux/mux-player-react so the
 * frame can stay fully chromeless (no scrubber, no native control bar) and
 * match the glass dashboard frame around it exactly.
 */

const PLAYBACK_ID = "ctngSEXXa02z00Hbtg900Zv02JTFGM01sLPVgcNAtcsqUOnw";
const HLS_URL = `https://stream.mux.com/${PLAYBACK_ID}.m3u8`;
const POSTER_URL = `https://image.mux.com/${PLAYBACK_ID}/thumbnail.webp?width=1200&fit_mode=smartcrop&time=0`;

export function HeroVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: import("hls.js").default | null = null;
    let cancelled = false;

    const attemptPlay = () => {
      // Autoplay-with-sound-off is allowed everywhere; a rejected promise
      // here just means the browser wants a user gesture first, which the
      // unmute button provides.
      video.play().catch(() => {});
    };

    // hls.js (MSE) is tried first everywhere: some Chromium-based embedders
    // report "maybe" for native HLS via canPlayType without actually being
    // able to fetch a manifest, which fails silently. Native <video src> is
    // the fallback only for engines hls.js itself declines to support — in
    // practice, real Safari and iOS, which play HLS natively just fine.
    import("hls.js").then(({ default: Hls }) => {
      if (cancelled || !videoRef.current) return;
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.loadSource(HLS_URL);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setReady(true);
          attemptPlay();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_URL;
        video.addEventListener("loadedmetadata", () => setReady(true), { once: true });
        attemptPlay();
      }
    });

    // Looping is handled by hand rather than the native `loop` attribute:
    // with an HLS stream fed through MediaSource Extensions, `loop` restarts
    // inconsistently across browsers. Restarting on `ended` is reliable
    // everywhere and costs nothing since the segments are already buffered.
    const onEnded = () => {
      video.currentTime = 0;
      attemptPlay();
    };
    video.addEventListener("ended", onEnded);

    return () => {
      cancelled = true;
      video.removeEventListener("ended", onEnded);
      hls?.destroy();
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      // Unmuting is a deliberate "watch this" moment — give it a clean start
      // rather than whatever frame the silent loop happened to be on.
      video.currentTime = 0;
      video.muted = false;
      setMuted(false);
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <video
        ref={videoRef}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
        poster={POSTER_URL}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-label="Fastik product preview"
      />
      {!ready && (
        <img
          src={POSTER_URL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-9 h-9 rounded-full bg-black/40 border border-white/[0.14] backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/55 hover:border-white/25 transition-all duration-300"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
