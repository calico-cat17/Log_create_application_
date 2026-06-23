// ===== DATA =====
const THEMES = {
  '1': { name:'미스터리 저택', genre:'공포/미스터리', price:'20,000원', meetTime:'13:00', startTime:'13:30' },
  '2': { name:'우주 탈출',    genre:'SF/어드벤처',  price:'22,000원', meetTime:'15:00', startTime:'15:30' },
  '3': { name:'탐정 사무소',  genre:'추리',          price:'18,000원', meetTime:'17:00', startTime:'17:30' }
};

const MEMBERS = [
  { name:'이부원', gen:4, att:6, warn:1, mile:80 },
  { name:'김민준', gen:4, att:8, warn:0, mile:120 },
  { name:'박지수', gen:4, att:7, warn:0, mile:90 },
  { name:'최서연', gen:4, att:5, warn:2, mile:60 },
  { name:'홍길동', gen:4, att:9, warn:0, mile:150 },
  { name:'이나래', gen:4, att:4, warn:1, mile:50 }
];

const MEETINGS = [
  { id:'m1', title:'4차 정기모임', type:'정기', area:'강남구', date:'2026.06.21', gen:4, themes:['미스터리 저택','우주 탈출','탐정 사무소'], attendees:14, afterParty:8 },
  { id:'m2', title:'신촌 방탈출 번개', type:'번개', area:'서대문구', date:'2026.06.15', gen:4, themes:['범죄 현장'], attendees:3, afterParty:0 },
  { id:'m3', title:'3차 정기모임', type:'정기', area:'홍대', date:'2026.05.18', gen:4, themes:['좀비 아포칼립스','마법사의 탑'], attendees:12, afterParty:7 },
  { id:'m4', title:'2차 정기모임', type:'정기', area:'신촌', date:'2026.04.20', gen:4, themes:['마법사의 탑','탐정 사무소'], attendees:15, afterParty:10 },
  { id:'m5', title:'강남 방탈출 번개', type:'번개', area:'강남구', date:'2026.03.22', gen:4, themes:['미스터리 저택'], attendees:4, afterParty:0 },
  { id:'m6', title:'1차 정기모임', type:'정기', area:'강남구', date:'2026.03.15', gen:4, themes:['탐정 사무소','우주 탈출'], attendees:18, afterParty:12 }
];

const RANKINGS = [
  { rank:1, icon:'🥇', name:'마법사의 탑',    reviews:8, genre:'판타지/어드벤처', rating:4.7 },
  { rank:2, icon:'🥈', name:'좀비 아포칼립스', reviews:5, genre:'공포/호러',       rating:4.3 },
  { rank:3, icon:'🥉', name:'미스터리 저택',   reviews:6, genre:'공포/미스터리',   rating:4.1 },
  { rank:4, icon:'4위', name:'탐정 사무소',   reviews:7, genre:'추리',            rating:4.0 },
  { rank:5, icon:'5위', name:'우주 탈출',     reviews:4, genre:'SF/어드벤처',     rating:3.8 },
  { rank:6, icon:'6위', name:'범죄 현장',     reviews:3, genre:'추리',            rating:3.5 }
];

const APPLICANTS = [
  { name:'이부원', p1:'미스터리 저택', p2:'우주 탈출',    p3:'탐정 사무소' },
  { name:'김민준', p1:'우주 탈출',    p2:'탐정 사무소',  p3:'미스터리 저택' },
  { name:'박지수', p1:'탐정 사무소',  p2:'우주 탈출',    p3:'미스터리 저택' },
  { name:'최서연', p1:'미스터리 저택',p2:'탐정 사무소',  p3:'우주 탈출' },
  { name:'홍길동', p1:'우주 탈출',    p2:'미스터리 저택',p3:'탐정 사무소' },
  { name:'이나래', p1:'탐정 사무소',  p2:'미스터리 저택',p3:'우주 탈출' }
];

const REVIEWS = [
  { theme:'마법사의 탑',      user:'김민준', date:'2026-05-20', rating:5, cleared:true,  time:'48분', content:'정말 재밌었어요! 퍼즐 난이도도 적당하고 스토리가 몰입감 있었습니다.', horror:1, difficulty:3 },
  { theme:'좀비 아포칼립스', user:'이동현', date:'2026-05-19', rating:4, cleared:false, time:null,   content:'분위기가 최고였어요. 좀비 연기에 깜짝 놀랐지만 재밌었습니다!',           horror:4, difficulty:4 },
  { theme:'마법사의 탑',      user:'최서연', date:'2026-05-18', rating:4, cleared:true,  time:'55분', content:'힌트 없이 탈출 성공! 팀워크가 좋았어요.',                               horror:1, difficulty:4 },
  { theme:'탐정 사무소',      user:'박지수', date:'2026-04-22', rating:5, cleared:true,  time:'62분', content:'스토리가 정말 탄탄했어요. 탐정 컨셉이 몰입감을 높여줬습니다.',          horror:2, difficulty:3 },
  { theme:'미스터리 저택',   user:'홍길동', date:'2026-03-15', rating:4, cleared:false, time:null,   content:'공포 분위기 연출이 훌륭했어요. 다음에 다시 도전하고 싶습니다!',          horror:5, difficulty:5 },
  { theme:'우주 탈출',        user:'이나래', date:'2026-03-10', rating:3, cleared:true,  time:'75분', content:'SF 분위기가 신선했어요. 퍼즐이 좀 단순한 편이었어요.',                   horror:1, difficulty:2 }
];

const NOTICES = [
  { title:'6월 정기모임 안내', body:'6월 21일 강남 방탈출 정기모임이 진행됩니다. 신청 기간은 6월 19일까지이며, 참가비는 테마별로 상이합니다.', date:'2026.06.18', unread:true },
  { title:'5월 번개 모임 결과 안내', body:'지난 번개 모임에 참여해주신 부원 여러분 감사합니다! 출석 0.5회가 각각 인정되었습니다.', date:'2026.05.20', unread:false },
  { title:'회비 납부 안내', body:'이번 기수 회비 납부가 완료되지 않은 부원은 6월 15일까지 납부 부탁드립니다.', date:'2026.05.01', unread:true }
];

const SHOP_ITEMS = [
  { icon:'🌸', name:'벚꽃 스킨',   type:'skin',   price:50,  desc:'봄 분위기의 벚꽃 테마 스킨' },
  { icon:'🌌', name:'우주 스킨',   type:'skin',   price:80,  desc:'신비로운 우주 테마 스킨' },
  { icon:'🎟️', name:'추첨 응모권', type:'ticket', price:30,  desc:'Epi_log 추첨 응모 1회권' },
  { icon:'🔑', name:'열쇠고리',    type:'goods',  price:120, desc:'로그 브랜드 열쇠고리' }
];

// ===== STATE =====
let user = null;
let curTab = 'home';
let meetingSeg = 'reg';
let flashTabVal = 'rec';
let rating = 0;
let clearedVal = null;
let applyTarget = '';
let notifOpen = false;
let pendingAction = null;
let selectedMemberIdx = -1;
let tempAtt = 0;
let meetingFilter = '전체';
let reviewSort = '최신순';
let noticeIdx = 0;
let noticeTimer = null;
let bookingPref = [null, null, null];

// ===== PAGE ROUTING =====
function showPg(pg) {
  ['pgLogin','pgSignup','pgFindpw','pgApp'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const map = { login:'pgLogin', signup:'pgSignup', findpw:'pgFindpw', app:'pgApp' };
  const el = document.getElementById(map[pg]);
  if (el) el.style.display = pg === 'login' ? 'flex' : 'block';
}

// ===== AUTH =====
function doLogin() {
  const id = document.getElementById('lid').value.trim();
  const pw = document.getElementById('lpw').value;
  if (!id || !pw) { showToast('아이디와 비밀번호를 입력해주세요.','err'); return; }
  loginAs(id === 'admin' ? 'admin' : 'member');
}

function loginAs(role) {
  user = role === 'admin'
    ? { name:'김운영', role:'admin', gen:3, esc:12, genre:'공포/미스터리', att:8, attMax:10, rev:10, mile:150, warn:0, coin:200 }
    : { name:'이부원', role:'member', gen:4, esc:7, genre:'추리', att:6, attMax:10, rev:5, mile:80, warn:1, coin:150 };
  showPg('app');
  updateMyPage();
  if (noticeTimer) clearInterval(noticeTimer);
  noticeIdx = 0;
  initNoticeSlider();
  switchTab('home');
}

function askLogout() {
  showFinalConfirm(doLogout, '로그아웃하시겠습니까?', '로그아웃 후 로그인 화면으로 이동합니다.', '👋');
}

function doLogout() {
  user = null;
  if (noticeTimer) { clearInterval(noticeTimer); noticeTimer = null; }
  showPg('login');
  document.getElementById('lid').value = '';
  document.getElementById('lpw').value = '';
}

// ===== MY PAGE =====
function updateMyPage() {
  if (!user) return;
  document.getElementById('avt').textContent = user.name[0];
  document.getElementById('profName').textContent = user.name;
  document.getElementById('profSub').innerHTML = user.role === 'admin'
    ? `${user.gen}기 <span class="admin-tag">운영진</span>`
    : `${user.gen}기 부원`;
  document.getElementById('sEsc').innerHTML = `${user.esc}<span class="stat-unit">회</span>`;
  document.getElementById('sGenre').textContent = user.genre;
  document.getElementById('sAtt').innerHTML = `${user.att}<span class="stat-unit">/ ${user.attMax}회</span>`;
  document.getElementById('sRev').innerHTML = `${user.rev}<span class="stat-unit">개</span>`;
  document.getElementById('sMile').innerHTML = `${user.mile}<span class="stat-unit">P</span>`;
  document.getElementById('attFill').style.width = `${(user.att / user.attMax) * 100}%`;

  const wd = document.getElementById('warnDots');
  wd.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const d = document.createElement('div');
    d.className = 'warn-dot' + (i < user.warn ? ' on' : '');
    d.textContent = i + 1;
    wd.appendChild(d);
  }
  updateKirogi();
}

// ===== HOME PROFILE =====
function updateHomeProfile() {
  if (!user) return;
  const stage = getKirogiStage(user.esc);
  document.getElementById('homeKirogiEmoji').textContent = stage.emoji;
  document.getElementById('homeUserName').textContent = user.name;
  document.getElementById('homeUserBadge').textContent = `${user.gen}기 ${user.role === 'admin' ? '운영진' : '부원'}`;
  document.getElementById('homeEsc').textContent = user.esc + '회';
  document.getElementById('homeAtt').textContent = user.att + '회';
  document.getElementById('homeCoin').textContent = user.coin;
}

// ===== KIROGI =====
function getKirogiStage(esc) {
  if (esc >= 10) return { emoji:'🦅', name:'마스터', min:10, max:15 };
  if (esc >= 6)  return { emoji:'🐤', name:'어른',   min:6,  max:10 };
  if (esc >= 3)  return { emoji:'🐥', name:'기로기', min:3,  max:6  };
  if (esc >= 1)  return { emoji:'🐣', name:'아기',   min:1,  max:3  };
  return { emoji:'🥚', name:'알', min:0, max:1 };
}

function updateKirogi() {
  if (!user) return;
  const s = getKirogiStage(user.esc);
  document.getElementById('kirogiEmoji').textContent = s.emoji;
  document.getElementById('kirogiStage').textContent = s.name + ' 단계';
  const prog = Math.min(100, (user.esc - s.min) / (s.max - s.min) * 100);
  document.getElementById('kirogiFill').style.width = prog + '%';
  document.getElementById('kirogiProgressLabel').textContent = `${user.esc - s.min} / ${s.max - s.min} 방탈출`;
  document.getElementById('coinDisplay').textContent = `코인 ${user.coin} C`;
}

// ===== TAB NAVIGATION =====
const TAB_IDS = { home:'tHome', meeting:'tMeeting', reviews:'tReviews', my:'tMy' };
const TAB_TITLES = { home:null, meeting:'모임', reviews:'후기', my:'마이' };

function switchTab(tab) {
  Object.values(TAB_IDS).forEach(id => document.getElementById(id).classList.remove('active'));
  ['home','meeting','reviews','my'].forEach(t => document.getElementById('tb_' + t).classList.remove('active'));
  document.getElementById(TAB_IDS[tab]).classList.add('active');
  document.getElementById('tb_' + tab).classList.add('active');
  curTab = tab;

  const logo = document.getElementById('hdrLogo');
  const title = document.getElementById('hdrTitle');
  if (TAB_TITLES[tab]) {
    logo.style.display = 'none';
    title.style.display = 'block';
    title.textContent = TAB_TITLES[tab];
  } else {
    logo.style.display = 'flex';
    title.style.display = 'none';
  }

  updateFab();
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = user?.role === 'admin' ? '' : 'none';
  });
  if (tab === 'reviews') renderReviews();
  if (tab === 'my') updateKirogi();
  if (tab === 'home') updateHomeProfile();
  if (notifOpen) toggleNotif();
}

function updateFab() {
  document.getElementById('fabMain').classList.toggle('show', curTab === 'meeting' && meetingSeg === 'flash');
}

// ===== MEETING SEGMENT =====
function switchMeetingSeg(seg) {
  meetingSeg = seg;
  document.getElementById('segReg').classList.toggle('active', seg === 'reg');
  document.getElementById('segFlash').classList.toggle('active', seg === 'flash');
  document.getElementById('secRegular').style.display = seg === 'reg' ? 'block' : 'none';
  document.getElementById('secFlash').style.display = seg === 'flash' ? 'block' : 'none';
  updateFab();
}

function goToFlash() {
  switchTab('meeting');
  switchMeetingSeg('flash');
}

// ===== MEETING CARD EXPAND =====
function onMeetingCardClick(id, el) {
  const detail = document.getElementById('detail-' + id);
  const isOpen = detail.classList.contains('open');
  document.querySelectorAll('.mc-detail').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.mc').forEach(c => c.classList.remove('expanded'));
  if (!isOpen) { detail.classList.add('open'); el.classList.add('expanded'); }
}

// ===== NOTICE SLIDER =====
function initNoticeSlider() {
  const unread = NOTICES.filter(n => n.unread).length;
  document.getElementById('noticeUnreadCount').textContent = unread;
  renderNoticeSlide();
  noticeTimer = setInterval(() => {
    noticeIdx = (noticeIdx + 1) % NOTICES.length;
    renderNoticeSlide();
  }, 3000);
}

function renderNoticeSlide() {
  const n = NOTICES[noticeIdx];
  document.getElementById('noticeSlide').innerHTML = `
    <div class="notice-slide-title">${n.title}${n.unread ? ' <span class="badge ba" style="font-size:10px;padding:1px 6px;vertical-align:middle;">NEW</span>' : ''}</div>
    <div class="notice-slide-body">${n.body}</div>
    <div class="notice-slide-date">${n.date}</div>`;
  document.getElementById('noticeDots').innerHTML = NOTICES.map((_, i) =>
    `<div class="notice-dot${i === noticeIdx ? ' on' : ''}"></div>`).join('');
}

// ===== NOTIFICATION =====
function toggleNotif(e) {
  if (e) e.stopPropagation();
  notifOpen = !notifOpen;
  document.getElementById('notifPanel').classList.toggle('open', notifOpen);
}
document.addEventListener('click', e => {
  if (notifOpen && !e.target.closest('#notifPanel') && !e.target.closest('.notif-btn')) {
    notifOpen = false;
    document.getElementById('notifPanel').classList.remove('open');
  }
});

// ===== FLASH =====
function switchFlash(tab) {
  flashTabVal = tab;
  document.getElementById('stRec').classList.toggle('active', tab === 'rec');
  document.getElementById('stClosed').classList.toggle('active', tab === 'closed');
  document.getElementById('flRec').style.display = tab === 'rec' ? 'block' : 'none';
  document.getElementById('flClosed').style.display = tab === 'closed' ? 'block' : 'none';
}

function toggleDetail(n) {
  const fd = document.getElementById('fd' + n);
  const isOpen = fd.classList.contains('open');
  document.querySelectorAll('.fc-detail').forEach(d => d.classList.remove('open'));
  if (!isOpen) fd.classList.add('open');
}

function openApply(name) {
  applyTarget = name;
  document.getElementById('mApplyTitle').textContent = name;
  document.getElementById('mApplyMsg').textContent = `"${name}" 번개에 신청하시겠습니까? 신청 후 취소는 등록자에게 직접 연락해주세요.`;
  openModal('mApply');
}

function confirmApply() {
  closeModal('mApply');
  showFinalConfirm(() => showToast(`${applyTarget} 신청이 완료되었습니다!`, 'ok'));
}

function onFab() {
  openModal('mCreateFlash');
}

function submitFlash() {
  closeModal('mCreateFlash');
  showToast('번개 모집글이 등록되었습니다!', 'ok');
}

// ===== SNACK =====
function openSnack(id) { document.getElementById(id).classList.add('open'); }
function closeSnack(id) { document.getElementById(id).classList.remove('open'); }
function snackBgClose(e, id) { if (e.target === document.getElementById(id)) closeSnack(id); }

// ===== BOOKING (방켓팅) =====
function openBooking() {
  bookingPref = [null, null, null];
  [1, 2, 3].forEach(i => renderBookingPref(i));
  openSubpage('spBooking');
}

function renderBookingPref(pref) {
  const container = document.getElementById('bookingPref' + pref);
  container.innerHTML = Object.entries(THEMES).map(([id, t]) => `
    <div class="btheme${bookingPref[pref - 1] === id ? ' selected' : ''}" onclick="selectBookingTheme(${pref},'${id}')">
      <div>
        <div class="bt-name">${t.name}</div>
        <div class="bt-meta">${t.genre} · ${t.price}</div>
      </div>
      <div class="bt-check${bookingPref[pref - 1] === id ? ' on' : ''}">✓</div>
    </div>`).join('');
}

function selectBookingTheme(pref, id) {
  bookingPref[pref - 1] = bookingPref[pref - 1] === id ? null : id;
  renderBookingPref(pref);
}

function submitBooking() {
  if (!bookingPref[0]) { showToast('1지망 테마를 선택해주세요.', 'err'); return; }
  closeSubpage('spBooking');
  showFinalConfirm(
    () => showToast('방켓팅 신청이 완료되었습니다!', 'ok'),
    '방켓팅 신청을 확정하시겠습니까?',
    '확인을 누르면 신청이 최종 완료됩니다.',
    '🎯'
  );
}

// ===== REGULAR (희망테마 신청) =====
function onPrefChange(n) {
  const val = document.getElementById('pref' + n).value;
  const box = document.getElementById('pi' + n);
  if (!val) { box.innerHTML = ''; return; }
  const t = THEMES[val];
  box.innerHTML = `<span class="pref-genre">${t.genre}</span><span class="pref-price">${t.price}</span>`;
}

function openRegApply() {
  [1, 2, 3].forEach(n => {
    document.getElementById('pref' + n).value = '';
    document.getElementById('pi' + n).innerHTML = '';
  });
  openModal('mRegApply');
}

function submitReg() {
  const p1 = document.getElementById('pref1').value;
  if (!p1) { showToast('1지망 테마를 선택해주세요.', 'err'); return; }
  closeModal('mRegApply');
  showFinalConfirm(() => showToast('희망테마 신청이 완료되었습니다!', 'ok'));
}

// ===== ASSIGN (ADMIN) =====
function openAssign() {
  const themeNames = Object.values(THEMES).map(t => t.name);
  const body = document.getElementById('assignBody');
  body.innerHTML = APPLICANTS.map((a, i) => `
    <div class="ap-row">
      <div class="ap-name">${a.name}</div>
      <div class="ap-prefs">1지망: ${a.p1}<br>2지망: ${a.p2}<br>3지망: ${a.p3}</div>
      <select class="ap-sel" id="assignSel${i}">
        <option value="">미배정</option>
        ${themeNames.map(n => `<option value="${n}">${n}</option>`).join('')}
      </select>
    </div>`).join('');
  openModal('mAssign');
}

function autoAssign() {
  const capacity = {};
  Object.values(THEMES).forEach(t => { capacity[t.name] = 6; });
  const assigned = {};
  Object.keys(capacity).forEach(k => { assigned[k] = 0; });
  const result = {};

  [1, 2, 3].forEach(pass => {
    APPLICANTS.forEach((a, i) => {
      if (result[i] !== undefined) return;
      const pref = pass === 1 ? a.p1 : pass === 2 ? a.p2 : a.p3;
      if (assigned[pref] < capacity[pref]) {
        result[i] = pref;
        assigned[pref]++;
      }
    });
  });

  APPLICANTS.forEach((_, i) => {
    const sel = document.getElementById('assignSel' + i);
    if (sel && result[i]) sel.value = result[i];
  });
  showToast('자동 배정이 완료되었습니다. 결과를 확인해주세요.', 'ok');
}

function confirmAssign() {
  showFinalConfirm(
    () => { closeModal('mAssign'); showToast('배정이 확정되었습니다.', 'ok'); },
    '배정을 확정하시겠습니까?',
    '확정 후에는 배정 결과가 부원에게 공개됩니다.',
    '📋'
  );
}

// ===== REVIEWS =====
function starsHtml(n) { return '★'.repeat(n) + '☆'.repeat(5 - n); }

function setReviewSort(sort) {
  reviewSort = sort;
  document.querySelectorAll('.rsort').forEach(b => b.classList.toggle('active', b.dataset.sort === sort));
  renderReviews();
}

function renderReviews() {
  const sorted = [...REVIEWS].sort((a, b) => {
    if (reviewSort === '별점순')  return b.rating - a.rating;
    if (reviewSort === '공포도순') return b.horror - a.horror;
    if (reviewSort === '난이도순') return b.difficulty - a.difficulty;
    return new Date(b.date) - new Date(a.date);
  });
  document.getElementById('reviewsList').innerHTML = sorted.map(r => `
    <div class="rev-card">
      <div class="rev-hdr"><div class="rev-theme">${r.theme}</div><div class="stars">${starsHtml(r.rating)}</div></div>
      <div class="rev-by">${r.user} · ${r.date.replace(/-/g,'.')} · ${r.cleared ? '탈출 성공' + (r.time ? ' (' + r.time + ')' : '') : '탈출 실패'}</div>
      <div class="rev-text">${r.content}</div>
      <div class="rev-tags">
        <span class="rev-tag">공포 ${'★'.repeat(r.horror)}</span>
        <span class="rev-tag">난이도 ${'★'.repeat(r.difficulty)}</span>
      </div>
    </div>`).join('');
}

// ===== FINAL CONFIRM =====
function showFinalConfirm(cb, title, body, icon) {
  pendingAction = cb;
  document.getElementById('confirmTitle').textContent = title || '신청을 확정하시겠습니까?';
  document.getElementById('confirmBody').textContent = body || '확인을 누르면 신청이 최종 완료됩니다.';
  document.getElementById('confirmIcon').textContent = icon || '✋';
  openModal('mFinalConfirm');
}

function doFinalConfirm() {
  closeModal('mFinalConfirm');
  if (pendingAction) { pendingAction(); pendingAction = null; }
}

// ===== REVIEW WRITE =====
function openReview() {
  rating = 0; clearedVal = null;
  renderStars();
  document.getElementById('btnOk').className = 'btn btn-ghost btn-sm';
  document.getElementById('btnFail').className = 'btn btn-ghost btn-sm';
  document.getElementById('btnOk').style.cssText = 'flex:1;';
  document.getElementById('btnFail').style.cssText = 'flex:1;';
  document.getElementById('timeGroup').style.display = 'block';
  openModal('mReview');
}

function setRating(n) { rating = n; renderStars(); }
function renderStars() {
  document.querySelectorAll('#starInp span').forEach((s, i) => s.classList.toggle('on', i < rating));
}

function setCleared(val) {
  clearedVal = val;
  const ok = document.getElementById('btnOk');
  const fail = document.getElementById('btnFail');
  if (val) {
    ok.style.cssText = 'background:var(--accent);color:#fff;flex:1;';
    fail.style.cssText = 'background:var(--card2);color:var(--muted);border:1px solid var(--border);flex:1;';
  } else {
    ok.style.cssText = 'background:var(--card2);color:var(--muted);border:1px solid var(--border);flex:1;';
    fail.style.cssText = 'background:var(--accent);color:#fff;flex:1;';
  }
  document.getElementById('timeGroup').style.display = val ? 'block' : 'none';
}

function submitReview() {
  if (rating === 0) { showToast('별점을 선택해주세요.', 'err'); return; }
  closeModal('mReview');
  showToast('후기가 등록되었습니다!', 'ok');
}

// ===== SHOP =====
function openShop() {
  document.getElementById('shopCoin').textContent = user.coin;
  document.getElementById('shopItems').innerHTML = SHOP_ITEMS.map(item => `
    <div class="shop-item">
      <div class="shop-icon">${item.icon}</div>
      <div class="shop-info">
        <div class="shop-name">${item.name}</div>
        <div class="shop-desc">${item.desc}</div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div class="shop-price">${item.price} C</div>
        <button class="btn btn-sm btn-secondary" style="margin-top:6px;" onclick="buyItem('${item.name}',${item.price})">구매</button>
      </div>
    </div>`).join('');
  openModal('mShop');
}

function buyItem(name, price) {
  if (user.coin < price) { showToast('코인이 부족합니다.', 'err'); return; }
  showFinalConfirm(() => {
    user.coin -= price;
    updateKirogi();
    document.getElementById('shopCoin').textContent = user.coin;
    showToast(name + ' 구매 완료!', 'ok');
  }, '구매하시겠습니까?', `${name} · ${price} 코인 사용`, '🛍️');
}

// ===== MY SUBPAGES =====
function openEditProfile() {
  document.getElementById('editAvt').textContent = user.name[0];
  document.getElementById('editName').value = user.name;
  openSubpage('spEditProfile');
}

function saveProfile() {
  const name = document.getElementById('editName').value.trim();
  if (!name) { showToast('이름을 입력해주세요.', 'err'); return; }
  user.name = name;
  updateMyPage();
  closeSubpage('spEditProfile');
  showToast('프로필이 저장되었습니다.', 'ok');
}

function openAttendance() {
  document.getElementById('attTotal').innerHTML = `${user.esc}<span style="font-size:13px;color:var(--muted);margin-left:2px;">회</span>`;
  document.getElementById('attThis').innerHTML = `${user.att}<span style="font-size:13px;color:var(--muted);margin-left:2px;">/ ${user.attMax}회</span>`;
  openSubpage('spAttendance');
}

function openMileage() {
  document.getElementById('mileTotal').innerHTML = `${user.mile}<span style="font-size:14px;color:var(--muted);margin-left:4px;">P</span>`;
  openSubpage('spMileage');
}

function openWarnings() {
  document.getElementById('warnTotal').innerHTML = `${user.warn}<span style="font-size:14px;color:var(--muted);margin-left:4px;">회</span>`;
  const list = document.getElementById('warnList');
  if (user.warn === 0) {
    list.innerHTML = '<div style="padding:48px 16px;text-align:center;color:var(--muted);font-size:14px;">경고 내역이 없습니다 😊</div>';
  } else {
    list.innerHTML = `
      <div class="warn-item">
        <div style="display:flex;align-items:center;margin-bottom:4px;">
          <span class="warn-reason">월별 출석 미달</span>
          <span class="warn-badge">경고 1회</span>
        </div>
        <div class="warn-meta">2026.04.30 · 발급: 김운영 운영진</div>
      </div>`;
  }
  openSubpage('spWarnings');
}

function openMyReviews() {
  const list = document.getElementById('myRevList');
  if (user.role === 'admin') {
    list.innerHTML = `
      <div class="rev-card"><div class="rev-hdr"><div class="rev-theme">미스터리 저택</div><div class="stars">★★★★★</div></div><div class="rev-by">3차 정기모임 · 2026.05.18 · 탈출 성공 (52분)</div><div class="rev-text">연출이 정말 훌륭했어요. 공포감도 적당하고 퍼즐도 창의적이었습니다.</div></div>
      <div class="rev-card"><div class="rev-hdr"><div class="rev-theme">우주 탈출</div><div class="stars">★★★★☆</div></div><div class="rev-by">2차 정기모임 · 2026.04.20 · 탈출 성공 (47분)</div><div class="rev-text">SF 분위기 연출이 좋았어요! 다만 마지막 퍼즐이 조금 어려웠습니다.</div></div>`;
  } else {
    list.innerHTML = `
      <div class="rev-card"><div class="rev-hdr"><div class="rev-theme">좀비 아포칼립스</div><div class="stars">★★★★☆</div></div><div class="rev-by">3차 정기모임 · 2026.05.19 · 탈출 실패</div><div class="rev-text">분위기가 최고였어요. 좀비 연기에 깜짝 놀랐지만 재밌었습니다!</div></div>
      <div class="rev-card"><div class="rev-hdr"><div class="rev-theme">마법사의 탑</div><div class="stars">★★★★★</div></div><div class="rev-by">2차 정기모임 · 2026.04.21 · 탈출 성공 (55분)</div><div class="rev-text">힌트 없이 탈출 성공! 팀워크가 정말 좋았어요.</div></div>
      <div style="padding:16px;text-align:center;color:var(--muted);font-size:13px;">총 ${user.rev}개의 후기를 작성했습니다</div>`;
  }
  openSubpage('spMyReviews');
}

// ===== NOTICE WRITE (ADMIN) =====
function openCreateNotice() {
  document.getElementById('noticeTitle').value = '';
  document.getElementById('noticeBody').value = '';
  openModal('mCreateNotice');
}

function submitNotice() {
  const title = document.getElementById('noticeTitle').value.trim();
  const body = document.getElementById('noticeBody').value.trim();
  if (!title) { showToast('제목을 입력해주세요.', 'err'); return; }
  if (!body)  { showToast('내용을 입력해주세요.', 'err'); return; }
  closeModal('mCreateNotice');
  showFinalConfirm(() => showToast('공지가 등록되었습니다.', 'ok'), '업로드하시겠습니까?', '확인을 누르면 공지가 최종 등록됩니다.', '📢');
}

// ===== RANKING SUBPAGE =====
function openRanking() {
  document.getElementById('rankingBody').innerHTML = RANKINGS.map(r => `
    <div class="rank-card" style="margin-bottom:10px;">
      <div class="rank-num" style="font-size:${r.rank <= 3 ? '24px' : '16px'};width:36px;">${r.icon}</div>
      <div class="rank-info">
        <div class="rank-name">${r.name}</div>
        <div class="rank-sub">리뷰 ${r.reviews}개 · ${r.genre}</div>
      </div>
      <div class="rank-rating">${r.rating}</div>
    </div>`).join('');
  document.getElementById('spRanking').classList.add('open');
}

// ===== MEETING HISTORY SUBPAGE =====
const FILTER_GENS = ['전체','1기','2기','3기','4기'];

function openMeetingHistory() {
  meetingFilter = '전체';
  renderMeetingFilterTabs();
  renderMeetingList();
  document.getElementById('spMeetingHistory').classList.add('open');
}

function renderMeetingFilterTabs() {
  document.getElementById('meetingFilterTabs').innerHTML = FILTER_GENS.map(g =>
    `<button class="ftab${g === meetingFilter ? ' active' : ''}" onclick="setMeetingFilter('${g}')">${g}</button>`
  ).join('');
}

function setMeetingFilter(gen) {
  meetingFilter = gen;
  renderMeetingFilterTabs();
  renderMeetingList();
}

function renderMeetingList() {
  const filtered = meetingFilter === '전체' ? MEETINGS : MEETINGS.filter(m => `${m.gen}기` === meetingFilter);
  const body = document.getElementById('meetingHistoryBody');
  if (filtered.length === 0) {
    body.innerHTML = '<div style="padding:48px;text-align:center;color:var(--muted);">해당 기수의 모임 기록이 없습니다.</div>';
    return;
  }
  body.innerHTML = filtered.map(m => `
    <div class="rec-item" onclick="openMeetingDetail('${m.id}')" style="cursor:pointer;margin-bottom:8px;">
      <div class="rec-hdr">
        <div class="rec-title">${m.title}</div>
        <span class="badge ${m.type === '정기' ? 'ba' : 'bp'}">${m.type}</span>
      </div>
      <div class="rec-meta">📍 ${m.area} · 📅 ${m.date} · 👥 ${m.attendees}명 참여</div>
    </div>`).join('');
}

function openMeetingDetail(id) {
  const m = MEETINGS.find(x => x.id === id);
  if (!m) return;
  document.getElementById('meetingDetailTitle').textContent = m.title;
  document.getElementById('meetingDetailBody').innerHTML = `
    <div class="md-section"><div class="md-label">분류</div><div class="md-value"><span class="badge ${m.type === '정기' ? 'ba' : 'bp'}">${m.type}모임</span></div></div>
    <div class="md-section"><div class="md-label">일시 / 장소</div><div class="md-value">${m.date}</div><div style="font-size:13px;color:var(--muted);margin-top:3px;">📍 ${m.area}</div></div>
    <div class="md-section"><div class="md-label">진행 테마</div><div class="tag-row" style="margin-top:0;">${m.themes.map(t => `<span class="badge bg">${t}</span>`).join('')}</div></div>
    <div class="md-section"><div class="md-label">참여 인원</div><div class="md-value">${m.attendees}명</div></div>
    <div class="md-section"><div class="md-label">뒷풀이 인원</div><div class="md-value">${m.afterParty > 0 ? m.afterParty + '명' : '뒷풀이 없음'}</div></div>`;
  document.getElementById('spMeetingDetail').classList.add('open');
}

// ===== MEMBER MANAGE (ADMIN) =====
function openMemberManage() {
  document.getElementById('memberCount').textContent = MEMBERS.length;
  document.getElementById('memberListBody').innerHTML = MEMBERS.map((m, i) => `
    <div class="mem-item" onclick="openMemberAction(${i})">
      <div class="mem-av" style="background:${m.warn >= 3 ? 'var(--accent)' : m.warn > 0 ? 'var(--warning)' : 'var(--text)'};">${m.name[0]}</div>
      <div class="mem-info">
        <div class="mem-name">${m.name}</div>
        <div class="mem-meta">${m.gen}기 · 출석 ${m.att}회 · 마일리지 ${m.mile}P</div>
      </div>
      ${m.warn > 0 ? `<span style="font-size:12px;font-weight:700;color:var(--accent);">경고 ${m.warn}회</span>` : ''}
    </div>`).join('');
  document.getElementById('spMemberManage').classList.add('open');
}

function openMemberAction(idx) {
  selectedMemberIdx = idx;
  const m = MEMBERS[idx];
  tempAtt = m.att;
  document.getElementById('maName').textContent = m.name;
  document.getElementById('maMeta').textContent = `${m.gen}기 · 출석 ${m.att}회 · 경고 ${m.warn}회 · 마일리지 ${m.mile}P`;
  document.getElementById('maAtt').textContent = m.att;
  document.getElementById('maMileInput').value = '';
  document.getElementById('maWarnReason').value = '';
  openModal('mMemberAction');
}

function giveWarn() {
  const reason = document.getElementById('maWarnReason').value;
  if (!reason) { showToast('경고 사유를 선택해주세요.', 'err'); return; }
  const m = MEMBERS[selectedMemberIdx];
  const isNoshow = reason === '방탈출 노쇼';
  showFinalConfirm(() => {
    m.warn += isNoshow ? 2 : 1;
    closeModal('mMemberAction');
    showToast(`${m.name}에게 경고 ${isNoshow ? 2 : 1}회가 부여되었습니다.`, 'ok');
    openMemberManage();
  }, '경고를 부여하시겠습니까?', `${m.name} · ${reason} · 경고 ${isNoshow ? 2 : 1}회`, '⚠️');
}

function changeAtt(delta) {
  tempAtt = Math.max(0, tempAtt + delta);
  document.getElementById('maAtt').textContent = tempAtt;
}

function saveAtt() {
  const m = MEMBERS[selectedMemberIdx];
  m.att = tempAtt;
  document.getElementById('maMeta').textContent = `${m.gen}기 · 출석 ${m.att}회 · 경고 ${m.warn}회 · 마일리지 ${m.mile}P`;
  showToast(`${m.name} 출석이 ${m.att}회로 수정되었습니다.`, 'ok');
}

function saveMile() {
  const val = parseInt(document.getElementById('maMileInput').value);
  if (isNaN(val) || val === 0) { showToast('마일리지 값을 입력해주세요.', 'err'); return; }
  const m = MEMBERS[selectedMemberIdx];
  m.mile = Math.max(0, m.mile + val);
  document.getElementById('maMeta').textContent = `${m.gen}기 · 출석 ${m.att}회 · 경고 ${m.warn}회 · 마일리지 ${m.mile}P`;
  showToast(`${m.name} 마일리지가 ${m.mile}P로 변경되었습니다.`, 'ok');
  document.getElementById('maMileInput').value = '';
}

// ===== MODAL / SUBPAGE HELPERS =====
function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function bgClose(e, id) { if (e.target === document.getElementById(id)) closeModal(id); }

function openSubpage(id) {
  if (id === 'spRanking')        { openRanking(); return; }
  if (id === 'spMeetingHistory') { openMeetingHistory(); return; }
  if (id === 'spMemberManage')   { openMemberManage(); return; }
  document.getElementById(id).classList.add('open');
}
function closeSubpage(id) { document.getElementById(id).classList.remove('open'); }

// ===== TOAST =====
let toastTimer;
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== INIT =====
showPg('login');
