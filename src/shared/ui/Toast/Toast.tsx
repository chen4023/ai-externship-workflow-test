type ToastVariant = 'inline' | 'popup';

interface ToastProps {
  message: string;
  description?: string;
  variant?: ToastVariant;
  className?: string;
}

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="var(--color-success)" />
    <path d="M8 12.5L11 15.5L16 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LargeCheckCircleIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" fill="var(--color-success)" />
    <path d="M16 24.5L22 30.5L32 19.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Toast({ message, description, variant = 'inline', className = '' }: ToastProps) {
  if (variant === 'popup') {
    return (
      <div
        className={`flex flex-col items-center gap-[16px] px-[40px] py-[32px] rounded-[8px] bg-[var(--color-white)] border border-[var(--color-gray-200)] shadow-[4px_4px_16px_0px_color-mix(in_srgb,var(--color-gray-500)_25%,transparent)] ${className}`}
      >
        <LargeCheckCircleIcon />
        <div className="flex flex-col items-center gap-[8px]">
          <p className="text-[18px] font-semibold leading-[1.4] tracking-[-0.54px] text-[var(--color-gray-primary)] text-center">
            {message}
          </p>
          {description && (
            <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-500)] text-center">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-[12px] px-[16px] py-[12px] rounded-[4px] bg-[var(--color-gray-100)] border border-[var(--color-gray-200)] shadow-[4px_4px_4px_0px_color-mix(in_srgb,var(--color-gray-500)_25%,transparent)] ${className}`}
    >
      <CheckCircleIcon />
      <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)] whitespace-nowrap">
        {message}
      </p>
    </div>
  );
}
