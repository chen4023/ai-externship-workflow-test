// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5893&m=dev
// Figma-states: qnaList
import { useNavigate } from "react-router-dom";
import { CategoryTab, CategoryTabBar } from "../../shared/ui/CategoryTab/CategoryTab";
import { SearchInput } from "../../shared/ui/SearchInput/SearchInput";
import { SortModal } from "../../shared/ui/SortModal/SortModal";
import { QuestionCard } from "../../shared/ui/QuestionCard/QuestionCard";
import { Pagination } from "../../shared/ui/Pagination/Pagination";
import { Button } from "../../shared/ui/Button/Button";
import { NotFound } from "../../shared/ui/NotFound/NotFound";
import { Loading } from "../../shared/ui/Loading/Loading";
import { useQnaList } from "./model/useQnaList";
import { ANSWER_STATUS_TABS, SORT_OPTIONS } from "./lib/constants";
import { formatRelativeTime } from "./lib/formatRelativeTime";

export function QnaListPage() {
  const navigate = useNavigate();
  const {
    answerStatus,
    sortValue,
    searchKeyword,
    currentPage,
    questions,
    totalPages,
    isLoading,
    isError,
    setAnswerStatus,
    setSortValue,
    setSearchKeyword,
    clearSearch,
    setCurrentPage,
  } = useQnaList();

  return (
    <div className="flex flex-col gap-6 w-full max-w-content">
      {/* Title */}
      <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-primary">
        질의응답
      </h1>

      {/* Search + Create button */}
      <div className="flex items-center justify-between">
        <SearchInput
          placeholder="질문 검색"
          value={searchKeyword}
          onChange={setSearchKeyword}
          onClear={clearSearch}
          className="w-80"
        />
        <Button size="sm" onClick={() => navigate("/qna/new")}>
          질문하기
        </Button>
      </div>

      {/* Category Tabs + Sort */}
      <div className="flex items-center justify-between">
        <CategoryTabBar>
          {ANSWER_STATUS_TABS.map((tab) => (
            <CategoryTab
              key={tab.value}
              label={tab.label}
              active={answerStatus === tab.value}
              onClick={() => setAnswerStatus(tab.value)}
            />
          ))}
        </CategoryTabBar>
        <SortModal
          options={[...SORT_OPTIONS]}
          value={sortValue}
          onChange={setSortValue}
        />
      </div>

      {/* Question List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loading />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">질문 목록을 불러오는데 실패했습니다.</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <NotFound variant="qna" />
        </div>
      ) : (
        <div className="flex flex-col">
          {questions.map((q) => (
            <QuestionCard
              key={q.id}
              title={q.title}
              content={q.content_preview}
              author={q.author.nickname}
              date={formatRelativeTime(q.created_at)}
              answerCount={q.answer_count}
              profileSrc={q.author.profile_image_url ?? undefined}
              onClick={() => navigate(`/qna/${q.id}`)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {questions.length > 0 && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
