#!/bin/bash
# ============================================================
# Stop Hook: 최종 품질 게이트 (Gate 3)
# 실행 시점: Claude가 작업을 완료하고 멈출 때
# 단계: 3단계 (고급)
# ============================================================

echo "🔍 최종 품질 게이트 실행..."
echo ""

FAILURES=0
WARNINGS=0
RESULTS=""

# ── 1. 테스트 통과 확인 ──
if [ -f "package.json" ] && grep -q '"test"' package.json; then
  echo "🧪 테스트 실행 중..."
  TEST_OUTPUT=$(npm test -- --run 2>&1)
  TEST_EXIT=$?
  if [ $TEST_EXIT -ne 0 ]; then
    RESULTS="${RESULTS}❌ 테스트 실패\n$(echo "$TEST_OUTPUT" | tail -10)\n\n"
    FAILURES=$((FAILURES+1))
  else
    RESULTS="${RESULTS}✅ 테스트 통과\n"
  fi
else
  RESULTS="${RESULTS}⚠️ 테스트 스크립트 없음\n"
  WARNINGS=$((WARNINGS+1))
fi

# ── 2. TypeScript 에러 확인 ──
if [ -f "tsconfig.json" ] && [ -f "node_modules/.bin/tsc" ]; then
  echo "📝 타입 검사 중..."
  TSC_OUTPUT=$(npx tsc --noEmit 2>&1)
  TSC_EXIT=$?
  if [ $TSC_EXIT -ne 0 ]; then
    ERROR_COUNT=$(echo "$TSC_OUTPUT" | grep -c "error TS" || echo "0")
    RESULTS="${RESULTS}❌ TypeScript 에러 ${ERROR_COUNT}개\n$(echo "$TSC_OUTPUT" | head -10)\n\n"
    FAILURES=$((FAILURES+1))
  else
    RESULTS="${RESULTS}✅ TypeScript 에러 없음\n"
  fi
fi

# ── 3. ESLint 에러 확인 ──
if [ -f "node_modules/.bin/eslint" ]; then
  echo "🔎 린트 검사 중..."
  LINT_OUTPUT=$(npx eslint src/ --quiet 2>&1)
  LINT_EXIT=$?
  if [ $LINT_EXIT -ne 0 ]; then
    RESULTS="${RESULTS}❌ ESLint 에러\n$(echo "$LINT_OUTPUT" | head -10)\n\n"
    FAILURES=$((FAILURES+1))
  else
    RESULTS="${RESULTS}✅ ESLint 에러 없음\n"
  fi
fi

# ── 4. 결과 요약 ──
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "$RESULTS"

if [ $FAILURES -gt 0 ]; then
  echo "🚫 ${FAILURES}개의 품질 게이트 실패"
  # 컨텍스트로 주입하여 Claude가 수정하도록 유도
  jq -n --arg ctx "🚫 품질 게이트 실패 (${FAILURES}개). 위 에러를 수정하세요." \
    '{"hookSpecificOutput":{"hookEventName":"Stop","additionalContext":$ctx}}'
  exit 2  # BLOCK - Claude가 멈추지 못하고 계속 수정
fi

echo "✅ 모든 품질 게이트 통과!"
exit 0
