// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5893&m=dev
// Figma-states: qnaList
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/ui/Header/Header";
import { Footer } from "../../shared/ui/Footer/Footer";
import { CategoryTab, CategoryTabBar } from "../../shared/ui/CategoryTab/CategoryTab";
import { SearchInput } from "../../shared/ui/SearchInput/SearchInput";
import { SortModal } from "../../shared/ui/SortModal/SortModal";
import { QuestionCard } from "../../shared/ui/QuestionCard/QuestionCard";
import { Pagination } from "../../shared/ui/Pagination/Pagination";
import { Button } from "../../shared/ui/Button/Button";
import { NotFound } from "../../shared/ui/NotFound/NotFound";

const CATEGORIES = ["전체", "HTML/CSS", "JavaScript", "React", "Python", "기타"];

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "답변많은순", value: "answers" },
  { label: "오래된순", value: "oldest" },
];

const MOCK_QUESTIONS = [
  {
    id: 1,
    title: "React useEffect 클린업 함수는 언제 실행되나요?",
    content:
      "useEffect 안에서 return 하는 함수가 언제 호출되는지 정확히 알고 싶습니다. 컴포넌트가 언마운트될 때만인가요?",
    author: "김수강",
    date: "2025-03-15",
    answerCount: 3,
  },
  {
    id: 2,
    title: "TypeScript에서 제네릭은 어떤 경우에 사용하나요?",
    content:
      "제네릭의 실무 활용 사례가 궁금합니다. 간단한 예시도 부탁드립니다.",
    author: "이학생",
    date: "2025-03-14",
    answerCount: 5,
  },
  {
    id: 3,
    title: "CSS Grid와 Flexbox 중 어떤 것을 사용해야 하나요?",
    content:
      "레이아웃을 잡을 때 Grid와 Flexbox를 언제 사용하는지 기준이 궁금합니다.",
    author: "박개발",
    date: "2025-03-13",
    answerCount: 2,
  },
];

export function QnaListPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortValue, setSortValue] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredQuestions = MOCK_QUESTIONS.filter((q) => {
    if (searchQuery.trim().length === 0) return true;
    return (
      q.title.includes(searchQuery) || q.content.includes(searchQuery)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="registered" />
      <main className="flex-1 flex justify-center py-[40px]">
        <div className="flex flex-col gap-[24px] w-[1200px]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-[24px] font-bold leading-[1.4] tracking-[-0.72px] text-[var(--color-gray-primary)]">
              질의응답
            </h1>
            <Button size="sm" onClick={() => navigate("/qna/new")}>
              질문하기
            </Button>
          </div>

          {/* Category Tabs */}
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

          {/* Search + Sort */}
          <div className="flex items-center justify-between">
            <SearchInput
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

          {/* Question List */}
          {filteredQuestions.length === 0 ? (
            <div className="flex items-center justify-center py-[80px]">
              <NotFound variant="qna" />
            </div>
          ) : (
            <div className="flex flex-col gap-[12px]">
              {filteredQuestions.map((q) => (
                <QuestionCard
                  key={q.id}
                  title={q.title}
                  content={q.content}
                  author={q.author}
                  date={q.date}
                  answerCount={q.answerCount}
                  onClick={() => navigate(`/qna/${q.id}`)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredQuestions.length > 0 && (
            <div className="flex justify-center pt-[16px]">
              <Pagination
                currentPage={currentPage}
                totalPages={5}
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
