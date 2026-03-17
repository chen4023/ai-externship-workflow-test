#!/bin/bash
# ============================================================
# PostToolUse Hook: 자동 포매팅 (Prettier)
# 실행 시점: Claude가 파일을 수정한 직후
# Matcher: Write|Edit|MultiEdit
# 단계: 1단계 (즉시 도입 - 리스크 제로)
# ============================================================

HOOK_INPUT=$(cat)
FILE_PATH=$(echo "$HOOK_INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

# 파일 경로가 없으면 종료
[ -z "$FILE_PATH" ] && exit 0

# 포매팅 대상 확장자
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.css|*.scss|*.json|*.md|*.html)
    if command -v npx &>/dev/null && [ -f "node_modules/.bin/prettier" ]; then
      npx prettier --write "$FILE_PATH" 2>/dev/null
    fi
    ;;
esac

# 포매팅은 항상 성공 (non-blocking)
exit 0
