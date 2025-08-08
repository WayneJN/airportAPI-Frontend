import React from 'react';

const AirlineSelector = ({ airlines, selectedAirline, onChange }) => {
    return (
        <div>
            <label htmlFor="airline-select">Airline:</label>
            <select
                id="airline-select"
                value={selectedAirline}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select an airline</option>
                {airlines.map((airline) => (
                    <option key={airline.id} value={airline.id}>
                        {airline.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AirlineSelector;
