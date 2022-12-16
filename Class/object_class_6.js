// 자바스크립트 클래스 - Object.create 상속(1~2)
// object_class.md

// Object.create 상속(3) 코드 실습
// 부모 클래스
function ParentClass(name, age) {
  this.name = name;
  this.age = age;
}

ParentClass.prototype.sayHello = function () {
  console.log(`hi~~ ${this.name}`);
};

// 자식 클래스
function ChildClass(name, age, power) {
  ParentClass.call(this, name, age);
  this.power = power;
}

ChildClass.prototype = Object.create(ParentClass.prototype);
ChildClass.prototype.constructor = ChildClass; // [핵심코드1] 여기가 핵심.
ChildClass.prototype.move = function () {
  console.log(`${this.name} is moving~`);
};

const c1 = new ChildClass();

console.log(c1);
/** 결과 // [핵심코드1] 주석을 풀기 전에..
 * > ChildClass {}
 * >> [[Prototype]]: ParentClass
 */
// 여기서 나오는 ParentClass는 부모 클래스의 prototype 객체가 아니라, 복제한 ChildClass의 prototype 객체임.
const b1 = new ChildClass('batman', 20, 900);
console.log(b1);
console.log(b1.name);
console.log(b1.age);

const s1 = new ChildClass('superman', 30, 1000);
console.log(s1);
console.log(s1.name);
console.log(s1.power);
s1.move();

console.log(s1.__proto__.__proto__.__proto__.__proto__); // null
console.log(s1.__proto__.__proto__.__proto__); // Object
console.log(s1.__proto__.__proto__); // (부모) ParentClass의 프로토타입 객체
console.log(s1.__proto__); // (자식) ChildClass의 프로토타입 객체인 `ParentClass의 프로토타입 객체`
