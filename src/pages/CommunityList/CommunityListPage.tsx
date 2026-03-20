// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9801&m=dev
// Figma-states: communityList

import { useNavigate } from "react-router-dom";
import { CategoryTab, CategoryTabBar } from "../../shared/ui/CategoryTab/CategoryTab";
import { SearchInput } from "../../shared/ui/SearchInput/SearchInput";
import { SortModal } from "../../shared/ui/SortModal/SortModal";
import { Pagination } from "../../shared/ui/Pagination/Pagination";
import { Dropdown } from "../../shared/ui/Dropdown/Dropdown";
import { Button } from "../../shared/ui/Button/Button";
import { NotFound } from "../../shared/ui/NotFound/NotFound";
import { Loading } from "../../shared/ui/Loading/Loading";
import { PostCard } from "./ui/PostCard";
import { useCommunityList } from "./model/useCommunityList";
import { CATEGORIES, SORT_OPTIONS, SEARCH_TYPE_OPTIONS } from "./lib/constants";

import PencilIcon from "../../assets/icons/pencil.svg?react";

export function CommunityListPage() {
  const navigate = useNavigate();
  const {
    activeCategory,
    sortValue,
    searchType,
    searchQuery,
    currentPage,
    posts,
    totalPages,
    isLoading,
    isError,
    setActiveCategory,
    setSortValue,
    setSearchType,
    setSearchQuery,
    clearSearch,
    setCurrentPage,
  } = useCommunityList();

  return (
    <div className="flex flex-col gap-8 w-full px-4">
      {/* Title */}
      <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-primary">
        커뮤니티
      </h1>

      {/* Search row */}
      <div className="flex items-center gap-[7px]">
        <Dropdown
          options={[...SEARCH_TYPE_OPTIONS]}
          value={searchType}
          onChange={setSearchType}
          variant="compact"
          className="shrink-0 w-[118px]"
        />
        <div className="flex items-center flex-1 gap-4">
          <SearchInput
            placeholder="질문 검색"
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={clearSearch}
            className="max-w-[472px] w-full"
          />
        </div>
        <Button size="lg" onClick={() => navigate("/community/new")} className="shrink-0 w-[120px] gap-2">
          <PencilIcon width={20} height={20} className="shrink-0" />
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
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </CategoryTabBar>
        <SortModal
          options={[...SORT_OPTIONS]}
          value={sortValue}
          onChange={setSortValue}
        />
      </div>

      {/* Post List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loading />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-500">게시글을 불러오는데 실패했습니다.</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <NotFound variant="community" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => navigate(`/community/${post.id}`)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {posts.length > 0 && (
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
