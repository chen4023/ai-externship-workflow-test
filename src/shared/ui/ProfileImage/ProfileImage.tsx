interface ProfileImageProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-[32px] h-[32px]',
  md: 'w-[40px] h-[40px]',
  lg: 'w-[64px] h-[64px]',
} as const;

const DefaultProfileIcon = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
  const dim = { sm: 32, md: 40, lg: 64 }[size];
  const headR = { sm: 5, md: 6, lg: 10 }[size];
  const headY = { sm: 12, md: 15, lg: 24 }[size];
  const half = dim / 2;

  return (
    <svg
      width={dim}
      height={dim}
      viewBox={`0 0 ${dim} ${dim}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={half} cy={half} r={half} fill="var(--color-gray-200)" />
      <circle
        cx={half}
        cy={headY}
        r={headR}
        fill="var(--color-gray-disabled)"
      />
      <ellipse
        cx={half}
        cy={dim}
        rx={half * 0.7}
        ry={half * 0.4}
        fill="var(--color-gray-disabled)"
      />
    </svg>
  );
};

export function ProfileImage({
  src,
  alt = '프로필',
  size = 'md',
  className = '',
}: ProfileImageProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${SIZE_MAP[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`${SIZE_MAP[size]} rounded-full overflow-hidden ${className}`}
      aria-label={alt}
    >
      <DefaultProfileIcon size={size} />
    </div>
  );
}
