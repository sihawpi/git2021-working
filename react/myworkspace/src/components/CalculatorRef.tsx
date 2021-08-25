// Calculator 컴포넌트

import { useRef, useState } from "react";
import { displayPartsToString, isBlock } from "typescript";

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

const CalculatorRef = () => {
  const [result, setResult] = useState(0);
  const inputRefA = useRef<HTMLInputElement>(null);
  const inputRefB = useRef<HTMLInputElement>(null);
  const inputRefOP = useRef<HTMLInputElement>(null);

  const calculate = () => {
    const a = inputRefA.current?.value; // 첫번째 피연산자
    const b = inputRefB.current?.value; // 두번째 피연산자
    const Operator = inputRefOP.current?.value; // 연산자
    
    
    setResult(eval(`${a}${Operator}${b}`));
  };

  return (
    <div>
      <h2>CalculatorRef</h2>
      <input type="text" ref={inputRefA} style={{display : "block" }}/>
      <input type="text" ref={inputRefB} style={{display : "block" }}/>
      <input type="text" ref={inputRefOP} />
      <button onClick={calculate}>start</button>
      <div>{result}</div>
    </div>
  );
};

export default CalculatorRef;
