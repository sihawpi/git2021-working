import Header from "../components/Header";
import Button from "../components/Button";

const Components = () => {
  return (
    <div>
      {/* JSX 내부에서 주석 달기 */}
      {/* JSX는 DOM 요소를 표현하기 위해 사용하는 React의 태그문법입니다. */}
      {/* 재사용하지 않는 컴포넌트 */}
      {/* <h1 style={{ color: "red" }}>Hello React with Typescript !</h1> */}

      {/* 속성값을 변경하여 재사용하는 컴포넌트 */}
      {/* Component의 속성(prop)을 넘김 */}
      {/* 속성명={속성값} 을 입력하면 속성을 넘길 수 있음*/}
      <Header color={"red"} text={"React"} />
      <Header color={"green"} text={"Typescript"} />
      <Header color={"blue"} text={"Function Component"} />

      <Button variant={"primary"} text={"Add"} />
      <Button variant={"secondary"} text={"Delete"} />
      <Button variant={"warning"} text={"copy"} />
    </div>
  );
};

export default Components;
