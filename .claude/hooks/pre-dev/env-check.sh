#!/bin/bash
# ============================================================
# SessionStart Hook: 환경 초기화 및 검증
# 실행 시점: Claude Code 세션 시작 시 자동 실행
# 목적: 프로젝트 환경 검증 + 필수 컨텍스트 주입
# ============================================================

set -euo pipefail

ERRORS=()
WARNINGS=()

# ── 1. 필수 도구 버전 확인 ──
check_tool() {
  local tool=$1
  local min_version=$2
  if ! command -v "$tool" &>/dev/null; then
    ERRORS+=("❌ $tool 이(가) 설치되어 있지 않습니다")
  else
    local version
    version=$("$tool" --version 2>/dev/null | head -1 || echo "unknown")
    echo "✅ $tool: $version"
  fi
}

echo "🔍 환경 검증 시작..."
echo ""

# Node.js
if command -v node &>/dev/null; then
  NODE_VERSION=$(node -v | sed 's/v//')
  NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
  if [ "$NODE_MAJOR" -lt 18 ]; then
    ERRORS+=("❌ Node.js 18+ 필요 (현재: $NODE_VERSION)")
  else
    echo "✅ Node.js: v$NODE_VERSION"
  fi
else
  ERRORS+=("❌ Node.js가 설치되어 있지 않습니다")
fi

# pnpm
check_tool "pnpm" "8"

# TypeScript (로컬)
if [ -f "node_modules/.bin/tsc" ]; then
  TSC_VERSION=$(npx tsc --version 2>/dev/null || echo "unknown")
  echo "✅ TypeScript: $TSC_VERSION"
else
  WARNINGS+=("⚠️ TypeScript가 로컬에 설치되어 있지 않습니다 (pnpm install 필요)")
fi

# ── 2. 프로젝트 파일 존재 여부 확인 ──
echo ""
echo "📁 프로젝트 파일 검증..."

# package.json
if [ ! -f "package.json" ]; then
  ERRORS+=("❌ package.json이 없습니다")
else
  echo "✅ package.json"
fi

# .env 파일
if [ ! -f ".env" ] && [ ! -f ".env.local" ]; then
  WARNINGS+=("⚠️ .env 또는 .env.local 파일이 없습니다")
else
  echo "✅ 환경 변수 파일 존재"
fi

# node_modules
if [ ! -d "node_modules" ]; then
  WARNINGS+=("⚠️ node_modules가 없습니다. pnpm install을 실행하세요")
else
  echo "✅ node_modules 존재"
fi

# tsconfig.json
if [ ! -f "tsconfig.json" ]; then
  WARNINGS+=("⚠️ tsconfig.json이 없습니다")
else
  echo "✅ tsconfig.json"
fi

# ── 3. Git 상태 확인 ──
echo ""
echo "🔀 Git 상태 확인..."

if git rev-parse --is-inside-work-tree &>/dev/null; then
  BRANCH=$(git branch --show-current 2>/dev/null || echo "detached")
  echo "✅ Git 브랜치: $BRANCH"

  # 미커밋 변경사항 확인
  UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  if [ "$UNCOMMITTED" -gt 0 ]; then
    WARNINGS+=("⚠️ 미커밋 변경사항 ${UNCOMMITTED}개")
  else
    echo "✅ 작업 트리 깨끗함"
  fi
else
  WARNINGS+=("⚠️ Git 저장소가 아닙니다")
fi

# ── 4. 디자인 토큰 파일 확인 ──
if [ -f "src/shared/styles/tokens.css" ] || [ -f "shared/styles/tokens.css" ]; then
  echo "✅ 디자인 토큰 파일 존재"
else
  WARNINGS+=("⚠️ 디자인 토큰 파일이 없습니다 (shared/styles/tokens.css)")
fi

# ── 5. CLAUDE.md 확인 ──
if [ -f "CLAUDE.md" ]; then
  echo "✅ CLAUDE.md 존재"
else
  WARNINGS+=("⚠️ CLAUDE.md가 없습니다. 프로젝트 컨텍스트가 제한됩니다")
fi

# ── 결과 출력 ──
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ${#WARNINGS[@]} -gt 0 ]; then
  echo ""
  echo "⚠️  경고 (${#WARNINGS[@]}개):"
  for w in "${WARNINGS[@]}"; do
    echo "  $w"
  done
fi

if [ ${#ERRORS[@]} -gt 0 ]; then
  echo ""
  echo "❌ 에러 (${#ERRORS[@]}개):"
  for e in "${ERRORS[@]}"; do
    echo "  $e"
  done
  echo ""
  echo "🚫 환경 검증 실패. 위 에러를 먼저 해결하세요."
  exit 1
fi

echo ""
echo "✅ 환경 검증 완료. 개발 준비 완료!"
exit 0
