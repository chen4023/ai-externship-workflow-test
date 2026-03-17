type NotFoundVariant = 'quiz' | 'qna' | 'community' | '404';

interface NotFoundProps {
  variant?: NotFoundVariant;
  className?: string;
}

const NotFoundIcon = () => (
  <svg width="72" height="66" viewBox="0 0 72 66" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="0" width="55" height="66" rx="4" fill="var(--color-gray-200)" />
    <path d="M20 22H50" stroke="var(--color-gray-disabled)" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 30H50" stroke="var(--color-gray-disabled)" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 14H28" stroke="var(--color-gray-disabled)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="52" cy="40" r="16" fill="var(--color-white)" stroke="var(--color-gray-disabled)" strokeWidth="2" />
    <path d="M63 51L70 58" stroke="var(--color-gray-disabled)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Error404Icon = () => (
  <svg width="72" height="56" viewBox="0 0 72 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="0" width="55" height="56" rx="4" fill="var(--color-gray-200)" />
    <text x="36" y="36" textAnchor="middle" fontSize="20" fontWeight="bold" fill="var(--color-gray-disabled)">404</text>
  </svg>
);

const MESSAGES: Record<NotFoundVariant, string> = {
  quiz: '아직 응시할 시험이 없어요.',
  qna: '아직 등록된 질문이 없어요\n궁금한 점을 남겨보세요!',
  community: '아직 올라온 글이 없어요\n첫 글을 남겨보세요!',
  '404': '페이지를 불러올 수 없어요\n잠시 뒤 다시 시도해보세요!',
};

export function NotFound({ variant = 'quiz', className = '' }: NotFoundProps) {
  return (
    <div className={`flex flex-col items-center gap-[20px] ${className}`}>
      {variant === '404' ? <Error404Icon /> : <NotFoundIcon />}
      <p className="text-[18px] leading-[1.4] tracking-[-0.54px] text-[var(--color-gray-primary)] text-center whitespace-pre-line">
        {MESSAGES[variant]}
      </p>
    </div>
  );
}
