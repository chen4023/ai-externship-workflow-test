import type { ButtonHTMLAttributes } from 'react';

interface CommentSubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function CommentSubmitButton({
  label = '등록',
  disabled,
  className = '',
  ...props
}: CommentSubmitButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center px-[24px] py-[10px] rounded-[4px] text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] transition-colors whitespace-nowrap ${
        disabled
          ? 'bg-[var(--color-gray-disabled)] text-white cursor-not-allowed'
          : 'bg-[var(--color-primary)] text-white cursor-pointer hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)]'
      } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
