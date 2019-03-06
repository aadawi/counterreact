import React, { Component } from "react";

// Stateless Functional Componenet
const NavBar = ({ totalCounters, persons, developers }) => {
  return (
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">
        Navbar{" "}
        <span className="badge badge-pill badge-secondary m-2">
          {totalCounters}
        </span>
        name:{" "}
        <span className="badge badge-pill badge-secondary m-2">
          {persons.name}
        </span>
        age:{" "}
        <span className="badge badge-pill badge-secondary m-2">
          {persons.age}
        </span>
      </a>
    </nav>
  );
};

// class NavBar extends Component {
//   render() {
//     return (
//       <nav class="navbar navbar-light bg-light">
//         <a class="navbar-brand" href="#">
//           Navbar{" "}
//           <span className="badge badge-pill badge-secondary">
//             {this.props.totalCounters}
//           </span>
//         </a>
//       </nav>
//     );
//   }
// }

export default NavBar;
