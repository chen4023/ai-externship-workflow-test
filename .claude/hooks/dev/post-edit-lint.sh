#!/bin/bash
# ============================================================
# PostToolUse Hook: ESLint 린트 검사
# 실행 시점: Claude가 파일을 수정한 직후
# Matcher: Write|Edit|MultiEdit
# 단계: 2단계 (높은 가치)
# ============================================================

HOOK_INPUT=$(cat)
FILE_PATH=$(echo "$HOOK_INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

# 파일 경로가 없으면 종료
[ -z "$FILE_PATH" ] && exit 0

# TypeScript/JavaScript 파일만 대상
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx)
    if [ -f "node_modules/.bin/eslint" ]; then
      ERRORS=$(npx eslint "$FILE_PATH" --quiet 2>&1)
      EXIT_CODE=$?
      if [ $EXIT_CODE -ne 0 ]; then
        # 에러 내용을 20줄로 제한
        TRUNCATED=$(echo "$ERRORS" | head -20)
        jq -n --arg ctx "⚠️ ESLint errors in $FILE_PATH:\n$TRUNCATED" \
          '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
      fi
    fi
    ;;
esac

# 린트 에러는 경고 (non-blocking)
exit 0
