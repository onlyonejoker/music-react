import React, { useState, useEffect } from "react";
import { Avatar, Image } from "antd";
import { LoginModal } from "./loginModal";

import "./css/notLogin.css";

const NotLogin = (): JSX.Element => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const getIsLoginModalOpen = (value: boolean): void => {
    setIsLoginModalOpen(value);
  };
  const [IsSigninModalOpen, setIsSigninModalOpen] = useState(false);
  return (
    <div className="Not_Login">
      <div className="Click_Login">
        <Avatar
          src={
            <Image
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              style={{ width: 32 }}
            />
          }
        />
        <span
          onClick={() => {
            setIsLoginModalOpen(true);
          }}
        >
          登录
        </span>
        <LoginModal
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={getIsLoginModalOpen}
        ></LoginModal>
        <span
          onClick={() => {
            setIsSigninModalOpen(true);
          }}
        >
          注册
        </span>
      </div>
    </div>
  );
};

export { NotLogin };
