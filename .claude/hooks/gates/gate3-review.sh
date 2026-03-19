#!/bin/bash
# ============================================================
# Gate 3: 리뷰 결과 종합
# 입력: 리뷰 결과 JSON 파일 경로 (code-reviewer, security, a11y, design)
# 출력: JSON { "pass": bool, "agents": [...], "summary": {...} }
# ============================================================

# 변경된 파일 목록
CHANGED_FILES=$(git diff main...HEAD --name-only 2>/dev/null || git diff HEAD~1 --name-only 2>/dev/null)

# 어떤 리뷰 에이전트가 필요한지 판단
AGENTS=()

# 항상 실행: code-reviewer
AGENTS+=("code-reviewer")

# src/ 파일이 변경된 경우: security-reviewer
if echo "$CHANGED_FILES" | grep -q "^src/"; then
  AGENTS+=("security-reviewer")
fi

# UI 컴포넌트가 변경된 경우: accessibility-checker
if echo "$CHANGED_FILES" | grep -qE "(shared/ui|pages|widgets|features).*\.tsx$"; then
  AGENTS+=("accessibility-checker")
fi

# Figma 매핑이 있는 파일이 변경된 경우: design-reviewer
if [ -f ".claude/figma-component-map.json" ]; then
  HAS_FIGMA_FILES=false
  while IFS= read -r file; do
    if grep -q "$(basename "$file" .tsx)" .claude/figma-component-map.json 2>/dev/null; then
      HAS_FIGMA_FILES=true
      break
    fi
  done <<< "$(echo "$CHANGED_FILES" | grep '\.tsx$')"
  if [ "$HAS_FIGMA_FILES" = true ]; then
    AGENTS+=("design-reviewer")
  fi
fi

# 에이전트 목록 JSON
AGENTS_JSON=$(printf '%s\n' "${AGENTS[@]}" | jq -R . | jq -s .)

# 병렬 실행 가능 여부 (3개 이상이면 병렬)
PARALLEL=false
if [ ${#AGENTS[@]} -ge 3 ]; then PARALLEL=true; fi

echo "{\"agents\":${AGENTS_JSON},\"parallel\":${PARALLEL},\"changedFiles\":$(echo "$CHANGED_FILES" | jq -R . | jq -s .)}" | jq .
