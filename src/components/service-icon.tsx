import { SERVICE_MAP } from "@/lib/services";
import type { ServiceId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ServiceIcon({
  service,
  size = "md",
  className,
}: {
  service: ServiceId;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const def = SERVICE_MAP[service];
  const dim = size === "lg" ? "size-10 rounded-xl" : size === "sm" ? "size-6 rounded-md" : "";
  return (
    <span
      className={cn("bn-icon", dim, className)}
      style={{ background: def.hue }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width={size === "lg" ? 18 : 15} height={size === "lg" ? 18 : 15} fill="currentColor">
        <path d={def.path} />
      </svg>
    </span>
  );
}
