// Slide bar
const slideBar = User1.querySelectorAll('.slide-bar');

// 보유 금액 입력
function slideBarSet(havingAmountNum) {
  slideBar.forEach((spending) => {
    spending.max = havingAmountNum; // 사용한 금액
  });
}

const spendingSlideBar = User1.querySelectorAll('.slide-bar[name="spending"]');
// 사용한 금액 입력
function spendingSlideBarSet(spendingAmountNum) {
  spendingSlideBar.forEach((spending) => {
    spending.value = spendingAmountNum; // 사용한 금액
  });
}

// 기준 금액 입력

const standardSlideBar = User1.querySelectorAll('.slide-bar[name="standard"]');
const AmountText = User1.querySelectorAll('.standard-amount');

let saveStandardAmount = localStorage.getItem('user1');

if (saveStandardAmount === null) {
  localStorage.setItem('user1', 0);
} else {
  setStandardAmount();
}

// 사용자 입력할 때마다 금액 저장 및 화면에 표시
function rangeSlide(value) {
  localStorage.setItem('user1', value);
  setStandardAmount();
}

// 사용자 입력 금액 표시
function setStandardAmount() {
  standardSlideBar.forEach((standard, i) => {
    saveStandardAmount = parseInt(localStorage.getItem('user1'));
    standard.value = saveStandardAmount;

    AmountText[i].textContent = saveStandardAmount.toLocaleString();
  });
}
