import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  label: string;
  value: string;
}

type DropdownVariant = 'default' | 'compact';

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  variant?: DropdownVariant;
  onChange?: (value: string) => void;
  className?: string;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform ${open ? 'rotate-180' : ''}`}
  >
    <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 8.5L6 12.5L14 4.5" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Dropdown({
  options,
  value,
  placeholder = '해당되는 항목을 선택해 주세요.',
  disabled = false,
  variant = 'default',
  onChange,
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  const isCompact = variant === 'compact';

  const defaultButtonStyles = `h-[48px] px-[16px] py-[10px] rounded-[4px] border text-[14px] tracking-[-0.42px] ${
    disabled
      ? 'bg-[var(--color-gray-200)] border-[var(--color-gray-disabled)] text-[var(--color-gray-disabled)] cursor-not-allowed'
      : open
        ? 'bg-white border-[var(--color-gray-500)] text-[var(--color-gray-primary)]'
        : value
          ? 'bg-white border-[var(--color-gray-disabled)] text-[var(--color-gray-primary)]'
          : 'bg-white border-[var(--color-gray-disabled)] text-[var(--color-gray-disabled)] hover:bg-[var(--color-gray-100)]'
  }`;

  const compactButtonStyles = `h-[42px] px-2 py-3 border-0 bg-transparent text-[16px] font-normal ${
    disabled
      ? 'text-[var(--color-gray-disabled)] cursor-not-allowed'
      : 'text-[var(--color-gray-500)]'
  }`;

  const buttonStyles = isCompact ? compactButtonStyles : defaultButtonStyles;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`flex items-center justify-between w-full cursor-pointer transition-colors ${buttonStyles}`}
      >
        <span>{selectedLabel ?? placeholder}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute top-[56px] left-0 w-full bg-white border border-[var(--color-gray-500)] rounded-[4px] py-[5px] z-10">
          {options.map((option, i) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex items-center justify-between h-[48px] px-[11px] py-[10px] rounded-[4px] mx-[5px] w-[calc(100%-10px)] text-[14px] tracking-[-0.42px] cursor-pointer transition-colors ${
                option.value === value
                  ? 'text-[var(--color-primary)] font-semibold'
                  : 'text-[var(--color-gray-primary)]'
              } ${hoveredIndex === i ? 'bg-[var(--color-primary-100)]' : ''}`}
            >
              <span>{option.label}</span>
              {option.value === value && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
