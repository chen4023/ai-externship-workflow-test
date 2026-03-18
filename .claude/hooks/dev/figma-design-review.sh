#!/bin/bash
# ============================================================
# PostToolUse Hook: Figma 디자인 리뷰 자동 트리거
# 실행 시점: src/pages/ 또는 shared/ui/ 파일 수정 직후
# Matcher: Write|Edit|MultiEdit
#
# 1) src/pages/ 파일 → 상단 Figma 링크 + Figma-states 파싱
#    → 페이지 base + state별 nodeId + 공통 컴포넌트 매핑 → design-reviewer 호출 유도
# 2) shared/ui/ 파일 → figma-component-map.json에서 nodeId 조회 → 비교 유도
# ============================================================

HOOK_INPUT=$(cat)
FILE_PATH=$(echo "$HOOK_INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

[ -z "$FILE_PATH" ] && exit 0

# .tsx/.ts/.jsx/.js 파일만 대상
[[ ! "$FILE_PATH" =~ \.(tsx|ts|jsx|js)$ ]] && exit 0
[ ! -f "$FILE_PATH" ] && exit 0

PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
[ -z "$PROJECT_ROOT" ] && exit 0

MAP_FILE="$PROJECT_ROOT/.claude/figma-component-map.json"
# hook은 항상 프로젝트 루트에서 실행되므로 상대 경로 fallback
[ ! -f "$MAP_FILE" ] && MAP_FILE=".claude/figma-component-map.json"

# ──────────────────────────────────────
# Case 1: src/pages/ 파일 수정
# ──────────────────────────────────────
if [[ "$FILE_PATH" == *"/src/pages/"* ]]; then

  # 상단 5줄에서 Figma 링크 추출 (인코딩된 URL 포함)
  FIGMA_URL=$(head -5 "$FILE_PATH" | grep -oE 'https://www\.figma\.com/(design|file)/[A-Za-z0-9_%-]+/[^ */)]*' | head -1)

  if [ -z "$FIGMA_URL" ]; then
    FILENAME=$(basename "$FILE_PATH")
    CTX="⚠️ src/pages/ 파일(${FILENAME})이 수정되었으나 상단에 Figma 페이지 링크가 없습니다.
파일 상단에 다음 형식으로 Figma 링크를 추가하세요:
// Figma: https://www.figma.com/design/{fileKey}/{fileName}?node-id={nodeId}
// Figma-states: login  (← figma-component-map.json의 pages 키)"
    jq -n --arg ctx "$CTX" \
      '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
    exit 0
  fi

  # Figma URL에서 fileKey, nodeId 파싱
  FILE_KEY=$(echo "$FIGMA_URL" | sed -nE 's|.*/design/([^/]+)/.*|\1|p')
  [ -z "$FILE_KEY" ] && FILE_KEY=$(echo "$FIGMA_URL" | sed -nE 's|.*/file/([^/]+)/.*|\1|p')
  NODE_ID=$(echo "$FIGMA_URL" | sed -nE 's|.*node-id=([^&]+).*|\1|p')

  # 상단 5줄에서 Figma-states 키 추출
  PAGE_KEY=$(head -5 "$FILE_PATH" | grep -oE 'Figma-states:\s*\S+' | sed 's/Figma-states:\s*//')

  # pages 매핑에서 상태 정보 추출
  PAGE_STATES=""
  if [ -n "$PAGE_KEY" ] && [ -f "$MAP_FILE" ]; then
    PAGE_INFO=$(jq -r --arg key "$PAGE_KEY" '
      .pages[$key] // empty |
      if . then
        "📄 페이지: \(.description)\n" +
        (if .base then "  base: nodeId=\(.base.nodeId) (\(.base.name))\n" else "" end) +
        (if .states then
          "  상태별 프레임:\n" +
          ([.states | to_entries[] | "    - \(.key): nodeId=\(.value.nodeId) (\(.value.name))"] | join("\n"))
        else "" end)
      else empty end
    ' "$MAP_FILE" 2>/dev/null)
    if [ -n "$PAGE_INFO" ]; then
      PAGE_STATES="$PAGE_INFO"
    fi
  fi

  # 사용된 공통 컴포넌트 추출 (import 문에서)
  USED_COMPONENTS=""
  if [ -f "$MAP_FILE" ]; then
    COMP_NAMES=$(jq -r '.components | keys[]' "$MAP_FILE" 2>/dev/null)
    for COMP in $COMP_NAMES; do
      if grep -q "import.*${COMP}" "$FILE_PATH" 2>/dev/null; then
        COMP_INFO=$(jq -r --arg c "$COMP" '.components[$c] | if .nodeId then "  - \($c): nodeId=\(.nodeId)" elif .variants then "  - \($c): " + ([.variants | to_entries[] | "\(.key)=\(.value.nodeId)"] | join(", ")) else empty end' "$MAP_FILE" 2>/dev/null)
        USED_COMPONENTS="${USED_COMPONENTS}${COMP_INFO}\n"
      fi
    done
  fi

  REVIEW_CTX="🎨 [Figma 디자인 리뷰 필요] src/pages/ 파일이 수정되었습니다.
수정된 파일: ${FILE_PATH}
Figma URL: ${FIGMA_URL}
File Key: ${FILE_KEY:-미파싱}
Node ID: ${NODE_ID:-미파싱}"

  if [ -n "$PAGE_STATES" ]; then
    REVIEW_CTX="${REVIEW_CTX}

$(echo -e "$PAGE_STATES")"
  fi

  if [ -n "$USED_COMPONENTS" ]; then
    REVIEW_CTX="${REVIEW_CTX}

📦 이 페이지에서 사용 중인 공통 컴포넌트 (Figma nodeId 매핑):
$(echo -e "$USED_COMPONENTS")"
  fi

  REVIEW_CTX="${REVIEW_CTX}

👉 design-reviewer 에이전트를 호출하여 검증하세요:
1. 페이지 base: get_design_context(fileKey='${FILE_KEY}', nodeId='${NODE_ID}')로 기본 레이아웃 비교
2. 상태별 프레임: 위 상태 nodeId별로 모달/팝업 등 열린 상태의 전체 화면 비교
3. 공통 컴포넌트: import된 컴포넌트의 nodeId로 개별 디자인 비교
4. 불일치 항목이 있으면 수정 제안
5. 매핑 파일: .claude/figma-component-map.json 참조"

  jq -n --arg ctx "$REVIEW_CTX" \
    '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
  exit 0
fi

# ──────────────────────────────────────
# Case 2: shared/ui/ 파일 수정
# ──────────────────────────────────────
if [[ "$FILE_PATH" == *"/shared/ui/"* ]] && [ -f "$MAP_FILE" ]; then

  # 파일 경로에서 컴포넌트명 추출 (shared/ui/Button/Button.tsx → Button)
  REL_PATH="${FILE_PATH#*shared/ui/}"
  COMP_DIR=$(echo "$REL_PATH" | cut -d'/' -f1)

  # figma-component-map.json에서 해당 컴포넌트 찾기
  MATCH=$(jq -r --arg dir "$COMP_DIR" '
    .components | to_entries[] |
    select(.value.codePath | contains($dir)) |
    if .value.nodeId then
      "컴포넌트: \(.key)\nnodeId: \(.value.nodeId)\nFigma 이름: \(.value.name)"
    elif .value.variants then
      "컴포넌트: \(.key)\n변형:\n" + ([.value.variants | to_entries[] | "  - \(.key): nodeId=\(.value.nodeId) (\(.value.name))"] | join("\n"))
    else empty end
  ' "$MAP_FILE" 2>/dev/null)

  # 이 컴포넌트를 사용하는 페이지 상태도 찾기
  AFFECTED_PAGES=""
  if [ -n "$COMP_DIR" ]; then
    AFFECTED_PAGES=$(jq -r --arg dir "$COMP_DIR" '
      .pages | to_entries[] |
      "\(.key): \(.value.description // .key)"
    ' "$MAP_FILE" 2>/dev/null | head -5)
  fi

  if [ -n "$MATCH" ]; then
    FILE_KEY=$(jq -r '.figmaFileKey' "$MAP_FILE")
    CTX="🎨 [공통 컴포넌트 수정 감지] Figma 매핑이 존재합니다.
수정된 파일: ${FILE_PATH}
$(echo -e "$MATCH")
Figma 파일: ${FILE_KEY}

👉 design-reviewer 에이전트로 해당 nodeId의 Figma 디자인과 구현이 일치하는지 검증하세요.
매핑 파일: .claude/figma-component-map.json"

    jq -n --arg ctx "$CTX" \
      '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
  fi
fi

exit 0
