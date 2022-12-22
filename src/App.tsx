import React from "react";
import { Layout } from "antd";
import { Nav } from "@/component/content/nav";

import { loginState } from "@/request/index";

import { useDispatch } from "react-redux";
import { setLoginState, setLoginInfo } from "@/store/loginModules";

import "@/assets/css/App.css";

const { Header, Footer, Content } = Layout;

const useLoginState = (): void => {
  const dispatch = useDispatch();
  (async () => {
    const loginInfo = await loginState();
    if (loginInfo?.profile as boolean) {
      dispatch(setLoginState(true));
      dispatch(setLoginInfo(loginInfo));
    }
  })();
};

function App(): JSX.Element {
  useLoginState();
  return (
    <div className="App">
      <Layout className="App_Layout">
        <Header className="App_Header">
          <Nav></Nav>
        </Header>
        <Content className="App_Content">Content</Content>
        <Footer className="App_Footer">Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
