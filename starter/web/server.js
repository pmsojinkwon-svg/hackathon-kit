// 최소 웹 서버. 외부 설치 없음 (Node 내장 모듈만).
// 실행: node server.js  → Browser 미리보기에서 PORT 3000, 경로 /
//
// 구조:
//   /            → public/index.html (화면)
//   /api/health  → { ok: true }     (서버 살아있나 확인용)
//   /api/items   → GET: 목록, POST: 추가   (예시 API, 필요 없으면 지워도 됨)
//   데이터는 data.json 파일에 저장 (DB 없음)

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, "public");
const DATA_FILE = path.join(__dirname, "data.json");

// ---- 데이터 읽기/쓰기 (JSON 파일) ----
function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return [];
  }
}
function writeData(items) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
}

// ---- 응답 도우미 ----
function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}
function sendFile(res, filePath) {
  const ext = path.extname(filePath);
  const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json" };
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": (types[ext] || "text/plain") + "; charset=utf-8" });
    res.end(data);
  });
}
function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        resolve({});
      }
    });
  });
}

// ---- 라우팅 ----
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/health") return sendJson(res, 200, { ok: true });

  if (url.pathname === "/api/items" && req.method === "GET") {
    return sendJson(res, 200, readData());
  }
  if (url.pathname === "/api/items" && req.method === "POST") {
    const body = await readBody(req);
    const items = readData();
    const item = { id: Date.now(), text: String(body.text || "").trim(), createdAt: new Date().toISOString() };
    if (!item.text) return sendJson(res, 400, { error: "text is required" });
    items.push(item);
    writeData(items);
    return sendJson(res, 201, item);
  }

  // 정적 파일 (public/)
  const filePath = path.join(PUBLIC, url.pathname === "/" ? "index.html" : url.pathname);
  if (!filePath.startsWith(PUBLIC)) {
    res.writeHead(403);
    return res.end();
  }
  sendFile(res, filePath);
});

// 0.0.0.0 바인딩 필수 — localhost만 바인딩하면 미리보기에서 안 보임
// 포트가 이미 쓰이고 있으면(체험 때 3000이 막혀 있었음) 다음 번호로 자동 이동. 터미널 메시지의 번호를 Browser 미리보기에 넣는다.
function listen(port) {
  server.once("error", (err) => {
    if (err.code === "EADDRINUSE" && port < Number(PORT) + 10) {
      console.log(`port ${port} in use, trying ${port + 1}`);
      listen(port + 1);
    } else throw err;
  });
  server.listen(port, "0.0.0.0");
}
server.on("listening", () => console.log(`listening on 0.0.0.0:${server.address().port}`));
listen(Number(PORT));
