# CLAUDE.md

## 작업 규칙
- 동일 파일 반복 읽기 금지 (최대 1회)
- 큰 파일(500줄+)은 grep/sed로 필요 부분만 추출
- 코드 작성 전 과도한 재검토 금지
- 계획 → 실행 → 검증 순서로 진행
- 작업 요청 시 반드시 세부 작업으로 쪼개고, 하나씩 적용 후 다음 작업으로 진행
- HTML / CSS / JS 파일 분리 유지

---

## 프로젝트 개요
방탈출 동아리 '_log(로그)'의 운영 통합 웹앱.
카카오톡 공지 + 구글폼 + 구글시트로 분산된 운영을 하나의 PWA로 통합.

---

## 기술 스택
- Frontend: React (Vite), react-router-dom, @tanstack/react-query
- Backend/DB: Supabase (PostgreSQL, Auth, Storage, Realtime)
- 배포: Vercel (GitHub 연동 자동 배포)
- 디자인: Figma

---

## 사용자 역할
- admin: 운영진 — 일정 등록, 배정 실행, 경고 부여, 입금 체크 등 전체 권한
- member: 일반 부원 — 신청, 후기 작성, 번개 등록 등 제한된 권한
- role 컬럼(users 테이블)으로 구분, RLS로 DB 레벨 권한 강제

---

## DB 테이블 목록
- users: 부원 정보 (id, name, email, role, warning_count)
- events: 방탈출 일정 (id, date, place)
- themes: 테마 (id, event_id, name, max_members, price, meet_time, start_time)
- applications: 테마 신청 (id, user_id, event_id, theme_pref_1, theme_pref_2, theme_pref_3, is_paid, created_at)
- assignments: 배정 결과 (id, user_id, theme_id, confirmed)
- attendance: 출석 (id, user_id, event_id, theme_id, attended, certified_at)
- reviews: 후기 (id, user_id, theme_id, rating, is_cleared, escape_time, content, horror_level, difficulty_level)
- notices: 공지 (id, title, content, created_at, is_read_by[])
- afterparties: 뒷풀이 (id, event_id, place, max_members, estimated_price)
- afterparty_applications: 뒷풀이 신청 (id, afterparty_id, user_id, is_attending)
- flash_meetings: 번개모임 (id, user_id, title, place, theme_name, type[방탈출|비방탈출], played_at, photo_url, is_cleared, status, reject_reason, max_members)
- warnings: 경고 (id, user_id, reason, created_at, issued_by)
- mileage: 마일리지 (id, user_id, amount, reason, created_at)
- coins: 코인 (id, user_id, amount, reason, created_at)
- nest_kirogie: 기로기 상태 (id, user_id, generation, room_count, current_skin, created_at)
- shop_items: 상점 아이템 (id, name, type[skin|ticket|goods], price, description, image_url)
- user_items: 보유 아이템 (id, user_id, item_id, purchased_at)

---

## 핵심 비즈니스 규칙

### 출석 인정 조건
- 정기모임 참여 + 익일 23:59 전 Cata_log 작성 → 1회 인정
- 방탈출 번개 참여 + 익일 23:59 전 출석 인증 + 운영진 승인 → 인정
- 번개 2회 = 정기모임 1회 동일 취급
- 뒷풀이만 참여 → 출석 미인정

### 경고 부여 기준
- 월별 출석 미달: 경고 1회
- 방탈출 지각: 경고 1회
- 방탈출 노쇼: 경고 2회
- 부적절한 행위: 운영진 판단
- 경고 3회 이상: 기수 말 퇴출, 기수 연장 불가

### 배정 알고리즘 우선순위
1. 1지망 우선 배정
2. 인원 초과 시 → 총 참여 횟수 적은 순 → 동점이면 신청 시간 빠른 순
3. 1지망 실패 → 2지망 → 3지망 순차 배정
4. 3지망도 실패 → 운영진 수동 배정

### 마일리지 적립
- 정기모임 예약 성공 시 운영진 수동 부여
- 기타 운영 보조 활동 시 운영진 수동 부여
- Epi_log(종강파티) 추첨에 사용

---

## 화면 구조 (4탭: 홈 / 모임 / 후기 / 마이)
→ PLANNING.md 참고

---

## 폴더 구조
```
src/
├── components/
├── pages/
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── Meetings.jsx
│   ├── Reviews.jsx
│   ├── MyPage.jsx
│   ├── ReviewWrite.jsx
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
├── hooks/
├── utils/
├── supabase.js
├── App.jsx
└── main.jsx
```

---

## 코딩 규칙
- 모든 함수: JSDoc 주석 작성
- 변수명/함수명: camelCase / 컴포넌트명: PascalCase
- 주석: 한국어
- Supabase 쿼리: try/catch 필수
- 민감 정보: .env 저장, 하드코딩 금지
- 모든 테이블: RLS 적용 필수

---

## 환경변수
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## 개발 단계
- [x] 0단계: HTML/CSS/JS 프로토타입 완성
- [ ] 1단계: Vite + React + ESLint + Prettier
- [ ] 2단계: Supabase DB 테이블 + RLS
- [ ] 3단계: React 프로젝트 + Supabase 연결 + 라우팅
- [ ] 4단계: 로그인 / 회원 관리
- [ ] 5단계: 공지 기능
- [ ] 6단계: 일정 등록 + 테마 신청
- [ ] 6-1단계: 뒷풀이
- [ ] 6-2단계: 번개모임
- [ ] 7단계: 배정 알고리즘
- [ ] 8단계: 후기 작성 + 아카이브
- [ ] 9단계: 출석 인증 Cata_log + 월별 집계
- [ ] 10단계: 마일리지·경고 관리
- [ ] 11단계: PWA 설정
- [ ] 12단계: Vercel 배포

---

## 알려진 제약
- 입금 자동 확인 불가 → 운영진 수동 체크
- 푸시 알림 미구현 → 카톡 병행
- Supabase Free: 1주 미접속 시 일시정지 → 방학 중 주의
- 조인 테이블 기준 Supabase 정렬 불가 → JS sort() 처리