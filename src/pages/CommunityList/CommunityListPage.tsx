// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9801&m=dev
// Figma-states: communityList
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { SearchInput } from "../../shared/ui/SearchInput/SearchInput";
import { SortModal } from "../../shared/ui/SortModal/SortModal";
import { Pagination } from "../../shared/ui/Pagination/Pagination";
import { Button } from "../../shared/ui/Button/Button";
import { NotFound } from "../../shared/ui/NotFound/NotFound";

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "댓글많은순", value: "comments" },
  { label: "오래된순", value: "oldest" },
];

interface CommunityPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  commentCount: number;
}

const MOCK_POSTS: CommunityPost[] = [
  {
    id: 1,
    title: "프론트엔드 개발자 취업 준비 팁 공유합니다",
    content:
      "포트폴리오 준비부터 면접까지 제가 경험한 내용을 정리해봤습니다.",
    author: "김개발",
    date: "2025-03-15",
    commentCount: 12,
  },
  {
    id: 2,
    title: "React와 Next.js 중 어떤 걸 먼저 배워야 할까요?",
    content:
      "입문자인데 React를 먼저 익히는 게 좋을지 바로 Next.js로 가는 게 좋을지 고민입니다.",
    author: "이수강",
    date: "2025-03-14",
    commentCount: 8,
  },
  {
    id: 3,
    title: "스터디원 모집합니다 (알고리즘)",
    content:
      "매주 화/목 저녁 9시에 온라인으로 알고리즘 문제풀이 스터디 진행합니다.",
    author: "박코딩",
    date: "2025-03-13",
    commentCount: 5,
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
      className="flex flex-col w-full p-[24px] rounded-[4px] border border-[var(--color-gray-200)] bg-white text-left cursor-pointer transition-colors hover:bg-[var(--color-gray-100)] hover:border-[var(--color-gray-250)]"
    >
      <p className="text-[16px] font-semibold leading-[1.4] tracking-[-0.48px] text-[var(--color-gray-primary)] line-clamp-1">
        {post.title}
      </p>
      <p className="mt-[8px] text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-500)] line-clamp-2">
        {post.content}
      </p>
      <div className="flex items-center justify-between mt-[16px] w-full">
        <div className="flex items-center gap-[8px]">
          <div className="w-[32px] h-[32px] rounded-full bg-[var(--color-gray-200)]" />
          <span className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-600)]">
            {post.author}
          </span>
          <span className="text-[12px] leading-[1.4] tracking-[-0.36px] text-[var(--color-gray-400)]">
            {post.date}
          </span>
        </div>
        <span className="text-[14px] leading-[1.4] tracking-[-0.42px] text-[var(--color-gray-400)]">
          댓글 {post.commentCount}
        </span>
      </div>
    </button>
  );
}

export function CommunityListPage() {
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = MOCK_POSTS.filter((p) => {
    if (searchQuery.trim().length === 0) return true;
    return (
      p.title.includes(searchQuery) || p.content.includes(searchQuery)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-[40px]">
        <div className="flex flex-col gap-[24px] w-[1200px]">
          <div className="flex items-center justify-between">
            <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
              커뮤니티
            </h1>
            <Button size="sm" onClick={() => navigate("/community/new")}>
              글 작성하기
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <SearchInput
              placeholder="게시글 검색"
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              className="w-[320px]"
            />
            <SortModal
              options={SORT_OPTIONS}
              value={sortValue}
              onChange={setSortValue}
            />
          </div>

          {filteredPosts.length === 0 ? (
            <div className="flex items-center justify-center py-[80px]">
              <NotFound variant="community" />
            </div>
          ) : (
            <div className="flex flex-col gap-[12px]">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => navigate(`/community/${post.id}`)}
                />
              ))}
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="flex justify-center pt-[16px]">
              <Pagination
                currentPage={currentPage}
                totalPages={3}
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
