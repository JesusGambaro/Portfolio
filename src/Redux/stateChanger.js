import {createSlice} from "@reduxjs/toolkit";

export const stateChanger = createSlice({
  name: "stateChanger",
  initialState: {
    animation: {
      visible: {opacity: 1, y: "0"},
      hidden: {opacity: 1, y: "-100%"},
    },
  },
  reducers: {
    scrollUp: (state, action) => {
      state.animation = {
        visible: {opacity: 1, y: "0"},
        hidden: {opacity: 1, y: "-100%"},
      };
    },
    scrollDown: (state, action) => {
      state.animation = {
        visible: {opacity: 1, y: "0"},
        hidden: {opacity: 1, y: "95%"},
      };
    },
  },
});
export const {scrollDown, scrollUp} = stateChanger.actions;
export default stateChanger.reducer;
