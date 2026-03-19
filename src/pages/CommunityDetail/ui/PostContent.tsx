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
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <HeartIcon />
          <span>좋아요 {likeCount}</span>
        </button>
        <span className="inline-flex items-center gap-1 text-sm text-gray-500">
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
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 0 1 8 4.5 3.5 3.5 0 0 1 13.5 7C13.5 10.5 8 14 8 14z"
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
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="8"
        cy="8"
        r="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
