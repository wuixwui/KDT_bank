// // ---------- chart -----------
// const bankDataRequestURL = 'https://syoon0624.github.io/json/test.json';

// const BankDataRequest = new XMLHttpRequest();
// // URL로 서버 데이타(json) 연결하기 - response 생성?
// BankDataRequest.open('GET', bankDataRequestURL);
// BankDataRequest.responseType = 'json';
// // 서버에서 response 요청을 보냄
// BankDataRequest.send();

// // onload를 통해 응답이 성공적으로 돌아왔을 때 작동할 코드 작성
// BankDataRequest.onload = function () {
//   const BankList = BankDataRequest.response; // BankDataRequest.response는 서버의 json 파일 객체

//   createDayList(BankList['bankList'].reverse());
// };

// // ----------- 데이터 조작 -------------
// // 날짜 생성
// function isToday() {
//   const date = new Date();
//   // 오늘 날짜 bankList의 형태에 맞춰서 반환
//   return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//     2,
//     0
//   )}-${String(date.getDate()).padStart(2, 0)}`;
// }

// //리스트 컨테이너
// const dayListContainer = User1.querySelector('.day-container .swiper-slide');
// console.log(dayListContainer);
// // dayListContainer 안에 HTML 요소 생성 함수
// let day = 0;
// function createDayEls() {
//   dayListContainer.innerHTML += `
//     <section class="day">
//       <header class="day__title">
//         <h3>${day}</h3>
//         <p class="day__amount sub-text">
//           <em class="day__sum">0000</em>원 지출
//         </p>
//       </header>
//       <ol></ol>
//     </section>
//   `;
// }

// // 날짜마다 HTML 요소 추가
// function createDayList(daySpending) {
//   today = isToday();
//   day = daySpending[0]['date'];

//   daySpending.forEach((spending) => {
//     if (parseInt(today.slice(5, 7)) < parseInt(spending['date'].slice(5, 7))) {
//       day = spending['date'];
//       createDayEls();
//       console.log('hi');
//     }
//   });
// }
// // function createDayList(daySpending) {
// //   const day = isToday();
// //   let today = daySpending[0]['date'];
// //   console.log(today);

// //   daySpending.forEach((element, i) => {});
// // }
