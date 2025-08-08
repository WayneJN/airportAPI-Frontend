import React, { useState, useEffect } from 'react';
import AirportSelector from '../selector/AirportSelector';
import FlightTable from '../components/FlightTable';

const Dashboard = ({ airports, flights }) => {
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [viewMode, setViewMode] = useState('arrivals'); // or 'departures'

    const filteredFlights = flights.filter(flight =>
        flight.airportId === selectedAirport?.id &&
        flight.type === viewMode // assuming flight.type is 'arrival' or 'departure'
    );

    return (
        <div className="container mt-4">
            <h2>Flight Dashboard</h2>

            <AirportSelector
                airports={airports}
                selectedAirport={selectedAirport}
                onSelect={setSelectedAirport}
            />

            <div className="btn-group my-3">
                <button
                    className={`btn btn-outline-primary ${viewMode === 'arrivals' ? 'active' : ''}`}
                    onClick={() => setViewMode('arrivals')}
                >
                    Arrivals
                </button>
                <button
                    className={`btn btn-outline-primary ${viewMode === 'departures' ? 'active' : ''}`}
                    onClick={() => setViewMode('departures')}
                >
                    Departures
                </button>
            </div>

            <FlightTable flights={filteredFlights} />
        </div>
    );
};

export default Dashboard;
