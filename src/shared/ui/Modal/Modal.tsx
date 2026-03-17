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
      className={`rounded-[8px] p-0 backdrop:bg-black/50 ${className}`}
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
    <Modal open={open} onClose={onCancel} className="w-[428px]">
      <div className="p-[28px]">
        <p className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-primary)] py-[12px]">
          {message}
        </p>
        <div className="flex items-center justify-end gap-[12px] mt-[40px]">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center px-[24px] py-[15.5px] rounded-[4px] border border-[var(--color-gray-disabled)] text-[14px] text-[var(--color-gray-primary)] cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center justify-center px-[24px] py-[15.5px] rounded-[4px] bg-[var(--color-primary)] text-[14px] text-[var(--color-white)] cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
