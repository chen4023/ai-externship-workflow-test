# Project: [프로젝트명]

## Tech Stack
- React 19 + TypeScript + Vite
- TanStack Query v5 (Factory Pattern)
- Axios (HTTP 클라이언트)
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

## Pages 슬라이스 구조
페이지 폴더 내부는 파일 수에 따라 구조를 결정한다:
- **파일 1~2개** → 서브폴더 없이 플랫하게 유지
- **파일 3개 이상** → `ui/`, `model/`, `lib/` 서브폴더로 분류
  - `ui/` — 페이지 전용 컴포넌트 (모달, 섹션 등)
  - `model/` — 페이지 전용 훅/상태
  - `lib/` — 페이지 전용 유틸/데이터/상수
- 라우터에 직접 연결되는 페이지 컴포넌트(`*Page.tsx`)는 폴더 루트에 유지
- 예시:
  ```
  pages/Landing/
  ├── LandingPage.tsx          # 진입점 (라우터 연결)
  ├── ui/                      # 페이지 전용 컴포넌트
  │   ├── HeroSection.tsx
  │   └── TabSelector.tsx
  ├── model/                   # 페이지 전용 훅
  │   └── useLandingTab.ts
  └── lib/                     # 페이지 전용 데이터
      └── landingData.ts
  ```

## Coding Rules
- 함수형 컴포넌트 + 훅 패턴
- barrel export 금지 (직접 import)
- 컴포넌트 파일은 200줄 이하
- 비즈니스 로직은 커스텀 훅으로 분리
- Tailwind arbitrary value (`[]`) 사용 금지 — 디자인 토큰이 테마에 등록되어 있으므로 시맨틱 클래스 사용 (예: `text-[#FF0000]` 대신 `text-primary`)
- 디자인 토큰(`shared/styles/tokens.css`)에 정의된 컬러만 사용 — 팔레트에 없는 색상값 사용 금지
- API 호출은 TanStack Query Factory Pattern + Axios (fetch 직접 사용 금지)
- React 19 `use()` API와 Server Actions 활용 가능

## ⚠️ API 통신은 Axios 사용

> **HTTP 클라이언트는 Axios를 사용한다. fetch를 직접 사용하지 않는다.**

### Axios 인스턴스 규칙
- `src/api/instance.ts`에 공통 Axios 인스턴스를 정의하고, 모든 API 호출에서 이를 import하여 사용
- `baseURL`, 인터셉터(토큰 주입, 에러 핸들링 등)는 인스턴스에서 일괄 관리
- 도메인별 API 함수(`src/api/community.ts` 등)는 공통 인스턴스를 사용하여 호출

### Axios + MSW 연동
- MSW는 Axios 요청도 자동으로 인터셉트하므로 별도 설정 불필요
- 단, Axios 인스턴스의 `baseURL`과 MSW 핸들러의 경로가 일치해야 한다
- MSW 핸들러 경로에 와일드카드(`*`)를 붙여 baseURL에 무관하게 매칭 (예: `http.get('*/api/v1/posts', ...)`)

## ⚠️ MSW 핸들러는 반드시 API 스펙 기반으로 작성

> **`docs/api-specs/`가 MSW 핸들러와 타입 정의의 단일 진실 공급원(Single Source of Truth)이다.**

### 핵심 원칙
- MSW 핸들러의 **엔드포인트 경로, 쿼리 파라미터, 요청/응답 스키마**는 `docs/api-specs/` 명세와 **100% 일치**해야 한다
- 프론트엔드 편의를 위해 API 경로나 응답 구조를 임의로 변경하지 않는다
- 타입 정의(`types.ts`)도 API 스펙의 응답 스키마에서 파생한다

### MSW 핸들러 작성/수정 시 필수 절차
1. **스펙 확인**: 해당 도메인의 `docs/api-specs/XX-도메인.md` 파일을 먼저 읽는다
2. **엔드포인트 일치**: 스펙에 정의된 경로를 그대로 사용 (예: `api/v1/posts`, NOT `/api/community/posts`)
3. **파라미터 일치**: 쿼리 파라미터명을 스펙과 동일하게 사용 (예: `search_filter`, `category_id`, `page_size`)
4. **응답 구조 일치**: 스펙의 응답 JSON 구조를 그대로 반환 (예: `{ count, next, previous, results }` 페이지네이션 형식)
5. **에러 응답 포함**: 스펙에 정의된 에러 응답(400, 401, 403, 404)도 MSW 핸들러에 구현
6. **타입 동기화**: 응답 타입은 스펙의 필드명/타입과 일치시킨다

### 파일 구조
```
src/mocks/
├── handlers.ts              # 모든 핸들러 통합
├── communityHandlers.ts     # docs/api-specs/04-community.md 기반
├── authHandlers.ts          # docs/api-specs/01-auth.md 기반
├── ...                      # 도메인별 1:1 매핑
```

### 스펙 ↔ MSW 매핑 예시
```
docs/api-specs/04-community.md  →  src/mocks/communityHandlers.ts
  GET api/v1/posts               →  http.get('*/api/v1/posts', ...)
  GET api/v1/posts/:post_id      →  http.get('*/api/v1/posts/:post_id', ...)
  POST api/v1/posts              →  http.post('*/api/v1/posts', ...)
```

### 🚫 금지 사항
- API 스펙에 없는 커스텀 엔드포인트를 MSW에 만들지 않는다
- 응답 필드명을 프론트엔드 컨벤션으로 임의 변환하지 않는다 (예: `comment_count` → `commentCount` ❌)
- Mock 데이터의 필드가 스펙에 정의되지 않은 필드를 포함하지 않는다

## ⚠️ 페이지 작업 시 MSW 의무 사용 (Mock-First 개발)

> **새 페이지를 구현할 때 반드시 MSW 핸들러를 먼저 작성한 뒤 UI를 개발한다. 실서버 API 없이도 UI가 동작해야 한다.**

### 필수 절차
1. `docs/api-specs/`에서 해당 페이지가 사용하는 API 목록을 파악
2. `src/mocks/[도메인]Handlers.ts`에 MSW 핸들러 작성 (스펙 기반)
3. `src/mocks/handlers.ts`에 핸들러 등록
4. MSW 핸들러로 UI 개발 및 인터랙션 검증
5. 이후 실서버 API가 배포되면 passthrough로 전환

### MSW Passthrough (배포된 API 실서버 연결)

배포 완료된 API는 MSW를 우회하여 실서버로 직접 요청을 보낸다.

**전환 방법**: `src/mocks/passthrough.ts`의 `deployedApiPatterns` 배열에 패턴 추가
```typescript
// src/mocks/passthrough.ts
export const deployedApiPatterns: RegExp[] = [
  /\/api\/v1\/posts\/categories$/,   // 카테고리 목록 — 배포 완료
  /\/api\/v1\/posts(\?.*)?$/,        // 게시글 목록 — 배포 완료
];
```

**동작 원리**:
- `passthrough.ts`에 등록된 패턴 → MSW 우회 → 실서버 응답
- 등록되지 않은 API → MSW 핸들러가 mock 응답 반환
- MSW 핸들러도 없는 `/api/` 요청 → 콘솔 경고 출력

**전환 시 체크리스트**:
1. `src/mocks/passthrough.ts`에 배포된 엔드포인트 패턴 추가
2. 실서버 응답이 스펙과 일치하는지 확인
3. MSW 핸들러는 제거하지 않는다 (테스트에서 계속 사용)

### 파일 구조
```
src/mocks/
├── browser.ts               # MSW worker 설정 + passthrough 로직
├── handlers.ts              # passthrough + 도메인 핸들러 통합
├── passthrough.ts           # 배포 완료 API 패턴 목록
├── communityHandlers.ts     # docs/api-specs/04-community.md 기반
├── authHandlers.ts          # docs/api-specs/01-auth.md 기반
└── ...                      # 도메인별 1:1 매핑
```

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
- 🚫 Never: .env 수정, node_modules 편집, CI 설정 변경, main 브랜치에 직접 커밋

## Development Workflow
새 기능 개발 시 `orchestrator` 에이전트가 상태 전이와 라우팅을 관리한다.
Gate 판단은 스크립트(`.claude/hooks/gates/`)가 수행한다.

```
INIT → FIGMA_SYNC? → SPEC → GATE_1 → PLAN → IMPLEMENT → GATE_2 → GATE_3 → PR → PR_REVIEW → MERGE → DONE
                                                                     ↑                          |
                                                                     └───────── FIX ←───────────┘
```

### Gate 스크립트
| 스크립트 | 역할 | 판단 방식 |
|---------|------|----------|
| `gates/gate1-spec.sh` | spec 완전성 검증 | 필수 섹션/수락 기준 개수 |
| `gates/gate2-quality.sh` | 타입/린트/테스트/토큰 검증 | exit code + JSON |
| `gates/gate3-review.sh` | 필요한 리뷰 에이전트 결정 | 변경 파일 분석 |
| `gates/figma-sync.sh` | Figma 싱크 필요 여부 판단 | 컴포넌트 맵 조회 |

### 이슈 기반 워크플로우
새 기능 작업 시 반드시 다음 순서를 따른다:
1. `gh issue create`로 GitHub Issue 생성
2. `git checkout -b feat/[기능명]-#[이슈번호]`로 피처 브랜치 생성
3. 모든 커밋 메시지 끝에 `(#이슈번호)` 추가 (예: `feat: 로그인 폼 구현 (#7)`)
4. PR 본문에 `Closes #이슈번호` 포함 → 머지 시 이슈 자동 닫힘

auto-commit 훅이 브랜치명에서 이슈 번호를 자동 추출하여 커밋에 연결한다.

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
