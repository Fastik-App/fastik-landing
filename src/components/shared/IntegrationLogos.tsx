import { cn } from "@/lib/utils";

/**
 * The integrations Fastik connects for real — shown in their authentic brand
 * colours so a first-time visitor instantly reads "this plugs into the tools I
 * already use." Logos are nominative use (identifying the services we connect).
 */

function Gmail() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
      <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7a3 3 0 003-3V16.2z" />
      <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6a3 3 0 01-3-3V16.2z" />
      <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
      <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859A3.006 3.006 0 007.298 8 4.298 4.298 0 003 12.298z" />
      <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A3.006 3.006 0 0140.702 8 4.298 4.298 0 0145 12.298z" />
    </svg>
  );
}

function GoogleCalendar() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
      <rect x="9" y="9" width="30" height="30" rx="3" fill="#fff" />
      <path d="M9 12a3 3 0 013-3h24a3 3 0 013 3v4H9z" fill="#4285f4" />
      <path d="M9 32h30v4a3 3 0 01-3 3H12a3 3 0 01-3-3z" fill="#34a853" />
      <rect x="35" y="16" width="4" height="16" fill="#fbbc04" />
      <rect x="9" y="16" width="4" height="16" fill="#ea4335" />
      <text x="24" y="30" fontSize="13" fontWeight="700" fill="#4285f4" textAnchor="middle" fontFamily="Arial, sans-serif">
        31
      </text>
    </svg>
  );
}

function WhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path
        fill="#25D366"
        d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.157 5.335 5.492 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z"
      />
      <path
        fill="#fff"
        d="M12.05 21.785h-.005a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.889-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885zm5.421-7.403c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.148-.669.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.093 1.093 0 00-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      />
    </svg>
  );
}

function Outlook() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
      <path fill="#1976d2" d="M28 13h14a2 2 0 012 2v18a2 2 0 01-2 2H28z" />
      <path fill="#fff" d="M42 15l-9 6-5-3.2V15z" opacity=".85" />
      <path fill="#0d47a1" d="M4 10l22-4v36L4 38z" />
      <ellipse cx="15" cy="24" rx="7.5" ry="8.5" fill="#fff" />
      <ellipse cx="15" cy="24" rx="3.4" ry="4.2" fill="#0d47a1" />
    </svg>
  );
}

function ICloud() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
      <path
        fill="#4fc3f7"
        d="M36 34H15a9 9 0 01-1.2-17.92 11 11 0 0121.1-1.9A8 8 0 0136 34z"
      />
      <path
        fill="#039be5"
        d="M36 34H24V13.1a11 11 0 0110.9 1.08A8 8 0 0136 34z"
        opacity=".55"
      />
    </svg>
  );
}

function AppleCalendar() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden>
      <rect x="8" y="9" width="32" height="30" rx="5" fill="#fff" />
      <path d="M8 14a5 5 0 015-5h22a5 5 0 015 5v3H8z" fill="#fff" />
      <text x="24" y="18" fontSize="7" fontWeight="700" fill="#fa3e3e" textAnchor="middle" fontFamily="Arial, sans-serif">
        JUL
      </text>
      <text x="24" y="35" fontSize="17" fontWeight="700" fill="#333" textAnchor="middle" fontFamily="Arial, sans-serif">
        31
      </text>
    </svg>
  );
}

export const INTEGRATIONS: { name: string; glow: string; Logo: () => JSX.Element }[] = [
  { name: "Gmail", glow: "234,67,53", Logo: Gmail },
  { name: "Google Calendar", glow: "66,133,244", Logo: GoogleCalendar },
  { name: "WhatsApp", glow: "37,211,102", Logo: WhatsApp },
  { name: "Outlook", glow: "25,118,210", Logo: Outlook },
  { name: "iCloud Mail", glow: "79,195,247", Logo: ICloud },
  { name: "Apple Calendar", glow: "250,62,62", Logo: AppleCalendar },
];

export function IntegrationLogos({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <p className="text-xs uppercase tracking-[0.16em] text-white/40">
        Connects the tools your studio already runs on
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {INTEGRATIONS.map(({ name, glow, Logo }) => (
          <div
            key={name}
            title={name}
            className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] sm:h-14 sm:w-14"
            style={{ ["--glow" as string]: glow }}
          >
            {/* Faint always-on brand aura for colour at rest; intensifies on hover. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-1 rounded-2xl blur-md transition-opacity duration-300"
              style={{ background: "radial-gradient(circle at 50% 60%, rgba(var(--glow), 0.22), transparent 70%)" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ boxShadow: "0 12px 34px -6px rgba(var(--glow), 0.6)" }}
            />
            <span className="relative z-10 flex items-center justify-center">
              <Logo />
            </span>
          </div>
        ))}
        <div className="flex h-12 items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3.5 text-xs font-medium text-white/50 sm:h-14">
          + more
        </div>
      </div>
    </div>
  );
}
