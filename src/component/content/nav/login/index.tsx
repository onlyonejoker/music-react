import React from "react";

import { IsLogin } from "./isLogin";
import { NotLogin } from "./notLogin";

interface propType {
  isLogin: boolean;
}

const Login = (prop: propType): JSX.Element => {
  return prop.isLogin ? <IsLogin></IsLogin> : <NotLogin></NotLogin>;
};

export { Login };
