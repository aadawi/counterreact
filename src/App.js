import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import NotifierGenerator from "./components/notifierGenerator";
import "font-awesome/css/font-awesome.min.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import {
  BootstrapTable,
  TableHeaderColumn,
  pagination
} from "react-bootstrap-table";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ],
    persons: {
      age: "",
      name: ""
    },
    developers: [],
    show: false,
    alerts: [],
    serverUlr: "https://curdama.herokuapp.com"
    //https://curdama.herokuapp.com
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
    // this.setState({ value: this.state.value + 1 });
  };

  handleDelete = counterId => {
    console.log("handle delete", counterId);
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  componentDidMount() {
    const testUrl = this.state.serverUlr + "/test";
    axios.get(testUrl).then(res => {
      const persons = res.data;

      this.setState({ persons });
      console.log(persons.name);
      console.log(persons.age);
    });

    const url = this.state.serverUlr + "/api/developers?page=0&size=100";

    axios.get(url).then(res => {
      const developersDate = res.data;
      const developers = developersDate._embedded.developers;
      console.log(">>>>>>>>>>>>" + developers);
      this.setState({ developers });
    });
  }

  handleAddDev = devName => {
    if (devName === null || devName === "") {
      this.showErrorMessage(
        "Are you kidding developer name can not be null ",
        "Error"
      );
      return false;
    }

    const url = this.state.serverUlr + "/api/developers";
    axios
      .post(
        url,
        { name: devName },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers":
              "Origin, Authorization, Accept, Content-Type"
          }
        }
      )
      .then(res => {
        console.log(res);

        const show = false;
        this.setState({ show });
        this.refreshDevelopersList();
        this.showMessage(
          "Hola there is new developer in the house please say welcome to " +
            devName,
          "info",
          "New Member Aboard"
        );
      })
      .catch(err => {
        this.showErrorMessage(err.message, "Error developer not added");
        return false;
      });
  };

  handleDevDelete = devId => {
    console.log("handle delete", devId);
    const url = this.state.serverUlr + "/api/developers" + devId;
    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        const newAlert = {
          id: new Date().getTime(),
          type: "info",
          headline: "Time to say goodbye",
          message: "User deleted"
        };

        const alerts = [...this.state.alerts, newAlert];
        this.setState({ alerts });
      });
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  onAlertDismissed = alert => {
    const alerts = this.state.alerts;
    // find the index of the alert that was dismissed
    const idx = alerts.indexOf(alert);
    if (idx >= 0) {
      this.setState({
        // remove the alert from the array
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
      });
    }
  };

  refreshDevelopersList = () => {
    axios
      .get(this.state.serverUlr + "/api/developers?page=0&size=100")
      .then(res => {
        const developersDate = res.data;
        const developers = developersDate._embedded.developers;
        this.setState({ developers });
      });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleCloseWin = () => {
    const show = false;
    this.setState({ show });
  };

  onBeforeInsertRow = row => {
    console.log(row.name);
    this.handleAddDev(row.name);
  };

  onBeforeDeleteRow = rowKeys => {
    alert(1);
    return true;
  };

  onAfterDeleteRow = rowKeys => {
    const url = this.state.serverUlr + "/api/developers/" + rowKeys;

    axios.delete(url).then(res => {
      console.log(">>" + res);
    });
    return true;
  };

  onAfterSaveCell(row, cellName, cellValue) {
    this.refreshDevelopersList();
    console.log(row);
    console.log(row.id);
    console.log(row.name);
    return true;
  }

  showErrorMessage(message, headline) {
    const newAlert = {
      id: new Date().getTime(),
      type: "danger",
      headline: headline,
      message: message
    };
    const alerts = [...this.state.alerts, newAlert];
    this.setState({ alerts });
  }

  showMessage(message, type, headline) {
    const newAlert = {
      id: new Date().getTime(),
      type: type,
      headline: headline,
      message: message
    };
    const alerts = [...this.state.alerts, newAlert];
    this.setState({ alerts });
  }

  onBeforeSaveCell = (row, cellName, cellValue) => {
    if (cellValue === null || cellValue === "") {
      this.showMessage(
        "Are you kidding developer name can not be null ",
        "danger",
        "Error"
      );
      return false;
    }

    const url = this.state.serverUlr + "/api/developers/" + row.id;
    axios.put(url, { name: cellValue }).then(res => {
      this.showMessage("User updated successfully", "info", "Update");
    });
    return true;
  };

  nameValidator(value, row) {
    if (value == null) {
      return "Developer name can not be null";
    }
    return true;
  }
  jobStatusValidator(value) {
    if (value == null) {
      return "Job Status must be a integer!";
    }
    return true;
  }

  render() {
    const cellEditProp = {
      mode: "dbclick",
      blurToEscape: true,
      beforeSaveCell: this.onBeforeSaveCell,
      afterSaveCell: this.onAfterSaveCell
    };

    const options = {
      afterDeleteRow: this.onAfterDeleteRow,
      beforeDeleteRow: this.onBeforeDeleteRow,
      beforeInsertRow: this.onBeforeInsertRow
    };

    const selectRowProp = {
      mode: "radio"
    };

    return (
      <React.Fragment>
        <div className="main-dev-margin">
          {/*<Employees />
          <NavBar
            totalCounters={this.state.counters.filter(c => c.value > 0).length}
            persons={this.state.persons}
            developers={this.state.developers}
          />
          <main className="container">
            { <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
          /> }
            { <Developers
              developers={this.state.developers}
              onDelete={this.handleDevDelete}
            /> 

            <Test />
          </main>
          <AddDeveloper
            onCloseWin={this.handleCloseWin}
            onShow={this.handleShow}
            showWin={this.state.show}
            onDevAdd={this.handleAddDev}
          />*/}
          <div>
            <NotifierGenerator
              type="danger"
              headline="Error"
              alerts={this.state.alerts}
              newMessage="Developer name must be filled"
              onAlertDismissed={this.onAlertDismissed}
            />
          </div>

          <BootstrapTable
            data={this.state.developers}
            options={options}
            striped
            search={true}
            hover
            deleteRow={true}
            insertRow={true}
            cellEdit={cellEditProp}
            selectRow={selectRowProp}
            pagination
          >
            <TableHeaderColumn
              hiddenOnInsert
              autoValue
              isKey
              dataField="id"
              cellEdit={false}
            >
              Developer Id
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="name"
              editable={{ type: "text", validator: this.jobStatusValidator }}
            >
              Developer Name
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
