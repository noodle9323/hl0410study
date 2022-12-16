# 접근 제한자
## 전통적인 다른 OOP에서와 같은 접근자가 없고, 기본적으로 모두 `public`이다.
즉, 해당 클래스의 인스턴스를 통해 외부에서 항상 `참조`가 가능.

* 접근자 종류: private, public, protected

그래서 생성자 메서드내에서 속성명 앞에 prefix로 `_`를 붙여 `private`라고 암묵적으로 표현했었다.  ( `this._name` )  

최신 브라우저 위주로 지원.

## 1. Property
```js
  class Person {
    age = 20;
    power = 200;
    #finger = 10; // Private
    #toe = 10; // Private
  }

  const p1 = new Person();

  console.log(p1);
  console.log(p1.age);
  console.log(p1.power);
  
  // 외부 참조가 가능하므로 값의 변경이 직접적으로 가능하다.
  p1.age = 10; 
  console.log(p1.age); // 20 -> 10으로 변경.

  console.log(p1.finger); // undefined
  // 외부에서 접근이 불가능하다.
  console.log(p1.#finger); // Err, Private field '#finger' must be declared in an enclosing class
  ```

## 2. Method, Private Method
```js
  class Animal {
    #age = 4;
    bark() {
      this.#age = 8; // 클래스 내부에서 프라이빗 변수에 접근할 수 있다.
      return `${this.#age}살 짜리 멍멍이`
    }
    #privateMethod() {
      return `Hi, Private Method!`
    }
    getPrivateMethod() {
      // 프라이빗 함수를 리턴하는 get 메서드를 만들어서 접근할 수 있다. 
      return this.#privateMethod();
    }
  }


  const ani1 = new Animal();
  // [2] - Method
  console.log(ani1.bark());

  // [3] - Private Method
  // console.log(ani1.#privateMethod()); // Private Err
  console.log(ani1.getPrivateMethod()); // Hi, Private Method!
```

## 4. Private Static Method
```js
class Animal3 {
  static #privateStaticMethod() {
    return `hi~ Private Static Method!`
  }
  static getPrivateStaticMethod() {
    return this.#privateStaticMethod();
  }
}

console.log(Animal3.getPrivateStaticMethod()); // hi~ Private Static Method!
```
### 동일 코드
  ```js
    // this로 접근
    static getPrivateStaticMethod() {
      return this.#privateStaticMethod();
    }
  ```
  ```js
    // 클래스명으로 접근
    static getPrivateStaticMethod_ClassName() {
      return Animal3.#privateStaticMethod();
    }
  ```