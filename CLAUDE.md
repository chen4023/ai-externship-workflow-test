# Project: [프로젝트명]

## Tech Stack
- React 19 + TypeScript + Vite
- TanStack Query v5 (Factory Pattern)
- Zustand (상태 관리)
- Tailwind CSS + 커스텀 디자인 토큰
- Vitest + React Testing Library + MSW + Playwright

## Architecture
- Feature-Sliced Design (FSD)
  - app/ → 앱 설정, 프로바이더
  - pages/ → 라우트별 페이지
  - widgets/ → 복합 UI 블록
  - features/ → 사용자 인터랙션 단위
  - entities/ → 비즈니스 엔티티
  - shared/ → 재사용 유틸리티, UI 키트

## Commands
- Dev: pnpm dev
- Build: pnpm build
- Test: pnpm test
- Lint: pnpm lint --fix
- Type Check: pnpm tsc --noEmit

## Coding Rules
- 함수형 컴포넌트 + 훅 패턴
- barrel export 금지 (직접 import)
- 컴포넌트 파일은 200줄 이하
- 비즈니스 로직은 커스텀 훅으로 분리
- API 호출은 TanStack Query Factory Pattern
- React 19 `use()` API와 Server Actions 활용 가능

## Design System
- 디자인 토큰: shared/styles/tokens.css
- 컴포넌트: shared/ui/ 하위
- 토큰 변경은 Figma → Style Dictionary 파이프라인으로만

## Figma MCP 워크플로우
Figma 링크가 주어지면 다음 순서를 따른다:

### 토큰 추출 플로우
1. `get_variable_defs`로 Figma 변수(컬러, 간격, 타이포 등) 추출
2. `figma-token-extractor` 에이전트로 CSS 커스텀 프로퍼티 변환
3. `shared/styles/tokens.css` 업데이트 + `tailwind.config.ts` 테마 확장
4. 기존 토큰과의 Diff 리포트 출력

### 컴포넌트 구현 플로우
1. `get_metadata`로 Figma 페이지/프레임 구조 파악
2. `get_design_context`로 대상 노드의 레퍼런스 코드 + 스크린샷 획득
3. `get_code_connect_map`으로 이미 매핑된 기존 컴포넌트 확인
4. `figma-component-builder` 에이전트로 React 컴포넌트 구현
5. `add_code_connect_map`으로 Figma ↔ 코드 매핑 등록
6. `design-reviewer` 에이전트로 디자인 피델리티 검증

### Figma MCP 도구 용도
| 도구 | 용도 | 사용 시점 |
|------|------|----------|
| `get_variable_defs` | 디자인 변수(토큰) 추출 | 토큰 동기화 |
| `get_metadata` | 레이어 구조 파악 (이름, 위치, 크기) | 구현 전 구조 분석 |
| `get_design_context` | 레퍼런스 코드 + 스크린샷 + 메타데이터 | 컴포넌트 구현 |
| `get_screenshot` | 특정 노드 스크린샷 | 디자인 비교 |
| `get_code_connect_map` | 이미 매핑된 컴포넌트 조회 | 재사용 판단 |
| `get_code_connect_suggestions` | AI 추천 매핑 | 신규 컴포넌트 매핑 |
| `add_code_connect_map` | Figma ↔ 코드 매핑 등록 | 구현 완료 후 |
| `send_code_connect_mappings` | 다수 매핑 일괄 등록 | 대규모 매핑 |

### Figma 규칙
- Figma 링크의 fileKey와 nodeId를 정확히 파싱할 것
- `get_design_context`를 우선 사용 (`get_metadata`는 구조 파악용)
- 컴포넌트 구현 후 반드시 Code Connect 매핑 등록
- 하드코딩된 색상/간격 대신 추출된 토큰 사용 필수

## Boundaries
- ✅ Always: 테스트 작성 후 커밋, 타입 안전성 보장
- ⚠️ Ask first: DB 스키마 변경, 의존성 추가, API 계약 변경
- 🚫 Never: .env 수정, node_modules 편집, CI 설정 변경

## Development Workflow
새 기능 개발 시 `orchestrator` 에이전트가 전체 플로우를 자동 관리한다:

```
INIT → DESIGN_SYNC → SPEC → GATE_1 → PLAN → IMPLEMENT → GATE_2 → REVIEW → GATE_3 → PR → DONE
```

### 시작 방법
- 전체 자동화: `"orchestrator 에이전트로 [기능명] 개발을 시작해줘"`
- Figma 포함: `"orchestrator 에이전트로 이 Figma 링크의 컴포넌트를 구현해줘: [URL]"`
- 이어서 진행: `"orchestrator 에이전트로 이전 작업을 이어서 진행해줘"`
- 특정 Phase부터: `"orchestrator 에이전트로 구현은 끝났으니 리뷰부터 진행해줘"`

### 워크플로우 상태
- `.claude/workflow-state.json`에 현재 Phase, Step, Gate 결과 등 추적
- 세션이 중단되어도 상태 파일에서 복원 가능

### 사용자 개입 포인트
| 시점 | 내용 |
|------|------|
| DESIGN_SYNC 완료 | 토큰 Diff 리포트 확인 |
| SPEC 완료 | spec.md 내용 확인 |
| PLAN 완료 | plan.md 내용 확인 |
| REVIEW 완료 | High 이슈 수정 여부 결정 |
| PR 생성 전 | 최종 확인 |

### 자동 진행 (확인 불필요)
- Gate 통과 → 다음 Phase 자동 진입
- Step 완료 → 다음 Step 자동 진행
- Gate 실패 → 자동 수정 시도 (최대 3회)
- 린트/포매팅 에러 → 자동 수정

### 수동 모드
orchestrator 없이 개별 에이전트를 직접 호출할 수도 있다:
1. spec.md 작성 → 사용자와 대화형으로 요구사항 정리
2. Figma 링크가 있으면 → 토큰 추출 + 디자인 컨텍스트 분석
3. spec-reviewer 서브에이전트로 스펙 검토 (Gate 1)
4. plan.md 작성 → 구현 순서 확정
5. 단계별 구현 (Iterative Chunking) + Figma Code Connect 매핑
6. 각 단계마다 테스트 작성 + 검증
7. 코드 리뷰 + 디자인 리뷰 서브에이전트 (Gate 3)
8. PR 생성 + 문서화

## Sub-Agent Routing Rules
### Orchestrator 모드:
- orchestrator가 모든 서브에이전트의 호출 시점과 순서를 자동 결정
- 상태 머신 기반으로 Phase/Gate 전이를 관리

### 병렬 실행 (ALL conditions met):
- 3+ 독립적 태스크, 공유 상태 없음, 파일 경계 명확
- 리뷰 Phase에서 code-reviewer + security-reviewer + accessibility-checker + design-reviewer 동시 실행

### 순차 실행 (ANY condition triggers):
- 태스크 간 의존성, 공유 파일, 불명확한 스코프

### 백그라운드 실행:
- 리서치/분석 태스크, 결과가 블로킹하지 않음

## When compacting, always preserve:
- `.claude/workflow-state.json` 전체 내용
- 수정된 파일 전체 목록
- 테스트 명령어와 결과
- 현재 구현 계획 (spec.md, plan.md 경로)
- 미해결 에러 메시지
