# Implementation Plan: CommunityDetail 페이지 Figma 디자인 100% 일치 리팩토링

> spec.md 확정 기반. 각 Step은 독립적으로 구현/테스트 가능.

## 선행 조건
- [x] SPEC.md 확정 (Gate 1 통과)
- [x] Figma 디자인 확인 (node-id=1-10472)
- [x] API 명세 확인 (docs/api-specs/04-community.md)
- [x] 기존 코드 분석 완료

## Step 1: Figma 디자인 분석 + PostHeader 리팩토링
- **파일**: `src/pages/CommunityDetail/ui/PostHeader.tsx`
- **작업 내용**:
  - Figma get_design_context로 정확한 디자인 값 확인
  - 제목 타이포그래피 Figma 일치 (font-size, weight, line-height, color)
  - 작성자 프로필 영역: 아바타(40px), 닉네임, 날짜, 카테고리 배지
  - 수정/삭제 버튼 스타일 Figma 일치
  - CSS 변수 기반 색상으로 교체
- **검증**: pnpm tsc --noEmit

## Step 2: PostContent + 좋아요/조회수 리팩토링
- **파일**: `src/pages/CommunityDetail/ui/PostContent.tsx`
- **작업 내용**:
  - 본문 텍스트 스타일 Figma 일치
  - 좋아요/조회수 아이콘 SVG를 Figma 에셋 기반으로 교체
  - 아이콘 + 텍스트 간격, 색상 Figma 일치
  - CSS 변수 사용
- **검증**: pnpm tsc --noEmit

## Step 3: CommentSection + CommentCard 리팩토링
- **파일**: `src/pages/CommunityDetail/ui/CommentSection.tsx`, `CommentCard.tsx`
- **작업 내용**:
  - 댓글 섹션 헤더 (댓글 수 + 정렬) Figma 일치
  - 댓글 카드: border, padding, gap, 프로필, 날짜 Figma 일치
  - 댓글 입력 폼 레이아웃 Figma 일치
  - 빈 상태 메시지 스타일
- **검증**: pnpm tsc --noEmit

## Step 4: CommunityDetailPage 통합 + 전체 레이아웃 조정
- **파일**: `src/pages/CommunityDetail/CommunityDetailPage.tsx`
- **작업 내용**:
  - 전체 페이지 레이아웃 (gap, divider, width) Figma 일치
  - Divider 스타일 확인
  - 로딩/에러 상태 스타일 통일
  - 전체 타입 체크 + 린트 수정
- **검증**: pnpm tsc --noEmit + pnpm lint

## 서브에이전트 활용 계획
| Step | 서브에이전트 | 실행 방식 |
|------|-------------|----------|
| 1-3  | test-writer | Step 완료 후 순차 |
| 4    | accessibility-checker | 순차 |

## 롤백 계획
- 각 Step은 별도 커밋으로 관리
- 문제 발생 시 해당 Step 커밋만 revert
