import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import TicketModal from '../components/TicketModal';

const UserDashboard = ({
                           flights,
                           passengers,
                           airports,
                           aircraft,
                           airlines,
                           cities
                       }) => {
    const navigate = useNavigate();
    const [view, setView] = useState('flights');
    const [selectedFlight, setSelectedFlight] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const role = localStorage.getItem('userRole');
        if (!isLoggedIn || role !== 'user') {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const renderTable = () => {
        switch (view) {
            case 'flights':
                return (
                    <table>
                        <thead>
                        <tr>
                            <th>Destination</th>
                            <th>Airline</th>
                            <th>Arrival</th>
                            <th>Departure</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {flights.map((flight, index) => (
                            <tr key={index}>
                                <td>{flight.destination}</td>
                                <td>{flight.airline}</td>
                                <td>{flight.arrivalTime}</td>
                                <td>{flight.departureTime}</td>
                                <td>{flight.type}</td>
                                <td>
                                    <button onClick={() => setSelectedFlight(flight)}>View Ticket</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );
            case 'passengers':
                return (
                    <table>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Passport</th>
                        </tr>
                        </thead>
                        <tbody>
                        {passengers.map((p, index) => (
                            <tr key={index}>
                                <td>{p.firstName}</td>
                                <td>{p.lastName}</td>
                                <td>{p.email}</td>
                                <td>{p.phoneNumber}</td>
                                <td>{p.passportNumber}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );
            case 'airports':
                return (
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>City</th>
                        </tr>
                        </thead>
                        <tbody>
                        {airports.map((a, index) => (
                            <tr key={index}>
                                <td>{a.name}</td>
                                <td>{a.code}</td>
                                <td>{a.city?.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );
            case 'aircraft':
                return (
                    <table>
                        <thead>
                        <tr>
                            <th>Model</th>
                            <th>Manufacturer</th>
                            <th>Capacity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {aircraft.map((a, index) => (
                            <tr key={index}>
                                <td>{a.model}</td>
                                <td>{a.manufacturer}</td>
                                <td>{a.capacity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );
            case 'airlines':
                return (
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Country</th>
                        </tr>
                        </thead>
                        <tbody>
                        {airlines.map((a, index) => (
                            <tr key={index}>
                                <td>{a.name}</td>
                                <td>{a.code}</td>
                                <td>{a.country}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );
            case 'cities':
                return (
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Province</th>
                            <th>Population</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cities.map((c, index) => (
                            <tr key={index}>
                                <td>{c.name}</td>
                                <td>{c.state}</td>
                                <td>{c.population}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    return (
        <div className="ticker">
            <h2 className="dashboard-title">User Dashboard</h2>

            <div className="view-toggle">
                {['flights', 'passengers', 'airports', 'aircraft', 'airlines', 'cities'].map(type => (
                    <button
                        key={type}
                        className={view === type ? 'active' : ''}
                        onClick={() => setView(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {renderTable()}

            {selectedFlight && (
                <TicketModal
                    flight={selectedFlight}
                    passenger={passengers[0]} // You can customize this logic
                    onClose={() => setSelectedFlight(null)}
                />
            )}

            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>
                    Logout / Back to Login
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
