import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Pagination from "react-bootstrap/Pagination";
class Employees extends Component {
  state = {
    products: [
      { id: 1, name: "a", price: 12 },
      { id: 2, name: "a", price: 12 },
      { id: 3, name: "a", price: 12 },
      { id: 4, name: "a", price: 12 }
    ],
    page: 0,
    sizePerPage: 2
  };

  handlePageChange(page, sizePerPage) {
    console.log(1);
    // this.fetchData(page, sizePerPage);
  }

  handleSizePerPageChange(sizePerPage) {
    console.log(2);
    // When changing the size per page always navigating to the first page
    // this.fetchData(1, sizePerPage);
  }

  render() {
    const cellEditProp = {
      mode: "click"
    };
    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizePerPageChange,
      page: this.state.page,
      sizePerPage: this.state.sizePerPage
    };

    return (
      <div className="table-margin">
        <BootstrapTable
          insertRow
          cellEdit={cellEditProp}
          data={this.state.products}
          striped
          className="table-responsive table-striped"
          hover
          pagination={true}
          options={options}
          remote
          margin-bottom="0rem"
        >
          <TableHeaderColumn isKey dataField="id" width="33%">
            Developer ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" width="33%">
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="price" width="33%">
            Mobile
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Employees;
