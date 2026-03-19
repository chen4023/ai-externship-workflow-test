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
      className="flex w-full p-6 rounded-xl text-left cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-xs leading-snug tracking-tight text-gray-600 mb-1">
          {post.category}
        </span>
        <p className="text-lg font-semibold leading-snug tracking-tight text-gray-primary line-clamp-1">
          {post.title}
        </p>
        {post.content && (
          <p className="mt-1 text-sm leading-snug tracking-tight text-gray-500 line-clamp-1">
            {post.content}
          </p>
        )}
        <div className="flex items-center justify-between mt-3 w-full">
          <div className="flex items-center gap-3 text-xs leading-snug tracking-tight text-gray-500">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3c-1.007 0-1.56.724-1.774 1.236a3.1 3.1 0 0 0-.226 1.14V6.5H5.545a2.5 2.5 0 0 0-2.476 2.84l.94 7.5A2.5 2.5 0 0 0 6.485 19h7.266a2.5 2.5 0 0 0 2.5-2.5V8a2.5 2.5 0 0 0-2.5-2.5h-1.626V4.376c0-.597-.268-1.17-.632-1.573C11.133 2.42 10.614 2 10 2h1Z" />
              </svg>
              {post.likeCount}
            </span>
            <span>댓글 {post.commentCount}</span>
            <span>조회수 {post.viewCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden shrink-0">
              {post.profileImageUrl && (
                <img
                  src={post.profileImageUrl}
                  alt={`${post.author} 프로필`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="text-xs leading-snug tracking-tight text-gray-500">
              {post.author}
            </span>
            <span className="text-xs leading-snug tracking-tight text-gray-400">
              {post.date}
            </span>
          </div>
        </div>
      </div>
      {post.thumbnailUrl && (
        <div className="ml-6 shrink-0">
          <img
            src={post.thumbnailUrl}
            alt={`${post.title} 썸네일`}
            className="w-57 h-40 rounded-lg object-cover"
          />
        </div>
      )}
    </button>
  );
}
