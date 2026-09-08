import { SERVICE_MAP } from "@/lib/services";
import type { CueDesign, Scene } from "@/lib/types";
import { cn } from "@/lib/utils";
import { OverlayView } from "./overlay-view";
import { usePlayback } from "./use-playback";

function StatusBar({ invert }: { invert?: boolean }) {
  return (
    <div
      className={cn(
        "relative z-20 flex h-11 items-end justify-between px-7 pb-1 text-micro font-semibold tabular-nums",
        invert ? "text-card-foreground" : "text-foreground",
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
          <rect x="0" y="7" width="3" height="5" rx="0.6" />
          <rect x="4.3" y="5" width="3" height="7" rx="0.6" />
          <rect x="8.6" y="2.5" width="3" height="9.5" rx="0.6" />
          <rect x="12.9" y="0" width="3" height="12" rx="0.6" opacity="0.35" />
        </svg>
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
          <rect x="0.6" y="0.6" width="18" height="10.8" rx="2.4" stroke="currentColor" strokeWidth="1.2" />
          <rect x="2.2" y="2.2" width="13.4" height="7.6" rx="1.2" fill="currentColor" />
          <path d="M20 4.2v3.6c1.1-.6 1.1-3 0-3.6Z" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

function Island() {
  return (
    <div className="pointer-events-none absolute top-2.5 left-1/2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-island" />
  );
}

function HomeBar({ invert }: { invert?: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-2 z-20 flex justify-center">
      <div className={cn("h-1 w-28 rounded-full", invert ? "bg-card-foreground/80" : "bg-foreground/80")} />
    </div>
  );
}

function ApertureMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="3.2" />
      <circle cx="40" cy="40" r="10" fill="currentColor" />
      <path
        d="M40 4 52 32H28L40 4Zm0 72 12-28H28L40 76ZM4 40l28-12v24L4 40Zm72 0-28-12v24l28-12Z"
        fill="currentColor"
        opacity="0.92"
      />
    </svg>
  );
}

function SignInScene() {
  return (
    <div className="flex h-full flex-col bg-card px-7 pt-16 text-card-foreground">
      <div className="flex flex-col items-center pt-6">
        <ApertureMark className="size-16 text-card-foreground" />
        <p className="font-headline mt-5 text-2xl font-semibold tracking-tight">Welcome back</p>
        <p className="mt-1 text-xs text-subtle">Sign in to continue</p>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <div>
          <p className="mb-1.5 text-xs font-medium">Email address</p>
          <div className="flex h-11 items-center gap-2.5 rounded-xl bg-background/5 px-3 text-sm text-subtle shadow-inset">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            name@company.com
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium">Password</p>
          <div className="flex h-11 items-center gap-2.5 rounded-xl bg-background/5 px-3 text-sm text-subtle shadow-inset">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="tracking-widest">••••••••</span>
          </div>
        </div>
        <div className="mt-1 flex h-11 items-center justify-center rounded-xl bg-bezel text-sm font-medium text-foreground">
          Sign in
        </div>
      </div>
    </div>
  );
}

function HomeScene() {
  const rows = [
    { service: "inbox" as const, title: "3 new messages", meta: "Inbox · 2m" },
    { service: "calendar" as const, title: "Standup at 10:00", meta: "Calendar · today" },
    { service: "files" as const, title: "Q3 deck uploaded", meta: "Files · yesterday" },
  ];
  return (
    <div className="flex h-full flex-col bg-card text-card-foreground">
      <div className="px-6 pt-14">
        <p className="text-xs font-medium tracking-wide text-subtle uppercase">Today</p>
        <h2 className="font-headline mt-1 text-2xl font-semibold tracking-tight">Your workspace</h2>
      </div>
      <div className="mt-6 flex flex-col gap-2 px-4">
        {rows.map((row) => {
          const svc = SERVICE_MAP[row.service];
          return (
            <div
              key={row.service}
              className="flex items-center gap-3 rounded-2xl bg-background/5 px-3 py-3"
            >
              <span className="bn-icon" style={{ background: svc.hue }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d={svc.path} />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{row.title}</p>
                <p className="text-xs text-subtle">{row.meta}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DarkScene() {
  return <div className="h-full bg-phone" />;
}

function SceneLayer({ scene }: { scene: Scene }) {
  if (scene === "signin") return <SignInScene />;
  if (scene === "home") return <HomeScene />;
  return <DarkScene />;
}

export function PhoneFrame({ design }: { design: CueDesign }) {
  const { phase, items } = usePlayback(design);
  const invert = design.scene !== "dark";

  return (
    <div className="relative mx-auto w-full max-w-phone-compact lg:max-w-phone">
      <div className="relative aspect-phone overflow-hidden rounded-phone bg-bezel p-2.5 shadow-phone">
        <div className="relative h-full overflow-hidden rounded-screen bg-phone">
          <Island />
          <StatusBar invert={invert} />
          <div className="absolute inset-0 pt-0">
            <SceneLayer scene={design.scene} />
          </div>
          <OverlayView design={design} items={items} phase={phase} />
          <HomeBar invert={invert} />
        </div>
      </div>
    </div>
  );
}
