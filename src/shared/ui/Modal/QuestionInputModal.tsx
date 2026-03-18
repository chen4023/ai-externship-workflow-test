import { useState } from 'react';
import { Modal } from './Modal';

interface QuestionInputModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  placeholder?: string;
  submitLabel?: string;
}

export function QuestionInputModal({
  open,
  onClose,
  onSubmit,
  placeholder = '질문 내용을 입력해 주세요.',
  submitLabel = '확인',
}: QuestionInputModalProps) {
  const [content, setContent] = useState('');

  const isValid = content.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(content.trim());
    setContent('');
  };

  const handleClose = () => {
    setContent('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="shadow-[0px_0px_16px_0px_rgba(160,160,160,0.25)]">
      <div className="flex flex-col gap-[40px] items-end p-[28px]">
        <div className="py-[12px] w-full">
          <textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full text-[16px] leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-primary)] placeholder:text-[var(--color-gray-400)] outline-none resize-none"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className={`flex items-center justify-center h-[42px] px-[24px] py-[20px] rounded-full text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] text-[var(--color-white)] transition-colors ${
            isValid
              ? 'bg-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary-600)]'
              : 'bg-[var(--color-gray-disabled)] cursor-not-allowed'
          }`}
        >
          {submitLabel}
        </button>
      </div>
    </Modal>
  );
}
