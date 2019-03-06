import React, { Component } from "react";
import Developer from "./developer";
import axios from "axios";

class Developers extends Component {
  state = {};

  render() {
    const { developers } = this.props;

    return (
      <div>
        {developers.map(dev => (
          <Developer
            developer={dev}
            onDelete={this.props.onDelete}
            key={dev.id}
          />
        ))}
      </div>
    );
  }
}

export default Developers;
