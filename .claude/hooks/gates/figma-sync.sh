#!/bin/bash
# ============================================================
# Figma 디자인 싱크 판단
# 입력: Figma URL 또는 컴포넌트 경로
# 출력: JSON { "needsSync": bool, "actions": [...], "components": [...] }
# ============================================================

FIGMA_URL="${1:-}"
COMPONENT_PATH="${2:-}"
MAP_FILE=".claude/figma-component-map.json"

if [ ! -f "$MAP_FILE" ]; then
  echo '{"needsSync":false,"reason":"figma-component-map.json 없음","actions":[]}'
  exit 0
fi

FILE_KEY=$(jq -r '.figmaFileKey' "$MAP_FILE")

# ── Figma URL이 주어진 경우: 토큰 추출 + 컴포넌트 분석 ──
if [ -n "$FIGMA_URL" ]; then
  # URL에서 nodeId 파싱
  NODE_ID=$(echo "$FIGMA_URL" | grep -oP 'node-id=\K[^&]+' | sed 's/-/:/g')

  ACTIONS='["get_variable_defs","get_design_context","get_metadata"]'
  AGENTS='["figma-token-extractor","figma-component-builder"]'

  echo "{\"needsSync\":true,\"fileKey\":\"${FILE_KEY}\",\"nodeId\":\"${NODE_ID}\",\"actions\":${ACTIONS},\"agents\":${AGENTS}}" | jq .
  exit 0
fi

# ── 컴포넌트 경로가 주어진 경우: 해당 컴포넌트의 Figma 매핑 확인 ──
if [ -n "$COMPONENT_PATH" ]; then
  COMPONENT_NAME=$(basename "$COMPONENT_PATH" .tsx)

  # figma-component-map에서 해당 컴포넌트의 nodeId 찾기 (객체 구조, variant 지원)
  NODE_INFO=$(jq -r --arg name "$COMPONENT_NAME" '
    .components[$name] // empty |
    if type == "object" then
      (.nodeId // (.variants | to_entries[0].value.nodeId) // empty)
    else empty end
  ' "$MAP_FILE" 2>/dev/null)

  if [ -n "$NODE_INFO" ]; then
    echo "{\"needsSync\":true,\"fileKey\":\"${FILE_KEY}\",\"nodeId\":\"${NODE_INFO}\",\"component\":\"${COMPONENT_NAME}\",\"actions\":[\"get_design_context\"],\"agents\":[\"design-reviewer\"]}" | jq .
  else
    echo "{\"needsSync\":false,\"reason\":\"${COMPONENT_NAME}에 대한 Figma 매핑 없음\"}" | jq .
  fi
  exit 0
fi

# ── 인자 없음: 변경된 파일 기반 자동 판단 ──
CHANGED=$(git diff --name-only HEAD~1 2>/dev/null || git status --porcelain | awk '{print $2}')
COMPONENTS_NEEDING_SYNC=()

while IFS= read -r file; do
  if [[ "$file" =~ \.tsx$ ]]; then
    COMP_NAME=$(basename "$file" .tsx)
    HAS_MAP=$(jq -r --arg name "$COMP_NAME" '.components[$name] // empty | if . != "" and . != null then $name else empty end' "$MAP_FILE" 2>/dev/null)
    if [ -n "$HAS_MAP" ]; then
      COMPONENTS_NEEDING_SYNC+=("$COMP_NAME")
    fi
  fi
done <<< "$CHANGED"

if [ ${#COMPONENTS_NEEDING_SYNC[@]} -gt 0 ]; then
  COMP_JSON=$(printf '%s\n' "${COMPONENTS_NEEDING_SYNC[@]}" | jq -R . | jq -s .)
  echo "{\"needsSync\":true,\"components\":${COMP_JSON},\"agents\":[\"design-reviewer\"]}" | jq .
else
  echo '{"needsSync":false,"components":[]}'
fi
