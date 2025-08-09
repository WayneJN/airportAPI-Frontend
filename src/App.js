import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage';

// Dashboards
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

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
            passengers: [],
            userRole: null // 'user' or 'admin'
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

    setUserRole = (role) => {
        this.setState({ userRole: role });
    };

    handleAddFlight = (flight) => {
        // Example POST request
        fetch('http://localhost:8080/api/flights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(flight)
        })
            .then(res => res.json())
            .then(newFlight => {
                this.setState(prev => ({
                    flights: [...prev.flights, newFlight]
                }));
            })
            .catch(err => console.error(err));
    };

    handleUpdateFlight = (flight) => {
        fetch(`http://localhost:8080/api/flights/${flight.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(flight)
        })
            .then(res => res.json())
            .then(updatedFlight => {
                this.setState(prev => ({
                    flights: prev.flights.map(f => f.id === updatedFlight.id ? updatedFlight : f)
                }));
            })
            .catch(err => console.error(err));
    };

    handleDeleteFlight = (id) => {
        fetch(`http://localhost:8080/api/flights/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                this.setState(prev => ({
                    flights: prev.flights.filter(f => f.id !== id)
                }));
            })
            .catch(err => console.error(err));
    };

    renderDashboard = () => {
        const { userRole, flights, airports } = this.state;

        return (
            <div className="App">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="./">
                        <img src={logo} alt="logo" width="40" /> Airport Dashboard
                    </a>
                </nav>

                {userRole === 'user' ? (
                    <UserDashboard airports={airports} flights={flights} />
                ) : (
                    <AdminDashboard
                        flights={flights}
                        onAddFlight={this.handleAddFlight}
                        onUpdateFlight={this.handleUpdateFlight}
                        onDeleteFlight={this.handleDeleteFlight}
                    />
                )}
            </div>
        );
    };

    render() {
        const { userRole } = this.state;

        return (
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage setUserRole={this.setUserRole} />} />
                    <Route
                        path="/AdminDashboard"
                        element={
                            this.state.userRole === 'admin' ? (
                                <AdminDashboard
                                    flights={this.state.flights}
                                    onAddFlight={this.handleAddFlight}
                                    onUpdateFlight={this.handleUpdateFlight}
                                    onDeleteFlight={this.handleDeleteFlight}
                                />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route
                        path="/UserDashboard"
                        element={
                            this.state.userRole === 'user' ? (
                                <UserDashboard
                                    airports={this.state.airports}
                                    flights={this.state.flights}
                                />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                </Routes>

            </Router>
        );
    }
}

export default App;
