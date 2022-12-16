# 클로저(Closure)


## 클로저란?
js 언어만의 고유한 개념은 아님.
## 정의
  - 내부 함수와 내부 함수가 정의된 참조환경을 의미한다.
  - 외부의 변수와 내부의 함수가 끊기지 않고 연결고리가 계속 이어져 있는 것.


```js
// [1] : 함수를 실행하여 리턴
// -> 바깥쪽에 있는 함수의 변수를 내부 함수가 참조.
const externalFun = () => {
  let number = 65;

  let internalFun = () => {
    let char_ = String.fromCharCode(number);
    console.log(char_, number++); // internalFun 내부에서는 number가 없으므로 상위로 올라가 number을 찾음.
  };

  internalFun(); // [1] 함수를 실행했다.
};

externalFun();
externalFun();
externalFun();
// 의도한 예상 결과값) A 65, B 66, C 67
// 실제 결과값) A 65, A 65, A 65
console.log('---------------');

// [2] : 실행한 결과값을 반환
const externalFun2 = () => {
  let number = 65;

  let internalFun = () => {
    let char_ = String.fromCharCode(number);
    return `${char_} : ${number++}`; // (*참고, 함수형 프밍에서는 return을 해주는 것이 좋다.)
  };

  return internalFun(); // [2] 실행한 결과값을 반환한다.
};

console.log(externalFun2());
console.log(externalFun2());
console.log(externalFun2()); // 계속 재실행되어 동일한 결과값을 반환한다.
console.log('---------------');

// [3] : 함수 자체를 반환하는 클로저
// -> 함수의 종료가 깔끔하게 끝나지 않고 계속 연결고리가 남은 상태.
// -> 결론적으로, 연결고리가 계속 남을 수 있게 함수 자체를 리턴하고, 그 함수를 받은 변수(out2)를 재실행한다.
const out = function () {
  let number = 65;

  let internalFun = function () {
    let char_ = String.fromCharCode(number);
    return `${char_} : ${number++}`;
  };

  return internalFun;
  // [3] 함수 internalFun를 반환함으로써 외부 변수 number를 계속해서 참조하고 있다.
  //     number는 가비지컬렉터의 수거 대상에서 제외됨.
};

const out2 = out(); // 함수를 반환 받아 변수에 할당했다. number의 참조는 끊기지 않고 유지가 되어 아래와 같은 결과가 나온다.
console.log(out2()); // A : 65
console.log(out2()); // B : 66
console.log(out2()); // C : 67
```
