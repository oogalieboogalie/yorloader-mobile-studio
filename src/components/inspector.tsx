import type { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { useStudio } from "@/lib/store";
import {
  EASE_OPTIONS,
  ENTRANCE_OPTIONS,
  KIND_META,
  POSITION_OPTIONS,
  type CardTone,
  type CueDesign,
  type CueItem,
  type Entrance,
  type ItemStatus,
  type Position,
  type Scene,
  type ServiceId,
  type ShadowDepth,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { ServiceIcon } from "./service-icon";
import { Button } from "./ui/button";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-b border-line pb-5 last:border-b-0">
      <h2 className="text-xs font-semibold tracking-wide text-subtle uppercase">{title}</h2>
      {children}
    </section>
  );
}

function Toggle({
  on,
  onChange,
  label,
  hint,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="flex w-full items-center gap-3 rounded-xl px-1 py-1 text-left"
    >
      <span
        className={cn(
          "relative h-6 w-10 shrink-0 rounded-full transition-[background-color] duration-150",
          on ? "bg-accent" : "bg-line",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-5 rounded-full transition-transform duration-150 ease-out",
            on ? "translate-x-4 bg-accent-foreground" : "bg-muted",
          )}
        />
      </span>
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        {hint ? <span className="block text-xs text-muted">{hint}</span> : null}
      </span>
    </button>
  );
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (n: number) => void;
}) {
  return (
    <div className="field">
      <div className="flex items-baseline justify-between">
        <label>{label}</label>
        <span className="text-xs tabular-nums text-muted">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

const STATUSES: { id: ItemStatus; label: string }[] = [
  { id: "loading", label: "Loading" },
  { id: "complete", label: "Done" },
  { id: "error", label: "Error" },
  { id: "pending", label: "Waiting" },
];

function ItemEditor({
  item,
  onChange,
  onRemove,
  canRemove,
}: {
  item: CueItem;
  onChange: (item: CueItem) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-elevated p-2.5 shadow-border">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 flex-wrap gap-1">
          {SERVICES.map((svc) => (
            <button
              key={svc.id}
              type="button"
              title={svc.name}
              onClick={() =>
                onChange({
                  ...item,
                  service: svc.id,
                  name:
                    item.name === SERVICES.find((s) => s.id === item.service)?.name
                      ? svc.name
                      : item.name,
                })
              }
              className={cn(
                "rounded-md p-0.5",
                item.service === svc.id ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100",
              )}
            >
              <ServiceIcon service={svc.id} size="sm" />
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label="Remove"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          value={item.name}
          onChange={(e) => onChange({ ...item, name: e.target.value })}
          className="h-9 rounded-lg bg-surface px-2.5 text-sm shadow-border outline-none"
        />
        <select
          value={item.status}
          onChange={(e) => onChange({ ...item, status: e.target.value as ItemStatus })}
          className="h-9 rounded-lg bg-surface px-2 text-sm shadow-border outline-none"
        >
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function Inspector() {
  const design = useStudio((s) => s.design);
  const patch = useStudio((s) => s.patch);
  const setItems = useStudio((s) => s.setItems);
  const replay = useStudio((s) => s.replay);
  const saveCurrent = useStudio((s) => s.saveCurrent);
  const resetTemplate = useStudio((s) => s.resetTemplate);

  const usesItems = design.kind === "dock" || design.kind === "sheet" || design.kind === "banner";
  const usesCopy = design.kind !== "dock";

  function addItem() {
    if (design.items.length >= 6) return;
    const used = new Set(design.items.map((i) => i.service));
    const next = SERVICES.find((s) => !used.has(s.id)) ?? SERVICES[0]!;
    setItems([
      ...design.items,
      { id: crypto.randomUUID(), service: next.id as ServiceId, name: next.name, status: "loading" },
    ]);
  }

  return (
    <div className="studio-scroll flex h-full flex-col gap-5 px-4 py-5">
      <Section title="This cue">
        <div className="field">
          <label htmlFor="cue-name">Name</label>
          <input
            id="cue-name"
            type="text"
            value={design.name}
            onChange={(e) => patch({ name: e.target.value })}
          />
        </div>
        <p className="text-xs leading-relaxed text-muted">{KIND_META[design.kind].blurb}</p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex-1" onClick={saveCurrent}>
            Save a copy
          </Button>
          <Button variant="ghost" size="sm" onClick={resetTemplate}>
            Reset
          </Button>
        </div>
      </Section>

      <Section title="How it shows up">
        <div className="field">
          <label htmlFor="entrance">Motion</label>
          <select
            id="entrance"
            value={design.entrance}
            onChange={(e) => {
              patch({ entrance: e.target.value as Entrance });
              replay();
            }}
          >
            {ENTRANCE_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted">
            {ENTRANCE_OPTIONS.find((o) => o.id === design.entrance)?.hint}
          </p>
        </div>
        <div className="field">
          <label htmlFor="ease">Feel</label>
          <select
            id="ease"
            value={design.ease}
            onChange={(e) => {
              patch({ ease: e.target.value as CueDesign["ease"] });
              replay();
            }}
          >
            {EASE_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <RangeField
          label="How long it takes to appear"
          value={design.durationMs}
          min={180}
          max={800}
          step={20}
          suffix=" ms"
          onChange={(n) => patch({ durationMs: n })}
        />
      </Section>

      <Section title="Where it sits">
        <div className="seg">
          {POSITION_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              data-on={design.position === o.id}
              onClick={() => {
                patch({ position: o.id as Position });
                replay();
              }}
            >
              {o.id === "top" ? "Top" : o.id === "center" ? "Middle" : "Bottom"}
            </button>
          ))}
        </div>
        <div className="field">
          <label>On this screen</label>
          <div className="seg">
            {(
              [
                ["dark", "Dark"],
                ["signin", "Sign-in"],
                ["home", "Home"],
              ] as [Scene, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                data-on={design.scene === id}
                onClick={() => patch({ scene: id })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Look">
        <div className="field">
          <label>Card</label>
          <div className="seg">
            {(["light", "dark"] as CardTone[]).map((tone) => (
              <button
                key={tone}
                type="button"
                data-on={design.tone === tone}
                onClick={() => patch({ tone })}
              >
                {tone === "light" ? "White" : "Dark"}
              </button>
            ))}
          </div>
        </div>
        <div className="field">
          <label>Shadow</label>
          <div className="seg">
            {(["none", "soft", "lift"] as ShadowDepth[]).map((shadow) => (
              <button
                key={shadow}
                type="button"
                data-on={design.shadow === shadow}
                onClick={() => patch({ shadow })}
              >
                {shadow === "none" ? "Flat" : shadow === "soft" ? "Soft" : "Lifted"}
              </button>
            ))}
          </div>
        </div>
        <RangeField
          label="Corner roundness"
          value={design.radius}
          min={10}
          max={32}
          step={1}
          suffix=" px"
          onChange={(n) => patch({ radius: n })}
        />
        {design.kind === "dock" ? (
          <Toggle
            on={design.showLabels}
            onChange={(v) => patch({ showLabels: v })}
            label="Show names under icons"
          />
        ) : null}
      </Section>

      {usesCopy ? (
        <Section title="What it says">
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={design.title}
              onChange={(e) => patch({ title: e.target.value })}
            />
          </div>
          {design.kind !== "pill" ? (
            <div className="field">
              <label htmlFor="detail">Supporting line</label>
              <input
                id="detail"
                type="text"
                value={design.detail}
                onChange={(e) => patch({ detail: e.target.value })}
              />
            </div>
          ) : null}
        </Section>
      ) : null}

      <Section title={usesItems ? "The apps inside" : "Leading icon"}>
        <div className="flex flex-col gap-2">
          {design.items.map((it, idx) => (
            <ItemEditor
              key={it.id}
              item={it}
              canRemove={design.items.length > 1}
              onChange={(next) => {
                const copy = [...design.items];
                copy[idx] = next;
                setItems(copy);
              }}
              onRemove={() => setItems(design.items.filter((x) => x.id !== it.id))}
            />
          ))}
        </div>
        {usesItems && design.items.length < 6 ? (
          <Button variant="secondary" size="sm" onClick={addItem}>
            <Plus className="size-3.5" />
            Add an app
          </Button>
        ) : null}
        <Toggle
          on={design.sequence}
          onChange={(v) => {
            patch({ sequence: v });
            replay();
          }}
          label="Finish one by one"
          hint="Play a cascade of checkmarks after it appears"
        />
        {design.sequence ? (
          <RangeField
            label="Time between checkmarks"
            value={design.staggerMs}
            min={120}
            max={800}
            step={20}
            suffix=" ms"
            onChange={(n) => patch({ staggerMs: n })}
          />
        ) : null}
        <RangeField
          label="Auto-hide after"
          value={design.autoDismissMs}
          min={0}
          max={4000}
          step={100}
          suffix={design.autoDismissMs === 0 ? " (stays)" : " ms"}
          onChange={(n) => patch({ autoDismissMs: n })}
        />
      </Section>
    </div>
  );
}