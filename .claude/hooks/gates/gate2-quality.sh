#!/bin/bash
# ============================================================
# Gate 2: 구현 품질 검증
# 테스트, 타입, 린트를 스크립트 레벨에서 판단
# 출력: JSON { "pass": bool, "checks": {...}, "failedChecks": [...] }
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NOTIFY="${SCRIPT_DIR}/../notify-discord.sh"
CHECKS='{}'
FAILED=()

# ── 1. TypeScript 타입 검사 ──
if [ -f "tsconfig.json" ]; then
  TSC_OUTPUT=$(pnpm tsc --noEmit 2>&1)
  TSC_EXIT=$?
  if [ $TSC_EXIT -ne 0 ]; then
    ERROR_COUNT=$(echo "$TSC_OUTPUT" | grep -c "error TS" || echo "0")
    FAILED+=("typescript")
    CHECKS=$(echo "$CHECKS" | jq --arg e "$ERROR_COUNT" '. + {"typescript":{"pass":false,"errors":($e|tonumber)}}')
  else
    CHECKS=$(echo "$CHECKS" | jq '. + {"typescript":{"pass":true,"errors":0}}')
  fi
fi

# ── 2. ESLint 검사 ──
if [ -f "node_modules/.bin/eslint" ]; then
  LINT_OUTPUT=$(pnpm lint 2>&1)
  LINT_EXIT=$?
  if [ $LINT_EXIT -ne 0 ]; then
    FAILED+=("lint")
    CHECKS=$(echo "$CHECKS" | jq '. + {"lint":{"pass":false}}')
  else
    CHECKS=$(echo "$CHECKS" | jq '. + {"lint":{"pass":true}}')
  fi
fi

# ── 3. 테스트 실행 ──
if grep -q '"test"' package.json 2>/dev/null; then
  TEST_OUTPUT=$(pnpm test -- --run 2>&1)
  TEST_EXIT=$?
  PASS_COUNT=$(echo "$TEST_OUTPUT" | grep -oP '\d+ passed' | grep -oP '\d+' || echo "0")
  FAIL_COUNT=$(echo "$TEST_OUTPUT" | grep -oP '\d+ failed' | grep -oP '\d+' || echo "0")
  if [ $TEST_EXIT -ne 0 ]; then
    FAILED+=("test")
    CHECKS=$(echo "$CHECKS" | jq --arg p "$PASS_COUNT" --arg f "$FAIL_COUNT" '. + {"test":{"pass":false,"passed":($p|tonumber),"failed":($f|tonumber)}}')
  else
    CHECKS=$(echo "$CHECKS" | jq --arg p "$PASS_COUNT" '. + {"test":{"pass":true,"passed":($p|tonumber),"failed":0}}')
  fi
fi

# ── 4. 디자인 토큰 검사 ──
HARDCODED=$(grep -rn '#[0-9a-fA-F]\{3,8\}' src/ --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "tokens\|test\|\.css\|svg\|// " | wc -l | tr -d ' ')
if [ "$HARDCODED" -gt 0 ]; then
  FAILED+=("design-tokens")
  CHECKS=$(echo "$CHECKS" | jq --arg h "$HARDCODED" '. + {"design-tokens":{"pass":false,"hardcodedColors":($h|tonumber)}}')
else
  CHECKS=$(echo "$CHECKS" | jq '. + {"design-tokens":{"pass":true,"hardcodedColors":0}}')
fi

# ── 결과 출력 ──
FAILED_JSON=$(printf '%s\n' "${FAILED[@]}" | jq -R . | jq -s .)
PASS=true
if [ ${#FAILED[@]} -gt 0 ]; then PASS=false; fi

RESULT=$(echo "{\"pass\":${PASS},\"checks\":${CHECKS},\"failedChecks\":${FAILED_JSON}}" | jq .)
echo "$RESULT"

# Discord 알림
if [ "$PASS" = "true" ]; then
  bash "$NOTIFY" "✅ Gate 2 통과" "TypeScript, ESLint, 테스트, 디자인 토큰 모두 통과" "success"
  exit 0
else
  FAILED_LIST=$(printf '%s\n' "${FAILED[@]}" | paste -sd', ' -)
  bash "$NOTIFY" "❌ Gate 2 실패" "실패 항목: ${FAILED_LIST}" "fail"
  exit 1
fi
