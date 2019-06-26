import React, { Component } from "react";
import ReactDOM from "react-dom";
import socketIOClient from "socket.io-client";
import { Progress } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("update", data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response ? (
          <Progress type="circle" percent={response} />
        ) : (
          <Progress type="circle" percent={0} />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
