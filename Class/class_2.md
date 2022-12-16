
# getOwnPropertyNames()  
어떤 객체를 다룰 때, 그 `객체의 모든 특성을 보고자 한다면` `getOwnPropertyNames`을 사용한다.  

* 정적 메서드 : `Object.getOwnPropertyNames(객체명)`   
* 정된 객체의 내부 prototype 속성값을 반환 : `Object.getPrototypOf()` 


클래스 내의 메서드들은 열거 대상이 아니었으므로 출력되지 않았음.  
클래스 내에 정의된 어떠한 메서드들이나 속성을 배열로 리턴받고자 할 때 사용한다.


## Object.keys() VS Object.getOwnProperyNames()
```js
Object.keys() // 열거 가능한 속성만 가져옴.
Object.getOwnProperyNames() // 열거 가능, 불가능한 속성 모두를 가져온다.
```
```js

// [1]
const p1 = {
  eat() {},
  run() {},
  rest() {}
};

class Person2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {}
  run() {}
  rest() {}
}

const p2 = new Person2('햄깅', 7);

// [2]
// 열거 대상이 아닌 것 --> 메서드가 보이지 않음
for (let i in p2) {
  console.log('p2 members: ' + i);
}
console.log('------------------------------');
console.log(p1);
console.log(p2); // Person2{} --> 메서드 출력 X

console.log('------------------------------');
// p1: 객체 리터럴
// p2: 클래스와 new키워드로 만든 객체
console.log(Object.keys(p1)); // ['eat', 'run', 'rest']
// 프로토타입에 있는 메서드들은 열거할 수 없다. 객체 리터럴로 만든 메서드들은 열거 가능

console.log(Object.getPrototypeOf(p2)); // 지정된 객체의 내부 Prototype 속성값을 반환.

console.log(Object.keys(Object.getPrototypeOf(p2))); // []
console.log('------------------------------');

console.log(Object.getOwnPropertyNames(p1)); // ['eat', 'run', 'rest']
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(p2))); // ['constructor', 'eat', 'run', 'rest']

// [체크문제]
class Animal {
  constructor(name) {
    this.name = name;
  }
  cry() {
    console.log(this.name + '가 웁니다.');
  }
  move() {
    console.log(this.name + '가 움직입니다.');
  }
}

const ani1 = new Animal('호랑이');
ani1.cry();
ani1.move();

// Q1. 클래스 타입 체크?
// -> function
console.log(typeof Animal); // function

// Q2. 클래스의 속성과 메서드 추가
Animal.prototype.age = 4;
Animal.prototype.run = function () {
  console.log(this.name + '가 뛴다.');
};
ani1.run();
console.log(ani1.age);

// Q3. 클래스의 이름은?
console.log(Animal.name); // Animal
console.log(Animal === Animal.prototype.constructor); // true

// Q4. Animal 프로토타입 객체의 멤버들을 모두 보고 싶다면?
console.log(Object.getOwnPropertyNames(Animal)); // ['length', 'name', 'prototype']
console.log(Object.getOwnPropertyNames(Animal.prototype)); //  ['constructor', 'cry', 'move', 'age', 'run']
```
