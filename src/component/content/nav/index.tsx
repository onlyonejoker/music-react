import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement, incrementByAmount } from "@/store/loginModules";
// import { RootState } from "@/store";
import { Col, Row } from "antd";
import { SearchInput } from "./search";
import { IsLogin, NotLogin } from "./login";

import "./css/index.css";

const Nav = (): JSX.Element => {
  const [isLogin] = useState(false);
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
          {isLogin ? <IsLogin></IsLogin> : <NotLogin></NotLogin>}
        </Col>
        <div></div>
      </Row>
    </div>
  );
};

export { Nav };
