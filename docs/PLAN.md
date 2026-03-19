# Implementation Plan: SearchInput/Dropdown/Button Figma 디자인 일치 수정 및 FIGMA_VERIFY Gate 추가

> spec.md 확정 기반. 각 Step은 독립적으로 구현/테스트 가능.

## 선행 조건
- [x] SPEC.md 확정 (Gate 1 통과)
- [x] 기존 공통 컴포넌트 확인 (SearchInput, Dropdown, Button)

## Step 1: SearchInput Figma 디자인 일치 수정
- **파일**: `src/shared/ui/SearchInput/SearchInput.tsx`
- **작업 내용**:
  - rounded-[4px] -> rounded-full (pill shape)
  - bg-white -> bg-[var(--color-gray-100)]
  - h-[42px] -> h-12 (48px)
  - px-[12px] -> px-[10px]
  - gap-[8px] -> gap-[10px]
- **검증**: pnpm tsc --noEmit

## Step 2: Dropdown compact variant 추가
- **파일**: `src/shared/ui/Dropdown/Dropdown.tsx`
- **작업 내용**:
  - variant prop 추가 ('default' | 'compact')
  - compact: 테두리 없음, 배경 투명, h-[42px], px-2, py-3
  - compact 텍스트: 16px Regular, color gray-500
  - 기존 default variant는 변경 없음
- **검증**: pnpm tsc --noEmit

## Step 3: CommunityListPage 검색 영역 Figma 기준 수정
- **파일**: `src/pages/CommunityList/CommunityListPage.tsx`
- **작업 내용**:
  - Dropdown: variant="compact" 적용
  - SearchInput: className="w-[472px]"
  - Button: size="lg" + 연필 아이콘 SVG + className="w-30"
  - gap: gap-3 -> gap-[7px]
- **검증**: pnpm tsc --noEmit

## Step 4: orchestrator.md FIGMA_VERIFY Gate 추가
- **파일**: `.claude/agents/orchestrator.md`
- **작업 내용**:
  - 상태 머신에 FIGMA_VERIFY 노드 삽입 (GATE_3 -> FIGMA_VERIFY -> PR)
  - FIGMA_VERIFY Phase 규칙 문서화
  - Figma URL 파싱, 스크린샷 비교, 불일치 자동 수정 프로세스 정의
- **검증**: 문서 구조 확인

## 롤백 계획
- 각 Step은 별도 커밋으로 관리
- 문제 발생 시 해당 Step 커밋만 revert
