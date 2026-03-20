interface ProfileImageProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-[32px] h-[32px]',
  md: 'w-[40px] h-[40px]',
  lg: 'w-[64px] h-[64px]',
  xl: 'w-[48px] h-[48px]',
} as const;

type ProfileSize = 'sm' | 'md' | 'lg' | 'xl';

const DIMS: Record<ProfileSize, number> = { sm: 32, md: 40, lg: 64, xl: 48 };
const HEAD_R: Record<ProfileSize, number> = { sm: 5, md: 6, lg: 10, xl: 8 };
const HEAD_Y: Record<ProfileSize, number> = { sm: 12, md: 15, lg: 24, xl: 18 };

const DefaultProfileIcon = ({ size }: { size: ProfileSize }) => {
  const dim = DIMS[size];
  const headR = HEAD_R[size];
  const headY = HEAD_Y[size];
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
