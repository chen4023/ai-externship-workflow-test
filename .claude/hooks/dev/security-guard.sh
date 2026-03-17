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
