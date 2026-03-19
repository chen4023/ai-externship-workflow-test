// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9801
// Figma-states: communityList

import type { CommunityPost } from '../lib/types';

interface PostCardProps {
  post: CommunityPost;
  onClick: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col w-full py-6 border-b border-gray-200 text-left cursor-pointer"
    >
      <span className="text-xs leading-snug tracking-tight text-gray-400 mb-1">
        {post.category}
      </span>
      <p className="text-base font-semibold leading-snug tracking-tight text-gray-primary line-clamp-1">
        {post.title}
      </p>
      {post.content && (
        <p className="mt-1 text-sm leading-snug tracking-tight text-gray-500 line-clamp-1">
          {post.content}
        </p>
      )}
      <div className="flex items-center justify-between mt-3 w-full">
        <div className="flex items-center gap-4 text-xs leading-snug tracking-tight text-gray-400">
          <span>좋아요 {post.likeCount}</span>
          <span>댓글 {post.commentCount}</span>
          <span>조회수 {post.viewCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <span className="text-xs leading-snug tracking-tight text-gray-500">
            {post.author}
          </span>
          <span className="text-xs leading-snug tracking-tight text-gray-400">
            {post.date}
          </span>
        </div>
      </div>
    </button>
  );
}
