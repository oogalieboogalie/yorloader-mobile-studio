import { useEffect, useMemo, useState } from "react";
import { useStudio } from "@/lib/store";
import type { CueDesign, CueItem, ItemStatus } from "@/lib/types";

export type PlayPhase = "hidden" | "in" | "out";

export function usePlayback(design: CueDesign) {
  const playNonce = useStudio((s) => s.playNonce);
  const itemIds = design.items.map((it) => it.id).join("|");
  const [phase, setPhase] = useState<PlayPhase>("hidden");
  const [statuses, setStatuses] = useState<ItemStatus[]>(() =>
    design.items.map(() => "loading"),
  );

  useEffect(() => {
    const timers: number[] = [];
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setPhase("hidden");
    setStatuses(design.items.map(() => "loading"));

    const enter = () => {
      setPhase("in");
      if (design.sequence) {
        design.items.forEach((_, i) => {
          const t = window.setTimeout(
            () => {
              setStatuses((prev) => prev.map((s, idx) => (idx === i ? "complete" : s)));
            },
            (reduced ? 80 : design.durationMs + 280) + i * (reduced ? 80 : design.staggerMs),
          );
          timers.push(t);
        });
      } else {
        setStatuses(design.items.map((it) => it.status));
      }
      if (design.autoDismissMs > 0) {
        const t = window.setTimeout(
          () => setPhase("out"),
          (reduced ? 200 : design.durationMs) + design.autoDismissMs,
        );
        timers.push(t);
      }
    };

    const start = window.setTimeout(enter, reduced ? 30 : 50);
    timers.push(start);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
    // itemIds captures add/remove; playNonce captures Replay
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    playNonce,
    design.id,
    design.kind,
    design.entrance,
    design.durationMs,
    design.staggerMs,
    design.autoDismissMs,
    design.sequence,
    itemIds,
  ]);

  const items: CueItem[] = useMemo(
    () =>
      design.items.map((it, i) => ({
        ...it,
        status: design.sequence ? (statuses[i] ?? it.status) : it.status,
      })),
    [design.items, design.sequence, statuses],
  );

  return { phase, items };
}
