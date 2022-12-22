import { createSlice } from "@reduxjs/toolkit";

export const loginModules = createSlice({
  name: "loginModules",
  initialState: {
    loginState: false,
    loginInfo: null as any,
  },
  reducers: {
    setLoginState: (state, action) => {
      state.loginState = action.payload;
    },
    setLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
    },
  },
});

// reducer方法的每一个case都会生成一个Action
export const { setLoginState, setLoginInfo } = loginModules.actions;

export default loginModules.reducer;
