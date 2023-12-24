//싱글쓰레드 ->  한줄에 한개씩만 실행된다
// 동기 -> 한가지가 끝나야 다음 가능
// 결론적으로 느림 (blocking상태)
// 그래서 비동기 프로그램이 나옴
// 비동기 프로그래밍
/*
setTimeout(() => {
  //<= 결국 애는 Web api임  , 콜백함수 ()=> 를  실행함
  // 비동기 함수 안에 콜백 함수
  console.log("1");
}, 3000); // 3초
console.log("2");

//싱글 쓰레드임에 불과하고 비동기가 가능한 이유에 대해
// Web API 환경에서 비동기 함수가 작동됨 -> 멀티쓰레드 방식의 Web API

//비동기 콜백

 *비동기 콜백함수 예시

function main(callback) {
  callback(); // 필요할 때 인자를 가져와서 사용
}

main(() => {}); // 소괄호 안에 있는 함수가 콜백함수임, 즉 콜백함수는 다른 함수의 인자로 전달되는 함수
 */
// function getData(callback) {
//   setTimeout(() => {
//     console.log("서버에서 데이터를 받아왔어요");
//     callback({
//       name: "별코딩",
//     });
//   }, 2000);
// }
// getData((data) => {
//   console.log(data.name);
// }); // 비동기적으로 처리
//1. 로그인
function login(username, callback) {
  setTimeout(() => {
    callback(username);
  }, 1000);
}
// 2. 장바구니에 넣기
function addToCart(product, callback) {
  setTimeout(() => {
    callback(product);
  }, 1000);
}
// addToCart("감자", (product) => {
//   console.log(`${product}를 장바구니에 넣었습니다.`);
// });

// 3. 결제하기
function makePayment(cardNumber, payment, callback) {
  setTimeout(() => {
    callback(cardNumber, payment);
  }, 1000);
}
// makePayment("33333333333333", "신한카드", (cardNumber, payment) => {
//   console.log(`${payment}의 넘버는${cardNumber.slice(0, 3)}입니다.`);
// });

//합쳐서 해보기
// 이게 바로 콜백지옥
login("안준표", (username) => {
  console.log(`${username}님 안녕하세요`);
  addToCart("감자", (product) => {
    console.log(`${product}를 장바구니에 넣었습니다.`);
    makePayment("0000000000", "신한카드", (cardNumber, payment) => {
      console.log(
        `카드넘버는 ${cardNumber.slice(
          0,
          4
        )}이며 ${payment}로 결제 완료 하였습니다.`
      );
    });
  });
});
// 해결책 -> Promise
