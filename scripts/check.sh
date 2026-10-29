#!/usr/bin/env bash
# 서버 살아있나 + 메인 화면 뜨나 한 번에 확인.
# 사용: bash scripts/check.sh [포트]   (기본 3000)
PORT="${1:-3000}"
BASE="http://localhost:$PORT"

echo "== health =="
curl -s -m 3 "$BASE/api/health" && echo || { echo "FAIL: 서버 응답 없음. node server.js 실행했는지 확인"; exit 1; }

echo "== main page =="
STATUS=$(curl -s -m 3 -o /tmp/check_index.html -w "%{http_code}" "$BASE/")
echo "HTTP $STATUS, $(wc -c < /tmp/check_index.html) bytes"
[ "$STATUS" = "200" ] || { echo "FAIL: 메인 화면 안 뜸"; exit 1; }

echo "== OK =="
