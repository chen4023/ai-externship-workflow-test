import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'mypage';
type ButtonSize = 'lg' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'lg',
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-[4px] font-semibold tracking-[-0.48px] transition-colors whitespace-nowrap cursor-pointer';

  const sizeStyles = {
    lg: 'px-[36px] py-[20px] text-[16px] leading-[1.4]',
    sm: 'px-[24px] py-[16px] text-[14px] leading-[1.4]',
  };

  const variantStyles = {
    primary: disabled
      ? 'bg-[var(--color-gray-disabled)] text-white cursor-not-allowed'
      : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)]',
    ghost: disabled
      ? 'bg-transparent text-[var(--color-gray-disabled)] cursor-not-allowed'
      : 'bg-transparent text-[var(--color-gray-primary)] hover:bg-[var(--color-gray-100)] active:bg-[var(--color-gray-200)]',
    outline: disabled
      ? 'border border-[var(--color-gray-disabled)] text-[var(--color-gray-disabled)] cursor-not-allowed'
      : 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-50)] active:bg-[var(--color-primary-100)]',
    mypage: disabled
      ? 'bg-[var(--color-gray-200)] text-[var(--color-gray-disabled)] cursor-not-allowed'
      : 'bg-[var(--color-gray-100)] text-[var(--color-gray-primary)] hover:bg-[var(--color-gray-200)] active:bg-[var(--color-gray-disabled)]',
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
