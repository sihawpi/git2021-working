// 메인 화면
import Header from "./components/Header";
import Button from "./components/Button";
import Counter from "./components/Counter";
import Calculator from "./components/Calculator";
import generate from "@babel/generator";
import Generator from "./components/Generator";

// React == 컴포넌트 개발 라이브러리
function App() {
  return (
    // return안에 메인 페이지 화면(index.html)에 보여질 html코드를 react코드형식(jsx)으로 작성함
    // main container
    <div style={{ width: "500px", margin: "0 auto" }}>
      {/* JSX 내부에서 주석 달기 */}
      {/* JSX는 DOM 요소를 표현하기 위해 사용하는 React의 태그문법입니다. */}
      {/* 재사용하지 않는 컴포넌트 */}
      {/* <h1 style={{ color: "red" }}>Hello React with Typescript !</h1> */}

      {/* 속성값을 변경하여 재사용하는 컴포넌트 */}
      {/* Component의 속성(prop)을 넘김 */}
      {/* 속성명={속성값} 을 입력하면 속성을 넘길 수 있음*/}
      <Header color={"red"} title={"React"} />
      <Header color={"green"} title={"Typescript"} />
      <Header color={"blue"} title={"Function Component"} />
      
      {/* <Button color={"white"} backgroundColor={"red"} text={"add"} />
      <Button color={"white"} backgroundColor={"blue"} text={"delete"} /> */}

      <Button variant={"primary"} text={"Add"} />
      <Button variant={"secondary"} text={"Delete"} />
      <Button variant={"warning"} text={"copy"} />

      <Counter />
      <Calculator />
      <Generator />
    </div>
  );
}

// App.tsx 모듈의 기본 내보내기를 App 함수로 함
// 파일 이름과 exprot 함수 이름과 import한 객체(index.tsx에서 선언한)(?) 이름을 통일하는게 일반적.
export default App;
 