import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  onChange?: (value: string) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder, value, onChange, rows = 12, id, className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        rows={rows}
        className={`w-full px-4 py-3 rounded-sm border border-gray-disabled bg-white text-sm leading-relaxed tracking-tight text-gray-primary placeholder:text-gray-disabled outline-none resize-none focus:border-primary transition-colors ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
