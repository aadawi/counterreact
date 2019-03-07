import React, { Component } from "react";
class Developer extends Component {
  state = {};

  doDelete = prop => {
    alert({ prop });
  };

  render() {
    return (
      <tr>
        <th scope="row">{this.props.developer.id}</th>
        <td>{this.props.developer.name}</td>
        <td>
          <button
            onClick={() => this.props.onDelete(this.props.developer.id)}
            className="btn btn-secondary btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Developer;
