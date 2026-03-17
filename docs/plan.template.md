# Implementation Plan: [기능명]

> spec.md 확정 후 작성. 각 Step은 독립적으로 구현/테스트 가능해야 합니다.
> Iterative Chunking: "Step 1 구현" → 테스트 → "Step 2로 진행" 방식

## 선행 조건
- [ ] spec.md 확정 (Gate 1 통과)
- [ ] 디자인 확인 (Figma 링크)
- [ ] API 명세 확인

## Step 1: [타입/스키마 정의]
- **파일**: `src/entities/[entity]/model/types.ts`, `src/entities/[entity]/model/schema.ts`
- **작업 내용**:
  - TypeScript 타입 정의
  - Zod 스키마 생성
  - 관련 타입 export
- **검증**: `pnpm tsc --noEmit` 통과
- **예상 소요**: ~15분

## Step 2: [API 레이어]
- **파일**: `src/entities/[entity]/api/`, `src/features/[feature]/api/`
- **작업 내용**:
  - TanStack Query Factory Pattern으로 query/mutation 훅 생성
  - API 엔드포인트 연결
  - MSW 핸들러 작성
- **검증**: API 훅 단위 테스트 통과
- **예상 소요**: ~30분

## Step 3: [UI 컴포넌트]
- **파일**: `src/features/[feature]/ui/`, `src/shared/ui/`
- **작업 내용**:
  - 디자인 시스템 컴포넌트 활용
  - 폼 (React Hook Form + Zod 연결)
  - 반응형 레이아웃
  - 로딩/에러/빈 상태 처리
- **검증**: 컴포넌트 테스트 + 스토리북 (있는 경우)
- **예상 소요**: ~1시간

## Step 4: [통합 & 페이지 연결]
- **파일**: `src/pages/[page]/`, `src/widgets/[widget]/`
- **작업 내용**:
  - 페이지에 컴포넌트 연결
  - 라우팅 설정
  - Error Boundary 배치
  - Suspense 경계 설정
- **검증**: 통합 테스트 + E2E 테스트
- **예상 소요**: ~30분

## Step 5: [검증 & PR]
- **작업 내용**:
  - 전체 테스트 스위트 실행
  - 접근성 검사 (accessibility-checker 서브에이전트)
  - 코드 리뷰 (code-reviewer 서브에이전트)
  - 디자인 리뷰 (design-reviewer 서브에이전트)
  - PR 생성
- **검증**: Gate 3 (최종 품질 게이트) 통과

## 서브에이전트 활용 계획
| Step | 서브에이전트 | 실행 방식 |
|------|-------------|----------|
| 1-2  | test-writer | Step 완료 후 순차 |
| 3    | test-writer + design-reviewer | 병렬 (파일 겹침 없음) |
| 4    | accessibility-checker | 순차 |
| 5    | code-reviewer + security-reviewer | 병렬 |

## 롤백 계획
- 각 Step은 별도 커밋으로 관리
- 문제 발생 시 해당 Step 커밋만 revert
