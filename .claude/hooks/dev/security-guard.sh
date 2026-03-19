#!/bin/bash
# ============================================================
# PreToolUse Hook: 보안 가드
# 실행 시점: Claude가 Bash 명령을 실행하기 직전
# Matcher: Bash
# 단계: 2단계 (높은 가치)
# ============================================================

HOOK_INPUT=$(cat)
COMMAND=$(echo "$HOOK_INPUT" | jq -r '.tool_input.command // empty')

# 명령이 없으면 통과
[ -z "$COMMAND" ] && exit 0

# ── 차단 패턴 (exit 2 → 동작 취소) ──
BLOCKED_PATTERNS=(
  "rm -rf /"
  "rm -rf /*"
  "rm -rf ~"
  ":(){ :|:& };:"
  "mkfs"
  "> /dev/sda"
  "dd if=/dev/zero"
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qF "$pattern"; then
    echo "🚫 차단됨: 파괴적 명령어가 감지되었습니다 → $pattern"
    exit 2
  fi
done

# ── main/master 브랜치 커밋 차단 ──
if echo "$COMMAND" | grep -qE 'git\s+commit'; then
  CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
  if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
    echo "🚫 차단됨: main 브랜치에 직접 커밋할 수 없습니다. 피처 브랜치를 생성하세요."
    exit 2
  fi
fi

# ── 경고 패턴 (exit 0 + 컨텍스트 주입) ──
WARN_CONTEXT=""

# curl | bash (원격 스크립트 실행)
if echo "$COMMAND" | grep -qE 'curl\s+.*\|\s*(bash|sh|zsh)'; then
  WARN_CONTEXT="⚠️ 원격 스크립트 실행이 감지되었습니다. 신뢰할 수 있는 소스인지 확인하세요."
fi

# git push --force
if echo "$COMMAND" | grep -qE 'git\s+push\s+.*--force'; then
  echo "🚫 차단됨: force push는 허용되지 않습니다. 사용자에게 먼저 확인하세요."
  exit 2
fi

# npm publish
if echo "$COMMAND" | grep -qE 'npm\s+publish|pnpm\s+publish'; then
  echo "🚫 차단됨: 의도치 않은 배포를 방지합니다. 사용자에게 먼저 확인하세요."
  exit 2
fi

# ── gh pr merge 차단 (모든 Gate 필수) ──
if echo "$COMMAND" | grep -q 'pr merge'; then
  STATE_FILE=".claude/workflow-state.json"
  if [ ! -f "$STATE_FILE" ]; then
    echo "🚫 머지 차단: workflow-state.json이 없습니다. 전체 워크플로우를 먼저 수행하세요."
    exit 2
  fi
  BLOCK=""
  # GATE1: spec 검증 필수
  G1=$(jq -r '.gateResults.gate1 // "null"' "$STATE_FILE" 2>/dev/null)
  [ "$G1" = "null" ] && BLOCK="${BLOCK}GATE1(spec 검증) 미실행. "
  # GATE2: 타입/린트/테스트 검증
  G2=$(jq -r '.gateResults.gate2 // "null"' "$STATE_FILE" 2>/dev/null)
  [ "$G2" = "null" ] && BLOCK="${BLOCK}GATE2(품질 검증) 미실행. "
  # GATE3: 코드 리뷰 에이전트 실행
  G3=$(jq -r '.gateResults.gate3 // "null"' "$STATE_FILE" 2>/dev/null)
  [ "$G3" = "null" ] && BLOCK="${BLOCK}GATE3(리뷰 에이전트) 미실행. "
  # FIGMA_VERIFY: 스크린샷 비교 필수
  FV=$(jq -r '.figmaVerified // false' "$STATE_FILE" 2>/dev/null)
  [ "$FV" != "true" ] && BLOCK="${BLOCK}FIGMA_VERIFY(스크린샷 비교) 미완료. "
  # PR_REVIEW: 인라인 코멘트 필수
  PR=$(jq -r '.prReviewCompleted // false' "$STATE_FILE" 2>/dev/null)
  [ "$PR" != "true" ] && BLOCK="${BLOCK}PR_REVIEW(인라인 코멘트) 미완료. "
  if [ -n "$BLOCK" ]; then
    echo "🚫 머지 차단: ${BLOCK}workflow-state.json에 플래그를 설정하세요."
    exit 2
  fi
fi

# git reset --hard
if echo "$COMMAND" | grep -qE 'git\s+reset\s+--hard'; then
  WARN_CONTEXT="⚠️ git reset --hard는 변경사항을 영구적으로 삭제합니다. 정말 필요한지 확인하세요."
fi

# 경고 컨텍스트가 있으면 주입
if [ -n "$WARN_CONTEXT" ]; then
  jq -n --arg ctx "$WARN_CONTEXT" \
    '{"hookSpecificOutput":{"hookEventName":"PreToolUse","additionalContext":$ctx}}'
fi

exit 0
