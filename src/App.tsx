import React from "react";
import { Layout } from "antd";
import { Nav } from "@/component/content/nav";

import "@/assets/css/App.css";

const { Header, Footer, Content } = Layout;

function App(): JSX.Element {
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
