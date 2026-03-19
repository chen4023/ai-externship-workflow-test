#!/bin/bash
# ============================================================
# Discord 알림 공통 스크립트
# 사용법: bash .claude/hooks/notify-discord.sh "제목" "내용" [color]
#   color: success(녹색), fail(빨강), info(파랑), warn(노랑)
# ============================================================

WEBHOOK_URL="https://discord.com/api/webhooks/1484043499983736902/DQkEoPZNPfS8Os36Jcol2XuwsSgpKH_e_-CQMQioPknt5TswpqtlN4vWG6u6HAMO2rR_"

TITLE="${1:-알림}"
BODY="${2:-}"
COLOR_NAME="${3:-info}"

case "$COLOR_NAME" in
  success) COLOR=3066993 ;;   # 녹색
  fail)    COLOR=15158332 ;;  # 빨강
  warn)    COLOR=16776960 ;;  # 노랑
  info)    COLOR=3447003 ;;   # 파랑
  *)       COLOR=3447003 ;;
esac

BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

PAYLOAD=$(jq -n \
  --arg title "$TITLE" \
  --arg desc "$BODY" \
  --argjson color "$COLOR" \
  --arg branch "$BRANCH" \
  --arg time "$TIMESTAMP" \
  '{
    "embeds": [{
      "title": $title,
      "description": $desc,
      "color": $color,
      "fields": [
        {"name": "브랜치", "value": $branch, "inline": true},
        {"name": "시각", "value": $time, "inline": true}
      ]
    }]
  }')

curl -s -H "Content-Type: application/json" -d "$PAYLOAD" "$WEBHOOK_URL" > /dev/null 2>&1
