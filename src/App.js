import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import axios from "axios";
import Developers from "./components/developers";

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
    developers: [{ name: "test", id: 1 }]
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
    console.log("handle delete >>>>>>>>>>>>>>>. ", devId);
  };

  handleReset = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
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
        </main>
      </React.Fragment>
    );
  }
}

export default App;
