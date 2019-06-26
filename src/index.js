import React, { Component } from "react";
import ReactDOM from "react-dom";
import socketIOClient from "socket.io-client";
import { Spin, Icon } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./styles.css";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

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
          <p>The temperature in Florence is: {response} °F</p>
        ) : (
          <Spin indicator={antIcon} />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
