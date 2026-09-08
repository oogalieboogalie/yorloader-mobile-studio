import { Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useStudio } from "@/lib/store";
import { ENTRANCE_OPTIONS } from "@/lib/types";
import { Button } from "./ui/button";
import { Handoff } from "./handoff";
import { Inspector } from "./inspector";
import { PhoneFrame } from "./phone-frame";
import { TemplateRail } from "./template-rail";

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="font-headline text-sm leading-none font-semibold tracking-tight">Beacon</p>
        <p className="mt-0.5 text-micro text-muted">Overlay studio</p>
      </div>
    </div>
  );
}

export function Studio() {
  const design = useStudio((s) => s.design);
  const replay = useStudio((s) => s.replay);
  const [panel, setPanel] = useState<"templates" | "edit" | "code">("edit");

  useEffect(() => {
    void useStudio.persist.rehydrate();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.code === "Space") {
        e.preventDefault();
        replay();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [replay]);

  const motionLabel = ENTRANCE_OPTIONS.find((o) => o.id === design.entrance)?.label ?? "Fade in";

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line px-4">
        <Wordmark />
        <div className="hidden items-center gap-2 sm:flex">
          <p className="max-w-lede truncate text-xs text-muted">
            {design.name} · {motionLabel}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={replay} className="hidden sm:inline-flex">
            <RotateCcw className="size-3.5" />
            Replay
          </Button>
          <Button size="sm" onClick={replay}>
            <Play className="size-3.5" />
            Play
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="hidden w-rail min-h-0 shrink-0 border-r border-line lg:block">
          <TemplateRail />
        </aside>

        <main className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-4 py-3">
            <PhoneFrame design={design} />
            <p className="mt-3 hidden text-xs text-subtle lg:block">Press space to replay the motion</p>
          </div>
        </main>

        <aside className="hidden w-inspector min-h-0 shrink-0 flex-col border-l border-line lg:flex">
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Inspector />
          </div>
          <Handoff />
        </aside>
      </div>

      <nav className="grid grid-cols-3 border-t border-line lg:hidden">
        {(
          [
            ["templates", "Templates"],
            ["edit", "Edit"],
            ["code", "Code"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setPanel(id)}
            className={
              panel === id
                ? "h-12 border-t-2 border-accent text-sm font-medium text-foreground"
                : "h-12 border-t-2 border-transparent text-sm font-medium text-muted"
            }
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="shrink-0 border-t border-line lg:hidden">
        {panel === "templates" ? (
          <div className="h-mobile-panel overflow-y-auto">
            <TemplateRail />
          </div>
        ) : null}
        {panel === "edit" ? (
          <div className="h-mobile-panel overflow-y-auto">
            <Inspector />
          </div>
        ) : null}
        {panel === "code" ? (
          <div className="h-mobile-panel overflow-y-auto">
            <Handoff />
          </div>
        ) : null}
      </div>
    </div>
  );
}
