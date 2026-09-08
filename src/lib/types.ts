export type OverlayKind = "dock" | "toast" | "banner" | "card" | "sheet" | "pill";

export type Entrance =
  | "fade"
  | "slide-down"
  | "slide-up"
  | "from-top"
  | "from-bottom"
  | "scale"
  | "blur";

export type Position = "top" | "center" | "bottom";
export type CardTone = "light" | "dark";
export type ShadowDepth = "none" | "soft" | "lift";
export type Scene = "dark" | "signin" | "home";
export type ItemStatus = "loading" | "complete" | "error" | "pending";
export type ServiceId =
  | "inbox"
  | "calendar"
  | "files"
  | "chat"
  | "camera"
  | "cloud"
  | "notes"
  | "alerts";

export type EaseId = "smooth" | "snappy" | "gentle" | "spring";

export interface CueItem {
  id: string;
  service: ServiceId;
  name: string;
  status: ItemStatus;
}

export interface CueDesign {
  id: string;
  name: string;
  kind: OverlayKind;
  entrance: Entrance;
  position: Position;
  durationMs: number;
  staggerMs: number;
  autoDismissMs: number;
  sequence: boolean;
  tone: CardTone;
  radius: number;
  shadow: ShadowDepth;
  ease: EaseId;
  title: string;
  detail: string;
  items: CueItem[];
  scene: Scene;
  showLabels: boolean;
}

export interface SavedCue {
  id: string;
  savedAt: number;
  design: CueDesign;
}

export const ENTRANCE_OPTIONS: { id: Entrance; label: string; hint: string }[] = [
  { id: "fade", label: "Fade in", hint: "Quiet, stays in place" },
  { id: "from-top", label: "Slide down from the top", hint: "Classic toast" },
  { id: "from-bottom", label: "Slide up from the bottom", hint: "Dock or sheet" },
  { id: "slide-down", label: "Settle down", hint: "Short drop into place" },
  { id: "slide-up", label: "Settle up", hint: "Short lift into place" },
  { id: "scale", label: "Soft pop", hint: "Grows in slightly" },
  { id: "blur", label: "Blur into view", hint: "Soft focus, then sharp" },
];

export const POSITION_OPTIONS: { id: Position; label: string }[] = [
  { id: "top", label: "Top of the screen" },
  { id: "center", label: "Middle" },
  { id: "bottom", label: "Bottom of the screen" },
];

export const EASE_OPTIONS: { id: EaseId; label: string; css: string }[] = [
  { id: "smooth", label: "Smooth", css: "cubic-bezier(0.22, 1, 0.36, 1)" },
  { id: "snappy", label: "Snappy", css: "cubic-bezier(0.23, 1, 0.32, 1)" },
  { id: "gentle", label: "Gentle", css: "cubic-bezier(0.45, 0, 0.55, 1)" },
  { id: "spring", label: "Springy", css: "cubic-bezier(0.34, 1.36, 0.64, 1)" },
];

export const KIND_META: Record<
  OverlayKind,
  { label: string; blurb: string }
> = {
  dock: {
    label: "App dock",
    blurb: "A floating bar of app icons with live status under each one.",
  },
  toast: {
    label: "Toast",
    blurb: "A compact notice that slides in, says one thing, then can leave.",
  },
  banner: {
    label: "Banner",
    blurb: "A full-width strip with a message and a progress line.",
  },
  card: {
    label: "Center card",
    blurb: "A focused wait state — signing in, connecting, please hold.",
  },
  sheet: {
    label: "Status list",
    blurb: "A bottom sheet that names each service as it finishes.",
  },
  pill: {
    label: "Live pill",
    blurb: "A tiny floating chip. Use it when you only need a pulse.",
  },
};
