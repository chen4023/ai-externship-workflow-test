import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const go = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };
  return (
    <header className={`flex flex-col items-start w-full ${className}`}>
      {/* Top banner */}
      <div className="flex items-center justify-center w-full h-12 bg-gray-800 px-2.5">
        <p className="text-base text-white whitespace-nowrap">
          🚨 선착순 모집! 국비지원 받고 4주 완성
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center w-full h-16 bg-white border-b border-black/20">
        <div className="flex items-center justify-between w-300">
          {/* Logo + Nav links */}
          <div className="flex items-center gap-15">
            {logoSrc ? (
              <button type="button" onClick={() => go('/')} className="cursor-pointer">
                <img src={logoSrc} alt="오즈코딩스쿨" className="h-5 w-auto" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => go('/')}
                className="font-bold text-xl text-gray-primary cursor-pointer"
              >
                OZ 오즈코딩스쿨
              </button>
            )}
            <nav className="flex items-center gap-15">
              <button
                type="button"
                onClick={() => go('/community')}
                className="text-lg leading-snug tracking-tight text-gray-primary p-2.5 cursor-pointer"
              >
                커뮤니티
              </button>
              <button
                type="button"
                onClick={() => go('/qna')}
                className="text-lg leading-snug tracking-tight text-gray-primary p-2.5 cursor-pointer"
              >
                질의응답
              </button>
            </nav>
          </div>

          {/* Right section */}
          <div className="flex items-center">
            {variant === 'guest' ? (
              <div className="flex items-center gap-3 text-base tracking-tight text-gray-600 p-2">
                <button type="button" onClick={onLogin ?? (() => go('/login'))} className="cursor-pointer">
                  로그인
                </button>
                <span>|</span>
                <button type="button" onClick={onSignup ?? (() => go('/signup'))} className="cursor-pointer">
                  회원가입
                </button>
              </div>
            ) : (
              <div className="relative">
                <button type="button" onClick={onProfileClick} className="cursor-pointer">
                  {profileSrc ? (
                    <img src={profileSrc} alt="프로필" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
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
