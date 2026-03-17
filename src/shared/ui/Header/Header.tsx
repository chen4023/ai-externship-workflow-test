import type { ReactNode } from 'react';

type HeaderVariant = 'guest' | 'unregistered' | 'registered';

interface HeaderProps {
  variant?: HeaderVariant;
  logoSrc?: string;
  profileSrc?: string;
  onLogin?: () => void;
  onSignup?: () => void;
  onProfileClick?: () => void;
  onNavigate?: (path: string) => void;
  profileMenu?: ReactNode;
  className?: string;
}

export function Header({
  variant = 'guest',
  logoSrc,
  profileSrc,
  onLogin,
  onSignup,
  onProfileClick,
  onNavigate,
  profileMenu,
  className = '',
}: HeaderProps) {
  return (
    <header className={`flex flex-col items-start w-full ${className}`}>
      {/* Top banner */}
      <div className="flex items-center justify-center w-full h-[48px] bg-[var(--color-gray-800)] px-[10px]">
        <p className="text-[16px] text-[var(--color-white)] whitespace-nowrap">
          🚨 선착순 모집! 국비지원 받고 4주 완성
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center w-full h-[64px] bg-[var(--color-white)] border-b border-black/20 px-[360px]">
        <div className="flex items-center justify-between w-[1200px]">
          {/* Logo + Nav links */}
          <div className="flex items-center gap-[60px]">
            {logoSrc ? (
              <button type="button" onClick={() => onNavigate?.('/')} className="cursor-pointer">
                <img src={logoSrc} alt="오즈코딩스쿨" className="h-[20px] w-auto" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate?.('/')}
                className="font-bold text-[20px] text-[var(--color-gray-primary)] cursor-pointer"
              >
                OZ 오즈코딩스쿨
              </button>
            )}
            <nav className="flex items-center gap-[60px]">
              <button
                type="button"
                onClick={() => onNavigate?.('/community')}
                className="text-[18px] leading-[1.4] tracking-[-0.54px] text-[var(--color-gray-primary)] p-[10px] cursor-pointer"
              >
                커뮤니티
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('/qna')}
                className="text-[18px] leading-[1.4] tracking-[-0.54px] text-[var(--color-gray-primary)] p-[10px] cursor-pointer"
              >
                질의응답
              </button>
            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center">
            {variant === 'guest' ? (
              <div className="flex items-center gap-[12px] text-[16px] tracking-[-0.32px] text-[var(--color-gray-600)] p-[8px]">
                <button type="button" onClick={onLogin} className="cursor-pointer">
                  로그인
                </button>
                <span>|</span>
                <button type="button" onClick={onSignup} className="cursor-pointer">
                  회원가입
                </button>
              </div>
            ) : (
              <div className="relative">
                <button type="button" onClick={onProfileClick} className="cursor-pointer">
                  {profileSrc ? (
                    <img src={profileSrc} alt="프로필" className="w-[40px] h-[40px] rounded-full object-cover" />
                  ) : (
                    <div className="w-[40px] h-[40px] rounded-full bg-[var(--color-gray-200)]" />
                  )}
                </button>
                {profileMenu}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
