import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


const elementObj = {
  PROCESSED: [
    { color: { true: "red", false: "" }, content: "Uncheck" },
    { color: { true: "red", false: "" }, content: "Wait Archives Group Check" },
    {
      color: { true: "red", false: "" },
      content: "Wait Risk Management Group Check",
    },
    { color: { true: "red", false: "" }, content: "Check" },
  ],
  DATA_UNMATCH: [
    null,
    null,
    null,
    null,
    { color: { true: "red", false: "" }, content: "Wait Archives Group Check" },
    { color: { true: "red", false: "" }, content: "Check" },
  ],
};
const colorObj = {
  PROCESSED: [
    filesOperate || riskOperate,
    filesOperate,
    riskOperate,
    operateOperate,
  ],
  DATA_UNMATCH: [false, false, false, false, filesOperate, brokerOperate],
};
const colorFlag1 = colorObj[recorder.state] || [];
const colorFlag = colorFlag1[val] || false;

const elementFlag = elementObj[recorder.state] || [
  { color: { true: "", false: "" }, content: "" },
];
const { color, content } = elementFlag[val] || {
  color: { true: "", false: "" },
  content: "-",
};

return <span style={{ color: color[colorFlag] }}>{content}</span>;
