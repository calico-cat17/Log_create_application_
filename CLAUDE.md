# CLAUDE.md

## 작업 규칙
- 동일 파일 반복 읽기 금지 (최대 1회)
- 큰 파일(500줄+)은 grep/sed로 필요 부분만 추출
- 코드 작성 전 과도한 재검토 금지
- 계획 → 실행 → 검증 순서로 진행
- 작업 요청 시 반드시 세부 작업으로 쪼개고, 하나씩 적용 후 다음 작업으로 진행
- HTML / CSS / JS 파일 분리 유지 (prototype.html → prototype.html + prototype.css + prototype.js)

---

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
- themes: 테마 (id, event_id, name, max_members, price, meet_time, start_time)
- applications: 테마 신청 (id, user_id, event_id, theme_pref_1, theme_pref_2, theme_pref_3, is_paid)
- assignments: 배정 결과 (id, user_id, theme_id, confirmed)
- attendance: 출석 (id, user_id, event_id, theme_id, attended, certified_at)
- reviews: 후기 (id, user_id, theme_id, rating, is_cleared, escape_time, content, horror_level, difficulty_level)
- notices: 공지 (id, title, content, created_at, is_read_by[])
- afterparties: 뒷풀이 일정 (id, event_id, place, max_members, estimated_price)
- afterparty_applications: 뒷풀이 신청 (id, afterparty_id, user_id, is_attending)
- flash_meetings: 번개모임 (id, user_id, title, place, theme_name, type[방탈출|비방탈출], played_at, photo_url, is_cleared, status, reject_reason, max_members)
- warnings: 경고 내역 (id, user_id, reason, created_at, issued_by)
- mileage: 마일리지 내역 (id, user_id, amount, reason, created_at)
- coins: 코인 내역 (id, user_id, amount, reason, created_at)
- nest_kirogie: 기로기 상태 (id, user_id, generation, room_count, current_skin, created_at)
- shop_items: 상점 아이템 (id, name, type[skin|ticket|goods], price, description, image_url)
- user_items: 보유 아이템 (id, user_id, item_id, purchased_at)

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
### 부원 (4개 탭: 홈 / 모임 / 후기 / 마이)

#### 홈 탭
- 해야 할 일 팝업 배너 (할 일 있을 때 공지 위에 표시)
- 공지사항 배너: "확인하지 않은 공지사항이 N건 있습니다" (클릭 → 전체 공지)
- 다가오는 정기모임 카드 (요약)
- 모집 중인 번개 목록 (요약)

#### 모임 탭 (정기 / 번개 서브탭)
**정기 서브탭**
- 다가오는 정기모임
  - D-7 이상 전: 희망테마 신청하기 버튼
  - 테마 확정 전 (D-7 이내): 상세 → "테마 확정 전" 팝업 / 방켓팅 예정 시간 표시 / 비활성 버튼
  - 테마 확정 + 배정 완료: 상세 → 테마표 / 방켓팅 버튼 + 뒷풀이 버튼
  - 방켓팅 완료: 상세 → 테마표 / 비활성 버튼 + 뒷풀이 버튼
  - 운영진: 배정하기 버튼 / 결원 시 재배정하기 버튼
- 끝난 정기모임: 상세 / 배정 결과 / 테마표 / 사진 / 후기 작성
- 상세 정보: 제목, 날짜, 위치, 테마표(테마이름·가격·모이는시간·시작시간), 배정표

**번개 서브탭**
- 다가오는 번개: 신청 / 모집 인원 / 상세 / 번개 올리기 버튼
  - 필터: 전체 / 방탈출 / 비방탈출 / 모집 마감 안보기
- 끝난 번개: 상세 / 사진
  - 필터: 내 모임만 보기 / 방탈출 / 비방탈출

#### 후기 탭
- 방탈 랭킹: 리뷰 개수 / 평균 평점 / 테마 제목 (더보기)
- 전체 후기: 정렬 (별점순 / 최신순 / 공포도순 / 난이도순)

#### 마이 탭
- 전체 방탈출 횟수
- 기로기 프로필 (꾸미기/스킨 변경)
- 이번 기수 출석 현황
- 마일리지
- 시각화 자료: 장르별 분포 바 차트
- 세부사항: 경고 현황 / 나의 후기 / 로그아웃
- 하단 꾸미기 영역: 코인 잔액, 기로기 성장(알→아기→기로기→어른→마스터), 상점(스킨·굿즈·응모권, 코인 사용)
- 운영진 전용: 부원 관리 (출석·경고·마일리지 부여)

### 운영진 추가 기능
- 공지 작성
- 일정 등록 (정기모임 + 테마 + 뒷풀이)
- 신청자 명단 확인
- 배정 알고리즘 실행 / 결원 시 재배정
- 입금 체크 (토글)
- 출석 체크
- 번개 인증 승인/반려
- 경고 부여 및 관리
- 마일리지 / 코인 부여
- 기수 연장 대상자 확인

---

## 폴더 구조
src/

├── components/       # 재사용 컴포넌트 (Button, Card, StarRating, KirogieDisplay 등)

├── pages/

│   ├── Login.jsx

│   ├── Home.jsx

│   ├── Meetings.jsx        # 정기 + 번개 통합 탭

│   ├── Reviews.jsx         # 후기 탭 (랭킹 + 전체 후기)

│   ├── MyPage.jsx

│   ├── ReviewWrite.jsx     # 후기 작성 모달/페이지

│   └── admin/

│       ├── Dashboard.jsx

│       ├── EventCreate.jsx

│       ├── Assign.jsx

│       ├── AttendanceCheck.jsx

│       ├── AfterpartyManage.jsx

│       ├── FlashApprove.jsx

│       ├── WarningManage.jsx

│       ├── MileageManage.jsx

│       └── CoinManage.jsx

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
[x] 0단계 완료 — HTML/CSS/JS 파일 분리 프로토타입 완성 (`prototype.html` + `prototype.css` + `prototype.js`)
[ ] 1단계 진행 예정 — React + Vite 프로젝트 세팅

### 프로토타입 파일 구조
- `prototype.html` — HTML 마크업
- `prototype.css` — 라이트 테마 CSS (CSS Variables 기반)
- `prototype.js` — 목 데이터 + 상태 관리 + 인터랙션 로직

### 프로토타입 디자인 시스템
- 배경: `--bg:#edf0fa` (라이트 블루-라벤더)
- 카드: `--card:#ffffff` + `--border:#e4e8f4`
- 프라이머리 버튼: `--navy:#1a2a5e` (다크 네이비)
- 긴급/D-day: `--accent:#e84040` (레드)
- 탭별 헤더 타이틀: 홈은 로고(_log), 나머지는 탭명

### 프로토타입 구현 현황 (4탭 구조: 홈 / 모임 / 후기 / 마이)
- 로그인 / 회원가입 / 아이디·비밀번호 찾기
- 홈 탭: 할 일 카드(인증하기 버튼), 공지 한 줄 배너, 기로기 프로필 카드(방탈출 횟수·출석·코인), 다가오는 정기모임 요약, 번개모임 썸네일 카드
- 모임 탭 (정기모임 / 번개모임 세그먼트):
  - 정기: 신청 열림 → "뒷풀이만 신청" + "정기모임 신청" 2버튼 / 미오픈 → 방켓팅 오픈 예정 회색 버튼
  - 번개: 신청, 상세 펼침, 번개 등록
  - 운영진: 배정하기 버튼, 자동 배정 알고리즘
- 후기 탭: 방탈 랭킹(리뷰 수·평균 평점), 전체 후기(별점순·최신순·공포도순·난이도순 정렬)
- 마이 탭: 방탈출 횟수, 기로기 프로필+꾸미기, 출석, 마일리지, 경고/나의 후기/로그아웃, 코인 잔액·기로기 성장·상점
- 운영진 전용: 공지 작성, 배정하기, 부원 관리(경고·출석·마일리지 수정)
- 공통: 라이트 테마, 최종 확인 알림창, 로그아웃 확인, 토스트 알림, 알림 패널, 스낵 바텀시트

---

## 알려진 제약 사항
- 입금 자동 확인 불가 (사업자 등록 없으면 API 연동 불가) → 운영진 수동 체크
- 푸시 알림 미구현 → 카톡 병행 운영
- Supabase Free 플랜: 1주일 미접속 시 자동 일시정지 → 방학 중 주의
- 조인된 테이블 기준 Supabase 정렬 불가 → JS에서 sort() 처리
