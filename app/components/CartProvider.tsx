"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from "react";

export type CartItem = {
  id: string;            // unique per slug+size+colour combo
  slug: string;
  name: string;
  unitPrice: number;     // per piece OR per metre
  qty: number;           // count for tailored, metres for fabric
  size?: string;
  colour?: string;
  imageSrc: string;
  isFabric?: boolean;
};

type LastAdded = { item: CartItem; nonce: number } | null;

type CartCtx = {
  items: CartItem[];
  count: number;         // total units (sum of qty rounded for fabrics)
  subtotal: number;
  hydrated: boolean;
  drawerOpen: boolean;
  lastAdded: LastAdded;  // increments nonce on every addItem; consumed by <Toast>
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "ezj-cart-v1";

function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is CartItem =>
      typeof x?.id === "string" &&
      typeof x?.slug === "string" &&
      typeof x?.unitPrice === "number" &&
      typeof x?.qty === "number"
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<LastAdded>(null);
  const skipPersistRef = useRef(true); // don't write empty array to LS before hydration

  // Hydrate once from localStorage
  useEffect(() => {
    setItems(loadFromStorage());
    setHydrated(true);
    skipPersistRef.current = false;
  }, []);

  // Persist on every change after hydration
  useEffect(() => {
    if (skipPersistRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // Sync across tabs
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY) return;
      setItems(loadFromStorage());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const idx = prev.findIndex(x => x.id === item.id);
      if (idx >= 0) {
        // Same SKU+size+colour — accumulate qty (round to 0.5 for fabrics)
        const next = prev.slice();
        const merged = next[idx].qty + item.qty;
        next[idx] = {
          ...next[idx],
          qty: item.isFabric ? Math.round(merged * 2) / 2 : Math.round(merged),
        };
        return next;
      }
      return [...prev, item];
    });
    setLastAdded(prev => ({ item, nonce: (prev?.nonce ?? 0) + 1 }));
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(x => x.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setItems(prev => prev.map(x => {
      if (x.id !== id) return x;
      const min = x.isFabric ? 0.5 : 1;
      const stepped = x.isFabric ? Math.round(qty * 2) / 2 : Math.round(qty);
      return { ...x, qty: Math.max(min, stepped) };
    }));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0, s = 0;
    for (const it of items) {
      // For fabrics count as 1 line; for tailored count integer pieces.
      c += it.isFabric ? 1 : it.qty;
      s += it.unitPrice * it.qty;
    }
    return { count: c, subtotal: s };
  }, [items]);

  const value: CartCtx = {
    items, count, subtotal, hydrated, drawerOpen, lastAdded,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    addItem, removeItem, updateQty, clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

// Helper: build a stable line-id from the SKU + variant axes
export function lineId(slug: string, opts: { size?: string; colour?: string } = {}) {
  return [slug, opts.size ?? "", opts.colour ?? ""].join("|");
}
