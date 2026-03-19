#!/bin/bash
# ============================================================
# Discord 알림 스크립트 (에이전트별 아이덴티티 지원)
#
# 사용법:
#   기본:    bash notify-discord.sh "제목" "내용" [color]
#   에이전트: bash notify-discord.sh "제목" "내용" [color] [agent]
#
# agent: orchestrator, code-reviewer, security-reviewer,
#        accessibility-checker, design-reviewer, test-writer,
#        spec-reviewer, figma-builder, figma-token, gate
# ============================================================

WEBHOOK_URL="https://discord.com/api/webhooks/1484043499983736902/DQkEoPZNPfS8Os36Jcol2XuwsSgpKH_e_-CQMQioPknt5TswpqtlN4vWG6u6HAMO2rR_"

TITLE="${1:-알림}"
BODY="${2:-}"
COLOR_NAME="${3:-info}"
AGENT="${4:-system}"

# ── 색상 ──
case "$COLOR_NAME" in
  success) COLOR=3066993 ;;
  fail)    COLOR=15158332 ;;
  warn)    COLOR=16776960 ;;
  info)    COLOR=3447003 ;;
  think)   COLOR=10181046 ;;
  discuss) COLOR=15844367 ;;
  *)       COLOR=3447003 ;;
esac

# ── 에이전트별 프로필 ──
case "$AGENT" in
  orchestrator)
    USERNAME="Orchestrator"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3af.png"
    ;;
  code-reviewer)
    USERNAME="Code Reviewer"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f50d.png"
    ;;
  security-reviewer)
    USERNAME="Security Reviewer"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f6e1.png"
    ;;
  accessibility-checker)
    USERNAME="Accessibility Checker"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/267f.png"
    ;;
  design-reviewer)
    USERNAME="Design Reviewer"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3a8.png"
    ;;
  test-writer)
    USERNAME="Test Writer"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f9ea.png"
    ;;
  spec-reviewer)
    USERNAME="Spec Reviewer"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f4cb.png"
    ;;
  figma-builder)
    USERNAME="Figma Builder"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3d7.png"
    ;;
  figma-token)
    USERNAME="Figma Token Extractor"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f3a8.png"
    ;;
  gate)
    USERNAME="Quality Gate"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/1f6a7.png"
    ;;
  *)
    USERNAME="System"
    AVATAR="https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/2699.png"
    ;;
esac

BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")

PAYLOAD=$(jq -n \
  --arg username "$USERNAME" \
  --arg avatar "$AVATAR" \
  --arg title "$TITLE" \
  --arg desc "$BODY" \
  --argjson color "$COLOR" \
  --arg branch "$BRANCH" \
  '{
    "username": $username,
    "avatar_url": $avatar,
    "embeds": [{
      "title": $title,
      "description": $desc,
      "color": $color,
      "footer": {"text": $branch}
    }]
  }')

curl -s -H "Content-Type: application/json" -d "$PAYLOAD" "$WEBHOOK_URL" > /dev/null 2>&1
