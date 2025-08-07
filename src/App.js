import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';

// Import your display components
import CityTable from './components/CityTable';
import FlightTable from './components/FlightTable';
import AirportTable from './components/AirportTable';
import AircraftTable from './components/AircraftTable';
import AirlineTable from './components/AirlineTable';
import GateTable from './components/GateTable';
import PassengerTable from './components/PassengerTable';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            flights: [],
            airports: [],
            aircraft: [],
            airlines: [],
            gates: [],
            passengers: []
        };
    }

    componentDidMount() {
        this.fetchData('/api/cities', 'cities');
        this.fetchData('/api/flights', 'flights');
        this.fetchData('/api/airports', 'airports');
        this.fetchData('/api/aircraft', 'aircraft');
        this.fetchData('/api/airlines', 'airlines');
        this.fetchData('/api/gates', 'gates');
        this.fetchData('/passengers', 'passengers'); // Note: no /api prefix
    }

    fetchData(endpoint, stateKey) {
        fetch(`http://localhost:8080${endpoint}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${stateKey}: ${res.status}`);
                }
                return res.json();
            })
            .then(data => this.setState({ [stateKey]: data }))
            .catch(error => console.error(error));
    }

    render() {
        const { cities, flights, airports, aircraft, airlines, gates, passengers } = this.state;

        return (
            <div className="App">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="./">
                        <img src={logo} alt="logo" width="40" /> Airport Dashboard
                    </a>
                </nav>

                {/* Render each table component with its data */}
                <CityTable cities={cities} />
                <FlightTable flights={flights} />
                <AirportTable airports={airports} />
                <AircraftTable aircraft={aircraft} />
                <AirlineTable airlines={airlines} />
                <GateTable gates={gates} />
                <PassengerTable passengers={passengers} />
            </div>
        );
    }
}

export default App;
