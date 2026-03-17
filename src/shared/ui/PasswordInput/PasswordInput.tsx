import { forwardRef, useState, type InputHTMLAttributes } from 'react';

type PasswordState = 'default' | 'focus' | 'danger' | 'success';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  state?: PasswordState;
  helperText?: string;
  onChange?: (value: string) => void;
}

const EyeOpenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6Z" stroke="var(--color-gray-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="3" stroke="var(--color-gray-500)" strokeWidth="1.5" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6Z" stroke="var(--color-gray-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="3" stroke="var(--color-gray-500)" strokeWidth="1.5" />
    <path d="M3 17L17 3" stroke="var(--color-gray-500)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ state = 'default', helperText, placeholder = '기존 비밀번호를 입력해주세요.', onChange, className = '', ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const currentState = state !== 'default' ? state : focused ? 'focus' : 'default';

    const borderColor = {
      default: 'border-[var(--color-gray-disabled)]',
      focus: 'border-[var(--color-gray-primary)]',
      danger: 'border-[var(--color-danger)]',
      success: 'border-[var(--color-success)]',
    }[currentState];

    const helperColor = {
      default: 'text-[var(--color-gray-400)]',
      focus: 'text-[var(--color-gray-400)]',
      danger: 'text-[var(--color-danger)]',
      success: 'text-[var(--color-success)]',
    }[currentState];

    const showHelper = currentState !== 'default' || helperText;

    return (
      <div className={`flex flex-col gap-[8px] w-full ${className}`}>
        <div
          className={`flex items-center justify-between h-[48px] px-[16px] py-[10px] rounded-[4px] border ${borderColor} bg-white`}
        >
          <input
            ref={ref}
            type={visible ? 'text' : 'password'}
            placeholder={placeholder}
            value={props.value ?? value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              setValue(e.target.value);
              onChange?.(e.target.value);
            }}
            className="flex-1 bg-transparent outline-none font-normal text-[16px] leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-primary)] placeholder:text-[var(--color-gray-disabled)]"
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="shrink-0 ml-[8px] cursor-pointer"
            aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {visible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>
        {showHelper && (
          <p className={`text-[12px] leading-[1.4] tracking-[-0.36px] ${helperColor}`}>
            {helperText ?? '* 6~15자의 영문 대/소문자, 숫자 및 특수문자 조합'}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
