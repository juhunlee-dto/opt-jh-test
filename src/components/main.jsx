import React, { Component } from "react";
import ThreeScene from "./threeScene";
import UploadFile from "./uploadFile";
import { SliderPicker } from "react-color";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      color: "#e6b3b3",
    };
  }

  setDataFromFile = (data) => {
    this.setState({
      data: data,
    });
  };

  setColorFromUI = (color) => {
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <React.Fragment>
        <ThreeScene
          dataFromFile={this.state.data}
          diffuseColor={this.state.color}
        ></ThreeScene>
        <UploadFile
          className="file-picker"
          handleDataFromFile={this.setDataFromFile.bind(this)}
        ></UploadFile>
        <SliderPicker
          className="color-picker"
          color={this.state.color}
          onChangeComplete={this.setColorFromUI.bind(this)}
        ></SliderPicker>
      </React.Fragment>
    );
  }
}

export default MainPage;
