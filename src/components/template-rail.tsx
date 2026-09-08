import { TEMPLATES } from "@/lib/templates";
import { useStudio } from "@/lib/store";
import { KIND_META } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

function Mini({ kind }: { kind: string }) {
  if (kind === "dock") {
    return (
      <div className="flex h-12 items-end justify-center px-3 pb-1">
        <div className="flex h-7 w-full items-center justify-around rounded-lg bg-card">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn("size-2 rounded-full", i === 0 ? "bg-success" : "bg-muted/40")}
            />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "toast" || kind === "banner") {
    return (
      <div className="flex h-12 items-start justify-center px-3 pt-2">
        <div className="h-5 w-full rounded-md bg-card" />
      </div>
    );
  }
  if (kind === "pill") {
    return (
      <div className="flex h-12 items-start justify-center pt-2">
        <div className="h-4 w-16 rounded-full bg-card" />
      </div>
    );
  }
  if (kind === "card") {
    return (
      <div className="flex h-12 items-center justify-center">
        <div className="h-8 w-12 rounded-md bg-card" />
      </div>
    );
  }
  return (
    <div className="flex h-12 items-end justify-center px-3 pb-1">
      <div className="h-7 w-full rounded-t-lg bg-card" />
    </div>
  );
}

export function TemplateRail() {
  const templateId = useStudio((s) => s.templateId);
  const applyTemplate = useStudio((s) => s.applyTemplate);
  const saved = useStudio((s) => s.saved);
  const loadSaved = useStudio((s) => s.loadSaved);
  const deleteSaved = useStudio((s) => s.deleteSaved);
  const designId = useStudio((s) => s.design.id);

  return (
    <div className="studio-scroll flex h-full flex-col gap-5 overflow-y-auto px-3 py-5">
      <div>
        <p className="px-1 text-xs font-semibold tracking-wide text-subtle uppercase">Templates</p>
        <p className="mt-1 px-1 text-xs leading-relaxed text-muted">
          Start with one of these, then tune how it appears.
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {TEMPLATES.map((tpl) => {
            const on = templateId === tpl.id;
            return (
              <li key={tpl.id}>
                <button
                  type="button"
                  onClick={() => applyTemplate(tpl.id)}
                  className={cn(
                    "flex w-full overflow-hidden rounded-xl text-left shadow-border transition-[background-color,box-shadow] duration-150",
                    on ? "bg-elevated ring-1 ring-accent/50" : "bg-surface hover:bg-elevated",
                  )}
                >
                  <div className="w-mini shrink-0 bg-phone">
                    <Mini kind={tpl.kind} />
                  </div>
                  <span className="flex min-w-0 flex-col justify-center px-3 py-2">
                    <span className="truncate text-sm font-medium">{tpl.name}</span>
                    <span className="truncate text-xs text-muted">{KIND_META[tpl.kind].label}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <p className="px-1 text-xs font-semibold tracking-wide text-subtle uppercase">Your copies</p>
        {saved.length === 0 ? (
          <p className="mt-2 px-1 text-xs leading-relaxed text-muted">
            Hit “Save a copy” in the inspector to keep a version on this device.
          </p>
        ) : (
          <ul className="mt-3 flex flex-col gap-1">
            {saved.map((s) => (
              <li key={s.id} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => loadSaved(s.id)}
                  className={cn(
                    "min-w-0 flex-1 truncate rounded-lg px-2.5 py-2 text-left text-sm",
                    designId === s.design.id
                      ? "bg-elevated text-foreground"
                      : "text-muted hover:bg-elevated hover:text-foreground",
                  )}
                >
                  {s.design.name}
                </button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Delete ${s.design.name}`}
                  onClick={() => deleteSaved(s.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
