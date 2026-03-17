interface QuestionCardProps {
  title: string;
  content: string;
  author: string;
  date: string;
  answerCount?: number;
  profileSrc?: string;
  onClick?: () => void;
  className?: string;
}

const DefaultProfileIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="var(--color-gray-200)" />
    <circle cx="16" cy="13" r="5" fill="var(--color-gray-disabled)" />
    <path
      d="M6 28C6 22.5 10.5 18 16 18C21.5 18 26 22.5 26 28"
      fill="var(--color-gray-disabled)"
    />
  </svg>
);

export function QuestionCard({
  title,
  content,
  author,
  date,
  answerCount = 0,
  profileSrc,
  onClick,
  className = '',
}: QuestionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col w-full p-[24px] rounded-[4px] border border-[var(--color-gray-200)] bg-white text-left cursor-pointer transition-colors hover:bg-[var(--color-gray-100)] hover:border-[var(--color-gray-250)] ${className}`}
    >
      {/* Title */}
      <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-primary)] line-clamp-1">
        {title}
      </p>

      {/* Content preview */}
      <p className="mt-[8px] text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-500)] line-clamp-2">
        {content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-[16px] w-full">
        <div className="flex items-center gap-[8px]">
          {profileSrc ? (
            <img
              src={profileSrc}
              alt={author}
              className="w-[32px] h-[32px] rounded-full object-cover"
            />
          ) : (
            <DefaultProfileIcon />
          )}
          <span className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)]">
            {author}
          </span>
          <span className="text-[12px] leading-[1.4] tracking-[-0.36px] text-[var(--color-gray-400)]">
            {date}
          </span>
        </div>
        <span className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-400)]">
          답변 {answerCount}
        </span>
      </div>
    </button>
  );
}
