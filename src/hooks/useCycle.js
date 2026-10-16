import { useEffect, useRef, useState } from 'react';

export const CYCLE_MS = 2000;

// Steps through `count` slides every 2s while the element (returned ref) is on screen.
// A small per-item offset keeps neighbouring tiles from flipping in lockstep.
// No rotation for visitors who prefer reduced motion.
export default function useCycle(count, index = 0, ms = CYCLE_MS) {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || count < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    const start = setTimeout(() => {
      setActive((a) => (a + 1) % count);
      timer = setInterval(() => setActive((a) => (a + 1) % count), ms);
    }, ms + (index % 4) * 300);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [inView, count, index, ms]);

  return [active, ref];
}
