import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { url } from "inspector";
import { penguin } from "../../common/data";

// redux store(리덕스 저장소)에 하나의 state를 slice라고 함
// slice에는 state와 reduceer가 있음
// reducer는 state를 변경하는 함수

// 2. state 타입
export interface ProfileState {
  image: string | undefined;
  username: string | undefined;
}

// 2. state 초기 상태 선언
// slice state 초기값이니까 export할 필요 없음 바로 밑에서 쓸거임
const initialState: ProfileState = {
  image: penguin,
  username: "이름",
}

// 1. slice 생성
// slice를 만들고 store에 reducer와 state를 넣어주면 컴포넌트에서 
// 실제로 사용하는 것은 store에서 정한 state이름과 reducer이름이다
// store에 있는 state와 reducer가 무엇인지 slice에 작성하는것
 export const profileSlice = createSlice({
  name: "profile", // slice(state)의 이름  -> 얘는 어디다 쓰는거지..? 나중에 필요하다고 함
  // initialState: initialState, // 이 slice의 state초기값
  // 변수명과 속성명이 같아서 한번만 써도 됨.
  initialState, // state 초기값
  reducers: {
    // state 변경함수 목록
    // 함수명: (기존state변수명, action변수명) => {state 변경처리}
    // 세부 reducer명: (해당 state를 받는 변수, 액션타입)
    saveProfile: (state, action: PayloadAction<ProfileState>) => {
      const profile = action.payload; // 매개변수로 받은 데이터
      // immer가 내장 되어있음 따라서 state변수를 직접 제어함
      state.image = profile.image;
      state.username = profile.username;
    } 
  }, 
 })

// action creator 내보내기 -> 컴포넌트에서 사용하기 위함
// reducer 함수명에 맞는 acrion creator들을 createSlice할 때 자동으로 생성함

// action = {type: "...", payload: {...}}
// action.type: 처리할 액션의 종류를 나타내는 문자열
// action.payload: 처리할 데이터

// action creator는 action 객체를 생성하는 함수
// saveProfile(payload) => {type: "profile/saveProfile", payload} 

export const { saveProfile } = profileSlice.actions;

// slice.reducer
// == state변경함수를 여러개를 가지고있는 객체
// == reducer를 여러개 가지고 있는 객체
// reducer: {function..(), function..(), ... }

// 내보내기의 기본객체를 reducer로함
// profileSlice의 reducer를 넘기겠다 
// silce의 reducers를 다 넘기는거 => reducer가 reducers보다 큰 개념
export default profileSlice.reducer;
