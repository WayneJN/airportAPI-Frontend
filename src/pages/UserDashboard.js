import React, { useState } from 'react';
import AirportSelector from '../selector/AirportSelector';
import '../css/Dashboard.css';

const UserDashboard = ({ airports, flights }) => {
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [viewMode, setViewMode] = useState('arrivals'); // or 'departures'

    const filteredFlights = flights.filter(flight =>
        flight.airportId === selectedAirport?.id &&
        flight.type === viewMode
    );

    return (
        <div className="ticker">
            <h2 className="dashboard-title">Flight Dashboard</h2>

            <AirportSelector
                airports={airports}
                selectedAirport={selectedAirport}
                onSelect={setSelectedAirport}
            />

            <div className="view-toggle">
                <button
                    className={viewMode === 'arrivals' ? 'active' : ''}
                    onClick={() => setViewMode('arrivals')}
                >
                    Arrivals
                </button>
                <button
                    className={viewMode === 'departures' ? 'active' : ''}
                    onClick={() => setViewMode('departures')}
                >
                    Departures
                </button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Destination</th>
                    <th className="text-right">Airline</th>
                    <th className="text-right">Arrival</th>
                    <th className="text-right">Departure</th>
                </tr>
                </thead>
                <tbody>
                {filteredFlights.map((f, index) => (
                    <tr key={index} className="animate-enter animate-enter-active">
                        <td>{f.destination}</td>
                        <td className="text-right">{f.airline}</td>
                        <td className="text-right">{f.arrivalTime}</td>
                        <td className="text-right">{f.departureTime}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDashboard;
