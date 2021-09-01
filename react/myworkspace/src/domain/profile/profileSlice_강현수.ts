import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { penguin } from "../../common/data";

// redux store(리덕스 저장소)에 하나의 state를 slice라고 함
// slice에는 state와 reduceer가 있음
// reducer는 state를 변경하는 함수

// state 타입
// export한다는건 어디선가 이 state타입을 사용
export interface ProfileState {
  image: string | undefined;
  username: string | undefined;
}

// state 초기 상태 선언
const initialState: ProfileState = {
  image: penguin,
  username: "이름",
}

// slice 생성
export const profileSlice = createSlice({
  name: "profile", // slice(state)의 이름
  // initialState: initialState, // 이 slice의 state초기값
  // 변수명과 속성명이 같아서 한번만 써도 됨.
  initialState, // state 초기값
  reducers: {
    // state 변경함수 목록
    // 함수명: (기존state변수명, action변수명) => {state 변경처리}
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
export default profileSlice.reducer;
