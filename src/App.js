import React, { Component } from 'react';
import Table from './components/Table.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/cities')
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => this.setState({ cities: data }))
        .catch(error => console.error('Error fetching cities:', error));
  }

  render() {
    return (
        <div className="App">
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="./">
              <img src={logo} alt="logo" width="40" /> City List
            </a>
          </nav>
          <Table cities={this.state.cities} />
        </div>
    );
  }
}

export default App;
