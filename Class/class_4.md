# 클래스 - 생성자 메서드
1. instance(객체)를 생성할 때 제일 먼저 실행되는 메서드이다.  
   -> 제일 먼저 실행되기 때문에, 주로 `생성되는 객체의 초기화`를 담당한다.  
2. `constructor`는 오직 `하나`여야 한다. (생략 가능하다.)  

    2-1. constructor가 2개이면 `Error`
    ```js
    // Error
    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
      constructor(name2, age2) {
        this.name = name;
        this.age = age2;
      }
    }
    ```

    2-2. constructor는 생략이 가능하고, 필요한 속성이나 메서드가 있다면, 추가할 수 있다.
    ```js
    class Fruit {}
    const f1 = new Fruit();
    f1.name = '바나나'; // 이런식으로 추가해 줄 수 있다.
    f1.attr = '맛있다.';
    console.log(f1);
    ```
    2-3. 생략
    * constructor 생략이 가능 -> class의 constructor {}를 작성한 것과 동일하다.
    * 생성된 객체에 어떤 속성을 추가하려면 -> 객체를 생성한 이후에 별도로 속성을 추가.
    * 객체 생성시 초기화를 해야한다면 -> constructor를 생략하면 안 된다. 

# 1. 상속 (inheritance)
## 1-1. 상속
: 부모가 가진 자원을 그대로 물려 받아 자식 클래스를 `생성` 및 `확장`할 수 있다.

1. `extends` 키워드를 사용하여 기존 부모가 가진 자원을 물려받아 자식이 더 크게 확장한다.
2. 자식이 `재정의`해서 사용할 수 있다.

부모가 가진 성질을 자식에서 굳이 중복 선언할 필요 없으며, 용도에 맞게 재정의도 가능한 것이 상속이다.


## 1-2. 실습

* 부모 클래스
  ```js
  class Animal {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    eat() {
      console.log(this.name + '이 밥을 먹다.')
    }
  }
  ```

* 자식 클래스
  ```js
  class Tiger extends Animal {
    // 자식 클래스에서 eat() 메서드를 재정의 할 수 있다.
    eat() {
      return this.name + ` 빨리 냠냠함.`
    }
  }
  
  const t1 = new Tiger('호랑이', 2);
  console.log(t1.eat()); // 호랑이 빨리 냠냠함.
  ```

# 2. 상속과 super
## 2-1. super
: 자식 클래스에서 부모의 생성자를 호출하는 키워드이다.
반드시 this보다 먼저 호출해줘야 참조에러가 나지 않는다.

## 2-2. 실습
Animal 클래스(부모/상위/super)와 Mammal 클래스(자식/하위/sub)를 만들어 상속관계를 구현하라.

요구 조건) 
- Mammal 클래스의 인스턴스 생성은 `new Mammal('호랑이', 10, 2, 1.5);`
- 부모 클래스의 constructor는 자식 클래스에서 super를 통해 동물의 유형을 받도록 처리.

  ```js
    class Animal {
    constructor(group, alias) {
      this.group = group;
      this.alias = alias;
    }
    getGroup() { return this; }
    eat() {}
    sleep() {}
    bark() { return `왈왈`; }
  }

  class Mammal extends Animal {
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
  console.log(m1); // Mammal {group: '포유류', alias: '짱', name: '호랑이', finger: 10, toe: 10, …}
  console.log(m1.bark()); // override 하여 사용한다. --> (1) 기각하다. 무시하다 (2) ~보다 더 우선하다. 우선시하다.
  ```

  * super를 없앨 경우: 에러남. 
  * 에러를 없애려면, 부모의 생성자를 없애면 됨.

  ```js
    class Animal {
      getGroup() {}
      eat() {}
      sleep() {}
      bark() { return `왈왈`; }
    }

    class Mammal extends Animal {
      constructor() {
        super()
      }
    }

    const m1 = new Mammal('호랑이', 10, 10, 1.5);
    console.log(m1); 
  ```



# 3. 상속과 super(2)
## 3-1. 

  ```js
  class Animal3 {
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

  class Mammal3 extends Animal3 {
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
      return `재정의한 메서드를 통해 크게 짖다.`;
    }
    move() {
      // console.log(`${this.name} 이동하면서 ${this.bark()}`);
      console.log(`${this.name} 이동하면서 ${super.bark()}`);

    }
  }

  const m3 = new Mammal3('호랑이', 10, 10, 1.5);
  console.log(m3); // Mammal {group: '포유류', alias: '짱', name: '호랑이', finger: 10, toe: 10, …}
  console.log(m3.bark()); // 재정의한 메서드를 통해 크게 짖다.

```
## 3-2. `super.~()` 상위 클래스의 메서드를 사용할 수 있다.

 만약, bark를 Animal3 즉 부모 클래스의 메서드를 가져와서 쓰고싶다면, 
 super.bark() <- 처럼 super 키워드를 사용한다.
