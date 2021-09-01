import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../domain/profile/profileSlice_강현수";
import photoReducer from "../domain/photo/photoSlice"
// state: UI 처리 바뀌게 하는 변수
//  -> 모달 팝업상태(보이고, 안보이고), 연락처 목록상태(10개보이고, 5개보이고, 수정모드)

// global state(전역 상태) store 만들기
// global state: profile, todo, contact ... 여러개 state가 있음
// ** 이러한 state들은 다른 컴포넌트 와 state가 공유 됨
export const store = configureStore({
  // 각 state별로 처리할 reducer 목록
  reducer: {
    // state이름: reducer이름
    // profile state를 처리하는 reducer 등록
    profile: profileReducer,
    // photos state reducer
    photo: photoReducer,
  }, // 각 state별로 처리할 reducer 목록
  devTools: true, // 개발툴 사용 여부
});
  
// typescript에서는 몇가지 타입 선언을 해야함

// root state 타입 정의
// 가장 최상위 state
// state.profile, state.contact, ...
export type RootState = ReturnType<typeof store.getState>;

// dispatch 타입 정의
// dispatch 함수의 generic type
export type AppDispatch = typeof store.dispatch;