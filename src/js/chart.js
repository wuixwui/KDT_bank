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
