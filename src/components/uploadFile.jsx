import React, { Component } from "react";
import { toast } from "react-toastify";

class UploadFile extends Component {
  state = {
    fileName: "Select OBJ Model File...",
  };

  handleChange = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    if (file === undefined) {
      toast.dismiss();
      toast.error("Invalid file!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    this.setState({
      fileName: file.name,
    });

    toast.info("Loading OBJ Model...", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 10000,
      closeOnClick: false,
    });

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      const result = reader.result;
      this.props.handleDataFromFile(result);
    }.bind(this);
  };

  render() {
    return (
      <div className="input-group mb-3">
        <div className="custom-file">
          <input
            type="file"
            accept=".obj"
            className="custom-file-input"
            id="inputGroupFile"
            onChange={this.handleChange.bind(this)}
          ></input>
          <label
            className="custom-file-label"
            htmlFor="inputGroupFile"
            data-browse="Browse"
          >
            {this.state.fileName}
          </label>
        </div>
      </div>
    );
  }
}

export default UploadFile;
