import { useState } from 'react';
import { Modal } from './Modal';

interface QuestionInputModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, content: string) => void;
  title?: string;
  submitLabel?: string;
  cancelLabel?: string;
}

export function QuestionInputModal({
  open,
  onClose,
  onSubmit,
  title = '질문하기',
  submitLabel = '등록',
  cancelLabel = '취소',
}: QuestionInputModalProps) {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionContent, setQuestionContent] = useState('');

  const isValid = questionTitle.trim().length > 0 && questionContent.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(questionTitle.trim(), questionContent.trim());
    setQuestionTitle('');
    setQuestionContent('');
  };

  const handleClose = () => {
    setQuestionTitle('');
    setQuestionContent('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="w-[528px]">
      <div className="flex flex-col p-[28px]">
        {/* Header */}
        <p className="text-[18px] font-semibold leading-[1.4] tracking-[-0.54px] text-[var(--color-gray-primary)]">
          {title}
        </p>

        {/* Title input */}
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          className="mt-[20px] h-[48px] px-[16px] py-[10px] rounded-[4px] border border-[var(--color-gray-disabled)] text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-primary)] placeholder:text-[var(--color-gray-disabled)] outline-none focus:border-[var(--color-primary)]"
        />

        {/* Content textarea */}
        <textarea
          placeholder="질문 내용을 입력해 주세요."
          value={questionContent}
          onChange={(e) => setQuestionContent(e.target.value)}
          rows={6}
          className="mt-[12px] px-[16px] py-[12px] rounded-[4px] border border-[var(--color-gray-disabled)] text-[14px] leading-[1.6] tracking-[-0.42px] text-[var(--color-gray-primary)] placeholder:text-[var(--color-gray-disabled)] outline-none resize-none focus:border-[var(--color-primary)]"
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-[12px] mt-[24px]">
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center px-[24px] py-[15.5px] rounded-[4px] border border-[var(--color-gray-disabled)] text-[14px] text-[var(--color-gray-primary)] cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className={`flex items-center justify-center px-[24px] py-[15.5px] rounded-[4px] text-[14px] text-[var(--color-white)] ${
              isValid
                ? 'bg-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary-600)]'
                : 'bg-[var(--color-gray-disabled)] cursor-not-allowed'
            }`}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
