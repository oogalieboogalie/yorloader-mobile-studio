import type { CSSProperties } from "react";
import { EASE_OPTIONS, type CueDesign, type CueItem, type ItemStatus } from "@/lib/types";
import { ServiceIcon } from "./service-icon";

function Badge({ status }: { status: ItemStatus }) {
  if (status === "complete") {
    return (
      <span className="bn-badge bn-badge-ok" aria-label="Done">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="bn-badge bn-badge-err" aria-label="Error">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M15 9 9 15M9 9l6 6" />
        </svg>
      </span>
    );
  }
  if (status === "pending") {
    return <span className="bn-badge bn-badge-wait" aria-label="Waiting" />;
  }
  return <span className="bn-spinner" aria-label="Loading" />;
}

function shadowFor(design: CueDesign): string {
  if (design.shadow === "none") return "none";
  if (design.shadow === "soft") return "0 8px 24px rgba(0,0,0,0.16)";
  return "0 10px 28px rgba(0,0,0,0.28)";
}

function easeCss(id: CueDesign["ease"]): string {
  return EASE_OPTIONS.find((e) => e.id === id)?.css ?? EASE_OPTIONS[0]!.css;
}

function Dock({ design, items }: { design: CueDesign; items: CueItem[] }) {
  return (
    <div className="bn-surface bn-dock" data-tone={design.tone}>
      {items.map((it) => (
        <div className="bn-cell" data-id={it.id} data-status={it.status} key={it.id}>
          <ServiceIcon service={it.service} />
          {design.showLabels ? <span className="bn-label">{it.name}</span> : null}
          <Badge status={it.status} />
        </div>
      ))}
    </div>
  );
}

function Toast({ design, items }: { design: CueDesign; items: CueItem[] }) {
  const lead = items[0];
  return (
    <div className="bn-surface bn-toast" data-tone={design.tone}>
      {lead ? <ServiceIcon service={lead.service} /> : null}
      <div className="bn-copy">
        <strong>{design.title}</strong>
        {design.detail ? <span>{design.detail}</span> : null}
      </div>
      <Badge status={lead?.status ?? "loading"} />
    </div>
  );
}

function Pill({ design, items }: { design: CueDesign; items: CueItem[] }) {
  const lead = items[0];
  return (
    <div className="bn-surface bn-pill" data-tone={design.tone}>
      <Badge status={lead?.status ?? "loading"} />
      <span>{design.title}</span>
    </div>
  );
}

function Banner({ design, items }: { design: CueDesign; items: CueItem[] }) {
  const done = items.filter((i) => i.status === "complete").length;
  const pct = items.length ? Math.round((done / items.length) * 100) : 8;
  return (
    <div className="bn-surface bn-banner" data-tone={design.tone}>
      <div className="bn-copy">
        <strong>{design.title}</strong>
        {design.detail ? <span>{design.detail}</span> : null}
      </div>
      <div className="bn-track">
        <i style={{ width: `${Math.max(pct, 8)}%` }} />
      </div>
    </div>
  );
}

function Card({ design, items }: { design: CueDesign; items: CueItem[] }) {
  const lead = items[0];
  return (
    <div className="bn-surface bn-card" data-tone={design.tone}>
      {lead ? (
        <div className="bn-card-icon">
          <ServiceIcon service={lead.service} size="lg" />
        </div>
      ) : null}
      <strong>{design.title}</strong>
      {design.detail ? <span>{design.detail}</span> : null}
      {lead ? (
        <div className="bn-card-status">
          <Badge status={lead.status} />
        </div>
      ) : null}
    </div>
  );
}

function Sheet({ design, items }: { design: CueDesign; items: CueItem[] }) {
  return (
    <div className="bn-surface bn-sheet" data-tone={design.tone}>
      <div className="bn-copy">
        <strong>{design.title}</strong>
        {design.detail ? <span>{design.detail}</span> : null}
      </div>
      <div className="bn-rows">
        {items.map((it) => (
          <div className="bn-row" data-id={it.id} data-status={it.status} key={it.id}>
            <ServiceIcon service={it.service} />
            <span className="bn-row-name">{it.name}</span>
            <Badge status={it.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Inner({ design, items }: { design: CueDesign; items: CueItem[] }) {
  switch (design.kind) {
    case "dock":
      return <Dock design={design} items={items} />;
    case "toast":
      return <Toast design={design} items={items} />;
    case "pill":
      return <Pill design={design} items={items} />;
    case "banner":
      return <Banner design={design} items={items} />;
    case "card":
      return <Card design={design} items={items} />;
    case "sheet":
      return <Sheet design={design} items={items} />;
    default:
      return null;
  }
}

export function OverlayView({
  design,
  items,
  phase,
}: {
  design: CueDesign;
  items: CueItem[];
  phase: "hidden" | "in" | "out";
}) {
  const style = {
    "--bn-duration": `${design.durationMs}ms`,
    "--bn-ease": easeCss(design.ease),
    "--bn-radius": `${design.radius}px`,
    "--bn-shadow": shadowFor(design),
  } as CSSProperties;

  return (
    <div className="bn-stage" data-position={design.position}>
      <div
        className="bn-overlay"
        data-enter={design.entrance}
        data-phase={phase}
        style={style}
      >
        <Inner design={design} items={items} />
      </div>
    </div>
  );
}