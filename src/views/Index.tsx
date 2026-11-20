"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, FolderOpen, Calendar, Kanban, Share2, Clock, Video, Camera, Palette, Building2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { glass, glassHover } from "@/lib/constants";
import Image from "next/image";
import { FadeSection } from "@/components/shared/FadeSection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WaitlistCTA } from "@/components/shared/WaitlistCTA";

const roles = [
  { icon: Video, label: 'Videographers' },
  { icon: Camera, label: 'Editors' },
  { icon: Palette, label: 'Motion Designers' },
  { icon: Users, label: 'Creative Teams' },
  { icon: Building2, label: 'Agencies' },
  { icon: User, label: 'Freelancers' },
];

const features = [
  { icon: MessageSquare, title: 'Time-Stamped Feedback', desc: 'Leave precise comments directly on video timelines. Revisions are clear, fast, and confusion-free.' },
  { icon: Users, title: 'Client Dashboard', desc: 'Clients see project status, download deliverables, and communicate — without constant follow-ups.' },
  { icon: Kanban, title: 'Project Management', desc: 'Visual Kanban boards to organize tasks, assign team members, and keep every project on track.' },
  { icon: FolderOpen, title: 'File Sharing', desc: 'Upload, organize, and share project files in one place. No more lost links or messy drives.' },
  { icon: Share2, title: 'Team Messaging', desc: 'Real-time chat between creatives and clients. All conversations in the right context.' },
  { icon: Calendar, title: 'Integrated Calendar', desc: 'A shared production calendar for deadlines, shoot days, and deliveries. Everyone stays on schedule.' },
];

const painPoints = [
  'Files are everywhere',
  'Feedback lives on WhatsApp and email',
  '"Did you see my last version?"',
  'Clients ask for progress updates every day',
  'Links get lost',
  'Time gets wasted',
  'Teams work disconnected',
];

const imaginePoints = [
  'Your client sees progress without asking',
  'Feedback lives exactly where the work is',
  'Files never get lost again',
  'Your team works in one calm space',
  'Every project starts organized from day one',
];

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetTime = targetDate.getTime();
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetTime - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetTime]);
  return timeLeft;
}

function ImaginePointItem({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      setIsVisible(e.isIntersecting);
    }, { threshold: 0.8, rootMargin: '0px 0px -20% 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-start sm:items-center gap-3 sm:gap-4 group">
      <div className={cn(
        'w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-500',
        isVisible
          ? 'bg-primary/20 border border-primary/30 scale-110'
          : 'bg-white/[0.08] border border-white/[0.12]'
      )}>
        <span className={cn('text-[10px] sm:text-xs font-semibold transition-colors duration-500', isVisible ? 'text-primary' : 'text-primary/80')}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <span className={cn(
        'text-sm sm:text-base lg:text-lg leading-snug font-light text-left transition-all duration-700',
        isVisible ? 'text-white/95' : 'text-white/30'
      )}>{text}</span>
    </div>
  );
}

function TimeStampedFeedbackVisual() {
  const avatars = [
    '/assets/team/Aminu_picture.webp',
    '/assets/team/Kevin.webp',
    '/assets/team/Djariru.webp',
  ];
  const positions = [25, 50, 75];

  return (
    <div className="absolute inset-0 flex flex-col justify-end p-4">
      {/* Play button — centered */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.10] backdrop-blur-sm flex items-center justify-center">
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-white/50 ml-0.5" />
        </div>
      </div>

      <div className="w-full h-1.5 rounded-full bg-white/[0.06] relative">
        <div className="absolute left-0 top-0 h-full w-[75%] rounded-full bg-gradient-to-r from-primary/50 to-primary/25" />
        {positions.map((pos, pi) => (
          <div key={pi} className="absolute" style={{ left: `${pos}%`, top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="absolute w-7 h-7 rounded-full border border-primary/30 animate-ping -left-[5px] -top-[5px]" style={{ animationDuration: `${2 + pi * 0.5}s` }} />
            <div className="w-5 h-5 rounded-full overflow-hidden border-[1.5px] border-primary/60 shadow-lg relative">
              <Image src={avatars[pi]} alt="" fill className="object-cover" sizes="20px" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3.5 flex items-start gap-2">
        <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-primary/40 relative">
          <Image src={avatars[0]} alt="" fill className="object-cover" sizes="20px" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-20 rounded-full bg-white/[0.08]" />
          <div className="h-1.5 w-28 rounded-full bg-white/[0.04]" />
        </div>
      </div>
      <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08]">
        <span className="text-[9px] font-mono text-primary/60">01:24</span>
      </div>
    </div>
  );
}

function ClientDashboardVisual() {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    let raf: number;
    let startTime: number | null = null;
    const duration = 2500;
    const pause = 1500;
    const target = 78;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!isVisible.current) return;
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const totalCycle = duration + pause;
      const inCycle = elapsed % totalCycle;

      if (inCycle < duration) {
        const progress = inCycle / duration;
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
      } else {
        setCount(target);
      }
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (!entry.isIntersecting) startTime = null;
      },
      { threshold: 0 }
    );
    if (containerRef.current) obs.observe(containerRef.current);

    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 p-4 flex flex-col gap-2.5">
      <div className="flex gap-2.5">
        {[
          { color: 'bg-green-400/15', dot: 'bg-green-400/50', n: '12' },
          { color: 'bg-primary/15', dot: 'bg-primary/50', n: '5' },
        ].map((s, si) => (
          <div key={si} className="flex-1 rounded-xl bg-white/[0.03] border border-white/[0.05] p-2.5">
            <div className={cn('w-4 h-4 rounded-md mb-2 flex items-center justify-center relative', s.color)}>
              <div className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
              {si === 0 && (
                <div className="absolute inset-0 rounded-md bg-green-400/30 animate-ping" style={{ animationDuration: '2s' }} />
              )}
            </div>
            <div className="h-1.5 w-10 rounded-full bg-white/[0.08]" />
            <div className="mt-1.5 text-[9px] font-mono text-white/20">{s.n}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-2.5 flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="h-1.5 w-14 rounded-full bg-white/[0.08]" />
          <span className="text-[8px] text-white/40 font-mono tabular-nums">{count}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/[0.04]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary/40 to-primary/20 transition-all duration-100"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}

const allMessages = [
  { side: 'left' as const, lines: ['w-20'] },
  { side: 'right' as const, lines: ['w-16', 'w-12'] },
  { side: 'left' as const, lines: ['w-24'] },
  { side: 'right' as const, lines: ['w-18'] },
  { side: 'left' as const, lines: ['w-14'] },
  { side: 'right' as const, lines: ['w-20', 'w-10'] },
  { side: 'left' as const, lines: ['w-18', 'w-10'] },
  { side: 'right' as const, lines: ['w-14'] },
  { side: 'left' as const, lines: ['w-22'] },
  { side: 'right' as const, lines: ['w-16'] },
];

function TeamMessagingVisual() {

  const [messages, setMessages] = useState<Array<{ side: 'left' | 'right'; lines: string[]; id: number }>>([]);
  const [typingSide, setTypingSide] = useState<'left' | 'right' | null>(null);
  const nextIdx = useRef(0);
  const msgId = useRef(0);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const addMessage = () => {
      if (cancelled) return;
      const msg = allMessages[nextIdx.current % allMessages.length];

      setTypingSide(msg.side);

      timeouts.push(setTimeout(() => {
        if (cancelled) return;
        setTypingSide(null);
        const id = msgId.current++;
        setMessages(prev => [...prev, { ...msg, id }].slice(-6));
        nextIdx.current++;

        timeouts.push(setTimeout(addMessage, 600 + Math.random() * 400));
      }, 800 + Math.random() * 600));
    };

    timeouts.push(setTimeout(addMessage, 500));
    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes msgSlideUp {
          0% { opacity: 0; transform: translateY(16px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.2; transform: scale(0.8); }
          30% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
      <div className="flex flex-col justify-end h-full gap-2 p-4" style={{ transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex items-end gap-2', msg.side === 'right' && 'justify-end')}
            style={{ animation: 'msgSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}
          >
            {msg.side === 'left' && (
              <div className="w-4 h-4 rounded-full shrink-0 overflow-hidden border border-primary/40 relative">
                <Image src="/assets/team/Aminu_picture.webp" alt="" fill className="object-cover" sizes="16px" />
              </div>
            )}
            <div className={cn(
              'rounded-2xl px-3 py-2',
              msg.side === 'left'
                ? 'rounded-bl-sm bg-white/[0.04] border border-white/[0.06]'
                : 'rounded-br-sm bg-primary/10 border border-primary/[0.08]'
            )}>
              {msg.lines.map((w, li) => (
                <div key={li} className={cn('h-1.5 rounded-full bg-white/[0.08]', w, li > 0 && 'mt-1.5')} />
              ))}
            </div>
            {msg.side === 'right' && (
              <div className="w-4 h-4 rounded-full shrink-0 overflow-hidden border border-primary/40 relative">
                <Image src="/assets/team/Kevin.webp" alt="" fill className="object-cover" sizes="16px" />
              </div>
            )}
          </div>
        ))}
        {typingSide && (
          <div className={cn('flex items-end gap-2', typingSide === 'right' && 'justify-end')}
            style={{ animation: 'msgSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }}
          >
            {typingSide === 'left' && (
              <div className="w-4 h-4 rounded-full shrink-0 overflow-hidden border border-primary/40 relative">
                <Image src="/assets/team/Aminu_picture.webp" alt="" fill className="object-cover" sizes="16px" />
              </div>
            )}
            <div className={cn(
              'rounded-2xl px-3.5 py-2.5',
              typingSide === 'left'
                ? 'rounded-bl-sm bg-white/[0.04] border border-white/[0.06]'
                : 'rounded-br-sm bg-primary/10 border border-primary/[0.08]'
            )}>
              <div className="flex gap-1">
                {[0, 1, 2].map(d => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full bg-white/40"
                    style={{ animation: `typingDot 1.2s ease-in-out ${d * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
            {typingSide === 'right' && (
              <div className="w-4 h-4 rounded-full shrink-0 overflow-hidden border border-primary/40 relative">
                <Image src="/assets/team/Kevin.webp" alt="" fill className="object-cover" sizes="16px" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectManagementVisual() {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const columns = [
    { label: 'To Do', count: 3, color: 'bg-white/[0.04]', dotColor: 'bg-orange-400/40' },
    { label: 'In Progress', count: 2, color: 'bg-primary/[0.08]', dotColor: 'bg-primary/50' },
    { label: 'Done', count: 4, color: 'bg-green-400/[0.06]', dotColor: 'bg-green-400/50' },
  ];

  return (
    <div className="absolute inset-0 p-3.5 flex gap-2">
      <style>{`
        @keyframes cardSlide {
          0% { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 1; }
        }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); border-color: rgba(255,255,255,0.04); }
          50% { box-shadow: 0 0 10px 0 rgba(139, 92, 246, 0.06); border-color: rgba(139, 92, 246, 0.12); }
        }
      `}</style>
      {columns.map((col, ci) => (
        <div key={ci} className="flex-1 flex flex-col gap-1.5"
          onMouseEnter={() => setHoveredCol(ci)}
          onMouseLeave={() => setHoveredCol(null)}
        >
          <div className="flex items-center gap-1 mb-0.5 px-0.5">
            <div className={cn('w-1.5 h-1.5 rounded-full', col.dotColor)}
              style={{ animation: 'dotPulse 2s ease-in-out infinite', animationDelay: `${ci * 0.4}s` }} />
            <div className="h-1 w-8 rounded-full bg-white/[0.08]" />
          </div>
          {Array.from({ length: Math.min(col.count, 3) }).map((_, ti) => (
            <div key={ti}
              className={cn(
                'rounded-lg border border-white/[0.04] p-2 space-y-1 transition-all duration-300',
                col.color,
                hoveredCol === ci && 'scale-[1.02]'
              )}
              style={{
                animation: `cardSlide 0.4s ease-out ${ti * 0.1}s both, cardGlow 3s ease-in-out ${ci * 0.8 + ti * 0.5}s infinite`,
              }}
            >
              <div className="h-1 w-full rounded-full bg-white/[0.06]" />
              <div className="h-1 w-3/5 rounded-full bg-white/[0.04]" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const filePool = [
  { ext: 'MP4', progress: 92 },
  { ext: 'PSD', progress: 100 },
  { ext: 'PNG', progress: 67 },
  { ext: 'MOV', progress: 100 },
  { ext: 'AI', progress: 45 },
  { ext: 'WAV', progress: 88 },
  { ext: 'JPG', progress: 100 },
  { ext: 'AEP', progress: 73 },
];

function FileSharingVisual() {

  const [files, setFiles] = useState(() => filePool.slice(0, 3).map((f, i) => ({ ...f, id: i })));
  const nextId = useRef(3);
  const poolIdx = useRef(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);
  const isVisible = useRef(false);
  const cursorPos = useRef({ x: 0, y: 0, visible: false });
  const phaseRef = useRef(0);
  const phaseStartRef = useRef(0);

  const waypoints = useRef([
    { x: 75, y: 18, duration: 600 },
    { x: 60, y: 30, duration: 500 },
    { x: 55, y: 50, duration: 500 },
    { x: 60, y: 65, duration: 500 },
    { x: 70, y: 80, duration: 400 },
    { x: 80, y: 90, duration: 300 },
  ]);

  useEffect(() => {
    let cancelled = false;
    let cycleTimeout: ReturnType<typeof setTimeout>;

    const startCycle = () => {
      if (cancelled) return;
      const c = cursorPos.current;
      c.visible = true;
      c.x = 85;
      c.y = 5;
      phaseRef.current = 0;
      phaseStartRef.current = performance.now();

      const addFileTimeout = setTimeout(() => {
        if (cancelled) return;
        const f = filePool[poolIdx.current % filePool.length];
        poolIdx.current++;
        const id = nextId.current++;
        setFiles(prev => [...prev, { ...f, id }].slice(-3));
      }, 1800);

      const hideTimeout = setTimeout(() => {
        if (cancelled) return;
        cursorPos.current.visible = false;
        cycleTimeout = setTimeout(startCycle, 1000);
      }, 3600);

      return () => { clearTimeout(addFileTimeout); clearTimeout(hideTimeout); };
    };

    const animate = (now: number) => {
      if (cancelled) return;
      animRef.current = requestAnimationFrame(animate);

      if (!isVisible.current) return;

      const c = cursorPos.current;
      const wps = waypoints.current;
      const phase = phaseRef.current;

      if (c.visible && phase < wps.length) {
        const elapsed = now - phaseStartRef.current;
        const wp = wps[phase];
        const t = Math.min(elapsed / wp.duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);

        c.x += (wp.x - c.x) * ease * 0.15;
        c.y += (wp.y - c.y) * ease * 0.15;

        if (t >= 1) {
          phaseRef.current++;
          phaseStartRef.current = now;
        }
      }

      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const cursorAbsY = (c.y / 100) * containerHeight;

        cardRefs.current.forEach((card) => {
          if (!card) return;
          const cardOffsetTop = card.offsetTop;
          const cardCenterY = cardOffsetTop + card.offsetHeight / 2;
          const dist = Math.abs(cursorAbsY - cardCenterY);
          const proximity = Math.max(0, 1 - dist / (card.offsetHeight * 1.8));
          const intensity = c.visible ? proximity : 0;

          card.style.backgroundColor = `rgba(255,255,255,${0.03 + intensity * 0.06})`;
          card.style.borderColor = `rgba(255,255,255,${0.05 + intensity * 0.12})`;
          card.style.transform = `scale(${1 + intensity * 0.04})`;
          card.style.filter = `brightness(${1 + intensity * 0.25})`;
          card.style.boxShadow = intensity > 0.3
            ? `0 0 ${12 * intensity}px rgba(139,92,246,${0.08 * intensity})`
            : 'none';
        });
      }
    };

    const obs = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (containerRef.current) obs.observe(containerRef.current);

    const cleanupCycle = startCycle();
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animRef.current);
      clearTimeout(cycleTimeout);
      cleanupCycle?.();
      obs.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 p-4 flex flex-col gap-2.5 overflow-hidden">
      <style>{`
        @keyframes fileEnter {
          0% { opacity: 0; transform: translateY(12px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes progressFill { 0% { width: 0%; } }
      `}</style>
      <div className="flex flex-col gap-2.5 justify-end flex-1">
        {files.map((f, idx) => (
          <div key={f.id}
            ref={el => { cardRefs.current[idx] = el; }}
            className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] px-3 py-2 cursor-default"
            style={{
              animation: 'fileEnter 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
              transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <div className="w-6 h-7 rounded-md bg-primary/10 border border-primary/[0.08] flex items-center justify-center shrink-0 relative">
              <span className="text-[6px] text-primary/50">{f.ext}</span>
              {f.progress === 100 && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400/60 border border-[#09090b]">
                  <div className="absolute inset-0 rounded-full bg-green-400/40 animate-ping" style={{ animationDuration: '2s' }} />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1.5">
              <div className={cn('h-1.5 rounded-full bg-white/[0.08]', f.ext.length > 2 ? 'w-20' : 'w-16')} />
              <div className="w-full h-1 rounded-full bg-white/[0.04]">
                <div className="h-full rounded-full bg-gradient-to-r from-primary/30 to-primary/15"
                  style={{ width: `${f.progress}%`, animation: 'progressFill 1s ease-out both' }} />
              </div>
            </div>
            <span className="text-[7px] font-mono text-white/20">{f.progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarVisual() {
  const [activeDay, setActiveDay] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDay(d => {
        const highlights = [3, 8, 10, 12, 16];
        const idx = highlights.indexOf(d);
        return highlights[(idx + 1) % highlights.length];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 p-4 flex flex-col">
      <style>{`
        @keyframes calPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 0 4px rgba(139, 92, 246, 0); }
        }
      `}</style>
      <div className="flex items-center justify-between mb-2.5">
        <div className="h-1.5 w-12 rounded-full bg-white/[0.08]" />
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-md bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-md bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition-colors cursor-pointer" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 flex-1">
        {Array.from({ length: 21 }).map((_, di) => {
          const highlights = [3, 8, 12, 16];
          const isHighlight = highlights.includes(di);
          const isActive = di === activeDay;
          return (
            <div
              key={di}
              className={cn(
                'rounded-md aspect-square flex items-center justify-center text-[6px] font-mono transition-all duration-500',
                isActive
                  ? 'bg-primary/25 border border-primary/25 text-primary/70'
                  : isHighlight
                  ? 'bg-primary/[0.08] text-white/20'
                  : 'bg-white/[0.02] text-white/[0.12]'
              )}
              style={isActive ? { animation: 'calPulse 2s ease-in-out infinite' } : undefined}
            >
              {di + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LazyVisible({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMounted(true); obs.disconnect(); } },
      { threshold: 0 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {mounted && (
        index === 0 ? <TimeStampedFeedbackVisual /> :
        index === 1 ? <ClientDashboardVisual /> :
        index === 2 ? <ProjectManagementVisual /> :
        index === 3 ? <FileSharingVisual /> :
        index === 4 ? <TeamMessagingVisual /> :
        <CalendarVisual />
      )}
    </div>
  );
}

export default function Index() {
  const launchDate = new Date('2026-09-01T00:00:00');
  const countdown = useCountdown(launchDate);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden font-sans selection:bg-primary/30">

      {/* ── NAV ── */}
      <Navbar activePage="home" ctaTarget="story" />

      <main>
      {/* ── HERO ── */}
      <section className="relative pt-36 pb-0 flex flex-col items-center text-center px-6 overflow-hidden">
        {/* Light/glow background image behind hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[900px] pointer-events-none">
          <Image
            src="/images/hero-light-bg.webp"
            alt="Hero light background"
            className="w-full h-full object-cover opacity-40 block sm:hidden"
            width={1400}
            height={900}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 100vw, 0px"
          />
          <Image
            src="/images/light-cut-desktop.webp"
            alt="Light cut desktop background"
            className="w-full h-full object-cover opacity-40 hidden sm:block"
            width={1400}
            height={900}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 0px, min(100vw, 1400px)"
          />
        </div>

        <h1
          className="relative text-[2.2rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] leading-[1.1] sm:leading-[0.95] max-w-5xl tracking-[-0.04em] sm:tracking-[-0.06em] sm:whitespace-nowrap"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Mobile: 3 balanced lines */}
          <span className="sm:hidden">
            <span className="text-premium">Creative work moves</span>
            <br />
            <span className="text-premium">fast. Your </span>
            <span className="italic font-serif text-sweep">workflow</span>
            <br />
            <span className="text-premium">should keep up.</span>
          </span>
          {/* Desktop: 2 lines */}
          <span className="hidden sm:inline">
            <span className="text-premium">Creative work moves fast.</span>
            <br />
            <span className="text-premium">Your </span>
            <span className="italic font-serif text-sweep">workflow</span>
            <span className="text-premium"> should keep up.</span>
          </span>
        </h1>
        <p
          className="relative mt-2 text-base sm:text-lg text-white/60 max-w-2xl leading-snug"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s',
          }}
        >
          Fastik is the workspace built for the speed and rhythm of creative work.
        </p>
        <div
          className="relative flex flex-col items-center gap-4 mt-5"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s',
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" onClick={() => scrollTo('story')} className="bg-gradient-to-r from-[#3a118f] to-[#665ed7] hover:from-[#4a1aaf] hover:to-[#7b74e0] text-white rounded-full px-8 gap-2 text-base transition-all duration-300">
              Join Early Access
            </Button>
            <button onClick={() => scrollTo('features')} className="text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4">
              See how it works
            </button>
          </div>
          <p className="text-xs text-white/40 italic font-serif tracking-wide">Built by creatives, for creatives</p>
        </div>

        {/* Dashboard preview */}
        <div
          className="relative mt-16 w-full max-w-5xl"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.97)',
            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.5s',
          }}
        >
          <div className="absolute -inset-10 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent rounded-[2.5rem] blur-[60px] pointer-events-none" />
          <div className="relative rounded-[2rem] border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
            <div className="relative overflow-hidden rounded-2xl max-h-[280px] sm:max-h-[340px] md:max-h-[400px] lg:max-h-[440px]">
              <Image
                src="/images/hero-dashboard.webp"
                alt="Fastik dashboard"
                className="relative w-full rounded-2xl"
                width={1200}
                height={400}
                sizes="(max-width: 640px) 100vw, 1200px"
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute -bottom-8 left-0 right-0 h-40 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <FadeSection className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #09090b 100%)',
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl md:text-[3.5rem] leading-[0.95] tracking-[-0.06em]">
            <span className="text-premium">Creative work today is</span>{' '}
            <span className="italic font-serif text-sweep">chaos</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-relaxed">
            Creatives rely on tools never built for their workflow — using only a fraction of their features.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {painPoints.map(p => (
              <span key={p} className={cn('px-5 py-2.5 rounded-full text-sm text-white/60 transition-all duration-300', glass, glassHover)}>
                {p}
              </span>
            ))}
          </div>
          <p className="mt-8 text-lg text-white/30 font-light">
            We accepted this as normal.{' '}
            <span className="text-white/80 italic font-serif">It shouldn't be.</span>
          </p>
        </div>
      </FadeSection>

      {/* ── IMAGINE IF ── */}
      <FadeSection className="relative py-16 sm:py-24 px-6 overflow-hidden">
        <h2 className="text-center text-3xl sm:text-5xl md:text-[3.5rem] leading-[0.95] tracking-[-0.06em] mb-8 sm:mb-12">
          <span className="text-premium">Imagine</span>{' '}<span className="italic font-serif text-sweep inline-block">if</span>
        </h2>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="absolute -inset-3 rounded-3xl border border-primary/10 animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />
          <div className="absolute -inset-6 rounded-[1.75rem] border border-primary/5 animate-[pulse_3s_ease-in-out_1.5s_infinite] pointer-events-none" />

          <div className={cn('relative rounded-2xl overflow-hidden', glass)}>
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none rounded-t-2xl z-20" />

            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-2.5">
              <Image
                src="/assets/fastik-logo-white.png"
                alt="Fastik"
                className="opacity-50"
                width={56}
                height={14}
                priority={false}
              />
              <div className="ml-auto flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
                <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
                <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Left – Bullet points with scroll highlight */}
              <div className="flex-1 flex items-center p-8 sm:p-10 lg:p-14">
                <div className="space-y-3 sm:space-y-4">
                  {imaginePoints.map((p, i) => (
                    <ImaginePointItem key={p} text={p} index={i} />
                  ))}
                </div>
              </div>

              {/* Right – Preview image */}
              <div className="lg:w-[55%] shrink-0 p-3 sm:p-4">
                <Image
                  src="/images/imagine-if-hero.webp"
                  alt="Fastik creative workflow preview"
                  className="w-full rounded-lg"
                  width={900}
                  height={400}
                  sizes="(max-width: 1024px) 100vw, 630px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── ROLES ── */}
      <FadeSection className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #09090b 100%)',
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl md:text-[3.5rem] leading-[0.95] tracking-[-0.06em]">
            <span className="text-premium">Built for every</span>{' '}
            <span className="italic font-serif text-sweep">creative professional</span>
          </h2>
          <p className="mt-3 text-white/40 text-base font-light">Whether you work solo or run a full agency, Fastik fits your workflow.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {roles.map(r => (
              <div key={r.label} className={cn('flex items-center gap-2.5 px-5 py-3 rounded-full cursor-default transition-all duration-300', glass, glassHover)}>
                <r.icon className="w-4 h-4 text-primary/70" />
                <span className="text-sm text-white/70">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── FEATURES ── */}
      <FadeSection className="relative py-20 px-6" id="features">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl sm:text-5xl md:text-[3.5rem] leading-[0.95] tracking-[-0.06em] mb-4">
            <span className="text-premium">Everything you need.</span>{' '}
            <span className="italic font-serif text-sweep">In one place.</span>
          </h2>
          <p className="text-center text-white/40 font-light max-w-xl mx-auto mb-14">Stop juggling five apps. Fastik brings your entire creative workflow under one roof.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={f.title} className={cn('group relative p-6 rounded-2xl overflow-hidden cursor-default transition-all duration-500', glass, glassHover)}>
                {/* Top reflection */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none rounded-t-2xl" />
                {/* Visual */}
                <div className="relative h-40 mb-6 rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05]">
                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/[0.06] blur-3xl pointer-events-none group-hover:bg-primary/[0.12] transition-all duration-700" />
                  <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/10 transition-all duration-700 pointer-events-none" />
                  <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.08)' }} />
                  <LazyVisible index={i} />
                </div>
                <div className="relative flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/[0.08] border border-primary/[0.08] flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300">
                    <f.icon className="w-4 h-4 text-primary/80" />
                  </div>
                  <h3 className="text-base text-white/90">{f.title}</h3>
                </div>
                <p className="relative text-sm text-white/40 leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── COUNTDOWN ── */}
      <FadeSection className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #09090b 100%)',
          }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className={cn('inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-primary/80 mb-6', glass)}>
            <Clock className="w-3.5 h-3.5" /> Currently Building
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-[3.5rem] leading-[0.95]">
            <span className="text-premium">Launching</span>{' '}<span className="italic font-serif text-sweep">Soon</span>
          </h2>
          <p className="mt-3 text-white/40 font-light">We're crafting something special for creatives. Get ready.</p>
          <div className="mt-8 flex justify-center gap-4 sm:gap-5">
            {[
              { val: countdown.days, label: 'Days' },
              { val: countdown.hours, label: 'Hours' },
              { val: countdown.minutes, label: 'Minutes' },
              { val: countdown.seconds, label: 'Seconds' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center">
                <div className={cn('w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex items-center justify-center', glass)}>
                  <span className="text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-white/90">{String(t.val).padStart(2, '0')}</span>
                </div>
                <span className="text-[11px] text-white/30 mt-2.5 font-light">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── CTA ── */}
      <WaitlistCTA id="story" />
      </main>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
