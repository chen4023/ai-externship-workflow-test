import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
} from 'react';

type InputState = 'default' | 'focus' | 'filled' | 'check' | 'danger' | 'disabled';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  state?: InputState;
  dangerText?: string;
  onChange?: (value: string) => void;
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 8.5L6 12.5L14 4.5" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ state: controlledState, dangerText, placeholder = 'Placeholder', onChange, disabled, className = '', ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const isDisabled = disabled || controlledState === 'disabled';
    const currentState = controlledState ?? (focused ? 'focus' : value ? 'filled' : 'default');

    const borderColor = {
      default: 'border-[var(--color-gray-disabled)]',
      focus: 'border-[var(--color-primary)]',
      filled: 'border-[var(--color-gray-disabled)]',
      check: 'border-[var(--color-success)]',
      danger: 'border-[var(--color-danger)]',
      disabled: 'border-[var(--color-gray-disabled)]',
    }[currentState];

    const textColor = ['default', 'disabled'].includes(currentState)
      ? 'text-[var(--color-gray-disabled)]'
      : 'text-[var(--color-gray-primary)]';

    return (
      <div className={`flex flex-col gap-[5px] w-full ${className}`}>
        <div
          className={`flex items-center h-[48px] px-[16px] py-[10px] rounded-[4px] border ${borderColor} ${
            isDisabled ? 'bg-[var(--color-gray-200)]' : 'bg-white'
          }`}
        >
          <input
            ref={ref}
            type="text"
            disabled={isDisabled}
            placeholder={placeholder}
            value={props.value ?? value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              setValue(e.target.value);
              onChange?.(e.target.value);
            }}
            className={`flex-1 bg-transparent outline-none font-normal text-[14px] tracking-[-0.42px] placeholder:text-[var(--color-gray-disabled)] ${textColor}`}
            {...props}
          />
          {currentState === 'check' && <CheckIcon />}
        </div>
        {currentState === 'danger' && dangerText && (
          <p className="text-[var(--color-danger)] text-[12px] leading-[1.4] tracking-[-0.36px]">
            {dangerText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
