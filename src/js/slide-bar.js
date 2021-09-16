// Slide bar

const spendingSlideBar = User1.querySelectorAll('.slide-bar[name="spending"]');
// 사용한 금액 입력
spendingSlideBar.forEach((spending) => {
  spending.value = 1240000; // 사용한 금액
});

// 기준 금액 입력
const standardSlideBar = User1.querySelectorAll('.slide-bar[name="standard"]');
const AmountText = User1.querySelectorAll('.standard-amount');

let saveStandardAmount = localStorage.getItem('user1');

if (saveStandardAmount === null) {
  saveStandardAmount = 0;
} else {
  setStandardAmount();
}

// 사용자 입력 금액 저장
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
