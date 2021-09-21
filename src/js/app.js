// ----------- USER -----------
const User1 = document.querySelector('.user1');

// ----------- Color -----------
const mint = 'rgb(56, 201, 118)';

const eatout = 'rgb(255, 75, 62)';
const health = 'rgb(245, 143, 41)';
const shopping = 'rgb(155, 197, 61)';
const mart = 'rgb(35, 87, 137)';
const oiling = 'rgb(219, 48, 105)';

// ----------- CARD -----------
const cardRemainDay = User1.querySelector('.remaining-day');
const cardRemainAmount = User1.querySelector('.remaining-amount');
const cardSpendingAmount = User1.querySelector('.spending-amount');

// ----------- 날짜 ------------

// (00000000)를 (0000-00-00)형태의 문자열로 변환
function isStringToday(date) {
  // 오늘 날짜 bankList의 형태에 맞춰서 반환
  return `${String(date).slice(0, 4)}-${String(date).slice(4, 6)}-${String(
    date
  ).slice(6, 8)}`;
}

// 당일 날짜 생성
function isToday() {
  const date = new Date();
  // 오늘 날짜 bankList의 형태에 맞춰서 반환
  return Number(
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, 0)}${String(
      date.getDate()
    ).padStart(2, 0)}`
  );
}
// 달의 마지막 날짜
function isLastday() {
  const lastday31 = [1, 3, 5, 7, 8, 10, 12];
  const lastday30 = [4, 6, 9, 11];
  const lastday28 = [2];

  const today = isToday();

  const lastday = lastday31.includes(parseInt(String(today).slice(4, 6)))
    ? parseInt(String(today).slice(0, 6) + '31')
    : lastday30.includes(parseInt(String(today).slice(4, 6)))
    ? parseInt(String(today).slice(0, 6) + '30')
    : lastday28.includes(parseInt(String(today).slice(4, 6)))
    ? parseInt(String(today).slice(0, 6) + '28')
    : 'no';

  return lastday;
}

// 달의 처음 날짜
function isFirstday() {
  const today = isToday();

  const firstday = parseInt(String(today).slice(0, 6) + '01');
  return firstday;
}

// 오늘 이전까지의 날짜를 최신순으로 정렬한 배열 반환
function untilToday(daySpending) {
  const today = isToday();

  const untilToday = daySpending.filter((spending) => {
    // 현재 달 이전 자료까지만 표시
    if (
      parseInt(String(today).slice(4, 6)) ===
      parseInt(spending.date.slice(5, 7))
    ) {
      // 현재 달의 오늘 날짜 이전 자료까지만 표시
      if (
        parseInt(String(today).slice(6, 8)) >=
        parseInt(spending.date.slice(8, 10))
      ) {
        return spending;
      }
    }
  });

  // 오늘 이전 날짜를 최신순으로 담은 배열 반환
  return untilToday.reverse();
}
// ----------- 금액 -------------
// 총 사용 금액
function spendingAmount(daySpending) {
  const spendingAmount = untilToday(daySpending).reduce((acc, cur) => {
    const income = cur.income;
    const price = parseInt(cur.price);

    return income === 'out' ? (acc += price) : (acc += 0);
  }, 0);

  return spendingAmount;
}

// 총 보유 금액
function havingAmount(daySpending) {
  const havingAmount = untilToday(daySpending).reduce((acc, cur) => {
    const income = cur.income;
    const price = parseInt(cur.price);

    return income === 'in' ? (acc += price) : (acc += 0);
  }, 0);

  return havingAmount;
}

// ---------- BTN ----------
// 지출 관리 버튼
const spendingManage = document.querySelectorAll('.manage-page');
const spendingManageOpenBtn = document.querySelectorAll('.btn--spending');
const spendingManageCloseBtn = document.querySelectorAll(
  '.manage-page > button'
);
spendingManage.forEach((user, i) => {
  spendingManageOpenBtn[i].addEventListener('click', () => {
    if (user.classList.contains('close')) {
      user.classList.remove('close');
    }
  });
  spendingManageCloseBtn[i].addEventListener('click', () => {
    if (!user.classList.contains('close')) {
      user.classList.add('close');
    }
  });
});

// 상세 지출 페이지 높이
const cardContainer = document.querySelectorAll('.main-page .card-container');
const spendingDetail = document.querySelectorAll('.main-page .details');

// 광고의 유무에 따라 기본 디테일 위치가 달라짐.
spendingDetail.forEach((detail, i) => {
  detail.style.top = cardContainer[i].clientHeight;
});

// 상세 지출 페이지 버튼
const spendingDetailToggleBtn = document.querySelectorAll(
  '.main-page .details > button'
);
// 광고의 유무에 따라서 디테일 창 올라오는 높이가 달라짐
spendingDetailToggleBtn.forEach((detail, i) => {
  detail.addEventListener('click', () => {
    if (!detail.parentNode.style.transform) {
      detail.parentNode.style.transform = `translateY(-${cardContainer[i].clientHeight}px)`;
    } else {
      detail.parentNode.style.removeProperty('transform');
    }
  });
});
