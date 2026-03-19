#!/bin/bash
# ============================================================
# PostToolUse Hook: PR 생성 감지 → 인라인 리뷰 트리거
# Matcher: Bash
#
# gh pr create 완료 후 code-reviewer 에이전트 호출을 지시한다.
# 실제 리뷰는 Claude가 수행하며, 이 훅은 컨텍스트만 주입한다.
# ============================================================

HOOK_INPUT=$(cat)
COMMAND=$(echo "$HOOK_INPUT" | jq -r '.tool_input.command // empty')
TOOL_RESULT=$(echo "$HOOK_INPUT" | jq -r '.tool_result // empty')

# gh pr create 명령이 아니면 스킵
echo "$COMMAND" | grep -qE 'gh\s+pr\s+create' || exit 0

# 결과가 없으면(PreToolUse) 스킵
[ -z "$TOOL_RESULT" ] && exit 0

# PR URL 추출
PR_URL=$(echo "$TOOL_RESULT" | grep -oE 'https://github.com/[^ ]+/pull/[0-9]+' | head -1)
[ -z "$PR_URL" ] && exit 0

# PR 번호 추출
PR_NUMBER=$(echo "$PR_URL" | grep -oE '[0-9]+$')

# 리포지토리 정보
REPO=$(echo "$PR_URL" | sed 's|https://github.com/||' | sed 's|/pull/.*||')

# 컨텍스트 주입: Claude에게 인라인 리뷰를 수행하도록 지시
CONTEXT=$(cat <<EOF
🔍 PR #${PR_NUMBER}이 생성되었습니다. 인라인 코드 리뷰를 수행하세요:

1. code-reviewer 에이전트를 호출하여 REVIEW_JSON 형식으로 리뷰를 받으세요.
2. 리뷰 결과의 REVIEW_JSON_START ~ REVIEW_JSON_END 블록을 파싱하세요.
3. 파싱한 JSON으로 gh api를 사용하여 PR에 인라인 코멘트를 등록하세요:

   # review.json 파일 생성 후:
   gh api repos/${REPO}/pulls/${PR_NUMBER}/reviews \\
     --method POST \\
     --input review.json

   review.json 형식:
   {
     "event": "COMMENT",
     "body": "리뷰 요약",
     "comments": [
       {"path": "파일경로", "line": 라인번호, "body": "코멘트 내용"}
     ]
   }

PR URL: ${PR_URL}
EOF
)

jq -n --arg ctx "$CONTEXT" \
  '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'

exit 0
