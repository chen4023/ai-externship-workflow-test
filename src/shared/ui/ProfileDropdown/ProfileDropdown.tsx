import { useState, useRef, useEffect } from 'react';

type ProfileDropdownVariant = 'unregistered' | 'registered';

interface ProfileMenuItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface ProfileDropdownProps {
  variant?: ProfileDropdownVariant;
  profileSrc?: string;
  userName?: string;
  menuItems: ProfileMenuItem[];
  className?: string;
}

const DefaultProfileIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill="var(--color-gray-200)" />
    <circle cx="20" cy="15" r="6" fill="var(--color-gray-disabled)" />
    <ellipse cx="20" cy="40" rx="14" ry="8" fill="var(--color-gray-disabled)" />
  </svg>
);

export function ProfileDropdown({
  variant = 'registered',
  profileSrc,
  userName,
  menuItems,
  className = '',
}: ProfileDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer"
        aria-label="프로필 메뉴"
        aria-expanded={open}
      >
        {profileSrc ? (
          <img
            src={profileSrc}
            alt="프로필"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        ) : (
          <DefaultProfileIcon />
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-[8px] w-[200px] bg-white border border-[var(--color-gray-200)] rounded-[8px] py-[8px] shadow-[0_4px_12px_0_color-mix(in_srgb,var(--color-gray-primary)_10%,transparent)] z-20">
          {/* User info section */}
          {variant === 'registered' && userName && (
            <div className="px-[16px] py-[12px] border-b border-[var(--color-gray-200)]">
              <p className="text-[14px] font-semibold leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-primary)]">
                {userName}
              </p>
            </div>
          )}

          {/* Menu items */}
          <div className="py-[4px]">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className={`flex items-center w-full px-[16px] py-[10px] text-[14px] leading-[1.4] tracking-[-0.42px] cursor-pointer transition-colors hover:bg-[var(--color-gray-100)] ${
                  item.danger
                    ? 'text-[var(--color-danger)]'
                    : 'text-[var(--color-gray-primary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
