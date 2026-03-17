import { forwardRef, useState, type TextareaHTMLAttributes } from 'react';

interface CommentInputProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  onChange?: (value: string) => void;
  className?: string;
}

export const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  (
    {
      placeholder = '댓글을 입력해 주세요.',
      onChange,
      disabled,
      className = '',
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const currentValue =
      props.value !== undefined ? String(props.value) : value;

    return (
      <div
        className={`flex flex-col w-full rounded-[4px] border transition-colors ${
          disabled
            ? 'bg-[var(--color-gray-200)] border-[var(--color-gray-disabled)]'
            : focused
              ? 'bg-white border-[var(--color-primary)]'
              : 'bg-white border-[var(--color-gray-disabled)]'
        } ${className}`}
      >
        <textarea
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          value={currentValue}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
          }}
          rows={4}
          className="w-full px-[16px] pt-[12px] pb-[12px] bg-transparent outline-none resize-none text-[14px] leading-[1.6] tracking-[-0.42px] text-[var(--color-gray-primary)] placeholder:text-[var(--color-gray-disabled)]"
          {...props}
        />
      </div>
    );
  },
);

CommentInput.displayName = 'CommentInput';
