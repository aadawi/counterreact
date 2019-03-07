import React, { Component } from "react";
import Developer from "./developer";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

import { Button } from "react-bootstrap";

class Developers extends Component {
  render() {
    const { developers } = this.props;

    return (
      <table className="table  table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {developers.map(dev => (
            <Developer
              developer={dev}
              onDelete={this.props.onDelete}
              key={dev.id}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default Developers;
