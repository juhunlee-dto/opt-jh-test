import React, { Component } from "react";
import MainPage from "./components/main";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer
          draggable={false}
          transition={Zoom}
          autoClose={5000}
        ></ToastContainer>
        <MainPage></MainPage>
      </React.Fragment>
    );
  }
}

export default App;
