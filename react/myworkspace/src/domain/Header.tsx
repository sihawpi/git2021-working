// 컴포넌트 정의
// 리액트 컴포넌트 = JSX를 반환하는 함수
// <></>: Fragment(조각)
// 어떤 태그형식으로 변환되지 않음, 빈 태그

import { cpuUsage } from "process";

// 컴포넌트에 속성으로 color, title을 받을 것임
// 컴포넌트의 속성(prop): 함수의 매개변수처럼 외부에서 넘겨받는 변수

interface HeaderProp {
  // color: string;
  // union type: 값의 집합 -> prop의 범위를 정할 수 있음
  color: "green" | "red" | "blue";
  text: string;
}

// 화살표함수형 컴포넌트는 React.FC (functional Component의 약자) 타입을 지정
// const 함수명 : React.FC<속성타입(generic)> = ({ 속성1(property1), 속성2 }) => {
//
// }
const Headers: React.FC<HeaderProp> = ({ color, text }) => {
  // const Header = ({ color, title }: HeaderProp) => {
  return <h1 style={{ color: color }}>{text}</h1>;
  // return <></><div></div>;  // 여러개의 부모 엘리먼트를 반환하지 못함
};

// 컴포넌트 내보내기
export default Headers;
