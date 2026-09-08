import type { CueDesign, CueItem, OverlayKind, ServiceId } from "./types";

function item(service: ServiceId, status: CueItem["status"] = "loading"): CueItem {
  const names: Record<ServiceId, string> = {
    inbox: "Inbox",
    calendar: "Calendar",
    files: "Files",
    chat: "Chat",
    camera: "Camera",
    cloud: "Cloud",
    notes: "Notes",
    alerts: "Alerts",
  };
  return {
    id: service,
    service,
    name: names[service],
    status,
  };
}

function base(partial: Partial<CueDesign> & Pick<CueDesign, "id" | "name" | "kind">): CueDesign {
  return {
    entrance: "from-bottom",
    position: "bottom",
    durationMs: 420,
    staggerMs: 420,
    autoDismissMs: 0,
    sequence: true,
    tone: "light",
    radius: 20,
    shadow: "lift",
    ease: "smooth",
    title: "Connecting",
    detail: "Linking your tools",
    items: [
      item("inbox", "complete"),
      item("calendar"),
      item("files"),
      item("chat"),
      item("camera"),
    ],
    scene: "dark",
    showLabels: false,
    ...partial,
  };
}

export const TEMPLATES: CueDesign[] = [
  base({
    id: "connecting-dock",
    name: "Connecting dock",
    kind: "dock",
    entrance: "from-bottom",
    position: "bottom",
    scene: "dark",
    title: "Connecting",
    detail: "Your tools are coming online",
  }),
  base({
    id: "status-toast",
    name: "Loading toast",
    kind: "toast",
    entrance: "from-top",
    position: "top",
    sequence: false,
    radius: 16,
    shadow: "soft",
    scene: "signin",
    title: "Connecting accounts",
    detail: "This only takes a moment",
    items: [item("cloud", "loading")],
    durationMs: 380,
  }),
  base({
    id: "success-toast",
    name: "All set toast",
    kind: "toast",
    entrance: "slide-down",
    position: "top",
    sequence: false,
    autoDismissMs: 2200,
    radius: 16,
    shadow: "soft",
    scene: "signin",
    title: "You're connected",
    detail: "Inbox, Calendar, and Files are ready",
    items: [item("inbox", "complete")],
    durationMs: 360,
    ease: "spring",
  }),
  base({
    id: "signin-wait",
    name: "Sign-in wait",
    kind: "card",
    entrance: "blur",
    position: "center",
    sequence: false,
    radius: 24,
    shadow: "lift",
    scene: "signin",
    title: "Signing you in",
    detail: "Checking your workspace",
    items: [item("cloud", "loading")],
    durationMs: 480,
    ease: "gentle",
  }),
  base({
    id: "sync-sheet",
    name: "Status list",
    kind: "sheet",
    entrance: "from-bottom",
    position: "bottom",
    sequence: true,
    radius: 24,
    shadow: "lift",
    scene: "home",
    title: "Syncing services",
    detail: "We'll open the app when these finish",
    items: [
      item("inbox", "complete"),
      item("calendar"),
      item("files"),
      item("chat"),
    ],
    durationMs: 440,
    showLabels: true,
  }),
  base({
    id: "live-pill",
    name: "Live pill",
    kind: "pill",
    entrance: "slide-down",
    position: "top",
    sequence: false,
    radius: 999,
    shadow: "soft",
    scene: "home",
    title: "Syncing 3 of 5",
    detail: "",
    items: [item("cloud", "loading")],
    durationMs: 340,
    ease: "snappy",
  }),
  base({
    id: "progress-banner",
    name: "Progress banner",
    kind: "banner",
    entrance: "from-top",
    position: "top",
    sequence: true,
    radius: 16,
    shadow: "soft",
    scene: "dark",
    title: "Linking your tools",
    detail: "Keep this screen open",
    items: [
      item("inbox", "complete"),
      item("calendar"),
      item("files"),
      item("chat"),
      item("camera"),
    ],
    durationMs: 360,
  }),
];

export const TEMPLATE_ORDER: OverlayKind[] = [
  "dock",
  "toast",
  "banner",
  "card",
  "sheet",
  "pill",
];

export function cloneDesign(design: CueDesign, name?: string): CueDesign {
  return {
    ...design,
    id: crypto.randomUUID(),
    name: name ?? design.name,
    items: design.items.map((it) => ({ ...it, id: crypto.randomUUID() })),
  };
}

export function findTemplate(id: string): CueDesign | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
