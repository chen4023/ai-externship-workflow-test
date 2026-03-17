#!/bin/bash
# ============================================================
# PreToolUse Hook: 파일 보호 가드
# 실행 시점: Claude가 파일을 수정하기 직전
# Matcher: Write|Edit|MultiEdit
# 단계: 2단계 (높은 가치)
# ============================================================

HOOK_INPUT=$(cat)
FILE_PATH=$(echo "$HOOK_INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

# 파일 경로가 없으면 통과
[ -z "$FILE_PATH" ] && exit 0

# ── 수정 차단 대상 (exit 2) ──
BLOCKED_FILES=(
  ".env"
  ".env.local"
  ".env.production"
  ".env.staging"
  "package-lock.json"
  "pnpm-lock.yaml"
  "yarn.lock"
)

BLOCKED_DIRS=(
  ".github/workflows/"
  "node_modules/"
  ".husky/"
)

# 파일명 직접 매칭
BASENAME=$(basename "$FILE_PATH")
for blocked in "${BLOCKED_FILES[@]}"; do
  if [ "$BASENAME" = "$blocked" ]; then
    echo "🚫 차단됨: $blocked 파일은 직접 수정할 수 없습니다."
    exit 2
  fi
done

# 디렉토리 경로 매칭
for dir in "${BLOCKED_DIRS[@]}"; do
  if echo "$FILE_PATH" | grep -q "$dir"; then
    echo "🚫 차단됨: $dir 경로의 파일은 직접 수정할 수 없습니다."
    exit 2
  fi
done

# ── 경고 대상 (컨텍스트 주입) ──
WARN_CONTEXT=""

# 디자인 토큰 원본 파일
if echo "$FILE_PATH" | grep -qE 'tokens\.(css|json|js)$'; then
  WARN_CONTEXT="⚠️ 디자인 토큰 원본 파일입니다. Figma → Style Dictionary 파이프라인으로만 변경해야 합니다."
fi

# 설정 파일
if echo "$FILE_PATH" | grep -qE '(vite\.config|tsconfig|tailwind\.config|eslint)'; then
  WARN_CONTEXT="⚠️ 프로젝트 설정 파일을 수정합니다. 사이드 이펙트가 있을 수 있습니다."
fi

if [ -n "$WARN_CONTEXT" ]; then
  jq -n --arg ctx "$WARN_CONTEXT" \
    '{"hookSpecificOutput":{"hookEventName":"PreToolUse","additionalContext":$ctx}}'
fi

exit 0
