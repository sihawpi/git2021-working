import { useRef, useState } from "react";
import Alert from "../../components/Alert";

import produce from "immer";

// todoList 각각에 대한 타입
interface TodoState {
  id: number; // TodoList index 번호
  memo: string | undefined; // input 입력값
  createTime: number; // 생성시간
  modifyTime?: number; // 수정일자
  isEdit?: boolean;
}

// list생성한 날짜 + 시간
const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const TodoReview = () => {
  //  Todolist에 대한 state
  //  todo목록을 갖고있는 스테이트
  const [todoList, setTodoList] = useState<TodoState[]>([
    { id: 2, memo: "Typescript", createTime: new Date().getTime() },
    { id: 1, memo: "React State 연습", createTime: new Date().getTime() },
  ]);

  // input값(formRef)에 따라 에러 alert제어 state,
  // 뭔가를 띄우고 안띄우고 제어할 때 state를 만들어 true,false값으로 제어함 = 조건부 렌더링
  const [isError, setIsError] = useState(false);

  // input 엘리먼트의 참조를 받아옴
  const inputRef = useRef<HTMLInputElement>(null);
  // form 엘리먼트의 참조를 받아옴
  const formRef = useRef<HTMLFormElement>(null);
  // ul 엘리먼트 참조
  const ulRef = useRef<HTMLUListElement>(null);

  // event는 keyboard에 관한 변수이고 ... 아직 이해 안됨
  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      console.log(e.code);
      if (e.code !== "Enter") return;
    }
    // 입력값이 없으면 setIsError = true -> 에러 alert 뜸
    if (!inputRef.current?.value) {
      setIsError(true);
      return;
    }
    // todo라는 변수에 TodoState데이터를 저장
    const todo: TodoState = {
      // id= todoList배열 요소가 있으면 todoList의 새 요소가 생길때 id + 1을 함 : 배열 요소가 없으면 처음 생긴 요소의 id = 1
      id: todoList.length > 0 ? todoList[0].id + 1 : 1,
      // optional chaing
      // inputRef.current?.value가 null일 때는 undifiedn, 값이 있을 때는 값을 반환
      // 받아온 참조값을 memo에 저장
      memo: inputRef.current?.value,
      createTime: new Date().getTime(),
    };
    // setTodoList=[{todo에 저장한 데이터}, {기존todoList}]
    // setTodoList([todo, ...todoList]);

    // immer
    // 현재state -> 곧(초안), 변경될state -> 다음,바뀐 state
    // current state -> draft state(조작할 거) -> next state
    // 매개변수로 들어오는 객체는 todoList
    setTodoList(
      // produce(([draft state 변수]) => {draft state 변수 조작})
      // 변경된 state(next state) 반환
      produce((state) => {
        state.unshift(todo);
      })
    );

    // 입력값 초기화
    // formRef.current가 존재하면 렌더링 돼있다는 말(=입력값이 있다는 말)
    formRef.current?.reset();

    // 에러 메시지 안띄움 : 위에 setIsError if문을 타지 않을 때, 기본
    setIsError(false);
  };

  // 삭제할 태그를 판단하기 위해 id를 넘김
  const del = (id: number, index: number) => {
    // TodoList의 데이터를 조작해서 삭제
    // 불변성 때문에 splice를 사용할 수 없음
    // 주로 filter 함수를 사용
    // filter 함수로 해당 id를 제외
    /* ** 삭제버튼 클릭 -> TodoList배열의 각각 객체를 list로 받아서 id 판별 
        -> 해당 id 데이터를 제외 후 새로운 배열로 반환 
        -> setTodoList -> todoList의 저장 */
    // setTodoList(todoList.filter((list) => list.id !== id));

    // immer
    // setTodoList(
    //   produce((state) => {
    //     // id로 해당 item 찾음
    //     const item = state.find((item) => item.id === id);
    //     //  item이 undifiend가 될 수 있기 때문에 if문을 사용해서 item이 있을 때
    //     if (item) {
    //       // 해당 item의 index로 배열에서 삭제
    //       state.splice(state.indexOf(item), 1);
    //     }
    //   })
    // );

    // immer로 state배열 직접 조작(index로 삭제)
    setTodoList(
      produce((state) => {
        state.splice(index, 1);
      })
    );
  };

  const edit = (id: number, mod: boolean) => {
    // 해당 id에 해당하는 list만 edit 모드로 변경함
    // 해당 list의 속성을 변경한 후 변경된 list을 반환
    // 복습 필요
    // setTodoList(
    //   todoList.map((item) => {
    //     if (item.id === id) {
    //       item.isEdit = mod;
    //     }
    //     return item;
    //   })
    // );

    //  immer
    setTodoList(
      produce((state) => {
        const item = state.find((item) => item.id === id);
        if (item) {
          // mod는 함수 실행시 넘어옴
          item.isEdit = mod;
        }
      })
    );
  };

  const save = (id: number, index: number) => {
    const input = ulRef.current
      ?.querySelectorAll("input")
      [index].querySelector("input");
    // setTodoList(
    //   todoList.map((list) => {
    //     // 해당 id의 item값을 변경
    //     // 아직 이해 안됨
    //     if (list.id === id) {
    //       list.memo = input?.value;
    //       list.modifyTime = new Date().getDate();
    //       list.isEdit = false;
    //     }
    //     return list;
    //   })
    // );

    // immer
    setTodoList(
      produce((state) => {
        // 해당 id의 데이터 꺼내오기
        const item = state.find((item) => item.id === id);
        if (item) {
          item.memo = input?.value;
          item.modifyTime = new Date().getDate();
          item.isEdit = false;
        }
      })
    );
  };
  return (
    <div style={{ width: "40vw" }} className='mx-auto'>
      <h2 className='text-center my-5'>할 일 관리</h2>
      {/* form에 ref를 formRef에 참조값을 넘겨줌 */}
      <form
        className='d-flex'
        ref={formRef}
        /* 
           e.preventDefault() 
           - 기본이벤트 작업을 처리하지 않음 -> 폼태그 안의 입력요소를 현재 페이지로 제출(깜빡이면서 데이터 초기화)하지 않음 
           - submit form 
        */
        onSubmit={(e) => e.preventDefault()}
      >
        {/*  입력 예시를 보여줌  */}
        {/* input박스에 입력값을 넣으려면 ref객체 필요 */}
        <input
          type='text'
          className='form-control me-2'
          placeholder='할 일 ...'
          // ref를 걸어서 inputRef에 참조값을 넘겨줌
          ref={inputRef}
          onKeyPress={(e) => {
            add(e);
          }}
        />
        <button
          type='button'
          className='btn btn-primary text-nowrap'
          // 클릭시 add()함수 실행
          // onClick을 해도 태그에 속성으로 click이 생기는게 아님. eventListeners로 생성됨
          onClick={() => {
            add(null);
          }}
        >
          추가
        </button>
      </form>
      {/* 빈값을 넣었을 때 alert띄우기 */}
      {/* isError가 true이면 Alert창 띄움 */}
      {isError && (
        <Alert
          // Alert창 의 message,variant 매개변수에 원하는 값을 넣음
          message={"내용을 입력해주세요."}
          variant={"danger"}
          // 닫기 버튼을 클릭할 때 처리하는 함수를 통째로 넘김
          // onClose={() => {
          //   setIsError(false);
          // }}
        />
      )}

      <ul id='ul-list' className='list-group list-group-flush mt-3' ref={ulRef}>
        {/* todoList = [todo, ...todoList]  입력한 값이 없거나, 값을 다 삭제했을 때 */}
        {todoList.length === 0 && (
          <li className='list-group'>데이터가 없습니다.</li>
        )}
        {/* 데이터와 ui요소 바인딩 */}
        {/* todoList배열 요소에 각각 map함수가 실행되고 배열요소는 item(매개변수-내맘 대로 설정)에 저장되어 반환 */}
        {/* 반환될 때 map의 실행결과를 item에 반영 */}
        {todoList.map((item, index) => (
          // map실행결과
          // setTodoList([todo, ...todoList]); 이 배열구조가 li형식으로 변환됨 가장 최근에 입력한 값(todo)이 최상단에 뜸
          <li className='list-group-item d-flex' key={item.id}>
            <div className='w-100'>
              {/* ------수정 X------- */}
              {/* input text에 적은 값을 출력 */}
              {!item.isEdit && <span className='me-1'>{item.memo}</span>}
              {/* 생성시간*/}
              {!item.isEdit && (
                <span className='me-1' style={{ fontSize: "0.8rem" }}>
                  -{" "}
                  {/* getTimeString함수의 매개변수로 TodoState를 받음? 아직 이해 안됨 */}
                  {getTimeString(
                    item.modifyTime ? item.modifyTime : item.createTime
                  )}
                </span>
              )}
              {/* ------수정 X------ */}

              {/* 수정모드일 때 li의 content를 input으로 함 */}
              {item.isEdit && (
                <input type='text' className='w-100' defaultValue={item.memo} />
              )}
            </div>

            {/* ------수정 아닐 때------- */}
            {!item.isEdit && (
              <button
                className='btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap'
                onClick={() => {
                  // 클릭시 수정모드로 바뀜
                  edit(item.id, true);
                }}
              >
                수정
              </button>
            )}
            {!item.isEdit && (
              <button
                className='btn btn-outline-secondary btn-sm me-1 text-nowrap'
                onClick={() => {
                  // 태그에 직접 관여할 수 없고 데이터 제어를 통해 삭제를 해야함.
                  // -> 클릭한 애를 판단 할 수 있게 id값을 넘김 => 해당 id의 데이터를 삭제
                  del(item.id, index);
                }}
              >
                삭제
              </button>
            )}
            {/* ------수정 아닐 때------- */}

            {/* ------수정모드------- */}
            {item.isEdit && (
              // 프래그먼트 태그로 여러 태그를 한번에 isEdit검사
              <>
                <button
                  className='btn btn-outline-secondary btn-sm ms-2 text-nowrap'
                  onClick={() => {
                    save(item.id, index);
                  }}
                >
                  저장
                </button>
                )
                <button
                  className='btn btn-outline-secondary btn-sm ms-1 text-nowrap'
                  onClick={() => {
                    // 클릭시 수정모드 종료
                    edit(item.id, false);
                  }}
                >
                  취소
                </button>
              </>
              // { ------수정모드------- }
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoReview;
