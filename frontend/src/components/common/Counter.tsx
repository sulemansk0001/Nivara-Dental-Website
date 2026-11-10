import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = ""
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out quart
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOut * end));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};
