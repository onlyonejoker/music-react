import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/store";

import { Col, Row } from "antd";
import { SearchInput } from "./search";
import { Login } from "./login";

import "./css/index.css";

const Nav = (): JSX.Element => {
  const isLogin = useSelector((state: RootState) => state.login.loginState);
  return (
    <div className="Nav">
      <Row className="Nav_Row">
        <Col span={8} className="Nav_Col">
          <p></p>
          <h1>某抑云音乐</h1>
        </Col>
        <Col span={8} className="Nav_Col">
          <SearchInput></SearchInput>
        </Col>
        <Col span={8} className="Nav_Col">
          <Login isLogin={isLogin}></Login>
        </Col>
        <div></div>
      </Row>
    </div>
  );
};

export { Nav };
