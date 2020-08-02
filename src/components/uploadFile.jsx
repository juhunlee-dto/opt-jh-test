import React, { Component } from "react";

class UploadFile extends Component {
  state = {
    fileName: "Select OBJ Model File...",
  };

  handleChange = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    this.setState({
      fileName: file.name,
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
