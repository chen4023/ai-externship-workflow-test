import { forwardRef, useState, type InputHTMLAttributes } from 'react';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
}

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.5" cy="8.5" r="5" stroke="var(--color-gray-500)" strokeWidth="1.5" />
    <path d="M12.5 12.5L16.5 16.5" stroke="var(--color-gray-500)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ClearIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="var(--color-gray-disabled)" strokeWidth="1.5" />
    <path d="M9 9L15 15M15 9L9 15" stroke="var(--color-gray-disabled)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = '질문 검색', onChange, onClear, className = '', ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const currentValue = props.value !== undefined ? String(props.value) : value;

    return (
      <div
        className={`flex items-center h-12 px-[10px] rounded-full border transition-colors ${
          focused
            ? 'border-[var(--color-primary)]'
            : 'border-[var(--color-gray-disabled)]'
        } bg-[var(--color-gray-100)] ${className}`}
      >
        <div className="flex items-center gap-[10px] flex-1">
          <SearchIcon />
          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            value={currentValue}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              setValue(e.target.value);
              onChange?.(e.target.value);
            }}
            className="flex-1 bg-transparent outline-none text-[14px] tracking-[-0.42px] text-[var(--color-gray-primary)] placeholder:text-[var(--color-gray-disabled)]"
            {...props}
          />
        </div>
        {currentValue && focused && (
          <button
            type="button"
            onClick={() => {
              setValue('');
              onClear?.();
              onChange?.('');
            }}
            className="shrink-0 cursor-pointer"
            aria-label="검색어 지우기"
          >
            <ClearIcon />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
