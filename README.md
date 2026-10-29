# hackathon-kit

AI 코딩 에이전트(Codex)와 함께 제한 시간 안에 작은 서비스를 만들 때 쓰는 개인 작업 키트.

**처음이면 `0_먼저읽기.md`부터.** 용어 사전과 읽는 순서가 있음.

## 구성

| 경로 | 뭔지 | 누가 읽나 |
|---|---|---|
| `0_먼저읽기.md` | 용어 사전 + 전체 그림 | 나 |
| `cheatsheet.md` | 시험 중 보는 종이: 시간표·질문·답변 공식 | 나 |
| `AGENTS.md` | Codex가 자동으로 읽는 작업 규칙 7개 | Codex (나도 알아야 함) |
| `docs/PLAN.md` | 문제·성공 기준·범위 (구현 전에 채움) | Codex + 나 |
| `docs/DECISIONS.md` | 선택·이유·대안·바뀔 조건 (작업 중 계속 추가) | Codex + 나 |
| `docs/TEST_LOG.md` | 뭘 어떻게 확인했나 | Codex + 나 |
| `docs/HANDOFF.md` | 현재 상태·남은 일 (다음 사람용) | Codex + 나 |
| `skills/kickoff/` | 시작 10분: README 분석 → 질문 목록 → PLAN 초안 | Codex |
| `skills/verify/` | 성공 기준 하나씩 확인 → TEST_LOG 기록 | Codex |
| `skills/trim/` | 과한 기능 찾아 제거 제안 | Codex |
| `skills/review/` | 새 세션이 처음 보는 눈으로 검토 | Codex (새 세션) |
| `skills/handoff/` | HANDOFF.md 작성 | Codex |
| `starter/web/` | 웹앱 시작 코드 (서버 + 화면 1장, 설치 불필요) | Codex |
| `starter/data/` | CSV 읽어 표로 보여주는 시작 코드 | Codex |
| `scripts/check.sh` | 서버 살아있나 한 줄 확인 | 나 (명령 한 줄) |

## 시험장에서 1분 안에 적용하기

```bash
git clone https://github.com/pmsojinkwon/hackathon-kit.git kit
cp kit/AGENTS.md . && cp -r kit/docs kit/skills kit/scripts .
cp -r kit/starter/web/* .        # 데이터 표시 과제면 web 대신 data
node server.js                   # → "listening on 0.0.0.0:3000"
```

Browser 미리보기에 PORT `3000`, 경로 `/` → 빈 화면이 뜨면 준비 끝.

## 스킬 부르는 법

Codex 입력란에 파일을 지정해서 부른다:
```
skills/kickoff/SKILL.md 읽고 그대로 진행해줘
```
(환경이 스킬 폴더를 자동 인식하면 `$kickoff` 같은 짧은 호출도 가능 — 사전 체험 때 Cofa Helper에게 확인)
