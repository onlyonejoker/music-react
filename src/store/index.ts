import { configureStore } from "@reduxjs/toolkit";
import loginModules from "./loginModules";

const store = configureStore({
  reducer: {
    login: loginModules,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
