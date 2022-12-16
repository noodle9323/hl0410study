# 커링 (Currying)

## 커링이란?
`여러 개의 인자를 가지는 함수`를 `단일 인자를 갖는 함수들의 계층 구조`로 바꾸는 것.  

쉽게 말해, 단일 일자를 받는 함수들을 쭉 연결시킨 것.  
-> 많아지면 메모리 문제가 발생할 수 있으므로 장/단점을 고려해야 한다.

- `함수를 리턴`한다. (선수지식: 클로저, 1급 객체 함수, 익명 함수)
- 코드 작성 시, 계층 구조로 계속 들어가다 보면 메모리적으로나 콜백지옥과 같은 문제가 있을 수 있는데, 이를 `커링`으로 어느 정도 해소할 수 있다.


## 값은 언제 반환?
  
1. 함수가 필요로 하는 인자의 갯수만큼 충족되지 않았다면  
  --> 계속 함수를 반환. // [Function (anonymous)]

2. 만약, 함수가 필요로 한는 인자의 갯수를 모두 충족시켰다면   
  --> 그때 최종적인 값 반환.
 

```js
// [1] 기존 함수 
// --> 인자를 2개 받아서 더하는 함수.

function sum1(x, y) {
  return x + y;
}
console.log(sum1(3, 4));

// [2] 커링 함수 
// --> 단일 일자만 받아서 처리.

function sum(x) {
  // 함수 자체를 리턴.
  return function (y) {
    return x + y;
  };
}
console.log(sum(2)(6));
```

## 커링 (Currying) 
### - ES6 Arrow Function
인자를 3개 받아서 모두 더하는 기존 함수를 커링 함수로 바꿔보자.

```js 
// [1] : 기존 함수
function sum2(x, y, z) {
  return x + y + z;
}

// [2] : 커링 함수
function sum3(x) {
  return function (y) {
    return function (z) {
      return x + y + z;
    };
  };
}
// console.log(sum3(5)(6)(7));
const sum3_1 = sum3(5);
const sum3_2 = sum3_1(6);
const sum3_3 = sum3_2(7);
console.log(sum3_3);

// [3] : 커링 Arrow Func
const sum4 = a => b => c => a + b + c;
console.log(sum4(1)(2)(3));
```

## 커링 (Currying) 
### - 문자열
동물에게 먹이를 주는 feed() 함수가 있다.  
feed() 함수는 인자를 두 개 받는데, 첫 번째 인자로는 동물의 이름, 두 번째 인자로는 먹이 종류를 받는다.  

`출력 예제)  
바둑이에게 생선 먹이를 주고 있다.`

```js 
// [1] 기존 함수
const feed = function (name, feed) {
  console.log(`${name}에게 ${feed} 먹이를 주고 있다.`);
};
feed('바둑이', '생선');


// [2] 커링 함수
const curriedFeed = function (name) {
  return function (feed) {
    return `${name}에게 ${feed} 먹이를 주고 있다.`; 
    // 함수형 프로그래밍에서는 웬만하면 return 처리하도록 한다.
  };
};
console.log(curriedFeed('판다')('대나무'));


// [3] 커링 Arrow Func
const curriedFeed2 = name => feed => `${name}에게 ${feed} 먹이를 주고 있다.`;
const myCat = curriedFeed2('고양이');
console.log(myCat('생선'));
console.log(myCat('닭고기'));
console.log(myCat('미역국'));

const curriedFeed3 = name => feed => {
  let arity = feed.length;

  console.log(arity);
  feed.map(item => {
    console.log(`${name}에게 ${item} 먹이를 주고 있다.`);
  });
};
const myPuppy = curriedFeed3('댕딩이');
myPuppy(['개껌', '닭고기', '츄르']);
```

## 커링 (Currying) 
### - 파라미터 순서 바꾸기   
문자열을 조합하여 하나의 문장을 출력하는데, 의도에 맞게 출력해보자.  


`출력 예제1) 바둑이 --> 생선 먹이를... `   
`출력 예제2) 바둑이 : 생선 먹이를...`

```js
// [1] 기존 함수
// 1) 입력은 순서대로 받는다. name - separator - stress - feed
// 2) 출력은 필요에 따라 조합할 수 있다.
const curriedFeed4 = function (name) {
  return function (separator) {
    return function (stress) {
      return function (feed) {
        // 인자로 받는건 `커햄이` `:` `줌!` `해바라기씨`
        return name + separator + feed + stress;
        // 출력은 `커햄이` `:` `해바라기씨` `줌!`
      };
    };
  };
};
// 출력) 커햄이 : 해바라기씨 줌!
const whatFeed = curriedFeed4('커햄이')(' : ')(' 줌!');
console.log(whatFeed('해바라기씨'));
console.log(whatFeed('베이컨'));
console.log(whatFeed('감자탕'));
console.log(whatFeed('초밥'));

const curriedFeed5 = function (name) {
  return function (separator) {
    return function (feed) {
      return function (stress) {
        return name + separator + feed + stress;
      };
    };
  };
};

const whatStress = curriedFeed5('초키푸키')('-->');
console.log(whatStress('밥 ')('줬니?'));
console.log(whatStress('소고기 ')('줬다.'));
console.log(whatStress('이베리코 ')('줄걸..'));

// [2] : 부분 적용 함수
// 커링 함수의 큰 장점 -> 인자를 부분 적용한 함수를 쉽게 만들 수 있다.
console.log(whatStress('국밥 ')('안 줬다'));
// 커링 함수에서는 인자의 수를 마음대로 조절할 수 있다. 
// -> 매개변수를 나타내는 함수의 집합을 쉽게 만든다.
```
