// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9801&m=dev
// Figma-states: communityList
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { CategoryTab, CategoryTabBar } from "../../shared/ui/CategoryTab/CategoryTab";
import { SearchInput } from "../../shared/ui/SearchInput/SearchInput";
import { SortModal } from "../../shared/ui/SortModal/SortModal";
import { Pagination } from "../../shared/ui/Pagination/Pagination";
import { Dropdown } from "../../shared/ui/Dropdown/Dropdown";
import { Button } from "../../shared/ui/Button/Button";
import { NotFound } from "../../shared/ui/NotFound/NotFound";

const CATEGORIES = [
  "전체", "인기글", "공지사항", "자유게시판", "고민", "구인/채용", "자료 >",
];

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "댓글많은순", value: "comments" },
];

const SEARCH_TYPE_OPTIONS = [
  { label: "검색 설정", value: "all" },
  { label: "제목", value: "title" },
  { label: "내용", value: "content" },
];

interface CommunityPost {
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

const MOCK_POSTS: CommunityPost[] = [
  {
    id: 1,
    category: "구인/채용",
    title: "데이터 분석 프로젝트 구합니다",
    content: "HR 관련 프로젝트를 하고 싶은 프로젝트를 하는 분이 있으면 편하게 연락주세요~",
    author: "홍길동",
    date: "14시간 전",
    commentCount: 7,
    viewCount: 180,
    likeCount: 0,
  },
  {
    id: 2,
    category: "자유게시판",
    title: "러닝 페이스 잡혀요.",
    content: "https://www.codeit.kr/codin.kr/join/6964a20b7515052a44021a177원상 발급해드...",
    author: "김멘토",
    date: "14시간 전",
    commentCount: 2,
    viewCount: 35,
    likeCount: 0,
  },
  {
    id: 3,
    category: "자유게시판",
    title: "월요일 파이팅..",
    content: "",
    author: "HG",
    date: "14시간 전",
    commentCount: 2,
    viewCount: 35,
    likeCount: 0,
  },
];

function PostCard({
  post,
  onClick,
}: {
  post: CommunityPost;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col w-full py-6 border-b border-gray-200 text-left cursor-pointer"
    >
      <span className="text-xs leading-[1.4] tracking-tight text-gray-400 mb-1">
        {post.category}
      </span>
      <p className="text-base font-semibold leading-[1.4] tracking-tight text-gray-primary line-clamp-1">
        {post.title}
      </p>
      {post.content && (
        <p className="mt-1 text-sm leading-[1.4] tracking-tight text-gray-500 line-clamp-1">
          {post.content}
        </p>
      )}
      <div className="flex items-center justify-between mt-3 w-full">
        <div className="flex items-center gap-4 text-xs leading-[1.4] tracking-tight text-gray-400">
          <span>좋아요 {post.likeCount}</span>
          <span>댓글 {post.commentCount}</span>
          <span>조회수 {post.viewCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <span className="text-xs leading-[1.4] tracking-tight text-gray-500">
            {post.author}
          </span>
          <span className="text-xs leading-[1.4] tracking-tight text-gray-400">
            {post.date}
          </span>
        </div>
      </div>
    </button>
  );
}

export function CommunityListPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortValue, setSortValue] = useState("latest");
  const [searchType, setSearchType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = MOCK_POSTS.filter((p) => {
    if (searchQuery.trim().length === 0) return true;
    return p.title.includes(searchQuery) || p.content.includes(searchQuery);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-10">
        <div className="flex flex-col gap-6 w-300">
          {/* Title */}
          <h1 className="text-2xl font-bold leading-[1.4] tracking-tight text-gray-primary">
            커뮤니티
          </h1>

          {/* Search row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dropdown
                options={SEARCH_TYPE_OPTIONS}
                value={searchType}
                onChange={setSearchType}
                className="w-28"
              />
              <SearchInput
                placeholder="게시글 검색"
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery("")}
                className="w-80"
              />
            </div>
            <Button size="sm" onClick={() => navigate("/community/new")}>
              글쓰기
            </Button>
          </div>

          {/* Category Tabs + Sort */}
          <div className="flex items-center justify-between">
            <CategoryTabBar>
              {CATEGORIES.map((cat) => (
                <CategoryTab
                  key={cat}
                  label={cat}
                  active={activeCategory === cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                />
              ))}
            </CategoryTabBar>
            <SortModal
              options={SORT_OPTIONS}
              value={sortValue}
              onChange={setSortValue}
            />
          </div>

          {/* Post List */}
          {filteredPosts.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <NotFound variant="community" />
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/community/${post.id}`)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
