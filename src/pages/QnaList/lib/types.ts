// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5893
// Figma-states: qnaList

export interface QnaCategory {
  id: number;
  depth: number;
  names: string[];
}

export interface QnaAuthor {
  id: number;
  nickname: string;
  profile_image_url: string | null;
}

export interface QnaQuestion {
  id: number;
  category: QnaCategory;
  author: QnaAuthor;
  title: string;
  content_preview: string;
  answer_count: number;
  view_count: number;
  created_at: string;
  thumbnail_img_url: string | null;
}

export interface QnaListParams {
  page: number;
  size: number;
  search_keyword: string;
  answer_status: string;
  sort: string;
}

export interface QnaListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: QnaQuestion[];
}
