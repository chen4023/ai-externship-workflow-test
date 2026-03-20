# Feature: CommunityDetail 페이지 Figma 디자인 100% 일치 리팩토링

## 배경 (Background)
- 현재 CommunityDetail 페이지가 존재하나 Figma 디자인과 세부적인 스타일이 불일치
- Figma 디자인 시안(node-id=1-10472)을 기준으로 100% 피델리티 달성 필요
- 디자인 토큰(tokens.css)을 활용하여 하드코딩된 값 제거, 시맨틱 클래스 일관성 확보
- Layout.tsx가 Header/Footer + max-width 1440px를 제공하므로 내부 콘텐츠만 구현

## 요구사항 (Requirements)

### 기능 요구사항
- [ ] 게시글 상세 조회: 제목, 작성자 프로필, 작성일, 본문 표시
- [ ] 좋아요/조회수: 아이콘 + 카운트 표시, 로그인 시 좋아요 토글
- [ ] 댓글 목록: 댓글 카운트, 정렬(최신순/오래된순), 댓글 리스트
- [ ] 댓글 작성: 로그인 사용자만 텍스트 입력 + 등록 버튼
- [ ] 댓글 수정/삭제: 본인 댓글에만 수정/삭제 버튼 표시
- [ ] 게시글 수정/삭제: 작성자에게만 수정/삭제 버튼 표시
- [ ] 삭제 확인 모달: ConfirmModal로 삭제 전 확인
- [ ] 로딩/에러/빈 상태 처리

### 비기능 요구사항
- [ ] Figma 디자인 토큰과 100% 일치하는 스타일링 (tokens.css 기반 CSS 변수 사용)
- [ ] Tailwind arbitrary value 사용 금지 -- CSS 변수 기반 클래스 사용
- [ ] 접근성: WCAG 2.1 AA 준수 (aria-label, 키보드 탐색, 포커스 관리)
- [ ] 반응형: Layout의 max-width 1440px 내에서 콘텐츠 너비 w-300 (1200px)
- [ ] 성능: TanStack Query 캐싱, lazy loading 적용
- [ ] API: authApi/publicApi 인스턴스 사용 (fetch 직접 사용 금지)

## 수락 기준 (Acceptance Criteria)

- [ ] 게시글 제목이 Figma 디자인과 동일한 타이포그래피(size, weight, color, line-height)로 렌더링된다
- [ ] 작성자 프로필 영역(아바타 40px, 닉네임, 날짜)이 Figma 레이아웃과 일치한다
- [ ] 좋아요/조회수 아이콘이 SVG로 렌더링되고, 카운트와 함께 Figma 간격에 맞게 배치된다
- [ ] 댓글 섹션이 Figma 디자인의 레이아웃(gap, padding, border, border-radius)과 일치한다
- [ ] 댓글 입력 폼이 Figma 디자인(CommentInput + CommentSubmitButton)과 일치한다
- [ ] 모든 색상이 tokens.css의 CSS 변수를 참조한다 (하드코딩 색상 0개)
- [ ] pnpm tsc --noEmit 통과
- [ ] pnpm lint 통과
- [ ] pnpm test 통과
- [ ] FIGMA_VERIFY 스크린샷 비교에서 불일치 항목 0개

## 엣지 케이스
- 게시글 없음 (404): "게시글을 찾을 수 없습니다." 메시지 표시
- 댓글 없음: "아직 댓글이 없습니다. 첫 댓글을 남겨보세요." 표시
- 비로그인 사용자: 댓글 입력 폼 숨김, 좋아요 비활성화
- 긴 본문: whitespace-pre-wrap으로 줄바꿈 보존
- 댓글 500자 초과: 등록 버튼 비활성화
- 중복 좋아요 클릭: isPending 동안 버튼 비활성화

## 아키텍처 결정 (Architecture Decisions)
- FSD 구조: pages/CommunityDetail/{CommunityDetailPage.tsx, ui/, model/, lib/}
- 서버 상태: TanStack Query v5 Factory Pattern (communityDetailQueries)
- API: src/api/communityDetail.ts (authApi/publicApi 사용)
- MSW: src/mocks/communityDetailHandlers.ts (기존 핸들러 유지)
- 공유 UI: ProfileImage, CommentInput, CommentSubmitButton, SortModal, ConfirmModal 재사용

## 디자인 참조
- Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=1-10472&m=dev
- fileKey: 4rJmEFUU2HMWVy3qUcYZRs
- nodeId: 1:10472
- 디자인 시스템 컴포넌트 재사용: ProfileImage, CommentInput, CommentSubmitButton, SortModal, Button, ConfirmModal

## 테스팅 전략
- **Unit**: 커스텀 훅 (useCommunityDetailActions, useCommentActions), 유틸 함수
- **Integration**: 페이지 렌더링 + MSW mock 데이터 검증
- **Visual**: FIGMA_VERIFY 스크린샷 비교

## 범위 외 (Out of Scope)
- 게시글 작성/수정 페이지
- 댓글 태그(@멘션) 기능 UI
- 무한 스크롤/페이지네이션 (현재 전체 로드)
- 실서버 API 연동 (MSW mock 사용)
