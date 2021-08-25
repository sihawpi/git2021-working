// Generator

import { link } from "fs";
import { useState } from "react";

// 숫자 값을 랜덤 -50 ~ 50 범위로 생성하고
// 배열 state에 추가
// 숫자 목록을 ul > li로 출력

// 기존 javascript
// DOM요소를 직접적으로 조작

// React
// Virtual DOM 요소와 관련된
// state 또는 prop를 조작

// 세부 컴포넌트
// num을 매개변수
// 매개변수를 왜 이렇게 받는거지?
const ListItem = ({ num }: { num: number }) => {
  const textColor = num < 0 ? "red" : "green";
  return <li style={{ color: textColor }}>{num}</li>;
};

const GeneratorCopy = () => {
  const [numbers, setnumbers] = useState<number[]>([]);
  const generate = () => {
    const randomNum = Math.floor(Math.random() * 100 - 50);
 
    // setnumbers에 새로운 배열을 할당함, ...numbers는 numbers와 같은 새로운 배열(복사)
    setnumbers([randomNum, ...numbers]);
  };
  return (
    <div>
      <h2>GeneratorCopy</h2>
      <button onClick={generate}>GENERATE</button>
      <div>{numbers}</div>
      <ul>
        {/* numbers(배열)을 받는다.
            배열의 요소를 num에 넣고 해당 요소를 li태그로 반환.
            numbers의 모든 요소에 적용*/}
        {/* numbers의 요소들이 차례대로 num에 들어가서 li태그로 반환됨 */}
        {/* map이 numbers의 요소를 순회? */}
        {
          // 조건부렌더링
        /* numbers.map((num, index) => (
            num < 0
              ? <li style={{ color: "red" }} key={index}>
                {num}
              </li>
              : <li style={{ color: "green" }} key={index}>
                {num}
              </li>
          )) */

          numbers.map((num, index) => (
            <ListItem key={index} num={num}/>
          ))
        }
      </ul>
    </div>
  );
};

export default GeneratorCopy;
