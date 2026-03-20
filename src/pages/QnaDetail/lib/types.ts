// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-7081
// Figma-states: qnaDetail

export interface QnaAuthor {
  id: number;
  nickname: string;
  profile_image_url: string | null;
}

export interface QnaCategory {
  id: number;
  depth: number;
  names: string[];
}

export interface QnaImage {
  id: number;
  img_url: string;
}

export interface QnaComment {
  id: number;
  content: string;
  created_at: string;
  author: QnaAuthor;
}

export interface QnaAnswer {
  id: number;
  content: string;
  created_at: string;
  is_adopted: boolean;
  author: QnaAuthor;
  comments: QnaComment[];
}

export interface QnaDetailResponse {
  id: number;
  title: string;
  content: string;
  category: QnaCategory;
  images: QnaImage[];
  view_count: number;
  created_at: string;
  author: QnaAuthor;
  answers: QnaAnswer[];
}

export interface CreateAnswerRequest {
  content: string;
  image_urls?: string[];
}

export interface CreateAnswerResponse {
  answer_id: number;
  question_id: number;
  author_id: number;
  created_at: string;
}

export interface AcceptAnswerResponse {
  question_id: number;
  answer_id: number;
  is_adopted: boolean;
}

export interface CreateAnswerCommentRequest {
  content: string;
}

export interface CreateAnswerCommentResponse {
  comment_id: number;
  answer_id: number;
  author_id: number;
  created_at: string;
}
