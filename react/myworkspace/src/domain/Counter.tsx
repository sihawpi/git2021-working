// Counter 컴포넌트
// state(상태)

// useState라는 함수를 사용하기 위해 작성
import { useState } from "react";

// 화면에 먼가 변경을 일으켜야함
// -> 내부에서 처리 state, 외부에서 온다 prop

const Counter = () => {
  // cosnt [state데이터명(기본), state데이터 변경함수명] = useState(초깃값);

  // state
  // 1. 변수 대신 쓰는 데이터 저장 공간
  // 2. useState()를 이용해 만들어야함
  // useState에는 2개의 데이터가 들어있는 배열이 담긴다 -> 형식을 지켜줘야함
  // 3. string, number, array, object다 저장 가능

  // 그냥 변수에 데이터를 넣으면 데이터가 바뀔 때마다 페이지 전체 새로고침함
  // useState에 데이터를 데이터 변경함수를 사용해서 변경할 때마다 그 부분만 재렌더링함 
  // -> 자주 변경되는 데이터는 useState를 사용하자

  // prop: 화면에 렌더링결과에 영향을 미치는 변수, 외부에서 매개변수로 옴
  // state: 화면에 렌더링결과에 영향을 미치는 변수, 내부에서 선언함

  // state변수는 변경불가(immutable, 불변성)
  // count = 1; // 직접적인 변경불가
  // setCount(count + 1); // state 변경함수로만 변경할 수 있음

  // state 변경함수로 state를 변경했을 때만 컴포넌트를 업데이트함(다시그림)
  // state 변경함수를 실행하면 state가 있는 컴포넌트가 모두 다시 그려짐
  // -> 실제로는 변동사항이 있는 부분만 다시 그림
  // 기존 virtual dom 객체와 변동된 virtual dom 객체를 비교함
  // 같으면 다시 그리지 않음.

  const [count, setCount] = useState(0);

  const increase = () => {
    // state변경함수(변경할값 - 기본값을 대체할 값)
    // 초기값의 데이터 구조와 변경함수의 데이터구조가 같아야함
    // -> 초기값이 배열이면 변경함수도 배열이여야함
    // -> 배열을 통째로 복사해서 특정값을 변경하는건 바보.
    // -> 기본값에 해당하는 새로운 객체를 생성후 기본값을 복사(그냥 기본값을 때려넣으면 복사가 아닌 값 공유 상태 = 다른 객체가 아닌거임)
    // -> deep copy ...(객체) 스프레드연산자를 이용(객체의 값을 가져옴) ex) let new array = [...count]; 
    // -> 복사한 객체를 이용해 자신이 원하는 특정 데이터를 제어할 수 있음 https://www.youtube.com/watch?v=CowLAnmhxMY&t=202s

    // => state는 그냥 변경할 수 없음 -> deep copy(스프레드)state카피본 만들기 -> 카피본에 수정사항 반영 -> 변경함수()에 집어넣기

    // count는 불변객체이기때문에 ++같은 연산자 사용 불가
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Counter</h2>
      <div>
        {/* onClick={실행할 함수} 그냥 js와는 다르게 이벤트발생을 태그에 바로 붙일 수 있고, 이벤트 실행 함수를 넣어야함*/}
        <button onClick={increase}>count</button>
        
        {/* button에 addEventListener("click", ()=>{}) 같음 */}
        {/* 화살표함수 방식 */}
        {/* <button
          onClick={() => {
            increase();
          }}
        >
          COUNT
        </button> */}
        <span>{count}</span>
      </div>
    </div>
  );
};

export default Counter;
