// [1] static 메서드 사용법.
class Animal {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  // Animal Prototype Object에 존재함.
  sleep() {
    return '잠자다';
  }

  // 정적 메서드 sleep2
  // Animal 객체에 존재함.
  static sleep2() {
    console.log('Zzz...');
  }
}

const ani1 = new Animal('호랑이');
console.log(ani1.sleep());
console.log(ani1.getName());
// ani1.sleep2(); // Err 인스턴스로 정적 메서드 호출 불가능.
Animal.sleep2(); // Zzz... 정적 메서드는 class명으로 호출한다.
ani1.constructor.sleep2(); // 인스턴스로 호출하려면 constructor를 사용

// [2] 상속 관계에서의 정적 메서드
class Add {
  static plus(x) {
    x = x || 100;
    return x + 1000;
  }
}

class ChildAdd extends Add {
  static plus(x) {
    return super.plus(x) + super.plus(x) + super.plus(x);
  }
}

// console.log(Add.plus()); // 1100
// console.log(Add.plus(500)); // 1500
// console.log(ChildAdd.plus()); // 3300
// console.log(ChildAdd.plus(300)); // 3900

const add1 = new Add();
// console.log(add1.plus()); // Err
console.log(add1.constructor.plus()); // 1100
console.log(add1.constructor.plus(30)); // 1030

const add2 = new ChildAdd();
// console.log(add2.plus()); // Err
console.log(add2.constructor.plus()); // 3300
