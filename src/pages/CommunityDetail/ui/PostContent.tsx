// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

interface PostContentProps {
  content: string;
  likeCount: number;
  isLoggedIn: boolean;
  onLikeToggle: () => void;
  isLikeLoading: boolean;
}

export function PostContent({
  content,
  likeCount,
  isLoggedIn,
  onLikeToggle,
  isLikeLoading,
}: PostContentProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* 본문 */}
      <div className="text-base leading-relaxed tracking-tight text-gray-primary min-h-14 whitespace-pre-wrap">
        {content}
      </div>

      {/* 액션 버튼 (우측 정렬) */}
      <div className="flex flex-col gap-6 items-end">
        <div className="flex items-start gap-3">
          {/* 좋아요 버튼 (pill) */}
          <button
            type="button"
            onClick={onLikeToggle}
            disabled={!isLoggedIn || isLikeLoading}
            aria-label={`좋아요 ${likeCount}개`}
            className="inline-flex items-center gap-1 px-4 py-2.5 rounded-full border border-gray-250 text-xs leading-snug tracking-tight text-gray-500 hover:border-primary hover:text-primary transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ThumbsUpIcon />
            <span>{likeCount}</span>
          </button>

          {/* 공유하기 버튼 (pill) */}
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="inline-flex items-center gap-1 px-3 py-2.5 rounded-full border border-gray-250 text-xs leading-snug tracking-tight text-gray-500 hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <LinkIcon />
            <span>공유하기</span>
          </button>
        </div>

        {/* 구분선 */}
        <div className="w-full h-px bg-gray-250" />
      </div>
    </div>
  );
}

function ThumbsUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5.25 8.25L7.5 1.5a2.25 2.25 0 0 1 2.25 2.25V6h4.14a1.5 1.5 0 0 1 1.48 1.747l-1.02 6a1.5 1.5 0 0 1-1.48 1.253H5.25m0-6.75v6.75m0-6.75H3a1.5 1.5 0 0 0-1.5 1.5v3.75A1.5 1.5 0 0 0 3 15h2.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.5 10.5a3.75 3.75 0 0 0 5.303 0l2.25-2.25a3.75 3.75 0 0 0-5.303-5.303L8.625 4.072" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 7.5a3.75 3.75 0 0 0-5.303 0l-2.25 2.25a3.75 3.75 0 0 0 5.303 5.303l1.125-1.125" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
