import { useRef, useCallback } from "react";

type TiltOptions = {
  max?: number; // degrees
  scale?: number;
  perspective?: number;
};

export function useTilt<T extends HTMLElement = HTMLDivElement>(opts: TiltOptions = {}) {
  const { max = 8, scale = 1.02, perspective = 900 } = opts;
  const ref = useRef<T | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(hover: none)").matches) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * max * 2;
      const ry = (x - 0.5) * max * 2;
      el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    },
    [max, scale, perspective],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0) rotateY(0) scale(1)`;
  }, [perspective]);

  return { ref, onMouseMove, onMouseLeave };
}
