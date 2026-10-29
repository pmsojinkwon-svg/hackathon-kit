# hackathon-kit

AI 코딩 에이전트(Codex)와 함께 제한 시간 안에 작은 서비스를 만들 때 쓰는 개인 작업 키트.
작업 규칙(AGENTS.md), 문서 양식(docs/), 반복 작업 설명서(skills/), 시작 코드(starter/)로 구성.

## 시험장에서 1분 안에 적용하기

```bash
# 1. 작업 폴더에서 키트 가져오기
git clone https://github.com/pmsojinkwon/hackathon-kit.git kit

# 2. 필요한 것만 복사 (웹앱이면 web, 데이터 표시면 data)
cp kit/AGENTS.md .
cp -r kit/docs .
cp -r kit/skills .
cp -r kit/starter/web/* .        # 또는 kit/starter/data/*

# 3. 서버 켜지는지 확인
node server.js                   # → "listening on 0.0.0.0:3000"
```

Browser 미리보기에 PORT `3000`, 경로 `/` 입력 → 빈 화면이 뜨면 준비 끝.

## 폴더 설명

| 경로 | 역할 |
|---|---|
| `AGENTS.md` | Codex가 자동으로 읽는 작업 규칙 |
| `docs/PLAN.md` | 문제·성공 기준·범위 (구현 전에 채움) |
| `docs/DECISIONS.md` | 선택·이유·대안·바뀔 조건 (작업 중 계속 추가) |
| `docs/TEST_LOG.md` | 뭘 어떻게 확인했나 |
| `docs/HANDOFF.md` | 현재 상태·남은 일 (다음 사람용) |
| `skills/kickoff` | README 분석 → 질문 목록 → PLAN 초안 |
| `skills/verify` | 성공 기준 대조 + 실행 확인 → TEST_LOG 기록 |
| `skills/trim` | PLAN에 없는 기능 찾아 제거 제안 |
| `skills/review` | 별도 세션에서 코드 리뷰 (교차검증) |
| `skills/handoff` | HANDOFF.md 작성 |
| `starter/web` | Node 기본 서버 + 화면 1장 (설치 불필요) |
| `starter/data` | CSV 읽어서 표로 보여주는 최소 버전 |
| `scripts/check.sh` | 서버 살아있나 한 줄 확인 |
| `cheatsheet.md` | 시간표·질문 순서·답변 공식 (내가 보는 용) |

## 스킬 쓰는 법

Codex 입력란에 `skills/kickoff/SKILL.md 읽고 그대로 진행해줘` 처럼 파일을 지정해서 부른다.
(환경이 스킬 폴더를 자동 인식하면 `$kickoff` 같은 호출도 가능 — 사전 체험 때 확인)
