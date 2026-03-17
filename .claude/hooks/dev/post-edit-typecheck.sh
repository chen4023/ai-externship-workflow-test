#!/bin/bash
# ============================================================
# PostToolUse Hook: TypeScript 타입 검사
# 실행 시점: Claude가 파일을 수정한 직후
# Matcher: Write|Edit|MultiEdit
# 단계: 2단계 (높은 가치)
# ============================================================

HOOK_INPUT=$(cat)
FILE_PATH=$(echo "$HOOK_INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

# 파일 경로가 없으면 종료
[ -z "$FILE_PATH" ] && exit 0

# TypeScript 파일만 대상
case "$FILE_PATH" in
  *.ts|*.tsx)
    if [ -f "node_modules/.bin/tsc" ]; then
      ERRORS=$(npx tsc --noEmit 2>&1 | head -20)
      if [ -n "$ERRORS" ] && echo "$ERRORS" | grep -q "error TS"; then
        jq -n --arg ctx "⚠️ TypeScript errors:\n$ERRORS" \
          '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
      fi
    fi
    ;;
esac

exit 0
