import React from 'react';

const AirportSelector = ({ airports, selectedAirport, onSelect }) => (
    <div className="form-group">
        <label htmlFor="airportSelect">Select Airport:</label>
        <select
            id="airportSelect"
            className="form-control"
            value={selectedAirport?.id || ''}
            onChange={e => {
                const airport = airports.find(a => a.id === parseInt(e.target.value));
                onSelect(airport);
            }}
        >
            <option value="">-- Choose an airport --</option>
            {airports.map(airport => (
                <option key={airport.id} value={airport.id}>
                    {airport.name} ({airport.code})
                </option>
            ))}
        </select>
    </div>
);

export default AirportSelector;
