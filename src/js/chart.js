// ---------- chart -----------
const bankDataRequestURL = 'https://syoon0624.github.io/json/test.json';

const BankDataRequest = new XMLHttpRequest();
// URL로 서버 데이타(json) 연결하기 - response 생성?
BankDataRequest.open('GET', bankDataRequestURL);
BankDataRequest.responseType = 'json';
// 서버에서 response 요청을 보냄
BankDataRequest.send();

// onload를 통해 응답이 성공적으로 돌아왔을 때 작동할 코드 작성
BankDataRequest.onload = function () {
  // BankDataRequest.response는 서버의 json 파일 객체에서 banklist의 배열을 가져옴
  const BankList = BankDataRequest.response['bankList'];

  //보유 금액 및 지출 금액, 남은 금액
  const spendingAmountNum = spendingAmount(BankList);
  const havingAmountNum = havingAmount(BankList);
  const remainingAmountNum = saveStandardAmount - spendingAmountNum;

  // 남은 기간과 금액 표시
  cardRemainAmount.innerText = remainingAmountNum.toLocaleString();
  cardRemainDay.innerText = isLastday() - isToday() + 1;

  // 날짜별 지출 리스트 생성
  createDay(BankList);

  // slide bar 표시
  slideBarSet(havingAmountNum);
  spendingSlideBarSet(spendingAmountNum);
  setStandardAmount();
};

// ----------- 데이터 조작 -------------

//리스트 컨테이너
const dayListSlide = User1.querySelector('.day-container .swiper-slide');

// 날짜마다 HTML 요소 추가
function createDay(daySpending) {
  const thisDays = untilToday(daySpending);
  const firstday = isFirstday();

  for (let i = isToday(); i >= firstday; i -= 1) {
    createDayEls(i, thisDays);
  }

  // 데이터 동적 생성 후 swiper를 생성해서 wrapper가 slide크기로 감쌀 수 있도록 함
  createSwiper();
}

// ---------- 요소 추가 ----------
// dayListSlide 안에 HTML 요소 생성 함수
function createDayEls(days, thisDays) {
  let date = isStringToday(days);
  // 당일 날자를 찾아서 배열에 담는다.
  const detailByday = thisDays.filter((item) => item.date === date);

  // 아무런 지출 및 수입이 없을 경우 아무것도 하지 않는다.
  if (detailByday.length === 0) {
    return;
  }

  // 요소를 추가한다.
  dayListSlide.innerHTML += `
      <section class="day">
        <header class="day__title">
          <h3>${date}</h3>
          <span class="day__amount sub-text">
            <em class="day__sum"></em>원 지출
          </span>
        </header>
        <ol></ol>
      </section>
    `;

  const spendingList = dayListSlide.querySelectorAll('ol');
  console.log(spendingList);
  const spendingSum = dayListSlide.querySelectorAll('.day__sum');
  console.log(spendingSum);

  //당일 ol 리스트에 지출 및 수입금액의 리스트 추가
  detailByday.forEach((item) => {
    spendingList[spendingList.length - 1].innerHTML += createDayListItem(item);
  });

  // 당일 총 지출 금액 계산
  spendingSum[spendingSum.length - 1].innerText =
    spendingAmount(detailByday).toLocaleString();
}

// li 생성
function createDayListItem(spending) {
  return `
      <li class="day__spendings">
        <p class="name">${spending.history}</p>
        ${
          // 들어오는 돈과 나가는 돈을 구분해서 추가
          spending.income === 'out'
            ? `<span class="amount minus">${spending.price.toLocaleString()}</span>`
            : `<span class="amount plus">+${spending.price.toLocaleString()}</span>`
        }
      </li>
  `;
}

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
