# 클래스

## [1] 클래스의 지원
기존> JS 언어에서는 클래스 문법이 존재하지 않았음.  
그럼에도 불구하고> 프로토타입 체인으로 객체 지향 언어의 상속과 캡슐화(은닉화) 등의 OOP문법을 구현할 수 있었다.  
따라서> 자바스크립트 언어는 클래스가 필요없는 프로토타입 기반의 OOP (객체 지향) 언어  
 
## [2] 클래스 선언과 객체 생성
```js
class Person {
  // 생성자
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 메서드
  testHello() {
    console.log(`안녕하세용~ ${this.name}님 (만 ${this.age})`);
  }
}
// 객체 생성 --> 인스턴스 생성
const p1 = new Person('송희면', 29);
console.log(p1.name);
console.log(p1.age);
p1.testHello();

console.log(p1 instanceof Person);
```


# 클래스와 프로토타입
## [1] 클래스의 타입 --> `function`
## [2] 함수도 객체다.  
```js
function myMultiplicaion(a, b) {
  return a * b;
}

// 이 함수에 속성을 추가.
myMultiplicaion.ret = myMultiplicaion(10, 10);
console.log(myMultiplicaion.ret); // 100
```

## [3] 타입체크 시, 클래스는 왜 `function` 으로 찍히는걸까?
클래스 선언문은 아래와 같은 내부 동작을 수행한다.

1. `Person` 이라는 이름의 `함수`를 생성.
2. 이 함수의 본문은 `class`의 `constructor`를 그대로 가져온다. 만약 constructor가 없으면 빈 함수 생성.
3. 메서드는 같은 이름의 `Person.prototype(프로토타입 객체)`에 추가.
4. 결국 `프로토타입 객체`쪽에 클래스 내에 정의한 메서드들을 추가해놓는 것이라서,  
   해당 클래스의 인스턴스(객체)가 생성되면 추가된 메서드를 자유롭게 이용할 수 있다.


# 호이스팅
## [1] 함수 레벨 스코프와 블록 레벨 스코프
: 함수가 아닌 변수 선언은 모두 전역.
## [2] 호이스팅이란?
: scope 범위 내에서 끌어올려진다.
기본적으로 자바스크립트는 모든 선언문(var, let, const, function, class)을 호이스팅한다.
호이스팅 == 스코프 안의 어디서든 변수 선언은 최상위에서 선언한 것과 동일하다.
var 키워드와 let, const 키워드로 선언한 변수는 차이가 있다.
## [3] 클래스 호이스팅
```js
class Person2 {}
console.log(Person2);

const p2 = new Person2();
console.log(p2);

// var vs. let, const, class
var str1 = 'Hello, World';

const testFunc = function () {
  // var str1 = undefined 로 호이스팅
  // -------------------
  console.log(str1);
  var str1 = 'hello~ testFunc';
};
testFunc(); // undefined

let str2 = 'Hello, World';

const testFunc2 = function () {
  //
  // -------------------
  // console.log(str2); // ReferenceError
  let str2 = 'hello~ testFunc';
};
testFunc2();
```

# 클래스 상속
```js
// 1)
class Parent {}
class Child extends Parent {} // 상속 - O

// 2)
// class Child_2 extends Parent_2 {} // 에러 - ReferenceError: Cannot access 'Parent2' before initialization
class Parent_2 {}
```

# 표현식 정의
```js
// [1] : 무명 표현식
const Person_3 = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};

const p_3 = new Person_3('길동씨', 20);
console.log(p_3.name);
console.log(p_3.age);
console.log(Person_3.name); // 무명 표현식이지만, Person_3이 암묵적인 변수명이 된다.

// [2] : 유명 표현식
const Person_4 = class namedPerson {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};

const p_4 = new Person_4('길동쉬쉬', 20);
console.log(p_4.name);
console.log(p_4.age);
console.log(Person_4.name); // namedPerson, 클래스명이 있으므로 name 속성의 값은 클래스명이 된다.

const p_5 = new Person_4('펩시라임', 2); // namedPerson {name: '펩시라임', age: 2}
// const p_5 = new namedPerson('펩시라임', 2); // namedPerson is not defined
console.log(p_5);
```

# 클래스를 만드는 방식 2가지
1. 생성자 함수
2. class
```js
// [1] : 생성자 함수
function Person_5(name, age) {
  this.name = name;
  this.age = age;
}

Person_5.prototype.say = function () {
  console.log('Person_5 하이');
};

const p5 = new Person_5('p5', 300);
p5.say();

// [2] : class
class Person_6 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  say() {
    console.log('p6 안뇽');
  }
}

const p6 = new Person_6('멍멍이', 1);
console.log(p6.name);
p6.say();
```

# 클래스는 기본적으로 `use strict` 모드
클래스 메서드는 열거 대상이 아니다.  
-> 클래스와 같은 이름의 "프로토타입 객체"의 속성에 추가된 메서드들 열거 대상 아님.
```js
for (let i in p5) {
  // p5는 생성자 함수로
  console.log(i); // name, age, say 가 나옴.
}
for (let i in p6) {
  // p6는 클래스
  console.log(i); // name, age 가 나옴. (클래스 메서드는 열거 대상이 아님.)
}
```
