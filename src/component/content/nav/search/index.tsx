import React from "react";

import { UserOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";

import "./css/index.css";

interface searchItemType {
  value: string;
  label: JSX.Element;
}

const searchTitle = (title: string): JSX.Element => (
  <span>
    {title}
    <a
      style={{ float: "right" }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const searchItem = (title: string, count: number): searchItemType => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

const options = [
  {
    label: searchTitle("Libraries"),
    options: [
      searchItem("AntDesign", 10000),
      searchItem("AntDesign UI", 10600),
    ],
  },
  {
    label: searchTitle("Solutions"),
    options: [
      searchItem("AntDesign UI FAQ", 60100),
      searchItem("AntDesign FAQ", 30010),
    ],
  },
  {
    label: searchTitle("Articles"),
    options: [searchItem("AntDesign design language", 100000)],
  },
];

const SearchInput = (): JSX.Element => (
  <AutoComplete popupClassName="Search_Selet" options={options}>
    <Input.Search
      size="large"
      placeholder="搜索音乐"
      className="Search_Input"
    />
  </AutoComplete>
);

export { SearchInput };
