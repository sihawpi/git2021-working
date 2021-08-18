// 타입 추론
// type inference

// 첫번째 대입값에 따라서 형식을 자동으로 지정함
let firstname = "John"; // = let firstname: string = "John"
console.log(firstname.toUpperCase()); // 자동완성도 가능

// firstname = 1; // type error 이미 string타입으로 고정, -> 숫자 할당 X

function capitalize1(str: string) {
  // toUpperCase(): string
  // substr(..): string
  // string + string === string

  // return string
  return str[0].toUpperCase() + str.substr(1);
}

console.log(capitalize1("javascript"));
