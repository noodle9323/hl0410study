// [1] Property
class Person {
  age = 20;
  power = 200;
  #finger = 10;
  #toe = 10;
}

const p1 = new Person();
console.log(p1);
console.log(p1.age);
console.log(p1.power);
p1.age = 10; // 외부 참조가 가능하므로 값의 변경이 직접적으로 가능하다.
console.log(p1.age); // 20 -> 10으로 변경.
console.log(p1.finger); // undefined
// console.log(p1.#finger); // Private Err!, Private field '#finger' must be declared in an enclosing class

console.clear();
// [2] Private Method
class Animal {
  #age = 4;
  bark() {
    this.#age = 8; // 클래스 내부에서의 접근은 가능하다.
    return `${this.#age}살 짜리 개가 짖고있음. 멍멍`;
  }
  #privateMethod() {
    return `Hi, Private Method!`;
  }
  getPrivateMethod() {
    // get 메서드를 만들어서 접근한다.
    return this.#privateMethod();
  }
}

const ani1 = new Animal();
console.log(ani1.bark());
// console.log(ani1.#privateMethod()); // Private Err!
console.log(ani1.getPrivateMethod()); // Hi, Private Method!

// [4] Private static method
console.clear();
class Animal3 {
  static #privateStaticMethod() {
    return `Hello, Private Static Method~`;
  }
  static getPrivateStaticMethod() {
    return this.#privateStaticMethod();
  }
  static getPrivateStaticMethod_ClassName() {
    return Animal3.#privateStaticMethod();
  }
}
// console.log(Animal3.#privateStaticMethod); // Private Err!
console.log(Animal3.getPrivateStaticMethod()); // Hello, Private Static Method~
