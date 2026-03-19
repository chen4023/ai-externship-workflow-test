// Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-5893
// Figma-states: qnaList

import { useState } from 'react';
import { useQnaQuestionsQuery } from '../lib/qnaQueries';
import { ITEMS_PER_PAGE } from '../lib/constants';

export function useQnaList() {
  const [answerStatus, setAnswerStatus] = useState('all');
  const [sortValue, setSortValue] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQnaQuestionsQuery({
    page: currentPage,
    size: ITEMS_PER_PAGE,
    search_keyword: searchKeyword,
    answer_status: answerStatus,
    sort: sortValue,
  });

  const questions = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

  function handleAnswerStatusChange(status: string) {
    setAnswerStatus(status);
    setCurrentPage(1);
  }

  function handleSearchKeywordChange(keyword: string) {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  }

  function handleClearSearch() {
    setSearchKeyword('');
    setCurrentPage(1);
  }

  return {
    // state
    answerStatus,
    sortValue,
    searchKeyword,
    currentPage,
    // data
    questions,
    totalPages,
    isLoading,
    isError,
    // actions
    setAnswerStatus: handleAnswerStatusChange,
    setSortValue,
    setSearchKeyword: handleSearchKeywordChange,
    clearSearch: handleClearSearch,
    setCurrentPage,
  };
}
