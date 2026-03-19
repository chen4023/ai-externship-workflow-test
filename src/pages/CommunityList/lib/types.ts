// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9801
// Figma-states: communityList

export interface CommunityPost {
  id: number;
  category: string;
  title: string;
  content: string;
  author: string;
  date: string;
  commentCount: number;
  viewCount: number;
  likeCount: number;
}

export interface CommunityPostsParams {
  category: string;
  searchType: string;
  searchQuery: string;
  sort: string;
  page: number;
  limit: number;
}

export interface CommunityPostsResponse {
  posts: CommunityPost[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
