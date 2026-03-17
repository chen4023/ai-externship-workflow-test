# AI 기반 서비스 개발 워크플로우 가이드

> React 19 + TypeScript + Vite 프론트엔드 프로젝트용
> Claude Code 서브에이전트 + 훅 시스템 기반

---

## 빠른 시작

### 1. 프로젝트에 적용하기
```bash
# .claude/ 디렉토리를 프로젝트 루트에 복사
cp -r .claude/ /your-project/.claude/

# CLAUDE.md를 프로젝트 루트에 복사 후 커스터마이징
cp CLAUDE.md /your-project/CLAUDE.md

# docs/ 템플릿 복사
cp -r docs/ /your-project/docs/

# 훅 스크립트 실행 권한 부여
chmod +x /your-project/.claude/hooks/**/*.sh
```

### 2. 단계별 도입 로드맵

| 단계 | 파일 | 리스크 | 효과 |
|------|------|--------|------|
| **1단계** (즉시) | `env-check.sh`, `auto-format.sh` | 제로 | 환경 검증 + 자동 포매팅 |
| **2단계** (높은 가치) | `security-guard.sh`, `file-guard.sh`, `post-edit-lint.sh`, `post-edit-typecheck.sh`, `auto-commit.sh` | 낮음 | 보안 + 품질 자동화 |
| **3단계** (고급) | Stop Prompt 훅, 서브에이전트, `design-sync-check.sh`, `final-quality-gate.sh` | 중간 | 완전 자동화 개발 루프 |

**1단계만 활성화하려면** `settings.json`에서 2~3단계 훅을 주석(제거)하세요.

---

## Orchestrator: 원커맨드 워크플로우

`orchestrator` 에이전트를 사용하면 **한 번의 명령으로** Spec → Plan → 구현 → 테스트 → 리뷰 → PR까지 자동으로 진행됩니다. 사용자는 핵심 의사결정 포인트에서만 개입합니다.

### 사용법

```
# 새 기능 개발 (전체 플로우)
"orchestrator 에이전트로 사용자 프로필 수정 기능 개발을 시작해줘"

# Figma 디자인 포함
"orchestrator 에이전트로 이 Figma 링크의 컴포넌트를 구현해줘:
https://figma.com/design/ABC123/MyDesign?node-id=0-1"

# 중단된 작업 재개
"orchestrator 에이전트로 이전 작업을 이어서 진행해줘"

# 특정 단계부터 시작
"orchestrator 에이전트로 spec은 이미 있으니 plan부터 시작해줘"
"orchestrator 에이전트로 구현은 끝났으니 리뷰부터 진행해줘"
```

### 상태 머신

```
INIT ──→ DESIGN_SYNC ──→ SPEC ──→ GATE_1 ──→ PLAN ──→ IMPLEMENT ──→ GATE_2 ──→ REVIEW ──→ GATE_3 ──→ PR ──→ DONE
          (Figma 있을 때)   │         │                    │             │           │          │
                            │    (실패: 수정 루프)           │        (실패: 자동수정)    │     (Critical: 자동수정)
                            └─────────┘                    └─────────────┘           └──────────┘
```

### 사용자 개입 vs 자동 진행

**사용자 확인이 필요한 시점** (orchestrator가 멈추고 질문):
- 토큰 Diff 리포트 확인 (새 토큰이 올바른지)
- Spec 내용 확인 (요구사항이 맞는지)
- Plan 확인 (구현 순서가 적절한지)
- High 이슈 수정 여부 (리뷰에서 발견된 이슈)
- PR 생성 최종 확인

**자동으로 진행되는 구간** (사용자 개입 불필요):
- Gate 통과 → 다음 Phase 자동 진입
- 각 구현 Step 완료 → 다음 Step 자동 진행
- Gate 실패 → 자동 수정 시도 (최대 3회, 이후 사용자에게 보고)
- 린트/타입/포매팅 에러 → 자동 수정
- 리뷰 에이전트 4개 동시 실행 (code, security, accessibility, design)

### 진행 상태 추적

orchestrator는 `.claude/workflow-state.json`에 현재 상태를 저장합니다. 세션이 중단되어도 이 파일에서 복원할 수 있습니다:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 워크플로우 진행 상태
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Phase 0: 디자인 싱크 (토큰 12개 추출)
✅ Phase 1: Spec 확정 (수락 기준 8개)
✅ Gate 1: 스펙 리뷰 통과
✅ Phase 1: Plan 확정 (4 Steps)
🔄 Phase 2: 구현 중 (Step 2/4)
⬜ Gate 2: 테스트 대기
⬜ Phase 3: 리뷰 대기
⬜ Gate 3: 품질 게이트 대기
⬜ PR 생성 대기
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Orchestrator vs 수동 모드

| 구분 | Orchestrator 모드 | 수동 모드 |
|------|------------------|----------|
| 시작 | 한 번의 명령 | 각 Phase별 명령 |
| Gate 검증 | 자동 (실패 시 자동 수정) | 직접 에이전트 호출 |
| 서브에이전트 | 자동 라우팅 (병렬/순차) | 직접 호출 |
| 상태 추적 | `workflow-state.json` | 수동 관리 |
| 에러 복구 | 자동 3회 재시도 | 직접 디버깅 |
| 적합한 경우 | 전체 기능 개발 | 부분 작업, 디버깅 |

---

## 전체 워크플로우 흐름

```
                    사용자 참여                    자동화
                  ─────────────               ─────────────
Phase 0           │                           │
(디자인 싱크)     │ Figma 링크 전달 ─────────→ get_variable_defs (토큰 추출)
                  │                           │ → figma-token-extractor
                  │                           │ → tokens.css + tailwind.config.ts
                  │                           │
                  │                           │ get_design_context (컴포넌트 분석)
                  │                           │ → get_code_connect_map (매핑 확인)
                  │ 토큰 Diff 확인            │
                  │                           │
Phase 1           │                           │
(개발 전)         │ Spec 작성 (대화형) ←────→ AI 질문/구체화
                  │      ↓                    │
                  │ Spec 확인 ──────────────→ spec-reviewer 에이전트
                  │      ↓                    │ (Gate 1)
                  │ Plan 확인 ──────────────→ plan.md 자동 생성
                  │                           │
Phase 2           │                           │
(개발 중)         │ 방향 지시 ──────────────→ Step별 구현
                  │                           │   ├→ figma-component-builder
                  │                           │   ├→ 자동 포매팅 (Prettier)
                  │                           │   ├→ 린트 검사 (ESLint)
                  │                           │   ├→ 타입 검사 (tsc)
                  │                           │   └→ 디자인 토큰 검사
                  │                           │
                  │                           │ test-writer 에이전트
                  │                           │ add_code_connect_map (매핑 등록)
                  │                           │ (Gate 2: 테스트 통과)
                  │                           │
Phase 3           │                           │
(개발 후)         │ PR 리뷰 ←───────────────── code-reviewer 에이전트
                  │                           │ design-reviewer 에이전트
                  │                           │ accessibility-checker
                  │                           │ security-reviewer
                  │                           │ (Gate 3: 품질 게이트)
                  │                           │
                  │ 배포 결정 ──────────────→ 자동 커밋 + PR 생성
```

---

## Phase 1: 개발 전

### Spec 작성 방법

새 기능 개발을 시작할 때 Claude에게 다음과 같이 요청합니다:

```
"사용자 프로필 수정 기능을 구현해야 해.
docs/spec.template.md를 기반으로 spec.md를 작성해줘."
```

Claude가 반복적으로 질문하며 요구사항을 구체화합니다:
- 어떤 필드를 수정할 수 있나요?
- 이미지 업로드가 필요한가요?
- 실시간 유효성 검사가 필요한가요?

**완성된 `docs/spec.md`는 Gate 1을 통과해야 합니다.**

### Gate 1: Spec Review
```
"spec-reviewer 에이전트로 docs/spec.md를 검토해줘"
```

spec-reviewer가 확인하는 항목:
- 수락 기준이 모두 테스트 가능한가
- 엣지 케이스가 충분히 고려되었는가
- 기존 아키텍처 패턴과 일관성이 있는가

### Plan 수립
```
"docs/plan.template.md를 기반으로 구현 계획을 만들어줘"
```

각 Step은 독립적으로 구현/테스트 가능해야 합니다.

---

## Phase 2: 개발 중

### Iterative Chunking 방식

Plan이 확정되면 Step 단위로 구현합니다:

```
"Step 1을 구현해줘"
→ (구현 + 자동 검증)
→ "테스트 통과 확인"

"Step 2로 넘어가줘"
→ (구현 + 자동 검증)
→ ...
```

### 자동으로 실행되는 훅들

| 시점 | 훅 | 동작 |
|------|-----|------|
| Bash 실행 전 | `security-guard.sh` | 위험 명령 차단 (rm -rf, force push 등) |
| 파일 수정 전 | `file-guard.sh` | 보호 파일 수정 차단 (.env, lock 파일 등) |
| 파일 수정 후 | `auto-format.sh` | Prettier 자동 실행 |
| 파일 수정 후 | `post-edit-lint.sh` | ESLint 에러 감지 → 컨텍스트 주입 |
| 파일 수정 후 | `post-edit-typecheck.sh` | TypeScript 에러 감지 → 컨텍스트 주입 |
| 파일 수정 후 | `design-sync-check.sh` | 하드코딩 색상/네이티브 HTML 감지 |

### 서브에이전트 활용

병렬로 실행 가능한 경우 (파일 겹침 없음):
```
"test-writer와 design-reviewer를 병렬로 실행해줘"
```

순차로 실행해야 하는 경우 (의존성 있음):
```
"Step 2를 먼저 구현하고, 완료되면 test-writer를 실행해줘"
```

---

## Phase 3: 개발 후

### Gate 3: 최종 품질 게이트

Claude가 작업을 완료하면 Stop 훅이 자동으로 실행됩니다:

1. **Prompt 훅**: 수락 기준 충족 여부 확인
2. **final-quality-gate.sh**: 테스트/타입/린트 통합 검증
3. **changelog-gen.sh**: 세션 로그 생성
4. **auto-commit.sh**: 자동 Git 커밋

품질 게이트 실패 시 Claude는 멈추지 않고 수정을 계속합니다.

### 코드 리뷰 요청
```
"code-reviewer 에이전트로 변경사항을 리뷰해줘"
```

### PR 생성
```
"변경사항으로 PR을 만들어줘"
```

---

## Figma MCP 디자인-투-코드 플로우

Figma MCP 연동을 통해 디자인에서 코드까지 양방향으로 동기화할 수 있습니다.

### 전체 Figma 플로우

```
Figma 디자인 파일
       │
       ├─── [1] 토큰 추출 ──────────────────────────────────┐
       │    get_variable_defs                                │
       │    → figma-token-extractor 에이전트                  │
       │    → shared/styles/tokens.css                       │
       │    → tailwind.config.ts theme.extend                │
       │                                                     │
       ├─── [2] 구조 분석 ──────────────────────────────────┐│
       │    get_metadata                                     ││
       │    → 레이어 구조 파악                                 ││
       │    → 구현 대상 노드 식별                              ││
       │                                                     ││
       ├─── [3] 디자인 컨텍스트 획득 ───────────────────────┐││
       │    get_design_context                               │││
       │    → 레퍼런스 코드 + 스크린샷                         │││
       │    get_code_connect_map                             │││
       │    → 이미 매핑된 컴포넌트 확인                        │││
       │                                                     │││
       ├─── [4] 컴포넌트 구현 ──────────────────────────────┤││
       │    figma-component-builder 에이전트                  │││
       │    → React 컴포넌트 생성                             │││
       │    → 디자인 토큰 적용                                │││
       │    → 접근성 + 상태 처리                              │││
       │                                                     │││
       ├─── [5] Code Connect 매핑 ──────────────────────────┤││
       │    add_code_connect_map                             │││
       │    → Figma ↔ 코드 양방향 연결                        │││
       │                                                     │││
       └─── [6] 디자인 피델리티 검증 ──────────────────────────┘┘┘
             design-reviewer 에이전트
             → 토큰 사용 검증
             → Figma 원본과 비교
```

### 사용법 1: 컬러 토큰 추출

Figma 파일에서 디자인 변수를 추출하여 CSS 토큰 파일로 변환합니다.

```
"이 Figma 파일에서 컬러 토큰을 추출해줘:
https://figma.com/design/ABC123/MyDesign?node-id=0-1"
```

**내부 실행 순서:**
1. `get_variable_defs` (nodeId: `0:1`, fileKey: `ABC123`)로 변수 추출
2. `figma-token-extractor` 에이전트가 변수를 분류 (컬러/간격/타이포/등)
3. CSS 커스텀 프로퍼티 생성 → `shared/styles/tokens.css`
4. Tailwind 테마 확장 → `tailwind.config.ts`
5. 라이트/다크 모드 자동 분리
6. 기존 토큰과 Diff 리포트 출력

**생성되는 파일 예시:**
```css
/* shared/styles/tokens.css */
:root {
  /* Color - Primary */
  --color-primary-50: #EFF6FF;
  --color-primary-500: #3B82F6;
  --color-primary-900: #1E3A8A;

  /* Color - Semantic */
  --color-bg-primary: #FFFFFF;
  --color-text-primary: #111827;
  --color-border-default: #E5E7EB;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

[data-theme="dark"] {
  --color-bg-primary: #111827;
  --color-text-primary: #F9FAFB;
  --color-border-default: #374151;
}
```

### 사용법 2: 디자인 시스템 컴포넌트 구현

Figma에 정의된 컴포넌트를 React 코드로 변환합니다.

```
"이 Figma 컴포넌트를 구현해줘:
https://figma.com/design/ABC123/MyDesign?node-id=42-100"
```

**내부 실행 순서:**
1. `get_design_context`로 레퍼런스 코드 + 스크린샷 획득
2. `get_code_connect_map`으로 이미 매핑된 하위 컴포넌트 확인
3. `figma-component-builder` 에이전트가 구현:
   - Figma Auto Layout → Flexbox/Grid 변환
   - Figma Variant → React Props 변환
   - 디자인 토큰 적용 (하드코딩 금지)
   - 접근성 속성 추가
   - 모든 인터랙션 상태 구현
4. `add_code_connect_map`으로 Figma ↔ 코드 매핑 등록
5. `design-sync-check.sh` 훅이 자동으로 토큰 사용 검증

### 사용법 3: 페이지 전체 구현

Figma 페이지의 전체 구조를 분석하고 컴포넌트 단위로 분해하여 구현합니다.

```
"이 Figma 페이지를 구현해줘:
https://figma.com/design/ABC123/MyDesign?node-id=100-1"
```

**내부 실행 순서:**
1. `get_metadata`로 페이지의 전체 레이어 구조 파악
2. 구현 대상 노드들을 식별하고 의존성 그래프 작성
3. 토큰 추출 (아직 없는 경우)
4. 하위 컴포넌트부터 상위 페이지까지 Bottom-Up 구현
5. 각 컴포넌트마다 Code Connect 매핑 등록

### 사용법 4: 양방향 동기화 (디자인 변경 반영)

디자이너가 Figma에서 수정한 후 코드에 반영합니다.

```
"Figma에서 Button 컴포넌트가 업데이트됐어. 변경사항을 반영해줘:
https://figma.com/design/ABC123/MyDesign?node-id=42-100"
```

**내부 실행 순서:**
1. `get_design_context`로 최신 디자인 컨텍스트 획득
2. `get_code_connect_map`으로 기존 매핑된 코드 파일 확인
3. 스크린샷과 기존 구현을 비교하여 변경사항 식별
4. 변경된 부분만 업데이트 (전체 재작성 아님)
5. `design-reviewer` 에이전트로 피델리티 검증

### Figma MCP 도구 레퍼런스

| 도구 | 설명 | 주요 파라미터 |
|------|------|-------------|
| `get_variable_defs` | 디자인 변수(토큰) 추출 | `nodeId`, `fileKey` |
| `get_metadata` | 레이어 구조 (이름, 위치, 크기) | `nodeId`, `fileKey` |
| `get_design_context` | 레퍼런스 코드 + 스크린샷 (**주로 사용**) | `nodeId`, `fileKey` |
| `get_screenshot` | 특정 노드 스크린샷 | `nodeId`, `fileKey` |
| `get_code_connect_map` | 이미 매핑된 컴포넌트 조회 | `nodeId`, `fileKey` |
| `get_code_connect_suggestions` | AI 추천 코드 매핑 | `nodeId`, `fileKey` |
| `add_code_connect_map` | Figma ↔ 코드 매핑 1건 등록 | `nodeId`, `fileKey`, `componentName`, `source`, `label` |
| `send_code_connect_mappings` | 다수 매핑 일괄 등록 | `nodeId`, `fileKey`, `mappings[]` |

> **Figma URL 파싱 규칙:**
> `https://figma.com/design/:fileKey/:fileName?node-id=1-2`
> → `fileKey` = URL의 `:fileKey` 부분, `nodeId` = `1:2` (`-`를 `:`로 변환)

### 관련 서브에이전트

| 에이전트 | 역할 | 사용 시점 |
|---------|------|----------|
| `figma-token-extractor` | 변수 → CSS 토큰 변환 | 토큰 동기화 시 |
| `figma-component-builder` | 디자인 → React 컴포넌트 | 컴포넌트 구현 시 |
| `design-reviewer` | 디자인 피델리티 검증 | 구현 완료 후 |

---

## 훅 커스터마이징

### 훅 비활성화
`settings.json`에서 해당 훅 블록을 제거하세요.

### 보호 파일 추가
`file-guard.sh`의 `BLOCKED_FILES` 또는 `BLOCKED_DIRS` 배열에 추가하세요.

### 새 서브에이전트 추가
`.claude/agents/` 디렉토리에 마크다운 파일을 추가하세요. 형식:

```yaml
---
name: agent-name
description: 에이전트 설명
tools: Read, Write, Bash, Grep, Glob
model: sonnet  # 또는 opus (깊은 분석 필요 시)
---

프롬프트 내용...
```

---

## 파일 구조 참조

```
프로젝트 루트/
├── CLAUDE.md                              ← 프로젝트 전체 컨텍스트
├── .claude/
│   ├── settings.json                      ← 훅 설정 (Git 커밋 O)
│   ├── agents/
│   │   ├── spec-reviewer.md               ← Gate 1: 스펙 리뷰
│   │   ├── test-writer.md                 ← 테스트 작성
│   │   ├── code-reviewer.md               ← Gate 3: 코드 리뷰
│   │   ├── design-reviewer.md             ← 디자인 일치 검토
│   │   ├── accessibility-checker.md       ← WCAG 접근성 검사
│   │   ├── security-reviewer.md           ← 보안 취약점 검토
│   │   ├── figma-token-extractor.md       ← Figma 변수 → CSS 토큰
│   │   ├── figma-component-builder.md     ← Figma 디자인 → React 컴포넌트
│   │   └── orchestrator.md               ← 전체 워크플로우 자동 조율
│   ├── hooks/
│   │   ├── pre-dev/
│   │   │   └── env-check.sh               ← SessionStart: 환경 검증
│   │   ├── dev/
│   │   │   ├── auto-format.sh             ← PostToolUse: Prettier
│   │   │   ├── security-guard.sh          ← PreToolUse: 보안 차단
│   │   │   ├── file-guard.sh              ← PreToolUse: 파일 보호
│   │   │   ├── post-edit-lint.sh          ← PostToolUse: ESLint
│   │   │   ├── post-edit-typecheck.sh     ← PostToolUse: tsc
│   │   │   └── design-sync-check.sh       ← PostToolUse: 디자인 토큰 검사
│   │   └── post-dev/
│   │       ├── final-quality-gate.sh      ← Stop: 품질 게이트
│   │       ├── changelog-gen.sh           ← Stop: 변경 로그
│   │       └── auto-commit.sh             ← Stop: 자동 커밋
│   └── logs/                              ← 세션 로그 저장
└── docs/
    ├── spec.template.md                   ← Spec 작성 템플릿
    ├── plan.template.md                   ← Plan 작성 템플릿
    ├── spec.md                            ← (기능별 생성)
    └── plan.md                            ← (기능별 생성)
```

---

## 종합 워크플로우 요약표

| 단계 | 실행 시점 | 훅/도구 | 검증 방식 | 통과 기준 |
|------|----------|---------|----------|----------|
| 환경 검증 | SessionStart | Command 훅 | 도구 버전, 의존성 | 필수 도구 존재 |
| 스펙 작성 | 개발 전 | 대화형 + spec-reviewer | Prompt 기반 완전성 검토 | 수락 기준 테스트 가능 |
| 계획 수립 | 스펙 확정 후 | 대화형 + plan.md | 인간 확인 | 각 단계 독립 실행 가능 |
| 보안 가드 | PreToolUse (Bash) | Command 훅 | 패턴 매칭 (exit 2) | 위험 명령 없음 |
| 파일 보호 | PreToolUse (Write) | Command 훅 | 파일 목록 매칭 | 보호 파일 미수정 |
| 자동 포매팅 | PostToolUse (Write) | Command 훅 | Prettier | 항상 통과 |
| 린트 검사 | PostToolUse (Write) | Command 훅 | ESLint | 에러 0개 |
| 타입 검사 | PostToolUse (Write) | Command 훅 | tsc --noEmit | 에러 0개 |
| 디자인 토큰 | PostToolUse (Write) | Command 훅 | grep 기반 | 하드코딩 0개 |
| 수락 기준 | Stop | Prompt 훅 | AI가 spec.md 대조 | 모든 항목 충족 |
| 품질 게이트 | Stop | Command 훅 | 테스트+타입+린트 | 모두 통과 |
| 코드 리뷰 | 구현 완료 후 | code-reviewer 에이전트 | AI 리뷰 | Critical 0개 |
| 디자인 리뷰 | 구현 완료 후 | design-reviewer 에이전트 | AI + Figma 비교 | 불일치 없음 |
| 자동 커밋 | Stop | Command 훅 | Git commit | 성공 |
| **Figma 토큰 추출** | Figma 링크 제공 시 | `get_variable_defs` + figma-token-extractor | Diff 리포트 | 토큰 파일 생성 |
| **Figma 컴포넌트 구현** | 디자인 구현 시 | `get_design_context` + figma-component-builder | 디자인 피델리티 | Code Connect 매핑 완료 |
| **Code Connect 매핑** | 컴포넌트 구현 후 | `add_code_connect_map` | 양방향 연결 | Figma ↔ 코드 연결 |
