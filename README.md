# hackathon-kit

**시험장에 들고 들어가는 "내 작업 방식" 한 세트.**
AI 개발자(Codex)에게 줄 규칙서 1장, 내가 채울 빈 양식 4장, AI에게 시킬 반복 작업 설명서 5장, 켜자마자 화면이 뜨는 시작 코드 2벌, 시험 중 내가 보는 커닝페이퍼 1장.

---

## 1. 읽는 순서 (총 20분)

| 순서 | 파일 | 뭔지 | 시간 |
|---|---|---|---|
| 1 | 이 README | 전체 그림 + 용어 사전 | 5분 |
| 2 | `cheatsheet.md` | **시험 날 내가 보는 종이.** 시간표, 담당자 질문, 서술형 답변 공식 | 5분 |
| 3 | `AGENTS.md` | Codex에게 주는 규칙 7개 | 3분 |
| 4 | `.agents/skills/` 5개 | Codex에게 "이 설명서대로 해"라고 시키는 반복 작업 | 5분 |
| 5 | `docs/` 4개 | 시험 중 채울 빈 양식 | 2분 |

`starter/`(시작 코드)와 `scripts/`(확인 스크립트)는 **안 읽어도 됨.** Codex가 다룸. 내가 알아야 할 건 "켜는 명령 한 줄"뿐이고 cheatsheet에 있음.

---

## 2. 구성

| 경로 | 뭔지 | 누가 읽나 |
|---|---|---|
| `README.md` | 전체 그림 + 용어 사전 | 나 |
| `cheatsheet.md` | 시험 중 보는 종이 | 나 |
| `AGENTS.md` | Codex가 자동으로 읽는 작업 규칙 7개 | Codex (나도 알아야 함) |
| `docs/PLAN.md` | 문제·성공 기준·범위 (구현 전에 채움) | Codex + 나 |
| `docs/DECISIONS.md` | 선택·이유·대안·바뀔 조건 (작업 중 계속 추가) | Codex + 나 |
| `docs/TEST_LOG.md` | 뭘 어떻게 확인했나 | Codex + 나 |
| `docs/HANDOFF.md` | 현재 상태·남은 일 (다음 사람용) | Codex + 나 |
| `docs/QUESTIONS.md` | 서술형 질문 뱅크 22개 + 답변 틀 (연습용) | 나 |
| `.agents/skills/kickoff/` | 시작 10분: README 분석 → 질문 목록 → PLAN 초안 | Codex |
| `.agents/skills/verify/` | 성공 기준 하나씩 확인 → TEST_LOG 기록 | Codex |
| `.agents/skills/trim/` | 과한 기능 찾아 제거 제안 | Codex |
| `.agents/skills/review/` | 새 세션이 처음 보는 눈으로 검토 | Codex (새 세션) |
| `.agents/skills/handoff/` | HANDOFF.md 작성 | Codex |
| `starter/web/` | 웹앱 시작 코드 (서버 + 화면 1장, 설치 불필요) | Codex |
| `starter/data/` | CSV 읽어 표로 보여주는 시작 코드 | Codex |
| `scripts/check.sh` | 서버 살아있나 한 줄 확인 | 나 (명령 한 줄) |

---

## 3. 전체 흐름

```
시작 ──→ 읽기 ──→ 묻기 ──→ 적기 ──→ 만들기 ──→ 확인 ──→ 정리 ──→ 제출 ──→ 6문제
         README   담당자    PLAN     Codex     verify   HANDOFF            (AI 없이
         (직접)   DM       (양식)   (스킬)    review   DECISIONS           내 말로)
                  kickoff           verify   trim
```

| 단계 | 쓰는 것 |
|---|---|
| 읽기·묻기 | `$kickoff` → 질문 목록을 뽑아줌 |
| 적기 | `docs/PLAN.md` |
| 만들기 | `AGENTS.md` 규칙대로 Codex가 작업. 결정은 `docs/DECISIONS.md`에 쌓임 |
| 확인 | `$verify`, `$review`, `$trim` |
| 정리 | `$handoff` → `docs/HANDOFF.md` |
| 6문제 | `docs/DECISIONS.md`에 쌓인 걸 머릿속에서 꺼내 답함 (cheatsheet 4번 공식) |

---

## 4. 이 키트의 원칙 3개

1. **"다 해줘" 금지, 한 번에 하나씩.** 심사는 결과물보다 "AI에게 어떻게 시켰나"를 더 크게 봄
2. **해본 것만 "됐다"고 적는다.** 심사 AI는 내가 문서에 적은 말이 실제 코드·작업 기록과 맞는지 하나씩 대조한다. 안 해본 건 "미확인"이라고 적으면 감점 아니고, 거짓 OK가 감점
3. **결정할 때마다 한 줄 기록.** 마지막 6문제는 "왜 이렇게 했어?"임. 기록이 곧 답안

---

## 5. 시험장에서 1분 안에 적용하기

```bash
git clone https://github.com/pmsojinkwon/hackathon-kit.git kit
cp kit/AGENTS.md . && cp -r kit/docs kit/.agents kit/scripts . && cp -r kit/starter/web/* . && rm -rf kit
node server.js                   # → "listening on 0.0.0.0:3000"
```
(데이터 표시 과제면 `web` 대신 `data`)

Browser 미리보기에 PORT `3000`, 경로 `/` → 빈 화면이 뜨면 준비 끝.

**스킬 부르는 법:** 스킬은 `.agents/skills/` 안에 있고, Codex가 이 위치를 자동 인식함(다른 응시자 체험 보고). Codex에서 `/skills`로 목록 확인, `$kickoff`처럼 부름. 이미 켜진 세션은 `/quit` 후 재시작해야 인식. 안 되면 `.agents/skills/kickoff/SKILL.md 읽고 진행해줘`로 파일 지정.

---

## 6. 용어 사전 — 모르는 단어 나오면 여기로

| 단어 | 쉬운 뜻 |
|---|---|
| **Codex** | 시험장에서 쓰는 AI 개발자. 터미널에서 `codex` 치면 켜짐. 내가 말로 시키면 코드를 씀 |
| **터미널** | 글자로 명령을 치는 검은 창. 시험 화면 아래쪽에 있음 |
| **세션** | Codex와의 대화 한 묶음. 터미널 탭을 새로 열고 `codex`를 다시 켜면 "새 세션" = 기억이 없는 새 AI |
| **서버** | 내가 만든 서비스를 "켜두는" 프로그램. `node server.js`로 켬. 켜져 있어야 화면이 보임 |
| **PORT(포트)** | 서버의 "방 번호". 우리 서버는 3000번. Browser 미리보기에 3000 넣으면 그 방을 보여줌 |
| **0.0.0.0** | 서버를 "누구나 볼 수 있게" 여는 설정. 가이드에서 이거 안 하면 미리보기 안 보인다고 했음. 시작 코드에 이미 돼 있음 |
| **Browser 미리보기** | 시험 화면 왼쪽 도구. 내가 만든 서비스를 실제로 보고 눌러보는 창 |
| **README** | 과제 설명이 적힌 파일. 시험 시작하면 제일 먼저 읽음 (이 키트의 README와는 다른 파일) |
| **커밋(commit)** | 지금까지 작업을 "저장 지점"으로 찍는 것. 심사 AI가 이 기록을 읽음. Codex가 알아서 함 |
| **curl** | 터미널에서 서버에 "살아있니?" 물어보는 명령. Codex가 씀. 나는 몰라도 됨 |
| **API** | 서버가 화면에 데이터를 주고받는 통로. `/api/items` 같은 주소 |
| **JSON** | 데이터를 적는 형식. 엑셀 대신 쓰는 메모장 같은 것 |
| **CSV** | 쉼표로 구분된 표 데이터. 엑셀에서 "다른 이름으로 저장"하면 나오는 그것 |
| **스킬(Skill)** | `SKILL.md` 파일 하나 = Codex에게 시킬 작업 설명서 하나. "이 파일 읽고 그대로 해줘"라고 부름 |
| **clone** | GitHub에 올려둔 키트를 시험장 작업 폴더로 통째로 가져오는 명령 |
| **T+90** | 시작 후 90분 지난 시점 (10시 시작이면 11시 30분) |
