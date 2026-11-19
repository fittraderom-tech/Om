import { useEffect, useRef, useState } from 'react';

/**
 * Reports whether the observed element has entered the viewport at least
 * once. Used both for section-title reveal animations and to gate lazy
 * card/image mounting so offscreen rows never load all at once.
 */
export function useIntersectionReveal({ threshold = 0.15, rootMargin = '120px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, isVisible]);

  return [ref, isVisible];
}
