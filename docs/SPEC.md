# Feature: CommunityList 페이지 FSD 구조 리팩토링 및 기능 구현

> Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/?node-id=1-9801

## 배경 (Background)
- CommunityListPage.tsx가 231줄로 모든 로직이 한 파일에 집중
- mock 데이터 기반 정적 UI를 실제 API 호출 구조로 전환 필요
- FSD 페이지 슬라이스 규칙(ui/, model/, lib/)에 맞게 리팩토링
- TanStack Query Factory Pattern으로 API 호출 구조를 준비하고, MSW로 mock 처리

## 요구사항 (Requirements)

### 기능 요구사항
- [ ] 카테고리 탭 전환으로 게시글 필터링 (전체, 인기글, 공지사항, 자유게시판, 고민, 구인/채용, 자료)
- [ ] 검색 타입(전체/제목/내용) 선택 후 검색어로 게시글 검색
- [ ] 정렬 옵션(최신순/댓글많은순) 변경
- [ ] 페이지네이션으로 게시글 목록 탐색
- [ ] 글쓰기 버튼 클릭 시 /community/new로 이동
- [ ] 게시글 카드 클릭 시 /community/:postId로 이동
- [ ] 검색 결과 없을 때 NotFound UI 표시
- [ ] TanStack Query로 게시글 목록 API 호출 (MSW mock)

### 비기능 요구사항
- [ ] FSD 페이지 슬라이스 구조: ui/, model/, lib/ 서브폴더
- [ ] 컴포넌트 파일 200줄 이하
- [ ] 비즈니스 로직은 커스텀 훅으로 분리
- [ ] 디자인 토큰 기반 색상/간격 사용 (arbitrary value 금지)
- [ ] TypeScript 타입 안전성 보장

## 수락 기준 (Acceptance Criteria)

- [ ] Given 사용자가 /community에 진입 When 페이지 로드 Then 전체 카테고리의 게시글 목록이 최신순으로 표시
- [ ] Given 사용자가 카테고리 탭 클릭 When "자유게시판" 선택 Then 해당 카테고리 게시글만 표시, 페이지 1로 초기화
- [ ] Given 사용자가 검색어 입력 When "프로젝트" 검색 Then 제목 또는 내용에 검색어가 포함된 게시글만 표시
- [ ] Given 검색 결과가 없을 때 When 목록 영역 확인 Then NotFound variant="community" 표시
- [ ] Given 사용자가 정렬 변경 When "댓글많은순" 선택 Then 댓글 수 기준 내림차순 정렬
- [ ] Given 게시글이 10개 초과 When 페이지네이션 표시 Then 다음 페이지로 이동 가능
- [ ] Given 글쓰기 버튼 클릭 When 이동 Then /community/new 경로로 네비게이트
- [ ] Given PostCard 컴포넌트 When 독립 파일로 분리 Then ui/ 폴더에 위치하고 200줄 이하
- [ ] Given CommunityListPage.tsx When 리팩토링 후 Then 200줄 이하, 비즈니스 로직은 model/ 훅에서 관리
- [ ] Given TanStack Query 사용 When API 호출 Then Factory Pattern 구조로 query key/fn 관리, MSW로 mock

## 엣지 케이스
- 빈 상태: 해당 카테고리/검색 결과에 게시글이 없는 경우
- 로딩 상태: API 호출 중 로딩 표시
- 에러 상태: API 호출 실패 시 에러 표시
- 검색어 공백만 입력한 경우: 전체 목록 표시
- 페이지 범위 초과: 유효한 페이지로 보정

## 아키텍처 결정 (Architecture Decisions)
- 상태 관리: 서버 상태는 TanStack Query, 클라이언트 상태(카테고리/검색/정렬/페이지)는 useState
- API 호출: TanStack Query Factory Pattern (communityQueries 객체)
- Mock: MSW handler로 게시글 목록 API mock
- FSD 구조:
  - CommunityList/
    - CommunityListPage.tsx (페이지 루트)
    - ui/PostCard.tsx (게시글 카드 컴포넌트)
    - model/useCommunityList.ts (필터링/정렬/페이지네이션 훅)
    - lib/types.ts (타입 정의)
    - lib/constants.ts (카테고리, 정렬 옵션 등 상수)
    - lib/communityQueries.ts (TanStack Query factory)

## 디자인 참조
- Figma 파일: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/?node-id=1-9801
- 재사용 컴포넌트: Header, Footer, CategoryTab, SearchInput, SortModal, Pagination, Dropdown, Button, NotFound

## 테스팅 전략
- **Unit**: 커스텀 훅 (useCommunityList) 테스트
- **Integration**: PostCard 렌더링 + 클릭 이벤트 테스트
- **MSW**: 게시글 목록 API mock handler

## 범위 외 (Out of Scope)
- 실제 백엔드 API 연동 (MSW mock으로 대체)
- 게시글 작성/수정/삭제 기능
- 무한 스크롤 (페이지네이션 사용)
- 반응형 (모바일/태블릿) 레이아웃
