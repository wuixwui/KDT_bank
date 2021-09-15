// ---------- BTN ----------
// 지출 관리 버튼
const spendingManage = document.querySelector('.manage-page');
const spendingManageOpenBtn = document.querySelector('.btn--spending');
const spendingManageCloseBtn = document.querySelector('.manage-page > button');

spendingManageOpenBtn.addEventListener('click', () => {
  if (spendingManage.classList.contains('close')) {
    spendingManage.classList.remove('close');
  }
});

spendingManageCloseBtn.addEventListener('click', () => {
  if (!spendingManage.classList.contains('close')) {
    spendingManage.classList.add('close');
  }
});

// 상세 지출 페이지 버튼
const spendingDetail = document.querySelector('.main-page .details');
const spendingDetailToggleBtn = document.querySelector(
  '.main-page .details > button'
);

spendingDetailToggleBtn.addEventListener('click', () => {
  spendingDetail.classList.toggle('up');
});

// ---------- Swiper ----------
// user page swiper
const userSwiper = new Swiper('.app', {
  grabCursor: true,
  threshold: 150,
  edgeSwipeThreshold: 30,
  loop: true,
  effect: 'creative',
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ['-20%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
});

//slider
// piggy bank swiper
const piggyBankSliderSwiper = new Swiper('.piggy-bank', {
  nested: true,
  direction: 'horizontal',
  slidesPerView: 'auto',
  freeMode: true,
  mousewheel: true,
});

//vertical slider
const verticalSliderSwiper = new Swiper('.vertical', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  mousewheel: true,
});
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
  const BankList = BankDataRequest.response; // BankDataRequest.response는 서버의 json 파일 객체
  console.log(BankList);
};

//데이터 조작
