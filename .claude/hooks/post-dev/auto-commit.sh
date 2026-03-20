#!/bin/bash
# ============================================================
# Stop Hook: 자동 Git 커밋
# 실행 시점: Claude가 작업을 완료하고 멈출 때
# 단계: 2단계 (높은 가치)
# ============================================================

# Git 저장소가 아니면 종료
git rev-parse --is-inside-work-tree &>/dev/null || exit 0

# main/master 브랜치에서는 커밋 금지
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
  echo "⚠️ main 브랜치에서는 자동 커밋하지 않습니다. 피처 브랜치를 생성하세요."
  exit 0
fi

# 변경사항이 없으면 종료
if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
  exit 0
fi

# 변경된 파일 목록
CHANGED_FILES=$(git status --porcelain 2>/dev/null | awk '{print $2}' | head -20)
FILE_COUNT=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')

# ── prefix 결정 ──
HAS_TEST=$(echo "$CHANGED_FILES" | grep -c "test\|spec\|__tests__" || echo "0")
HAS_SRC=$(echo "$CHANGED_FILES" | grep -c "^src/" || echo "0")
HAS_COMPONENT=$(echo "$CHANGED_FILES" | grep -c "components\|ui\|widgets\|features\|pages" || echo "0")
HAS_HOOK=$(echo "$CHANGED_FILES" | grep -c "hooks/" || echo "0")
HAS_CONFIG=$(echo "$CHANGED_FILES" | grep -c "config\|settings\|\.json$\|\.yaml$" || echo "0")
HAS_DOCS=$(echo "$CHANGED_FILES" | grep -c "\.md$\|docs/" || echo "0")
HAS_STYLE=$(echo "$CHANGED_FILES" | grep -c "\.css$\|tokens\|styles" || echo "0")

if [ "$HAS_TEST" -gt 0 ] && [ "$HAS_COMPONENT" -gt 0 ]; then
  PREFIX="feat"
elif [ "$HAS_TEST" -gt 0 ]; then
  PREFIX="test"
elif [ "$HAS_DOCS" -gt 0 ] && [ "$HAS_SRC" -eq 0 ]; then
  PREFIX="docs"
elif [ "$HAS_STYLE" -gt 0 ] && [ "$HAS_COMPONENT" -eq 0 ]; then
  PREFIX="style"
elif [ "$HAS_COMPONENT" -gt 0 ]; then
  PREFIX="feat"
elif [ "$HAS_HOOK" -gt 0 ] || [ "$HAS_CONFIG" -gt 0 ]; then
  PREFIX="chore"
else
  PREFIX="feat"
fi

# ── 변경 내용 기반 커밋 제목 생성 ──
generate_subject() {
  local files="$1"

  # 변경된 컴포넌트/페이지 이름 추출 (src/ 하위)
  local src_dirs=$(echo "$files" | grep "^src/" | sed 's|src/||' | cut -d'/' -f1-3 | sort -u)
  local component_names=$(echo "$files" | grep -oE '(ui|pages|features|widgets|entities)/[^/]+' | cut -d'/' -f2 | sort -u | paste -sd', ' -)

  # 훅/설정 파일만 변경된 경우
  if [ -z "$component_names" ]; then
    if echo "$files" | grep -q "hooks/"; then
      local hook_names=$(echo "$files" | grep "hooks/" | xargs -I{} basename {} .sh | sort -u | paste -sd', ' -)
      echo "${hook_names} 훅 업데이트"
      return
    fi
    if echo "$files" | grep -q "settings\|config"; then
      echo "프로젝트 설정 업데이트"
      return
    fi
    if echo "$files" | grep -q "\.md$"; then
      echo "문서 업데이트"
      return
    fi
    # 그 외 파일명 기반
    local basenames=$(echo "$files" | xargs -I{} basename {} | sort -u | head -3 | paste -sd', ' -)
    echo "${basenames} 수정"
    return
  fi

  # diff에서 주요 변경 패턴 감지
  local diff_summary=$(git diff --cached --stat 2>/dev/null || git diff --stat 2>/dev/null)
  local added=$(git diff --cached --numstat 2>/dev/null | awk '{a+=$1}END{print a+0}')
  local deleted=$(git diff --cached --numstat 2>/dev/null | awk '{d+=$2}END{print d+0}')

  # 신규 파일인지 확인
  local new_files=$(git status --porcelain 2>/dev/null | grep "^?" | wc -l | tr -d ' ')

  if [ "$new_files" -gt 0 ] && [ "$deleted" -eq 0 ]; then
    echo "${component_names} 컴포넌트 추가"
  elif [ "$deleted" -gt "$added" ]; then
    echo "${component_names} 코드 정리"
  elif [ "$added" -gt 50 ]; then
    echo "${component_names} 기능 구현"
  else
    echo "${component_names} 수정"
  fi
}

SUBJECT=$(generate_subject "$CHANGED_FILES")

# ── 브랜치명에서 이슈 번호 추출 ──
BRANCH=$(git branch --show-current 2>/dev/null || echo "")
ISSUE_NUM=$(echo "$BRANCH" | grep -oE '#[0-9]+' | head -1)
if [ -z "$ISSUE_NUM" ]; then
  # feat/signup-form-3 같은 패턴에서도 추출 시도
  ISSUE_NUM=$(echo "$BRANCH" | grep -oE '[-/][0-9]+$' | grep -oE '[0-9]+')
  [ -n "$ISSUE_NUM" ] && ISSUE_NUM="#${ISSUE_NUM}"
fi

if [ -n "$ISSUE_NUM" ]; then
  COMMIT_MSG="${PREFIX}: ${SUBJECT} (${ISSUE_NUM})"
else
  COMMIT_MSG="${PREFIX}: ${SUBJECT}"
fi

# 스테이징 및 커밋
git add -A
git commit -m "$COMMIT_MSG" --no-verify 2>/dev/null

if [ $? -eq 0 ]; then
  echo "✅ 자동 커밋 완료 (${FILE_COUNT}개 파일)"
  NOTIFY="$(cd "$(dirname "$0")" && pwd)/../notify-discord.sh"
  NOTIFY_BODY=$(printf "%s\n(%s개 파일)" "$COMMIT_MSG" "$FILE_COUNT")
  bash "$NOTIFY" "📝 자동 커밋" "$NOTIFY_BODY" "info" 2>/dev/null
else
  echo "⚠️ 자동 커밋 실패"
fi

exit 0
