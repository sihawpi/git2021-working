import { configureStore } from "@reduxjs/toolkit";
// profileSlice에서 export한 reducer를 import하고 그 reducer에 이름을 붙임
import profileReducer from "../domain/profile/profileSlice_강현수"
import photoReducer from "../domain/photo/photoSlice"
// state: UI 처리 바뀌게 하는 변수
//  -> 모달 팝업상태(보이고, 안보이고), 연락처 목록상태(10개보이고, 5개보이고, 수정모드)

// global state(전역 상태) store 만들기
// global state: profile, todo, contact ... 여러개 state가 있음
// ** 이러한 state들은 다른 컴포넌트 와 state가 공유 됨
// store라는 store(global state)를 configureStore함수를 이용해서 만들고 exrport해줌
export const store = configureStore({
  // 각 state별로 처리할 reducer 목록
  reducer: {
    // state이름: reducer이름
    // profile state를 처리하는 reducer 등록
    // profileSlice에서 import한 reducer가 관리할 state의 이름을 정함
    // state이름은 내 맘대로 지어도 됨(다른데서 이 state를 사용할 때 사용함)
    profile: profileReducer,
    // photos state reducer
    photo: photoReducer,
  }, 
  devTools: true, // 개발툴 사용 여부ㅋ
});
  
// typescript에서는 몇가지 타입 선언을 해야함

// root state 타입 정의
// 가장 최상위 state
// state.profile, state.contact, ...
// getState함수의 리턴타입을 RootState로 하겠다.
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입 정의
// dispatch(dispatcher에 action객체(action type, payload)전달) 함수의 generic type
export type AppDispatch = typeof store.dispatch;