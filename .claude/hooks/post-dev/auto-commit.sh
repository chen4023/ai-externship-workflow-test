#!/bin/bash
# ============================================================
# Stop Hook: 자동 Git 커밋
# 실행 시점: Claude가 작업을 완료하고 멈출 때
# 단계: 2단계 (높은 가치)
# ============================================================

# Git 저장소가 아니면 종료
git rev-parse --is-inside-work-tree &>/dev/null || exit 0

# 변경사항이 없으면 종료
if [ -z "$(git status --porcelain 2>/dev/null)" ]; then
  exit 0
fi

# 변경된 파일 목록
CHANGED_FILES=$(git status --porcelain 2>/dev/null | awk '{print $2}' | head -20)
FILE_COUNT=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')

# 변경 유형 분석
HAS_TEST=$(echo "$CHANGED_FILES" | grep -c "test\|spec\|__tests__" || echo "0")
HAS_COMPONENT=$(echo "$CHANGED_FILES" | grep -c "components\|ui\|widgets\|features" || echo "0")
HAS_CONFIG=$(echo "$CHANGED_FILES" | grep -c "config\|\.json$\|\.yaml$" || echo "0")

# 커밋 메시지 생성
if [ "$HAS_TEST" -gt 0 ] && [ "$HAS_COMPONENT" -gt 0 ]; then
  PREFIX="feat"
elif [ "$HAS_TEST" -gt 0 ]; then
  PREFIX="test"
elif [ "$HAS_CONFIG" -gt 0 ]; then
  PREFIX="chore"
else
  PREFIX="feat"
fi

# 현재 브랜치 이름에서 태스크 정보 추출
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
TIMESTAMP=$(date +"%Y-%m-%d %H:%M")

COMMIT_MSG="${PREFIX}: Claude 세션 자동 커밋

브랜치: ${BRANCH}
변경 파일 수: ${FILE_COUNT}
시각: ${TIMESTAMP}

변경된 파일:
${CHANGED_FILES}"

# 스테이징 및 커밋
git add -A
git commit -m "$COMMIT_MSG" --no-verify 2>/dev/null

if [ $? -eq 0 ]; then
  echo "✅ 자동 커밋 완료 (${FILE_COUNT}개 파일)"
else
  echo "⚠️ 자동 커밋 실패"
fi

exit 0
