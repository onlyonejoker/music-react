import React, { useState } from "react";

import { Avatar, Image } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { setLoginState, setLoginInfo } from "@/store/loginModules";
import { RootState } from "@/store";

import { logout } from "@/request";

import "./css/isLogin.css";

const useActive = (): any => {
  const [active, setActive] = useState("Is_Login_menu");
  const onMouseEnter = (): void => {
    setActive("Is_Login_menu Is_Login_menu_active");
  };
  const onMouseLeave = (): void => {
    setActive("Is_Login_menu");
  };
  return { active, onMouseLeave, onMouseEnter };
};

const jsxMenu = (active: string): JSX.Element => {
  const loginStateDispatch = useDispatch();
  const loginInfoDispatch = useDispatch();
  const MenuItemData = [
    { context: "我的主页", click: () => {} },
    { context: "个人设置", click: () => {} },
    { context: "我的等级", click: () => {} },
    { context: "历史播放", click: () => {} },
    {
      context: "退出登录",
      click: async () => {
        const res = await logout();
        if (res.code === 200) {
          loginStateDispatch(setLoginState(false));
          loginInfoDispatch(setLoginInfo(null));
        }
      },
    },
  ];
  const MenuItem = MenuItemData.map((item, index) => (
    <li onClick={item.click} key={"Is_Login_menu" + index}>
      {item.context}
    </li>
  ));
  return (
    <div className={active}>
      <ul>{MenuItem}</ul>
    </div>
  );
};

const IsLogin = (): JSX.Element => {
  const loginInfo = useSelector((state: RootState) => state.login.loginInfo);
  const { active, onMouseLeave, onMouseEnter } = useActive();
  const Menu = jsxMenu(active);
  return (
    <div className="Is_Login">
      <div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
        <Avatar src={loginInfo?.profile?.avatarUrl} style={{ width: 32 }} />
        <span>{loginInfo.profile.nickname}</span>
        {Menu}
      </div>
    </div>
  );
};

export { IsLogin };
