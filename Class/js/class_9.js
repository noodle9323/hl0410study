// // 다형성의 예시
// // for...of vs toString() 메서드

// // Array
// const fruits = ['🍇', '🍈', '🍉', '🍊', '🍑', '🍏'];
// for (let fruit of fruits) {
//   console.log(fruit);
// }

// // String
// const str = 'HELLO, WORLD!';
// for (let word of str) {
//   console.log(word);
// }

// // Number --> 반복 가능하지 않으므로 Error
// // const num = 12345;
// // for (const i of num) {
// //   console.log(i);
// // }

// // Map
// const map1 = new Map([
//   ['seoul', 1],
//   ['pusan', 2],
//   ['jeju', 3]
// ]);

// for (const city of map1) {
//   console.log(city);
// }
// // ['seoul', 1]
// // ['pusan', 2]
// // ['jeju', 3];

// for (const [key, value] of map1) {
//   console.log(key, value);
// }
// // seoul 1
// // pusan 2
// // jeju 3

// // toString() 메서드
// const dateObj = new Date(2030, 5, 25, 20, 40, 8);
// strObj = dateObj.toString();
// console.log(strObj);
// console.log(typeof strObj); // string

// console.clear();

// // Array
// const arrObj = [1, 2, 3, 4, 5, 6];
// console.log(arrObj.toString()); // join 처럼 행동한다.
// function Person(name, age, hp, gender) {
//   this.name = name;
//   this.age = age;
//   this.hp = hp;
//   this.gender = gender;
// }
// const p1 = new Person('길동스', 20, 100, 'male');
// console.log(p1.toString()); // [object Object]

// const str1 = 'KOREA';
// const iterator = str1[Symbol.iterator]();

// // for (const i of iterator) {
// //   console.log(i);
// // }

// // console.log(iterator.next());
// // console.log(iterator.next());
// // console.log(iterator.next());
// // console.log(iterator.next());
// // console.log(iterator.next());
// // console.log(iterator.next());

// // console.clear();
// // [2] 이터러블 객체의 생성
// // 기본적으로 이터러블 객체(= 반복 가능한 객체)라면 Symbol.iterator 키를 가진다.

// // [3] 이터레이터 객체 직접 구현
// let testIterObj = {
//   i: 1,
//   [Symbol.iterator]: function () {
//     return this;
//   },
//   next: function () {
//     // 리턴시 next 메서드는 객체를 리턴한다.
//     if (this.i < 5) {
//       return { value: this.i++, done: false };
//     } else {
//       return { value: undefined, done: true };
//     }
//   }
// };
// console.log(testIterObj);
// const str3 = 'KOREA';
// const iter3 = str3[Symbol.iterator]();
// console.log(iter3.next());
// console.log(iter3.next());
// console.log(iter3.next());

// // [4] 자바스크립트 클래스 - 다형성 예
// // 다형성을 구현하기 위한 기본적인  OOP문법.
// // 1. 부모/자식간의 계층적인 구조 --> 상속관계
// // 2. 메서드 재정의 --> 오버라이딩
// // 3. 재정의된 메서드 호출 --> 프로토타입 체이닝상에서 제일 먼저 찾게되는 메서드 호출.

// // [4-1]
// class Animal {
//   constructor(name) {
//     this._name = name;
//   }
//   bark() {
//     return `짖다.`;
//   }
// }

// class Dog extends Animal {
//   constructor(name, age) {
//     super(name); // super가 name을 넘기면서 부모 클래스인 Animal의 constructor가 실행된다.
//     this._age = age;
//   }
//   bark() {
//     return `overiding: ${this._age}살 짜리 ${this._name}이(가) 짖다. 멍멍`;
//   }
// }

// class Cat extends Animal {
//   constructor(name, age) {
//     super(name);
//     this._age = age;
//   }
//   bark() {
//     return `overiding: ${this._age}살 짜리 ${this._name}이(가) 짖다. 냐옹`;
//   }
// }

// class Bull extends Animal {
//   constructor(name, age) {
//     super(name), (this._age = age);
//   }
//   bark() {
//     return `overiding: ${this._age}살 짜리 ${this._name}이(가) 짖다. 음머`;
//   }
// }

// // [4-2] 사용
// // 배열
// const animals = [new Dog('바둑', 10), new Cat('나비', 3), new Bull('보리', 6)];
// for (let ani of animals) {
//   console.log(ani.bark());
// }

// [5] 자바스크립트 클래스 - 다형성 예(2)
// function + prototype 기반
/**
 * 설계 class와 구현 class가 있을 경우..
 * 설계 class - 메서드 정의
 * 구현 class - 구체적인 메서드를 오버라이딩하여 정의한다.
 */

// [5-1] 설계 클래스(인터페이스 -> 일종의 `설계도`이다.)
const Animal = function (name) {
  this._name = name;
};

Animal.prototype.move = function () {
  // 코드 구현...
  throw new Error('move메서드가 구현되지 않았습니다.');
};

// [5-2] 구현 클래스
// 자식 클래스에서 move 메서드를 구현하지 않으면 부모 클래스에서 에러를 던져줌으로써 --> 구현을 강제한다.
const DogImplement = function (name, age) {
  Animal.call(this, name); // Class의 super역할
  this._age = age;
};
DogImplement.prototype = Object.create(Animal.prototype);
DogImplement.prototype.constructor = DogImplement;
// 구체적인 구현
DogImplement.prototype.move = function (args) {
  console.log(`[Type: ${args}] (${this._name}, ${this._age}살) 이동중..`);
  return `멍멍!!`;
};

// 객체 생성하여 [5-2] 테스트하기.
const d1 = new DogImplement('바둑이', 2);
console.log(d1.move('갱얼쥐'));
