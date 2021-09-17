// ---------- 시계 ----------
// 핸드폰
const currentTime = document.querySelector('.current-time');
let currentHour = currentTime.querySelector('.hour');
let currentMinute = currentTime.querySelector('.minute');

setInterval(() => {
  const date = new Date();
  date.getHours() > 12
    ? (currentHour.textContent = String(date.getHours() - 12).padStart(2, 0))
    : (currentHour.textContent = String(date.getHours()).padStart(2, 0));
  currentMinute.textContent = String(date.getMinutes()).padStart(2, 0);
}, 1000);
