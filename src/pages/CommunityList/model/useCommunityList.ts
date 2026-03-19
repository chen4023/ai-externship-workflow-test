// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-9801
// Figma-states: communityList

import { useState } from 'react';
import { useCommunityPostsQuery } from '../lib/communityQueries';
import { ITEMS_PER_PAGE } from '../lib/constants';

export function useCommunityList() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [sortValue, setSortValue] = useState('latest');
  const [searchType, setSearchType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useCommunityPostsQuery({
    category: activeCategory,
    searchType,
    searchQuery,
    sort: sortValue,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const posts = data?.posts ?? [];
  const totalPages = data?.totalPages ?? 1;

  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  function handleSearchQueryChange(query: string) {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  function handleClearSearch() {
    setSearchQuery('');
    setCurrentPage(1);
  }

  return {
    // 상태
    activeCategory,
    sortValue,
    searchType,
    searchQuery,
    currentPage,
    // 데이터
    posts,
    totalPages,
    isLoading,
    isError,
    // 액션
    setActiveCategory: handleCategoryChange,
    setSortValue,
    setSearchType,
    setSearchQuery: handleSearchQueryChange,
    clearSearch: handleClearSearch,
    setCurrentPage,
  };
}
