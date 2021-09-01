import React, { useRef, useState } from "react";

interface ContactState {
  id: number;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
}
const Contact = () => {
  const [inputList, setInputList] = useState<ContactState[]>([
    { id: 1, name: "강현수", phone: "11212112", email: "email" },
  ]);

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      console.log(e.code);
      if (e.code !== "Enter") return;
    }
    const inputs: ContactState = {
      id: inputList.length > 0 ? inputList[0].id + 1 : 1,
      name: nameRef.current?.value,
      phone: phoneRef.current?.value,
      email: emailRef.current?.value,
    };
    setInputList([inputs, ...inputList]);
    // 입력값 초기화
    // formRef.current가 존재하면 렌더링 돼있다는 말(=입력값이 있다는 말)
    formRef.current?.reset();
  };
  const del = (id: number) => {
    // inputList 데이터를 조작해서 삭제
    // 불변성 때문에 splice를 사용할 수 없음
    // 주로 filter 함수를 사용
    // filter 함수로 해당 id를 제외
    /* ** 삭제버튼 클릭 -> inputList배열의 각각 객체를 item으로 받아서 id 판별 
        -> 해당 id 데이터를 제외 후 새로운 배열로 반환 
        -> setInputList -> inputList 저장 */
    setInputList(inputList.filter((item) => item.id !== id));
  };
  return (
    <div style={{ width: "40vw" }} className='mx-auto'>
      <form
        ref={formRef}
        className='d-flex'
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={nameRef}
          type='text'
          className='form-control me-1'
          placeholder='이름'
        />

        <input
          ref={phoneRef}
          type='phone'
          className='form-control me-1'
          placeholder='전화번호'
        />

        <input
          ref={emailRef}
          type='email'
          className='form-control me-3'
          placeholder='이메일: email@test.com'
        />

        <button
          type='button'
          className='btn btn-outline-primary text-nowrap'
          onClick={() => {
            add(null);
          }}
        >
          추가
        </button>
      </form>
      <table style={{ width: "100%" }} className='table table-striped rows'>
        <thead>
          <tr>
            <th style={{ width: "10%" }}>#</th>
            <th>Name</th>
            <th>Phone-Call</th>
            <th style={{ width: "28%" }}>E-Mail</th>
            <th style={{ width: "10%" }}>작업</th>
          </tr>
        </thead>
        <tbody>
          {inputList.map((item) => {
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>
                <button
                  className='btn btn-outline-secondary btn-sm me-1'
                  onClick={() => {
                    del(item.id);
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Contact;
