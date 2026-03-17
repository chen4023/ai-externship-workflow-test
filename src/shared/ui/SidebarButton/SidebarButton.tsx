import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface SidebarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function SidebarButton({
  active = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}: SidebarButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`flex items-center gap-[12px] w-full px-[16px] py-[12px] rounded-[4px] text-[16px] leading-[1.4] tracking-[-0.48px] font-semibold transition-colors cursor-pointer ${
        disabled
          ? 'text-[var(--color-gray-disabled)] cursor-not-allowed'
          : active
            ? 'bg-[var(--color-primary-100)] text-[var(--color-primary)]'
            : 'text-[var(--color-gray-600)] hover:bg-[var(--color-gray-100)]'
      } ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
