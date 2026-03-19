// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

import { ProfileImage } from '../../../shared/ui/ProfileImage/ProfileImage';
import { Button } from '../../../shared/ui/Button/Button';
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
          <div className="flex flex-col">
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
            <Button variant="ghost" size="sm" onClick={onEdit}>
              수정
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              삭제
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
