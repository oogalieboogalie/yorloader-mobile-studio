import type { ServiceId } from "./types";

export interface ServiceDef {
  id: ServiceId;
  name: string;
  hue: string;
  path: string;
}

export const SERVICES: ServiceDef[] = [
  {
    id: "inbox",
    name: "Inbox",
    hue: "#4A6FA5",
    path: "M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm1.7.6 6.05 4.32c.15.1.4.1.54 0L18.3 7.1a.75.75 0 0 0-.8-1.27L12 9.78 6.5 5.83a.75.75 0 1 0-.8 1.27Z",
  },
  {
    id: "calendar",
    name: "Calendar",
    hue: "#3E6B5A",
    path: "M7.5 3.25a.75.75 0 0 1 .75.75v.75h7.5V4a.75.75 0 0 1 1.5 0v.75H19a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5a2 2 0 0 1 2-2h1.75V4a.75.75 0 0 1 .75-.75ZM5 9.5v9.5h14V9.5H5Z",
  },
  {
    id: "files",
    name: "Files",
    hue: "#5C5752",
    path: "M4 6.5A2.5 2.5 0 0 1 6.5 4h4.09c.4 0 .78.16 1.06.44l1.41 1.41c.28.28.66.44 1.06.44H17.5A2.5 2.5 0 0 1 20 8.8v8.7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Z",
  },
  {
    id: "chat",
    name: "Chat",
    hue: "#3F5858",
    path: "M5.5 4A2.5 2.5 0 0 0 3 6.5V14a2.5 2.5 0 0 0 2.5 2.5H8l3.2 3.04a.75.75 0 0 0 1.1-.04L14.7 16.5H18.5A2.5 2.5 0 0 0 21 14V6.5A2.5 2.5 0 0 0 18.5 4h-13Z",
  },
  {
    id: "camera",
    name: "Camera",
    hue: "#6B5344",
    path: "M9.2 4.4A1.5 1.5 0 0 1 10.5 4h3c.5 0 .96.24 1.25.64L15.4 5.5H18a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 18 19.5H6A2.5 2.5 0 0 1 3.5 17V8A2.5 2.5 0 0 1 6 5.5h2.6L9.2 4.4ZM12 16.25A3.75 3.75 0 1 0 12 8.75a3.75 3.75 0 0 0 0 7.5Z",
  },
  {
    id: "cloud",
    name: "Cloud",
    hue: "#3F4E5C",
    path: "M7.8 18.5h8.9c2.4 0 4.3-1.86 4.3-4.2 0-2.1-1.54-3.86-3.58-4.16A5.25 5.25 0 0 0 7.4 8.7C5.2 9.08 3.5 10.98 3.5 13.25c0 2.9 2.16 5.25 4.3 5.25Z",
  },
  {
    id: "notes",
    name: "Notes",
    hue: "#4E5347",
    path: "M7 3.5h7.38c.4 0 .78.16 1.06.44l3.62 3.62c.28.28.44.66.44 1.06V18.5A2.5 2.5 0 0 1 17 21H7a2.5 2.5 0 0 1-2.5-2.5v-13A2.5 2.5 0 0 1 7 3.5Zm1.75 6.25h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5Zm0 3.5h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5Z",
  },
  {
    id: "alerts",
    name: "Alerts",
    hue: "#5A4E4A",
    path: "M12 3.25A5.75 5.75 0 0 0 6.25 9v2.2c0 .7-.22 1.38-.62 1.95L4.7 14.4A1.25 1.25 0 0 0 5.72 16.5h12.56a1.25 1.25 0 0 0 1.02-2.1l-.93-1.25a3.4 3.4 0 0 1-.62-1.95V9A5.75 5.75 0 0 0 12 3.25ZM10 18.25a2 2 0 1 0 4 0h-4Z",
  },
];

export const SERVICE_MAP: Record<ServiceId, ServiceDef> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s]),
) as Record<ServiceId, ServiceDef>;
