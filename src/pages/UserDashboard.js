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
    const [selectedAirportCode, setSelectedAirportCode] = useState('');

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
                const filteredDepartures = flights.filter(
                    (f) => f.originAirportCode === selectedAirportCode
                );
                const filteredArrivals = flights.filter(
                    (f) => f.destinationAirportCode === selectedAirportCode
                );

                return (
                    <>
                        <div className="airport-selector">
                            <label>Select Airport:</label>
                            <select
                                value={selectedAirportCode}
                                onChange={(e) => setSelectedAirportCode(e.target.value)}
                            >
                                <option value="">-- Choose an Airport --</option>
                                {airports.map((airport) => (
                                    <option key={airport.id} value={airport.code}>
                                        {airport.name} ({airport.code})
                                    </option>
                                ))}
                            </select>
                            <p className="airport-message">Please select an airport to view arrivals and departures.</p>

                        </div>

                        {selectedAirportCode ? (
                            <>
                                <h3>Departures from {selectedAirportCode}</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Destination</th>
                                        <th>Airline</th>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredDepartures.map((flight, index) => (
                                        <tr key={index}>
                                            <td>{flight.destinationAirportCode}</td>
                                            <td>{flight.airlineName}</td>
                                            <td>{flight.departureTime}</td>
                                            <td>{flight.arrivalTime}</td>
                                            <td>
                                                <button className="crud-button view" onClick={() => setSelectedFlight(flight)}>
                                                    View Ticket
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                <h3>Arrivals to {selectedAirportCode}</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Origin</th>
                                        <th>Airline</th>
                                        <th>Departure</th>
                                        <th>Arrival</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredArrivals.map((flight, index) => (
                                        <tr key={index}>
                                            <td>{flight.originAirportCode}</td>
                                            <td>{flight.airlineName}</td>
                                            <td>{flight.departureTime}</td>
                                            <td>{flight.arrivalTime}</td>
                                            <td>
                                                <button className="crud-button view" onClick={() => setSelectedFlight(flight)}>
                                                    View Ticket
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p></p>
                        )}
                    </>
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
                                <td>{a.cityName}, {a.cityState}</td>
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
