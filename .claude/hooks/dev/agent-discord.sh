#!/bin/bash
# ============================================================
# PostToolUse Hook: Agent 호출 완료 시 Discord 알림
# Matcher: Agent
# ============================================================

HOOK_INPUT=$(cat)
NOTIFY="$(cd "$(dirname "$0")" && pwd)/../notify-discord.sh"

# Agent 입력에서 정보 추출
AGENT_TYPE=$(echo "$HOOK_INPUT" | jq -r '.tool_input.subagent_type // "general-purpose"')
DESCRIPTION=$(echo "$HOOK_INPUT" | jq -r '.tool_input.description // "작업"')

# 에이전트 타입 → Discord 프로필 매핑
case "$AGENT_TYPE" in
  code-reviewer)           DISCORD_AGENT="code-reviewer" ;;
  security-reviewer)       DISCORD_AGENT="security-reviewer" ;;
  accessibility-checker)   DISCORD_AGENT="accessibility-checker" ;;
  design-reviewer)         DISCORD_AGENT="design-reviewer" ;;
  test-writer)             DISCORD_AGENT="test-writer" ;;
  spec-reviewer)           DISCORD_AGENT="spec-reviewer" ;;
  figma-component-builder) DISCORD_AGENT="figma-builder" ;;
  figma-token-extractor)   DISCORD_AGENT="figma-token" ;;
  orchestrator)            DISCORD_AGENT="orchestrator" ;;
  *)                       DISCORD_AGENT="system" ;;
esac

# tool_result 존재 여부로 시작/완료 판단
TOOL_RESULT=$(echo "$HOOK_INPUT" | jq -r '.tool_result // empty')

if [ -n "$TOOL_RESULT" ]; then
  # 완료 — 결과 요약 (줄바꿈 보존, 500자 제한)
  RESULT_SUMMARY=$(echo "$TOOL_RESULT" | head -30 | head -c 500)

  if echo "$TOOL_RESULT" | grep -qi "APPROVE\|통과\|pass"; then
    COLOR="success"
  elif echo "$TOOL_RESULT" | grep -qi "REQUEST_CHANGES\|실패\|fail\|NEEDS_REVISION"; then
    COLOR="fail"
  else
    COLOR="success"
  fi

  bash "$NOTIFY" "작업 완료: ${DESCRIPTION}" "$RESULT_SUMMARY" "$COLOR" "$DISCORD_AGENT"
else
  # 시작
  PROMPT_PREVIEW=$(echo "$HOOK_INPUT" | jq -r '.tool_input.prompt // ""' | head -c 200)
  bash "$NOTIFY" "작업 시작: ${DESCRIPTION}" "$PROMPT_PREVIEW" "info" "$DISCORD_AGENT"
fi

exit 0
