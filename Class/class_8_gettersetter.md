# getter, setter
## 1. getter
* getter -> 클래스 속성에 접근하여 값을 `가져오고자 할 때 사용`한다. 반드시 어떤 값을 `return`함.
* 메서드명 앞에 `get`키워드를 붙여서 사용
* 메서드 사용시 마치 속성처럼 사용한다. -> 호출이 아님 -> 끝에 `()` 괄호 생략
  
```js
// [1] getter
class Person {
  constructor(id, name, email) {
    // 암묵적인 private 표시 방법 `_변수명`
    this._id = id;
    this._name = name;
    this._email = email;
  }
  // getter 만들깅
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
}

const p1 = new Person('kiki', 'hm', 'kiki@gmail.com');
console.log(p1.id); // kiki
console.log(p1.name); // hm
console.log(p1.email); // kiki@gmail.com

```

## 2. setter
* setter -> `클래스 속성`에 값을 `할당`할 때 사용.
* 메서드명 앞에 `set`키워드를 붙여서 사용.
* getter와 마찬가지로 속성처럼 사용.
```js
  // [2] setter
  //setter 만들깅
  set id(value) {
    this._id = value;
  }

  console.log(p1.id);
  p1.id = 'hoho';
  console.log(p1.id);
```


## 3. 
