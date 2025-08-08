import React from 'react';

const FlightSelector = ({ flights, selectedFlight, onChange }) => {
    return (
        <div>
            <label htmlFor="flight-select">Flight:</label>
            <select
                id="flight-select"
                value={selectedFlight}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select a flight</option>
                {flights.map((flight) => (
                    <option key={flight.id} value={flight.id}>
                        {flight.code} — {flight.origin} to {flight.destination}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FlightSelector;
