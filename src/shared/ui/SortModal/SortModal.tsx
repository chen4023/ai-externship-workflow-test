import { useState, useRef, useEffect } from 'react';

interface SortOption {
  label: string;
  value: string;
}

interface SortModalProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SortIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6H17M5 10H15M7 14H13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export function SortModal({
  options,
  value,
  onChange,
  className = '',
}: SortModalProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-[4px] px-[12px] py-[8px] text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)] cursor-pointer hover:text-[var(--color-gray-primary)] transition-colors"
      >
        <SortIcon />
        <span>{selectedLabel}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-[4px] min-w-[120px] bg-white border border-[var(--color-gray-200)] rounded-[4px] py-[4px] shadow-[0_2px_8px_0_color-mix(in_srgb,var(--color-gray-primary)_10%,transparent)] z-10">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex items-center w-full px-[16px] py-[10px] text-[14px] leading-[1.4] tracking-[-0.42px] cursor-pointer transition-colors hover:bg-[var(--color-gray-100)] ${
                option.value === value
                  ? 'text-[var(--color-primary)] font-semibold'
                  : 'text-[var(--color-gray-primary)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
