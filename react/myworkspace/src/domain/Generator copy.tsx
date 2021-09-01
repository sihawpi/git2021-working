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
// 자식 컴포넌트
// 부모 컴포넌트의 매개변수를 받아옴
const ListItem = ({ num }: { num: number }) => {
  const textColor = num < 0 ? "red" : "green";
  return <li style={{ color: textColor }}>{num}</li>;
};

// 부모 컴포넌트
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

          numbers.map((potato, index) => (
            // <ListItem key={index} num={num} />
            // console.log(`return:${potato}`, index)
            // potato는 map함수로 받아오는 배열객체
            // num은 ListItem의 매개변수

            // GeneratorCopy의 리턴값에 ListItem가 포함되어있음 부모, 자식
            // num = ListItem의 매개변수 potato는 map함수때문에 num에 차례대로 할당되는 수
            // numbers의 배열 -> potato에 들어감 -> num이 potato를 매개변수로 받음 -> ListItem에 코드에 맞게 li 반환
            <ListItem key={index} num={potato} />
          ))
        }
      </ul>
    </div>
  );
};

export default GeneratorCopy;
