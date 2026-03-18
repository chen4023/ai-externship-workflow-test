import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className = '' }: ModalProps) {
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

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={`m-auto rounded-[12px] p-0 backdrop:bg-black/50 ${className}`}
    >
      {children}
    </dialog>
  );
}

interface ConfirmModalProps {
  open: boolean;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  message,
  confirmLabel = '삭제',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onCancel} className="shadow-[0px_4px_16px_0px_rgba(160,160,160,0.25)]">
      <div className="p-[28px]">
        <div className="py-[12px]">
          <p className="text-[16px] leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-700)]">
            {message}
          </p>
        </div>
        <div className="flex items-center justify-end gap-[12px] mt-[40px]">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center h-[42px] px-[24px] py-[16px] rounded-full bg-[var(--color-primary-100)] text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] text-[var(--color-primary-600)] cursor-pointer hover:opacity-90 transition-opacity"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center justify-center h-[40px] px-[24px] py-[16px] rounded-full bg-[var(--color-primary)] text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-100)] cursor-pointer hover:bg-[var(--color-primary-600)] transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
