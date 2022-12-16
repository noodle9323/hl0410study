class Person {
  constructor(id, name, email) {
    // 암묵적인 private 표시 방법 `_변수명`
    this._id = id;
    this._name = name;
    this._email = email;
  }
  // [1] getter
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
  // [2] setter
  //setter 만들깅
  set id(value) {
    this._id = value;
  }
}

const p1 = new Person('kiki', 'hm', 'kiki932314@gmail.com');
console.log(p1.name);
console.log(p1.email);

console.log(p1.id);
p1.id = 'hoho';
console.log(p1.id);
