// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9801
// Figma-states: communityList

export const CATEGORIES = [
  "전체",
  "인기글",
  "공지사항",
  "자유게시판",
  "고민",
  "구인/채용",
  "자료 >",
] as const;

export const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "댓글많은순", value: "comments" },
] as const;

export const SEARCH_TYPE_OPTIONS = [
  { label: "검색 설정", value: "all" },
  { label: "제목", value: "title" },
  { label: "내용", value: "content" },
] as const;

export const ITEMS_PER_PAGE = 10;
