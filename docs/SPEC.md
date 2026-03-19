# Feature: SearchInput/Dropdown/Button Figma 디자인 일치 수정 및 FIGMA_VERIFY Gate 추가

> Figma: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/?node-id=1-9801

## 배경 (Background)
- SearchInput, Dropdown, Button 컴포넌트가 Figma 디자인과 불일치
- CommunityListPage 검색 영역 레이아웃이 Figma 기준에 맞지 않음
- orchestrator 워크플로우에 Figma 디자인 검증 Gate가 없어 불일치를 자동 감지할 수 없음

## 요구사항 (Requirements)

### 기능 요구사항
- [ ] SearchInput: pill shape(rounded-full), bg gray-100, h-12(48px), px/gap 10px
- [ ] Dropdown: compact variant 추가 (테두리 없음, 배경 투명, h-[42px])
- [ ] CommunityListPage 검색 영역: Figma 기준 레이아웃 (gap-[7px], w-[472px] 등)
- [ ] Button: 글쓰기 버튼에 연필 아이콘 SVG 추가, size="lg", w-30
- [ ] orchestrator.md에 FIGMA_VERIFY Gate 단계 추가

### 비기능 요구사항
- [ ] 디자인 토큰(tokens.css) 기반 색상 사용
- [ ] Tailwind arbitrary value 최소화, CSS 변수 활용
- [ ] 컴포넌트 파일 200줄 이하 유지
- [ ] TypeScript 타입 안전성 보장

## 수락 기준 (Acceptance Criteria)

- [ ] Given SearchInput When 렌더링 Then rounded-full(pill), bg-[var(--color-gray-100)], h-12(48px), px-[10px], gap-[10px]
- [ ] Given Dropdown variant="compact" When 렌더링 Then 테두리 없음, 배경 투명, h-[42px], px-2, text-16px, text-[var(--color-gray-500)]
- [ ] Given CommunityListPage 검색 영역 When 렌더링 Then Dropdown(compact) + SearchInput(w-[472px]) + Button(lg, 연필 아이콘) 배치
- [ ] Given 검색 영역 gap When 렌더링 Then gap-[7px]
- [ ] Given 글쓰기 Button When 렌더링 Then 연필 아이콘 SVG + "글쓰기" 텍스트, size="lg", w-30
- [ ] Given orchestrator.md When 확인 Then GATE_3 이후 FIGMA_VERIFY 단계가 존재
- [ ] Given FIGMA_VERIFY When 정의 확인 Then Figma URL 파싱, 스크린샷 비교, 불일치 자동 수정 규칙 포함
- [ ] Given 기존 기능 When 수정 후 Then pnpm tsc --noEmit, pnpm lint 통과

## 엣지 케이스
- Dropdown compact variant에서 value 선택/미선택 시 스타일 차이
- SearchInput focus 상태에서 border color 변경
- Dropdown compact variant의 드롭다운 메뉴 위치 및 스타일

## 아키텍처 결정 (Architecture Decisions)
- SearchInput: 기존 컴포넌트 스타일만 변경 (인터페이스 유지)
- Dropdown: variant prop 추가 (기본값 'default'로 하위 호환성 유지)
- orchestrator.md: 상태 머신에 FIGMA_VERIFY 노드 삽입

## 디자인 참조
- Figma 파일: https://www.figma.com/design/4rJmEFUU2HMWVy3qUcYZRs/?node-id=1-9801
- 재사용 컴포넌트: SearchInput, Dropdown, Button

## 테스팅 전략
- **Unit**: SearchInput, Dropdown(compact variant) 렌더링 테스트
- **TypeCheck**: pnpm tsc --noEmit 통과
- **Lint**: pnpm lint 통과

## 범위 외 (Out of Scope)
- Dropdown 드롭다운 메뉴 스타일 변경 (compact는 트리거 버튼만 변경)
- 다른 페이지의 SearchInput/Dropdown 사용처 변경
- FIGMA_VERIFY Gate 스크립트 구현 (orchestrator.md 문서만)
