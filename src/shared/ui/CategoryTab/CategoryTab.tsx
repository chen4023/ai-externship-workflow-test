import type { ButtonHTMLAttributes } from 'react';

interface CategoryTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: string;
}

export function CategoryTab({
  active = false,
  label,
  disabled,
  className = '',
  ...props
}: CategoryTabProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      role="tab"
      aria-selected={active}
      className={`inline-flex items-center justify-center px-[20px] py-[10px] text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
        disabled
          ? 'text-[var(--color-gray-disabled)] border-transparent cursor-not-allowed'
          : active
            ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
            : 'text-[var(--color-gray-400)] border-transparent hover:text-[var(--color-gray-600)]'
      } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}

interface CategoryTabBarProps {
  children: React.ReactNode;
  className?: string;
}

export function CategoryTabBar({
  children,
  className = '',
}: CategoryTabBarProps) {
  return (
    <div
      role="tablist"
      className={`flex items-center border-b border-[var(--color-gray-200)] ${className}`}
    >
      {children}
    </div>
  );
}
