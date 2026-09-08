import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cloneDesign, TEMPLATES } from "./templates";
import type { CueDesign, CueItem, SavedCue } from "./types";

function copyDesign(design: CueDesign, name?: string): CueDesign {
  return {
    ...design,
    name: name ?? design.name,
    items: design.items.map((it) => ({ ...it })),
  };
}

const DEFAULT = copyDesign(TEMPLATES[0]!);

interface StudioState {
  design: CueDesign;
  templateId: string;
  saved: SavedCue[];
  playNonce: number;
  applyTemplate: (id: string) => void;
  patch: (partial: Partial<CueDesign>) => void;
  setItems: (items: CueItem[]) => void;
  saveCurrent: () => void;
  loadSaved: (id: string) => void;
  deleteSaved: (id: string) => void;
  rename: (name: string) => void;
  replay: () => void;
  resetTemplate: () => void;
}

export const useStudio = create<StudioState>()(
  persist(
    (set, get) => ({
      design: DEFAULT,
      templateId: TEMPLATES[0]!.id,
      saved: [],
      playNonce: 0,
      applyTemplate: (id) => {
        const tpl = TEMPLATES.find((t) => t.id === id);
        if (!tpl) return;
        set({
          templateId: id,
          design: copyDesign(tpl, tpl.name),
          playNonce: get().playNonce + 1,
        });
      },
      patch: (partial) =>
        set({
          design: { ...get().design, ...partial },
        }),
      setItems: (items) => set({ design: { ...get().design, items } }),
      saveCurrent: () => {
        const { design, saved } = get();
        const record: SavedCue = {
          id: crypto.randomUUID(),
          savedAt: Date.now(),
          design: cloneDesign(design, design.name),
        };
        set({ saved: [record, ...saved].slice(0, 24) });
      },
      loadSaved: (id) => {
        const record = get().saved.find((s) => s.id === id);
        if (!record) return;
        set({
          design: copyDesign(record.design, record.design.name),
          templateId: "",
          playNonce: get().playNonce + 1,
        });
      },
      deleteSaved: (id) =>
        set({ saved: get().saved.filter((s) => s.id !== id) }),
      rename: (name) => set({ design: { ...get().design, name } }),
      replay: () => set({ playNonce: get().playNonce + 1 }),
      resetTemplate: () => {
        const { templateId } = get();
        const tpl = TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0]!;
        set({
          design: copyDesign(tpl, tpl.name),
          playNonce: get().playNonce + 1,
        });
      },
    }),
    {
      name: "beacon-studio-v1",
      skipHydration: true,
      partialize: (state) => ({
        design: state.design,
        templateId: state.templateId,
        saved: state.saved,
      }),
    },
  ),
);
