// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472
// Figma-states: communityDetail

export interface PostAuthor {
  id: number;
  nickname: string;
  profile_img_url: string;
}

export interface PostCategory {
  id: number;
  name: string;
}

export interface PostDetail {
  id: number;
  title: string;
  author: PostAuthor;
  category: PostCategory;
  content: string;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface CommentAuthor {
  id: number;
  nickname: string;
  profile_img_url: string;
}

export interface TaggedUser {
  id: number;
  nickname: string;
}

export interface Comment {
  id: number;
  author: CommentAuthor;
  tagged_users: TaggedUser[];
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CommentsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Comment[];
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}

export interface DeletePostResponse {
  detail: string;
}

export interface LikeResponse {
  detail: string;
}
