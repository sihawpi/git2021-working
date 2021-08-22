// interface: 객체 구조의 형식 지정
// interface 타입명 {
//   속성명: 타입;   // ,로 property를 구분하지 않고 ;으로 구분
//   속성명: 타입;
// }
interface User {
  firstname: string;
  lastname?: string; // 속성명?, optional(필수값이 아닌) 속성, ? => 변수를 필수로 입력하지 않아도 됨
  phone?: string;
}

// 매개변수: 타입(User=객체)
// User 위에 작성해놓은 객체형식 그대로 반영
function printName(obj: User) {
  // obj.firstname(자동입력) => obj라는 매개변수는 User타입이기때문에 User의 프로퍼티키, 값을 바로 사용할 수 있음. 
  // -> User의 프로퍼티 프로퍼티 키 자동입력 가능
  console.log(obj.firstname + " " + obj.lastname); // jhon undefiend => undefiend는 밑에 user값을 할당할 떄 lastname을 할당하지 않았기 때문
}

// 타입명[]
// number[], string[], User[]
// 배열구조: User[]  => 밑에 선언해놓은 User[](배열)을 반영
function printNames(arr: User[]) {
  for (let obj of arr) {
    console.log(obj.firstname + " " + obj.lastname);
  }
}

const user: User = {
  firstname: "John",
  // lastname: "Smith", // lastname은 필수 입력값이 아님, ?없이 lastname으로 작성했으면 필수로 입력해야 error X
};

// 배열구조가 User => 객체를 배열로 갖고 객체 구조는 User과 동일하다.
const users: User[] = [
  // "2", 2, User타입에 맞지 않은 타입이라 error
  { firstname: "John", lastname: "Smith" },
  { firstname: "Gildong", lastname: "Hong" },
];

printName(user);
printNames(users);
