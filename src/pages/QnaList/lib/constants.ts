// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5893
// Figma-states: qnaList

export const ANSWER_STATUS_TABS = [
  { label: "전체보기", value: "all" },
  { label: "답변완료", value: "answered" },
  { label: "답변 대기중", value: "unanswered" },
] as const;

export const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "횟수 순", value: "count" },
] as const;

export const ITEMS_PER_PAGE = 10;
