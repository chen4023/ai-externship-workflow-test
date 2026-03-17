import { useEffect, useRef, type ReactNode } from 'react';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="var(--color-gray-500)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DefaultIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="20" fill="var(--color-primary-100)" />
    <path
      d="M24 16V26"
      stroke="var(--color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="24" cy="31" r="1.5" fill="var(--color-primary)" />
  </svg>
);

export function Popup({
  open,
  onClose,
  icon,
  title,
  description,
  ctaLabel = '확인',
  onCtaClick,
  className = '',
}: PopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleCtaClick = () => {
    onCtaClick?.();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={`rounded-[8px] p-0 backdrop:bg-black/50 ${className}`}
    >
      <div className="relative flex flex-col items-center w-[380px] px-[28px] pt-[48px] pb-[28px]">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[16px] right-[16px] cursor-pointer"
          aria-label="닫기"
        >
          <CloseIcon />
        </button>

        {/* Icon */}
        <div className="mb-[20px]">
          {icon ?? <DefaultIcon />}
        </div>

        {/* Title */}
        <p className="text-[18px] font-semibold leading-[1.4] tracking-[-0.54px] text-[var(--color-gray-primary)] text-center">
          {title}
        </p>

        {/* Description */}
        {description && (
          <p className="mt-[8px] text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-500)] text-center whitespace-pre-line">
            {description}
          </p>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={handleCtaClick}
          className="mt-[28px] w-full flex items-center justify-center py-[16px] rounded-[4px] bg-[var(--color-primary)] text-[16px] font-semibold text-[var(--color-white)] cursor-pointer hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)] transition-colors"
        >
          {ctaLabel}
        </button>
      </div>
    </dialog>
  );
}
