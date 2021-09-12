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
console.log(spendingManage, spendingManageCloseBtn, spendingManageOpenBtn);
