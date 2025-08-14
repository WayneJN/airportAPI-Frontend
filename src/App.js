import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
            userRole: localStorage.getItem('userRole') || null
        };
    }

    componentDidMount() {
        const entities = ['cities', 'flights', 'airports', 'aircraft', 'airlines', 'gates', 'passengers'];
        entities.forEach(entity => this.fetchData(`/api/${entity}`, entity));
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

    handleAddEntity = (entityType, data) => {
        const plural = this.getPlural(entityType);
        fetch(`http://localhost:8080/api/${plural}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(newEntity => {
                this.setState(prev => ({
                    [plural]: [...prev[plural], newEntity]
                }));
            })
            .catch(err => console.error(err));
    };

    handleUpdateEntity = (entityType, id, data) => {
        const plural = this.getPlural(entityType);
        fetch(`http://localhost:8080/api/${plural}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(updatedEntity => {
                this.setState(prev => ({
                    [plural]: prev[plural].map(e => e.id === updatedEntity.id ? updatedEntity : e)
                }));
            })
            .catch(err => console.error(err));
    };

    handleDeleteEntity = (entityType, id) => {
        const plural = this.getPlural(entityType);
        fetch(`http://localhost:8080/api/${plural}/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                this.setState(prev => ({
                    [plural]: prev[plural].filter(e => e.id !== id)
                }));
            })
            .catch(err => console.error(err));
    };

    getPlural = (entityType) => {
        const pluralMap = {
            flight: 'flights',
            passenger: 'passengers',
            airport: 'airports',
            aircraft: 'aircraft',
            airline: 'airlines',
            gate: 'gates',
            city: 'cities'
        };
        return pluralMap[entityType] || entityType;
    };

    render() {
        const {
            userRole,
            flights,
            passengers,
            airports,
            aircraft,
            airlines,
            cities
        } = this.state;

        return (
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage setUserRole={this.setUserRole} />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />


                    <Route
                        path="/AdminDashboard"
                        element={
                            userRole === 'admin' ? (
                                <AdminDashboard
                                    flights={flights}
                                    passengers={passengers}
                                    airports={airports}
                                    aircraft={aircraft}
                                    airlines={airlines}
                                    cities={cities}
                                    onAddEntity={this.handleAddEntity}
                                    onUpdateEntity={this.handleUpdateEntity}
                                    onDeleteEntity={this.handleDeleteEntity}
                                />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />

                    <Route
                        path="/UserDashboard"
                        element={
                            userRole === 'user' ? (
                                <UserDashboard
                                    flights={flights}
                                    passengers={passengers}
                                    airports={airports}
                                    aircraft={aircraft}
                                    airlines={airlines}
                                    cities={cities}
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
