import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Play, i as Plus, n as Trash2, o as Copy, r as RotateCcw, s as Check } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes--yggK5rn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function item(service, status = "loading") {
	return {
		id: service,
		service,
		name: {
			inbox: "Inbox",
			calendar: "Calendar",
			files: "Files",
			chat: "Chat",
			camera: "Camera",
			cloud: "Cloud",
			notes: "Notes",
			alerts: "Alerts"
		}[service],
		status
	};
}
function base(partial) {
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
			item("camera")
		],
		scene: "dark",
		showLabels: false,
		...partial
	};
}
var TEMPLATES = [
	base({
		id: "connecting-dock",
		name: "Connecting dock",
		kind: "dock",
		entrance: "from-bottom",
		position: "bottom",
		scene: "dark",
		title: "Connecting",
		detail: "Your tools are coming online"
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
		durationMs: 380
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
		ease: "spring"
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
		ease: "gentle"
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
			item("chat")
		],
		durationMs: 440,
		showLabels: true
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
		ease: "snappy"
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
			item("camera")
		],
		durationMs: 360
	})
];
function cloneDesign(design, name) {
	return {
		...design,
		id: crypto.randomUUID(),
		name: name ?? design.name,
		items: design.items.map((it) => ({
			...it,
			id: crypto.randomUUID()
		}))
	};
}
var DEFAULT = cloneDesign(TEMPLATES[0], TEMPLATES[0].name);
var useStudio = create()(persist((set, get) => ({
	design: DEFAULT,
	templateId: TEMPLATES[0].id,
	saved: [],
	playNonce: 0,
	applyTemplate: (id) => {
		const tpl = TEMPLATES.find((t) => t.id === id);
		if (!tpl) return;
		set({
			templateId: id,
			design: cloneDesign(tpl, tpl.name),
			playNonce: get().playNonce + 1
		});
	},
	patch: (partial) => set({ design: {
		...get().design,
		...partial
	} }),
	setItems: (items) => set({ design: {
		...get().design,
		items
	} }),
	saveCurrent: () => {
		const { design, saved } = get();
		set({ saved: [{
			id: crypto.randomUUID(),
			savedAt: Date.now(),
			design: cloneDesign(design, design.name)
		}, ...saved].slice(0, 24) });
	},
	loadSaved: (id) => {
		const record = get().saved.find((s) => s.id === id);
		if (!record) return;
		set({
			design: cloneDesign(record.design, record.design.name),
			templateId: "",
			playNonce: get().playNonce + 1
		});
	},
	deleteSaved: (id) => set({ saved: get().saved.filter((s) => s.id !== id) }),
	rename: (name) => set({ design: {
		...get().design,
		name
	} }),
	replay: () => set({ playNonce: get().playNonce + 1 }),
	resetTemplate: () => {
		const { templateId } = get();
		const tpl = TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0];
		set({
			design: cloneDesign(tpl, tpl.name),
			playNonce: get().playNonce + 1
		});
	}
}), {
	name: "beacon-studio-v1",
	skipHydration: true,
	partialize: (state) => ({
		design: state.design,
		templateId: state.templateId,
		saved: state.saved
	})
}));
var ENTRANCE_OPTIONS = [
	{
		id: "fade",
		label: "Fade in",
		hint: "Quiet, stays in place"
	},
	{
		id: "from-top",
		label: "Slide down from the top",
		hint: "Classic toast"
	},
	{
		id: "from-bottom",
		label: "Slide up from the bottom",
		hint: "Dock or sheet"
	},
	{
		id: "slide-down",
		label: "Settle down",
		hint: "Short drop into place"
	},
	{
		id: "slide-up",
		label: "Settle up",
		hint: "Short lift into place"
	},
	{
		id: "scale",
		label: "Soft pop",
		hint: "Grows in slightly"
	},
	{
		id: "blur",
		label: "Blur into view",
		hint: "Soft focus, then sharp"
	}
];
var POSITION_OPTIONS = [
	{
		id: "top",
		label: "Top of the screen"
	},
	{
		id: "center",
		label: "Middle"
	},
	{
		id: "bottom",
		label: "Bottom of the screen"
	}
];
var EASE_OPTIONS = [
	{
		id: "smooth",
		label: "Smooth",
		css: "cubic-bezier(0.22, 1, 0.36, 1)"
	},
	{
		id: "snappy",
		label: "Snappy",
		css: "cubic-bezier(0.23, 1, 0.32, 1)"
	},
	{
		id: "gentle",
		label: "Gentle",
		css: "cubic-bezier(0.45, 0, 0.55, 1)"
	},
	{
		id: "spring",
		label: "Springy",
		css: "cubic-bezier(0.34, 1.36, 0.64, 1)"
	}
];
var KIND_META = {
	dock: {
		label: "App dock",
		blurb: "A floating bar of app icons with live status under each one."
	},
	toast: {
		label: "Toast",
		blurb: "A compact notice that slides in, says one thing, then can leave."
	},
	banner: {
		label: "Banner",
		blurb: "A full-width strip with a message and a progress line."
	},
	card: {
		label: "Center card",
		blurb: "A focused wait state — signing in, connecting, please hold."
	},
	sheet: {
		label: "Status list",
		blurb: "A bottom sheet that names each service as it finishes."
	},
	pill: {
		label: "Live pill",
		blurb: "A tiny floating chip. Use it when you only need a pulse."
	}
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var AMP = "&amp;";
var LT = "&lt;";
var GT = "&gt;";
var QUOT = "&quot;";
var APOS = "&#39;";
function escapeHtml(value) {
	return value.replaceAll("&", AMP).replaceAll("<", LT).replaceAll(">", GT).replaceAll("\"", QUOT).replaceAll("'", APOS);
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 transition-[scale,background-color,color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-foreground",
			secondary: "bg-elevated text-foreground shadow-border",
			ghost: "text-muted hover:text-foreground hover:bg-elevated",
			danger: "bg-danger text-foreground"
		},
		size: {
			sm: "h-8 px-3 text-xs rounded-md",
			md: "h-10 px-4 text-sm rounded-lg",
			lg: "h-11 px-5 text-sm rounded-lg",
			icon: "size-10 rounded-lg",
			"icon-sm": "size-8 rounded-md"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var SERVICES = [
	{
		id: "inbox",
		name: "Inbox",
		hue: "#4A6FA5",
		path: "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm1.7.6 6.05 4.32c.15.1.4.1.54 0L18.3 7.1a.75.75 0 0 0-.8-1.27L12 9.78 6.5 5.83a.75.75 0 1 0-.8 1.27Z"
	},
	{
		id: "calendar",
		name: "Calendar",
		hue: "#3E6B5A",
		path: "M7.5 3.25a.75.75 0 0 1 .75.75v.75h7.5V4a.75.75 0 0 1 1.5 0v.75H19a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2h1.75V4a.75.75 0 0 1 .75-.75ZM5 9.5v9.5h14V9.5H5Z"
	},
	{
		id: "files",
		name: "Files",
		hue: "#5C5752",
		path: "M4 6.5A2.5 2.5 0 0 1 6.5 4h4.09c.4 0 .78.16 1.06.44l1.41 1.41c.28.28.66.44 1.06.44H17.5A2.5 2.5 0 0 1 20 8.8v8.7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
	},
	{
		id: "chat",
		name: "Chat",
		hue: "#3F5858",
		path: "M5.5 4A2.5 2.5 0 0 0 3 6.5V14a2.5 2.5 0 0 0 2.5 2.5H8l3.2 3.04a.75.75 0 0 0 1.1-.04L14.7 16.5H18.5A2.5 2.5 0 0 0 21 14V6.5A2.5 2.5 0 0 0 18.5 4h-13Z"
	},
	{
		id: "camera",
		name: "Camera",
		hue: "#6B5344",
		path: "M9.2 4.4A1.5 1.5 0 0 1 10.5 4h3c.5 0 .96.24 1.25.64L15.4 5.5H18a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 18 19.5H6A2.5 2.5 0 0 1 3.5 17V8A2.5 2.5 0 0 1 6 5.5h2.6L9.2 4.4ZM12 16.25A3.75 3.75 0 1 0 12 8.75a3.75 3.75 0 0 0 0 7.5Z"
	},
	{
		id: "cloud",
		name: "Cloud",
		hue: "#3F4E5C",
		path: "M7.8 18.5h8.9c2.4 0 4.3-1.86 4.3-4.2 0-2.1-1.54-3.86-3.58-4.16A5.25 5.25 0 0 0 7.4 8.7C5.2 9.08 3.5 10.98 3.5 13.25c0 2.9 2.16 5.25 4.3 5.25Z"
	},
	{
		id: "notes",
		name: "Notes",
		hue: "#4E5347",
		path: "M7 3.5h7.38c.4 0 .78.16 1.06.44l3.62 3.62c.28.28.44.66.44 1.06V18.5A2.5 2.5 0 0 1 17 21H7a2.5 2.5 0 0 1-2.5-2.5v-13A2.5 2.5 0 0 1 7 3.5Zm1.75 6.25h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5Zm0 3.5h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5Z"
	},
	{
		id: "alerts",
		name: "Alerts",
		hue: "#5A4E4A",
		path: "M12 3.25A5.75 5.75 0 0 0 6.25 9v2.2c0 .7-.22 1.38-.62 1.95L4.7 14.4A1.25 1.25 0 0 0 5.72 16.5h12.56a1.25 1.25 0 0 0 1.02-2.1l-.93-1.25a3.4 3.4 0 0 1-.62-1.95V9A5.75 5.75 0 0 0 12 3.25ZM10 18.25a2 2 0 1 0 4 0h-4Z"
	}
];
var SERVICE_MAP = Object.fromEntries(SERVICES.map((s) => [s.id, s]));
function easeCss$1(id) {
	return EASE_OPTIONS.find((e) => e.id === id)?.css ?? EASE_OPTIONS[0].css;
}
function iconSvg(item) {
	const svc = SERVICE_MAP[item.service];
	return `<span class="bn-icon" style="background:${svc.hue}" aria-hidden="true"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="${svc.path}"></path></svg></span>`;
}
function badge(status) {
	if (status === "complete") return `<span class="bn-badge bn-badge-ok" aria-label="Done"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>`;
	if (status === "error") return `<span class="bn-badge bn-badge-err" aria-label="Error"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M15 9 9 15M9 9l6 6"/></svg></span>`;
	if (status === "pending") return `<span class="bn-badge bn-badge-wait" aria-label="Waiting"></span>`;
	return `<span class="bn-spinner" aria-label="Loading"></span>`;
}
function overlayInner(design) {
	const items = design.items;
	const title = escapeHtml(design.title);
	const detail = escapeHtml(design.detail);
	if (design.kind === "dock") {
		const cells = items.map((it) => {
			const label = design.showLabels ? `<span class="bn-label">${escapeHtml(it.name)}</span>` : "";
			return `<div class="bn-cell" data-id="${escapeHtml(it.id)}" data-status="${it.status}">${iconSvg(it)}${label}${badge(it.status)}</div>`;
		}).join("");
		return `<div class="bn-surface bn-dock" data-tone="${design.tone}">${cells}</div>`;
	}
	if (design.kind === "toast") {
		const lead = items[0];
		const mark = lead ? badge(lead.status) : badge("loading");
		return `<div class="bn-surface bn-toast" data-tone="${design.tone}">${lead ? iconSvg(lead) : ""}<div class="bn-copy"><strong>${title}</strong>${detail ? `<span>${detail}</span>` : ""}</div>${mark}</div>`;
	}
	if (design.kind === "pill") {
		const lead = items[0];
		return `<div class="bn-surface bn-pill" data-tone="${design.tone}">${lead ? badge(lead.status) : badge("loading")}<span>${title}</span></div>`;
	}
	if (design.kind === "banner") {
		const done = items.filter((i) => i.status === "complete").length;
		const pct = items.length ? Math.round(done / items.length * 100) : 30;
		return `<div class="bn-surface bn-banner" data-tone="${design.tone}"><div class="bn-copy"><strong>${title}</strong>${detail ? `<span>${detail}</span>` : ""}</div><div class="bn-track"><i style="width:${pct}%"></i></div></div>`;
	}
	if (design.kind === "card") {
		const lead = items[0];
		return `<div class="bn-surface bn-card" data-tone="${design.tone}">${lead ? `<div class="bn-card-icon">${iconSvg(lead)}</div>` : ""}<strong>${title}</strong>${detail ? `<span>${detail}</span>` : ""}${lead ? `<div class="bn-card-status">${badge(lead.status)}</div>` : ""}</div>`;
	}
	const rows = items.map((it) => `<div class="bn-row" data-id="${escapeHtml(it.id)}" data-status="${it.status}">${iconSvg(it)}<span class="bn-row-name">${escapeHtml(it.name)}</span>${badge(it.status)}</div>`).join("");
	return `<div class="bn-surface bn-sheet" data-tone="${design.tone}"><div class="bn-copy"><strong>${title}</strong>${detail ? `<span>${detail}</span>` : ""}</div><div class="bn-rows">${rows}</div></div>`;
}
function overlayHtml(design) {
	return `<div class="bn-stage" data-position="${design.position}">
  <div class="bn-overlay" data-enter="${design.entrance}" data-phase="in" style="--bn-duration:${design.durationMs}ms;--bn-ease:${easeCss$1(design.ease)};--bn-radius:${design.radius}px;--bn-shadow:${shadowCss(design)}">
    ${overlayInner(design)}
  </div>
</div>`;
}
function shadowCss(design) {
	if (design.shadow === "none") return "none";
	if (design.shadow === "soft") return "0 8px 24px rgba(0,0,0,0.16)";
	return "0 10px 28px rgba(0,0,0,0.28)";
}
function overlayCss() {
	return `/* Beacon overlay — drop into your app */
.bn-stage {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  padding: 54px 16px 22px;
  z-index: 40;
}
.bn-stage[data-position="top"] { align-items: flex-start; justify-content: center; }
.bn-stage[data-position="center"] { align-items: center; justify-content: center; }
.bn-stage[data-position="bottom"] { align-items: flex-end; justify-content: center; }

.bn-overlay {
  width: 100%;
  display: flex;
  justify-content: center;
  transform-origin: center;
  transition-property: opacity, transform, filter;
  transition-duration: var(--bn-duration, 420ms);
  transition-timing-function: var(--bn-ease, cubic-bezier(0.22, 1, 0.36, 1));
  will-change: transform, opacity;
}
.bn-overlay[data-phase="hidden"],
.bn-overlay[data-phase="out"] {
  opacity: 0;
  pointer-events: none;
}
.bn-overlay[data-enter="fade"][data-phase="hidden"],
.bn-overlay[data-enter="fade"][data-phase="out"] { transform: none; }
.bn-overlay[data-enter="slide-down"][data-phase="hidden"],
.bn-overlay[data-enter="slide-down"][data-phase="out"] { transform: translateY(-18px); }
.bn-overlay[data-enter="slide-up"][data-phase="hidden"],
.bn-overlay[data-enter="slide-up"][data-phase="out"] { transform: translateY(18px); }
.bn-overlay[data-enter="from-top"][data-phase="hidden"],
.bn-overlay[data-enter="from-top"][data-phase="out"] { transform: translateY(-120%); }
.bn-overlay[data-enter="from-bottom"][data-phase="hidden"],
.bn-overlay[data-enter="from-bottom"][data-phase="out"] { transform: translateY(120%); }
.bn-overlay[data-enter="scale"][data-phase="hidden"],
.bn-overlay[data-enter="scale"][data-phase="out"] { transform: scale(0.96); }
.bn-overlay[data-enter="blur"][data-phase="hidden"],
.bn-overlay[data-enter="blur"][data-phase="out"] { transform: translateY(8px); filter: blur(6px); }

.bn-surface {
  pointer-events: auto;
  background: #ffffff;
  color: #161616;
  border-radius: var(--bn-radius, 20px);
  box-shadow: var(--bn-shadow, 0 10px 28px rgba(0,0,0,0.28));
}
.bn-surface[data-tone="dark"] {
  background: #1c1c1e;
  color: #f4f4f5;
}

.bn-dock {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 14px 10px 12px;
}
.bn-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 36px;
}
.bn-label {
  font-size: 10px;
  letter-spacing: 0.01em;
  color: #6b6b70;
  line-height: 1;
}
.bn-surface[data-tone="dark"] .bn-label { color: #a1a1aa; }

.bn-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.bn-icon svg { display: block; }

.bn-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bn-badge-ok {
  background: #2ecc71;
  color: #fff;
  animation: bn-pop 420ms cubic-bezier(0.34, 1.36, 0.64, 1) both;
}
.bn-badge-err {
  background: #c4544a;
  color: #fff;
}
.bn-badge-wait {
  width: 20px;
  height: 20px;
  border: 3px solid #e2e8f0;
}

.bn-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #e2e8f0;
  border-top-color: #64748b;
  border-radius: 50%;
  animation: bn-spin 0.9s linear infinite;
  display: block;
}
.bn-surface[data-tone="dark"] .bn-spinner {
  border-color: #3f3f46;
  border-top-color: #a1a1aa;
}

.bn-toast, .bn-banner {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
}
.bn-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px 8px 10px;
  font-size: 13px;
  font-weight: 550;
  width: auto;
}
.bn-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}
.bn-copy strong {
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.25;
}
.bn-copy span {
  font-size: 12px;
  color: #6b6b70;
  line-height: 1.35;
}
.bn-surface[data-tone="dark"] .bn-copy span { color: #a1a1aa; }

.bn-track {
  position: relative;
  height: 4px;
  width: 72px;
  flex-shrink: 0;
  border-radius: 99px;
  background: #e7e5e0;
  overflow: hidden;
}
.bn-track i {
  display: block;
  height: 100%;
  background: #2ecc71;
  border-radius: inherit;
  transition: width 400ms cubic-bezier(0.22, 1, 0.36, 1);
}
.bn-surface[data-tone="dark"] .bn-track { background: #3f3f46; }

.bn-card {
  width: min(260px, 100%);
  padding: 28px 24px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
}
.bn-card-icon .bn-icon { width: 40px; height: 40px; border-radius: 12px; }
.bn-card strong { font-size: 16px; font-weight: 600; letter-spacing: -0.02em; }
.bn-card > span { font-size: 13px; color: #6b6b70; }
.bn-card-status { margin-top: 8px; }

.bn-sheet {
  width: 100%;
  padding: 18px 16px 14px;
}
.bn-sheet .bn-copy { margin-bottom: 12px; padding: 0 4px; }
.bn-sheet .bn-copy strong { font-size: 15px; }
.bn-rows { display: flex; flex-direction: column; gap: 2px; }
.bn-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 8px;
  border-radius: 12px;
}
.bn-row-name { flex: 1; font-size: 14px; font-weight: 500; }

@keyframes bn-spin { to { transform: rotate(360deg); } }
@keyframes bn-pop {
  from { transform: scale(0.6); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .bn-overlay { transition-duration: 1ms; }
  .bn-spinner, .bn-badge-ok { animation: none; }
}
`;
}
function overlayJs(design) {
	const stagger = design.staggerMs;
	const duration = design.durationMs;
	const dismiss = design.autoDismissMs;
	return `/* Replay this overlay. Call window.playBeacon() whenever you want it again. */
(function () {
  const overlay = document.querySelector(".bn-overlay");
  if (!overlay) return;
  const nodes = overlay.querySelectorAll("[data-id]");
  function setStatus(el, status) {
    el.setAttribute("data-status", status);
    const spinner = el.querySelector(".bn-spinner, .bn-badge");
    if (!spinner) return;
    if (status === "complete") {
      spinner.outerHTML = '<span class="bn-badge bn-badge-ok" aria-label="Done"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>';
    }
  }
  window.playBeacon = function playBeacon() {
    overlay.setAttribute("data-phase", "hidden");
    nodes.forEach(function (el) { el.setAttribute("data-status", "loading"); });
    void overlay.offsetWidth;
    overlay.setAttribute("data-phase", "in");
    ${design.sequence ? `nodes.forEach(function (el, i) {
      window.setTimeout(function () { setStatus(el, "complete"); }, ${duration} + 280 + i * ${stagger});
    });` : ""}
    ${dismiss > 0 ? `window.setTimeout(function () { overlay.setAttribute("data-phase", "out"); }, ${duration} + ${dismiss});` : ""}
  };
})();`;
}
function fullSnippet(design) {
	return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(design.name)}</title>
  <style>
    html, body { margin: 0; height: 100%; background: #121212; font-family: ui-sans-serif, system-ui, sans-serif; }
    .phone { position: relative; width: min(390px, 100%); height: 100vh; margin: 0 auto; overflow: hidden; }
${overlayCss()}
  </style>
</head>
<body>
  <div class="phone">
${overlayHtml(design)}
  </div>
  <script>
${overlayJs(design)}
    playBeacon();
  <\/script>
</body>
</html>`;
}
var TABS = [
	{
		id: "html",
		label: "HTML"
	},
	{
		id: "css",
		label: "CSS"
	},
	{
		id: "js",
		label: "Replay JS"
	},
	{
		id: "page",
		label: "Full page"
	}
];
function Handoff() {
	const design = useStudio((s) => s.design);
	const [tab, setTab] = (0, import_react.useState)("html");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const code = (0, import_react.useMemo)(() => {
		if (tab === "html") return overlayHtml(design);
		if (tab === "css") return overlayCss();
		if (tab === "js") return overlayJs(design);
		return fullSnippet(design);
	}, [design, tab]);
	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 border-t border-line px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-semibold tracking-wide text-subtle uppercase",
				children: "Hand this to your developer"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-relaxed text-muted",
				children: "Self-contained overlay code. Paste the CSS once, the HTML where the cue should appear, and call playBeacon() whenever you want it to run."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "seg flex-1",
					children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": tab === t.id,
						onClick: () => setTab(t.id),
						children: t.label
					}, t.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					size: "sm",
					onClick: () => void copy(),
					className: "shrink-0",
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copied" : "Copy"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "code-block",
				tabIndex: 0,
				children: code
			})
		]
	});
}
function ServiceIcon({ service, size = "md", className }) {
	const def = SERVICE_MAP[service];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("bn-icon", size === "lg" ? "size-10 rounded-xl" : size === "sm" ? "size-6 rounded-md" : "", className),
		style: { background: def.hue },
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			width: size === "lg" ? 18 : 15,
			height: size === "lg" ? 18 : 15,
			fill: "currentColor",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: def.path })
		})
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-3 border-b border-line pb-5 last:border-b-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xs font-semibold tracking-wide text-subtle uppercase",
			children: title
		}), children]
	});
}
function Toggle({ on, onChange, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onChange(!on),
		className: "flex w-full items-center gap-3 rounded-xl px-1 py-1 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("relative h-6 w-10 shrink-0 rounded-full transition-[background-color] duration-150", on ? "bg-accent" : "bg-line"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-0.5 left-0.5 size-5 rounded-full transition-transform duration-150 ease-out", on ? "translate-x-4 bg-accent-foreground" : "bg-muted") })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm font-medium text-foreground",
			children: label
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-xs text-muted",
			children: hint
		}) : null] })]
	});
}
function RangeField({ label, value, min, max, step, suffix, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs tabular-nums text-muted",
				children: [value, suffix]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value))
		})]
	});
}
var STATUSES = [
	{
		id: "loading",
		label: "Loading"
	},
	{
		id: "complete",
		label: "Done"
	},
	{
		id: "error",
		label: "Error"
	},
	{
		id: "pending",
		label: "Waiting"
	}
];
function ItemEditor({ item, onChange, onRemove, canRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 rounded-xl bg-elevated p-2.5 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 flex-wrap gap-1",
				children: SERVICES.map((svc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					title: svc.name,
					onClick: () => onChange({
						...item,
						service: svc.id,
						name: item.name === SERVICES.find((s) => s.id === item.service)?.name ? svc.name : item.name
					}),
					className: cn("rounded-md p-0.5", item.service === svc.id ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
						service: svc.id,
						size: "sm"
					})
				}, svc.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				onClick: onRemove,
				disabled: !canRemove,
				"aria-label": "Remove",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				value: item.name,
				onChange: (e) => onChange({
					...item,
					name: e.target.value
				}),
				className: "h-9 rounded-lg bg-surface px-2.5 text-sm shadow-border outline-none"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: item.status,
				onChange: (e) => onChange({
					...item,
					status: e.target.value
				}),
				className: "h-9 rounded-lg bg-surface px-2 text-sm shadow-border outline-none",
				children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s.id,
					children: s.label
				}, s.id))
			})]
		})]
	});
}
function Inspector() {
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
		const next = SERVICES.find((s) => !used.has(s.id)) ?? SERVICES[0];
		setItems([...design.items, {
			id: crypto.randomUUID(),
			service: next.id,
			name: next.name,
			status: "loading"
		}]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio-scroll flex flex-col gap-5 overflow-y-auto px-4 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "This cue",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "cue-name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "cue-name",
							type: "text",
							value: design.name,
							onChange: (e) => patch({ name: e.target.value })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-muted",
						children: KIND_META[design.kind].blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "sm",
							className: "flex-1",
							onClick: saveCurrent,
							children: "Save a copy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: resetTemplate,
							children: "Reset"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "How it shows up",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "entrance",
								children: "Motion"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "entrance",
								value: design.entrance,
								onChange: (e) => {
									patch({ entrance: e.target.value });
									replay();
								},
								children: ENTRANCE_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: o.id,
									children: o.label
								}, o.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: ENTRANCE_OPTIONS.find((o) => o.id === design.entrance)?.hint
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "ease",
							children: "Feel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "ease",
							value: design.ease,
							onChange: (e) => {
								patch({ ease: e.target.value });
								replay();
							},
							children: EASE_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: o.id,
								children: o.label
							}, o.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
						label: "How long it takes to appear",
						value: design.durationMs,
						min: 180,
						max: 800,
						step: 20,
						suffix: " ms",
						onChange: (n) => patch({ durationMs: n })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Where it sits",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "seg",
					children: POSITION_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-on": design.position === o.id,
						onClick: () => {
							patch({ position: o.id });
							replay();
						},
						children: o.id === "top" ? "Top" : o.id === "center" ? "Middle" : "Bottom"
					}, o.id))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "On this screen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "seg",
						children: [
							["dark", "Dark"],
							["signin", "Sign-in"],
							["home", "Home"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-on": design.scene === id,
							onClick: () => patch({ scene: id }),
							children: label
						}, id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Look",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Card" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "seg",
							children: ["light", "dark"].map((tone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-on": design.tone === tone,
								onClick: () => patch({ tone }),
								children: tone === "light" ? "White" : "Dark"
							}, tone))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Shadow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "seg",
							children: [
								"none",
								"soft",
								"lift"
							].map((shadow) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-on": design.shadow === shadow,
								onClick: () => patch({ shadow }),
								children: shadow === "none" ? "Flat" : shadow === "soft" ? "Soft" : "Lifted"
							}, shadow))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
						label: "Corner roundness",
						value: design.radius,
						min: 10,
						max: 32,
						step: 1,
						suffix: " px",
						onChange: (n) => patch({ radius: n })
					}),
					design.kind === "dock" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: design.showLabels,
						onChange: (v) => patch({ showLabels: v }),
						label: "Show names under icons"
					}) : null
				]
			}),
			usesCopy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "What it says",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "title",
						children: "Title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "title",
						type: "text",
						value: design.title,
						onChange: (e) => patch({ title: e.target.value })
					})]
				}), design.kind !== "pill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "detail",
						children: "Supporting line"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "detail",
						type: "text",
						value: design.detail,
						onChange: (e) => patch({ detail: e.target.value })
					})]
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: usesItems ? "The apps inside" : "Leading icon",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: design.items.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemEditor, {
							item: it,
							canRemove: design.items.length > 1,
							onChange: (next) => {
								const copy = [...design.items];
								copy[idx] = next;
								setItems(copy);
							},
							onRemove: () => setItems(design.items.filter((x) => x.id !== it.id))
						}, it.id))
					}),
					usesItems && design.items.length < 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						size: "sm",
						onClick: addItem,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "Add an app"]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
						on: design.sequence,
						onChange: (v) => {
							patch({ sequence: v });
							replay();
						},
						label: "Finish one by one",
						hint: "Play a cascade of checkmarks after it appears"
					}),
					design.sequence ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
						label: "Time between checkmarks",
						value: design.staggerMs,
						min: 120,
						max: 800,
						step: 20,
						suffix: " ms",
						onChange: (n) => patch({ staggerMs: n })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
						label: "Auto-hide after",
						value: design.autoDismissMs,
						min: 0,
						max: 4e3,
						step: 100,
						suffix: design.autoDismissMs === 0 ? " (stays)" : " ms",
						onChange: (n) => patch({ autoDismissMs: n })
					})
				]
			})
		]
	});
}
function Badge({ status }) {
	if (status === "complete") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "bn-badge bn-badge-ok",
		"aria-label": "Done",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			width: "12",
			height: "12",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "3",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
		})
	});
	if (status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "bn-badge bn-badge-err",
		"aria-label": "Error",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			width: "12",
			height: "12",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "3",
			strokeLinecap: "round",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 9 9 15M9 9l6 6" })
		})
	});
	if (status === "pending") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "bn-badge bn-badge-wait",
		"aria-label": "Waiting"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "bn-spinner",
		"aria-label": "Loading"
	});
}
function shadowFor(design) {
	if (design.shadow === "none") return "none";
	if (design.shadow === "soft") return "0 8px 24px rgba(0,0,0,0.16)";
	return "0 10px 28px rgba(0,0,0,0.28)";
}
function easeCss(id) {
	return EASE_OPTIONS.find((e) => e.id === id)?.css ?? EASE_OPTIONS[0].css;
}
function Dock({ design, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bn-surface bn-dock",
		"data-tone": design.tone,
		children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bn-cell",
			"data-id": it.id,
			"data-status": it.status,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, { service: it.service }),
				design.showLabels ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bn-label",
					children: it.name
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: it.status })
			]
		}, it.id))
	});
}
function Toast({ design, items }) {
	const lead = items[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bn-surface bn-toast",
		"data-tone": design.tone,
		children: [
			lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, { service: lead.service }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bn-copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: design.title }), design.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: design.detail }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: lead?.status ?? "loading" })
		]
	});
}
function Pill({ design, items }) {
	const lead = items[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bn-surface bn-pill",
		"data-tone": design.tone,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: lead?.status ?? "loading" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: design.title })]
	});
}
function Banner({ design, items }) {
	const done = items.filter((i) => i.status === "complete").length;
	const pct = items.length ? Math.round(done / items.length * 100) : 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bn-surface bn-banner",
		"data-tone": design.tone,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bn-copy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: design.title }), design.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: design.detail }) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bn-track",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${Math.max(pct, 8)}%` } })
		})]
	});
}
function Card({ design, items }) {
	const lead = items[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bn-surface bn-card",
		"data-tone": design.tone,
		children: [
			lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bn-card-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, {
					service: lead.service,
					size: "lg"
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: design.title }),
			design.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: design.detail }) : null,
			lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bn-card-status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: lead.status })
			}) : null
		]
	});
}
function Sheet({ design, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bn-surface bn-sheet",
		"data-tone": design.tone,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bn-copy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: design.title }), design.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: design.detail }) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bn-rows",
			children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bn-row",
				"data-id": it.id,
				"data-status": it.status,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceIcon, { service: it.service }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bn-row-name",
						children: it.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: it.status })
				]
			}, it.id))
		})]
	});
}
function Inner({ design, items }) {
	switch (design.kind) {
		case "dock": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {
			design,
			items
		});
		case "toast": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {
			design,
			items
		});
		case "pill": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
			design,
			items
		});
		case "banner": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banner, {
			design,
			items
		});
		case "card": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			design,
			items
		});
		case "sheet": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			design,
			items
		});
		default: return null;
	}
}
function OverlayView({ design, items, phase }) {
	const style = {
		"--bn-duration": `${design.durationMs}ms`,
		"--bn-ease": easeCss(design.ease),
		"--bn-radius": `${design.radius}px`,
		"--bn-shadow": shadowFor(design)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bn-stage",
		"data-position": design.position,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bn-overlay",
			"data-enter": design.entrance,
			"data-phase": phase,
			style,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inner, {
				design,
				items
			})
		})
	});
}
function usePlayback(design) {
	const playNonce = useStudio((s) => s.playNonce);
	const itemIds = design.items.map((it) => it.id).join("|");
	const [phase, setPhase] = (0, import_react.useState)("hidden");
	const [statuses, setStatuses] = (0, import_react.useState)(() => design.items.map(() => "loading"));
	(0, import_react.useEffect)(() => {
		const timers = [];
		const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		setPhase("hidden");
		setStatuses(design.items.map(() => "loading"));
		const enter = () => {
			setPhase("in");
			if (design.sequence) design.items.forEach((_, i) => {
				const t = window.setTimeout(() => {
					setStatuses((prev) => prev.map((s, idx) => idx === i ? "complete" : s));
				}, (reduced ? 80 : design.durationMs + 280) + i * (reduced ? 80 : design.staggerMs));
				timers.push(t);
			});
			else setStatuses(design.items.map((it) => it.status));
			if (design.autoDismissMs > 0) {
				const t = window.setTimeout(() => setPhase("out"), (reduced ? 200 : design.durationMs) + design.autoDismissMs);
				timers.push(t);
			}
		};
		const start = window.setTimeout(enter, reduced ? 30 : 50);
		timers.push(start);
		return () => {
			timers.forEach((t) => window.clearTimeout(t));
		};
	}, [
		playNonce,
		design.id,
		design.kind,
		design.entrance,
		design.durationMs,
		design.staggerMs,
		design.autoDismissMs,
		design.sequence,
		itemIds
	]);
	return {
		phase,
		items: (0, import_react.useMemo)(() => design.items.map((it, i) => ({
			...it,
			status: design.sequence ? statuses[i] ?? it.status : it.status
		})), [
			design.items,
			design.sequence,
			statuses
		])
	};
}
function StatusBar({ invert }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative z-20 flex h-11 items-end justify-between px-7 pb-1 text-micro font-semibold tabular-nums", invert ? "text-card-foreground" : "text-foreground"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "9:41" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "16",
				height: "12",
				viewBox: "0 0 16 12",
				fill: "currentColor",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "0",
						y: "7",
						width: "3",
						height: "5",
						rx: "0.6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "4.3",
						y: "5",
						width: "3",
						height: "7",
						rx: "0.6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "8.6",
						y: "2.5",
						width: "3",
						height: "9.5",
						rx: "0.6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "12.9",
						y: "0",
						width: "3",
						height: "12",
						rx: "0.6",
						opacity: "0.35"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "22",
				height: "12",
				viewBox: "0 0 22 12",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "0.6",
						y: "0.6",
						width: "18",
						height: "10.8",
						rx: "2.4",
						stroke: "currentColor",
						strokeWidth: "1.2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "2.2",
						y: "2.2",
						width: "13.4",
						height: "7.6",
						rx: "1.2",
						fill: "currentColor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M20 4.2v3.6c1.1-.6 1.1-3 0-3.6Z",
						fill: "currentColor"
					})
				]
			})]
		})]
	});
}
function Island() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute top-2.5 left-1/2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-island" });
}
function HomeBar({ invert }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-x-0 bottom-2 z-20 flex justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-1 w-28 rounded-full", invert ? "bg-card-foreground/80" : "bg-foreground/80") })
	});
}
function ApertureMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 80",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "40",
				r: "36",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "3.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "40",
				r: "10",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M40 4 52 32H28L40 4Zm0 72 12-28H28L40 76ZM4 40l28-12v24L4 40Zm72 0-28-12v24l28-12Z",
				fill: "currentColor",
				opacity: "0.92"
			})
		]
	});
}
function SignInScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-card px-7 pt-16 text-card-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApertureMark, { className: "size-16 text-card-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-headline mt-5 text-2xl font-semibold tracking-tight",
					children: "Welcome back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-subtle",
					children: "Sign in to continue"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 text-xs font-medium",
					children: "Email address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-11 items-center gap-2.5 rounded-xl bg-background/5 px-3 text-sm text-subtle shadow-inset",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "3.5",
							y: "5.5",
							width: "17",
							height: "13",
							rx: "2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m4 7 8 6 8-6" })]
					}), "name@company.com"]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1.5 text-xs font-medium",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-11 items-center gap-2.5 rounded-xl bg-background/5 px-3 text-sm text-subtle shadow-inset",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "16",
						height: "16",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "5",
							y: "10",
							width: "14",
							height: "10",
							rx: "2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 10V7a4 4 0 0 1 8 0v3" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tracking-widest",
						children: "••••••••"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex h-11 items-center justify-center rounded-xl bg-bezel text-sm font-medium text-foreground",
					children: "Sign in"
				})
			]
		})]
	});
}
function HomeScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-card text-card-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 pt-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-subtle uppercase",
				children: "Today"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-headline mt-1 text-2xl font-semibold tracking-tight",
				children: "Your workspace"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex flex-col gap-2 px-4",
			children: [
				{
					service: "inbox",
					title: "3 new messages",
					meta: "Inbox · 2m"
				},
				{
					service: "calendar",
					title: "Standup at 10:00",
					meta: "Calendar · today"
				},
				{
					service: "files",
					title: "Q3 deck uploaded",
					meta: "Files · yesterday"
				}
			].map((row) => {
				const svc = SERVICE_MAP[row.service];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-2xl bg-background/5 px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bn-icon",
						style: { background: svc.hue },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 24 24",
							width: "15",
							height: "15",
							fill: "currentColor",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: svc.path })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: row.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: row.meta
						})]
					})]
				}, row.service);
			})
		})]
	});
}
function DarkScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-phone" });
}
function SceneLayer({ scene }) {
	if (scene === "signin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInScene, {});
	if (scene === "home") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScene, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DarkScene, {});
}
function PhoneFrame({ design }) {
	const { phase, items } = usePlayback(design);
	const invert = design.scene !== "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative mx-auto w-full max-w-phone",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative aspect-phone overflow-hidden rounded-phone bg-bezel p-2.5 shadow-phone",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-full overflow-hidden rounded-screen bg-phone",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Island, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, { invert }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 pt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneLayer, { scene: design.scene })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverlayView, {
						design,
						items,
						phase
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeBar, { invert })
				]
			})
		})
	});
}
function Mini({ kind }) {
	if (kind === "dock") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-12 items-end justify-center px-3 pb-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-7 w-full items-center justify-around rounded-lg bg-card",
			children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", i === 0 ? "bg-success" : "bg-muted/40") }, i))
		})
	});
	if (kind === "toast" || kind === "banner") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-12 items-start justify-center px-3 pt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-full rounded-md bg-card" })
	});
	if (kind === "pill") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-12 items-start justify-center pt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-16 rounded-full bg-card" })
	});
	if (kind === "card") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-12 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-12 rounded-md bg-card" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-12 items-end justify-center px-3 pb-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-7 w-full rounded-t-lg bg-card" })
	});
}
function TemplateRail() {
	const templateId = useStudio((s) => s.templateId);
	const applyTemplate = useStudio((s) => s.applyTemplate);
	const saved = useStudio((s) => s.saved);
	const loadSaved = useStudio((s) => s.loadSaved);
	const deleteSaved = useStudio((s) => s.deleteSaved);
	const designId = useStudio((s) => s.design.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio-scroll flex h-full flex-col gap-5 overflow-y-auto px-3 py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-1 text-xs font-semibold tracking-wide text-subtle uppercase",
				children: "Templates"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 px-1 text-xs leading-relaxed text-muted",
				children: "Start with one of these, then tune how it appears."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-1.5",
				children: TEMPLATES.map((tpl) => {
					const on = templateId === tpl.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => applyTemplate(tpl.id),
						className: cn("flex w-full overflow-hidden rounded-xl text-left shadow-border transition-[background-color,box-shadow] duration-150", on ? "bg-elevated ring-1 ring-accent/50" : "bg-surface hover:bg-elevated"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-mini shrink-0 bg-phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, { kind: tpl.kind })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-0 flex-col justify-center px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm font-medium",
								children: tpl.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-xs text-muted",
								children: KIND_META[tpl.kind].label
							})]
						})]
					}) }, tpl.id);
				})
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-1 text-xs font-semibold tracking-wide text-subtle uppercase",
			children: "Your copies"
		}), saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 px-1 text-xs leading-relaxed text-muted",
			children: "Hit “Save a copy” in the inspector to keep a version on this device."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 flex flex-col gap-1",
			children: saved.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => loadSaved(s.id),
					className: cn("min-w-0 flex-1 truncate rounded-lg px-2.5 py-2 text-left text-sm", designId === s.design.id ? "bg-elevated text-foreground" : "text-muted hover:bg-elevated hover:text-foreground"),
					children: s.design.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": `Delete ${s.design.name}`,
					onClick: () => deleteSaved(s.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
				})]
			}, s.id))
		})] })]
	});
}
function Wordmark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative grid size-8 place-items-center rounded-lg bg-accent text-accent-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 24 24",
				width: "16",
				height: "16",
				fill: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "12",
						cy: "12",
						r: "7.5",
						stroke: "currentColor",
						strokeWidth: "1.8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "12",
						cy: "12",
						r: "2.2",
						fill: "currentColor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3",
						stroke: "currentColor",
						strokeWidth: "1.8",
						strokeLinecap: "round"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-headline text-sm leading-none font-semibold tracking-tight",
				children: "Beacon"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-micro text-muted",
				children: "Overlay studio"
			})]
		})]
	});
}
function Studio() {
	const design = useStudio((s) => s.design);
	const replay = useStudio((s) => s.replay);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [panel, setPanel] = (0, import_react.useState)("edit");
	(0, import_react.useEffect)(() => {
		useStudio.persist.rehydrate();
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			const tag = e.target?.tagName;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden items-center gap-2 sm:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-lede truncate text-xs text-muted",
							children: hydrated ? `${design.name} · ${motionLabel}` : "Loading your studio"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "sm",
							onClick: replay,
							className: "hidden sm:inline-flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Replay"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: replay,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), "Play"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col lg:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden w-rail min-h-0 shrink-0 border-r border-line lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateRail, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "relative flex min-h-0 min-w-0 flex-1 flex-col",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col items-center justify-center gap-4 overflow-y-auto px-4 py-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-sm text-center text-xs leading-relaxed text-muted lg:hidden",
									children: "Design how loading and status cues appear on a phone. Pick a template, press Play, then copy the code."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, { design }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 sm:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "secondary",
										size: "sm",
										onClick: replay,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Replay"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: "Space also replays"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hidden text-xs text-subtle sm:block",
									children: "Press space to replay the motion"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden w-inspector min-h-0 shrink-0 flex-col border-l border-line lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handoff, {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "grid grid-cols-3 border-t border-line lg:hidden",
				children: [
					["templates", "Templates"],
					["edit", "Edit"],
					["code", "Code"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPanel(id),
					className: panel === id ? "h-12 text-sm font-medium text-foreground" : "h-12 text-sm font-medium text-muted",
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-line lg:hidden",
				children: [
					panel === "templates" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-mobile-panel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateRail, {})
					}) : null,
					panel === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-mobile-panel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {})
					}) : null,
					panel === "code" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handoff, {}) : null
				]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {});
}
//#endregion
export { Home as component };
