interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const ArrowIcon = ({ direction, disabled }: { direction: 'first' | 'prev' | 'next' | 'last'; disabled: boolean }) => {
  const color = disabled ? 'var(--color-gray-disabled)' : 'var(--color-gray-primary)';
  const isDouble = direction === 'first' || direction === 'last';
  const isForward = direction === 'next' || direction === 'last';

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      {isDouble ? (
        <>
          <path
            d={isForward ? 'M6 5L11 10L6 15' : 'M14 5L9 10L14 15'}
            stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
          <path
            d={isForward ? 'M10 5L15 10L10 15' : 'M10 5L5 10L10 15'}
            stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </>
      ) : (
        <path
          d={isForward ? 'M8 5L13 10L8 15' : 'M12 5L7 10L12 15'}
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  const getPageRange = (): number[] => {
    const maxVisible = 10;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className={`flex items-center gap-[8px] ${className}`} aria-label="페이지네이션">
      <div className="flex items-center">
        <button type="button" disabled={isFirst} onClick={() => onPageChange(1)} className="cursor-pointer disabled:cursor-not-allowed" aria-label="첫 페이지">
          <ArrowIcon direction="first" disabled={isFirst} />
        </button>
        <button type="button" disabled={isFirst} onClick={() => onPageChange(currentPage - 1)} className="cursor-pointer disabled:cursor-not-allowed" aria-label="이전 페이지">
          <ArrowIcon direction="prev" disabled={isFirst} />
        </button>
      </div>

      <div className="flex items-center gap-[6px]">
        {getPageRange().map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center w-[32px] h-[32px] rounded-[4px] text-[14px] tracking-[-0.42px] cursor-pointer transition-colors ${
              page === currentPage
                ? 'bg-[var(--color-primary)] text-white font-semibold'
                : 'text-[var(--color-gray-primary)] hover:bg-[var(--color-gray-100)]'
            }`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="flex items-center">
        <button type="button" disabled={isLast} onClick={() => onPageChange(currentPage + 1)} className="cursor-pointer disabled:cursor-not-allowed" aria-label="다음 페이지">
          <ArrowIcon direction="next" disabled={isLast} />
        </button>
        <button type="button" disabled={isLast} onClick={() => onPageChange(totalPages)} className="cursor-pointer disabled:cursor-not-allowed" aria-label="마지막 페이지">
          <ArrowIcon direction="last" disabled={isLast} />
        </button>
      </div>
    </nav>
  );
}
