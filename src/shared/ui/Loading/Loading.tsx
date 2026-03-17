import { useEffect, useState } from 'react';

interface LoadingProps {
  className?: string;
}

const DOT_POSITIONS = [
  'left-[8.33%]',
  'left-[41.67%]',
  'left-[75%]',
] as const;

export function Loading({ className = '' }: LoadingProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 6);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label="로딩 중">
      <div className="relative w-[48px] h-[48px]">
        {DOT_POSITIONS.map((pos, dot) => {
          const isActive = (frame + dot) % 3 === 0;
          return (
            <div
              key={dot}
              className={`absolute w-[8px] h-[8px] rounded-full transition-all duration-200 ${pos} ${
                isActive ? 'bg-[var(--color-primary)] top-[25%]' : 'bg-[var(--color-primary)] top-[41.67%] opacity-40'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
