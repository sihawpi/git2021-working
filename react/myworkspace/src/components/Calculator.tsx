// Calculator 컴포넌트

import { useState } from "react";

// 1. 버튼을 클릭하면 prompt로 입력값을 두번 받음
// a = prompt, b = prompt

// 2. 그다음에 연산자를 prompt로 받음
// +, -, *, /

// 3. 입력값 두개에 대한 연산 결과를 화면 출력
// state를 사용해야함

// 예) 입력값1: 10
//     입력값2: 5
//     연산자: *
//     결과값: 50
//     <div>50</div>

const Calculator = () => {

  const [result, setResult] = useState(0);
  const calculate = () => {
    const a = prompt('첫번째 숫자');  // 첫번째 피연산자
    const b = prompt('두번째 숫자');  // 두번째 피연산자
    const Operator = prompt('연산자, (+, -, *, /');  // 연산자
    // 입력값을 string으로 받았음 -> number로 바꿔줘야함

    // eval(문자열)
    // 문자열이 javascript코드로 실행 할 수 있으면 js코드로 실행
    // js는 string을 자동으로 숫자로 변환해서 연산하기때문에 return값을 number로 줄 수 있음
    console.log(eval(`${a}${Operator}${b}`));
    setResult(eval(`${a}${Operator}${b}`));

    // state 값에 변동이 없으면 컴포넌트를 업데이트하지 않음
    // 기존 result == 20
    // 변동 result == 20, -> 컴포넌트를 업데이트하지 않음
  }

  return (
  <div>
    <h2>Calculator</h2>
    <button onClick={calculate}>start</button>
    <div>{result}</div>
    </div>
  )
}

export default Calculator;
