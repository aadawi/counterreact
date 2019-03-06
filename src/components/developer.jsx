import React, { Component } from "react";
class Developer extends Component {
  state = {};

  doDelete = prop => {
    alert({ prop });
  };

  render() {
    return (
      <div>
        <button
          onClick={() => this.props.onDelete(this.props.developer.id)}
          className="btn btn-secondary btn-sm"
        >
          Delete
        </button>
        <span className="badge badge-pill badge-primary m-2">
          id# {this.props.developer.id}
        </span>
        <span className="badge badge-pill badge-primary">
          name: {this.props.developer.name}
        </span>
      </div>
    );
  }
}

export default Developer;
