import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import axios from "axios";
import Developers from "./components/developers";
import AddDeveloper from "./components/addDeveloper";
import Test from "./components/test";
import NotifierGenerator from "./components/notifierGenerator";

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
    alerts: []
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
    axios.get("https://curdama.herokuapp.com/test").then(res => {
      const persons = res.data;

      this.setState({ persons });
      console.log(persons.name);
      console.log(persons.age);
    });

    axios.get("https://curdama.herokuapp.com/api/developers/").then(res => {
      const developersDate = res.data;
      const developers = developersDate._embedded.developers;
      console.log(">>>>>>>>>>>>" + developers);
      this.setState({ developers });
    });
  }

  handleAddDev = devName => {
    if (devName === null || devName === "") {
      const newAlert = {
        id: new Date().getTime(),
        type: "danger",
        headline: "Error ",
        message: "Are you kidding developer name can not be null "
      };

      const alerts = [...this.state.alerts, newAlert];
      this.setState({ alerts });
      return;
    }

    const newAlert = {
      id: new Date().getTime(),
      type: "info",
      headline: "New member aboard",
      message:
        "Hola there is new developer in the house please say welcome to: " +
        devName
    };

    const alerts = [...this.state.alerts, newAlert];
    this.setState({ alerts });

    console.log(devName);
    axios
      .post("https://curdama.herokuapp.com/api/developers", { name: devName })
      .then(res => {
        console.log(">>" + res);
        const show = false;
        this.setState({ show });
        axios.get("https://curdama.herokuapp.com/api/developers/").then(res => {
          const developersDate = res.data;
          const developers = developersDate._embedded.developers;
          console.log(">>>>>>>>>>>>" + developers);
          this.setState({ developers });
        });
      });
  };

  handleDevDelete = devId => {
    console.log("handle delete", devId);
    axios
      .delete("https://curdama.herokuapp.com/api/developers/" + devId)
      .then(res => {
        axios.get("https://curdama.herokuapp.com/api/developers/").then(res => {
          const developersDate = res.data;
          const developers = developersDate._embedded.developers;
          console.log(">>>>>>>>>>>>" + developers);
          this.setState({ developers });
        });
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

  handleAdd = () => {
    const newAlert = {
      id: new Date().getTime(),
      type: "info",
      headline: "error",
      message: "This test 2"
    };

    const alerts = [...this.state.alerts, newAlert];
    this.setState({ alerts });
    console.log(this.state.alerts);

    console.log(">>>>>>>>>>>>>> ADD");
    axios
      .post("https://curdama.herokuapp.com/api/developers", { name: "ahmad" })
      .then(res => {
        console.log(">>" + res);
        const show = false;
        this.setState({ show });
        axios.get("https://curdama.herokuapp.com/api/developers/").then(res => {
          const developersDate = res.data;
          const developers = developersDate._embedded.developers;
          console.log(">>>>>>>>>>>>" + developers);
          this.setState({ developers });
        });
      });
  };

  handleShow = () => {
    console.log(">>>> SHOW");
    this.setState({ show: true });
  };

  handleCloseWin = () => {
    console.log(">>>> CLOSE");
    const show = false;
    this.setState({ show });
  };

  render() {
    return (
      <React.Fragment>
        <div class="container-fluid">
          <NavBar
            totalCounters={this.state.counters.filter(c => c.value > 0).length}
            persons={this.state.persons}
            developers={this.state.developers}
          />
          <main className="container">
            {/* <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
          /> */}
            <Developers
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
          />
          <div>
            <NotifierGenerator
              type="danger"
              headline="Error"
              alerts={this.state.alerts}
              newMessage="Developer name must be filled"
              onAlertDismissed={this.onAlertDismissed}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
