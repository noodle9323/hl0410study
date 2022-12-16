// 1. 상속 예제
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eat() {
    console.log(this.name + '이 밥을 먹다.');
  }
}

class Tiger extends Animal {
  // 자식 클래스에서 eat() 메서드를 재정의 할 수 있다.
  eat() {
    return this.name + ` 빨리 냠냠함.`;
  }
}

const t1 = new Tiger('호랑이', 2);
console.log(t1.eat());

// 2. Super 예제
class Animal2 {
  constructor(group, alias) {
    this.group = group;
    this.alias = alias;
  }

  getGroup() {
    return this;
  }

  eat() {}
  sleep() {}
  bark() {
    return `왈왈`;
  }
}

class Mammal extends Animal2 {
  constructor(name, finger, toe, eyesight) {
    super('포유류', '짱'); // 부모의 생성자를 호출한다. this보다 super가 당연히 먼저 호출되어야 함.
    this.name = name;
    this.finger = finger;
    this.toe = toe;
    this.eyesight = eyesight;
  }

  run() {
    return `${this.name}(${this.group}) 뛴당~`;
  }
  bark() {
    return `override 하여 사용한다. --> (1) 기각하다. 무시하다 (2) ~보다 더 우선하다. 우선시하다.`;
  }
}

const m1 = new Mammal('호랑이', 10, 10, 1.5);
// console.log(m1.getGroup());
console.log(m1.run());
console.log(m1.bark());

// 3. 예제
class Animal3 {
  constructor(group) {
    this.group = group;
  }
  getGroup() {
    return this;
  }
  eat() {
    return `냠냠`;
  }
  sleep() {
    return `드르렁`;
  }
  bark() {
    return `(작게) 왈왈`;
  }
}

class Mammal3 extends Animal3 {
  constructor(name, finger, toe, eyesight) {
    super('포유류'); // 부모의 생성자를 호출한다. this보다 super가 당연히 먼저 호출되어야 함.
    this.name = name;
    this.finger = finger;
    this.toe = toe;
    this.eyesight = eyesight;
  }
  run() {
    return `${this.name}(${this.group}) 뛴당~`;
  }
  bark() {
    return `재정의한 메서드를 통해 크게 짖다.`;
  }
  move() {
    return `${this.name} 이동하면서 ${super.bark()}`;
  }
}

const m3 = new Mammal3('호랑이', 10, 10, 1.5);
console.log(m3.getGroup()); // Mammal3 {group: '포유류', name: '호랑이', finger: 10, toe: 10, eyesight: 1.5}
console.log(m3.bark());

// 속성 출력
console.log(Object.getOwnPropertyNames(m3));
// 인스턴스에 있는 프로퍼티 : ['group', 'name', 'finger', 'toe', 'eyesight']
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(m3)));
// 프로토타입 객체에 있는 메서드 : ['constructor', 'run', 'bark', 'move']
