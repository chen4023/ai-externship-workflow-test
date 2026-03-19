#!/bin/bash
# ============================================================
# Gate 1: Spec 검증
# 입력: docs/SPEC.md 경로
# 출력: JSON { "pass": bool, "issues": [...], "agent": "spec-reviewer" }
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NOTIFY="${SCRIPT_DIR}/../notify-discord.sh"
SPEC_PATH="${1:-docs/SPEC.md}"

if [ ! -f "$SPEC_PATH" ]; then
  echo '{"pass":false,"issues":["spec 파일이 존재하지 않음"],"agent":"spec-reviewer"}'
  exit 1
fi

ISSUES=()

# 필수 섹션 확인
for section in "## 배경" "## 요구사항" "## 수락 기준"; do
  if ! grep -q "$section" "$SPEC_PATH" 2>/dev/null; then
    ISSUES+=("필수 섹션 누락: $section")
  fi
done

# 수락 기준 최소 3개 확인
AC_COUNT=$(grep -c '^\- \[' "$SPEC_PATH" 2>/dev/null || echo "0")
if [ "$AC_COUNT" -lt 3 ]; then
  ISSUES+=("수락 기준이 ${AC_COUNT}개 (최소 3개 필요)")
fi

# 결과 출력 + Discord 알림
if [ ${#ISSUES[@]} -eq 0 ]; then
  bash "$NOTIFY" "✅ Gate 1 통과" "Spec 검증 완료 (수락 기준 ${AC_COUNT}개)" "success"
  echo '{"pass":true,"issues":[],"agent":"spec-reviewer"}'
  exit 0
else
  ISSUES_TEXT=$(printf '• %s\n' "${ISSUES[@]}")
  bash "$NOTIFY" "❌ Gate 1 실패" "${ISSUES_TEXT}" "fail"
  ISSUES_JSON=$(printf '%s\n' "${ISSUES[@]}" | jq -R . | jq -s .)
  echo "{\"pass\":false,\"issues\":${ISSUES_JSON},\"agent\":\"spec-reviewer\"}"
  exit 1
fi
