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

const CATEGORIES = ["전체보기", "답변완료", "답변 대기중"];

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "횟수 순", value: "count" },
];

const MOCK_QUESTIONS = [
  {
    id: 1,
    title: "오류가 발생했다고 뜨네요.",
    content:
      "터미널에, 실행 했을때가?발생합니다.(&node.js에서 찾아낸것을 할 수있 가 발생한다는 화면에 보이비 File 'main.py', line 2, 이건 좀 직접적이지요?",
    author: "김멘토",
    date: "2시간 전",
    answerCount: 2,
  },
  {
    id: 2,
    title: "new 함수를 써야 하는 실행 에시에 대해서",
    content:
      "함수안 void를 시기이면 같이 있는 코드가 어떤것을 의미하는 것인지, 모든 일을 아는 것과 사용할때와 시사이와 다닌다. 어떤 이유로 만들어지려면?",
    author: "이수강",
    date: "2시간 전",
    answerCount: 1,
  },
  {
    id: 3,
    title: "오류가 발생했다고 뜨네요.",
    content:
      "터미널에, 실행 했을때가?발생합니다.(&node.js에서 찾아낸것을 할 수있 가 발생한다는 화면에 보이비 File 'main.py', line 2, 이건 좀 직접적이지요?",
    author: "박개발",
    date: "3시간 전",
    answerCount: 2,
  },
];

export function QnaListPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("전체보기");
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
      <main className="flex-1 flex justify-center py-10">
        <div className="flex flex-col gap-6 w-300">
          {/* Title row */}
          <h1 className="text-2xl font-bold leading-[1.4] tracking-tight text-gray-primary">
            질의응답
          </h1>

          {/* Search + Create button */}
          <div className="flex items-center justify-between">
            <SearchInput
              placeholder="질문 검색"
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              className="w-80"
            />
            <Button size="sm" onClick={() => navigate("/qna/new")}>
              질문하기
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

          {/* Question List */}
          {filteredQuestions.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <NotFound variant="qna" />
            </div>
          ) : (
            <div className="flex flex-col">
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
            <div className="flex justify-center pt-4">
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
