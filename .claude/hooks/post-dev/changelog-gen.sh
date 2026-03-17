#!/bin/bash
# ============================================================
# Stop Hook: 변경 로그 생성
# 실행 시점: Claude가 작업을 완료하고 멈출 때
# 단계: 3단계 (고급)
# ============================================================

# .claude/logs 디렉토리 확인
LOG_DIR=".claude/logs"
mkdir -p "$LOG_DIR"

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="${LOG_DIR}/session_${TIMESTAMP}.md"

# Git 상태 수집
BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
CHANGED_FILES=$(git diff --name-only HEAD~1 2>/dev/null || git status --porcelain | awk '{print $2}')
DIFF_STAT=$(git diff --stat HEAD~1 2>/dev/null || echo "N/A")

# spec.md 수락 기준 상태 (있으면)
SPEC_STATUS=""
if [ -f "docs/spec.md" ]; then
  TOTAL_CRITERIA=$(grep -c '^\- \[' docs/spec.md 2>/dev/null || echo "0")
  DONE_CRITERIA=$(grep -c '^\- \[x\]' docs/spec.md 2>/dev/null || echo "0")
  SPEC_STATUS="수락 기준: ${DONE_CRITERIA}/${TOTAL_CRITERIA} 충족"
fi

# 로그 생성
cat > "$LOG_FILE" <<EOF
# Session Log: ${TIMESTAMP}

## 기본 정보
- 브랜치: ${BRANCH}
- 시간: $(date +"%Y-%m-%d %H:%M:%S")
${SPEC_STATUS:+- ${SPEC_STATUS}}

## 변경된 파일
\`\`\`
${CHANGED_FILES}
\`\`\`

## 변경 통계
\`\`\`
${DIFF_STAT}
\`\`\`
EOF

echo "📝 세션 로그 생성: ${LOG_FILE}"
exit 0
