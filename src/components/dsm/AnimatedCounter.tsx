import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter = ({ target, label, suffix = '', duration = 1800 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-[var(--g-text-inverse)] tabular-nums tracking-tight leading-none">
        {count}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-[var(--g-sec-300)] tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
};
