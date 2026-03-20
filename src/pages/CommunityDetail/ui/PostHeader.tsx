// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

import { ProfileImage } from '../../../shared/ui/ProfileImage/ProfileImage';
import type { PostDetail } from '../lib/types';

interface PostHeaderProps {
  post: PostDetail;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function PostHeader({
  post,
  isAuthor,
  onEdit,
  onDelete,
}: PostHeaderProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium leading-snug tracking-tight text-primary">
          {post.category.name}
        </span>
      </div>

      <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
        {post.title}
      </h1>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProfileImage
            src={post.author.profile_img_url}
            alt={`${post.author.nickname} 프로필`}
            size="md"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold leading-snug tracking-tight text-gray-primary">
              {post.author.nickname}
            </span>
            <span className="text-xs leading-snug tracking-tight text-gray-400">
              {formattedDate}
            </span>
          </div>
        </div>
        {isAuthor && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="text-sm leading-snug tracking-tight text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            >
              수정
            </button>
            <span className="text-gray-250">|</span>
            <button
              type="button"
              onClick={onDelete}
              className="text-sm leading-snug tracking-tight text-gray-400 hover:text-danger cursor-pointer transition-colors"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
