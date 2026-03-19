# Implementation Plan: CommunityList 페이지 FSD 구조 리팩토링 및 기능 구현

> spec.md 확정 기반. 각 Step은 독립적으로 구현/테스트 가능.

## 선행 조건
- [x] SPEC.md 확정 (Gate 1 통과)
- [x] Figma 디자인 확인 (nodeId 1:9801)
- [x] 기존 공통 컴포넌트 확인 (Header, Footer, CategoryTab, SearchInput, SortModal, Pagination, Dropdown, Button, NotFound)

## 파일 구조
```
src/pages/CommunityList/
  CommunityListPage.tsx          # 메인 페이지 (레이아웃 + 상태)
  ui/PostCard.tsx                # 게시글 카드 컴포넌트
  model/useCommunityList.ts      # 필터링/정렬/페이지네이션 비즈니스 로직 훅
  lib/types.ts                   # 타입 정의 (CommunityPost 등)
  lib/constants.ts               # 상수 (카테고리, 정렬 옵션, 검색 타입)
  lib/communityQueries.ts        # TanStack Query Factory Pattern
  lib/mockData.ts                # MSW용 mock 데이터
```

## Step 1: 타입/상수/mock 데이터 분리 (lib/)
- **파일**: `lib/types.ts`, `lib/constants.ts`, `lib/mockData.ts`
- **작업 내용**:
  - CommunityPost 인터페이스를 types.ts로 분리
  - CATEGORIES, SORT_OPTIONS, SEARCH_TYPE_OPTIONS, ITEMS_PER_PAGE를 constants.ts로 분리
  - MOCK_POSTS를 mockData.ts로 분리하고 15개 이상으로 확장 (페이지네이션 테스트용)
- **검증**: pnpm tsc --noEmit

## Step 2: TanStack Query Factory + MSW Handler
- **파일**: `lib/communityQueries.ts`, MSW handler
- **작업 내용**:
  - communityQueries Factory 객체 생성 (list query key/fn)
  - API 파라미터 타입 정의 (category, search, sort, page)
  - MSW handler로 GET /api/community/posts mock
  - useCommunityPostsQuery 훅 export
- **검증**: pnpm tsc --noEmit

## Step 3: PostCard UI 컴포넌트 분리 (ui/)
- **파일**: `ui/PostCard.tsx`
- **작업 내용**:
  - 기존 인라인 PostCard를 독립 파일로 추출
  - CommunityPost 타입 import
  - 디자인 토큰 기반 스타일 유지
- **검증**: pnpm tsc --noEmit

## Step 4: useCommunityList 훅 (model/)
- **파일**: `model/useCommunityList.ts`
- **작업 내용**:
  - 카테고리/검색/정렬/페이지 상태 관리
  - TanStack Query 훅 연동
  - 카테고리 변경 시 페이지 1로 리셋
  - 검색어 변경 시 디바운스 없이 즉시 반영 (클라이언트 필터링)
- **검증**: pnpm tsc --noEmit

## Step 5: CommunityListPage 통합 리팩토링
- **파일**: `CommunityListPage.tsx`
- **작업 내용**:
  - useCommunityList 훅 사용으로 비즈니스 로직 제거
  - ui/PostCard import
  - lib/ 상수 import
  - 200줄 이하로 유지
  - 로딩/에러 상태 처리
- **검증**: pnpm tsc --noEmit && pnpm build

## 롤백 계획
- 각 Step은 별도 커밋으로 관리
- 문제 발생 시 해당 Step 커밋만 revert
