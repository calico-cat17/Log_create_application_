# TASKS.md

> 마지막 업데이트: 2026-06-23
> 현재 단계: 0단계 완료 (프로토타입), 1단계 착수 전

---

## 0단계 — HTML 프로토타입 ✅ 완료

- [x] prototype.html / prototype.css / prototype.js 파일 분리
- [x] 라이트 테마 디자인 시스템 (CSS Variables)
- [x] 로그인 / 회원가입 / 아이디·비밀번호 찾기
- [x] 4탭 구조: 홈 / 모임 / 후기 / 마이
- [x] 홈: 할 일 카드, 공지 자동 슬라이드 배너, 기로기 프로필 카드, 정기모임 요약, 번개 캐러셀
- [x] 모임: 정기모임 세그먼트 (상태별 버튼 흐름, 테마표, 배정표), 번개모임 세그먼트 (FAB, 필터)
- [x] 후기: 방탈 랭킹 (장르 표시), 전체 후기 정렬 필터
- [x] 마이: 기로기 프로필, 출석, 마일리지, 장르 분포, 꾸미기(코인·성장·상점)
- [x] 운영진 전용: 공지 작성, 배정하기 모달(자동배정+확정), 부원 관리
- [x] 공통: 최종 확인 팝업, 로그아웃 확인, 토스트 알림, 스낵 바텀시트

---

## 1단계 — 개발 환경 세팅

- [ ] Node.js / npm 설치 확인
- [ ] Vite + React 프로젝트 생성 (`npm create vite@latest`)
- [ ] 의존성 설치: react-router-dom, @tanstack/react-query, @supabase/supabase-js
- [ ] ESLint + Prettier 설정
- [ ] `.env` 파일 생성 및 `.gitignore` 추가
- [ ] GitHub 레포지토리 생성 및 초기 커밋
- [ ] Vercel 연동 설정 (자동 배포 파이프라인)

---

## 2단계 — Supabase DB 설정

- [ ] Supabase 프로젝트 생성
- [ ] 테이블 생성: users, events, themes, applications, assignments
- [ ] 테이블 생성: attendance, reviews, notices, afterparties, afterparty_applications
- [ ] 테이블 생성: flash_meetings, warnings, mileage, coins, nest_kirogie, shop_items, user_items
- [ ] 전체 테이블 RLS 활성화
- [ ] RLS 정책 설정
  - [ ] users: 본인만 수정, admin은 전체 조회·수정
  - [ ] notices: 전체 조회, admin만 insert/update/delete
  - [ ] applications: 본인만 insert/수정, admin은 전체 조회
  - [ ] assignments: 본인만 조회, admin은 전체 CRUD
  - [ ] warnings / mileage / coins: 본인만 조회, admin은 CRUD
- [ ] Auth Trigger: 가입 시 users 테이블 자동 동기화
- [ ] reviews UNIQUE 제약: (user_id, theme_id)
- [ ] 테스트용 admin 계정 1개 생성
- [ ] Supabase URL / anon key `.env`에 저장

---

## 3단계 — React 프로젝트 기본 구조

- [ ] 폴더 구조 생성 (src/pages, src/components, src/hooks, src/utils)
- [ ] `supabase.js` 클라이언트 파일 생성
- [ ] react-router-dom 라우팅 설정 (App.jsx)
- [ ] 전역 스타일 적용 (CSS Variables, 라이트 테마)
- [ ] PrivateRoute 컴포넌트 (미로그인 → /login 리다이렉트)
- [ ] AdminRoute 컴포넌트 (비운영진 접근 차단)

---

## 4단계 — 로그인 / 회원 관리

- [ ] Login.jsx — Supabase Auth 이메일 로그인
- [ ] Signup.jsx — 회원가입 (이름·생년월일·전화번호·아이디·비밀번호, 운영진 승인 대기)
- [ ] FindAccount.jsx — 아이디/비밀번호 찾기
- [ ] 로그인 상태 전역 관리 (Context API)
- [ ] role 기반 UI 분기 처리

---

## 5단계 — 공지 기능

- [ ] Home.jsx — 공지 배너 (미확인 N건, 자동 슬라이드)
- [ ] spNotices — 전체 공지 서브페이지
- [ ] 운영진: 공지 작성 모달 (제목·내용·확인 알림)
- [ ] 운영진: 공지 수정·삭제
- [ ] React Query로 공지 데이터 캐싱

---

## 6단계 — 일정 등록 + 테마 신청

- [ ] Meetings.jsx — 정기모임 세그먼트
- [ ] admin/EventCreate.jsx — 일정·테마·뒷풀이 등록
- [ ] 정기모임 상태별 버튼 흐름 구현
  - [ ] D-7 이상: 희망테마 신청하기
  - [ ] 테마 미확정: 스낵 바텀시트
  - [ ] 테마 확정: 방켓팅(1·2·3지망) + 뒷풀이 버튼
  - [ ] 배정 완료: 테마표 + 배정표 (표 형태)
- [ ] 신청 중복 방지 로직
- [ ] 신청 마감 처리 (날짜 기준 자동)

### 6-1단계 — 뒷풀이
- [ ] 뒷풀이 신청 (장소·최대 인원·출석 미인정 안내)
- [ ] admin/AfterpartyManage.jsx — 뒷풀이 등록·참여자 관리·입금 체크

### 6-2단계 — 번개모임
- [ ] Meetings.jsx — 번개모임 세그먼트 (필터, FAB)
- [ ] 번개 등록 폼 (제목·분류·지역·날짜·인원·내용)
- [ ] 번개 신청 기능
- [ ] 번개 인증 (사진 업로드 → Supabase Storage)
- [ ] admin/FlashApprove.jsx — 운영진 승인·반려

---

## 7단계 — 배정 알고리즘

- [ ] utils/assign.js 구현
  - [ ] 1지망 우선 배정
  - [ ] 초과 시: 총 참여 횟수 적은 순 → 신청 시간 빠른 순
  - [ ] 2지망, 3지망 순차 배정
  - [ ] 3지망도 실패 → 미배정 처리
  - [ ] 결원 발생 시 전체 재배정 흐름
- [ ] admin/Assign.jsx — 배정 실행 버튼 + 결과 확인·수동 수정

---

## 8단계 — 후기 작성 + 아카이브

- [ ] ReviewWrite.jsx — 후기 작성 (별점·탈출성공·시간·내용·MVP)
- [ ] Reviews.jsx — 방탈 랭킹 (장르 표시), 전체 후기 (정렬 필터)
- [ ] (user_id, theme_id) UNIQUE 제약으로 중복 방지

---

## 9단계 — 출석 인증 + 집계

- [ ] Cata_log 출석 인증 화면 (참여 후 익일 23:59 전 작성)
- [ ] 번개 출석 인정 로직 (운영진 승인 후, 2회=1회)
- [ ] 월별 출석 자동 집계
- [ ] 출석 미달 경고 자동 발급 로직 (월말 기준)
- [ ] 출석 이력 서브페이지

---

## 10단계 — 마일리지 · 경고 관리

- [ ] admin/WarningManage.jsx — 경고 부여·내역
- [ ] admin/MileageManage.jsx — 마일리지 부여·내역
- [ ] admin/CoinManage.jsx — 코인 부여·내역
- [ ] 마이 탭: 경고·마일리지 내역 연동
- [ ] 경고 3회 누적 시 퇴출 대상자 목록 (운영진)

---

## 11단계 — PWA 설정

- [ ] manifest.json 작성 (앱 이름, 아이콘, 테마색)
- [ ] Service Worker 등록 (오프라인 캐싱)
- [ ] iOS / Android 홈 화면 추가 테스트

---

## 12단계 — 배포

- [ ] Vercel 환경변수 설정 (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] 프로덕션 빌드 검증 (`npm run build`)
- [ ] 커스텀 도메인 연결 (선택)
- [ ] Supabase 일시정지 방지 대책 (방학 중 주기적 접속)

---

## 백로그

- [ ] 푸시 알림 (Web Push API / FCM)
- [ ] 다크/라이트 테마 전환
- [ ] 부원 검색·필터 (관리자 화면)
- [ ] 기수 연장 대상자 자동 목록 (경고 3회↑)
- [ ] Epi_log(종강파티) 마일리지 추첨 화면
- [ ] 입금 자동 확인 (사업자 등록 후 PG 연동)
- [ ] 기로기 Rive 애니메이션 업그레이드