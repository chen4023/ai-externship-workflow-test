// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

interface PostContentProps {
  content: string;
  likeCount: number;
  viewCount: number;
  isLoggedIn: boolean;
  onLikeToggle: () => void;
  isLikeLoading: boolean;
}

export function PostContent({
  content,
  likeCount,
  viewCount,
  isLoggedIn,
  onLikeToggle,
  isLikeLoading,
}: PostContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-base leading-relaxed tracking-tight text-gray-700 min-h-50 whitespace-pre-wrap">
        {content}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onLikeToggle}
          disabled={!isLoggedIn || isLikeLoading}
          aria-label={`좋아요 ${likeCount}개`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <HeartIcon />
          <span>좋아요 {likeCount}</span>
        </button>
        <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
          <EyeIcon />
          <span>조회 {viewCount}</span>
        </span>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 15.75s-6.188-3.938-6.188-7.875a3.938 3.938 0 0 1 7.875-1.406h.626a3.938 3.938 0 0 1 7.874 1.406c0 3.938-6.187 7.875-6.187 7.875z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.125 9s2.813-5.625 7.875-5.625S16.875 9 16.875 9s-2.813 5.625-7.875 5.625S1.125 9 1.125 9z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="9"
        r="2.25"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
