# CLAUDE.md

## 프로젝트 개요
방탈출 동아리 '_log(로그)'의 운영 통합 웹앱.
기존 카카오톡 공지 + 구글폼 + 구글시트로 분산된 운영을
하나의 PWA(Progressive Web App)로 통합한다.

---

## 기술 스택
- Frontend: React (Vite), react-router-dom, @tanstack/react-query
- Backend/DB: Supabase (PostgreSQL, Auth, Storage, Realtime)
- 배포: Vercel (GitHub 연동 자동 배포)
- 디자인: Figma

---

## 사용자 역할
- admin: 운영진. 일정 등록, 배정 실행, 경고 부여, 입금 체크 등 모든 권한
- member: 일반 부원. 신청, 후기 작성, 번개 등록 등 제한된 권한
- role 구분은 users 테이블의 role 컬럼으로 처리
- RLS(Row Level Security)로 DB 레벨에서 권한 강제

---

## DB 테이블 목록
- users: 부원 정보 (id, name, email, role, warning_count)
- events: 방탈출 일정 (id, date, place)
- themes: 테마 (id, event_id, name, max_members, price)
- applications: 테마 신청 (id, user_id, event_id, theme_pref_1, theme_pref_2, theme_pref_3, is_paid)
- assignments: 배정 결과 (id, user_id, theme_id, confirmed)
- attendance: 출석 (id, user_id, event_id, theme_id, attended, certified_at)
- reviews: 후기 (id, user_id, theme_id, rating, is_cleared, escape_time, content)
- notices: 공지 (id, title, content, created_at)
- afterparties: 뒷풀이 일정 (id, event_id, place, max_members, estimated_price)
- afterparty_applications: 뒷풀이 신청 (id, afterparty_id, user_id, is_attending)
- flash_meetings: 번개모임 인증 (id, user_id, place, theme_name, played_at, photo_url, is_cleared, status, reject_reason)
- warnings: 경고 내역 (id, user_id, reason, created_at, issued_by)
- mileage: 마일리지 내역 (id, user_id, amount, reason, created_at)

---

## 핵심 비즈니스 규칙 (세칙 기반)
아래 규칙은 반드시 코드에 반영되어야 한다.

### 출석 인정 조건
- 정기모임 참여 + 익일 23:59 전 Cata_log(출석 인증) 작성 시 1회 인정
- 방탈출 번개모임 참여 + 익일 23:59 전 출석 인증 + 운영진 승인 시 인정
- 번개 2회 = 정기모임 1회와 동일하게 취급
- 뒤풀이만 참여는 출석 미인정

### 경고 부여 기준
- 월별 출석 미달: 경고 1회
- 방탈출 지각: 경고 1회
- 방탈출 노쇼: 경고 2회
- 부적절한 행위: 운영진 판단 (경고 횟수 직접 입력)
- 경고 3회 이상 누적: 기수 말 퇴출, 기수 연장 불가

### 배정 알고리즘 우선순위
- 1지망 우선 배정
- 인원 초과 시: 총 참여 횟수 적은 사람 우선 → 동점이면 신청 시간 빠른 순
- 1지망 실패 시 2지망 자동 배정
- 2지망도 실패 시 3지망 자동 배정
- 3지망도 실패 시 운영진 수동 배정

### 마일리지 적립 기준
- 정기모임 방탈출 예약 성공 시 운영진이 수동 부여
- 기타 운영 보조 활동 시 운영진이 수동 부여
- Epi_log(종강파티)에서 추첨으로 사용

---

## 화면 구조
### 부원
- 로그인 화면
- 홈 탭: 공지, 신청 중인 정기모임, 모집 중인 번개, 해야 할 일
- 정기모임 탭: 테마 신청, 배정 확인, 뒷풀이 신청, 후기 작성, 출석 인증
- 번개 탭: 번개 목록, 번개 등록, 번개 인증
- 아카이브 탭: 방탈출 랭킹, 후기 모음, 정모/번개 기록
- MY 탭: 프로필, 출석 이력, 경고 현황, 마일리지, 나의 후기

### 운영진 (admin)
- 공지 작성
- 일정 등록 (방탈출 일정 + 테마 + 뒷풀이)
- 신청자 명단 확인
- 배정 알고리즘 실행 버튼
- 입금 체크 (토글)
- 출석 체크
- 번개 인증 승인/반려
- 경고 부여 및 관리
- 마일리지 부여
- 기수 연장 대상자 확인

---

## 폴더 구조
src/

├── components/       # 재사용 컴포넌트 (Button, Card, StarRating 등)

├── pages/

│   ├── Login.jsx

│   ├── Home.jsx

│   ├── Events.jsx

│   ├── Apply.jsx

│   ├── Afterparty.jsx

│   ├── FlashMeeting.jsx

│   ├── Archive.jsx

│   ├── MyPage.jsx

│   ├── Review.jsx

│   └── admin/

│       ├── Dashboard.jsx

│       ├── EventCreate.jsx

│       ├── Assign.jsx

│       ├── AttendanceCheck.jsx

│       ├── AfterpartyManage.jsx

│       ├── FlashApprove.jsx

│       ├── WarningManage.jsx

│       └── MileageManage.jsx

├── hooks/            # 커스텀 훅

├── utils/            # 배정 알고리즘 등 유틸 함수

├── supabase.js

├── App.jsx

└── main.jsx

---

## 코딩 규칙
- 모든 함수에 타입 힌팅 또는 JSDoc 주석 작성
- 변수명/함수명: 영어 camelCase
- 컴포넌트명: PascalCase
- 주석: 한국어로 작성
- Supabase 쿼리는 반드시 try/catch로 에러 처리
- 민감한 정보는 반드시 .env에 저장, 코드에 하드코딩 금지
- 모든 테이블에 RLS 적용 필수

---

## 환경변수
VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=

---

## 개발 순서 (로드맵)
0단계. HTML/CSS/JS 프로토타입 제작 ✅
1단계. 개발 환경 세팅 (Vite + React + ESLint + Prettier)
2단계. Supabase DB 테이블 생성 + RLS 설정
3단계. React 프로젝트 생성 + Supabase 연결 + 라우팅 설정
4단계. 로그인 / 회원 관리 (Auth + users 테이블)
5단계. 공지 기능 (notices 테이블, 운영진 CRUD)
6단계. 일정 등록 + 테마 신청 (events, themes, applications)
6-1단계. 뒷풀이 등록 + 참여 신청 (afterparties, afterparty_applications)
6-2단계. 번개모임 등록 + 인증 + 운영진 승인 (flash_meetings)
7단계. 배정 알고리즘 실행 (assignments, utils/assign.js)
8단계. 후기 작성 + 아카이브 (reviews)
9단계. 출석 인증 Cata_log + 월별 출석 자동 집계 (attendance)
10단계. 마일리지 · 경고 관리 (mileage, warnings)
11단계. PWA 설정 (manifest, Service Worker)
12단계. Vercel 배포 (GitHub Actions CI/CD)

---

## 현재 개발 단계
[x] 0단계 완료 — HTML/CSS/JS 단일 파일 프로토타입 완성 (`prototype.html`)
[ ] 1단계 진행 예정 — React + Vite 프로젝트 세팅

### 프로토타입 구현 현황 (`prototype.html`)
목 데이터 기반 단일 파일 프로토타입. 실제 백엔드 없이 모든 주요 화면과 상호작용을 확인 가능.

**구현 완료 화면**
- 로그인 / 회원가입 / 아이디·비밀번호 찾기
- 홈 탭: 공지 목록, 해야 할 일, 다가오는 정기모임, 번개 목록
- 번개 탭: 번개 중 / 번개 완료 서브탭, 상세 펼치기, 신청 모달
- 정기모임 탭: 1·2·3지망 드롭다운 신청, 배정 결과, 뒷풀이 신청, 후기 작성
- 아카이브 탭: 방탈 랭킹(전체), 후기 모음(전체), 모임 기록(전체+기수 필터+상세)
- MY 탭: 프로필 수정, 출석 이력, 마일리지 내역, 경고 내역, 나의 후기
- 운영진 전용: 공지 작성, 배정하기(부원별 지망 확인+배정 드롭다운), 부원 관리(경고 부여·출석·마일리지 수정)
- 공통: 최종 확인 알림창, 로그아웃 확인, 토스트 알림, 알림 패널

---

## 알려진 제약 사항
- 입금 자동 확인 불가 (사업자 등록 없으면 API 연동 불가) → 운영진 수동 체크
- 푸시 알림 미구현 → 카톡 병행 운영
- Supabase Free 플랜: 1주일 미접속 시 자동 일시정지 → 방학 중 주의
- 조인된 테이블 기준 Supabase 정렬 불가 → JS에서 sort() 처리
