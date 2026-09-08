import { SERVICE_MAP } from "./services";
import { EASE_OPTIONS, type CueDesign, type CueItem, type Entrance } from "./types";
import { escapeHtml } from "./utils";

function easeCss(id: CueDesign["ease"]): string {
  return EASE_OPTIONS.find((e) => e.id === id)?.css ?? EASE_OPTIONS[0]!.css;
}

function hiddenTransform(entrance: Entrance): string {
  switch (entrance) {
    case "fade":
      return "none";
    case "slide-down":
      return "translateY(-18px)";
    case "slide-up":
      return "translateY(18px)";
    case "from-top":
      return "translateY(-120%)";
    case "from-bottom":
      return "translateY(120%)";
    case "scale":
      return "scale(0.96)";
    case "blur":
      return "translateY(8px)";
    default:
      return "none";
  }
}

function iconSvg(item: CueItem): string {
  const svc = SERVICE_MAP[item.service];
  return `<span class="bn-icon" style="background:${svc.hue}" aria-hidden="true"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="${svc.path}"></path></svg></span>`;
}

function badge(status: CueItem["status"]): string {
  if (status === "complete") {
    return `<span class="bn-badge bn-badge-ok" aria-label="Done"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>`;
  }
  if (status === "error") {
    return `<span class="bn-badge bn-badge-err" aria-label="Error"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M15 9 9 15M9 9l6 6"/></svg></span>`;
  }
  if (status === "pending") {
    return `<span class="bn-badge bn-badge-wait" aria-label="Waiting"></span>`;
  }
  return `<span class="bn-spinner" aria-label="Loading"></span>`;
}

function overlayInner(design: CueDesign): string {
  const items = design.items;
  const title = escapeHtml(design.title);
  const detail = escapeHtml(design.detail);

  if (design.kind === "dock") {
    const cells = items
      .map((it) => {
        const label = design.showLabels
          ? `<span class="bn-label">${escapeHtml(it.name)}</span>`
          : "";
        return `<div class="bn-cell" data-id="${escapeHtml(it.id)}" data-status="${it.status}">${iconSvg(it)}${label}${badge(it.status)}</div>`;
      })
      .join("");
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
    const pct = items.length ? Math.round((done / items.length) * 100) : 30;
    return `<div class="bn-surface bn-banner" data-tone="${design.tone}"><div class="bn-copy"><strong>${title}</strong>${detail ? `<span>${detail}</span>` : ""}</div><div class="bn-track"><i style="width:${pct}%"></i></div></div>`;
  }

  if (design.kind === "card") {
    const lead = items[0];
    return `<div class="bn-surface bn-card" data-tone="${design.tone}">${lead ? `<div class="bn-card-icon">${iconSvg(lead)}</div>` : ""}<strong>${title}</strong>${detail ? `<span>${detail}</span>` : ""}${lead ? `<div class="bn-card-status">${badge(lead.status)}</div>` : ""}</div>`;
  }

  const rows = items
    .map(
      (it) =>
        `<div class="bn-row" data-id="${escapeHtml(it.id)}" data-status="${it.status}">${iconSvg(it)}<span class="bn-row-name">${escapeHtml(it.name)}</span>${badge(it.status)}</div>`,
    )
    .join("");
  return `<div class="bn-surface bn-sheet" data-tone="${design.tone}"><div class="bn-copy"><strong>${title}</strong>${detail ? `<span>${detail}</span>` : ""}</div><div class="bn-rows">${rows}</div></div>`;
}

export function overlayHtml(design: CueDesign): string {
  const pos = design.position;
  return `<div class="bn-stage" data-position="${pos}">
  <div class="bn-overlay" data-enter="${design.entrance}" data-phase="in" style="--bn-duration:${design.durationMs}ms;--bn-ease:${easeCss(design.ease)};--bn-radius:${design.radius}px;--bn-shadow:${shadowCss(design)}">
    ${overlayInner(design)}
  </div>
</div>`;
}

function shadowCss(design: CueDesign): string {
  if (design.shadow === "none") return "none";
  if (design.shadow === "soft") return "0 8px 24px rgba(0,0,0,0.16)";
  return "0 10px 28px rgba(0,0,0,0.28)";
}

export function overlayCss(): string {
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

export function overlayJs(design: CueDesign): string {
  const stagger = design.staggerMs;
  const duration = design.durationMs;
  const dismiss = design.autoDismissMs;
  const sequence = design.sequence;
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
    ${sequence
      ? `nodes.forEach(function (el, i) {
      window.setTimeout(function () { setStatus(el, "complete"); }, ${duration} + 280 + i * ${stagger});
    });`
      : ""}
    ${dismiss > 0
      ? `window.setTimeout(function () { overlay.setAttribute("data-phase", "out"); }, ${duration} + ${dismiss});`
      : ""}
  };
})();`;
}

export function fullSnippet(design: CueDesign): string {
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
  </script>
</body>
</html>`;
}

export function hiddenTransformFor(entrance: Entrance): string {
  return hiddenTransform(entrance);
}
