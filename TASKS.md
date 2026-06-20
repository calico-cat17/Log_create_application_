# TASKS.md

> 마지막 업데이트: 2026-06-21
> 현재 단계: 0단계 완료 (프로토타입), 1단계 착수 전

---

## 0단계 — HTML 프로토타입 ✅ 완료

- [x] prototype.html 단일 파일 프로토타입 생성
- [x] 다크 테마 디자인 시스템 (CSS Custom Properties)
- [x] 로그인 / 회원가입 / 아이디·비밀번호 찾기 화면
- [x] 운영진 / 부원 역할 분기 체험 (목 데이터)
- [x] 홈 탭 (공지, 할 일, 정기모임 요약, 번개 요약)
- [x] 번개 탭 (번개 중 / 번개 완료 서브탭, 상세 펼침, 신청, 등록)
- [x] 정기모임 탭 (1·2·3지망 드롭다운 신청, 배정 확인, 뒷풀이, 후기 작성)
- [x] 아카이브 탭 (랭킹 전체, 후기 전체, 모임 기록 전체 + 기수 필터 + 모임 상세)
- [x] MY 탭 (프로필 수정, 출석 이력, 마일리지, 경고 내역, 나의 후기)
- [x] 운영진 전용: 공지 작성, 배정하기, 부원 관리 (경고·출석·마일리지)
- [x] 범용 최종 확인 팝업 (동적 아이콘·제목·본문)
- [x] 로그아웃 확인 팝업
- [x] 토스트 알림 시스템
- [x] CLAUDE.md, PLANNING.md, TASKS.md 문서화

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
- [ ] 테이블 생성: flash_meetings, warnings, mileage
- [ ] 각 테이블 RLS 정책 설정
  - [ ] users: 본인 데이터만 수정 가능, admin은 전체 조회·수정
  - [ ] notices: 전체 조회, admin만 insert/update/delete
  - [ ] applications: 본인 데이터만 insert/수정, admin은 전체 조회
  - [ ] assignments: 본인 것만 조회, admin은 전체 CRUD
  - [ ] warnings: 본인 것만 조회, admin은 CRUD
  - [ ] mileage: 본인 것만 조회, admin은 CRUD
- [ ] 초기 seed 데이터 삽입 (테스트용 admin 계정 1개)
- [ ] Supabase URL / anon key `.env`에 저장

---

## 3단계 — React 프로젝트 기본 구조

- [ ] 폴더 구조 생성 (src/pages, src/components, src/hooks, src/utils)
- [ ] `supabase.js` 클라이언트 파일 생성
- [ ] react-router-dom 라우팅 설정 (App.jsx)
- [ ] 전역 스타일 (CSS Variables, 다크 테마) 적용
- [ ] PrivateRoute 컴포넌트 (미로그인 시 /login 리다이렉트)
- [ ] AdminRoute 컴포넌트 (비운영진 접근 차단)

---

## 4단계 — 로그인 / 회원 관리

- [ ] Login.jsx — Supabase Auth 이메일 로그인
- [ ] Signup.jsx — 회원가입 신청 (운영진 승인 대기 상태)
- [ ] FindAccount.jsx — 아이디·비밀번호 찾기
- [ ] users 테이블 자동 동기화 (Auth 트리거 or 수동 insert)
- [ ] 로그인 상태 전역 관리 (Context API 또는 Zustand)
- [ ] 역할(role) 기반 UI 분기 처리

---

## 5단계 — 공지 기능

- [ ] Home.jsx — 공지 섹션 (최신 2개 표시)
- [ ] Notices.jsx — 전체 공지 목록 페이지
- [ ] 운영진: 공지 작성 모달 (제목·내용·업로드 확인)
- [ ] 운영진: 공지 수정·삭제
- [ ] React Query로 공지 데이터 캐싱

---

## 6단계 — 일정 등록 + 테마 신청

- [ ] Events.jsx — 정기모임 목록 (다가오는 / 지난)
- [ ] admin/EventCreate.jsx — 일정·테마 등록 폼
- [ ] Apply.jsx — 1·2·3지망 드롭다운 신청 (장르·가격 즉시 표시)
- [ ] 신청 중복 방지 로직
- [ ] 신청 마감 처리 (날짜 기준 자동)

### 6-1단계 — 뒷풀이

- [ ] Afterparty.jsx — 뒷풀이 신청 화면
- [ ] admin/AfterpartyManage.jsx — 뒷풀이 등록·관리
- [ ] 입금 체크 토글 (is_paid 컬럼)

### 6-2단계 — 번개모임

- [ ] FlashMeeting.jsx — 번개 목록 (번개 중 / 번개 완료)
- [ ] 번개 등록 폼 (제목·분류·지역·날짜·인원·내용)
- [ ] 번개 신청 기능
- [ ] 번개 인증 (사진 업로드 → Supabase Storage)
- [ ] admin/FlashApprove.jsx — 운영진 승인·반려

---

## 7단계 — 배정 알고리즘

- [ ] utils/assign.js 구현
  - [ ] 1지망 우선 배정
  - [ ] 초과 시 총 참여 횟수 적은 순 → 동점 시 신청 시간 빠른 순
  - [ ] 2지망, 3지망 순차 배정
  - [ ] 3지망도 실패 시 미배정 처리
- [ ] admin/Assign.jsx — 배정 실행 버튼 + 부원별 결과 확인·수동 수정
- [ ] 배정 결과 공지 연동

---

## 8단계 — 후기 작성 + 아카이브

- [ ] Review.jsx — 후기 작성 폼 (별점·탈출성공·시간·내용·MVP)
- [ ] Archive.jsx — 방탈 랭킹, 후기 모음, 모임 기록
- [ ] 랭킹: reviews 집계 (평균 rating, 탈출률)
- [ ] 모임 기록: 기수별 필터, 상세 화면

---

## 9단계 — 출석 인증 + 집계

- [ ] 출석 인증 화면 (Cata_log): 정기모임 참여 후 익일 23:59 전 작성
- [ ] 번개 출석 인정 로직 (운영진 승인 후 +0.5회)
- [ ] 월별 출석 자동 집계 (Supabase Function 또는 클라이언트 계산)
- [ ] 출석 미달 경고 자동 발급 로직 (월말 기준)
- [ ] 출석 이력 페이지

---

## 10단계 — 마일리지 · 경고 관리

- [ ] admin/WarningManage.jsx — 경고 부여·내역 조회
- [ ] admin/MileageManage.jsx — 마일리지 부여·내역 조회
- [ ] MY 탭: 경고 내역, 마일리지 내역 연동
- [ ] 경고 3회 누적 시 퇴출 대상자 목록 (운영진 화면)

---

## 11단계 — PWA 설정

- [ ] manifest.json 작성 (앱 이름, 아이콘, 테마 색)
- [ ] Service Worker 등록 (오프라인 캐싱 기본 설정)
- [ ] iOS / Android 홈 화면 추가 테스트

---

## 12단계 — 배포

- [ ] Vercel 환경변수 설정 (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] 프로덕션 빌드 검증 (`npm run build`)
- [ ] 커스텀 도메인 연결 (선택)
- [ ] Supabase Free 플랜 일시정지 방지 대책 수립 (방학 중 주기적 접속)

---

## 백로그 (우선순위 낮음)

- [ ] 푸시 알림 (Web Push API) — 카톡 병행 운영 중이므로 선택사항
- [ ] 다크/라이트 테마 전환
- [ ] 부원 검색·필터 기능 (관리자 화면)
- [ ] 기수 연장 대상자 자동 목록 (경고 3회 이상)
- [ ] Epi_log(종강파티) 마일리지 추첨 화면
- [ ] 입금 자동 확인 (사업자 등록 후 PG 연동)
