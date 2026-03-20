# Implementation Plan: QnaList 페이지 Figma 디자인 100% 일치 구현

> spec.md 확정 후 작성. 기존 구현이 있으므로 Figma 디자인 일치 수정 + 품질 보완 중심.
> Iterative Chunking: "Step 1 구현" -> 테스트 -> "Step 2로 진행" 방식

## 선행 조건
- [x] spec.md 확정 (Gate 1 통과)
- [x] 디자인 확인 (Figma fileKey=4rJmEFUU2HMWVy3qUcYZRs, nodeId=1:5893)
- [x] API 명세 확인 (docs/api-specs/05-qna.md)

## 현재 상태 분석
기존 구현이 FSD 구조(model/, lib/) + TanStack Query + MSW로 완성되어 있다.
주요 보완 포인트:
1. MSW 핸들러가 와일드카드 패턴(`*/api/v1/...`) 미사용 - baseURL과 무관하게 매칭되도록 수정
2. QnaListPage의 레이아웃/간격이 Figma 디자인과 정확히 일치하는지 검증 필요
3. 테스트 파일 미작성 - 통합 테스트 추가 필요

## Step 1: MSW 핸들러 스펙 일치 + 와일드카드 패턴 적용
- **파일**: `src/mocks/qnaHandlers.ts`
- **작업 내용**:
  - MSW 핸들러 경로에 와일드카드(`*`) 추가: `http.get('*/api/v1/qna/questions', ...)`
  - API 스펙(05-qna.md)과 파라미터명/응답 구조 재확인
- **검증**: MSW 핸들러가 Axios baseURL과 무관하게 매칭
- **예상 소요**: ~10분

## Step 2: QnaListPage Figma 디자인 일치 수정
- **파일**: `src/pages/QnaList/QnaListPage.tsx`
- **작업 내용**:
  - Figma `get_design_context`로 정확한 레이아웃 값 확인
  - 페이지 제목, 검색/버튼 영역, 탭/정렬 영역, 카드 목록, 페이지네이션 간격 수정
  - Tailwind arbitrary value 대신 CSS 변수 토큰 사용 확인
  - max-w-(--max-width-content) 적용
- **검증**: `pnpm tsc --noEmit` 통과, 브라우저에서 Figma 스크린샷과 비교
- **예상 소요**: ~30분

## Step 3: 테스트 작성
- **파일**: `src/pages/QnaList/__tests__/QnaListPage.test.tsx`, `src/pages/QnaList/lib/__tests__/formatRelativeTime.test.ts`
- **작업 내용**:
  - formatRelativeTime 유닛 테스트
  - QnaListPage 통합 테스트 (렌더링, 검색, 필터, 정렬, 페이지네이션)
  - MSW 핸들러 연동 테스트
- **검증**: `pnpm test` 통과
- **예상 소요**: ~30분

## 서브에이전트 활용 계획
| Step | 서브에이전트 | 실행 방식 |
|------|-------------|----------|
| 1    | - | 직접 수정 |
| 2    | - | Figma MCP 참조하여 직접 수정 |
| 3    | test-writer | Step 완료 후 순차 |

## 롤백 계획
- 각 Step은 별도 커밋으로 관리
- 문제 발생 시 해당 Step 커밋만 revert
