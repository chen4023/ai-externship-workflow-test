#!/bin/bash
# ============================================================
# PostToolUse Hook: 디자인 싱크 검사
# 실행 시점: Claude가 UI 관련 파일을 수정한 직후
# Matcher: Write|Edit|MultiEdit
# 단계: 3단계 (고급 - Figma MCP 연동)
# ============================================================

HOOK_INPUT=$(cat)
FILE_PATH=$(echo "$HOOK_INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

# 파일 경로가 없으면 종료
[ -z "$FILE_PATH" ] && exit 0

# UI 컴포넌트 파일인 경우에만 실행
if [[ "$FILE_PATH" == *"/components/"* || "$FILE_PATH" == *"/ui/"* || "$FILE_PATH" == *"/pages/"* || "$FILE_PATH" == *"/widgets/"* || "$FILE_PATH" == *"/features/"* ]]; then

  WARNINGS=""

  # 1. 하드코딩된 색상값 감지
  HARDCODED=$(grep -cE '#[0-9a-fA-F]{3,8}|rgb\(|rgba\(' "$FILE_PATH" 2>/dev/null || echo "0")
  if [ "$HARDCODED" -gt 0 ]; then
    WARNINGS="${WARNINGS}⚠️ 하드코딩된 색상값 ${HARDCODED}개 발견. 디자인 토큰(CSS 변수)을 사용하세요.\n"
  fi

  # 2. 네이티브 HTML 요소 사용 감지 (디자인 시스템 컴포넌트 우선)
  if grep -qE '<button[^A-Z]|<input[^A-Z]|<select[^A-Z]' "$FILE_PATH" 2>/dev/null; then
    WARNINGS="${WARNINGS}⚠️ 네이티브 HTML 요소(<button>, <input>, <select>) 감지. shared/ui/ 디자인 시스템 컴포넌트를 우선 사용하세요.\n"
  fi

  # 3. Tailwind arbitrary values 과다 사용 감지
  ARBITRARY=$(grep -coE '\[(#|[0-9]+px|[0-9]+rem)' "$FILE_PATH" 2>/dev/null || echo "0")
  if [ "$ARBITRARY" -gt 5 ]; then
    WARNINGS="${WARNINGS}⚠️ Tailwind arbitrary values ${ARBITRARY}개. tailwind.config의 테마 설정을 사용하세요.\n"
  fi

  # 4. 인라인 스타일 감지
  INLINE_STYLES=$(grep -cE 'style=\{' "$FILE_PATH" 2>/dev/null || echo "0")
  if [ "$INLINE_STYLES" -gt 0 ]; then
    WARNINGS="${WARNINGS}⚠️ 인라인 스타일 ${INLINE_STYLES}개 발견. Tailwind 클래스 또는 디자인 토큰을 사용하세요.\n"
  fi

  # 경고가 있으면 컨텍스트 주입
  if [ -n "$WARNINGS" ]; then
    jq -n --arg ctx "$WARNINGS" \
      '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
  fi
fi

exit 0
