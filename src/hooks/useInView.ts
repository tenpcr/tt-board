import { useEffect, useRef, useState, RefObject } from 'react';

export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = {}
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null!);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      options
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return [ref, isInView];
}