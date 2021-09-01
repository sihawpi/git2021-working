import { createSlice } from "@reduxjs/toolkit";
import { penguin } from "../../common/data";

interface PhotoItem {
  id: number;
  title: string;
  decription?: string;
  photoUrl: string;
}

interface Photo {
  data: PhotoItem[]; // 포토 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아온지에 대한 정보
}

const initialState: Photo = {
  data: [
    { id: 1, title: "펭귄이", decription: "dlswjd", photoUrl: penguin },
    { id: 1, title: "펭귄이", decription: "dlswjd", photoUrl: penguin },
    { id: 1, title: "펭귄이", decription: "dlswjd", photoUrl: penguin },
  ],
  isFetched: false,
};

const photoSlice = createSlice({
  name: "photo",
  initialState: {},
  reducers: {},
});

export default photoSlice.reducer;
