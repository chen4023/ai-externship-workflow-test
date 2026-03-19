#!/bin/bash
# ============================================================
# PreToolUse Hook: PR Merge 차단 게이트
# Matcher: Bash
#
# gh pr merge 실행 전에 필수 조건을 검증한다.
# 조건 미충족 시 exit 2로 merge를 차단한다.
# ============================================================

HOOK_INPUT=$(cat 2>/dev/null)
COMMAND=$(echo "$HOOK_INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)

# gh pr merge 명령만 대상
case "$COMMAND" in
  *"pr merge"*) ;;
  *) exit 0 ;;
esac

STATE_FILE=".claude/workflow-state.json"

if [ ! -f "$STATE_FILE" ]; then
  echo "🚫 workflow-state.json이 없습니다. FIGMA_VERIFY + PR_REVIEW를 먼저 수행하세요."
  exit 2
fi

# UI 파일 변경 확인
CHANGED_FILES=$(git diff main...HEAD --name-only 2>/dev/null)
HAS_UI=0
if echo "$CHANGED_FILES" | grep -qE '^src/(pages|shared/ui)/' 2>/dev/null; then
  HAS_UI=1
fi

BLOCK=""

# FIGMA_VERIFY
if [ "$HAS_UI" -eq 1 ]; then
  FV=$(jq -r '.figmaVerified // false' "$STATE_FILE" 2>/dev/null)
  if [ "$FV" != "true" ]; then
    BLOCK="${BLOCK}FIGMA_VERIFY 미완료. "
  fi
fi

# PR_REVIEW
PR=$(jq -r '.prReviewCompleted // false' "$STATE_FILE" 2>/dev/null)
if [ "$PR" != "true" ]; then
  BLOCK="${BLOCK}PR_REVIEW 미완료. "
fi

if [ -n "$BLOCK" ]; then
  echo "🚫 머지 차단: ${BLOCK}workflow-state.json에 플래그를 설정하세요."
  exit 2
fi

exit 0
