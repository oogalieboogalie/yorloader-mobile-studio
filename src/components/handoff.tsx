import { Check, Copy } from "lucide-react";
import { useMemo, useState } from "react";
import { fullSnippet, overlayCss, overlayHtml, overlayJs } from "@/lib/snippet";
import { useStudio } from "@/lib/store";
import { Button } from "./ui/button";

type Tab = "html" | "css" | "js" | "page";

const TABS: { id: Tab; label: string }[] = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "js", label: "Replay JS" },
  { id: "page", label: "Full page" },
];

export function Handoff() {
  const design = useStudio((s) => s.design);
  const [tab, setTab] = useState<Tab>("html");
  const [copied, setCopied] = useState(false);

  const code = useMemo(() => {
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

  return (
    <div className="flex flex-col gap-3 border-t border-line px-4 py-4">
      <div>
        <h2 className="text-xs font-semibold tracking-wide text-subtle uppercase">Hand this to your developer</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Self-contained overlay code. Paste the CSS once, the HTML where the cue should appear, and call
          playBeacon() whenever you want it to run.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="seg flex-1">
          {TABS.map((t) => (
            <button key={t.id} type="button" data-on={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <Button variant="primary" size="sm" onClick={() => void copy()} className="shrink-0">
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="code-block" tabIndex={0}>
        {code}
      </pre>
    </div>
  );
}
