// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5893
// Figma-states: qnaList

import type { QnaQuestion } from "../lib/types";
import { formatRelativeTime } from "../lib/formatRelativeTime";

interface QuestionListCardProps {
  question: QnaQuestion;
  onClick: () => void;
}

export function QuestionListCard({ question, onClick }: QuestionListCardProps) {
  const breadcrumb = question.category.names.join(" > ");

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full p-6 rounded-xl text-left cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <div className="flex flex-col flex-1 min-w-0">
        {/* Category breadcrumb */}
        <span className="text-xs leading-snug tracking-tight text-gray-600 mb-1">
          {breadcrumb}
        </span>

        {/* Title */}
        <p className="text-lg font-semibold leading-snug tracking-tight text-gray-primary line-clamp-1">
          {question.title}
        </p>

        {/* Content preview */}
        {question.content_preview && (
          <p className="mt-1 text-sm leading-snug tracking-tight text-gray-400 line-clamp-1">
            {question.content_preview}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 w-full">
          <div className="flex items-center gap-3 text-xs leading-snug tracking-tight text-gray-500">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 3.94 1 5.282v5.436c0 1.342.993 2.527 2.43 2.758.474.076.951.14 1.43.191l-.018 2.834a.75.75 0 0 0 1.213.593l3.637-2.852c.256-.017.512-.039.767-.066 1.437-.231 2.43-1.416 2.43-2.758V5.282c0-1.342-.993-2.527-2.43-2.758A41 41 0 0 0 10 2Z"
                  clipRule="evenodd"
                />
              </svg>
              {question.answer_count}
            </span>
            <span>
              {question.view_count}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-disabled overflow-hidden shrink-0">
              {question.author.profile_image_url && (
                <img
                  src={question.author.profile_image_url}
                  alt={`${question.author.nickname} 프로필`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="text-xs leading-snug tracking-tight text-gray-500">
              {question.author.nickname}
            </span>
            <span className="text-xs leading-snug tracking-tight text-gray-400">
              {formatRelativeTime(question.created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      {question.thumbnail_img_url && (
        <div className="ml-6 shrink-0">
          <img
            src={question.thumbnail_img_url}
            alt={`${question.title} 썸네일`}
            className="w-57 h-40 rounded-lg object-cover"
          />
        </div>
      )}
    </button>
  );
}
