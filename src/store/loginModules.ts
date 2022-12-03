import { createSlice } from "@reduxjs/toolkit";

export const loginModules = createSlice({
  name: "loginModules",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// reducer方法的每一个case都会生成一个Action
export const { increment, decrement, incrementByAmount } = loginModules.actions;

export default loginModules.reducer;
