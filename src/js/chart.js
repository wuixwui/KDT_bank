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

  // slide bar와 카드에 데이터 추가
  slideBarAndCardDataChange(BankList);

  // 날짜별 지출 리스트 생성
  createDay(BankList);
};

// ----------- 데이터 조작 -------------

//리스트 컨테이너
const dayListSlide = User1.querySelector('.day-container .swiper-slide');

//slide bar & card 조절
function slideBarAndCardDataChange(daySpending) {
  const today = untilToday(daySpending);

  //보유 금액 및 지출 금액, 남은 금액
  const spendingAmountNum = spendingAmount(today);
  const havingAmountNum = havingAmount(today);
  const remainingAmountNum = saveStandardAmount - spendingAmountNum;

  // 남은 기간과 금액 표시
  cardRemainAmount.innerText = remainingAmountNum.toLocaleString();
  cardRemainDay.innerText = isLastday() - isToday() + 1;
  // 사용한 금액 표시
  cardSpendingAmount.innerText = spendingAmountNum.toLocaleString();

  // slide bar 표시
  slideBarSet(havingAmountNum);
  spendingSlideBarSet(spendingAmountNum);
  setStandardAmount();
}

// 날짜마다 HTML 요소 추가
function createDay(daySpending) {
  const thisDays = untilToday(daySpending);
  const firstday = isFirstday();

  for (let i = isToday(); i >= firstday; i -= 1) {
    createDayEls(i, thisDays);
  }

  //chart 생성
  createBarChart(dataList);
  monthSpendingPattern(thisDays);
  // 데이터 동적 생성 후 swiper를 생성해서 wrapper가 slide크기로 감쌀 수 있도록 함
  createSwiper();
}

// ---------- 요소 추가 ----------
// 일일 지출날짜와 지출 금액 리스트
const dataList = [];

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
  const spendingSum = dayListSlide.querySelectorAll('.day__sum');

  //당일 ol 리스트에 지출 및 수입금액의 리스트 추가
  detailByday.forEach((item) => {
    spendingList[spendingList.length - 1].innerHTML += createDayListItem(item);
  });

  const spendingAmountToday = spendingAmount(detailByday);
  // 당일 총 지출 금액 계산
  spendingSum[spendingSum.length - 1].innerText =
    spendingAmountToday.toLocaleString();

  // 하루 지출 차트 데이터 생성
  dataList.push({
    date: String(days).slice(6, 8),
    spending: spendingAmountToday,
  });
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

// 바 차트 생성 함수
function createBarChart(dataList) {
  const labels = [];
  const datas = [];

  const reversedDataList = dataList.reverse();
  reversedDataList.forEach((item) => {
    labels.push(item.date);
    datas.push(item.spending);
  });

  // Bar chart Data
  const data = {
    labels: labels,
    datasets: [
      {
        label: '일간 지출 내역',
        type: 'bar',
        backgroundColor: mint,
        borderColor: mint,
        borderWidth: 15,
        borderRadius: 8,
        borderSkipped: 'start',
        data: datas,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          bodySpacing: 3,
          padding: 15,
          displayColors: false,
        },
      },
    },
  };

  let myChart = new Chart(document.getElementById('myBarChart'), config);
  return myChart;
}

// 월 지출 패턴 생성 함수
function monthSpendingPattern(thisDays) {
  // 해당 월 표시
  const month = User1.querySelector('.month-pattern .month');
  month.textContent = thisDays[0].date.slice(5, 7);

  // 카테고리별 지출 금액 객체 리스트
  const classifyDataList = [
    {
      classify: 'eatout',
      price: 0,
      color: eatout,
      name: '외식비',
      image: './src/images/spending_icon/food.svg',
    },
    {
      classify: 'health',
      price: 0,
      color: health,
      name: '건강관리비',
      image: './src/images/spending_icon/health.svg',
    },
    {
      classify: 'shopping',
      price: 0,
      color: shopping,
      name: '상점',
      image: './src/images/spending_icon/shop.svg',
    },
    {
      classify: 'mart',
      price: 0,
      color: mart,
      name: '장보기',
      image: './src/images/spending_icon/basket.svg',
    },
    {
      classify: 'oiling',
      price: 0,
      color: oiling,
      name: '주유비',
      image: './src/images/spending_icon/oiling.svg',
    },
  ];

  // 카테고리별로 지출 금액 합산
  thisDays.forEach((item) => {
    if (item.income === 'out') {
      classifyDataList.forEach((category) => {
        if (item.classify === category.classify) {
          category.price += item.price;
        }
      });
    }
  });

  //많이 사용한 순서대로 정렬
  const sortedClassifyDataList = classifyDataList.sort(
    (a, b) => b.price - a.price
  );
  createMonthList(sortedClassifyDataList);

  // 월별 카테고리 데이터 나누기
  const labels = [];
  const colors = [];
  const datas = [];

  sortedClassifyDataList.forEach((item) => {
    if (item.price) {
      labels.push(item.classify);
      datas.push(item.price);
      colors.push(item.color);
    }
  });

  // Doughnut chart Data
  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: colors,
        data: datas,
      },
    ],
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          bodySpacing: 3,
          padding: 15,
        },
      },
    },
  };

  let myChart = new Chart(document.getElementById('myDoughnutChart'), config);
  return myChart;
}

// 월 카테고리 별 지출 리스트 생성
function createMonthList(classifyDataList) {
  const monthContainer = User1.querySelector('.month-pattern ul');

  classifyDataList.forEach((item) => {
    monthContainer.innerHTML += `
      <li class="category">
        <div class="category__img">
          <img
            src=${item.image}
            alt=${item.name}
          />
        </div>
        <span class="category__name">${item.name}</span>
        <span class="category__amount">
          <em class="category-sum">${item.price.toLocaleString()}</em>원
        </span>
      </li>`;
  });
}
