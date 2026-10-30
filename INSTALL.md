# INSTALL — 이 키트를 작업 폴더에 설치하는 방법 (Codex가 읽고 실행)

> 사용자가 "INSTALL.md대로 설치해줘"라고 하면 아래를 **순서대로 전부** 실행한다. 끝나면 결과를 `ls -a`로 보여준다.

## 전제
- 이 파일은 `git clone`으로 받은 키트 폴더(예: `kit/` 또는 `hackathon-kit/`) 안에 있다.
- **작업 폴더** = 과제 README.md가 있는 곳 (보통 `/home/user`, 현재 폴더). 키트 폴더의 한 단계 위.

## 할 일 (키트 폴더 이름을 `KIT`이라고 할 때)

1. 아래를 **작업 폴더 최상위로 복사**한다. 이미 같은 이름이 있으면 덮어쓴다.
   - `KIT/AGENTS.md`
   - `KIT/cheatsheet.md`
   - `KIT/docs/` (폴더째)
   - `KIT/.agents/` (폴더째 — 숨김 폴더, 빠뜨리지 말 것)
   - `KIT/scripts/` (폴더째)
2. `KIT/starter/web/` **안의 내용물**(`server.js`, `public/`)을 작업 폴더 최상위로 복사한다.
   - 과제가 "CSV 읽어서 표로 보여주기"류면 `starter/web` 대신 `KIT/starter/data/` 안의 내용물을 복사한다. 애매하면 web.
3. **복사하지 않는 것**: `KIT/README.md`, `KIT/INSTALL.md`, `KIT/.git/`, `KIT/starter/` 폴더 자체. 과제의 README.md는 절대 건드리지 않는다.
4. 키트 폴더 `KIT/`를 통째로 삭제한다.
5. `ls -a`를 실행해 결과를 보여준다. 최상위에 `AGENTS.md`, `cheatsheet.md`, `docs/`, `.agents/`, `scripts/`, `server.js`, `public/`, 그리고 원래 있던 `README.md`가 보여야 한다.
6. 사용자에게 한 줄로 알린다: **"설치 끝. AGENTS.md와 스킬을 인식시키려면 `/quit` 후 `codex`를 다시 켜고 `/skills`로 확인하세요."**

## 한 줄 명령 (셸에서 직접 할 때)
```bash
cp KIT/AGENTS.md KIT/cheatsheet.md . && cp -r KIT/docs KIT/.agents KIT/scripts . && cp -r KIT/starter/web/* . && rm -rf KIT
```
