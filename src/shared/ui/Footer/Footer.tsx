import type { ReactNode } from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  logoSrc?: string;
  campLinks?: { label: string; href: string }[];
  policyLinks?: FooterLink[];
  socialLinks?: SocialLink[];
  className?: string;
}

const DEFAULT_CAMP_LINKS = [
  { label: '초격차캠프', href: '#' },
  { label: '사업개발캠프', href: '#' },
  { label: '프로덕트 디자이너 캠프', href: '#' },
];

const DEFAULT_POLICY_LINKS: FooterLink[] = [
  { label: '개인정보처리방침', href: '#' },
  { label: '이용약관', href: '#' },
  { label: '멘토링&강사지원', href: '#' },
];

export function Footer({
  logoSrc,
  campLinks = DEFAULT_CAMP_LINKS,
  policyLinks = DEFAULT_POLICY_LINKS,
  socialLinks = [],
  className = '',
}: FooterProps) {
  return (
    <footer className={`w-full bg-[var(--color-gray-800)] px-[360px] py-[80px] ${className}`}>
      <div className="flex flex-col gap-[37px] w-full">
        {/* Top section */}
        <div className="flex flex-col gap-[40px]">
          {/* Logo + Camp links */}
          <div className="flex flex-col gap-[40px] w-[159px]">
            {logoSrc ? (
              <img src={logoSrc} alt="오즈코딩스쿨" className="w-full" />
            ) : (
              <p className="font-bold text-[18px] text-[var(--color-white)]">OZ 오즈코딩스쿨</p>
            )}
            <div className="flex flex-col gap-[24px]">
              {campLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[18px] leading-[1.4] tracking-[-0.54px] text-[var(--color-gray-250)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Policy links + Social */}
          <div className="flex items-end justify-between w-full border-t border-[var(--color-gray-500)] pt-[40px]">
            <div className="flex items-center gap-[28px]">
              {policyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[16px] leading-[1.4] tracking-[-0.48px] text-[var(--color-white)] underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-[12px]">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} aria-label={social.label} className="w-[24px] h-[24px]">
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Company info */}
        <div className="flex flex-col gap-[16px] text-[16px] leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-400)]">
          <p>대표자 : 이한별 | 사업자 등록번호 : 540-86-00384 | 통신판매업 신고번호 : 2020-경기김포-3725호</p>
          <p>주소 : 경기도 김포시 사우중로 87 201호 | 이메일 : kdigital@nextrunners.co.kr | 전화 : 070-4099-8219</p>
        </div>
      </div>
    </footer>
  );
}
