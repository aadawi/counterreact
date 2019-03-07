import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

class AddDeveloper extends Component {
  state = { developerName: "" };

  setDeveloperName = e => {
    const developerName = e.target.value;
    this.setState({ developerName });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      console.log("do validate");
    }
  };

  handleShow = () => {
    const developerName = "";
    this.setState({ developerName });
    this.props.onShow;
  };
  render() {
    return (
      <React.Fragment>
        <Button
          variant="primary"
          className="align-middle"
          onClick={this.props.onShow}
        >
          Add new developer
        </Button>

        <Modal show={this.props.showWin} onHide={this.props.onCloseWin}>
          <Modal.Header closeButton>
            <Modal.Title>Add new developer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="modal-body">
              <p>
                <div class="input-group input-group-sm mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">
                      Name
                    </span>
                  </div>
                  <input
                    maxLength="100"
                    aria-describedby="inputGroup-sizing-sm"
                    aria-label="Name"
                    className="form-control"
                    onKeyPress={this.handleKeyPress}
                    onBlur={e => this.setDeveloperName(e)}
                  />
                </div>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => this.props.onDevAdd(this.state.developerName)}
            >
              Save Changes
            </Button>
            <Button variant="secondary" onClick={this.props.onCloseWin}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddDeveloper;
