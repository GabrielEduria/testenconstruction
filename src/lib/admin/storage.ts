"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * State saved in this browser's localStorage. Can later be swapped for a database without touching the screens.
 * `value` is undefined until the saved data has been read, so defaults never overwrite it.
 */
export function useStored<T>(key: string, fallback: () => T) {
  const [value, setValue] = useState<T>();
  const [failed, setFailed] = useState(false);
  const fallbackRef = useRef(fallback);

  // Reading localStorage must happen after mount (the server has none), so this one-time setState is intended.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    let next: T | undefined;
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) next = JSON.parse(raw) as T;
    } catch {
      setFailed(true);
    }
    setValue(next ?? fallbackRef.current());
  }, [key]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const save = useCallback((next: T) => {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, [key]);

  return [value, save, failed] as const;
}
