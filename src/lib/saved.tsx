import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type SavedContextValue = {
  saved: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
  pantry: string[];
  setPantry: (items: string[]) => void;
};

const SavedContext = createContext<SavedContextValue | null>(null);

const SAVED_KEY = "cooksmart.saved";
const PANTRY_KEY = "cooksmart.pantry";

const DEFAULT_PANTRY = ["Chicken", "Onion", "Tomato", "Garlic", "Ginger"];

export function CookSmartProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [pantry, setPantryState] = useState<string[]>(DEFAULT_PANTRY);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SAVED_KEY);
      if (s) setSaved(JSON.parse(s));
      const p = localStorage.getItem(PANTRY_KEY);
      if (p) setPantryState(JSON.parse(p));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback((slug: string) => {
    setSaved((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const setPantry = useCallback((items: string[]) => {
    setPantryState(items);
    try {
      localStorage.setItem(PANTRY_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ saved, isSaved: (slug: string) => saved.includes(slug), toggle, pantry, setPantry }),
    [saved, toggle, pantry, setPantry],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useCookSmart() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useCookSmart must be used inside CookSmartProvider");
  return ctx;
}
