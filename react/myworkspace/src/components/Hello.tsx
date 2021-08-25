import { useRef, useState } from "react";

const Hello = () => {
  // *** ref(reference의 줄임말)이란, HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 ***
  // *** 리액트 프로젝트 내부에서 DOM에 이름을 다는 것 ***

  // ref를 사용해야하는 상황
  // 1. DOM을 꼭 직접적으로 건드려야 할 때!
  // 2. 특정 input에 포커스 주기     ->  지금 내가 하는것
  // 3. 스크롤 박스 조작하기
  // 4. Canvas 요소에 그림 그리기 등

  /* **
  * useRef() 훅(hook) 함수를 사용하여 inputRef 객체를 생성한 후, <input> 엘리먼트의 ref prop에 넘기고 있습니다. 
  이렇게 해주면 inputRef 객체의 current 속성에는 < input > 엘리먼트의 레퍼런스가 저장됩니다.
  따라서 < button > 엘리먼트의 클릭(click) 이벤트 핸들러에서는 inputRef.current로 간단하게 < input > 엘리먼트를 제어할 수 있습니다.
  */

  // useState<state타입>(초기값)
  // state타입을 union 타입으로 설정 가능
  // inputRef.current?.value가 undefined도 가능하기 때문에 string타입만 적용하면 요류가 남
  const [userName, setUserName] = useState<string | undefined>("");

  // 참조객체 생성
  // useRef<참조객체타입>(초기값);

  // JSX Element를 참조하는 객체라면
  // JSX Element로 렌더링 되는 HTML 요소의 타입을 넣어야함, 기본값은 null
  // 참조하는 객체 형식 = HTMLInputElement
  const inputRef = useRef<HTMLInputElement>(null);

  const hello = () => {
    // JSX Element를 참조하는 객체일 떄
    // 참조객체.current는 현재 렌더링된 HTML요소
    // console.log(inputRef.current);
    // console.log(inputRef.current?.value);

    // current 객체가 있으면 == 렌더링된 HTML요소 있으면
    // current?.value == 입력박스의 입력값(string)

    // current 객체가 없으면 == 렌더링된 HTML요소 없음(렌더링 되기 전, null)
    // current?.value == undefined

    setUserName(inputRef.current?.value);

    // 값 비워주기
    // inputRef.current의 초기값은 null, current가 참조한 객체(input)에 값을 넣으면 값(string)이 생기고
    // 그 때 and 연산자의 원리에 따라 오른쪽 항을 반환 => 값을 비워줌
    inputRef.current && (inputRef.current.value = "");
  };

  console.log(inputRef.current); // current가 참조한 애가 누구냐 => input type="text"
  console.log(inputRef.current?.value); // currenr가 참조해서 입력받은 값이 뭐냐 => input type="text" 에 입력한 값

  return (
    <div>
      <h2>Hello</h2>
      {/* input text 박스를 inputRef=crrent객체가 참조하고있음 */}
      <input type='text' ref={inputRef} />
      <button
        onClick={() => {
          hello();
        }}
      >
        인사
      </button>
      {/* userName값이 있을 때(null, undefiend가 아닐 때) div출력 */}
      {userName && <div>안녕하세요, {userName}님 !</div>}
    </div>
  );
};

export default Hello;
