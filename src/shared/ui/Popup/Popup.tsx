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
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L11 11M11 1L1 11"
      stroke="var(--color-gray-400)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DefaultIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="14" cy="14" r="14" fill="var(--color-primary-200)" />
    <circle cx="10" cy="12" r="1" fill="var(--color-primary)" />
    <circle cx="18" cy="12" r="1" fill="var(--color-primary)" />
    <path
      d="M10 18C10 18 12 16 14 16C16 16 18 18 18 18"
      stroke="var(--color-primary)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
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
      className={`m-auto rounded-[12px] border border-black p-0 backdrop:bg-black/50 ${className}`}
    >
      <div className="flex flex-col items-center w-[396px] p-[24px]">
        <div className="flex items-center justify-end w-full h-[24px] overflow-hidden p-[6px]">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col items-center gap-[40px] w-full">
          <div className="flex flex-col items-center gap-[16px]">
            <div>
              {icon ?? <DefaultIcon />}
            </div>

            <div className="flex flex-col items-center gap-[16px]">
              <p className="text-[20px] font-bold leading-[1.4] tracking-[-0.6px] text-[var(--color-gray-primary)] text-center">
                {title}
              </p>

              {description && (
                <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)] text-center whitespace-pre-line">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full flex items-center justify-center h-[52px] rounded-[4px] bg-[var(--color-primary)] text-[16px] leading-[1.4] tracking-[-0.48px] text-[var(--color-primary-100)] cursor-pointer hover:bg-[var(--color-primary-600)] active:bg-[var(--color-primary-700)] transition-colors"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
