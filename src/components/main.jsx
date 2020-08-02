import React, { Component } from "react";
import ThreeScene from "./threeScene";
import UploadFile from "./uploadFile";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  loadDataFromFile = (data) => {
    this.setState({
      data: data,
    });
  };

  render() {
    return (
      <React.Fragment>
        <ThreeScene dataFromFile={this.state.data}></ThreeScene>
        <UploadFile
          handleDataFromFile={this.loadDataFromFile.bind(this)}
        ></UploadFile>
      </React.Fragment>
    );
  }
}

export default MainPage;
