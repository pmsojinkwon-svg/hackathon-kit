// CSV 파일을 읽어 표로 보여주는 최소 서버. 외부 설치 없음.
// 실행: node server.js  → Browser 미리보기 PORT 3000, 경로 /
//
// 구조:
//   /            → 표 화면 (아래 HTML을 직접 응답)
//   /api/rows    → data.csv를 JSON 배열로 (헤더 → 키)
//   /api/summary → 행 수, 열 목록, 숫자 열의 합계/평균 (예시 집계)
//   CSV 파일명은 DATA_FILE 환경변수 또는 data.csv

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, "data.csv");

// ---- CSV 파싱 (쉼표 구분, 따옴표 안의 쉼표 처리) ----
function parseCsv(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim() !== "");
  if (lines.length === 0) return { headers: [], rows: [] };
  const split = (line) => {
    const out = [];
    let cur = "", inQ = false;
    for (const ch of line) {
      if (ch === '"') inQ = !inQ;
      else if (ch === "," && !inQ) { out.push(cur); cur = ""; }
      else cur += ch;
    }
    out.push(cur);
    return out.map((s) => s.trim());
  };
  const headers = split(lines[0]);
  const rows = lines.slice(1).map((l) => {
    const cells = split(l);
    const obj = {};
    headers.forEach((h, i) => (obj[h] = cells[i] ?? ""));
    return obj;
  });
  return { headers, rows };
}

function loadData() {
  try {
    return parseCsv(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return { headers: [], rows: [] };
  }
}

function summarize({ headers, rows }) {
  const numeric = {};
  for (const h of headers) {
    const values = rows.map((r) => r[h]).filter((v) => v !== "");
    const nums = values.map(Number).filter((n) => !Number.isNaN(n));
    if (values.length > 0 && nums.length === values.length) {
      const sum = nums.reduce((a, b) => a + b, 0);
      numeric[h] = { sum, avg: sum / nums.length, min: Math.min(...nums), max: Math.max(...nums) };
    }
  }
  return { rowCount: rows.length, columns: headers, numeric };
}

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

const HTML = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>데이터 보기</title>
<style>
  body{margin:0;font-family:-apple-system,"Apple SD Gothic Neo","Noto Sans KR",sans-serif;color:#1a1a1a}
  header{padding:20px 24px;border-bottom:1px solid #e5e5e5} h1{margin:0;font-size:20px} p{margin:4px 0 0;color:#6b6b6b;font-size:14px}
  main{padding:24px;max-width:1000px;margin:0 auto}
  .summary{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:16px}
  .tile{border:1px solid #e5e5e5;border-radius:8px;padding:12px 16px;min-width:120px} .tile b{display:block;font-size:20px}
  table{border-collapse:collapse;width:100%;font-size:14px} th,td{border-bottom:1px solid #e5e5e5;padding:8px;text-align:left}
  th{background:#fafafa} .empty{color:#6b6b6b}
</style></head>
<body>
<header><h1>데이터 보기</h1><p id="meta">불러오는 중…</p></header>
<main>
  <div class="summary" id="summary"></div>
  <table id="table"><thead></thead><tbody></tbody></table>
</main>
<script>
(async () => {
  const [rows, summary] = await Promise.all([fetch("/api/rows").then(r=>r.json()), fetch("/api/summary").then(r=>r.json())]);
  document.getElementById("meta").textContent = summary.rowCount + "행 · " + summary.columns.length + "열";
  const sm = document.getElementById("summary");
  for (const [col, s] of Object.entries(summary.numeric)) {
    const d = document.createElement("div"); d.className = "tile";
    d.innerHTML = "<span>" + col + " 합계</span><b>" + s.sum.toLocaleString() + "</b>";
    sm.appendChild(d);
  }
  const thead = document.querySelector("#table thead"), tbody = document.querySelector("#table tbody");
  if (!rows.length) { tbody.innerHTML = '<tr><td class="empty">data.csv가 비어 있거나 없음</td></tr>'; return; }
  thead.innerHTML = "<tr>" + summary.columns.map(c => "<th>" + c + "</th>").join("") + "</tr>";
  tbody.innerHTML = rows.slice(0, 200).map(r => "<tr>" + summary.columns.map(c => "<td>" + (r[c] ?? "") + "</td>").join("") + "</tr>").join("");
})();
</script></body></html>`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/api/health") return sendJson(res, 200, { ok: true });
  if (url.pathname === "/api/rows") return sendJson(res, 200, loadData().rows);
  if (url.pathname === "/api/summary") return sendJson(res, 200, summarize(loadData()));
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(HTML);
});

server.listen(PORT, "0.0.0.0", () => console.log(`listening on 0.0.0.0:${PORT} (data: ${DATA_FILE})`));
